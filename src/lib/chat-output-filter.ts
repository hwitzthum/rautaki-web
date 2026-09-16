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
// Plus one presentation step (not a defence): internal links are rewritten to
// their /en equivalents for English pages, see "Internal links" below.
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

// ── Internal links ───────────────────────────────────────────────────────────
//
// Presentation, not security: the model does not reliably follow the prompt's
// "prefix internal links with /en in English" rule, so the proxy — which
// knows the page locale for certain — rewrites them deterministically.
// Sections that exist under /en (keep in sync with src/app/en/*). Paths
// outside this list (/lab/*.html, /downloads/*) have no English version and
// stay untouched, as do already-prefixed /en paths and other hosts.
const LOCALIZED_SECTION = /^\/(?:about|booking|imprint|privacy|services|vorgehen|wissen)(?=[/?#]|$)/;
const SITE_ORIGIN = "https://www.rautaki.ch";

function toEnglishPath(url: string): string {
  const origin = url.startsWith(SITE_ORIGIN) ? SITE_ORIGIN : "";
  const path = url.slice(origin.length);
  if (path === "" || path === "/") return origin ? `${origin}/en` : "/en";
  return LOCALIZED_SECTION.test(path) ? `${origin}/en${path}` : url;
}

function localiseInternalLinks(s: string): string {
  // Markdown links only (the image syntax "![…](…)" is left to the image filter).
  return s.replace(
    /(?<!!)\[([^\]]*)\]\(\s*([^)\s]+)(\s+"[^"]*")?\s*\)/g,
    (whole, text: string, url: string, title: string | undefined) =>
      `[${text}](${toEnglishPath(url)}${title ?? ""})`,
  );
}

// The model occasionally writes an internal path as "[/wissen/slug]" without
// the "(url)" part, which renders as plain bracketed text. Turn exactly that
// shape — a site-internal section path, not followed by "(" — into a link.
function linkifyBareInternalPaths(s: string): string {
  return s.replace(
    /\[(\/(?:about|booking|imprint|privacy|services|vorgehen|wissen)[\w\-/#]*)\](?!\()/g,
    (whole, path: string) => `[${path}](${path})`,
  );
}

export function filterBotText(text: string, locale: "de" | "en" = "de"): string {
  if (typeof text !== "string") return text;
  let out = text;
  out = stripHtmlTags(out);
  out = linkifyBareInternalPaths(out);
  out = neutraliseDangerousLinks(out);
  if (locale === "en") out = localiseInternalLinks(out);
  out = stripDisallowedImages(out);
  return out;
}

/**
 * Filter the n8n webhook's JSON response. Only the known chat-widget fields
 * (output, text, message) are forwarded to the browser; any additional fields
 * n8n includes (workflow metadata, execution IDs, internal state, etc.) are
 * dropped by construction so they are never visible to clients.
 */
export function filterChatResponse(
  payload: unknown,
  locale: "de" | "en" = "de",
): unknown {
  if (typeof payload !== "object" || payload === null) return {};
  const p = payload as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const key of ["output", "text", "message"] as const) {
    if (typeof p[key] === "string") {
      result[key] = filterBotText(p[key] as string, locale);
    }
  }
  return result;
}
