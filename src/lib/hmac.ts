import { createHmac, timingSafeEqual } from "node:crypto";

// ── HMAC signature scheme ────────────────────────────────────────────────────
//
// The proxy (/api/chat) signs every request it forwards to the n8n webhook.
// The n8n workflow must verify the signature before doing any work.
//
// Format (Stripe-style, copy that interop pattern):
//
//   X-Rautaki-Signature: t=<unix-seconds>,v1=<hex-hmac-sha256>
//
// Payload signed:
//
//   `${t}.${canonicalBody}`
//
// where `canonicalBody` is `JSON.stringify({action, sessionId, chatInput})`
// with the keys ALWAYS in that exact order. Both sides must agree on the
// shape exactly — if you add a field, add it consistently here and in the
// n8n verifier (see security/n8n-workflow-hardening.md).
//
// Replay protection: the verifier rejects timestamps more than 5 minutes
// off from now in either direction.
//
// Why HMAC instead of mTLS / OAuth / an API key in a header:
//   * the n8n webhook is on a different host (Render) — mTLS is operational
//     overhead we don't need yet,
//   * a static API key would be stolen if the n8n instance were compromised
//     and replayed forever; HMAC at least binds each call to a timestamp
//     and to its own body.

export const HMAC_HEADER = "X-Rautaki-Signature";
export const HMAC_SKEW_SECONDS = 300;

export interface SignedBody {
  action: "sendMessage";
  sessionId: string;
  chatInput: string;
}

/**
 * Build the canonical string that both sides hash. Object key order is
 * fixed here to avoid serializer drift between Node versions.
 */
export function canonicalize(body: SignedBody): string {
  return JSON.stringify({
    action: body.action,
    sessionId: body.sessionId,
    chatInput: body.chatInput,
  });
}

/**
 * Produce an X-Rautaki-Signature header value for `body` using `secret`.
 * Returns `null` if no secret is configured (the caller decides whether
 * to refuse or to forward unsigned; in production the caller MUST refuse).
 */
export function signRequest(body: SignedBody, secret: string): string {
  const t = Math.floor(Date.now() / 1000);
  const v1 = createHmac("sha256", secret)
    .update(`${t}.${canonicalize(body)}`)
    .digest("hex");
  return `t=${t},v1=${v1}`;
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "bad-format" | "stale" | "bad-mac" };

/**
 * Verify an X-Rautaki-Signature header. Used by tests; the n8n side has its
 * own implementation (different language/environment), kept byte-compatible.
 */
export function verifySignature(
  header: string | null | undefined,
  body: SignedBody,
  secret: string,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): VerifyResult {
  if (!header) return { ok: false, reason: "bad-format" };
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      if (i === -1) return [p, ""];
      return [p.slice(0, i), p.slice(i + 1)];
    }),
  );
  const t = Number(parts.t);
  const v1 = parts.v1;
  if (!Number.isFinite(t) || typeof v1 !== "string" || v1.length !== 64) {
    return { ok: false, reason: "bad-format" };
  }
  if (Math.abs(nowSeconds - t) > HMAC_SKEW_SECONDS) {
    return { ok: false, reason: "stale" };
  }
  const expected = createHmac("sha256", secret)
    .update(`${t}.${canonicalize(body)}`)
    .digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(v1, "hex");
  if (a.length !== b.length) return { ok: false, reason: "bad-mac" };
  return timingSafeEqual(a, b) ? { ok: true } : { ok: false, reason: "bad-mac" };
}
