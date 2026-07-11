"use client";

import { useState } from "react";
import HeroDark from "./HeroDark";
import CalModal from "./CalModal";
import type { Locale } from "@/content/types";

/**
 * Wires the hero CTA to the branded Cal modal.
 */
export default function HeroWithBooking({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeroDark locale={locale} onBookingClick={() => setOpen(true)} />
      <CalModal locale={locale} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
