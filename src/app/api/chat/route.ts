import { randomUUID, createHmac } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { validateChatBody } from "@/lib/chat-validation";
import { HMAC_HEADER, signRequest, canonicalize } from "@/lib/hmac";
import { filterChatResponse } from "@/lib/chat-output-filter";

export const runtime = "nodejs";
// We don't cache anything — every chat turn must hit n8n. Vercel's default
// for API routes is no-cache, but be explicit so future maintainers don't
// trip over it.
export const dynamic = "force-dynamic";

// ── Rate limits ──────────────────────────────────────────────────────────────
// Two limiters in series:
//   * per-IP (broad)     30 msgs / 5 min  — coarse abuse gate
//   * per-session (tight) 20 msgs / 5 min  — stops one user opening many tabs
//
// Per-session catches the "single office IP, 50 tabs each running a script"
// case that the IP limit can't see. Both fail closed in production if
// Upstash isn't reachable; see §rate-limit below.
// Parse and validate numeric env vars — reject NaN, zero, and excessively
// large values to prevent misconfigured env vars from disabling rate limiting.
function parsePositiveInt(
  raw: string | undefined,
  defaultVal: number,
  max: number,
): number {
  if (raw === undefined) return defaultVal;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0 || n > max) return defaultVal;
  return Math.floor(n);
}
const RATE_MAX = parsePositiveInt(process.env.CHAT_RATE_MAX, 30, 10_000);
const SESSION_RATE_MAX = parsePositiveInt(
  process.env.CHAT_SESSION_RATE_MAX,
  20,
  10_000,
);
const RATE_WINDOW = "5 m" as const;
const RATE_WINDOW_MS = 5 * 60 * 1000;
// Hard cap on incoming body size before we even parse. 8 KB is generous
// for a JSON envelope around a 4 KB chat message.
const MAX_BODY_BYTES = 8 * 1024;

// Daily token-spend kill-switch. Estimated tokens (chars / 4) accumulate in
// a UTC-keyed Redis counter; once it exceeds the cap, the proxy returns a
// graceful maintenance message until midnight UTC. The estimate is rough
// (varies by language and model tokenizer) — it's wallet protection, not
// accounting. Default 200_000 ≈ a few thousand short chats.
const DAILY_TOKEN_CAP = parsePositiveInt(
  process.env.CHAT_DAILY_TOKEN_CAP,
  200_000,
  100_000_000,
);

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis =
  upstashUrl && upstashToken
    ? new Redis({ url: upstashUrl, token: upstashToken })
    : null;
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_MAX, RATE_WINDOW),
      analytics: false,
      prefix: "rl:chat",
    })
  : null;
const sessionRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(SESSION_RATE_MAX, RATE_WINDOW),
      analytics: false,
      prefix: "rl:chat:sess",
    })
  : null;

