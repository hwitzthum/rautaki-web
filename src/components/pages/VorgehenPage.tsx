import type { Metadata } from "next";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import HeroLight from "@/components/HeroLight";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import Highlight from "@/components/Highlight";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { absoluteUrl, localePath, pageAlternates } from "@/lib/i18n";
import { getContent } from "@/content";
import type { JourneyItem, Locale } from "@/content/types";

export function vorgehenMetadata(locale: Locale): Metadata {
  const c = getContent(locale).vorgehen;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(locale, "/vorgehen"),
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: localePath(locale, "/vorgehen"),
      locale,
    }),
  };
}

const phaseBg = ["bg-white", "bg-cream", "bg-white"] as const;

type Step = Extract<JourneyItem, { kind: "step" }>;
type Gate = Extract<JourneyItem, { kind: "gate" }>;

interface PhaseGroup {
  label: string;
  items: (Step | Gate)[];
}

const INLANGUAGE: Record<Locale, string> = {
  de: "de-CH",
  en: "en-GB",
};

export default function VorgehenPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const c = content.vorgehen;
  const journey = content.journey.items;
  const inLanguage = INLANGUAGE[locale];
  const vorgehenUrl = absoluteUrl(localePath(locale, "/vorgehen"));

  const steps = journey.filter((item) => item.kind === "step");

  // Canonical HowTo entity for the consulting programme. The timeline on
  // /services emits a compact HowTo with the same @id, so both resolve to
  // one entity; this page carries the full per-step text.
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${vorgehenUrl}#programm`,
    name: c.schema.howToName,
    description: c.intro,
    url: vorgehenUrl,
    mainEntityOfPage: vorgehenUrl,
    inLanguage,
    step: steps.map((item) => ({
      "@type": "HowToStep",
      position: Number(item.no),
      name: item.title,
      url: `${vorgehenUrl}#schritt-${item.no}`,
      text: `${item.activity} ${c.schema.resultLabel}: ${item.outcome}`,
    })),
  };

  // The consulting booklet as a dated, citable document entity — gives AI
  // systems a publication date and a downloadable artifact to reference.
  const bookletSchema = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "@id": "https://www.rautaki.ch/downloads/rautaki-ki-beratung-booklet.pdf",
    name: c.schema.bookletName,
    url: "https://www.rautaki.ch/downloads/rautaki-ki-beratung-booklet.pdf",
    description: c.schema.bookletDescription,
    encodingFormat: "application/pdf",
    inLanguage,
    isAccessibleForFree: true,
    datePublished: "2026-07-06",
    publisher: { "@id": "https://www.rautaki.ch/#organization" },
    about: { "@id": `${vorgehenUrl}#programm` },
  };

  // Group the flat journey list into phases so each phase renders as its
  // own section with the steps (and a trailing gate, if any) inside.
  const phases = journey.reduce<PhaseGroup[]>((groups, item) => {
    if (item.kind === "phase") {
      groups.push({ label: item.label, items: [] });
    } else {
      groups[groups.length - 1].items.push(item);
    }
    return groups;
  }, []);

  return (
    <>
      <JsonLd
        schema={[
          howToSchema,
          bookletSchema,
          breadcrumbSchema(
            [{ name: c.breadcrumbLabel, path: "/vorgehen" }],
            locale,
          ),
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroLight
        label={c.heroLabel}
        title={<Highlight text={c.heroTitle} />}
        description={<p>{c.intro}</p>}
        rightContent={
          <div className="hidden lg:block space-y-2">
            {phases.map((phase) => (
              <div
                key={phase.label}
                className="font-serif text-h2 leading-none text-ink/25"
              >
                {phase.label.split(" · ")[1]}
              </div>
            ))}
          </div>
        }
      />

      {/* ── Phases with full-text steps ────────────────────── */}
      {phases.map((phase, phaseIndex) => (
        <section
          key={phase.label}
          className={`${phaseBg[phaseIndex]} px-6 sm:px-10 lg:px-20 py-20 border-b border-ink/[0.07]`}
        >
          <div className="mx-auto max-w-content">
            <ScrollReveal>
              <SectionLabel text={phase.label} />
            </ScrollReveal>

            <div className="space-y-14">
              {phase.items.map((item) => {
                if (item.kind === "gate") {
                  return (
                    <ScrollReveal key={item.label}>
                      <div className="border border-gold/40 bg-white/60 px-6 py-5 max-w-reading">
                        <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-gold mb-2">
                          {item.label}
                        </div>
                        <p className="font-ui text-sm font-light leading-body text-ink/65">
                          {item.note}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                }

                return (
                  <article
                    key={item.no}
                    id={`schritt-${item.no}`}
                    className="scroll-mt-24 grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10"
                  >
                    <ScrollReveal>
                      <div className="font-serif text-d1 leading-none text-ink/15 select-none">
                        {item.no}
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={60}>
                      <h2 className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink mb-3 pt-2">
                        {item.title}
                      </h2>
                      <p className="font-serif italic text-body leading-body text-ink mb-3">
                        {item.question}
                      </p>
                      <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-5 max-w-reading">
                        {item.activity}
                      </p>
                      <div className="border-l-2 border-gold pl-5 max-w-reading">
                        <div className="font-ui text-[0.7rem] uppercase tracking-wide-label text-mid-grey mb-1">
                          {c.resultLabel}
                        </div>
                        <p className="font-serif text-body leading-body text-ink">
                          {item.outcome}
                        </p>
                      </div>
                    </ScrollReveal>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ── Vier Ergebnisse ───────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.outcomesSection.label} variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              <Highlight text={c.outcomesSection.heading} />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {c.outcomes.map((outcome, index) => (
              <ScrollReveal key={outcome.title} delay={index * 80}>
                <article className="bg-charcoal p-10 border-l-2 border-gold h-full">
                  <h3 className="font-serif text-h3 tracking-tight-h3 text-white font-normal mb-3">
                    {outcome.title}
                  </h3>
                  <p className="font-ui text-sm leading-body text-white/55 font-light">
                    {outcome.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sicherheit & Governance ───────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.complianceSection.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              <Highlight text={c.complianceSection.heading} />
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-12 max-w-reading">
              {c.complianceIntro}
            </p>
          </ScrollReveal>

          <div className="border-t border-ink/10">
            {c.compliance.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 80}>
                <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-x-10 gap-y-1 py-6 border-b border-ink/10">
                  <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-gold pt-1">
                    {item.label}
                  </div>
                  <p className="font-ui text-body font-light leading-body text-ink/65 max-w-reading">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparente Zusammenarbeit ───────────────────── */}
      <section className="bg-white px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.collaborationSection.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              <Highlight text={c.collaborationSection.heading} />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {c.collaboration.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="border-t-2 border-gold/75 pt-6">
                  <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-3">
                    {item.label}
                  </div>
                  <h3 className="font-serif text-h3 tracking-tight-h3 text-ink font-normal mb-3">
                    {item.title}
                  </h3>
                  <p className="font-ui text-sm font-light leading-body text-mid-grey">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="font-ui text-sm font-light leading-body text-mid-grey mt-12 pt-8 border-t border-ink/10 max-w-reading">
              {c.collaborationNote}{" "}
              <a
                href={localePath(locale, "/services#preise")}
                className="text-ink underline decoration-gold/70 underline-offset-4 hover:decoration-gold"
              >
                {c.collaborationSection.tariffLinkLabel}
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldRule />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4">
            <Highlight text={c.cta.heading} />
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            {c.cta.body}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            <Button
              href={localePath(locale, "/booking")}
              variant="gold"
              showArrow
            >
              {c.cta.button}
            </Button>
            <a
              href="/downloads/rautaki-ki-beratung-booklet.pdf"
              download
              className="font-sans text-sm tracking-wide text-white hover:text-gold transition-colors duration-200"
            >
              {c.cta.bookletLink}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
