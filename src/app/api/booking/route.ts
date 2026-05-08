import { NextRequest, NextResponse } from "next/server";

// ── Rate limiting ──────────────────────────────────────────────────────────
// In-memory token bucket — best-effort in serverless (per-instance).
// Entries are pruned on each request to prevent unbounded growth.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function pruneRateMap(): void {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  pruneRateMap();
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count++;
  return false;
}

// ── SSRF guard ─────────────────────────────────────────────────────────────
// Private/loopback/link-local ranges that must never be the target of server-side requests.
const PRIVATE_IP_RE =
  /^(localhost$|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.|::1$|fc00:|fd[0-9a-f]{2}:|fe80:)/i;

function isValidWebhookUrl(raw: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.replace(/^\[|\]$/g, ""); // strip IPv6 brackets
  if (PRIVATE_IP_RE.test(host)) return false;
  return true;
}

// ── Payload validation ─────────────────────────────────────────────────────
interface BookingPayload {
  name: string;
  company: string;
  email: string;
  topic: string;
  date: string;
  message: string;
}

const ISO_DATETIME_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;

function isValidPayload(body: unknown): body is BookingPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.length > 0 &&
    b.name.length <= 200 &&
    typeof b.email === "string" &&
    b.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.topic === "string" &&
    b.topic.length > 0 &&
    b.topic.length <= 500 &&
    typeof b.date === "string" &&
    b.date.length > 0 &&
    ISO_DATETIME_RE.test(b.date) &&
    (b.company === undefined ||
      (typeof b.company === "string" && b.company.length <= 200)) &&
    (b.message === undefined ||
      (typeof b.message === "string" && b.message.length <= 2000))
  );
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
  if (!webhookUrl || !isValidWebhookUrl(webhookUrl)) {
    return NextResponse.json(
      { error: "Booking service not configured" },
      { status: 503 },
    );
  }

  // Prefer the real-client IP set by the edge proxy; fall back to x-forwarded-for.
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    (request.headers.get("x-forwarded-for") ?? "unknown")
      .split(",")[0]
      .trim();

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        company: body.company ?? "",
        email: body.email,
        topic: body.topic,
        date: body.date,
        message: body.message ?? "",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Booking service unavailable" },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Booking service unavailable" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
