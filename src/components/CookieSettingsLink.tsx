"use client";

import { COOKIE_SETTINGS_EVENT } from "@/lib/consent";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

// Footer entry point to re-open the consent banner (change/withdraw consent).
export default function CookieSettingsLink({ locale }: { locale: Locale }) {
  const common = getContent(locale).common;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className="font-ui text-xs uppercase tracking-wide-footer text-white/45 no-underline cursor-pointer hover:text-gold transition-colors"
    >
      {common.cookieSettings.label}
    </button>
  );
}
