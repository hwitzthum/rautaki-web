import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Keep-alive cron for the shared Upstash store (rautaki-rate-limit), which
// Vercel's free tier archives after extended inactivity. A daily write+read
// resets that clock. This is the only side effect — no external calls, no
// token spend. Exempted from the maintenance gate in proxy.ts so it keeps the
// database warm even while the public site is in maintenance mode.
const KEY = "cron:keepalive";
const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

export async function GET(request: NextRequest) {
  // Vercel automatically attaches `Authorization: Bearer ${CRON_SECRET}` to
  // cron invocations when CRON_SECRET is set. Reject anything else so the
  // endpoint isn't a public write vector.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return NextResponse.json(
      { error: "Redis not configured: UPSTASH_REDIS_REST_URL/TOKEN missing." },
      { status: 500 },
    );
  }

  const redis = new Redis({ url, token });
  const wroteAt = new Date().toISOString();
  await redis.set(KEY, wroteAt, { ex: TTL_SECONDS });
  const readBack = await redis.get<string>(KEY);

  return NextResponse.json(
    { ok: true, key: KEY, wroteAt, readBack },
    { headers: { "cache-control": "no-store" } },
  );
}
