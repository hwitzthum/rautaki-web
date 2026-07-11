// /llms.txt — machine-readable site summary for AI crawlers (GPTBot,
// ClaudeBot, PerplexityBot). Follows the llms.txt convention:
// https://llmstxt.org — Markdown, H1 title, blockquote summary, link lists.
// Static content, so it is served cached (force-static) like robots/sitemap.

import { orgProfiles, personProfiles } from "@/lib/authority";

export const dynamic = "force-static";

const content = `# Rautaki

> Rautaki begleitet Unternehmen und Organisationen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung. Sitz in Kilchberg ZH, Schweiz. Fokus: Führungsteams in NPO, Sozialwesen, öffentlichem Sektor und KMU. Website auf Deutsch (primär) und Englisch (https://www.rautaki.ch/en, siehe «English» unten).

Rautaki (te reo Māori für «Strategie») wurde von Harry Witzthum gegründet —
Doktor der Philosophie, Diplomierter Verbands- und NPO-Manager VMI, langjährige
Führungserfahrung in nationalen Nonprofit-Organisationen und Dozent in
akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.

## Leistungen

- [Strategische Vision](https://www.rautaki.ch/services#strategic-vision): Ausrichtung der Organisation auf eine KI-informierte Strategie
- [Beratung & Sparring](https://www.rautaki.ch/services#advisory-counsel): Begleitung von Führungsteams bei KI-Einführung und organisationalem Wandel
- [KI-Mentoring](https://www.rautaki.ch/services#ki-mentoring): Von der Identifikation von KI-Anwendungsfällen bis zum Produktivbetrieb

## Vorgehen

- [Der Weg zu wirksamer KI](https://www.rautaki.ch/vorgehen): Strukturiertes Beratungsprogramm in drei Phasen und neun Schritten — Standortbestimmung & Fundament, Fokussierung & Validierung, Verankerung & Skalierung — mit zwei Go/No-Go-Entscheidungspunkten (Gates) und voller Kostenkontrolle. Volltext aller neun Schritte auf der Seite
- [KI-Beratungspaket als Booklet (PDF)](https://www.rautaki.ch/downloads/rautaki-ki-beratung-booklet.pdf): Der komplette Ablauf für Geschäftsleitungen und Verwaltungsräte

## Preise

- Beratungstag: ab CHF 3'500 (inkl. Vor- und Nachbereitung, Unterlagen, dokumentierte Ergebnisse)
- Halbtag: ab CHF 1'800 (inkl. Vorbereitung und Ergebnissicherung)
- Stundenansatz: CHF 280 (punktuelles Sparring, ohne Vor- und Nachbereitung)

## Lab — kostenlose KI-Tools

- [EU AI Act Compliance Checker](https://www.rautaki.ch/lab/eu-ai-act-check.html): 12 Fragen, sofortige Risikoklassifizierung nach EU AI Act — mit Massnahmenliste und herunterladbarem Bericht
- [KI-Governance-Richtlinie Generator](https://www.rautaki.ch/lab/ki-governance-policy.html): Vier Formulare, zehn Abschnitte, ein druckfertiges Word-Dokument mit Deckblatt und Unterschriftenblock
- [Multi-Assistant-System mit Custom GPTs](https://www.rautaki.ch/lab/multi-assistant-gpt.html): Schritt-für-Schritt-Anleitung zu einem orchestrierten System aus drei GPTs — ohne Code

## Wissen

<!-- HAND-MAINTAINED: eine Zeile pro Artikel. Beim Hinzufügen eines neuen
     Wissen-Beitrags hier ergänzen (llms-full.txt und Sitemap generieren sich
     dagegen automatisch aus dem Loader). -->

- [EU AI Act: Was gilt für Schweizer NPOs?](https://www.rautaki.ch/wissen/eu-ai-act-schweizer-npos): Ob und wie der EU AI Act Schweizer Nonprofit-Organisationen betrifft — Marktortprinzip, Risikoklassen und die nächsten Schritte

## Seiten

- [Startseite](https://www.rautaki.ch)
- [Leistungen](https://www.rautaki.ch/services)
- [FAQ](https://www.rautaki.ch/services#faq): Häufige Fragen zu Angebot, Preisen, Ablauf und Zielgruppen
- [Vorgehen](https://www.rautaki.ch/vorgehen): Das KI-Beratungspaket im Volltext — alle neun Schritte, Gates, Governance und Zusammenarbeitsmodell
- [Über uns](https://www.rautaki.ch/about): Gründungsgeschichte, Profil Harry Witzthum, Arbeitsweise
- [Lab](https://www.rautaki.ch/lab): Kostenlose KI-Tools und Experimente
- [Wissen](https://www.rautaki.ch/wissen): Fundierte Analysen zu KI-Strategie, Governance und Regulierung
- [Erstgespräch buchen](https://www.rautaki.ch/booking)

## Kontakt

- E-Mail: hello@rautaki.ch
- Adresse: Weinbergstrasse 23, 8802 Kilchberg ZH, Schweiz
- UID: CHE-362.050.451 (Schweizer Unternehmens-Identifikationsnummer, ${orgProfiles.uidRegister})
- Wikidata: ${orgProfiles.wikidata}
- Google Business Profile: ${orgProfiles.googleBusiness}
- LinkedIn: ${orgProfiles.linkedIn}
- ResearchGate: ${personProfiles.researchGate}

## English

Rautaki is a Swiss AI-strategy consultancy for leadership teams — strategic vision, ongoing sparring for executive management and boards, and hands-on AI mentoring from use-case prioritisation to production. Based in Kilchberg ZH, Switzerland; German- and English-speaking.

- [Home](https://www.rautaki.ch/en): AI strategy for decision-makers
- [Services](https://www.rautaki.ch/en/services): Strategic Vision, Consultancy & Sparring, AI Mentoring — with transparent rates (consulting day from CHF 3,500)
- [FAQ](https://www.rautaki.ch/en/services#faq): Frequently asked questions on services, prices, process and audience
- [The path to effective AI](https://www.rautaki.ch/en/vorgehen): The consulting programme in full — three phases, nine steps, two go/no-go gates
- [About us](https://www.rautaki.ch/en/about): Founding story, profile of Harry Witzthum, how we work
- [Lab](https://www.rautaki.ch/en/lab): Free AI tools (the tools themselves are German-only)
- [Insights](https://www.rautaki.ch/en/wissen): Grounded analysis on AI strategy, governance and regulation
- [Book an initial consultation](https://www.rautaki.ch/en/booking): Free, 45 minutes, via video call

## Optional

- [Volltext-Version (llms-full.txt)](https://www.rautaki.ch/llms-full.txt): Alle Kerninhalte der Website als Markdown-Volltext, deutsch und englisch
- [RSS-Feed (Wissen)](https://www.rautaki.ch/feed.xml): Neue Wissen-Beiträge als RSS 2.0
- [Impressum](https://www.rautaki.ch/imprint)
- [Datenschutz](https://www.rautaki.ch/privacy)
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
