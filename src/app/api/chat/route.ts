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

// ── Rate limit ────────────────────────────────────────────────────────────────
// 30 messages / 5 minutes per IP. Roughly one every 10 s steady-state with
// short bursts allowed. Tunable via env if you want to crank it down.
const RATE_MAX = Number(process.env.CHAT_RATE_MAX ?? 30);
const RATE_WINDOW = "5 m" as const;
const RATE_WINDOW_MS = 5 * 60 * 1000;
// Hard cap on incoming body size before we even parse. 8 KB is generous
// for a JSON envelope around a 4 KB chat message.
const MAX_BODY_BYTES = 8 * 1024;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const ratelimit =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.slidingWindow(RATE_MAX, RATE_WINDOW),
        analytics: false,
        prefix: "rl:chat",
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
  // 0. Origin / CSRF
  if (originBlocked(req)) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "origin-blocked",
      level: "warning",
    });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 1. Client IP for rate limit
  const ip = clientIp(req);
  if (!ip) {
    return NextResponse.json(
      { error: "Anfrage ohne Client-IP wird abgelehnt." },
      { status: 400 },
    );
  }

  // 2. Rate limit
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
    return NextResponse.json(
      { error: "Service nicht verfügbar" },
      { status: 503 },
    );
  } else {
    limited = memoryLimit(ip);
  }
  if (limited) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "rate-limited",
      level: "warning",
      data: { ip_hashed: hashIp(ip) },
    });
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      {
        status: 429,
        headers: {
          "Retry-After": String(RATE_WINDOW_MS / 1000),
          "RateLimit-Limit": String(RATE_MAX),
          "RateLimit-Remaining": "0",
          "RateLimit-Reset": String(
            Math.ceil((Date.now() + RATE_WINDOW_MS) / 1000),
          ),
        },
      },
    );
  }

  // 3. Read body with byte cap
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Anfrage zu gross." },
      { status: 413 },
    );
  }

  // 4. Parse + validate
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Ungültiges JSON." },
      { status: 400 },
    );
  }
  const v = validateChatBody(parsed);
  if (!v.ok) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "validation-failed",
      level: "warning",
      data: { reason: v.reason },
    });
    return NextResponse.json(
      { error: "Ungültige Anfrage.", reason: v.reason },
      { status: 400 },
    );
  }
  const body = v.body;

  // 5. Forward to n8n
  const webhook = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhook) {
    Sentry.captureMessage("api/chat misconfigured: N8N_CHAT_WEBHOOK_URL missing", "error");
    return NextResponse.json(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
    );
  }
  const secret = process.env.N8N_CHAT_SHARED_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    // Fail closed in production. In dev, we'll forward without a header so
    // local n8n can be tested before the verifier is wired up.
    Sentry.captureMessage("api/chat misconfigured: N8N_CHAT_SHARED_SECRET missing", "error");
    return NextResponse.json(
      { error: "Chat-Service nicht konfiguriert." },
      { status: 503 },
    );
  }

  const canonical = canonicalize(body);
  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain;q=0.9",
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
    Sentry.captureException(err, { tags: { route: "api/chat", stage: "upstream-fetch" } });
    return NextResponse.json(
      { error: "Chat-Service nicht erreichbar. Bitte versuchen Sie es später erneut." },
      { status: 502 },
    );
  }
  const upstreamMs = Date.now() - t0;

  if (!upstream.ok) {
    Sentry.addBreadcrumb({
      category: "chat",
      message: "upstream-non-2xx",
      level: "error",
      data: { status: upstream.status, ms: upstreamMs },
    });
    return NextResponse.json(
      { error: "Chat-Antwort fehlgeschlagen." },
      { status: 502 },
    );
  }

  // 6. Filter the response. n8n's chat trigger returns JSON with
  //    `{output: "..."}`; we sanitise that string in place.
  let responseBody: unknown;
  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      responseBody = filterChatResponse(await upstream.json());
    } catch (err) {
      Sentry.captureException(err, { tags: { route: "api/chat", stage: "json-parse" } });
      return NextResponse.json(
        { error: "Antwort konnte nicht verarbeitet werden." },
        { status: 502 },
      );
    }
  } else {
    // Plain-text or streaming SSE not enabled today (enableStreaming:false
    // in the widget) — pass through but filter as best we can.
    const text = await upstream.text();
    const trimmed = text.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        responseBody = filterChatResponse(JSON.parse(trimmed));
      } catch {
        responseBody = { output: text };
      }
    } else {
      responseBody = { output: text };
    }
  }

  // 7. Observability — log shape, sizes, and a coarse token estimate.
  //    No message content goes to Sentry to avoid PII leakage.
  const botText = extractBotText(responseBody);
  Sentry.addBreadcrumb({
    category: "chat",
    message: "ok",
    level: "info",
    data: {
      ip_hashed: hashIp(ip),
      input_chars: body.chatInput.length,
      // Rough token approximation: 1 token ≈ 4 chars for English-like text.
      input_tokens_est: Math.ceil(body.chatInput.length / 4),
      output_chars: botText.length,
      output_tokens_est: Math.ceil(botText.length / 4),
      upstream_ms: upstreamMs,
    },
  });

  return NextResponse.json(responseBody, {
    status: 200,
    headers: {
      // The browser caches nothing — every turn is fresh.
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
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

