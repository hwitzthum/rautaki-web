import { timingSafeEqual, createHmac } from "node:crypto";
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

// HMAC both inputs to a fixed-length digest before comparison. A raw string
// compare with a length pre-check leaks the secret's length via timing —
// an attacker probing with Authorization headers of different lengths can
// detect the exact secret length by observing whether the check short-circuits
// before timingSafeEqual runs. Fixed-length HMAC digests eliminate that oracle.
function tokenDigest(s: string): Buffer {
  return createHmac("sha256", "rautaki-cron-auth-v1").update(s).digest();
}

export async function GET(request: NextRequest) {
  // Vercel automatically attaches `Authorization: Bearer ${CRON_SECRET}` to
  // cron invocations when CRON_SECRET is set. Fail closed: if the secret is
  // not configured the endpoint must still require auth rather than becoming
  // publicly accessible. Provision CRON_SECRET in the Vercel project env vars.
  const secret = process.env.CRON_SECRET;
  const provided = request.headers.get("authorization") ?? "";
  const authorized =
    !!secret &&
    timingSafeEqual(tokenDigest(provided), tokenDigest(`Bearer ${secret}`));
  if (!authorized) {
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
