import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Impressum der Rautaki. Angaben gemäss Schweizer Obligationenrecht.",
};

export default function ImprintPage() {
  return (
    <>
      <HeroLight
        label="Impressum"
        title="Impressum"
        description="Angaben gemäss Art. 3 des Bundesgesetzes gegen den unlauteren Wettbewerb (UWG) und Art. 5 des E-Commerce-Gesetzes."
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-reading">
          <ScrollReveal>
            <SectionLabel text="Unternehmen" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Angaben zum Unternehmen
            </h2>
            {/* TODO: Replace with actual company registration details */}
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p className="font-medium text-ink">Rautaki</p>
              <p>Weinbergstrasse 23</p>
              <p>8802 Kilchberg / ZH</p>
              <p>Schweiz</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <SectionLabel text="Kontakt" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Kontaktinformationen
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p>
                E-Mail:{" "}
                <a href="mailto:hello@rautaki.ch" className="text-ink hover:text-gold transition-colors">
                  hello@rautaki.ch
                </a>
              </p>
              {/* TODO: Add phone number if applicable */}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <SectionLabel text="Vertretung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Vertretungsberechtigte Person
            </h2>
            {/* TODO: Replace with actual representative details */}
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p>Harry Witzthum, Inhaber</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <SectionLabel text="Haftung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Haftungsausschluss
            </h2>
            {/* TODO: Replace with full disclaimer from legal counsel */}
            <div className="font-ui text-body text-ink/65 space-y-4">
              <p>
                Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
                bereitgestellten Inhalte übernehmen wir jedoch keine Gewähr.
              </p>
              <p>
                Für die Inhalte externer Links übernehmen wir keine Haftung. Für
                den Inhalt der verlinkten Seiten sind ausschliesslich deren
                Betreiber verantwortlich.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
