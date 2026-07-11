// FAQ content for /services — single source for the rendered section and
// the FAQPage JSON-LD schema. Answers are plain text (schema requirement);
// every fact is verified against published site content (pricing table,
// booking page, /about, llms.txt). Derived from docs/faq-draft.md with the
// open [BITTE PRÜFEN] points resolved:
// - KMU: named as audience (llms.txt + /services hero claim it).
// - Region: Switzerland only — every surface asserts areaServed CH; the
//   draft's "Deutschland und Österreich" had no verified source.
// - Institution: ikf is publicly named on /about, so it is safe here.

import type { FaqContent } from "../types";

export const faq = {
  items: [
    {
      question: "Was macht Rautaki?",
      answer:
        "Rautaki begleitet Unternehmen und Organisationen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung. Der Fokus liegt auf Führungsteams: strategische Vision, kontinuierliches Sparring und die Begleitung von Teams bis zum Produktivbetrieb.",
    },
    {
      question: "Für wen ist Rautaki das richtige Angebot?",
      answer:
        "Für Führungsteams, Geschäftsleitungen und Verwaltungsräte, die KI-Entscheide mit hoher Tragweite treffen — insbesondere im NPO-, Sozial- und öffentlichen Sektor sowie in KMU.",
    },
    {
      question: "Was kostet KI-Beratung bei Rautaki?",
      answer:
        "Ein Beratungstag kostet ab CHF 3'500 (inkl. Vor- und Nachbereitung, Unterlagen und dokumentierten Ergebnissen), ein Halbtag ab CHF 1'800. Punktuelles Sparring ist zum Stundenansatz von CHF 280 möglich. Mehrwöchige Programme werden individuell vereinbart, transparent kalkuliert auf Basis dieser Tarife. Das Erstgespräch ist kostenlos. Alle Preise exkl. MwSt.",
    },
    {
      question: "Wie startet die Zusammenarbeit?",
      answer:
        "Mit einem kostenlosen, 45-minütigen Erstgespräch mit Harry Witzthum per Video-Call. Darin klären wir Ausgangslage und Prioritäten und definieren die nächsten sinnvollen Schritte — unverbindlich und ohne Verkaufsdruck.",
      link: { href: "/booking", label: "Erstgespräch buchen" },
    },
    {
      question: "Wie läuft eine KI-Beratung bei Rautaki ab?",
      answer:
        "Die Zusammenarbeit folgt einem strukturierten Programm in drei Phasen und neun Schritten — von der Standortbestimmung über die Validierung im Piloten bis zur Skalierung. An zwei Go/No-Go-Entscheidungspunkten (Gates) entscheiden Sie mit voller Kostenkontrolle über das Weitergehen. Sie starten mit einer fix bepreisten Standortbestimmung — ohne lange Vorab-Bindung.",
      link: { href: "/vorgehen", label: "Der komplette Ablauf im Detail" },
    },
    {
      question: "Arbeitet Rautaki remote oder vor Ort?",
      answer:
        "Beides. Beratungstage und Workshops finden vor Ort oder remote statt — je nachdem, was für Ihre Organisation besser funktioniert. Rautaki hat seinen Sitz in Kilchberg ZH und arbeitet für Organisationen in der Schweiz.",
    },
    {
      question: "Welche Leistungen bietet Rautaki?",
      answer:
        "Drei Kernleistungen: Strategische Vision (Reifegrad, Vision und Leitplanken als board-taugliche Grundlage vor dem ersten Investment), Beratung & Sparring (unabhängiges Sparring für C-Level und Verwaltungsrat bei Risiken, Buy-/Build-Entscheiden und Governance) und KI-Mentoring (Hands-on-Begleitung von Teams von der Use-Case-Priorisierung über den Piloten bis zum Produktivbetrieb).",
    },
    {
      question: "Wer steht hinter Rautaki?",
      answer:
        "Harry Witzthum, Gründer von Rautaki — Doktor der Philosophie und Diplomierter Verbands- und NPO-Manager VMI. Er bringt langjährige Führungserfahrung aus nationalen Nonprofit-Organisationen mit, hat Transformationsprozesse und agile Strukturen (u.a. Holacracy) real verantwortet und unterrichtet als Dozent in akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.",
      link: { href: "/about", label: "Mehr über uns" },
    },
    {
      question: "Bietet Rautaki auch Weiterbildung an?",
      answer:
        "Was wir beraten, lehren wir auch: Harry Witzthum unterrichtet als Dozent in akkreditierten CAS-Programmen am Institut für Kommunikation und Führung ikf — vom CAS Chief AI Officer bis zur KI-Transformation — sowie am Verbandsmanagement Institut der Universität Fribourg. Für Teams bietet das KI-Mentoring eine praxisnahe Befähigung direkt an den eigenen Anwendungsfällen.",
    },
    {
      question: "Was bedeutet «Rautaki»?",
      answer:
        "Rautaki stammt aus te reo Māori und bedeutet «Strategie». Der Name steht für den Kern des Angebots: strategische Klarheit vor Technologie-Aktionismus. In ihm stecken zudem die Buchstaben a und i — die Initialen von Artificial Intelligence.",
    },
  ],
} satisfies FaqContent;
