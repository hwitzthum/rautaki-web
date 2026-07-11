import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import HeroLight from "@/components/HeroLight";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServiceCard from "@/components/ServiceCard";
import Highlight, { stripMarkers } from "@/components/Highlight";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

export function servicesMetadata(locale: Locale): Metadata {
  const c = getContent(locale).services;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://www.rautaki.ch/services" },
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: "/services",
      locale,
    }),
  };
}

const sectionBg = ["bg-white", "bg-cream", "bg-warm-grey"] as const;

export default function ServicesPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const c = content.services;
  const services = c.items;
  const faq = content.faq.items;
  const journey = content.journey.items;

  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: stripMarkers(service.title),
    description: service.longDesc,
    url: `https://www.rautaki.ch/services#${service.slug}`,
    provider: {
      "@type": "Organization",
      "@id": "https://www.rautaki.ch/#organization",
      name: "Rautaki",
      url: "https://www.rautaki.ch",
    },
    areaServed: { "@type": "Country", name: c.schema.areaServedName },
    serviceType: c.schema.serviceType,
  }));

  // Structured pricing — mirrors the published pricing table below so AI
  // systems can cite concrete figures (SEAKT K-dimension: quotable facts).
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://www.rautaki.ch/services#preise",
    name: c.schema.offerCatalogName,
    itemListElement: [
      {
        "@type": "Offer",
        name: c.schema.offers[0].name,
        description: c.schema.offers[0].description,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 3500,
          priceCurrency: "CHF",
        },
        offeredBy: { "@id": "https://www.rautaki.ch/#organization" },
      },
      {
        "@type": "Offer",
        name: c.schema.offers[1].name,
        description: c.schema.offers[1].description,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 1800,
          priceCurrency: "CHF",
        },
        offeredBy: { "@id": "https://www.rautaki.ch/#organization" },
      },
      {
        "@type": "Offer",
        name: c.schema.offers[2].name,
        description: c.schema.offers[2].description,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: 280,
          priceCurrency: "CHF",
          unitText: c.schema.hourlyUnitText,
        },
        offeredBy: { "@id": "https://www.rautaki.ch/#organization" },
      },
    ],
  };

  // HowTo schema for the "Der Weg zu wirksamer KI" timeline — makes the
  // nine-step consulting process quotable for AI systems (SEAKT K-dimension).
  // Shares its @id with the full-text version on /vorgehen so both pages
  // resolve to one HowTo entity.
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://www.rautaki.ch/vorgehen#programm",
    name: c.schema.howToName,
    description: c.schema.howToDescription,
    step: journey
      .filter((item) => item.kind === "step")
      .map((item) => ({
        "@type": "HowToStep",
        position: Number(item.no),
        name: item.title,
        text: item.outcome,
      })),
  };

  // FAQ rendered below and mirrored as FAQPage schema — Q&A format is what
  // AI answer engines cite most readily (GEO).
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.rautaki.ch/services#faq",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd
        schema={[
          ...serviceSchemas,
          offerCatalogSchema,
          howToSchema,
          faqSchema,
          breadcrumbSchema(
            [{ name: c.breadcrumbLabel, path: "/services" }],
            locale,
          ),
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroLight
        label={c.heroLabel}
        title={<Highlight text={c.heroTitle} />}
        description={c.heroDescription}
        rightContent={
          <div className="hidden lg:block space-y-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="font-serif text-h1 leading-none text-ink/25"
              >
                {stripMarkers(service.title)}
              </div>
            ))}
          </div>
        }
      />

      {/* ── Service overview cards ─────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <SectionLabel text={c.overview.label} variant="dark" />
          <h2 className="font-serif text-h2 text-white mb-6">
            <Highlight text={c.overview.heading} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 80}>
                <ServiceCard
                  number={service.number}
                  title={
                    <Highlight
                      text={service.title}
                      spanClassName="text-gold italic"
                    />
                  }
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
                  <SectionLabel text={stripMarkers(service.title)} />
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
                    alt={stripMarkers(service.title)}
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
                {c.serviceBridgeNote}
              </p>
              <a
                href="#vorgehen"
                className="font-sans text-sm text-ink hover:text-gold transition-colors duration-200 tracking-wide"
              >
                {c.serviceBridgeLink}
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
            <SectionLabel text={c.journeySection.label} variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-6">
              <Highlight text={c.journeySection.heading} />
            </h2>
            <p className="font-ui text-body font-light leading-body text-white/55 mb-16 max-w-reading">
              {c.journeySection.intro}
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
                        {c.journeySection.resultLabel}
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
                href="/vorgehen"
                className="group inline-flex items-center gap-2 border border-white/35 text-white px-8 py-4 font-ui text-xs font-medium uppercase tracking-wide-btn no-underline hover:border-gold hover:text-gold transition-colors duration-200"
              >
                {c.journeySection.detailLink}
              </a>
              <a
                href="/downloads/rautaki-ki-beratung-booklet.pdf"
                download
                className="group inline-flex items-center gap-2 text-white/70 font-ui text-xs font-medium uppercase tracking-wide-btn no-underline hover:text-gold transition-colors duration-200"
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
                {c.journeySection.bookletLink}
              </a>
              <span className="font-ui text-sm font-light text-white/40">
                {c.journeySection.audience}
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
            <SectionLabel text={c.pricing.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              <Highlight text={c.pricing.heading} />
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-12 max-w-reading">
              {c.pricing.intro}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {c.pricing.items.map((item, index) => (
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
              {c.pricing.note}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Akkreditierte Weiterbildung ────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.education.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              <Highlight text={c.education.heading} />
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-8 max-w-reading">
              {c.education.body}
            </p>
            <a
              href="/about"
              className="font-sans text-sm text-ink hover:text-gold transition-colors duration-200 tracking-wide"
            >
              {c.education.link}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section
        id="faq"
        className="bg-white scroll-mt-24 px-6 sm:px-10 lg:px-20 py-20 border-t border-ink/[0.07]"
      >
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.faqSection.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              <Highlight text={c.faqSection.heading} />
            </h2>
          </ScrollReveal>

          <dl className="border-t border-ink/10">
            {faq.map((item, index) => (
              <ScrollReveal key={item.question} delay={(index % 4) * 60}>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-x-16 gap-y-3 py-8 border-b border-ink/10">
                  <dt className="font-serif text-h4 tracking-tight-h4 font-normal leading-heading text-ink">
                    {item.question}
                  </dt>
                  <dd className="m-0">
                    <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading">
                      {item.answer}
                    </p>
                    {item.link && (
                      <a
                        href={item.link.href}
                        className="mt-3 inline-block font-sans text-sm text-ink hover:text-gold transition-colors duration-200 tracking-wide"
                      >
                        {item.link.label} →
                      </a>
                    )}
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      <GoldRule />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4">
            {c.cta.heading}
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            {c.cta.body}
          </p>
          <Button href="/booking" variant="gold" showArrow>
            {c.cta.button}
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
