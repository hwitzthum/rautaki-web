import { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n";
import { getArticles } from "@/lib/articles";

// Real per-page content dates instead of build time — a sitemap that claims
// every page changed on every deploy teaches crawlers to ignore the signal.
// Bump a date when that page's CONTENT changes meaningfully. Localized pages
// carry separate de/en dates so an English copy-edit doesn't fake-bump the
// German page (and vice versa).
const lastModified = {
  home: { de: new Date("2026-08-21"), en: new Date("2026-08-21") },
  services: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  vorgehen: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  about: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  booking: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  lab: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  imprint: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  privacy: { de: new Date("2026-07-11"), en: new Date("2026-07-11") }, // NEXT_LOCALE-Absatz
  labMultiAssistant: new Date("2026-05-10"),
  labGovernancePolicy: new Date("2026-05-11"),
  labEuAiActCheck: new Date("2026-08-21"),
};

const base = "https://www.rautaki.ch";

// ── Wissen articles ──────────────────────────────────────────────────────────
// Article URLs and their dates are derived from the Markdown frontmatter via
// the loader — never hand-maintained, consistent with this sitemap's rule that
// dates track real content changes. German is the source language; an English
// entry (and en hreflang alternate) is emitted only when a translated file
// exists, so the sitemap never advertises a page that would 404. Declared
// before localizedPages because /wissen's index dates derive from it.
const wissenDe = getArticles("de");
const wissenEn = new Map(
  getArticles("en").map((article) => [article.slug, article]),
);

const newestDate = (dates: string[]): Date =>
  new Date(
    dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : "2026-07-11",
  );

function wissenIndexDates(): { de: Date; en: Date } {
  return {
    de: newestDate(wissenDe.map((a) => a.dateModified ?? a.datePublished)),
    en: newestDate(
      [...wissenEn.values()].map((a) => a.dateModified ?? a.datePublished),
    ),
  };
}

interface LocalizedPage {
  path: string;
  dates: { de: Date; en: Date };
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

// German and English page pairs — each emits two sitemap entries with
// hreflang alternates (x-default → German, the site's primary language).
const localizedPages: LocalizedPage[] = [
  {
    path: "/",
    dates: lastModified.home,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/services",
    dates: lastModified.services,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/vorgehen",
    dates: lastModified.vorgehen,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/about",
    dates: lastModified.about,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/booking",
    dates: lastModified.booking,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/lab",
    dates: lastModified.lab,
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/wissen",
    // Content-driven: the index's freshness is the newest article per locale,
    // not a hand-maintained date (see wissenIndexDates below).
    dates: wissenIndexDates(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/imprint",
    dates: lastModified.imprint,
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/privacy",
    dates: lastModified.privacy,
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

// The interactive Lab tools are German-only static pages — single entries,
// no language alternates.
const singleLocalePages: MetadataRoute.Sitemap = [
  {
    url: `${base}/lab/multi-assistant-gpt.html`,
    lastModified: lastModified.labMultiAssistant,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${base}/lab/ki-governance-policy.html`,
    lastModified: lastModified.labGovernancePolicy,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${base}/lab/eu-ai-act-check.html`,
    lastModified: lastModified.labEuAiActCheck,
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

// Per-article sitemap entries, generated from the loader data declared above.
const articlePages: MetadataRoute.Sitemap = wissenDe.flatMap((article) => {
  const path = `/wissen/${article.slug}`;
  const de = `${base}${localePath("de", path)}`;
  const en = `${base}${localePath("en", path)}`;
  const enArticle = wissenEn.get(article.slug);
  const languages = enArticle
    ? { "de-CH": de, en, "x-default": de }
    : { "de-CH": de, "x-default": de };

  const entries: MetadataRoute.Sitemap = [
    {
      url: de,
      lastModified: new Date(article.dateModified ?? article.datePublished),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
  if (enArticle) {
    entries.push({
      url: en,
      lastModified: new Date(enArticle.dateModified ?? enArticle.datePublished),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages },
    });
  }
  return entries;
});

export default function sitemap(): MetadataRoute.Sitemap {
  const localized = localizedPages.flatMap<MetadataRoute.Sitemap[number]>(
    ({ path, dates, changeFrequency, priority }) => {
      const de = `${base}${localePath("de", path)}`;
      const en = `${base}${localePath("en", path)}`;
      const languages = { "de-CH": de, en, "x-default": de };
      return [
        {
          url: de,
          lastModified: dates.de,
          changeFrequency,
          priority,
          alternates: { languages },
        },
        {
          url: en,
          lastModified: dates.en,
          changeFrequency,
          priority: Math.max(priority - 0.1, 0.1),
          alternates: { languages },
        },
      ];
    },
  );

  return [...localized, ...articlePages, ...singleLocalePages];
}
