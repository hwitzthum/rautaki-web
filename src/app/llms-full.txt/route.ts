// /llms-full.txt — full-text companion to /llms.txt (https://llmstxt.org).
// Assembled per locale from the same content modules the pages render, so the
// machine-readable version cannot drift from the visible content: German full
// text first (primary language), then the English version. Static like
// robots/sitemap/llms.txt.

import { orgProfiles, personProfiles } from "@/lib/authority";
import { stripMarkers } from "@/components/Highlight";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

const BASE = "https://www.rautaki.ch";

// Template scaffolding that frames the content-module strings — headings,
// the intro/bio paragraphs and the price list, per locale.
const scaffold = {
  de: {
    title: "# Rautaki — Volltext",
    summary:
      "> Rautaki begleitet Unternehmen und Organisationen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung. Sitz in Kilchberg ZH, Schweiz. Fokus: Führungsteams in NPO, Sozialwesen, öffentlichem Sektor und KMU.",
    intro: `Rautaki (te reo Māori für «Strategie») wurde von Harry Witzthum gegründet —
Doktor der Philosophie, Diplomierter Verbands- und NPO-Manager VMI, langjährige
Führungserfahrung in nationalen Nonprofit-Organisationen und Dozent in
akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.

Kompakte Link-Übersicht: ${BASE}/llms.txt`,
    services: "Leistungen",
    journeyTitle: "Der Weg zu wirksamer KI",
    step: "Schritt",
    result: "Ihr Ergebnis",
    outcomesHeading: "Vier Ergebnisse, auf die Sie sich verlassen können",
    complianceHeading: "Compliance begleitet jeden Schritt",
    collaborationHeading: "Transparente Zusammenarbeit",
    pricesHeading: "Preise",
    prices: `- Beratungstag: ab CHF 3'500 (inkl. Vor- und Nachbereitung, Unterlagen, dokumentierte Ergebnisse)
- Halbtag: ab CHF 1'800 (inkl. Vorbereitung und Ergebnissicherung)
- Stundenansatz: CHF 280 (punktuelles Sparring, ohne Vor- und Nachbereitung)
- Mehrwöchige Programme und Mandate: individuell vereinbart, transparent kalkuliert auf Basis dieser Tarife
- Erstgespräch: kostenlos, 45 Minuten, per Video-Call
- Alle Preise exkl. MwSt.`,
    faqHeading: "Häufige Fragen",
    aboutHeading: "Über uns",
    bio: `Harry Witzthum, Gründer von Rautaki — Doktor der Philosophie und Diplomierter
Verbands- und NPO-Manager VMI. Langjährige Führungsverantwortung in nationalen
Nonprofit-Organisationen, real verantwortete Transformationsprozesse und der
Aufbau agiler Strukturen (einschliesslich Holacracy). Er führt KI nicht als
isoliertes Tool ein, sondern entlang von Entscheidungswegen, Rollen und
Verantwortlichkeiten.`,
    clientsHeading: "Workshops mit Organisationen (Auswahl)",
    teachingHeading: "Lehrtätigkeit",
    labHeading: "Lab — kostenlose KI-Tools",
    labIntro:
      "Interaktive Tools, die direkt im Browser laufen — kein Account, kein Server.",
    labTools: `- [EU AI Act Compliance Checker](${BASE}/lab/eu-ai-act-check.html): 12 Fragen, sofortige Risikoklassifizierung nach EU AI Act — mit massgeschneiderter Massnahmenliste zum Abhaken und herunterladbarem Bericht.
- [KI-Governance-Richtlinie Generator](${BASE}/lab/ki-governance-policy.html): Vier Formulare, zehn Abschnitte, ein druckfertiges Word-Dokument — mit Deckblatt, nummerierten Klauseln und Unterschriftenblock.
- [Multi-Assistant-System mit Custom GPTs](${BASE}/lab/multi-assistant-gpt.html): Team-Router und zwei Spezialisten-GPTs als orchestriertes System — ohne Code, mit Schritt-für-Schritt-Anleitung und Word-Export.`,
    wissenHeading: "Wissen",
    wissenPublished: "Publiziert",
    wissenUpdated: "Aktualisiert",
    contactHeading: "Kontakt",
    contactLines: `- E-Mail: hello@rautaki.ch
- Adresse: Weinbergstrasse 23, 8802 Kilchberg ZH, Schweiz
- UID: CHE-362.050.451 (Schweizer Unternehmens-Identifikationsnummer, ${orgProfiles.uidRegister})
- Wikidata: ${orgProfiles.wikidata}
- Google Business Profile: ${orgProfiles.googleBusiness}
- LinkedIn: ${orgProfiles.linkedIn}
- ResearchGate: ${personProfiles.researchGate}
- Erstgespräch buchen: ${BASE}/booking`,
  },
  en: {
    title: "# Rautaki — Full text (English)",
    summary:
      "> Rautaki supports companies and organisations with the strategic adoption of AI — from analysing potential to scalable implementation. Based in Kilchberg ZH, Switzerland. Focus: leadership teams in NPOs, the social and public sectors, and SMEs.",
    intro: `Rautaki (te reo Māori for "strategy") was founded by Harry Witzthum —
Doctor of Philosophy, certified association and NPO manager VMI, with many years
of leadership experience in national nonprofit organisations, and a lecturer on
accredited CAS programmes in AI strategy and AI transformation.

English pages: ${BASE}/en · Compact link overview: ${BASE}/llms.txt`,
    services: "Services",
    journeyTitle: "The path to effective AI",
    step: "Step",
    result: "Your result",
    outcomesHeading: "Four outcomes you can rely on",
    complianceHeading: "Compliance accompanies every step",
    collaborationHeading: "Transparent collaboration",
    pricesHeading: "Prices",
    prices: `- Consulting day: from CHF 3,500 (incl. preparation, follow-up, materials and documented results)
- Half day: from CHF 1,800 (incl. preparation and documented results)
- Hourly rate: CHF 280 (ad hoc sparring, without preparation or follow-up)
- Multi-week programmes and mandates: agreed individually, transparently costed on the basis of these rates
- Initial consultation: free of charge, 45 minutes, via video call
- All prices excl. VAT.`,
    faqHeading: "Frequently asked questions",
    aboutHeading: "About us",
    bio: `Harry Witzthum, founder of Rautaki — Doctor of Philosophy and certified
association and NPO manager VMI. Many years of leadership responsibility in
national nonprofit organisations, hands-on transformation processes and the
build-up of agile structures (including Holacracy). He introduces AI not as an
isolated tool but along decision paths, roles and responsibilities.`,
    clientsHeading: "Workshops with organisations (selection)",
    teachingHeading: "Teaching",
    labHeading: "Lab — free AI tools (German only)",
    labIntro:
      "Interactive tools that run directly in the browser — no account, no server. The tools themselves are currently available in German only.",
    labTools: `- [EU AI Act Compliance Checker](${BASE}/lab/eu-ai-act-check.html): 12 questions, instant risk classification under the EU AI Act — with a tailored checklist of measures and a downloadable report.
- [AI Governance Policy Generator](${BASE}/lab/ki-governance-policy.html): four forms, ten sections, one print-ready Word document — with cover page, numbered clauses and signature block.
- [Multi-assistant system with Custom GPTs](${BASE}/lab/multi-assistant-gpt.html): a team router and two specialist GPTs as an orchestrated system — no code, with step-by-step instructions and Word export.`,
    wissenHeading: "Insights",
    wissenPublished: "Published",
    wissenUpdated: "Updated",
    contactHeading: "Contact",
    contactLines: `- E-mail: hello@rautaki.ch
- Address: Weinbergstrasse 23, 8802 Kilchberg ZH, Switzerland
- UID: CHE-362.050.451 (Swiss enterprise identification number, ${orgProfiles.uidRegister})
- Wikidata: ${orgProfiles.wikidata}
- Google Business Profile: ${orgProfiles.googleBusiness}
- LinkedIn: ${orgProfiles.linkedIn}
- ResearchGate: ${personProfiles.researchGate}
- Book an initial consultation: ${BASE}${localePath("en", "/booking")}`,
  },
} as const;

