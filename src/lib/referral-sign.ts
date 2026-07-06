import crypto from "crypto";

// Signs the referral Approve/Skip action links so only Harry's real click
// (from the approval email) can trigger a send. Shared by /api/referral-request
// (signs) and /api/referral-action (verifies).
//
// The expiry `x` is part of the signed canonical string, so a leaked link
// (forwarded email, browser history, Referer) stops working after LINK_TTL —
// without it, replay was bounded only by the Redis dedup set.
export interface ReferralParams {
  e: string; // client email
  v: string; // client first name
  c: string; // company
  o: string; // opportunity id
  a: string; // action: "send" | "skip"
  x: string; // expiry, unix seconds
}

export const LINK_TTL_SECONDS = 14 * 24 * 60 * 60; // 14 Tage

/** Expiry value for a freshly issued link (unix seconds, as URL param). */
export function linkExpiry(nowMs = Date.now()): string {
  return String(Math.floor(nowMs / 1000) + LINK_TTL_SECONDS);
}

function canonical(p: ReferralParams): string {
  return [p.e.trim().toLowerCase(), p.v, p.c, p.o, p.a, p.x].join("|");
}

export function signReferral(p: ReferralParams): string {
  const secret = process.env.REFERRAL_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(canonical(p)).digest("hex");
}

export function verifyReferral(
  p: ReferralParams,
  token: string,
  nowMs = Date.now(),
): boolean {
  const secret = process.env.REFERRAL_SECRET;
  if (!secret || !token) return false;
  const expected = signReferral(p);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  // Expiry only after the HMAC held — x is authenticated, not attacker-chosen.
  const exp = Number(p.x);
  return Number.isFinite(exp) && Math.floor(nowMs / 1000) <= exp;
}
