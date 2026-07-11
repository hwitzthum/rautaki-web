// Content for the /vorgehen full-text programme page, taken from the
// KI-Beratung booklet (docs/Rautaki_KI-Beratung_Booklet.pdf). The nine
// steps themselves live in journey.ts; this module holds the framing
// sections. Shared with the llms-full.txt route so machine-readable
// full text and the page never drift apart.

import type { VorgehenContent } from "../types";

export const vorgehen = {
  metaTitle: "Vorgehen",
  metaDescription:
    "Drei Phasen, neun Schritte, zwei Entscheidungspunkte — der strukturierte Weg von der Standortbestimmung bis zur Skalierung.",
  intro:
    "Ein strukturiertes Beratungsprogramm, das Ihre Organisation von der ersten Standortbestimmung bis zum sicheren Produktivbetrieb begleitet — drei Phasen, neun Schritte, zwei Entscheidungspunkte, an denen Sie mit voller Kostenkontrolle über das Weitergehen entscheiden.",
  // "Vier Ergebnisse, auf die Sie sich verlassen können"
  outcomes: [
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
  ],
  // "Compliance begleitet jeden Schritt"
  complianceIntro:
    "Governance ist bei uns kein Nachgedanke, sondern in jede Phase eingebaut — von der ersten Leitplanke bis zum Betriebsmodell.",
  compliance: [
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
  ],
  // "Sie starten klein und entscheiden an jedem Gate"
  collaboration: [
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
  ],
  collaborationNote:
    "Transparent kalkuliert: Beratungstag ab CHF 3'500, Halbtag ab CHF 1'800. Sie starten mit der fix bepreisten Standortbestimmung und entscheiden an jedem Entscheidungspunkt neu — volle Kostenkontrolle, keine lange Vorab-Bindung.",
  heroLabel: "KI-Beratungspaket",
  heroTitle: "Der Weg zu *wirksamer KI*",
  outcomesSection: {
    label: "Das haben Sie am Ende",
    heading: "Vier Ergebnisse, auf die Sie sich *verlassen können*",
  },
  complianceSection: {
    label: "Sicherheit & Governance",
    heading: "Compliance begleitet *jeden Schritt*",
  },
  collaborationSection: {
    label: "Transparente Zusammenarbeit",
    heading: "Sie starten klein und entscheiden an *jedem Gate*",
    tariffLinkLabel: "Alle Tarife im Detail",
  },
  cta: {
    heading: "Sprechen wir über *Ihre KI-Strategie*",
    body: "Das Erstgespräch ist kostenlos und unverbindlich. In 45 Minuten klären wir Ihre Prioritäten und den sinnvollsten nächsten Schritt.",
    button: "Erstgespräch vereinbaren",
    bookletLink: "Das vollständige Booklet als PDF →",
  },
  breadcrumbLabel: "Vorgehen",
  resultLabel: "Ihr Ergebnis",
  schema: {
    howToName: "Der Weg zu wirksamer KI — das Rautaki KI-Beratungspaket",
    bookletName: "Rautaki KI-Beratungspaket — Booklet",
    bookletDescription:
      "Der komplette Ablauf des KI-Beratungsprogramms für Geschäftsleitungen und Verwaltungsräte — drei Phasen, neun Schritte, zwei Gates.",
    resultLabel: "Ihr Ergebnis",
  },
} satisfies VorgehenContent;
