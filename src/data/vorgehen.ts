// Content for the /vorgehen full-text programme page, taken from the
// KI-Beratung booklet (docs/Rautaki_KI-Beratung_Booklet.pdf). The nine
// steps themselves live in journey.ts; this module holds the framing
// sections. Shared with the llms-full.txt route so machine-readable
// full text and the page never drift apart.

export const vorgehenIntro =
  "Ein strukturiertes Beratungsprogramm, das Ihre Organisation von der ersten Standortbestimmung bis zum sicheren Produktivbetrieb begleitet — drei Phasen, neun Schritte, zwei Entscheidungspunkte, an denen Sie mit voller Kostenkontrolle über das Weitergehen entscheiden.";

// "Vier Ergebnisse, auf die Sie sich verlassen können"
export const vorgehenOutcomes = [
  {
    title: "Klarer Fokus",
    description:
      "Eine fokussierte KI-Strategie mit wenigen, richtigen Prioritäten — statt Aktionismus.",
  },
  {
    title: "Belegter Nutzen",
    description:
      "Ein im echten Arbeitsalltag validierter Anwendungsfall mit messbarem Ergebnis.",
  },
  {
    title: "Befähigtes Team",
    description:
      "Mitarbeitende und interne Champions, die KI sicher und selbstständig nutzen.",
  },
  {
    title: "Sicherer Betrieb",
    description:
      "Ein gesetzeskonformer Regelbetrieb — EU AI Act und Schweizer Datenschutz inklusive.",
  },
];

// "Compliance begleitet jeden Schritt"
export const vorgehenComplianceIntro =
  "Governance ist bei uns kein Nachgedanke, sondern in jede Phase eingebaut — von der ersten Leitplanke bis zum Betriebsmodell.";

export const vorgehenCompliance = [
  {
    label: "EU AI Act",
    description:
      "Risikoklassen, Verbotspraktiken und AI-Kompetenz — von Beginn an mitgedacht.",
  },
  {
    label: "revDSG",
    description:
      "Das revidierte Schweizer Datenschutzgesetz, direkt auf jede KI-Anwendung angewendet.",
  },
  {
    label: "NPO & Öffentlich",
    description:
      "Besondere Erfahrung mit den Anforderungen im NPO-, Sozial- und öffentlichen Sektor.",
  },
];

// "Sie starten klein und entscheiden an jedem Gate"
export const vorgehenCollaboration = [
  {
    label: "Einstieg",
    title: "Standortbestimmung",
    description:
      "Fix bepreist: Reifegrad, Basislinie und priorisierte Use-Cases. Ihr risikoarmer erster Schritt.",
  },
  {
    label: "Kern",
    title: "Validierung",
    description:
      "Ein Flaggschiff-Use-Case bis zum belegten Piloten — der Punkt, an dem Wert messbar wird.",
  },
  {
    label: "Verankerung",
    title: "Skalierung",
    description:
      "Befähigung, Betrieb und Ausrollen — individuell kalkuliert auf Basis Ihrer Ziele.",
  },
];

export const vorgehenCollaborationNote =
  "Transparent kalkuliert: Beratungstag ab CHF 3'500, Halbtag ab CHF 1'800. Sie starten mit der fix bepreisten Standortbestimmung und entscheiden an jedem Entscheidungspunkt neu — volle Kostenkontrolle, keine lange Vorab-Bindung.";
