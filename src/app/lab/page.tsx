import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldRule from "@/components/GoldRule";
import LabGate, { LabToolLink } from "@/components/LabGateModal";
import { pageShareMeta } from "@/lib/og";

const pageTitle = "Lab";
const pageDescription =
  "Kostenlose KI-Tools und Generatoren für Entscheider — direkt im Browser nutzbar.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://www.rautaki.ch/lab" },
  ...pageShareMeta({
    title: pageTitle,
    description: pageDescription,
    path: "/lab",
  }),
};

interface Tool {
  slug: string;
  title: string;
  description: string;
  tag: string;
  href: string;
}

const tools: Tool[] = [
  {
    slug: "multi-assistant-gpt",
    title: "Multi-Assistant-System mit Custom GPTs",
    description:
      "Bauen Sie einen Team-Router und zwei Spezialisten-GPTs. Ein orchestriertes System aus drei GPTs — ohne Code. Mit Schritt-für-Schritt-Anleitung, Beispiel-Kontexten und Word-Export.",
    tag: "Anleitung",
    href: "/lab/multi-assistant-gpt.html",
  },
  {
    slug: "ki-governance-policy",
    title: "KI-Governance-Richtlinie Generator",
    description:
      "Vier Formulare. Zehn Abschnitte. Ein druckfertiges Word-Dokument. Vollständige KI-Governance-Richtlinie — mit Deckblatt, nummerierten Klauseln und Unterschriftenblock.",
    tag: "Generator",
    href: "/lab/ki-governance-policy.html",
  },
  {
    slug: "eu-ai-act-check",
    title: "EU AI Act Compliance Checker",
    description:
      "12 Fragen. Sofortige Risikoklassifizierung nach EU AI Act — mit massgeschneiderter Massnahmenliste zum Abhaken und herunterladbarem Bericht.",
    tag: "Checker",
    href: "/lab/eu-ai-act-check.html",
  },
];

export default function LabPage() {
  return (
    <LabGate>
      <section className="bg-cream border-t-3 border-gold px-6 sm:px-10 lg:px-20 pt-16 pb-24">
        <div className="mx-auto max-w-content">
          {/* Page header — compact, flows directly into cards */}
          <SectionLabel text="Lab" />
          <h1 className="font-serif text-h2 lg:text-h1 font-normal leading-heading tracking-tight text-ink mb-4">
            Werkzeuge zum <span className="italic text-gold">Selberbauen</span>.
          </h1>
          <p className="max-w-reading font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-10">
            Interaktive Tools, die direkt im Browser laufen — kein Account, kein
            Server. Fortschritt als HTML- oder Word-Datei herunterladbar — zum
            späteren Weiterbearbeiten oder Teilen.
          </p>

          {/* Tool cards */}
          <div className="grid grid-cols-1 gap-[2px] bg-ink/10">
            {tools.map((tool, index) => (
              <ScrollReveal key={tool.slug} delay={index * 90}>
                <LabToolLink
                  href={tool.href}
                  className="group block bg-white no-underline"
                >
                  <article className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 p-7 lg:p-9 items-center border-l-3 border-transparent group-hover:border-gold transition-colors duration-300">
                    <div className="max-w-reading">
                      <div className="font-ui text-xs uppercase tracking-wide-label text-gold mb-2">
                        {tool.tag}
                      </div>
                      <h2 className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink mb-2">
                        {tool.title}
                      </h2>
                      <p className="font-ui text-sm font-light leading-body text-ink/65 md:text-mid-grey">
                        {tool.description}
                      </p>
                    </div>
                    <div className="font-ui text-xs uppercase tracking-wide-label text-ink/40 group-hover:text-gold transition-colors whitespace-nowrap">
                      Öffnen →
                    </div>
                  </article>
                </LabToolLink>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming soon */}
          <ScrollReveal delay={tools.length * 90}>
            <div className="mt-[2px] bg-cream border border-dashed border-ink/15 p-7 lg:p-9">
              <div className="font-ui text-xs uppercase tracking-wide-label text-mid-grey mb-2">
                Demnächst
              </div>
              <h2 className="font-serif text-h4 tracking-tight-h4 font-normal leading-heading text-ink/35 mb-2">
                Weitere Werkzeuge in Entwicklung
              </h2>
              <p className="font-ui text-sm font-light leading-body text-mid-grey max-w-reading">
                Prompt-Bibliotheken, KI-Readiness-Assessments und weitere Tools.
                Haben Sie eine Idee?{" "}
                <a
                  href="mailto:hello@rautaki.ch"
                  className="text-ink underline decoration-gold/70 underline-offset-4 hover:decoration-gold"
                >
                  Schreiben Sie uns.
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <GoldRule />

      {/* Booking CTA */}
      <section className="bg-obsidian py-20">
        <div className="container mx-auto px-6 text-center max-w-narrow">
          <p className="font-sans text-sm tracking-widest uppercase text-gold mb-4">
            Strategie-Gespräch
          </p>
          <h2 className="font-serif text-h2 text-white mb-6">
            Massgeschneidert statt{" "}
            <span className="italic text-gold">von der Stange</span>
          </h2>
          <p className="text-white/45 font-sans text-body mb-10">
            Die Lab-Tools geben Ihnen einen ersten Einblick. Für eine
            individuelle Lösung sprechen wir persönlich.
          </p>
          <a
            href="/booking"
            className="font-sans text-sm tracking-wide text-white hover:text-gold transition-colors duration-200"
          >
            Gespräch vereinbaren →
          </a>
        </div>
      </section>
    </LabGate>
  );
}
