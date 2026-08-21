// Home page copy: the dark hero (rendered via HeroDark), the reference strip,
// the problem/stats section, the "why Rautaki" differentiators and the closing
// CTA. Marker strings (*…*) mark inline gold emphasis rendered via <Highlight>.

import type { HomeContent } from "../types";

export const home = {
  metaTitle: "Rautaki — KI-Strategie für Entscheider",
  metaDescription:
    "Rautaki begleitet Unternehmen bei der strategischen KI-Einführung — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
  heroDark: {
    headlineLines: ["Strategie", "im *KI-Zeitalter*", "mit Wirkung."],
    intro:
      "Wir verbinden strategische Beratung für Geschäftsleitungen und Verwaltungsräte mit akkreditierter Weiterbildung — von der Standortbestimmung bis zur produktionsreifen Lösung. Mit besonderer Erfahrung im NPO-, Sozial- und öffentlichen Sektor.",
    ctaTitle: "Entwickeln Sie eine belastbare KI-Strategie",
    ctaBody:
      "Im Erstgespräch klären wir Prioritäten, Governance-Entscheide und die Führungskompetenzen für Ihre nächste Phase.",
    ctaButton: "Erstgespräch vereinbaren",
  },
  stats: [
    {
      value: 88,
      suffix: "%",
      label:
        "der Unternehmen setzen KI regelmässig in mindestens einer Funktion ein",
      source: "McKinsey State of AI, 2025",
    },
    {
      value: 66,
      suffix: "%",
      label:
        "der Organisationen haben KI noch nicht über die Pilotphase hinaus skaliert",
      source: "McKinsey State of AI, 2025",
    },
    {
      value: 2,
      suffix: "×",
      label:
        "schnelleres Umsatzwachstum für KI-Vorreiter gegenüber Nachzüglern",
      source: "BCG The Widening AI Value Gap, 2025",
    },
  ],
  credentialsLabel:
    "Vertraut von Organisationen im NPO-, Sozial- und öffentlichen Sektor — und darüber hinaus",
  credentials: [
    "Age Stiftung",
    "Hepatitis Schweiz",
    "Universität Zürich",
    "Institut für Kommunikation und Führung ikf",
    "VMI Universität Fribourg",
    "SPAS",
    "Astara Switzerland",
    "Glaux Group",
  ],
  problem: {
    label: "KI-Wirkung",
    heading: "Das Potenzial ist real. Die Lücke zur *Wirkung* auch.",
    body: "78 Prozent der Unternehmen setzen KI bereits ein — doch 95 Prozent der Pilotprojekte erreichen nie den Produktivbetrieb. Diese Lücke zwischen Aktivität und Wirkung ist die strategische Herausforderung unserer Zeit.",
  },
  serviceCards: {
    label: "Leistungen",
    heading: "Unsere *Leistungen*",
    cta: "Unsere Leistungen entdecken",
  },
  why: {
    label: "Warum Rautaki",
    heading: "Beratung und Weiterbildung — in *einer Hand*",
    items: [
      {
        title: "Vom Sparring bis zum Zertifikat",
        body: "Wir beraten Führungsgremien individuell — und lehren dasselbe Wissen in akkreditierten CAS-Programmen am Institut für Kommunikation und Führung ikf. Diese Kombination bietet in der Schweiz kaum ein anderer Anbieter.",
      },
      {
        title: "Akademisch fundiert, hands-on bis Produktivbetrieb",
        body: "Evidenz statt Bauchgefühl — und Begleitung, die nicht beim Konzept endet, sondern erst beim messbaren Ergebnis.",
      },
      {
        title: "Zuhause, wo Wirkung zählt",
        body: "NPO, Verbände, Sozial- und öffentlicher Sektor: Wir kennen Organisationen, in denen jeder Franken doppelt begründet sein muss — und KI trotzdem wirken soll.",
      },
    ],
  },
  cta: {
    label: "Nächster Schritt",
    heading: "Ist Ihre Organisation bereit für KI?",
    body: "Wir unterstützen Führungsteams dabei, festzulegen, wo KI führen soll, wo Leitplanken essenziell sind und wie Sie von Ambition zu sicherer Umsetzung gelangen.",
    button: "Erstgespräch vereinbaren",
    pricePrefix: "Transparente Tarife: Beratungstag ab CHF 3'500 — ",
    priceLinkLabel: "alle Preise unter Leistungen",
    priceSuffix: ".",
  },
} satisfies HomeContent;
