import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interaktive Anleitungen und Werkzeuge zum Selber bauen. Direkt im Browser, ohne Account und ohne Server.",
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
      "Baue einen Team-Router und zwei Spezialisten-GPTs. Ein orchestriertes System aus drei GPTs — ohne Code. Mit Schritt-für-Schritt-Anleitung, Beispiel-Kontexten und lokalem Speichern.",
    tag: "Anleitung",
    href: "/lab/multi-assistant-gpt.html",
  },
  {
    slug: "ki-governance-policy",
    title: "KI-Governance-Richtlinie Generator",
    description:
      "Vier Formulare. Zehn Abschnitte. Ein druckfertiges Word-Dokument. Fülle dein Unternehmensprofil aus und erhalte eine vollständige, anpassbare KI-Governance-Richtlinie — mit Deckblatt, nummerierten Klauseln und Unterschriftenblock.",
    tag: "Generator",
    href: "/lab/ki-governance-policy.html",
  },
  {
    slug: "eu-ai-act-check",
    title: "EU AI Act Compliance Checker",
    description:
      "12 Fragen. Sofortige Risikoklassifizierung. Beantworte einen strukturierten Fragebogen zu deinem KI-System und erhalte eine Einstufung nach EU AI Act — mit einer massgeschneiderten Massnahmenliste zum Abhaken und einem herunterladbaren Bericht.",
    tag: "Checker",
    href: "/lab/eu-ai-act-check.html",
  },
];

export default function LabPage() {
  return (
    <>
      <HeroLight
        label="Lab"
        title={
          <>
            Werkzeuge zum <em>Selber bauen</em>.
          </>
        }
        description="Interaktive Anleitungen und Tools, die direkt im Browser laufen. Dein Stand wird lokal gespeichert — kein Account, kein Server. Lade deinen Fortschritt jederzeit als HTML- oder Word-Datei herunter."
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <SectionLabel text="Verfügbare Werkzeuge" />

          <div className="grid grid-cols-1 gap-[2px] bg-ink/10">
            {tools.map((tool, index) => (
              <ScrollReveal key={tool.slug} delay={index * 90}>
                <a
                  href={tool.href}
                  className="group block bg-white no-underline"
                >
                  <article className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 p-10 lg:p-14 items-end border-l-[3px] border-transparent group-hover:border-gold transition-colors duration-300">
                    <div className="max-w-reading">
                      <div className="font-ui text-xs uppercase tracking-wide-label text-gold mb-4">
                        {tool.tag}
                      </div>
                      <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-4">
                        {tool.title}
                      </h2>
                      <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
                        {tool.description}
                      </p>
                    </div>
                    <div className="font-ui text-xs uppercase tracking-wide-label text-ink/60 group-hover:text-gold transition-colors whitespace-nowrap">
                      Werkzeug öffnen →
                    </div>
                  </article>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming soon card */}
          <ScrollReveal delay={tools.length * 90}>
            <div className="mt-[2px] bg-cream border border-dashed border-ink/15 p-10 lg:p-14">
              <div className="font-ui text-xs uppercase tracking-wide-label text-mid-grey mb-4">
                Demnächst
              </div>
              <h2 className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink/40 mb-3">
                Weitere Werkzeuge in Entwicklung
              </h2>
              <p className="font-ui text-sm font-light leading-body text-mid-grey max-w-reading">
                Prompt-Bibliotheken, KI-Readiness-Assessments und
                weitere Tools. Hast du eine Idee oder einen
                konkreten Anwendungsfall?{" "}
                <a
                  href="/booking"
                  className="text-ink underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                >
                  Sag uns Bescheid.
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
