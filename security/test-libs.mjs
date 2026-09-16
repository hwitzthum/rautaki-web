// Pure-function unit tests for src/lib/*. No network, no Next.js.
// Requires Node 22+ for the built-in TypeScript stripper.
//
// Run from repo root:
//   node --experimental-strip-types --no-warnings security/test-libs.mjs
//
// Or wrap it with:
//   npm pkg set scripts.test:libs="node --experimental-strip-types --no-warnings security/test-libs.mjs"
//   npm run test:libs

import assert from "node:assert/strict";

const { validateChatBody, MAX_CHAT_INPUT_LENGTH } = await import(
  "../src/lib/chat-validation.ts"
);
const { canonicalize, signRequest, verifySignature, HMAC_SKEW_SECONDS } =
  await import("../src/lib/hmac.ts");
const { filterBotText, filterChatResponse } = await import(
  "../src/lib/chat-output-filter.ts"
);
const {
  createUnsubscribeToken,
  emailIdempotencyKey,
  isValidEmail,
  resolveUnsubscribeCredentials,
  tokenMatches,
  verifyUnsubscribeToken,
} = await import("../src/lib/email-security.ts");
const { readJsonObject } = await import("../src/lib/request-body.ts");
const { isSsrfTarget, validateWebhookUrl } = await import(
  "../src/lib/ssrf-guard.ts"
);

let pass = 0;
let fail = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    pass++;
  } catch (err) {
    console.log(`  ✗ ${name}\n    ${err.message}`);
    fail++;
  }
}

// ── chat-validation ──────────────────────────────────────────────────────────
console.log("\nchat-validation");

const validUuid = "550e8400-e29b-41d4-a716-446655440000";

test("accepts a well-formed request", () => {
  const r = validateChatBody({
    action: "sendMessage",
    sessionId: validUuid,
    chatInput: "Was bietet Rautaki an?",
  });
  assert.equal(r.ok, true);
});

test("rejects non-object", () => {
  assert.equal(validateChatBody("hi").ok, false);
  assert.equal(validateChatBody(null).ok, false);
  assert.equal(validateChatBody(42).ok, false);
});

test("rejects bad action", () => {
  const r = validateChatBody({
    action: "loadPreviousSession",
    sessionId: validUuid,
    chatInput: "hi",
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "bad-action");
});

test("rejects non-UUID sessionId", () => {
  assert.equal(
    validateChatBody({ action: "sendMessage", sessionId: "abc", chatInput: "hi" }).ok,
    false,
  );
  assert.equal(
    validateChatBody({ action: "sendMessage", sessionId: 123, chatInput: "hi" }).ok,
    false,
  );
});

test("rejects sessionId that's a UUID but not v4", () => {
  const v1 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  assert.equal(
    validateChatBody({ action: "sendMessage", sessionId: v1, chatInput: "hi" }).ok,
    false,
  );
});

test("rejects empty chatInput", () => {
  assert.equal(
    validateChatBody({ action: "sendMessage", sessionId: validUuid, chatInput: "" }).ok,
    false,
  );
});

test("rejects oversized chatInput", () => {
  const big = "a".repeat(MAX_CHAT_INPUT_LENGTH + 1);
  const r = validateChatBody({ action: "sendMessage", sessionId: validUuid, chatInput: big });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "chatInput-too-long");
});

test("accepts chatInput at exactly the cap", () => {
  const cap = "a".repeat(MAX_CHAT_INPUT_LENGTH);
  assert.equal(
    validateChatBody({ action: "sendMessage", sessionId: validUuid, chatInput: cap }).ok,
    true,
  );
});

test("rejects NUL byte", () => {
  const r = validateChatBody({
    action: "sendMessage",
    sessionId: validUuid,
    chatInput: `hi\u0000there`,
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "chatInput-control-chars");
});

test("rejects CR and TAB", () => {
  for (const ch of ["\r", "\t", "\u001B", "\u0007"]) {
    const r = validateChatBody({
      action: "sendMessage",
      sessionId: validUuid,
      chatInput: `hi${ch}there`,
    });
    assert.equal(r.ok, false, `should reject ${JSON.stringify(ch)}`);
  }
});

test("accepts LF (newline)", () => {
  const r = validateChatBody({
    action: "sendMessage",
    sessionId: validUuid,
    chatInput: "line1\nline2",
  });
  assert.equal(r.ok, true);
});

test("rejects >50 newlines", () => {
  const text = "a\n".repeat(51) + "end";
  const r = validateChatBody({
    action: "sendMessage",
    sessionId: validUuid,
    chatInput: text,
  });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "chatInput-too-many-newlines");
});

