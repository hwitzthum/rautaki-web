export interface ServiceData {
  id: string;
  number: string;
  slug: string;
  title: React.ReactNode;
  titlePlain: string;
  shortDesc: string;
  longDesc: string;
  image: string;
}

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
      "Wir richten Ihre Organisation auf eine KI-informierte strategische Ausrichtung aus, die Entscheidungen von oben bis unten prägt.",
    longDesc:
      "Wir arbeiten mit Führungsteams zusammen, um eine klare strategische Vision zu definieren, die das transformative Potenzial von KI berücksichtigt. Durch strukturierte Workshops, Stakeholder-Interviews und eine fundierte Analyse, wo KI Ihre Abläufe verändern kann und soll, entwickeln wir einen klaren Nordstern für Investitionsentscheide, Talentprioritäten und operative Fokussierung. Das Resultat ist eine Organisation, die mit Zielklarheit handelt statt nur Aktivität zu erzeugen.",
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
      "Verlässliche Begleitung für Führungsteams, die KI-Einführung, organisationalen Wandel und Entscheide mit hoher Tragweite steuern.",
    longDesc:
      "Unsere Beratungspraxis bietet C-Level-Führungskräften und Verwaltungsräten kontinuierliches strategisches Sparring bei der KI-Integration. Ob Modellrisiken bewertet, Build-vs-Buy-Entscheide für KI-Fähigkeiten getroffen oder Teams für eine KI-unterstützte Zukunft neu ausgerichtet werden: Wir bringen eine externe Perspektive mit fundierter Branchenerfahrung ein. Wir hinterfragen Annahmen, prüfen Pläne auf Belastbarkeit und helfen Führungskräften, Entscheide zu treffen, die Bestand haben.",
    image: "/images/services/advisory-counsel.webp",
  },
  {
    id: "growth-activation",
    number: "03",
    slug: "growth-activation",
    title: (
      <>
        Wachstums <span className="text-gold italic">Aktivierung</span>
      </>
    ),
    titlePlain: "Wachstumsaktivierung",
    shortDesc:
      "Wir überführen KI-Strategie in konkrete Umsetzung mit strukturierten Programmen, die Teams mobilisieren und Ergebnisse beschleunigen.",
    longDesc:
      "Strategie ohne Umsetzung bleibt ein Wunsch. Unser Programm zur Wachstumsaktivierung schliesst die Lücke zwischen KI-Strategie und Performance. Wir gestalten Umsetzungs-Roadmaps, bauen KI-Kompetenz in Teams auf und etablieren die Metriken und Rhythmen, die nachhaltige Dynamik sichern. Von Pilotprojekten bis zu organisationsweiten Rollouts ist das Ziel Selbstständigkeit: Organisationen, die auch ohne uns exzellent umsetzen.",
    image: "/images/services/growth-activation.webp",
  },
];
