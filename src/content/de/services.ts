// The three services describe WHAT we offer (the entry formats). The single
// "Der Weg zu wirksamer KI" timeline on /services owns HOW a mandate runs.
// Copy here deliberately mirrors the booklet vocabulary (Reifegrad, Leitplanken,
// Gate, Use-Cases, Wirkungsnachweis, Skalierung) so both read as one system —
// and each service maps to the part of the journey it primarily serves.
// Inline emphasis in `title` uses *markers* rendered via <Highlight> — the
// service titles keep the "text-gold italic" class order (see ServicesPage).

import type { ServicesContent } from "../types";

export const services = {
  metaTitle: "Leistungen",
  metaDescription:
    "KI-Strategie, Implementierung und Führungskräfteentwicklung — massgeschneidert für Entscheider in der Schweiz.",
  items: [
    {
      id: "strategic-vision",
      number: "01",
      slug: "strategic-vision",
      title: "Strategische *Vision*",
      shortDesc:
        "Reifegrad, Vision und Leitplanken — die board-taugliche Grundlage, bevor in KI investiert wird.",
      longDesc:
        "Wir bestimmen Ihren KI-Reifegrad, schärfen Vision und Fokus auf wenige richtige Prioritäten und setzen klare Leitplanken für Datenschutz und Verantwortlichkeiten. So entsteht eine board-taugliche KI-Strategie — und ein gemeinsamer Go/No-Go-Entscheid mit voller Kostenkontrolle, bevor in die Umsetzung investiert wird.",
      detailHeading:
        "Klarheit über Standort, Fokus und Leitplanken — vor dem ersten Investment",
      forWhom:
        "Für Führungsteams, die strategische Klarheit brauchen, bevor sie in KI investieren.",
      image: "/images/services/strategic-vision.webp",
    },
    {
      id: "advisory-counsel",
      number: "02",
      slug: "advisory-counsel",
      title: "*Beratung* & Sparring",
      shortDesc:
        "Unabhängiges Sparring für C-Level und Verwaltungsrat — bei Risiken, Buy-/Build-Entscheiden und den Go/No-Go-Punkten.",
      longDesc:
        "C-Level und Verwaltungsrat erhalten kontinuierliches, unabhängiges Sparring: Wir bewerten Modell- und Umsetzungsrisiken, begleiten Buy-, Build- und Partner-Entscheide und sichern die Entscheidungspunkte des Wegs ab. Eine externe Perspektive mit fundierter Branchenerfahrung, die Annahmen hinterfragt und Entscheide belastbar macht.",
      detailHeading:
        "KI-Entscheide mit hoher Tragweite — auf gesicherter Grundlage",
      forWhom:
        "Für C-Level-Führungskräfte und Verwaltungsräte, die KI-Integration steuern und tragweite Entscheide absichern wollen.",
      image: "/images/services/advisory-counsel.webp",
    },
    {
      id: "ki-mentoring",
      number: "03",
      slug: "ki-mentoring",
      title: "KI-*Mentoring*",
      shortDesc:
        "Hands-on-Umsetzung mit Ihren Teams — von priorisierten Use-Cases über den belegten Piloten bis zur Skalierung.",
      longDesc:
        "Wir priorisieren gemeinsam die aussichtsreichsten Use-Cases, setzen einen Piloten mit echtem Wirkungsnachweis auf und befähigen Ihr Team, KI selbstständig und sicher zu nutzen. Statt in Pilotprojekten steckenzubleiben, verankern wir KI als wiederholbare Fähigkeit — Schritt für Schritt entlang des Wegs zu wirksamer KI.",
      detailHeading:
        "Hands-on von der Priorisierung bis in den sicheren Betrieb — mit Ihrem Team",
      forWhom:
        "Für Teams mit dem Mandat, KI umzusetzen — und dem Bedarf an erfahrener, methodischer Begleitung bis in den Produktivbetrieb.",
      image: "/images/services/growth-activation.webp",
    },
  ],
  heroLabel: "Unsere Leistungen",
  heroTitle: "Strategie, Beratung und Umsetzung für das *KI-Zeitalter*",
  heroDescription:
    "Drei Leistungsbereiche, die Führungsteams dabei unterstützen, Richtung zu setzen, Risiken zu steuern und KI-Initiativen von der Idee zur organisationalen Fähigkeit zu entwickeln. Mit transparenten Tarifen, der Option auf akkreditierte Weiterbildung — und besonderer Erfahrung im NPO-, Sozial- und öffentlichen Sektor.",
  overview: {
    label: "Was wir tun",
    heading: "Drei Leistungsbereiche für Ihre *KI-Strategie*",
  },
  serviceBridgeNote:
    "Teil eines strukturierten Wegs — von der Standortbestimmung bis zum sicheren Betrieb.",
  serviceBridgeLink: "Der Weg zu wirksamer KI →",
  journeySection: {
    label: "Unser Vorgehen",
    heading: "Der Weg zu *wirksamer KI*",
    intro:
      "Ob strategische Standortbestimmung, laufendes Sparring oder Hands-on-Umsetzung — die Zusammenarbeit folgt einem klaren Weg von der ersten Standortbestimmung bis zum sicheren Produktivbetrieb. Drei Phasen, neun Schritte, zwei Entscheidungspunkte, an denen Sie mit voller Kostenkontrolle über das Weitergehen entscheiden.",
    resultLabel: "Ihr Ergebnis",
    detailLink: "Der komplette Ablauf im Detail →",
    bookletLink: "Das vollständige Booklet als PDF",
    audience: "Für Geschäftsleitungen & Verwaltungsräte",
  },
  pricing: {
    label: "Preise",
    heading: "Klare Leistung, *klare Preise*",
    intro:
      "Die meisten Beratungsangebote nennen Preise erst auf Anfrage. Wir legen unsere Tarife offen — damit Sie planen können, bevor Sie mit uns sprechen.",
    items: [
      {
        format: "Beratungstag",
        price: "ab CHF 3'500",
        description:
          "Ganztägige Zusammenarbeit vor Ort oder remote — inklusive Vor- und Nachbereitung, Unterlagen und dokumentierten Ergebnissen.",
      },
      {
        format: "Halbtag",
        price: "ab CHF 1'800",
        description:
          "Kompaktes Format für fokussierte Fragestellungen — inklusive Vorbereitung und Ergebnissicherung.",
      },
      {
        format: "Stundenansatz",
        price: "CHF 280",
        description:
          "Punktuelles Sparring und kurzfristige Einordnung — ohne Vor- und Nachbereitung.",
      },
    ],
    note: "Mehrwöchige Programme und Mandate — etwa eine KI-Strategie-Entwicklung oder eine Mentoring-Begleitung — vereinbaren wir individuell mit Ihnen, transparent kalkuliert auf Basis dieser Tarife. Das Erstgespräch ist kostenlos und unverbindlich. Alle Preise exkl. MwSt.",
  },
  education: {
    label: "Weiterbildung",
    heading: "Vom Sparring zum *Zertifikat*",
    body: "Was wir beraten, lehren wir auch: Harry Witzthum unterrichtet als Dozent in akkreditierten CAS-Programmen am Institut für Kommunikation und Führung ikf — vom Chief AI Officer bis zur KI-Transformation. Wenn Ihr Team über die Beratung hinaus KI-Kompetenz mit Zertifikat aufbauen will, ist der Weg dahin kurz.",
    link: "Zur Lehrtätigkeit →",
  },
  faqSection: {
    label: "FAQ",
    heading: "Häufige Fragen — *kurz beantwortet*",
  },
  cta: {
    heading: "Bereit, Ihre KI-Strategie aufzubauen?",
    body: "Wir können Ihre strategische Ausgangslage rasch bewerten und einen praxisnahen Weg zu messbarem Wert definieren.",
    button: "Erstgespräch vereinbaren",
  },
  breadcrumbLabel: "Leistungen",
  schema: {
    offerCatalogName: "Zusammenarbeitsformate",
    offers: [
      {
        name: "Beratungstag",
        description:
          "Ganztägige Zusammenarbeit vor Ort oder remote — inklusive Vor- und Nachbereitung, Unterlagen und dokumentierten Ergebnissen.",
      },
      {
        name: "Halbtag",
        description:
          "Kompaktes Format für fokussierte Fragestellungen — inklusive Vorbereitung und Ergebnissicherung.",
      },
      {
        name: "Stundenansatz",
        description:
          "Punktuelles Sparring und kurzfristige Einordnung — ohne Vor- und Nachbereitung.",
      },
    ],
    hourlyUnitText: "Stunde",
    howToName: "Der Weg zu wirksamer KI — das Rautaki KI-Beratungspaket",
    howToDescription:
      "Ein strukturiertes Beratungsprogramm in drei Phasen und neun Schritten — von der Standortbestimmung bis zum sicheren Produktivbetrieb.",
    areaServedName: "Switzerland",
    serviceType: "AI Consulting",
  },
} satisfies ServicesContent;
