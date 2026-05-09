import ServiceCards from "@/components/ServiceCards";
import SectionLabel from "@/components/SectionLabel";
import StatBlock from "@/components/StatBlock";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import ScrollReveal from "@/components/ScrollReveal";
import HeroWithBooking from "@/components/BookingTrigger";

const stats = [
  {
    value: 78,
    suffix: "%",
    label: "der Unternehmen setzen KI bereits in mindestens einer Funktion ein",
    source: "McKinsey State of AI, 2025",
  },
  {
    value: 95,
    suffix: "%",
    label: "der KI-Pilotprojekte scheitern vor dem Produktivbetrieb",
    source: "MIT GenAI Enterprise Report, 2025",
  },
  {
    value: 2,
    suffix: "×",
    label: "schnelleres Umsatzwachstum für KI-Vorreiter gegenüber Nachzüglern",
    source: "BCG The Widening AI Value Gap, 2025",
  },
];

const credentials = [
  "Universität Zürich",
  "Institut für Kommunikation und Führung ikf",
  "Hepatitis Schweiz",
  "Age Stiftung",
  "Astara Switzerland",
  "VMI Universität Fribourg",
  "Glaux Group",
  "SPAS",
];

export default function Home() {
  return (
    <>
      <HeroWithBooking />

      {/* ── Referenzen-Streifen ─────────────────────────── */}
      <div className="bg-charcoal border-b border-white/5 overflow-hidden py-5">
        <ScrollReveal>
          <p className="text-center font-ui text-xs uppercase tracking-wide-label text-white/20 mb-4">
            Referenzen aus Lehre &amp; Beratung
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6 sm:px-10 lg:px-20 max-w-content mx-auto">
            {credentials.map((name) => (
              <span
                key={name}
                className="font-ui text-xs text-white/30 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <ServiceCards />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-25">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-hero-light gap-20 items-center">
          <ScrollReveal>
            <SectionLabel text="KI-Wirkung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Das Potenzial ist real. Die Lücke zur{" "}
              <em className="italic text-gold">Wirkung</em> auch.
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/45 md:text-mid-grey max-w-narrow">
              78 Prozent der Unternehmen setzen KI bereits ein — doch nur
              6 Prozent erzielen damit messbare Geschäftsergebnisse. Die Lücke
              zwischen Aktivität und Wirkung ist die zentrale strategische
              Herausforderung unserer Zeit.
            </p>
          </ScrollReveal>

          <StatBlock stats={stats} />
        </div>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-28">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <div className="flex justify-center">
            <SectionLabel text="Nächster Schritt" variant="dark" />
          </div>
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4 mt-10">
            Ist Ihre Organisation bereit für <em>KI</em>?
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/45 mb-10 max-w-reading mx-auto">
            Wir unterstützen Führungsteams dabei, festzulegen, wo KI führen
            soll, wo Leitplanken essenziell sind und wie Sie von Ambition zu
            sicherer Umsetzung gelangen.
          </p>
          <Button href="/booking" variant="gold" showArrow>
            Beratung reservieren
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}