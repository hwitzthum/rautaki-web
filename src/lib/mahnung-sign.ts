import crypto from "crypto";

// Signs the Mahnung Approve/Skip links so only a real click from the approval
// email can trigger a reminder send. Shared by /api/mahnung-request (signs) and
// /api/mahnung-action (verifies). Params carry everything the reminder needs so
// the action endpoint (which has no CashCtrl access) can render without a lookup.
//
// The expiry `x` is part of the signed canonical string, so a leaked link
// (forwarded email, browser history, Referer) stops working after LINK_TTL —
// without it, replay was bounded only by the Redis dedup set.
export interface MahnungParams {
  e: string; // client email
  v: string; // client first name
  n: string; // invoice number
  b: string; // amount, formatted (e.g. "CHF 1'200.00")
  f: string; // due date (display)
  i: string; // invoice id
  l: string; // level "1" | "2" | "3"
  a: string; // action "send" | "skip"
  x: string; // expiry, unix seconds
}

export const LINK_TTL_SECONDS = 14 * 24 * 60 * 60; // 14 Tage

/** Expiry value for a freshly issued link (unix seconds, as URL param). */
export function linkExpiry(nowMs = Date.now()): string {
  return String(Math.floor(nowMs / 1000) + LINK_TTL_SECONDS);
}

function canonical(p: MahnungParams): string {
  return [
    p.e.trim().toLowerCase(),
    p.v,
    p.n,
    p.b,
    p.f,
    p.i,
    p.l,
    p.a,
    p.x,
  ].join("|");
}

export function signMahnung(p: MahnungParams): string {
  const secret = process.env.MAHNUNG_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(canonical(p)).digest("hex");
}

export function verifyMahnung(
  p: MahnungParams,
  token: string,
  nowMs = Date.now(),
): boolean {
  const secret = process.env.MAHNUNG_SECRET;
  if (!secret || !token) return false;
  const expected = signMahnung(p);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  // Expiry only after the HMAC held — x is authenticated, not attacker-chosen.
  const exp = Number(p.x);
  return Number.isFinite(exp) && Math.floor(nowMs / 1000) <= exp;
}
