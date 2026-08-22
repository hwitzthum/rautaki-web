// ── Output filter ────────────────────────────────────────────────────────────
//
// Defence-in-depth: even if the n8n side adds an output filter (recommended
// — see security/n8n-workflow-hardening.md), the proxy strips dangerous
// content one more time on the way back to the browser.
//
// This is NOT a Markdown sanitizer. @n8n/chat renders bot text with
// markdown-it set to html:false, which already strips HTML. We add three
// extra defences here that markdown-it does not:
//
//   1. Remove any literal "<" / ">" tag pairs that look like raw HTML.
//      markdown-it escapes these but the bot might be coaxed into
//      producing them and a future maintainer might flip html:true.
//   2. Neutralise `javascript:` / `data:` URLs inside markdown link syntax.
//   3. Strip markdown images whose host is not in IMAGE_HOST_ALLOWLIST —
//      stops the bot from exfiltrating via a tracking pixel URL the
//      attacker controls.
//
// We only filter `output` / `text` / `message` strings — never the rest of
// the JSON envelope, so structural fields stay intact.

const IMAGE_HOST_ALLOWLIST = new Set<string>([
  "images.unsplash.com",
]);

function stripHtmlTags(s: string): string {
  // Strip HTML/XML comments first (<!--...-->), then element tags.
  // The element regex requires the tag to start immediately after <, with an
  // optional / for closing tags, followed by a letter — this handles the
  // common double-bracket bypass (<<tag>text</tag> → <text) by also stripping
  // any remaining bare "<" that precede an identifier character.
  let out = s.replace(/<!--[\s\S]*?-->/g, ""); // HTML comments
  out = out.replace(/<\/?[a-z][^>]*>/gi, "");  // element tags
  // Collapse any residual bare "<" that is immediately followed by non-space
  // content that could be misinterpreted as a tag opener in a relaxed parser.
  out = out.replace(/<(?=[^\s])/g, "&lt;");
  return out;
}

function neutraliseDangerousLinks(s: string): string {
  // Markdown link: [text](url "title")
  return s.replace(
    /\[([^\]]*)\]\(\s*([^)\s]+)(\s+"[^"]*")?\s*\)/gi,
    (whole, text: string, url: string, title: string | undefined) => {
      const lower = url.trim().toLowerCase();
      if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
        return `[${text}](about:blank)`;
      }
      return title ? `[${text}](${url}${title})` : `[${text}](${url})`;
    },
  );
}

function stripDisallowedImages(s: string): string {
  // Markdown image: ![alt](url)
  return s.replace(/!\[([^\]]*)\]\(\s*([^)\s]+)\s*\)/gi, (whole, alt: string, url: string) => {
    try {
      const u = new URL(url);
      if (u.protocol !== "https:" && u.protocol !== "http:") return "";
      if (!IMAGE_HOST_ALLOWLIST.has(u.host)) {
        return "";
      }
      return `![${alt}](${url})`;
    } catch {
      // Relative URLs (not protocol-relative) are fine — they're 'self',
      // covered by CSP img-src. Protocol-relative URLs (//host/path) must
      // go through the allowlist check above, not here, because they resolve
      // to an external host.
      if (url.startsWith("/") && !url.startsWith("//")) return `![${alt}](${url})`;
      return "";
    }
  });
}

export function filterBotText(text: string): string {
  if (typeof text !== "string") return text;
  let out = text;
  out = stripHtmlTags(out);
  out = neutraliseDangerousLinks(out);
  out = stripDisallowedImages(out);
  return out;
}

/**
 * Filter the n8n webhook's JSON response. Only the known chat-widget fields
 * (output, text, message) are forwarded to the browser; any additional fields
 * n8n includes (workflow metadata, execution IDs, internal state, etc.) are
 * dropped by construction so they are never visible to clients.
 */
export function filterChatResponse(payload: unknown): unknown {
  if (typeof payload !== "object" || payload === null) return {};
  const p = payload as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const key of ["output", "text", "message"] as const) {
    if (typeof p[key] === "string") {
      result[key] = filterBotText(p[key] as string);
    }
  }
  return result;
}
