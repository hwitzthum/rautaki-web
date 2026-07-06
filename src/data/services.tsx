export interface ServiceData {
  id: string;
  number: string;
  slug: string;
  title: React.ReactNode;
  titlePlain: string;
  shortDesc: string;
  longDesc: string;
  detailHeading: string;
  forWhom: string;
  image: string;
}

// The three services describe WHAT we offer (the entry formats). The single
// "Der Weg zu wirksamer KI" timeline on /services owns HOW a mandate runs.
// Copy here deliberately mirrors the booklet vocabulary (Reifegrad, Leitplanken,
// Gate, Use-Cases, Wirkungsnachweis, Skalierung) so both read as one system —
// and each service maps to the part of the journey it primarily serves.
export const services: ServiceData[] = [
  {
    id: "strategic-vision",
    number: "01",
    slug: "strategic-vision",
    title: (
      <>
        Strategische <span className="text-gold italic">Vision</span>
      </>
    ),
    titlePlain: "Strategische Vision",
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
    title: (
      <>
        <span className="text-gold italic">Beratung</span> & Sparring
      </>
    ),
    titlePlain: "Beratung & Sparring",
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
    title: (
      <>
        KI-<span className="text-gold italic">Mentoring</span>
      </>
    ),
    titlePlain: "KI-Mentoring",
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
];
