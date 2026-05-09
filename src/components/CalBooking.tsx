"use client";

import Cal from "@calcom/embed-react";

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
      style={{ width: "100%", minHeight: "660px", overflow: "auto" }}
      config={{
        layout: "month_view",
        theme: "light",
        brandColor: BRAND_COLOR,
      }}
    />
  );
}

