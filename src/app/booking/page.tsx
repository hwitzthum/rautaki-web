import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import { CalInline } from "@/components/CalBooking";

export const metadata: Metadata = {
  title: "Beratung reservieren",
  description:
    "Reservieren Sie ein Strategiegespräch mit Rautaki. Wählen Sie direkt einen passenden Termin — Bestätigung erfolgt automatisch per E-Mail.",
};

function BookingTitle() {
  return (
    <>
      Beratung{" "}
      <span className="italic text-gold">reservieren</span>
    </>
  );
}

export default function BookingPage() {
  return (
    <>
      <HeroLight
        label="Buchung"
        title={<BookingTitle />}
        description={
          <p>
            Wählen Sie einen passenden Termin für ein erstes Strategiegespräch.
            Nach der Buchung erhalten Sie eine Bestätigung mit allen
            Einwahldetails direkt per E-Mail.
          </p>
        }
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <CalInline />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
