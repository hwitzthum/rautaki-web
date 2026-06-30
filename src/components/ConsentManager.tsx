"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import Link from "next/link";
import Button from "./Button";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  COOKIE_SETTINGS_EVENT,
  SALESFLARE_TOKEN,
  type Consent,
} from "@/lib/consent";

// flare.js attaches a global `Flare` constructor once loaded.
type FlareConstructor = new () => { track: (token: string) => void };

// ── Consent store (read from localStorage via useSyncExternalStore) ──────────
function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// Server render and first hydration tick: no choice known yet.
function getServerSnapshot(): Consent | null {
  return null;
}

// Consent gate for Salesflare website tracking. Loads the tracking script only
// after the visitor opts in; renders a banner until a choice is made.
export default function ConsentManager() {
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    getServerSnapshot,
  );
  const [reopened, setReopened] = useState(false);

  // Let the footer link re-open the banner so a choice can be changed/withdrawn.
  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const decide = useCallback((choice: Consent) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Storage may be blocked (private mode) — the banner simply re-appears next visit.
    }
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }, []);

  const initSalesflare = useCallback(() => {
    const Flare = (window as unknown as { Flare?: FlareConstructor }).Flare;
    if (!Flare) return;
    new Flare().track(SALESFLARE_TOKEN);
  }, []);

  const bannerOpen = consent === null || reopened;

  return (
    <>
      {consent === "granted" && (
        <Script
          src="https://track.salesflare.com/flare.js"
          strategy="afterInteractive"
          onLoad={initSalesflare}
        />
      )}

      {bannerOpen && (
        <div
          role="dialog"
          aria-label="Cookie-Einstellungen"
          className="fixed inset-x-0 bottom-0 z-50 bg-obsidian border-t border-gold/30"
        >
          <div className="mx-auto flex max-w-content flex-col gap-5 px-6 py-6 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-20">
            <p className="max-w-[640px] font-ui text-sm leading-body text-white/60">
              Wir setzen ein Tracking-Cookie von Salesflare, um Website-Besuche
              unseren Kontakten zuzuordnen — ausschliesslich mit Ihrer
              Einwilligung. Details in unserer{" "}
              <Link
                href="/privacy"
                className="text-gold underline underline-offset-4 hover:text-gold-light transition-colors"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="ghost" onClick={() => decide("denied")}>
                Ablehnen
              </Button>
              <Button variant="gold" onClick={() => decide("granted")}>
                Akzeptieren
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
