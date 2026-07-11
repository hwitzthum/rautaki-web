// Locale content registry. getContent(locale) returns the full typed content
// tree for a locale. The English modules are DeepL-generated drafts that were
// human-reviewed and are hand-maintained from now on (see scripts/translate-content.ts).

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

import { common as commonEn } from "./en/common";
import { home as homeEn } from "./en/home";
import { services as servicesEn } from "./en/services";
import { faq as faqEn } from "./en/faq";
import { journey as journeyEn } from "./en/journey";
import { vorgehen as vorgehenEn } from "./en/vorgehen";
import { about as aboutEn } from "./en/about";
import { booking as bookingEn } from "./en/booking";
import { imprint as imprintEn } from "./en/imprint";
import { privacy as privacyEn } from "./en/privacy";

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

const en: SiteContent = {
  common: commonEn,
  home: homeEn,
  services: servicesEn,
  faq: faqEn,
  journey: journeyEn,
  vorgehen: vorgehenEn,
  about: aboutEn,
  booking: bookingEn,
  imprint: imprintEn,
  privacy: privacyEn,
};

const registry: Record<Locale, SiteContent> = { de, en };

export function getContent(locale: Locale): SiteContent {
  return registry[locale];
}
