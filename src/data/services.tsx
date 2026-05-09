export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceData {
  id: string;
  number: string;
  slug: string;
  title: React.ReactNode;
  titlePlain: string;
  shortDesc: string;
  longDesc: string;
  detailHeading: string;
  steps: ServiceStep[];
  forWhom: string;
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
    detailHeading: "Definieren Sie, wo KI Wettbewerbsvorteile schafft",
    steps: [
      {
        title: "KI-Landschaft kartieren",
        body: "Wir analysieren, wo KI Ihre Branche verändert, welche Wettbewerber voranschreiten und wo Ihre Organisation heute steht — damit Entscheide auf Fakten beruhen, nicht auf Annahmen.",
      },
      {
        title: "Strategische Workshops",
        body: "In gezielten Führungsworkshops erarbeiten wir gemeinsam die strategische Richtung — evidenzbasiert, herausfordernd und entscheidungsreif.",
      },
      {
        title: "Klarer Nordstern",
        body: "Das Resultat ist eine dokumentierte KI-Strategie, die Investitionsentscheide, Talentprioritäten und operative Fokussierung dauerhaft prägt.",
      },
    ],
    forWhom:
      "Für Führungsteams, die strategische Klarheit brauchen, bevor sie in KI investieren — und sicherstellen wollen, dass Technologieentscheide auf gesicherter Grundlage stehen.",
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
    detailHeading:
      "Treffen Sie KI-Entscheide mit hoher Tragweite auf gesicherter Grundlage",
    steps: [
      {
        title: "Risikobeurteilung",
        body: "Wir prüfen KI-Modelle, Implementierungspläne und Governance-Strukturen auf Belastbarkeit — bevor folgenreiche Entscheide getroffen werden.",
      },
      {
        title: "C-Level-Sparring",
        body: "Regelmässige Sparring-Sessions mit Geschäftsführung und Verwaltungsrat: externe Perspektive, fundierter Widerspruch, strategische Klarheit unter Druck.",
      },
      {
        title: "Entscheidungsbegleitung",
        body: "Ob Vendor-Auswahl, Build-vs-Buy oder Neuausrichtung von Teams — wir begleiten Führungskräfte dabei, KI-Entscheide zu treffen, die Bestand haben.",
      },
    ],
    forWhom:
      "Für C-Level-Führungskräfte und Verwaltungsräte, die KI-Integration steuern und Entscheide mit hoher Tragweite auf gesicherter Grundlage treffen wollen.",
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
      "Wir begleiten Teams bei der Identifikation echter KI-Anwendungsfälle, der Entwicklung von Prototypen und der Überführung in produktionsreife Lösungen.",
    longDesc:
      "KI-Potenziale zu erkennen ist eine Sache — sie in echten Geschäftsprozessen zu verwirklichen, eine andere. Im KI-Mentoring begleiten wir Ihre Teams Schritt für Schritt: von der Identifikation sinnvoller Anwendungsfälle über die Prototyp-Phase bis hin zur produktionsreifen Lösung. Wir bringen die methodische Klarheit, damit Teams nicht in Pilotprojekten stecken bleiben, sondern KI nachhaltig in den Alltag ihrer Organisation integrieren.",
    detailHeading:
      "Von der Idee zur produktionsreifen KI-Lösung — begleitet durch jeden Schritt",
    steps: [
      {
        title: "Use-Case-Findung",
        body: "Wir helfen Teams, KI-Anwendungsfälle zu identifizieren, die echten Mehrwert schaffen — nicht theoretisch, sondern eingebettet in konkrete Geschäftsprozesse.",
      },
      {
        title: "Prototyp-Begleitung",
        body: "Wir strukturieren die Entwicklung von Prototypen und begleiten methodisch durch die Testphase — damit Ergebnisse entstehen, die als Grundlage für skalierbare Lösungen dienen.",
      },
      {
        title: "Produktionsreife",
        body: "Von der funktionierenden Idee zur robusten KI-Lösung: Wir unterstützen Teams dabei, Anforderungen zu klären, Risiken zu managen und Lösungen sicher in den Produktiveinsatz zu überführen.",
      },
    ],
    forWhom:
      "Für Teams mit dem Mandat, KI umzusetzen — und dem Bedarf an erfahrener Begleitung durch Methodik, Technologie und die Hürden des Produktiveinsatzes.",
    image: "/images/services/growth-activation.webp",
  },
];
