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
  "Age Stiftung",
  "Hepatitis Schweiz",
  "Universität Zürich",
  "Institut für Kommunikation und Führung ikf",
  "VMI Universität Fribourg",
  "SPAS",
  "Astara Switzerland",
  "Glaux Group",
];

const differentiators = [
  {
    title: "Vom Sparring bis zum Zertifikat",
    body: "Wir beraten Führungsgremien individuell — und lehren dasselbe Wissen in akkreditierten CAS-Programmen am Institut für Kommunikation und Führung ikf. Diese Kombination bietet in der Schweiz kaum ein anderer Anbieter.",
  },
  {
    title: "Akademisch fundiert, hands-on bis Produktivbetrieb",
    body: "Evidenz statt Bauchgefühl — und Begleitung, die nicht beim Konzept endet, sondern erst beim messbaren Ergebnis.",
  },
  {
    title: "Zuhause, wo Wirkung zählt",
    body: "NPO, Verbände, Sozial- und öffentlicher Sektor: Wir kennen Organisationen, in denen jeder Franken doppelt begründet sein muss — und KI trotzdem wirken soll.",
  },
];

export default function Home() {
  return (
    <>
      <HeroWithBooking />

      {/* ── Referenzen-Streifen ─────────────────────────── */}
      <div className="bg-charcoal border-b border-white/5 overflow-hidden py-5">
        <ScrollReveal>
          <p className="text-center font-ui text-xs uppercase tracking-wide-label text-white/45 mb-4">
            Vertraut von Organisationen im NPO-, Sozial- und öffentlichen
            Sektor — und darüber hinaus
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6 sm:px-10 lg:px-20 max-w-content mx-auto">
            {credentials.map((name) => (
              <span
                key={name}
                className="font-ui text-xs text-white/45 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* ── KI-Wirkung (Problem) ────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-hero-light gap-20 items-center">
          <ScrollReveal>
            <SectionLabel text="KI-Wirkung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Das Potenzial ist real. Die Lücke zur{" "}
              <span className="italic text-gold">Wirkung</span> auch.
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/45 md:text-mid-grey max-w-narrow">
              78 Prozent der Unternehmen setzen KI bereits ein — doch 95 Prozent
              der Pilotprojekte erreichen nie den Produktivbetrieb. Diese Lücke
              zwischen Aktivität und Wirkung ist die strategische
              Herausforderung unserer Zeit.
            </p>
          </ScrollReveal>

          <StatBlock stats={stats} />
        </div>
      </section>

      <ServiceCards />

      {/* ── Warum Rautaki ───────────────────────────────── */}
      <section className="bg-white px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Warum Rautaki" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              Beratung und Weiterbildung — in{" "}
              <span className="italic text-gold">einer Hand</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {differentiators.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="border-l-2 border-gold pl-5">
                  <h3 className="font-serif text-h4 text-ink font-normal mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-ui text-sm font-light leading-body text-mid-grey">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <div className="flex justify-center">
            <SectionLabel text="Nächster Schritt" variant="dark" />
          </div>
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4 mt-10">
            Ist Ihre Organisation bereit für KI?
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/45 mb-10 max-w-reading mx-auto">
            Wir unterstützen Führungsteams dabei, festzulegen, wo KI führen
            soll, wo Leitplanken essenziell sind und wie Sie von Ambition zu
            sicherer Umsetzung gelangen.
          </p>
          <Button href="/booking" variant="gold" showArrow>
            Erstgespräch vereinbaren
          </Button>
          <p className="font-ui text-sm font-light text-white/45 mt-8">
            Transparente Tarife: Beratungstag ab CHF 3&apos;500 —{" "}
            <a
              href="/services#preise"
              className="text-white/45 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
            >
              alle Preise unter Leistungen
            </a>
            .
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
