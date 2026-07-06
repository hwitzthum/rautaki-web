import type { Metadata } from "next";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import HeroLight from "@/components/HeroLight";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { pageShareMeta } from "@/lib/og";
import { journey } from "@/data/journey";
import {
  vorgehenIntro,
  vorgehenOutcomes,
  vorgehenComplianceIntro,
  vorgehenCompliance,
  vorgehenCollaboration,
  vorgehenCollaborationNote,
} from "@/data/vorgehen";

const pageTitle = "Vorgehen";
const pageDescription =
  "Drei Phasen, neun Schritte, zwei Entscheidungspunkte — der strukturierte Weg von der Standortbestimmung bis zur Skalierung.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://www.rautaki.ch/vorgehen" },
  ...pageShareMeta({
    title: pageTitle,
    description: pageDescription,
    path: "/vorgehen",
  }),
};

const steps = journey.filter((item) => item.kind === "step");

// Canonical HowTo entity for the consulting programme. The timeline on
// /services emits a compact HowTo with the same @id, so both resolve to
// one entity; this page carries the full per-step text.
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://www.rautaki.ch/vorgehen#programm",
  name: "Der Weg zu wirksamer KI — das Rautaki KI-Beratungspaket",
  description: vorgehenIntro,
  url: "https://www.rautaki.ch/vorgehen",
  mainEntityOfPage: "https://www.rautaki.ch/vorgehen",
  inLanguage: "de-CH",
  step: steps.map((item) => ({
    "@type": "HowToStep",
    position: Number(item.no),
    name: item.title,
    url: `https://www.rautaki.ch/vorgehen#schritt-${item.no}`,
    text: `${item.activity} Ihr Ergebnis: ${item.outcome}`,
  })),
};

// Group the flat journey list into phases so each phase renders as its
// own section with the steps (and a trailing gate, if any) inside.
type Step = Extract<(typeof journey)[number], { kind: "step" }>;
type Gate = Extract<(typeof journey)[number], { kind: "gate" }>;

interface PhaseGroup {
  label: string;
  items: (Step | Gate)[];
}

const phases = journey.reduce<PhaseGroup[]>((groups, item) => {
  if (item.kind === "phase") {
    groups.push({ label: item.label, items: [] });
  } else {
    groups[groups.length - 1].items.push(item);
  }
  return groups;
}, []);

const phaseBg = ["bg-white", "bg-cream", "bg-white"] as const;

export default function VorgehenPage() {
  return (
    <>
      <JsonLd schema={howToSchema} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroLight
        label="KI-Beratungspaket"
        title={
          <>
            Der Weg zu <span className="italic text-gold">wirksamer KI</span>
          </>
        }
        description={<p>{vorgehenIntro}</p>}
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
                          Ihr Ergebnis
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
            <SectionLabel text="Das haben Sie am Ende" variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              Vier Ergebnisse, auf die Sie sich{" "}
              <span className="italic text-gold">verlassen können</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {vorgehenOutcomes.map((outcome, index) => (
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
            <SectionLabel text="Sicherheit & Governance" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Compliance begleitet{" "}
              <span className="italic text-gold">jeden Schritt</span>
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-12 max-w-reading">
              {vorgehenComplianceIntro}
            </p>
          </ScrollReveal>

          <div className="border-t border-ink/10">
            {vorgehenCompliance.map((item, index) => (
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
            <SectionLabel text="Transparente Zusammenarbeit" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              Sie starten klein und entscheiden an{" "}
              <span className="italic text-gold">jedem Gate</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {vorgehenCollaboration.map((item, index) => (
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
              {vorgehenCollaborationNote}{" "}
              <a
                href="/services#preise"
                className="text-ink underline decoration-gold/70 underline-offset-4 hover:decoration-gold"
              >
                Alle Tarife im Detail
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
            Sprechen wir über{" "}
            <span className="italic text-gold">Ihre KI-Strategie</span>
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            Das Erstgespräch ist kostenlos und unverbindlich. In 45 Minuten
            klären wir Ihre Prioritäten und den sinnvollsten nächsten Schritt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            <Button href="/booking" variant="gold" showArrow>
              Erstgespräch vereinbaren
            </Button>
            <a
              href="/downloads/rautaki-ki-beratung-booklet.pdf"
              download
              className="font-sans text-sm tracking-wide text-white hover:text-gold transition-colors duration-200"
            >
              Das vollständige Booklet als PDF →
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
