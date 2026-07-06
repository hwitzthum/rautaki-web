// Content for the "Der Weg zu wirksamer KI" timeline on /services.
// Mirrors the KI-Beratung booklet (docs/Rautaki_KI-Beratung_Booklet.pdf):
// three phases, nine steps, two decision gates. Kept as a flat, ordered
// list so a single .map() with a switch renders phases, steps and gates
// in the right place on the rail.

export type JourneyItem =
  | { kind: "phase"; label: string }
  | { kind: "step"; no: string; title: string; outcome: string }
  | { kind: "gate"; label: string; note: string };

export const journey: JourneyItem[] = [
  { kind: "phase", label: "Phase A · Standortbestimmung & Fundament" },
  {
    kind: "step",
    no: "01",
    title: "Reifegrad & Basislinie",
    outcome:
      "Eine ehrliche Standortbestimmung und eine Messlatte, an der sich späterer Nutzen belegen lässt.",
  },
  {
    kind: "step",
    no: "02",
    title: "Vision, Fokus & Leitplanken",
    outcome:
      "Eine board-taugliche KI-Strategie mit Fokus und sicheren Leitplanken.",
  },
  {
    kind: "gate",
    label: "Gate 1 — Go / No-Go",
    note: "Gemeinsamer Entscheid mit voller Kostenkontrolle, bevor in die Umsetzung investiert wird.",
  },

  { kind: "phase", label: "Phase B · Fokussierung & Validierung" },
  {
    kind: "step",
    no: "03",
    title: "Use-Cases priorisieren",
    outcome:
      "Drei bis vier priorisierte Use-Cases mit echtem Wirkungspotenzial statt Spielereien.",
  },
  {
    kind: "step",
    no: "04",
    title: "Buy / Build / Partner",
    outcome:
      "Der richtige Umsetzungsweg — ohne unnötige und teure Eigenentwicklung.",
  },
  {
    kind: "step",
    no: "05",
    title: "Arbeitsablauf neu gestalten",
    outcome:
      "Ein durchdachter Arbeitsablauf, den Ihr Team versteht und mitträgt.",
  },
  {
    kind: "step",
    no: "06",
    title: "Pilot mit Wirkungsmessung",
    outcome:
      "Ein belegter Wirkungsnachweis — schwarz auf weiss, was KI Ihnen bringt.",
  },
  {
    kind: "gate",
    label: "Gate 2 — Wirkung nachgewiesen?",
    note: "Erst wenn der Nutzen im Piloten belegt ist, gehen wir in die Skalierung.",
  },

  { kind: "phase", label: "Phase C · Verankerung & Skalierung" },
  {
    kind: "step",
    no: "07",
    title: "Befähigung & Change",
    outcome:
      "Ein Team, das KI selbstständig und sicher nutzt — Wissen bleibt im Haus.",
  },
  {
    kind: "step",
    no: "08",
    title: "Betriebsmodell & Übergabe",
    outcome:
      "Ein stabiler Regelbetrieb mit klaren Zuständigkeiten — nichts bleibt hängen.",
  },
  {
    kind: "step",
    no: "09",
    title: "Skalierung",
    outcome: "KI wird zur wiederholbaren organisationalen Fähigkeit.",
  },
];