test("drops extra fields silently", () => {
  const r = validateChatBody({
    action: "sendMessage",
    sessionId: validUuid,
    chatInput: "hi",
    metadata: { admin: true },
  });
  assert.equal(r.ok, true);
  assert.deepEqual(Object.keys(r.body).sort(), ["action", "chatInput", "sessionId"]);
});

// ── hmac ─────────────────────────────────────────────────────────────────────
console.log("\nhmac");

const SECRET = "test-secret-xyz";
const goodBody = {
  action: "sendMessage",
  sessionId: validUuid,
  chatInput: "Was bietet Rautaki an?",
};

test("canonicalize is deterministic and key-ordered", () => {
  const a = canonicalize(goodBody);
  const b = canonicalize({
    chatInput: goodBody.chatInput,
    sessionId: goodBody.sessionId,
    action: goodBody.action,
  });
  assert.equal(a, b);
  assert.equal(a, JSON.stringify(goodBody));
});

test("sign + verify roundtrip", () => {
  const header = signRequest(goodBody, SECRET);
  const r = verifySignature(header, goodBody, SECRET);
  assert.equal(r.ok, true);
});

test("verify rejects tampered body", () => {
  const header = signRequest(goodBody, SECRET);
  const tampered = { ...goodBody, chatInput: "different message" };
  const r = verifySignature(header, tampered, SECRET);
  assert.equal(r.ok, false);
  assert.equal(r.reason, "bad-mac");
});

test("verify rejects wrong secret", () => {
  const header = signRequest(goodBody, SECRET);
  const r = verifySignature(header, goodBody, "other-secret");
  assert.equal(r.ok, false);
  assert.equal(r.reason, "bad-mac");
});

test("verify rejects missing header", () => {
  const r = verifySignature(null, goodBody, SECRET);
  assert.equal(r.ok, false);
  assert.equal(r.reason, "bad-format");
});

test("verify rejects malformed header", () => {
  for (const bad of ["", "v1=abc", "t=x,v1=y", "t=123,v1=short"]) {
    const r = verifySignature(bad, goodBody, SECRET);
    assert.equal(r.ok, false, `should reject "${bad}"`);
  }
});

test("verify rejects stale signature", () => {
  const header = signRequest(goodBody, SECRET);
  const futureNow = Math.floor(Date.now() / 1000) + HMAC_SKEW_SECONDS + 10;
  const r = verifySignature(header, goodBody, SECRET, futureNow);
  assert.equal(r.ok, false);
  assert.equal(r.reason, "stale");
});

// ── chat-output-filter ───────────────────────────────────────────────────────
console.log("\nchat-output-filter");

test("strips raw HTML tags", () => {
  assert.equal(
    filterBotText("hello <script>alert(1)</script> world"),
    "hello alert(1) world",
  );
  assert.equal(filterBotText("<img src=x onerror=alert(1)>"), "");
});

test("neutralises javascript: URLs in markdown links", () => {
  const out = filterBotText("[click me](javascript:alert(1))");
  assert.ok(out.includes("about:blank"), `got: ${out}`);
  assert.ok(!out.toLowerCase().includes("javascript:"));
});

test("neutralises data: URLs in markdown links", () => {
  const out = filterBotText("[x](data:text/html,<script>alert(1)</script>)");
  assert.ok(out.includes("about:blank"));
});

test("keeps safe https links", () => {
  const out = filterBotText("see [docs](https://docs.rautaki.ch/foo)");
  assert.ok(out.includes("https://docs.rautaki.ch/foo"));
});

test("drops images from non-allowlisted hosts", () => {
  const out = filterBotText("![pwn](https://evil.example/pixel.gif)");
  assert.equal(out, "");
});

