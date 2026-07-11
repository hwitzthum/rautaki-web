// /privacy legal copy — Swiss nDSG / EU DSGVO privacy statement. Non-breaking
// spaces ( ) and the soft hyphen (­) in the title are encoded
// explicitly so the extracted strings render byte-for-byte like the entities
// (&nbsp;, &shy;) they replace.

import type { PrivacyContent } from "../types";

export const privacy = {
  metaTitle: "Datenschutz",
  metaDescription:
    "Datenschutzerklärung der Rautaki — Umgang mit personenbezogenen Daten, Cookies, Einwilligungen und Ihren Rechten nach revDSG.",
  heroLabel: "Datenschutz",
  heroTitle: "Datenschutz­erklärung",
  heroDescription:
    "Informationen zum Umgang mit Ihren personenbezogenen Daten gemäss dem Schweizer Datenschutzgesetz (nDSG) und der EU-Datenschutz-Grundverordnung (DSGVO).",
  responsible: {
    label: "Verantwortlich",
    heading: "Verantwortliche Stelle",
    name: "Rautaki",
    addressLines: ["Weinbergstrasse 23", "8802 Kilchberg / ZH", "Schweiz"],
    email: "hello@rautaki.ch",
  },
  collection: {
    label: "Datenerhebung",
    heading: "Welche Daten wir erheben",
    para1:
      "Wenn Sie unser Buchungsformular nutzen, erheben wir die von Ihnen eingegebenen Daten (Name, Unternehmen, E-Mail-Adresse, gewünschter Termin und Nachricht), um Ihre Beratungsanfrage bearbeiten zu können.",
    para2:
      "Beim Besuch unserer Website werden automatisch technische Daten erfasst (z. B. IP-Adresse, Browser-Typ, Zugriffszeit). Diese Daten werden zur Fehlererkennung und Leistungsüberwachung über Sentry verarbeitet.",
  },
  cookies: {
    label: "Cookies & Tracking",
    heading: "Cookies & Tracking",
    para1:
      "Wir nutzen den Dienst Salesflare, um nachzuvollziehen, welche Seiten unserer Website von unseren Kontakten besucht werden. Dazu wird ein Tracking-Cookie gesetzt, das Website-Besuche einem Kontakt zuordnet, sofern dieser zuvor auf einen Link in einer unserer E-Mails geklickt hat.",
    para2a:
      "Dieses Cookie wird ausschliesslich mit Ihrer ausdrücklichen Einwilligung gesetzt. Beim ersten Besuch fragen wir Ihre Zustimmung über einen Hinweis am unteren Seitenrand ab. Sie können Ihre Einwilligung jederzeit über den Link ",
    cookieSettingsLabel: "Cookie-Einstellungen",
    para2b: " im Seitenfuss widerrufen.",
  },
  rights: {
    label: "Ihre Rechte",
    heading: "Ihre Rechte",
    para1a:
      "Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer personenbezogenen Daten. Für Anfragen wenden Sie sich bitte an ",
    email: "hello@rautaki.ch",
    para1b: ".",
  },
  providers: {
    label: "Dienstleister",
    heading: "Weitere Dienstleister",
    subheading: "Weitere Dienstleister",
    items: [
      {
        name: "Cal.com Inc.",
        description:
          " — Terminbuchungssystem (USA; Datenübertragung auf Basis von Standardvertragsklauseln)",
      },
      {
        name: "Vercel Inc.",
        description:
          " — Webhosting und Deployment (USA; Datenübertragung auf Basis von Standardvertragsklauseln)",
      },
      {
        name: "Salesflare BV",
        description: " — CRM sowie Website- und E-Mail-Tracking (Belgien/EU)",
      },
    ],
  },
  contact: {
    label: "Kontakt",
    heading: "Fragen zum Datenschutz",
    para1a: "Bei Fragen zum Datenschutz erreichen Sie uns unter ",
    email: "hello@rautaki.ch",
    para1b: ".",
  },
} satisfies PrivacyContent;
