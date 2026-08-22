import { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Shared sliding-window rate limiter backed by Upstash Redis, used by the
// server-to-server (n8n-triggered) email-send routes. Falls back to a
// per-instance in-memory limiter in dev; fails closed in production if
// Redis isn't configured, since an in-memory limiter is ineffective across
// serverless instances (same policy as /api/chat and /api/lab-access).
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  upstashUrl && upstashToken
    ? new Redis({ url: upstashUrl, token: upstashToken })
    : null;

const limiters = new Map<string, Ratelimit>();
function getLimiter(prefix: string, max: number, windowSeconds: number): Ratelimit {
  const key = `${prefix}:${max}:${windowSeconds}`;
  let limiter = limiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(max, `${windowSeconds} s`),
      analytics: false,
      prefix: `rl:${prefix}`,
    });
    limiters.set(key, limiter);
  }
  return limiter;
}

const memoryFallback = new Map<string, { count: number; resetAt: number }>();
function memoryLimit(mapKey: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  for (const [k, v] of memoryFallback) {
    if (now > v.resetAt) memoryFallback.delete(k);
  }
  const entry = memoryFallback.get(mapKey);
  if (!entry || now > entry.resetAt) {
    memoryFallback.set(mapKey, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= max) return true;
  entry.count++;
  return false;
}

export type RateLimitResult = "ok" | "limited" | "unavailable";

/**
 * Sliding-window rate limit keyed by `${prefix}:${key}` (typically an IP).
 * Returns "unavailable" in production when Redis isn't configured — callers
 * must fail closed (503) rather than silently allowing unlimited requests.
 */
export async function checkRateLimit(
  prefix: string,
  key: string,
  max: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (redis) {
    try {
      const { success } = await getLimiter(prefix, max, windowSeconds).limit(key);
      return success ? "ok" : "limited";
    } catch (error) {
      console.error(
        `[${prefix}] Redis rate-limit check failed:`,
        error instanceof Error ? error.name : "unknown",
      );
      return "unavailable";
    }
  }

  if (process.env.NODE_ENV === "production") {
    console.error(
      `[${prefix}] UPSTASH_REDIS_REST_URL/TOKEN not set in production — rejecting request to protect endpoint.`,
    );
    return "unavailable";
  }

  const limited = memoryLimit(`${prefix}:${key}`, max, windowSeconds * 1000);
  return limited ? "limited" : "ok";
}

/**
 * Resolves the verified client IP from the rightmost X-Forwarded-For entry —
 * on Vercel that's the entry appended by the edge network; every other hop
 * is user-controlled and must not be trusted for rate limiting.
 */
export function getClientIp(request: NextRequest): string | null {
  const xff = request.headers.get("x-forwarded-for");
  if (!xff) return null;
  return (
    xff
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .at(-1) ?? null
  );
}