test("keeps images from allowlisted hosts", () => {
  const out = filterBotText("![hero](https://images.unsplash.com/photo-1.jpg)");
  assert.ok(out.includes("images.unsplash.com"));
  // n8n.cloud is NOT in IMAGE_HOST_ALLOWLIST — bot responses must not embed
  // images from external hosts that could be used as tracking pixels or for
  // exfiltration. The allowlist is intentionally narrow.
  const out2 = filterBotText("![asset](https://my-workspace.n8n.cloud/a.png)");
  assert.equal(out2, "", "n8n.cloud images should be stripped (not in allowlist)");
});

test("keeps internal links unchanged for German pages", () => {
  const md = "[Artikel](/wissen/ki-tools-datenschutz-vereine-stiftungen) · [Erstgespräch](/booking)";
  assert.equal(filterBotText(md), md);
  assert.equal(filterBotText(md, "de"), md);
});

test("prefixes internal section links with /en for English pages", () => {
  assert.equal(
    filterBotText("[article](/wissen/ki-strategie-verwaltungsrat) and [book](/booking)", "en"),
    "[article](/en/wissen/ki-strategie-verwaltungsrat) and [book](/en/booking)",
  );
  assert.equal(filterBotText("[prices](/services#preise)", "en"), "[prices](/en/services#preise)");
  assert.equal(filterBotText("[home](/)", "en"), "[home](/en)");
  assert.equal(
    filterBotText("[x](https://www.rautaki.ch/vorgehen)", "en"),
    "[x](https://www.rautaki.ch/en/vorgehen)",
  );
});

test("leaves /en, German-only and external links alone on English pages", () => {
  for (const md of [
    "[a](/en/wissen/eu-ai-act-schweizer-npos)",
    "[checker](/lab/eu-ai-act-check.html)",
    "[pdf](/downloads/rautaki-ki-beratung-booklet.pdf)",
    "[apps](https://apps.rautaki.ch/en/ki-radar)",
    "[mail](mailto:hello@rautaki.ch)",
    "[w](/wissenschaft)",
  ]) {
    assert.equal(filterBotText(md, "en"), md);
  }
});

test("turns a bare bracketed internal path into a link", () => {
  assert.equal(
    filterBotText("Artikel: [/wissen/ki-tools-datenschutz-vereine-stiftungen]"),
    "Artikel: [/wissen/ki-tools-datenschutz-vereine-stiftungen](/wissen/ki-tools-datenschutz-vereine-stiftungen)",
  );
  assert.equal(
    filterBotText("see [/booking]", "en"),
    "see [/booking](/en/booking)",
  );
  // Not an internal section path, or already a link: untouched.
  assert.equal(filterBotText("[optional] note"), "[optional] note");
  assert.equal(filterBotText("[/booking](/booking)"), "[/booking](/booking)");
});

test("localising does not re-enable dangerous URLs", () => {
  const out = filterBotText("[x](javascript:alert(1))", "en");
  assert.ok(out.includes("about:blank"), `got: ${out}`);
});

test("filterChatResponse works on {output} envelope", () => {
  const r = filterChatResponse({ output: "hi <script>bad</script>" });
  assert.deepEqual(r, { output: "hi bad" });
});

test("filterChatResponse drops unknown fields (allowlist-only output)", () => {
  // filterChatResponse is an allowlist filter: only known chat-widget fields
  // (output, text, message) are forwarded to the browser. Unknown fields such
  // as n8n workflow metadata or execution IDs are silently dropped so they
  // are never visible to clients. This is the correct, secure behaviour.
  const r = filterChatResponse({ output: "ok", meta: { foo: 1 } });
  assert.deepEqual(r, { output: "ok" });
  assert.deepEqual(filterChatResponse("raw upstream secret"), {});
  assert.deepEqual(filterChatResponse(null), {});
});

// ── email-security ───────────────────────────────────────────────────────────
console.log("\nemail-security");

