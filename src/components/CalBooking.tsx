"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useCallback, useEffect } from "react";

/** Cal.com username + event slug. Update here if the slug ever changes. */
export const CAL_LINK = "harry-witzthum-yc1ldr/beratung";

/** Rautaki brand gold — passed to Cal so the accent colour stays on-brand. */
const BRAND_COLOR = "#F5A623";

// ---------------------------------------------------------------------------
// Inline embed — used on the /booking page
// ---------------------------------------------------------------------------

export function CalInline() {
  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: "100%", minHeight: "660px", overflow: "scroll" }}
      config={{
        layout: "month_view",
        theme: "light",
        brandColor: BRAND_COLOR,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Popup hook — used by BookingTrigger (hero CTA)
// ---------------------------------------------------------------------------

/**
 * Initialises the Cal embed API on mount so the popup opens without delay,
 * and returns an `openModal` callback to wire up to any button.
 */
export function useCalModal() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      const cal = await getCalApi({ namespace: "rautaki-hero" });
      if (!mounted) return;
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: BRAND_COLOR } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const openModal = useCallback(async () => {
    const cal = await getCalApi({ namespace: "rautaki-hero" });
    cal("modal", { calLink: CAL_LINK });
  }, []);

  return { openModal };
}
