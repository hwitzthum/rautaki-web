// /llms.txt — machine-readable site summary for AI crawlers (GPTBot,
// ClaudeBot, PerplexityBot). Follows the llms.txt convention:
// https://llmstxt.org — Markdown, H1 title, blockquote summary, link lists.
// Static content, so it is served cached (force-static) like robots/sitemap.

export const dynamic = "force-static";

const content = `# Rautaki

> Rautaki begleitet Unternehmen und Organisationen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung. Sitz in Kilchberg ZH, Schweiz. Fokus: Führungsteams in NPO, Sozialwesen, öffentlichem Sektor und KMU.

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

## Seiten

- [Startseite](https://www.rautaki.ch)
- [Leistungen](https://www.rautaki.ch/services)
- [FAQ](https://www.rautaki.ch/services#faq): Häufige Fragen zu Angebot, Preisen, Ablauf und Zielgruppen
- [Vorgehen](https://www.rautaki.ch/vorgehen): Das KI-Beratungspaket im Volltext — alle neun Schritte, Gates, Governance und Zusammenarbeitsmodell
- [Über uns](https://www.rautaki.ch/about): Gründungsgeschichte, Profil Harry Witzthum, Arbeitsweise
- [Lab](https://www.rautaki.ch/lab): Kostenlose KI-Tools und Experimente
- [Erstgespräch buchen](https://www.rautaki.ch/booking)

## Kontakt

- E-Mail: hello@rautaki.ch
- Adresse: Weinbergstrasse 23, 8802 Kilchberg ZH, Schweiz
- UID: CHE-362.050.451 (Schweizer Unternehmens-Identifikationsnummer, https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-362.050.451)
- LinkedIn: https://www.linkedin.com/in/harry-witzthum-25b814a/
- ResearchGate: https://www.researchgate.net/profile/Harry-Witzthum

## Optional

- [Volltext-Version (llms-full.txt)](https://www.rautaki.ch/llms-full.txt): Alle Kerninhalte der Website als Markdown-Volltext
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
