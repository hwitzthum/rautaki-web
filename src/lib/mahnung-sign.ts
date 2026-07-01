import crypto from "crypto";

// Signs the Mahnung Approve/Skip links so only a real click from the approval
// email can trigger a reminder send. Shared by /api/mahnung-request (signs) and
// /api/mahnung-action (verifies). Params carry everything the reminder needs so
// the action endpoint (which has no CashCtrl access) can render without a lookup.
export interface MahnungParams {
  e: string; // client email
  v: string; // client first name
  n: string; // invoice number
  b: string; // amount, formatted (e.g. "CHF 1'200.00")
  f: string; // due date (display)
  i: string; // invoice id
  l: string; // level "1" | "2" | "3"
  a: string; // action "send" | "skip"
}

function canonical(p: MahnungParams): string {
  return [p.e.trim().toLowerCase(), p.v, p.n, p.b, p.f, p.i, p.l, p.a].join(
    "|",
  );
}

export function signMahnung(p: MahnungParams): string {
  const secret = process.env.MAHNUNG_SECRET ?? "";
  return crypto.createHmac("sha256", secret).update(canonical(p)).digest("hex");
}

export function verifyMahnung(p: MahnungParams, token: string): boolean {
  const secret = process.env.MAHNUNG_SECRET;
  if (!secret || !token) return false;
  const expected = signMahnung(p);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
