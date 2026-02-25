"use client";

import { useState } from "react";
import HeroDark from "@/components/HeroDark";
import ServiceCards from "@/components/ServiceCards";
import SectionLabel from "@/components/SectionLabel";
import StatBlock from "@/components/StatBlock";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import BookingModal from "@/components/BookingModal";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: 12, suffix: "+", label: "Years of AI & strategy experience" },
  { value: 40, suffix: "+", label: "Organisations guided through AI change" },
  { value: 3, suffix: "x", label: "Average acceleration from pilot to scale" },
];

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <HeroDark onBookingClick={() => setBookingOpen(true)} />

      <ServiceCards />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-32">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-hero-light gap-20 items-center">
          <ScrollReveal>
            <SectionLabel text="Impact" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Measurable outcomes for leaders navigating AI pressure.
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-narrow">
              We work with executive teams to align strategy, governance, and
              execution so AI initiatives create durable business value.
            </p>
          </ScrollReveal>

          <StatBlock stats={stats} />
        </div>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-36">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4">
            Is your organisation ready for <em>AI</em>?
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            We support leadership teams in defining where AI should lead, where
            guardrails are essential, and how to move from ambition to confident
            execution.
          </p>
          <Button variant="gold" onClick={() => setBookingOpen(true)} showArrow>
            Reserve a consultation
          </Button>
        </ScrollReveal>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