function buildFullText(locale: Locale): string {
  const c = getContent(locale);
  const s = scaffold[locale];
  const url = (path: string) => `${BASE}${localePath(locale, path)}`;

  const servicesSection = c.services.items
    .map(
      (service) =>
        `### ${stripMarkers(service.title)}\n\n${service.longDesc}\n\n${service.forWhom}`,
    )
    .join("\n\n");

  const journeySection = c.journey.items
    .map((item) => {
      switch (item.kind) {
        case "phase":
          return `### ${item.label}`;
        case "gate":
          return `**${item.label}** — ${item.note}`;
        case "step":
          return `**${s.step} ${item.no} — ${item.title}**\n\n*${item.question}*\n\n${item.activity}\n\n${s.result}: ${item.outcome}`;
      }
    })
    .join("\n\n");

  const outcomesSection = c.vorgehen.outcomes
    .map((outcome) => `- **${outcome.title}**: ${outcome.description}`)
    .join("\n");

  const complianceSection = c.vorgehen.compliance
    .map((item) => `- **${item.label}**: ${item.description}`)
    .join("\n");

  const collaborationSection = c.vorgehen.collaboration
    .map((item) => `- **${item.label} — ${item.title}**: ${item.description}`)
    .join("\n");

  const faqSection = c.faq.items
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join("\n\n");

  const clientsSection = c.about.workshopClients
    .map((client) => `- ${client}`)
    .join("\n");

  const teachingSection = c.about.teachingCourses
    .map(
      (course) => `- [${course.title}](${course.url}) — ${course.institution}`,
    )
    .join("\n");

  // Wissen articles from the same loader the pages render — one block per
  // article with the localized URL, description and publication date. Omitted
  // entirely for a locale with no articles yet (EN may lag DE).
  const articles = getArticles(locale);
  const wissenBlock = articles.length
    ? `## ${s.wissenHeading} (${url("/wissen")})

${articles
  .map((article) => {
    const revised =
      article.dateModified && article.dateModified !== article.datePublished
        ? ` · ${s.wissenUpdated}: ${article.dateModified}`
        : "";
    return `### ${article.title}\n\n${article.description}\n\n${s.wissenPublished}: ${article.datePublished}${revised} · ${url(`/wissen/${article.slug}`)}`;
  })
  .join("\n\n")}

`
    : "";

  return `${s.title}

${s.summary}

${s.intro}

## ${s.services} (${url("/services")})

${servicesSection}

## ${s.journeyTitle} (${url("/vorgehen")})

${c.vorgehen.intro}

${journeySection}

### ${s.outcomesHeading}

${outcomesSection}

### ${s.complianceHeading}

${c.vorgehen.complianceIntro}

${complianceSection}

### ${s.collaborationHeading}

${collaborationSection}

${c.vorgehen.collaborationNote}

## ${s.pricesHeading} (${url("/services")}#preise)

${s.prices}

## ${s.faqHeading} (${url("/services")}#faq)

${faqSection}

## ${s.aboutHeading} (${url("/about")})

${s.bio}

### ${s.clientsHeading}

${clientsSection}

### ${s.teachingHeading}

${teachingSection}

## ${s.labHeading} (${url("/lab")})

${s.labIntro}

${s.labTools}

${wissenBlock}## ${s.contactHeading}

${s.contactLines}
`;
}

const content = `${buildFullText("de")}

---

${buildFullText("en")}`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
