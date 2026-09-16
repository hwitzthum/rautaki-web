// /llms.txt — machine-readable site summary for AI crawlers (GPTBot,
// ClaudeBot, PerplexityBot). Follows the llms.txt convention:
// https://llmstxt.org — Markdown, H1 title, blockquote summary, link lists.
// Static content, so it is served cached (force-static) like robots/sitemap.
//
// HAND-MAINTAINED: the «## Wissen» section needs one line per article —
// extend it when a new Wissen article ships (llms-full.txt and the sitemap
// generate themselves from the article loader; this file does not).

import { orgProfiles, personProfiles } from "@/lib/authority";

export const dynamic = "force-static";

const content = `# Rautaki

> Rautaki ist eine Schweizer KI-Strategieberatung für Verwaltungsräte und Geschäftsleitungen, mit Schwerpunkt NPO, Sozialwesen und öffentlicher Sektor — von der Standortbestimmung bis zur Umsetzung. Sitz in Kilchberg ZH, Schweiz. Website auf Deutsch (primär) und Englisch (https://www.rautaki.ch/en, siehe «English» unten).

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

## Apps — KI-Apps zum Ausprobieren

- [apps.rautaki.ch](https://apps.rautaki.ch): KI im Arbeitsalltag — ausprobieren statt darüber lesen. Jede App erledigt eine konkrete Aufgabe aus dem Alltag von Organisationen, Verwaltungen, Schulen und KMU — mit eigenem Text, direkt im Browser, ohne Anmeldung. Die Apps sind auf Deutsch. Jede App lässt sich als Vorlage mitnehmen: Unter dem Ergebnis steht «Vorlage herunterladen», eine Datei im offenen Standard Agent Skills (SKILL.md, CC BY 4.0) für das eigene Claude oder ChatGPT; dort gelten Datenschutz und Kosten des eigenen Abos
- [Antwort-Assistent](https://apps.rautaki.ch/antwort-assistent): Eine eingehende Nachricht rein — heraus kommen das Anliegen in einem Satz, die fehlenden Angaben und ein Antwortentwurf
- [Dokumenten-Chat mit Quellen](https://apps.rautaki.ch/dokumenten-chat): Eine Frage zu vorliegenden Dokumenten rein — heraus kommt eine Antwort mit Dokumentname und Seitenzahl, oder der offene Hinweis, dass es dazu keinen Beleg gibt
- [Verständlich machen](https://apps.rautaki.ch/verstaendlich-machen): Ein deutscher Text rein — heraus kommt eine Fassung in Einfacher oder Leichter Sprache, neben dem Original, mit Lesbarkeitswert vorher und nachher und einer Liste dessen, was weggelassen wurde
- [Kommunikation aus einem Anlass](https://apps.rautaki.ch/kommunikation): Ein Anlass rein — heraus kommen ein LinkedIn-Beitrag, ein Newsletter-Absatz und eine Website-Meldung, jede kopierbar. Fehlende Angaben stehen als markierte Platzhalter da
- [Entwurf-Check](https://apps.rautaki.ch/entwurf-check): Ein Entwurf und die Anforderungen rein — heraus kommt je Kriterium ein Status mit Begründung, dazu die Lücken, nicht belegte Aussagen und Vorschläge für die schwachen Stellen
- [KI-Potenzial-Radar](https://apps.rautaki.ch/ki-radar): Acht Fragen zur Organisation — heraus kommen drei priorisierte Anwendungsfälle mit geschätzter Zeitersparnis, Aufwand, Risiko und dem, was es in der Organisation braucht, auf der Seite und als einseitige PDF
- [EU AI Act Compliance Checker](https://www.rautaki.ch/lab/eu-ai-act-check.html): Kostenloses Werkzeug auf www.rautaki.ch — 12 Fragen, sofortige Risikoklassifizierung nach EU AI Act, mit Massnahmenliste und herunterladbarem Bericht; Begleitwerkzeug zum Artikel «EU AI Act: Was gilt für Schweizer NPOs?»

## Wissen

- [EU AI Act: Was gilt für Schweizer NPOs?](https://www.rautaki.ch/wissen/eu-ai-act-schweizer-npos): Ob und wie der EU AI Act Schweizer Nonprofit-Organisationen betrifft — Marktortprinzip, Risikoklassen und die nächsten Schritte
- [KI-Kompetenz im Verwaltungsrat: sieben Fragen, die zählen](https://www.rautaki.ch/wissen/ki-strategie-verwaltungsrat): Warum KI zur Oberleitung gehört (Art. 716a OR), welche KI-Kompetenz das Gremium selbst braucht, und die sieben Fragen, die ein Verwaltungs- oder Stiftungsrat der Geschäftsleitung stellen sollte
- [Der Weg zu wirksamer KI: die Methode hinter dem Rautaki-Beratungsprogramm](https://www.rautaki.ch/wissen/der-weg-zu-wirksamer-ki): Die fünf Designprinzipien hinter dem Programm mit drei Phasen, neun Schritten und zwei Kostenkontroll-Gates
- [KI-Reifegrad in Schweizer NPOs: Was die Studien zeigen — und was nicht](https://www.rautaki.ch/wissen/ki-reifegrad-schweizer-npos): Synthese der verfügbaren Studien — hohe individuelle Nutzung, strategisches Vakuum, und warum es keine Schweizer NPO-Zahl gibt
- [KI-Tools und Datenschutz (nDSG) in Vereinen und Stiftungen](https://www.rautaki.ch/wissen/ki-tools-datenschutz-vereine-stiftungen): Was das Datenschutzgesetz für ChatGPT, Copilot & Co. verlangt — Verantwortung des Vorstands, private Konten, besonders schützenswerte Daten, USA-Transfers und eine Checkliste

## Seiten

- [Startseite](https://www.rautaki.ch)
- [Leistungen](https://www.rautaki.ch/services)
- [FAQ](https://www.rautaki.ch/services#faq): Häufige Fragen zu Angebot, Preisen, Ablauf und Zielgruppen
- [Vorgehen](https://www.rautaki.ch/vorgehen): Das KI-Beratungspaket im Volltext — alle neun Schritte, Gates, Governance und Zusammenarbeitsmodell
- [Über uns](https://www.rautaki.ch/about): Gründungsgeschichte, Profil Harry Witzthum, Arbeitsweise
- [Apps](https://apps.rautaki.ch): KI-Apps zum Ausprobieren — eigene Seite, siehe Abschnitt «Apps»
- [Wissen](https://www.rautaki.ch/wissen): Fundierte Analysen zu KI-Strategie, Governance und Regulierung
- [Erstgespräch buchen](https://www.rautaki.ch/booking)

## Kontakt

- E-Mail: hello@rautaki.ch
- Adresse: Weinbergstrasse 23, 8802 Kilchberg ZH, Schweiz
- UID: CHE-362.050.451 (Schweizer Unternehmens-Identifikationsnummer, ${orgProfiles.uidRegister})
- Google Business Profile: ${orgProfiles.googleBusiness}
- LinkedIn: ${orgProfiles.linkedIn}
- ResearchGate: ${personProfiles.researchGate}

## English

Rautaki is a Swiss AI strategy consultancy for boards and senior management, with a focus on non-profits, the social sector and the public sector — strategic vision, ongoing sparring and hands-on AI mentoring from use-case prioritisation to production. Based in Kilchberg ZH, Switzerland; German- and English-speaking.

- [Home](https://www.rautaki.ch/en): AI strategy for Swiss non-profits and boards
- [Services](https://www.rautaki.ch/en/services): Strategic Vision, Consultancy & Sparring, AI Mentoring — with transparent rates (consulting day from CHF 3,500)
- [FAQ](https://www.rautaki.ch/en/services#faq): Frequently asked questions on services, prices, process and audience
- [The path to effective AI](https://www.rautaki.ch/en/vorgehen): The consulting programme in full — three phases, nine steps, two go/no-go gates
- [About us](https://www.rautaki.ch/en/about): Founding story, profile of Harry Witzthum, how we work
- [Apps](https://apps.rautaki.ch/en): AI apps to try out in the browser — no sign-up; English overview, the apps themselves work in German; each app can be taken along as a template (Agent Skill, SKILL.md, CC BY 4.0) for your own Claude or ChatGPT
- [EU AI Act Compliance Checker](https://www.rautaki.ch/lab/eu-ai-act-check.html): Free tool, 12 questions, instant risk classification under the EU AI Act (German-only)
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
