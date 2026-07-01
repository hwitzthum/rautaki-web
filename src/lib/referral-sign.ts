import crypto from "crypto";

// Signs the referral Approve/Skip action links so only Harry's real click
// (from the approval email) can trigger a send. Shared by /api/referral-request
// (signs) and /api/referral-action (verifies).
export interface ReferralParams {
  e: string; // client email
  v: string; // client first name
  c: string; // company
  o: string; // opportunity id
  a: string; // action: "send" | "skip"
}

function canonical(p: ReferralParams): string {
  return [p.e.trim().toLowerCase(), p.v, p.c, p.o, p.a].join("|");
}

export function signReferral(p: ReferralParams): string {
  const secret = process.env.REFERRAL_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(canonical(p)).digest("hex");
}

export function verifyReferral(p: ReferralParams, token: string): boolean {
  const secret = process.env.REFERRAL_SECRET;
  if (!secret || !token) return false;
  const expected = signReferral(p);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
