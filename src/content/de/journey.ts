// Content for the "Der Weg zu wirksamer KI" timeline on /services and the
// full-text programme page /vorgehen. Mirrors the KI-Beratung booklet
// (docs/Rautaki_KI-Beratung_Booklet.pdf): three phases, nine steps, two
// decision gates. Kept as a flat, ordered list so a single .map() with a
// switch renders phases, steps and gates in the right place on the rail.
// `question` and `activity` carry the booklet's per-step detail; only
// /vorgehen renders them.

import type { JourneyContent } from "../types";

export const journey = {
  items: [
    { kind: "phase", label: "Phase A · Standortbestimmung & Fundament" },
    {
      kind: "step",
      no: "01",
      title: "Reifegrad & Basislinie",
      question: "Wo stehen Sie — und woran messen wir Erfolg?",
      activity:
        "Wir bewerten Ihren KI-Reifegrad und erfassen den Ist-Zustand Ihrer Kernprozesse — Zeit, Kosten und Qualität — bevor irgendetwas verändert wird.",
      outcome:
        "Eine ehrliche Standortbestimmung und eine Messlatte, an der sich späterer Nutzen belegen lässt.",
    },
    {
      kind: "step",
      no: "02",
      title: "Vision, Fokus & Leitplanken",
      question: "Worauf konzentrieren wir uns — und in welchem Rahmen?",
      activity:
        "Wir schärfen Ihre KI-Vision auf drei bis vier Prioritäten und setzen klare Leitplanken für Datenschutz, Verantwortlichkeiten und erlaubte Nutzung.",
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
      question: "Welche Anwendungsfälle lohnen sich wirklich?",
      activity:
        "Wir bewerten Anwendungsfälle nach Wert und Machbarkeit — Daten, Technik und Umsetzbarkeit — und wählen gemeinsam die aussichtsreichsten aus.",
      outcome:
        "Drei bis vier priorisierte Use-Cases mit echtem Wirkungspotenzial statt Spielereien.",
    },
    {
      kind: "step",
      no: "04",
      title: "Buy / Build / Partner",
      question: "Was ist der schnellste sichere Weg zur Lösung?",
      activity:
        "Wir klären, ob eine bewährte Lösung zugekauft, mit einem Partner umgesetzt oder gezielt selbst gebaut wird.",
      outcome:
        "Der richtige Umsetzungsweg — ohne unnötige und teure Eigenentwicklung.",
    },
    {
      kind: "step",
      no: "05",
      title: "Arbeitsablauf neu gestalten",
      question: "Wie sieht die Arbeit mit KI konkret aus?",
      activity:
        "Wir gestalten den konkreten Prozess mit KI neu — mit klaren Rollen und menschlichen Kontrollpunkten — statt ein Tool nur danebenzustellen.",
      outcome:
        "Ein durchdachter Arbeitsablauf, den Ihr Team versteht und mitträgt.",
    },
    {
      kind: "step",
      no: "06",
      title: "Pilot mit Wirkungsmessung",
      question: "Funktioniert es — und was bringt es?",
      activity:
        "Wir setzen einen Piloten im echten Arbeitsalltag auf und messen den Nutzen gegen die Basislinie aus Schritt 01.",
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
      question: "Wie wird KI zur Routine im Team?",
      activity:
        "Wir schulen Ihr Team, bilden interne Champions aus und verankern die Nutzung im Alltag — auf Wunsch bis zum akkreditierten Zertifikat.",
      outcome:
        "Ein Team, das KI selbstständig und sicher nutzt — Wissen bleibt im Haus.",
    },
    {
      kind: "step",
      no: "08",
      title: "Betriebsmodell & Übergabe",
      question: "Wer betreibt die Lösung dauerhaft?",
      activity:
        "Wir definieren Verantwortlichkeiten, Qualitätssicherung und den laufenden Betrieb — inklusive klarer Zuständigkeit für die Weiterentwicklung.",
      outcome:
        "Ein stabiler Regelbetrieb mit klaren Zuständigkeiten — nichts bleibt hängen.",
    },
    {
      kind: "step",
      no: "09",
      title: "Skalierung",
      question: "Wie wird aus einem Erfolg viele?",
      activity:
        "Wir rollen die bewährte Lösung auf weitere Teams und Prozesse aus — jeder neue Anwendungsfall durchläuft dieselbe geprüfte Logik.",
      outcome: "KI wird zur wiederholbaren organisationalen Fähigkeit.",
    },
  ],
} satisfies JourneyContent;
