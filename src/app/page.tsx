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
  { value: 12, suffix: "+", label: "Jahre Erfahrung in KI und Strategie" },
  { value: 40, suffix: "+", label: "Organisationen beim KI-Wandel begleitet" },
  { value: 3, suffix: "x", label: "Durchschnittliche Beschleunigung vom Piloten zur Skalierung" },
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
            <SectionLabel text="Wirkung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Messbare Ergebnisse für Führungsteams unter KI-Druck.
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-narrow">
              Wir arbeiten mit Führungsteams zusammen, um Strategie, Governance
              und Umsetzung so aufeinander abzustimmen, dass KI-Initiativen
              dauerhaften Geschäftswert schaffen.
            </p>
          </ScrollReveal>

          <StatBlock stats={stats} />
        </div>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-36">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4">
            Ist Ihre Organisation bereit für <em>KI</em>?
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            Wir unterstützen Führungsteams dabei, festzulegen, wo KI führen
            soll, wo Leitplanken essenziell sind und wie Sie von Ambition zu
            sicherer Umsetzung gelangen.
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
