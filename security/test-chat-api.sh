#!/usr/bin/env bash
# Black-box regression tests for /api/chat.
#
# Run with the Next.js dev server up:
#   npm run dev     # in another terminal
#   ./security/test-chat-api.sh
#
# Or against any deployed URL:
#   BASE_URL=https://www.rautaki.ch ./security/test-chat-api.sh
#
# These tests do NOT exercise the LLM behind n8n (that's the §5.4–§5.8 stuff
# in security/chatbot-hardening-plan.md and must be run separately, since
# every call burns LLM tokens). These cover the security controls on the
# proxy: origin gate, validation, rate limit, output filter passthrough.

set -uo pipefail
BASE_URL="${BASE_URL:-http://localhost:3000}"
ENDPOINT="$BASE_URL/api/chat"
SID="550e8400-e29b-41d4-a716-446655440000"

pass=0
fail=0
note() { printf '\n\033[36m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; pass=$((pass+1)); }
ko()   { printf '  \033[31m✗\033[0m %s — %s\n' "$1" "$2"; fail=$((fail+1)); }

assert_status() {
  local name="$1" expected="$2" got="$3" extra="${4:-}"
  if [[ "$got" == "$expected" ]]; then ok "$name (status=$got)"
  else ko "$name" "expected $expected, got $got. $extra"; fi
}

curl_status() {
  curl -s -o /tmp/chat-resp -w "%{http_code}" --max-time 30 "$@"
}

# ── 1. Method enumeration ────────────────────────────────────────────────────
note "1. Method enumeration — only POST allowed"
for M in GET PUT DELETE PATCH OPTIONS; do
  code=$(curl_status -X "$M" "$ENDPOINT")
  assert_status "$M → 405" "405" "$code"
done

# ── 2. Origin gate (CSRF defence) ────────────────────────────────────────────
note "2. Origin gate — forged Origin header is rejected"
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Origin: https://evil.example" \
  -H "Content-Type: application/json" \
  --data "{\"action\":\"sendMessage\",\"sessionId\":\"$SID\",\"chatInput\":\"hi\"}")
assert_status "forged Origin → 403" "403" "$code"

# Same-origin (no Origin header at all, server-to-server style)
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data "{\"action\":\"sendMessage\",\"sessionId\":\"$SID\",\"chatInput\":\"hi\"}")
# Acceptable outcomes: 200/502/503 (upstream-dependent), but NOT 403.
if [[ "$code" == "403" ]]; then
  ko "no Origin header should not 403" "got $code (the gate is too strict)"
else
  ok "no Origin header passes gate (status=$code)"
fi

# ── 3. Input validation ──────────────────────────────────────────────────────
note "3. Input validation — malformed payloads → 400"

# 3a. invalid JSON
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data '{invalid json')
assert_status "invalid JSON" "400" "$code"

# 3b. wrong action
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data "{\"action\":\"loadPreviousSession\",\"sessionId\":\"$SID\",\"chatInput\":\"hi\"}")
assert_status "wrong action" "400" "$code"

# 3c. non-UUID sessionId
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data '{"action":"sendMessage","sessionId":"not-a-uuid","chatInput":"hi"}')
assert_status "bad sessionId" "400" "$code"

# 3d. v1 UUID (not v4)
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data "{\"action\":\"sendMessage\",\"sessionId\":\"6ba7b810-9dad-11d1-80b4-00c04fd430c8\",\"chatInput\":\"hi\"}")
assert_status "non-v4 UUID" "400" "$code"

# 3e. empty chatInput
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data "{\"action\":\"sendMessage\",\"sessionId\":\"$SID\",\"chatInput\":\"\"}")
assert_status "empty chatInput" "400" "$code"

# 3f. control char in chatInput
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data "{\"action\":\"sendMessage\",\"sessionId\":\"$SID\",\"chatInput\":\"hi\\u0000there\"}")
assert_status "NUL in chatInput" "400" "$code"

# ── 4. Size cap ──────────────────────────────────────────────────────────────
note "4. Body size cap — >8 KB → 413"
python3 -c "import json,sys; sys.stdout.write(json.dumps({'action':'sendMessage','sessionId':'$SID','chatInput':'a'*9000}))" > /tmp/bigbody.json
code=$(curl_status -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data-binary "@/tmp/bigbody.json")
assert_status "9 KB body" "413" "$code"

# ── 5. Rate limit ────────────────────────────────────────────────────────────
note "5. Rate limit — burst should produce 429 within the window"
# Send 35 quick requests. With default CHAT_RATE_MAX=30 some MUST 429.
got_429=0
for i in $(seq 1 35); do
  code=$(curl_status -X POST "$ENDPOINT" \
    -H "Content-Type: application/json" \
    --data "{\"action\":\"sendMessage\",\"sessionId\":\"$SID\",\"chatInput\":\"ping $i\"}")
  if [[ "$code" == "429" ]]; then got_429=$((got_429+1)); fi
done
if (( got_429 > 0 )); then
  ok "rate limit fires ($got_429 / 35 requests → 429)"
else
  ko "rate limit" "no 429 in 35 burst — limiter not active?"
fi

# ── result ───────────────────────────────────────────────────────────────────
printf '\n\033[1m%d passed, %d failed\033[0m\n' "$pass" "$fail"
exit $(( fail == 0 ? 0 : 1 ))
