"use client";

import { COOKIE_SETTINGS_EVENT } from "@/lib/consent";

// Footer entry point to re-open the consent banner (change/withdraw consent).
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className="font-ui text-xs uppercase tracking-wide-footer text-white/45 no-underline cursor-pointer hover:text-gold transition-colors"
    >
      Cookie-Einstellungen
    </button>
  );
}
