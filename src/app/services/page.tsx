import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import HeroLight from "@/components/HeroLight";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServiceCard from "@/components/ServiceCard";
import { pageShareMeta } from "@/lib/og";
import { journey } from "@/data/journey";
import { services } from "@/data/services";

const pageTitle = "Leistungen";
const pageDescription =
  "KI-Strategie, Implementierung und Führungskräfteentwicklung — massgeschneidert für Entscheider in der Schweiz.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://www.rautaki.ch/services" },
  ...pageShareMeta({
    title: pageTitle,
    description: pageDescription,
    path: "/services",
  }),
};

const serviceSchemas = services.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.titlePlain,
  description: service.longDesc,
  url: `https://www.rautaki.ch/services#${service.slug}`,
  provider: {
    "@type": "Organization",
    "@id": "https://www.rautaki.ch/#organization",
    name: "Rautaki",
    url: "https://www.rautaki.ch",
  },
  areaServed: { "@type": "Country", name: "Switzerland" },
  serviceType: "AI Consulting",
}));

// Structured pricing — mirrors the published pricing table below so AI
// systems can cite concrete figures (SEAKT K-dimension: quotable facts).
const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://www.rautaki.ch/services#preise",
  name: "Zusammenarbeitsformate",
  itemListElement: [
    {
      "@type": "Offer",
      name: "Beratungstag",
      description:
        "Ganztägige Zusammenarbeit vor Ort oder remote — inklusive Vor- und Nachbereitung, Unterlagen und dokumentierten Ergebnissen.",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 3500,
        priceCurrency: "CHF",
      },
      offeredBy: { "@id": "https://www.rautaki.ch/#organization" },
    },
    {
      "@type": "Offer",
      name: "Halbtag",
      description:
        "Kompaktes Format für fokussierte Fragestellungen — inklusive Vorbereitung und Ergebnissicherung.",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 1800,
        priceCurrency: "CHF",
      },
      offeredBy: { "@id": "https://www.rautaki.ch/#organization" },
    },
    {
      "@type": "Offer",
      name: "Stundenansatz",
      description:
        "Punktuelles Sparring und kurzfristige Einordnung — ohne Vor- und Nachbereitung.",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 280,
        priceCurrency: "CHF",
        unitText: "Stunde",
      },
      offeredBy: { "@id": "https://www.rautaki.ch/#organization" },
    },
  ],
};

