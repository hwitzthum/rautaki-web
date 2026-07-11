// /imprint legal copy — Swiss Obligationenrecht / UWG imprint details.

import type { ImprintContent } from "../types";

export const imprint = {
  metaTitle: "Impressum",
  metaDescription:
    "Impressum der Rautaki, Kilchberg ZH — Angaben gemäss Schweizer Obligationenrecht, Kontakt und Unternehmens-Identifikation.",
  heroLabel: "Impressum",
  heroTitle: "Impressum",
  heroDescription:
    "Angaben gemäss Art. 3 des Bundesgesetzes gegen den unlauteren Wettbewerb (UWG) und Art. 5 des E-Commerce-Gesetzes.",
  company: {
    label: "Unternehmen",
    heading: "Angaben zum Unternehmen",
    name: "Rautaki",
    addressLines: ["Weinbergstrasse 23", "8802 Kilchberg / ZH", "Schweiz"],
    legalFormLabel: "Rechtsform:",
    legalFormValue: "Einzelunternehmen",
    uidLabel: "UID:",
    uidValue: "CHE-362.050.451",
  },
  contact: {
    label: "Kontakt",
    heading: "Kontaktinformationen",
    emailPrefix: "E-Mail: ",
    email: "hello@rautaki.ch",
  },
  representation: {
    label: "Vertretung",
    heading: "Vertretungsberechtigte Person",
    person: "Harry Witzthum, Inhaber",
  },
  liability: {
    label: "Haftung",
    heading: "Haftungsausschluss",
    para1:
      "Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte übernehmen wir jedoch keine Gewähr.",
    para2:
      "Für die Inhalte externer Links übernehmen wir keine Haftung. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.",
  },
} satisfies ImprintContent;