const memoryFallback = new Map<string, { count: number; resetAt: number }>();
function memoryLimit(ip: string): boolean {
  const now = Date.now();
  for (const [k, v] of memoryFallback) {
    if (now > v.resetAt) memoryFallback.delete(k);
  }
  const entry = memoryFallback.get(ip);
  if (!entry || now > entry.resetAt) {
    memoryFallback.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count++;
  return false;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function clientIp(req: NextRequest): string | null {
  // On Vercel, the rightmost XFF entry is the verified client IP appended by the edge.
  // All other headers (cf-connecting-ip, x-real-ip) are user-controlled and must not be trusted.
  const xff = req.headers.get("x-forwarded-for");
  if (!xff) return null;
  const ips = xff
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return ips[ips.length - 1] || null;
}

function originBlocked(req: NextRequest): boolean {
  // CSRF defence (mirrors the lab-access route): if a browser sends an
  // Origin header it MUST match the Host. Server-to-server calls without
  // Origin are allowed through to the rate limit + validator.

  // Sec-Fetch-Site check: if present and not same-origin/same-site, reject immediately.
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (
    secFetchSite &&
    secFetchSite !== "same-origin" &&
    secFetchSite !== "same-site"
  ) {
    return true;
  }

  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

function rejectMethod(): NextResponse {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // request-id: generated here, propagated to n8n, tagged on every Sentry
  // event, and returned as a response header. Lets a user quote one ID in
  // a support ticket and have it line up with logs across every hop.
  // Accept a caller-supplied ID only when it is a valid v4 UUID to prevent
  // log/tag injection via arbitrary header values; otherwise generate a fresh one.
  const suppliedId = req.headers.get("x-request-id");
  const REQUEST_ID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const requestId =
    suppliedId && REQUEST_ID_RE.test(suppliedId) ? suppliedId : randomUUID();
  Sentry.getCurrentScope().setTag("request_id", requestId);

  // 0. Origin / CSRF
  if (originBlocked(req)) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "origin-blocked",
      level: "warning",
      data: { request_id: requestId },
    });
    return jsonWithRequestId(
      { error: "Forbidden" },
      { status: 403 },
      requestId,
    );
  }

  // 1. Client IP for rate limit
  const ip = clientIp(req);
  if (!ip) {
    return jsonWithRequestId(
      { error: "Anfrage ohne Client-IP wird abgelehnt." },
      { status: 400 },
      requestId,
    );
  }

  // 2. Per-IP rate limit (coarse abuse gate)
  let limited = false;
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    limited = !success;
  } else if (process.env.NODE_ENV === "production") {
    // Fail closed in production: a per-instance in-memory limiter is
    // ineffective across serverless cold starts and trivially bypassable.
    // Refuse all requests until Upstash env vars are configured. Matches
    // the lab-access route's behaviour for the same reason.
    console.error(
      "[api/chat] UPSTASH_REDIS_REST_URL/TOKEN not set in production — rejecting request to protect endpoint.",
    );
    return jsonWithRequestId(
      { error: "Service nicht verfügbar" },
      { status: 503 },
      requestId,
    );
  } else {
    limited = memoryLimit(ip);
  }
  if (limited) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "rate-limited",
      level: "warning",
      data: { ip_hashed: hashIp(ip), scope: "ip", request_id: requestId },
    });
    return rateLimited(RATE_MAX, requestId);
  }

  // 3. Read body with byte cap
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return jsonWithRequestId(
      { error: "Anfrage zu gross." },
      { status: 413 },
      requestId,
    );
  }

  // 4. Parse + validate
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return jsonWithRequestId(
      { error: "Ungültiges JSON." },
      { status: 400 },
      requestId,
    );
  }
  const v = validateChatBody(parsed);
  if (!v.ok) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "validation-failed",
      level: "warning",
      data: { reason: v.reason, request_id: requestId },
    });
    return jsonWithRequestId(
      { error: "Ungültige Anfrage." },
      { status: 400 },
      requestId,
    );
  }
  const body = v.body;

  // 5. Per-session rate limit (tighter; catches single-IP-many-tabs abuse
  //    that the IP limit can't see). Skipped silently when Upstash isn't
  //    configured — the IP limit above already failed-closed in prod.
  if (sessionRatelimit) {
    const { success } = await sessionRatelimit.limit(body.sessionId);
    if (!success) {
      Sentry.addBreadcrumb({
        category: "chat",
        message: "rate-limited",
        level: "warning",
        data: {
          ip_hashed: hashIp(ip),
          scope: "session",
          request_id: requestId,
        },
      });
      return rateLimited(SESSION_RATE_MAX, requestId);
    }
  }

  // 6. Daily token-spend kill-switch — check BEFORE the upstream call so a
  //    runaway attacker can't keep burning credits past the cap.
  if (redis) {
    const used = await getDailyTokenUsage(redis);
    if (used >= DAILY_TOKEN_CAP) {
      await reportDailyCapHit(redis, used, requestId);
      return jsonWithRequestId(
        {
          error:
            "Der Chat ist heute vorübergehend nicht verfügbar. Bitte versuchen Sie es morgen erneut oder kontaktieren Sie uns direkt.",
        },
        { status: 503 },
        requestId,
      );
    }
  }

  // 7. Forward to n8n
  const webhook = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhook) {
    Sentry.captureMessage(
      "api/chat misconfigured: N8N_CHAT_WEBHOOK_URL missing",
      "error",
    );
    return jsonWithRequestId(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
      requestId,
    );
  }
  // SSRF guard: the webhook URL must be an HTTPS URL. This prevents an
  // attacker who can set env vars from redirecting traffic to internal services.
  let webhookUrl: URL;
  try {
    webhookUrl = new URL(webhook);
  } catch {
    Sentry.captureMessage(
      "api/chat misconfigured: N8N_CHAT_WEBHOOK_URL is not a valid URL",
      "error",
    );
    return jsonWithRequestId(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
      requestId,
    );
  }
  if (webhookUrl.protocol !== "https:") {
    Sentry.captureMessage(
      "api/chat misconfigured: N8N_CHAT_WEBHOOK_URL must use https://",
      "error",
    );
    return jsonWithRequestId(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
      requestId,
    );
  }
  // SSRF guard — block private/loopback/link-local/reserved IP ranges and
  // well-known internal hostnames. An https:// URL is not sufficient alone;
  // an attacker who can control env vars could point it at the cloud metadata
  // endpoint (169.254.169.254), a Kubernetes service (10.x.x.x), or localhost.
  if (isSsrfTarget(webhookUrl.hostname)) {
    Sentry.captureMessage(
      "api/chat misconfigured: N8N_CHAT_WEBHOOK_URL resolves to a private or reserved address",
      "error",
    );
    return jsonWithRequestId(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
      requestId,
    );
  }
  const secret = process.env.N8N_CHAT_SHARED_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    // Fail closed in production. In dev, we'll forward without a header so
    // local n8n can be tested before the verifier is wired up.
    Sentry.captureMessage(
      "api/chat misconfigured: N8N_CHAT_SHARED_SECRET missing",
      "error",
    );
    return jsonWithRequestId(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
      requestId,
    );
  }

  const canonical = canonicalize(body);
  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain;q=0.9",
    "X-Request-ID": requestId,
  };
  if (secret) {
    upstreamHeaders[HMAC_HEADER] = signRequest(body, secret);
  }

  const t0 = Date.now();
  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl.toString(), {
      method: "POST",
      headers: upstreamHeaders,
      body: canonical,
      // n8n on Render can cold-start; give it room but bail if it hangs.
      signal: AbortSignal.timeout(60_000),
    });
  } catch (err) {
    Sentry.captureException(err, {
      tags: { route: "api/chat", stage: "upstream-fetch" },
    });
    return jsonWithRequestId(
      {
        error:
          "Chat-Service nicht erreichbar. Bitte versuchen Sie es später erneut.",
      },
      { status: 502 },
      requestId,
    );
  }
  const upstreamMs = Date.now() - t0;

  if (!upstream.ok) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "upstream-non-2xx",
      level: "error",
      data: { status: upstream.status, ms: upstreamMs, request_id: requestId },
    });
    return jsonWithRequestId(
      { error: "Chat-Antwort fehlgeschlagen." },
      { status: 502 },
      requestId,
    );
  }

  // 8. Parse upstream response, detect canary-leak flag, then filter.
  //    n8n's Sanitise Output node sets `_canaryLeak: true` on its output
  //    when the system-prompt canary appears in LLM output — we treat that
  //    as a P1 security incident.
  let responseBody: unknown;
  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      responseBody = await upstream.json();
    } catch (err) {
      Sentry.captureException(err, {
        tags: { route: "api/chat", stage: "json-parse" },
      });
      return jsonWithRequestId(
        { error: "Antwort konnte nicht verarbeitet werden." },
        { status: 502 },
        requestId,
      );
    }
  } else {
    // Plain-text or streaming SSE not enabled today (enableStreaming:false
    // in the widget) — pass through but filter as best we can.
    const text = await upstream.text();
    const trimmed = text.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        responseBody = JSON.parse(trimmed);
      } catch {
        responseBody = { output: text };
      }
    } else {
      responseBody = { output: text };
    }
  }

  if (hasCanaryLeakFlag(responseBody)) {
    await reportCanaryLeak(redis, requestId);
    responseBody = stripCanaryLeakFlag(responseBody);
  }
  responseBody = filterChatResponse(responseBody);

  // 9. Observability — log shape, sizes, and a coarse token estimate.
  //    No message content goes to Sentry to avoid PII leakage.
  const botText = extractBotText(responseBody);
  const inputTokensEst = Math.ceil(body.chatInput.length / 4);
  const outputTokensEst = Math.ceil(botText.length / 4);
  Sentry.addBreadcrumb({
    category: "chat",
    message: "ok",
    level: "info",
    data: {
      request_id: requestId,
      ip_hashed: hashIp(ip),
      input_chars: body.chatInput.length,
      // Rough token approximation: 1 token ≈ 4 chars for English-like text.
      input_tokens_est: inputTokensEst,
      output_chars: botText.length,
      output_tokens_est: outputTokensEst,
      upstream_ms: upstreamMs,
    },
  });

  // 10. Increment the daily token counter. Fire-and-forget — failures here
  //     must not break the user-visible response. Worst case the counter
  //     undercounts and we serve a few extra requests before the cap kicks
  //     in tomorrow.
  if (redis) {
    addDailyTokenUsage(redis, inputTokensEst + outputTokensEst).catch((err) => {
      Sentry.captureException(err, {
        tags: { route: "api/chat", stage: "daily-token-incr" },
      });
    });
  }

  return jsonWithRequestId(responseBody, { status: 200 }, requestId, {
    // The browser caches nothing — every turn is fresh.
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "X-Content-Type-Options": "nosniff",
  });
}

