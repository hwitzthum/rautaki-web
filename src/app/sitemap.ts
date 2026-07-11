import { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n";

// Real per-page content dates instead of build time — a sitemap that claims
// every page changed on every deploy teaches crawlers to ignore the signal.
// Bump a date when that page's CONTENT changes meaningfully. Localized pages
// carry separate de/en dates so an English copy-edit doesn't fake-bump the
// German page (and vice versa).
const lastModified = {
  home: { de: new Date("2026-07-03"), en: new Date("2026-07-11") },
  services: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  vorgehen: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  about: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  booking: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  lab: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  imprint: { de: new Date("2026-07-06"), en: new Date("2026-07-11") },
  privacy: { de: new Date("2026-07-11"), en: new Date("2026-07-11") }, // NEXT_LOCALE-Absatz
  labMultiAssistant: new Date("2026-05-10"),
  labGovernancePolicy: new Date("2026-05-11"),
  labEuAiActCheck: new Date("2026-05-10"),
};

const base = "https://www.rautaki.ch";

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

  return [...localized, ...singleLocalePages];
}
