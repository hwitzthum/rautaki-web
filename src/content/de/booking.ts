// /booking page copy: hero, the "auf einen Blick" call facts, the three
// expectations and the calendar note. The Cal.com embed itself is language-
// neutral. Marker strings (*…*) mark inline gold emphasis via <Highlight>.

import type { BookingContent } from "../types";

export const booking = {
  metaTitle: "Gespräch buchen",
  metaDescription:
    "Kostenloses 45-minütiges Erstgespräch mit Harry Witzthum — Prioritäten klären und den nächsten Schritt definieren.",
  heroLabel: "Buchung",
  heroTitle: "Strategiegespräch *vereinbaren*",
  heroDescription:
    "Wählen Sie einen Termin für ein erstes, unverbindliches Strategiegespräch. Kein Verkaufsgespräch — ein offener Austausch über Ihre KI-Ausgangslage und die nächsten sinnvollen Schritte.",
  callFactsHeading: "Auf einen Blick",
  callFacts: [
    { label: "Dauer", value: "45 Minuten" },
    { label: "Format", value: "Video-Call" },
    { label: "Kosten", value: "Kostenlos" },
    { label: "Bestätigung", value: "Per E-Mail" },
  ],
  expectationsLabel: "Was Sie erwartet",
  expectations: [
    {
      number: "01",
      title: "Ausgangslage klären",
      body: "Wir analysieren gemeinsam, wo Ihre Organisation heute steht — und identifizieren, wo KI echten strategischen Mehrwert schaffen kann.",
    },
    {
      number: "02",
      title: "Prioritäten setzen",
      body: "Gemeinsam definieren wir erste strategische Prioritäten: wo KI führen soll, wo Leitplanken nötig sind und was sofort angepackt werden kann.",
    },
    {
      number: "03",
      title: "Nächste Schritte",
      body: "Sie verlassen das Gespräch mit konkreten, umsetzbaren Empfehlungen — kein allgemeines Fazit, sondern ein klarer Weg nach vorne.",
    },
  ],
  calendar: {
    label: "Termin wählen",
    note: "Alle Zeiten werden in Ihrer lokalen Zeitzone angezeigt. Bestätigung erfolgt automatisch per E-Mail.",
  },
  breadcrumbLabel: "Buchung",
} satisfies BookingContent;
