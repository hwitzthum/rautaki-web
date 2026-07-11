import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldRule from "@/components/GoldRule";
import LabGate, { LabToolLink } from "@/components/LabGateModal";
import JsonLd from "@/components/JsonLd";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { localePath, pageAlternates } from "@/lib/i18n";

const pageTitle = "Lab";
const pageDescription =
  "Free AI tools for decision-makers — EU AI Act check, AI governance policy and more, running entirely in your browser. The tools are in German.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: pageAlternates("en", "/lab"),
  ...pageShareMeta({
    title: pageTitle,
    description: pageDescription,
    path: "/en/lab",
    locale: "en",
  }),
};

// English index only — the tools themselves stay German (deferred, GEO
// roadmap P6). No WebApplication schema here: the German /lab page owns those
// entities; duplicating them under /en would split the same @ids across pages.
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
    title: "Multi-assistant system with custom GPTs",
    description:
      "Build a team router and two specialist GPTs — an orchestrated system of three GPTs, no code required. With a step-by-step guide, example contexts and Word export.",
    tag: "Guide",
    href: "/lab/multi-assistant-gpt.html",
  },
  {
    slug: "ki-governance-policy",
    title: "AI governance policy generator",
    description:
      "Four forms. Ten sections. One print-ready Word document. A complete AI governance policy — with cover page, numbered clauses and a signature block.",
    tag: "Generator",
    href: "/lab/ki-governance-policy.html",
  },
  {
    slug: "eu-ai-act-check",
    title: "EU AI Act compliance checker",
    description:
      "12 questions. Instant risk classification under the EU AI Act — with a tailored, tickable action list and a downloadable report.",
    tag: "Checker",
    href: "/lab/eu-ai-act-check.html",
  },
];

export default function EnLabPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([{ name: "Lab", path: "/lab" }], "en")}
      />
      <LabGate>
        <section className="bg-cream border-t-3 border-gold px-6 sm:px-10 lg:px-20 pt-16 pb-24">
          <div className="mx-auto max-w-content">
            <SectionLabel text="Lab" />
            <h1 className="font-serif text-h2 lg:text-h1 font-normal leading-heading tracking-tight text-ink mb-4">
              Tools to <span className="italic text-gold">build yourself</span>.
            </h1>
            <p className="max-w-reading font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-6">
              Interactive tools that run directly in your browser — no account,
              no server. Save your progress as an HTML or Word file to continue
              or share later.
            </p>
            <p className="max-w-reading font-ui text-sm font-light leading-body text-mid-grey mb-10">
              Note: the tools themselves are currently available in German only.
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
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-ui text-xs uppercase tracking-wide-label text-gold">
                            {tool.tag}
                          </span>
                          <span className="font-ui text-xs uppercase tracking-wide-label text-ink/40 border border-ink/15 px-2 py-0.5">
                            German only
                          </span>
                        </div>
                        <h2 className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink mb-2">
                          {tool.title}
                        </h2>
                        <p className="font-ui text-sm font-light leading-body text-ink/65 md:text-mid-grey">
                          {tool.description}
                        </p>
                      </div>
                      <div className="font-ui text-xs uppercase tracking-wide-label text-ink/40 group-hover:text-gold transition-colors whitespace-nowrap">
                        Open →
                      </div>
                    </article>
                  </LabToolLink>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <GoldRule />

        {/* Booking CTA */}
        <section className="bg-obsidian py-20">
          <div className="container mx-auto px-6 text-center max-w-narrow">
            <p className="font-sans text-sm tracking-widest uppercase text-gold mb-4">
              Strategy call
            </p>
            <h2 className="font-serif text-h2 text-white mb-6">
              Tailored, not{" "}
              <span className="italic text-gold">off the shelf</span>
            </h2>
            <p className="text-white/45 font-sans text-body mb-10">
              The Lab tools give you a first impression. For an individual
              solution, let&rsquo;s talk in person.
            </p>
            <a
              href={localePath("en", "/booking")}
              className="font-sans text-sm tracking-wide text-white hover:text-gold transition-colors duration-200"
            >
              Arrange a conversation →
            </a>
          </div>
        </section>
      </LabGate>
    </>
  );
}
