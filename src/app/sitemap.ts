import { MetadataRoute } from "next";

// Real per-page content dates instead of build time — a sitemap that claims
// every page changed on every deploy teaches crawlers to ignore the signal.
// Bump a date when that page's CONTENT changes meaningfully.
const lastModified = {
  home: new Date("2026-07-03"),
  services: new Date("2026-07-06"), // FAQ-Sektion ergänzt
  vorgehen: new Date("2026-07-06"), // Seite erstellt
  about: new Date("2026-07-06"),
  booking: new Date("2026-07-06"),
  lab: new Date("2026-07-06"),
  labMultiAssistant: new Date("2026-05-10"),
  labGovernancePolicy: new Date("2026-05-11"),
  labEuAiActCheck: new Date("2026-05-10"),
  imprint: new Date("2026-07-06"),
  privacy: new Date("2026-07-06"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rautaki.ch";
  return [
    {
      url: base,
      lastModified: lastModified.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: lastModified.services,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/vorgehen`,
      lastModified: lastModified.vorgehen,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: lastModified.about,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/booking`,
      lastModified: lastModified.booking,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/lab`,
      lastModified: lastModified.lab,
      changeFrequency: "weekly",
      priority: 0.7,
    },
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
    {
      url: `${base}/imprint`,
      lastModified: lastModified.imprint,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/privacy`,
      lastModified: lastModified.privacy,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