// Send anything else → 405. Stops drive-by GETs from confusing logs.
export const GET = rejectMethod;
export const PUT = rejectMethod;
export const DELETE = rejectMethod;
export const PATCH = rejectMethod;
export const OPTIONS = rejectMethod;

// ── small helpers ────────────────────────────────────────────────────────────

/**
 * Returns true if the hostname looks like a private/loopback/link-local/reserved
 * address or a known-internal hostname. Used as a defence-in-depth SSRF guard
 * on top of the https-only protocol check.
 *
 * Note: this is a static check on the configured env var — it does NOT prevent
 * DNS rebinding (the hostname could legitimately resolve to a private IP at
 * request time). On Vercel serverless the network egress is sandboxed, so the
 * residual risk is low, but the guard still catches the most common mistake of
 * accidentally pointing the webhook at an internal endpoint.
 */
function isSsrfTarget(hostname: string): boolean {
  // URL.hostname wraps IPv6 literals in brackets (e.g. "[::1]") — strip them
  // so all comparisons work against the bare address string.
  let h = hostname.toLowerCase().replace(/\.$/, "");
  if (h.startsWith("[") && h.endsWith("]")) {
    h = h.slice(1, -1);
  }

  // Exact-match blocklist for well-known internal hostnames
  const blockedHostnames = new Set([
    "localhost",
    "metadata.google.internal",
    "169.254.169.254", // AWS / GCP / Azure IMDS
    "fd00::ec2",        // AWS IPv6 IMDS
    "::1",              // IPv6 loopback
    "0.0.0.0",
    "kubernetes.default",
    "kubernetes.default.svc",
    "kubernetes.default.svc.cluster.local",
  ]);
  if (blockedHostnames.has(h)) return true;

  // Suffix-match: *.local, *.internal, *.cluster.local
  if (h.endsWith(".local") || h.endsWith(".internal") || h.endsWith(".cluster.local")) {
    return true;
  }

  // IPv6 range checks — the colon guard avoids false positives on DNS names.
  if (h.includes(":")) {
    // fe80::/10 link-local (fe80:: – febf::)
    if (/^fe[89ab]/.test(h)) return true;
    // fc00::/7 ULA (fc00:: – fdff::)
    if (/^f[cd]/.test(h)) return true;
    // IPv4-mapped ::ffff:x.x.x.x — strip prefix and re-check embedded IPv4.
    // After stripping, a colon means compressed hex (e.g. "7f00:1") which is
    // not dotted-decimal and would escape the IPv4 range checks below — block it.
    if (h.startsWith("::ffff:")) {
      const embedded = h.slice(7);
      if (embedded.includes(":")) return true; // compressed hex IPv4-mapped address
      return isSsrfTarget(embedded);
    }
  }

  // Numeric IPv4 — check private/loopback/link-local ranges
  const ipv4Re = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = ipv4Re.exec(h);
  if (m) {
    const [, a, b, c, d] = m.map(Number);
    if (
      a === 10 ||                                   // 10.0.0.0/8
      (a === 172 && b >= 16 && b <= 31) ||          // 172.16.0.0/12
      (a === 192 && b === 168) ||                   // 192.168.0.0/16
      a === 127 ||                                  // 127.0.0.0/8 loopback
      (a === 169 && b === 254) ||                   // 169.254.0.0/16 link-local (IMDS)
      (a === 100 && b >= 64 && b <= 127) ||         // 100.64.0.0/10 carrier-grade NAT
      a === 0 ||                                    // 0.0.0.0/8 "this" network
      (a === 192 && b === 0 && c === 0) ||          // 192.0.0.0/24 IETF protocol
      (a === 192 && b === 0 && c === 2) ||          // 192.0.2.0/24 TEST-NET-1
      (a === 198 && b === 51 && c === 100) ||       // 198.51.100.0/24 TEST-NET-2
      (a === 203 && b === 0 && c === 113) ||        // 203.0.113.0/24 TEST-NET-3
      a >= 240                                      // 240.0.0.0/4 reserved + 255.255.255.255
    ) {
      return true;
    }
    // Validate each octet is in range
    if ([a, b, c, d].some((o) => o > 255)) return true;
  }

  return false;
}

