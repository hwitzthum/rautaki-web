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

## Preise

- Beratungstag: ab CHF 3'500 (inkl. Vor- und Nachbereitung, Unterlagen, dokumentierte Ergebnisse)
- Halbtag: ab CHF 1'800 (inkl. Vorbereitung und Ergebnissicherung)
- Stundenansatz: CHF 280 (punktuelles Sparring, ohne Vor- und Nachbereitung)

## Seiten

- [Startseite](https://www.rautaki.ch)
- [Leistungen](https://www.rautaki.ch/services)
- [Über uns](https://www.rautaki.ch/about): Gründungsgeschichte, Profil Harry Witzthum, Arbeitsweise
- [Lab](https://www.rautaki.ch/lab): Kostenlose KI-Tools und Experimente
- [Erstgespräch buchen](https://www.rautaki.ch/booking)

## Kontakt

- E-Mail: hello@rautaki.ch
- Adresse: Weinbergstrasse 23, 8802 Kilchberg ZH, Schweiz
- UID: CHE-362.050.451 (Schweizer Unternehmens-Identifikationsnummer, https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-362.050.451)
- LinkedIn: https://www.linkedin.com/in/harry-witzthum-25b814a/

## Optional

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
