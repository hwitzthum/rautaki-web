// ── SSRF guard ───────────────────────────────────────────────────────────────
//
// Shared validation for server-configured outbound webhook URLs (n8n chat
// proxy, n8n Lab-CRM webhook, ...). These URLs come from Vercel env vars, not
// end-user input, but an operator typo or a compromised env var should not be
// able to turn a fetch into an SSRF against internal infrastructure — hence
// defence-in-depth here rather than trusting "it's just a config value".
//
// Both checks are static, on the configured hostname only:
//   1. requireHttpsUrl  — protocol must be https:
//   2. isSsrfTarget     — hostname must not be a private/loopback/link-local/
//                         reserved address or a well-known internal hostname
//
// Note: this does NOT prevent DNS rebinding (the hostname could legitimately
// resolve to a private IP at request time). On Vercel serverless the network
// egress is sandboxed, so the residual risk is low, but the guard still
// catches the most common mistake of accidentally pointing a webhook at an
// internal endpoint.

/**
 * Returns true if the hostname looks like a private/loopback/link-local/reserved
 * address or a known-internal hostname.
 */
export function isSsrfTarget(hostname: string): boolean {
  // URL.hostname wraps IPv6 literals in brackets (e.g. "[::1]") — strip them
  // so all comparisons work against the bare address string.
  let h = hostname.toLowerCase().replace(/\.$/, "");
  if (h.startsWith("[") && h.endsWith("]")) {
    h = h.slice(1, -1);
  }

  // Exact-match blocklist for well-known internal hostnames
  const blockedHostnames = new Set([
    "localhost",
    "metadata.google.internal",
    "169.254.169.254", // AWS / GCP / Azure IMDS
    "fd00::ec2", // AWS IPv6 IMDS
    "::1", // IPv6 loopback
    "0.0.0.0",
    "kubernetes.default",
    "kubernetes.default.svc",
    "kubernetes.default.svc.cluster.local",
  ]);
  if (blockedHostnames.has(h)) return true;

  // Suffix-match: *.local, *.internal, *.cluster.local
  if (
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h.endsWith(".cluster.local")
  ) {
    return true;
  }

  // IPv6 range checks — the colon guard avoids false positives on DNS names.
  if (h.includes(":")) {
    // fe80::/10 link-local (fe80:: – febf::)
    if (/^fe[89ab]/.test(h)) return true;
    // fc00::/7 ULA (fc00:: – fdff::)
    if (/^f[cd]/.test(h)) return true;
    // ff00::/8 multicast and deprecated fec0::/10 site-local space are not
    // globally routable webhook destinations.
    if (/^ff/.test(h) || /^fe[c-f]/.test(h)) return true;
    // 2001:db8::/32 documentation range.
    if (/^2001:0*db8(?::|$)/.test(h)) return true;
    // IPv4-mapped x:…:ffff:x.x.x.x in any spelling ("::ffff:", expanded
    // "0:0:0:0:0:ffff:") — extract the dotted quad and re-check it. A hex
    // tail after ffff: (e.g. "::ffff:7f00:1") is the same address without
    // dots and would escape the IPv4 range checks — block it.
    const mapped = /(?:^|:)ffff:(.+)$/.exec(h);
    if (mapped) {
      if (mapped[1].includes(":")) return true; // hex-encoded IPv4 tail
      return isSsrfTarget(mapped[1]);
    }
    // Loopback (::1) and unspecified (::) in any expanded or zero-padded
    // spelling ("0:0:0:0:0:0:0:1", "::0:1", "0000::0001") — the exact-match
    // blocklist above only catches the canonical "::1".
    const groups = h.split(":").map((g) => g.replace(/^0+(?=\w)/, ""));
    const tail = groups[groups.length - 1];
    const rest = groups.slice(0, -1);
    if (groups.every((g) => g === "" || g === "0")) return true; // ::
    if (tail === "1" && rest.every((g) => g === "" || g === "0")) return true; // ::1
  }

  // Numeric IPv4 — check private/loopback/link-local ranges
  const ipv4Re = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = ipv4Re.exec(h);
  if (m) {
    const [, a, b, c, d] = m.map(Number);
    if (
      a === 10 || // 10.0.0.0/8
      (a === 172 && b >= 16 && b <= 31) || // 172.16.0.0/12
      (a === 192 && b === 168) || // 192.168.0.0/16
      a === 127 || // 127.0.0.0/8 loopback
      (a === 169 && b === 254) || // 169.254.0.0/16 link-local (IMDS)
      (a === 100 && b >= 64 && b <= 127) || // 100.64.0.0/10 carrier-grade NAT
      a === 0 || // 0.0.0.0/8 "this" network
      (a === 192 && b === 0 && c === 0) || // 192.0.0.0/24 IETF protocol
      (a === 192 && b === 0 && c === 2) || // 192.0.2.0/24 TEST-NET-1
      (a === 198 && b === 51 && c === 100) || // 198.51.100.0/24 TEST-NET-2
      (a === 203 && b === 0 && c === 113) || // 203.0.113.0/24 TEST-NET-3
      (a === 198 && (b === 18 || b === 19)) || // 198.18.0.0/15 benchmarking
      a >= 224 // multicast + reserved + 255.255.255.255
    ) {
      return true;
    }
    // Validate each octet is in range
    if ([a, b, c, d].some((o) => o > 255)) return true;
    return false; // well-formed public dotted-decimal quad
  }

  // Any other hostname built solely from numeric/hex parts is an alternate
  // IPv4 spelling — decimal ("2130706433"), octal ("0177.0.0.1"), hex
  // ("0x7f000001") or shorthand ("127.1") — which getaddrinfo resolves like
  // an IP while escaping the range checks above. No legitimate public
  // hostname is all-numeric (TLDs must contain a letter), so block outright.
  if (/^(0x[0-9a-f]+|\d+)(\.(0x[0-9a-f]+|\d+)){0,3}$/.test(h)) return true;

  return false;
}

export type WebhookUrlCheck =
  | { ok: true; url: URL }
  | { ok: false; reason: "invalid-url" | "not-https" | "ssrf-target" };

/**
 * Parse and validate a server-configured webhook URL: must be a well-formed
 * absolute URL, must use https:, and must not resolve (by hostname) to a
 * private/loopback/reserved address.
 */
export function validateWebhookUrl(raw: string): WebhookUrlCheck {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, reason: "invalid-url" };
  }
  if (url.protocol !== "https:") {
    return { ok: false, reason: "not-https" };
  }
  if (isSsrfTarget(url.hostname)) {
    return { ok: false, reason: "ssrf-target" };
  }
  return { ok: true, url };
}