function extractBotText(payload: unknown): string {
  if (typeof payload !== "object" || payload === null) return "";
  const p = payload as Record<string, unknown>;
  for (const key of ["output", "text", "message"] as const) {
    if (typeof p[key] === "string") return p[key] as string;
  }
  return "";
}

const DEV_FALLBACK_IP_HASH_SALT = "dev-only-change-in-production";
let _ipHashSaltWarned = false;
function resolveIpHashSalt(): string {
  const raw = process.env.IP_HASH_SALT;
  if (
    process.env.NODE_ENV === "production" &&
    (!raw || raw === DEV_FALLBACK_IP_HASH_SALT)
  ) {
    // Fail closed at request time — a predictable salt lets an attacker
    // reverse-map hashed IPs. Throwing here (rather than at module load)
    // keeps `next build` working when the secret is absent at build time.
    if (!_ipHashSaltWarned) {
      _ipHashSaltWarned = true;
      Sentry.captureMessage(
        "api/chat misconfigured: IP_HASH_SALT missing in production",
        "error",
      );
    }
    throw new Error(
      "IP_HASH_SALT must be set to a unique random value in production",
    );
  }
  return raw ?? DEV_FALLBACK_IP_HASH_SALT;
}
function hashIp(ip: string): string {
  return createHmac("sha256", resolveIpHashSalt())
    .update(ip)
    .digest("hex")
    .slice(0, 12);
}

