import { randomUUID } from "node:crypto";

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
const RATE_MAX = Number(process.env.CHAT_RATE_MAX ?? 30);
const SESSION_RATE_MAX = Number(process.env.CHAT_SESSION_RATE_MAX ?? 20);
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
const DAILY_TOKEN_CAP = Number(process.env.CHAT_DAILY_TOKEN_CAP ?? 200_000);

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
  const xff = req.headers.get("x-forwarded-for");
  return (
    req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    xff?.split(",")[0]?.trim() ||
    null
  );
}

function originBlocked(req: NextRequest): boolean {
  // CSRF defence (mirrors the lab-access route): if a browser sends an
  // Origin header it MUST match the Host. Server-to-server calls without
  // Origin are allowed through to the rate limit + validator.
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
  const requestId = req.headers.get("x-request-id") ?? randomUUID();
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
      { error: "Ungültige Anfrage.", reason: v.reason },
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
    upstream = await fetch(webhook, {
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
function extractBotText(payload: unknown): string {
  if (typeof payload !== "object" || payload === null) return "";
  const p = payload as Record<string, unknown>;
  for (const key of ["output", "text", "message"] as const) {
    if (typeof p[key] === "string") return p[key] as string;
  }
  return "";
}

function hashIp(ip: string): string {
  // 6 hex chars from a cheap non-crypto hash. Enough to group log lines
  // from the same source without storing the raw IP in Sentry.
  let h = 2166136261;
  for (let i = 0; i < ip.length; i++) {
    h = Math.imul(h ^ ip.charCodeAt(i), 16777619);
  }
  return (h >>> 0).toString(16).padStart(6, "0").slice(-6);
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
