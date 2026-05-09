"use client";

import HeroDark from "./HeroDark";
import { useCalModal } from "./CalBooking";

/**
 * Wires the hero "Beratung reservieren" CTA to the Cal.com popup.
 * HeroDark is unchanged — it simply receives openModal as onBookingClick.
 */
export default function HeroWithBooking() {
  const { openModal } = useCalModal();
  return <HeroDark onBookingClick={openModal} />;
}
