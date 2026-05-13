"use client";

import { useState } from "react";
import HeroDark from "./HeroDark";
import CalModal from "./CalModal";

/**
 * Wires the hero CTA to the branded Cal modal.
 */
export default function HeroWithBooking() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeroDark onBookingClick={() => setOpen(true)} />
      <CalModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