// HowTo schema for the "Der Weg zu wirksamer KI" timeline — makes the
// nine-step consulting process quotable for AI systems (SEAKT K-dimension).
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Der Weg zu wirksamer KI — das Rautaki KI-Beratungspaket",
  description:
    "Ein strukturiertes Beratungsprogramm in drei Phasen und neun Schritten — von der Standortbestimmung bis zum sicheren Produktivbetrieb.",
  step: journey
    .filter((item) => item.kind === "step")
    .map((item) => ({
      "@type": "HowToStep",
      position: Number(item.no),
      name: item.title,
      text: item.outcome,
    })),
};

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
      <JsonLd schema={[...serviceSchemas, offerCatalogSchema, howToSchema]} />

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
          className={`${sectionBg[index]} scroll-mt-24 px-6 sm:px-10 lg:px-20 py-20 border-b border-ink/[0.07]`}
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

            {/* Bridge into the shared process — the single "how" */}
            <div className="pt-8 border-t border-ink/10">
              <p className="font-ui text-sm font-light text-mid-grey mb-3">
                Teil eines strukturierten Wegs — von der Standortbestimmung bis
                zum sicheren Betrieb.
              </p>
              <a
                href="#vorgehen"
                className="font-sans text-sm text-ink hover:text-gold transition-colors duration-200 tracking-wide"
              >
                Der Weg zu wirksamer KI →
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ── Der Weg zu wirksamer KI (Vorgehen) ─────────────── */}
      <section
        id="vorgehen"
        className="bg-obsidian grain scroll-mt-24 px-6 sm:px-10 lg:px-20 py-24"
      >
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Unser Vorgehen" variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-6">
              Der Weg zu <span className="italic text-gold">wirksamer KI</span>
            </h2>
            <p className="font-ui text-body font-light leading-body text-white/55 mb-16 max-w-reading">
              Ob strategische Standortbestimmung, laufendes Sparring oder
              Hands-on-Umsetzung — die Zusammenarbeit folgt einem klaren Weg von
              der ersten Standortbestimmung bis zum sicheren Produktivbetrieb.
              Drei Phasen, neun Schritte, zwei Entscheidungspunkte, an denen Sie
              mit voller Kostenkontrolle über das Weitergehen entscheiden.
            </p>
          </ScrollReveal>

          {/* Timeline rail */}
          <div className="relative">
            {/* Continuous vertical connector behind the markers */}
            <span
              className="absolute left-5 top-2 bottom-2 w-px bg-white/12"
              aria-hidden="true"
            />

            <ol>
              {journey.map((item, index) => {
                if (item.kind === "phase") {
                  return (
                    <li
                      key={`phase-${item.label}`}
                      className="relative pl-16 pt-12 pb-6 first:pt-0"
                    >
                      <ScrollReveal>
                        <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-gold">
                          {item.label}
                        </div>
                      </ScrollReveal>
                    </li>
                  );
                }

                if (item.kind === "gate") {
                  return (
                    <li
                      key={`gate-${item.label}`}
                      className="relative pl-16 py-4"
                    >
                      <span
                        className="absolute left-2.5 top-1 flex h-4 w-4 rotate-45 items-center justify-center border border-gold bg-obsidian"
                        aria-hidden="true"
                      />
                      <ScrollReveal>
                        <div className="border border-gold/25 bg-white/[0.02] px-6 py-5">
                          <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-gold mb-2">
                            {item.label}
                          </div>
                          <p className="font-ui text-sm font-light leading-body text-white/55 max-w-reading">
                            {item.note}
                          </p>
                        </div>
                      </ScrollReveal>
                    </li>
                  );
                }

                return (
                  <li key={`step-${item.no}`} className="relative pl-16 pb-9">
                    <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-obsidian">
                      <span className="font-ui text-xs font-medium tracking-wide-label text-white/70">
                        {item.no}
                      </span>
                    </span>
                    <ScrollReveal delay={(index % 4) * 60}>
                      <h3 className="font-serif text-h4 font-normal leading-snug text-white pt-1 mb-3">
                        {item.title}
                      </h3>
                      <div className="font-ui text-[0.7rem] uppercase tracking-wide-label text-white/30 mb-1">
                        Ihr Ergebnis
                      </div>
                      <p className="font-serif text-body leading-body text-white/75 max-w-reading">
                        {item.outcome}
                      </p>
                    </ScrollReveal>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Booklet download — the board leave-behind */}
          <ScrollReveal>
            <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="/downloads/rautaki-ki-beratung-booklet.pdf"
                download
                className="group inline-flex items-center gap-2 border border-white/35 text-white px-8 py-4 font-ui text-xs font-medium uppercase tracking-wide-btn no-underline hover:border-gold hover:text-gold transition-colors duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <path d="M7 1v9M3 6l4 4 4-4M2 13h10" />
                </svg>
                Das vollständige Booklet als PDF
              </a>
              <span className="font-ui text-sm font-light text-white/40">
                Für Geschäftsleitungen &amp; Verwaltungsräte
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Preise ────────────────────────────────────────── */}
      <section
        id="preise"
        className="bg-white scroll-mt-24 px-6 sm:px-10 lg:px-20 py-20"
      >
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Preise" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Klare Leistung,{" "}
              <span className="italic text-gold">klare Preise</span>
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-12 max-w-reading">
              Die meisten Beratungsangebote nennen Preise erst auf Anfrage. Wir
              legen unsere Tarife offen — damit Sie planen können, bevor Sie mit
              uns sprechen.
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
              KI-Kompetenz mit Zertifikat aufbauen will, ist der Weg dahin kurz.
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
