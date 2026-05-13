// ── Chat request validation ──────────────────────────────────────────────────
//
// The proxy refuses any request that does not pass this validator. We err on
// the side of "fail closed": anything weird is a 400.
//
// Caps & rules (mirrors §6.2 HARD-10 of the hardening plan):
//   * action      — must be exactly "sendMessage". (loadPreviousSession is
//                   disabled on the widget and we don't proxy it.)
//   * sessionId   — must be a v4 UUID. The browser generates these via
//                   crypto.randomUUID(); a non-UUID value is either a bug
//                   or an attacker.
//   * chatInput   — 1..4096 chars, no control characters (except newline),
//                   no NUL, must be valid UTF-8 (already ensured by JSON
//                   parsing).
//   * extra keys  — silently dropped at re-serialize time; we don't error
//                   so that a future widget version that adds a benign
//                   field still works.

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Reject all C0 control chars except \n (0x0A). \r and \t are rejected
// because they're injection vectors for downstream tools that interpret
// line-oriented or whitespace-delimited input. Built from a string literal
// using \uXXXX escapes to avoid literal-control-char roundtrip hazards.
const CONTROL_CHARS = new RegExp(
  "[\\u0000-\\u0009\\u000B-\\u001F\\u007F]",
);

// Heuristic against prompt-injection enumeration: more than 50 newlines in
// a single message is almost never legitimate user input.
const MAX_NEWLINES = 50;

export const MAX_CHAT_INPUT_LENGTH = 4096;

export interface CleanChatBody {
  action: "sendMessage";
  sessionId: string;
  chatInput: string;
}

export type ValidationFailure =
  | "not-object"
  | "bad-action"
  | "bad-sessionId"
  | "chatInput-type"
  | "chatInput-empty"
  | "chatInput-too-long"
  | "chatInput-control-chars"
  | "chatInput-too-many-newlines";

export type ValidationResult =
  | { ok: true; body: CleanChatBody }
  | { ok: false; reason: ValidationFailure };

export function validateChatBody(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, reason: "not-object" };
  }
  const b = input as Record<string, unknown>;

  if (b.action !== "sendMessage") {
    return { ok: false, reason: "bad-action" };
  }
  if (typeof b.sessionId !== "string" || !UUID_V4.test(b.sessionId)) {
    return { ok: false, reason: "bad-sessionId" };
  }
  if (typeof b.chatInput !== "string") {
    return { ok: false, reason: "chatInput-type" };
  }
  const chatInput = b.chatInput;
  if (chatInput.length === 0) {
    return { ok: false, reason: "chatInput-empty" };
  }
  if (chatInput.length > MAX_CHAT_INPUT_LENGTH) {
    return { ok: false, reason: "chatInput-too-long" };
  }
  if (CONTROL_CHARS.test(chatInput)) {
    return { ok: false, reason: "chatInput-control-chars" };
  }
  const newlines = (chatInput.match(/\n/g) ?? []).length;
  if (newlines > MAX_NEWLINES) {
    return { ok: false, reason: "chatInput-too-many-newlines" };
  }

  return {
    ok: true,
    body: {
      action: "sendMessage",
      sessionId: b.sessionId,
      chatInput,
    },
  };
}