function jsonWithRequestId(
  payload: unknown,
  init: { status: number },
  requestId: string,
  extraHeaders?: Record<string, string>,
): NextResponse {
  return NextResponse.json(payload, {
    status: init.status,
    headers: {
      // Never cache API responses — they depend on rate-limit state, session
      // context, and origin validation which differ per request.
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Request-ID": requestId,
      ...(extraHeaders ?? {}),
    },
  });
}

function rateLimited(limit: number, requestId: string): NextResponse {
  return NextResponse.json(
    { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
    {
      status: 429,
      headers: {
        // Rate-limit responses must not be cached — each client's remaining
        // quota differs and Retry-After is request-time-specific.
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Retry-After": String(RATE_WINDOW_MS / 1000),
        "RateLimit-Limit": String(limit),
        "RateLimit-Remaining": "0",
        "RateLimit-Reset": String(
          Math.ceil((Date.now() + RATE_WINDOW_MS) / 1000),
        ),
        "X-Request-ID": requestId,
      },
    },
  );
}

// ── Daily token cap ──────────────────────────────────────────────────────────
// Keys live for 2 days so a late-night increment can't pre-fill tomorrow's
// counter when the day rolls over mid-request.
const DAILY_KEY_TTL_SECONDS = 2 * 24 * 60 * 60;

function todayUtcKey(): string {
  // YYYY-MM-DD in UTC. Cap rolls over at 00:00 UTC.
  return new Date().toISOString().slice(0, 10);
}

async function getDailyTokenUsage(redis: Redis): Promise<number> {
  const key = `chat:tokens:${todayUtcKey()}`;
  const value = await redis.get<number | string>(key);
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

async function addDailyTokenUsage(redis: Redis, tokens: number): Promise<void> {
  if (tokens <= 0) return;
  const key = `chat:tokens:${todayUtcKey()}`;
  const newTotal = await redis.incrby(key, tokens);
  // Set TTL only on the first increment of the day (when the value equals
  // the amount we just added). Reduces write traffic vs. setting it every
  // time.
  if (newTotal === tokens) {
    await redis.expire(key, DAILY_KEY_TTL_SECONDS);
  }
}

async function reportDailyCapHit(
  redis: Redis,
  used: number,
  requestId: string,
): Promise<void> {
  // First hit of the day → Sentry warning. Subsequent hits → breadcrumb only,
  // so a 24-hour attack doesn't flood the project.
  const alertKey = `chat:tokens:alerted:${todayUtcKey()}`;
  const first = await redis.set(alertKey, "1", {
    ex: DAILY_KEY_TTL_SECONDS,
    nx: true,
  });
  if (first === "OK") {
    Sentry.captureMessage(
      `Chat daily token cap hit: ${used} >= ${DAILY_TOKEN_CAP}`,
      "warning",
    );
  } else {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "daily-cap-hit",
      level: "warning",
      data: { used, cap: DAILY_TOKEN_CAP, request_id: requestId },
    });
  }
}