test("validates practical mailbox addresses", () => {
  assert.equal(isValidEmail("Person.Name+tag@example.co.uk"), true);
  for (const invalid of [
    ".person@example.com",
    "person.@example.com",
    "person..name@example.com",
    "person@example",
    "person@example.c",
    "person@-example.com",
  ]) {
    assert.equal(isValidEmail(invalid), false, invalid);
  }
});

test("compares bearer tokens without a length-dependent branch", () => {
  assert.equal(tokenMatches("correct horse", "correct horse"), true);
  assert.equal(tokenMatches("wrong", "correct horse"), false);
  assert.equal(tokenMatches(42, "correct horse"), false);
});

test("email idempotency keys are stable and do not expose identifiers", () => {
  const value = "person@example.com";
  const key = emailIdempotencyKey("referral", value);
  assert.equal(key, emailIdempotencyKey("referral", value));
  assert.ok(key.startsWith("referral-"));
  assert.equal(key.includes(value), false);
});

test("unsubscribe signatures normalize email casing", () => {
  const secret = "unsubscribe-test-secret";
  const token = createUnsubscribeToken(" Person@Example.com ", secret);
  assert.equal(
    verifyUnsubscribeToken("person@example.com", token, secret),
    true,
  );
  assert.equal(
    verifyUnsubscribeToken("other@example.com", token, secret),
    false,
  );
  assert.equal(verifyUnsubscribeToken("person@example.com", "zz", secret), false);
});

test("one-click form keeps signed URL credentials", () => {
  const query = new URLSearchParams({
    e: "Person@Example.com",
    t: "signed-token",
  });
  const oneClickForm = new FormData();
  oneClickForm.set("List-Unsubscribe", "One-Click");
  assert.deepEqual(resolveUnsubscribeCredentials(query, oneClickForm), {
    email: "person@example.com",
    token: "signed-token",
  });
});

test("browser confirmation form credentials override the URL", () => {
  const query = new URLSearchParams({ e: "old@example.com", t: "old" });
  const form = new FormData();
  form.set("e", " New@Example.com ");
  form.set("t", " new-token ");
  assert.deepEqual(resolveUnsubscribeCredentials(query, form), {
    email: "new@example.com",
    token: "new-token",
  });
});

// ── request-body ─────────────────────────────────────────────────────────────
console.log("\nrequest-body");

const validObjectResult = await readJsonObject(
  new Request("https://example.com", { method: "POST", body: '{"ok":true}' }),
);
test("accepts a bounded JSON object", () => {
  const result = validObjectResult;
  assert.deepEqual(result, { ok: true, body: { ok: true } });
});

const invalidObjectResults = await Promise.all(
  ["null", "[]", "{"].map((body) =>
    readJsonObject(
      new Request("https://example.com", { method: "POST", body }),
    ),
  ),
);
const oversizedObjectResult = await readJsonObject(
  new Request("https://example.com", { method: "POST", body: '{"x":"123"}' }),
  5,
);
test("rejects null, arrays, malformed JSON, and oversized bodies", () => {
  for (const result of invalidObjectResults) {
    assert.deepEqual(result, { ok: false, status: 400 });
  }
  assert.deepEqual(oversizedObjectResult, { ok: false, status: 413 });
});

// ── ssrf-guard ───────────────────────────────────────────────────────────────
console.log("\nssrf-guard");

test("blocks internal and alternate-spelling network targets", () => {
  for (const host of [
    "localhost",
    "api.internal",
    "127.0.0.1",
    "127.1",
    "0x7f000001",
    "169.254.169.254",
    "198.18.0.1",
    "224.0.0.1",
    "[::1]",
    "[::ffff:127.0.0.1]",
    "[2001:db8::1]",
    "[ff02::1]",
  ]) {
    assert.equal(isSsrfTarget(host), true, host);
  }
  assert.equal(isSsrfTarget("hooks.example.com"), false);
});

test("webhooks require public HTTPS URLs", () => {
  assert.equal(validateWebhookUrl("http://hooks.example.com").ok, false);
  assert.equal(validateWebhookUrl("https://127.0.0.1/hook").ok, false);
  assert.equal(validateWebhookUrl("https://hooks.example.com/path").ok, true);
});

// ── result ───────────────────────────────────────────────────────────────────
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
