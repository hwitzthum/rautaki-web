"use client";

import { useState } from "react";
import HeroDark from "./HeroDark";
import BookingModal from "./BookingModal";

export default function HeroWithBooking() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <HeroDark onBookingClick={() => setBookingOpen(true)} />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}