// ── Canary leak alarm ────────────────────────────────────────────────────────
// The n8n "Sanitise Output" node sets `_canaryLeak: true` when the system-
// prompt canary token appears in the LLM's output. That means a prompt
// injection got through R1/R2 and the model parroted the secret marker —
// a P1 security event. We fire Sentry at fatal level for the first hit per
// hour and downgrade later hits to a breadcrumb so a sustained attack
// doesn't drown the project.

function hasCanaryLeakFlag(payload: unknown): boolean {
  return (
    typeof payload === "object" &&
    payload !== null &&
    (payload as Record<string, unknown>)._canaryLeak === true
  );
}

function stripCanaryLeakFlag(payload: unknown): unknown {
  if (typeof payload !== "object" || payload === null) return payload;
  const rest = { ...(payload as Record<string, unknown>) };
  delete rest._canaryLeak;
  return rest;
}

async function reportCanaryLeak(
  redis: Redis | null,
  requestId: string,
): Promise<void> {
  let isFirst = true;
  if (redis) {
    // Hour-bucketed dedupe key.
    const hourKey = `chat:canary-alert:${new Date().toISOString().slice(0, 13)}`;
    try {
      const r = await redis.set(hourKey, "1", { ex: 3600, nx: true });
      isFirst = r === "OK";
    } catch {
      // If Redis fails, prefer to fire the alert (false-positive of
      // duplicate alarm beats missing a real one).
      isFirst = true;
    }
  }
  if (isFirst) {
    Sentry.captureMessage("CANARY LEAK DETECTED in chat output", "fatal");
  } else {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "canary-leak-suppressed",
      level: "error",
      data: { request_id: requestId },
    });
  }
}
