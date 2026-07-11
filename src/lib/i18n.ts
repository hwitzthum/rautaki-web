// Locale routing helpers. The site serves German at the bare paths and English
// under an /en prefix (slugs mirror 1:1). The proxy (src/proxy.ts) derives the
// locale from the pathname and passes it to the layout via the x-locale header.

import type { Locale } from "@/content/types";

export type { Locale };

// Cookie the LocaleSwitch writes and the proxy reads to redirect a returning
// English visitor from the bare "/" to "/en" (never on deep links, never for
// crawlers — they send no cookie).
export const LOCALE_COOKIE = "NEXT_LOCALE";

const BASE = "https://www.rautaki.ch";

/**
 * Prefix a root-relative path with the locale segment. German paths are
 * returned unchanged; English paths gain the /en prefix ("/" → "/en").
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === "de") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

/** Absolute canonical URL for a locale-prefixed path ("/" maps to the bare host). */
export function absoluteUrl(path: string): string {
  return path === "/" ? BASE : `${BASE}${path}`;
}

/**
 * Self-referencing canonical plus the de-CH / en / x-default hreflang set for a
 * page. `path` is the German (canonical) path, e.g. "/services" or "/".
 */
export function pageAlternates(
  locale: Locale,
  path: string,
): { canonical: string; languages: Record<string, string> } {
  const deUrl = absoluteUrl(localePath("de", path));
  const enUrl = absoluteUrl(localePath("en", path));
  return {
    canonical: locale === "en" ? enUrl : deUrl,
    languages: {
      "de-CH": deUrl,
      en: enUrl,
      "x-default": deUrl,
    },
  };
}
