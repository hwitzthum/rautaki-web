import { NextRequest, NextResponse } from "next/server";

// ── Rate limiting ──────────────────────────────────────────────────────────
// Simple in-memory token bucket, best-effort in serverless (per-instance).
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
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

// ── Payload validation ─────────────────────────────────────────────────────
interface BookingPayload {
  name: string;
  company: string;
  email: string;
  topic: string;
  date: string;
  message: string;
}

// Require full ISO datetime with date + time (e.g. 2024-06-01T09:00:00).
const ISO_DATETIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

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
    b.date.length <= 25 &&
    ISO_DATETIME_RE.test(b.date) &&
    (b.company === undefined || (typeof b.company === "string" && b.company.length <= 200)) &&
    (b.message === undefined || (typeof b.message === "string" && b.message.length <= 2000))
  );
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Booking service not configured" }, { status: 503 });
  }
  try {
    const parsed = new URL(webhookUrl);
    if (parsed.protocol !== "https:") throw new Error("not https");
  } catch {
    return NextResponse.json({ error: "Booking service not configured" }, { status: 503 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
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
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Booking service unavailable" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Booking service unavailable" }, { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }

  return NextResponse.json({ ok: true });
}
