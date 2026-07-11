// /llms-full.txt — full-text companion to /llms.txt (https://llmstxt.org).
// Assembled from the same data modules the pages render, so the machine-
// readable version cannot drift from the visible content. Static like
// robots/sitemap/llms.txt.

import { orgProfiles, personProfiles } from "@/lib/authority";
import { stripMarkers } from "@/components/Highlight";
import { faq } from "@/content/de/faq";
import { journey } from "@/content/de/journey";
import { services } from "@/content/de/services";
import { about } from "@/content/de/about";
import { vorgehen } from "@/content/de/vorgehen";

export const dynamic = "force-static";

const servicesSection = services.items
  .map(
    (service) =>
      `### ${stripMarkers(service.title)}\n\n${service.longDesc}\n\n${service.forWhom}`,
  )
  .join("\n\n");

const journeySection = journey.items
  .map((item) => {
    switch (item.kind) {
      case "phase":
        return `### ${item.label}`;
      case "gate":
        return `**${item.label}** — ${item.note}`;
      case "step":
        return `**Schritt ${item.no} — ${item.title}**\n\n*${item.question}*\n\n${item.activity}\n\nIhr Ergebnis: ${item.outcome}`;
    }
  })
  .join("\n\n");

const outcomesSection = vorgehen.outcomes
  .map((outcome) => `- **${outcome.title}**: ${outcome.description}`)
  .join("\n");

const complianceSection = vorgehen.compliance
  .map((item) => `- **${item.label}**: ${item.description}`)
  .join("\n");

const collaborationSection = vorgehen.collaboration
  .map((item) => `- **${item.label} — ${item.title}**: ${item.description}`)
  .join("\n");

const faqSection = faq.items
  .map((item) => `### ${item.question}\n\n${item.answer}`)
  .join("\n\n");

const clientsSection = about.workshopClients
  .map((client) => `- ${client}`)
  .join("\n");

const teachingSection = about.teachingCourses
  .map((course) => `- [${course.title}](${course.url}) — ${course.institution}`)
  .join("\n");

const content = `# Rautaki — Volltext

> Rautaki begleitet Unternehmen und Organisationen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung. Sitz in Kilchberg ZH, Schweiz. Fokus: Führungsteams in NPO, Sozialwesen, öffentlichem Sektor und KMU.

Rautaki (te reo Māori für «Strategie») wurde von Harry Witzthum gegründet —
Doktor der Philosophie, Diplomierter Verbands- und NPO-Manager VMI, langjährige
Führungserfahrung in nationalen Nonprofit-Organisationen und Dozent in
akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.

Kompakte Link-Übersicht: https://www.rautaki.ch/llms.txt

## Leistungen (https://www.rautaki.ch/services)

${servicesSection}

## Der Weg zu wirksamer KI (https://www.rautaki.ch/vorgehen)

${vorgehen.intro}

${journeySection}

### Vier Ergebnisse, auf die Sie sich verlassen können

${outcomesSection}

### Compliance begleitet jeden Schritt

${vorgehen.complianceIntro}

${complianceSection}

### Transparente Zusammenarbeit

${collaborationSection}

${vorgehen.collaborationNote}

## Preise (https://www.rautaki.ch/services#preise)

- Beratungstag: ab CHF 3'500 (inkl. Vor- und Nachbereitung, Unterlagen, dokumentierte Ergebnisse)
- Halbtag: ab CHF 1'800 (inkl. Vorbereitung und Ergebnissicherung)
- Stundenansatz: CHF 280 (punktuelles Sparring, ohne Vor- und Nachbereitung)
- Mehrwöchige Programme und Mandate: individuell vereinbart, transparent kalkuliert auf Basis dieser Tarife
- Erstgespräch: kostenlos, 45 Minuten, per Video-Call
- Alle Preise exkl. MwSt.

## Häufige Fragen (https://www.rautaki.ch/services#faq)

${faqSection}

## Über uns (https://www.rautaki.ch/about)

Harry Witzthum, Gründer von Rautaki — Doktor der Philosophie und Diplomierter
Verbands- und NPO-Manager VMI. Langjährige Führungsverantwortung in nationalen
Nonprofit-Organisationen, real verantwortete Transformationsprozesse und der
Aufbau agiler Strukturen (einschliesslich Holacracy). Er führt KI nicht als
isoliertes Tool ein, sondern entlang von Entscheidungswegen, Rollen und
Verantwortlichkeiten.

### Workshops mit Organisationen (Auswahl)

${clientsSection}

### Lehrtätigkeit

${teachingSection}

## Lab — kostenlose KI-Tools (https://www.rautaki.ch/lab)

Interaktive Tools, die direkt im Browser laufen — kein Account, kein Server.

- [EU AI Act Compliance Checker](https://www.rautaki.ch/lab/eu-ai-act-check.html): 12 Fragen, sofortige Risikoklassifizierung nach EU AI Act — mit massgeschneiderter Massnahmenliste zum Abhaken und herunterladbarem Bericht.
- [KI-Governance-Richtlinie Generator](https://www.rautaki.ch/lab/ki-governance-policy.html): Vier Formulare, zehn Abschnitte, ein druckfertiges Word-Dokument — mit Deckblatt, nummerierten Klauseln und Unterschriftenblock.
- [Multi-Assistant-System mit Custom GPTs](https://www.rautaki.ch/lab/multi-assistant-gpt.html): Team-Router und zwei Spezialisten-GPTs als orchestriertes System — ohne Code, mit Schritt-für-Schritt-Anleitung und Word-Export.

## Kontakt

- E-Mail: hello@rautaki.ch
- Adresse: Weinbergstrasse 23, 8802 Kilchberg ZH, Schweiz
- UID: CHE-362.050.451 (Schweizer Unternehmens-Identifikationsnummer, ${orgProfiles.uidRegister})
- Wikidata: ${orgProfiles.wikidata}
- Google Business Profile: ${orgProfiles.googleBusiness}
- LinkedIn: ${orgProfiles.linkedIn}
- ResearchGate: ${personProfiles.researchGate}
- Erstgespräch buchen: https://www.rautaki.ch/booking
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
