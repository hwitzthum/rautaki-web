import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import HeroLight from "@/components/HeroLight";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "KI-Strategie, Implementierung und Führungskräfteentwicklung — massgeschneidert für Entscheider in der Schweiz.",
  alternates: { canonical: "https://www.rautaki.ch/services" },
};

const serviceSchemas = services.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.titlePlain,
  description: service.longDesc,
  url: `https://www.rautaki.ch/services#${service.slug}`,
  provider: {
    "@type": "Organization",
    name: "Rautaki",
    url: "https://www.rautaki.ch",
  },
  areaServed: { "@type": "Country", name: "Switzerland" },
  serviceType: "AI Consulting",
}));

const sectionBg = ["bg-white", "bg-cream", "bg-warm-grey"] as const;

const pricing = [
  {
    format: "Beratungstag",
    price: "ab CHF 3'500",
    description:
      "Ganztägige Zusammenarbeit vor Ort oder remote — inklusive Vor- und Nachbereitung, Unterlagen und dokumentierten Ergebnissen.",
  },
  {
    format: "Halbtag",
    price: "ab CHF 1'800",
    description:
      "Kompaktes Format für fokussierte Fragestellungen — inklusive Vorbereitung und Ergebnissicherung.",
  },
  {
    format: "Stundenansatz",
    price: "CHF 280",
    description:
      "Punktuelles Sparring und kurzfristige Einordnung — ohne Vor- und Nachbereitung.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={serviceSchemas} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroLight
        label="Unsere Leistungen"
        title={
          <>
            Strategie, Beratung und Umsetzung für das{" "}
            <span className="italic text-gold">KI-Zeitalter</span>
          </>
        }
        description="Drei Leistungsbereiche, die Führungsteams dabei unterstützen, Richtung zu setzen, Risiken zu steuern und KI-Initiativen von der Idee zur organisationalen Fähigkeit zu entwickeln. Mit transparenten Tarifen, der Option auf akkreditierte Weiterbildung — und besonderer Erfahrung im NPO-, Sozial- und öffentlichen Sektor."
        rightContent={
          <div className="hidden lg:block space-y-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="font-serif text-h1 leading-none text-ink/25"
              >
                {service.titlePlain}
              </div>
            ))}
          </div>
        }
      />

      {/* ── Service overview cards ─────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <SectionLabel text="Was wir tun" variant="dark" />
          <h2 className="font-serif text-h2 text-white mb-6">
            Drei Leistungsbereiche für Ihre{" "}
            <span className="italic text-gold">KI-Strategie</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 80}>
                <ServiceCard
                  number={service.number}
                  title={service.title}
                  description={service.shortDesc}
                  href={`#${service.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Individual service sections ────────────────────── */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.slug}
          className={`${sectionBg[index]} px-6 sm:px-10 lg:px-20 py-20 border-b border-ink/[0.07]`}
        >
          <div className="mx-auto max-w-content">
            {/* Header row: text + image */}
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start mb-10">
                <div>
                  <SectionLabel text={service.titlePlain} />
                  <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
                    {service.detailHeading}
                  </h2>
                  <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-8 max-w-reading">
                    {service.longDesc}
                  </p>
                  <blockquote className="font-serif italic text-body leading-body text-ink border-l-2 border-gold pl-5">
                    {service.forWhom}
                  </blockquote>
                </div>

                <div className="relative h-[280px] lg:h-[360px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.titlePlain}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Process steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 pt-10 border-t border-ink/10">
              {service.steps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 80}>
                  <div className="border-l-2 border-gold pl-5">
                    <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-serif text-h4 text-ink font-normal mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-ui text-sm font-light leading-body text-mid-grey">
                      {step.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div className="mt-10 pt-8 border-t border-ink/10">
              <p className="font-sans text-sm text-mid-grey mb-3">
                Interesse an diesem Leistungsbereich?
              </p>
              <a
                href="/booking"
                className="font-sans text-sm text-ink hover:text-gold transition-colors duration-200 tracking-wide"
              >
                Gespräch vereinbaren →
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ── Preise ────────────────────────────────────────── */}
      <section id="preise" className="bg-white scroll-mt-24 px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Preise" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Klare Leistung,{" "}
              <span className="italic text-gold">klare Preise</span>
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-12 max-w-reading">
              Die meisten Beratungsangebote nennen Preise erst auf Anfrage. Wir
              legen unsere Tarife offen — damit Sie planen können, bevor Sie
              mit uns sprechen.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {pricing.map((item, index) => (
              <ScrollReveal key={item.format} delay={index * 80}>
                <div className="border-t border-ink/10 pt-6">
                  <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-3">
                    {item.format}
                  </div>
                  <div className="font-serif text-h3 tracking-tight-h3 text-ink mb-3">
                    {item.price}
                  </div>
                  <p className="font-ui text-sm font-light leading-body text-mid-grey">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="font-ui text-sm font-light leading-body text-mid-grey mt-12 pt-8 border-t border-ink/10 max-w-reading">
              Mehrwöchige Programme und Mandate — etwa eine
              KI-Strategie-Entwicklung oder eine Mentoring-Begleitung —
              vereinbaren wir individuell mit Ihnen, transparent kalkuliert auf
              Basis dieser Tarife. Das Erstgespräch ist kostenlos und
              unverbindlich. Alle Preise exkl. MwSt.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Akkreditierte Weiterbildung ────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Weiterbildung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Vom Sparring zum{" "}
              <span className="italic text-gold">Zertifikat</span>
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-8 max-w-reading">
              Was wir beraten, lehren wir auch: Harry Witzthum unterrichtet als
              Dozent in akkreditierten CAS-Programmen am Institut für
              Kommunikation und Führung ikf — vom Chief AI Officer bis zur
              KI-Transformation. Wenn Ihr Team über die Beratung hinaus
              KI-Kompetenz mit Zertifikat aufbauen will, ist der Weg dahin
              kurz.
            </p>
            <a
              href="/about"
              className="font-sans text-sm text-ink hover:text-gold transition-colors duration-200 tracking-wide"
            >
              Zur Lehrtätigkeit →
            </a>
          </ScrollReveal>
        </div>
      </section>

      <GoldRule />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4">
            Bereit, Ihre KI-Strategie aufzubauen?
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            Wir können Ihre strategische Ausgangslage rasch bewerten und einen
            praxisnahen Weg zu messbarem Wert definieren.
          </p>
          <Button href="/booking" variant="gold" showArrow>
            Erstgespräch vereinbaren
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
