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
  // n8n.cloud is allowed in CSP img-src for the same reason — workflow
  // assets the bot legitimately serves.
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
      if (!IMAGE_HOST_ALLOWLIST.has(u.host) && !u.host.endsWith(".n8n.cloud")) {
        return "";
      }
      return `![${alt}](${url})`;
    } catch {
      // Relative URLs are fine — they're 'self', covered by CSP img-src.
      if (url.startsWith("/")) return `![${alt}](${url})`;
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
 * Filter the n8n webhook's JSON response in place. n8n's response shape from
 * the chat trigger uses one of {output, text, message}; we filter all three
 * if present and pass anything else through unchanged.
 */
export function filterChatResponse(payload: unknown): unknown {
  if (typeof payload !== "object" || payload === null) return payload;
  const p = payload as Record<string, unknown>;
  const result: Record<string, unknown> = { ...p };
  for (const key of ["output", "text", "message"] as const) {
    if (typeof p[key] === "string") {
      result[key] = filterBotText(p[key] as string);
    }
  }
  return result;
}
