import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const MAX_EMAIL_LENGTH = 254;

// Pragmatic mailbox validation for transactional mail. In addition to a
// well-formed domain, reject leading/trailing/consecutive dots in the local
// part; accepting those made the old regex disagree with its own contract.
const EMAIL_RE =
  /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const email = value.trim();
  return email.length > 0 && email.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(email);
}

/** Compare an untrusted bearer token without leaking the expected length. */
export function tokenMatches(provided: unknown, expected: string): boolean {
  if (typeof provided !== "string" || !expected) return false;
  const actualDigest = createHmac("sha256", expected).update(provided).digest();
  const expectedDigest = createHmac("sha256", expected).update(expected).digest();
  return timingSafeEqual(actualDigest, expectedDigest);
}

export function createUnsubscribeToken(email: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(normalizeEmail(email))
    .digest("hex");
}

/** Stable, non-PII key for Resend's protection against ambiguous retries. */
export function emailIdempotencyKey(scope: string, value: string): string {
  const digest = createHash("sha256").update(value).digest("hex");
  return `${scope}-${digest}`;
}

export function verifyUnsubscribeToken(
  email: string,
  token: string,
  secret: string | undefined,
): boolean {
  if (!secret || !isValidEmail(email) || !/^[0-9a-f]{64}$/i.test(token)) {
    return false;
  }
  const expected = Buffer.from(createUnsubscribeToken(email, secret), "hex");
  const actual = Buffer.from(token, "hex");
  return timingSafeEqual(actual, expected);
}

export interface UnsubscribeCredentials {
  email: string;
  token: string;
}

/**
 * Resolve signed unsubscribe credentials from a URL and an optional form.
 * RFC 8058 one-click clients POST only `List-Unsubscribe=One-Click` in the
 * body, so the signed e/t query parameters must remain the fallback.
 */
export function resolveUnsubscribeCredentials(
  searchParams: URLSearchParams,
  form?: FormData,
): UnsubscribeCredentials {
  const queryEmail = searchParams.get("e") ?? "";
  const queryToken = searchParams.get("t") ?? "";
  const formEmail = form?.get("e");
  const formToken = form?.get("t");

  return {
    email: normalizeEmail(
      typeof formEmail === "string" && formEmail.trim() ? formEmail : queryEmail,
    ),
    token: (
      typeof formToken === "string" && formToken.trim() ? formToken : queryToken
    ).trim(),
  };
}
