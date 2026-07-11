// Locale content registry. getContent(locale) returns the full typed content
// tree for a locale. Only "de" exists today; "en" falls back to "de" until the
// generated English modules land (PR 2).

import type { Locale, SiteContent } from "./types";

import { common } from "./de/common";
import { home } from "./de/home";
import { services } from "./de/services";
import { faq } from "./de/faq";
import { journey } from "./de/journey";
import { vorgehen } from "./de/vorgehen";
import { about } from "./de/about";
import { booking } from "./de/booking";
import { imprint } from "./de/imprint";
import { privacy } from "./de/privacy";

const de: SiteContent = {
  common,
  home,
  services,
  faq,
  journey,
  vorgehen,
  about,
  booking,
  imprint,
  privacy,
};

const registry: Record<Locale, SiteContent> = {
  de,
  // Falls back to German until the generated English modules land (PR 2).
  en: de,
};

export function getContent(locale: Locale): SiteContent {
  return registry[locale];
}
