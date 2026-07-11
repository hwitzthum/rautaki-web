// BreadcrumbList JSON-LD builder — SEAKT S-dimension (audit 2026-07-05
// recommended breadcrumbs on every subpage). Every trail starts at the
// homepage and uses the real canonical routes (/services, /about, …).
// The @id anchors the list to its page so re-renders resolve to one entity.

import type { Locale } from "@/content/types";

const BASE = "https://www.rautaki.ch";

const HOME_CRUMB: Record<Locale, string> = {
  de: "Start",
  en: "Home",
};

export interface Crumb {
  name: string;
  /** Route path starting with "/" (e.g. "/services"). */
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[], locale: Locale = "de") {
  const trail: Crumb[] = [{ name: HOME_CRUMB[locale], path: "" }, ...crumbs];
  const last = trail[trail.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE}${last.path}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${BASE}${crumb.path}` || BASE,
    })),
  };
}
