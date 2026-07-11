// Shared chrome copy: navigation, footer, the Cal modal, the chat widget shell,
// the consent banner, the cookie-settings link, and the error / not-found /
// maintenance screens. Consumed by the (client) chrome components directly and
// by the app-level error/not-found/maintenance routes.

import type { CommonContent } from "../types";

export const common = {
  skipLink: "Zum Inhalt springen",
  graph: {
    orgDescription:
      "Rautaki begleitet Unternehmen bei der strategischen KI-Einführung — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
    personJobTitle: "Gründer & Berater für KI-Strategie",
    personDescription:
      "Gründer von Rautaki. Doktor der Philosophie und Diplomierter Verbands- und NPO-Manager VMI. Langjährige Führungserfahrung in nationalen Nonprofit-Organisationen; Dozent in akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.",
    credentials: [
      {
        category: "Doktorat",
        name: "Doktor der Philosophie (PhD)",
      },
      {
        category: "Diplom",
        name: "Diplomierter Verbands- und NPO-Manager VMI",
      },
    ],
    websiteInLanguage: "de-CH",
  },
  nav: {
    aria: "Hauptnavigation",
    items: [
      { href: "/", label: "Start" },
      { href: "/services", label: "Leistungen" },
      { href: "/lab", label: "Lab" },
      { href: "/about", label: "Über uns" },
      { href: "/booking", label: "Buchung" },
    ],
  },
  mobileNav: {
    aria: "Mobile Navigation",
    openLabel: "Menü öffnen",
    closeLabel: "Menü schliessen",
  },
  footer: {
    tagline:
      "Wir helfen Führungsteams, KI-Ambition in messbare Wirkung zu verwandeln.",
    navHeading: "Navigation",
    navLinks: [
      { href: "/services", label: "Leistungen" },
      { href: "/vorgehen", label: "Vorgehen" },
      { href: "/lab", label: "Lab" },
      { href: "/about", label: "Über uns" },
      { href: "/booking", label: "Buchung" },
    ],
    contactHeading: "Kontakt",
    email: "hello@rautaki.ch",
    addressLines: ["Rautaki", "Weinbergstrasse 23", "8802 Kilchberg / ZH"],
    linkedInLabel: "LinkedIn",
    copyright: "Rautaki. Alle Rechte vorbehalten.",
    privacyLabel: "Datenschutz",
    imprintLabel: "Impressum",
    cookieSettingsLabel: "Cookie-Einstellungen",
  },
  calModal: {
    dialogAria: "Beratungsgespräch buchen",
    callFacts: [
      { label: "Dauer", value: "45 Min." },
      { label: "Format", value: "Video-Call" },
      { label: "Kosten", value: "Kostenlos" },
    ],
    closeAria: "Dialog schliessen",
    footerNote:
      "Alle Zeiten in Ihrer lokalen Zeitzone. Bestätigung per E-Mail.",
  },
  chat: {
    initialMessages: [
      "Willkommen bei Rautaki.",
      "Schildern Sie Ihre Frage — wir helfen Ihnen, den nächsten Schritt zu definieren.",
    ],
    title: "Rautaki",
    subtitle: "Strategie · Beratung · Umsetzung",
    getStarted: "Gespräch starten",
    inputPlaceholder:
      "Fragen zu KI-Strategie, Leistungen oder nächsten Schritten...",
    closeButtonTooltip: "Chat schliessen",
  },
  consent: {
    dialogAria: "Cookie-Einstellungen",
    textBeforeLink:
      "Wir setzen ein Tracking-Cookie von Salesflare, um Website-Besuche unseren Kontakten zuzuordnen — ausschliesslich mit Ihrer Einwilligung. Details in unserer ",
    privacyLinkLabel: "Datenschutzerklärung",
    textAfterLink: ".",
    deny: "Ablehnen",
    accept: "Akzeptieren",
  },
  cookieSettings: {
    label: "Cookie-Einstellungen",
  },
  serviceCard: {
    moreLabel: "Mehr erfahren",
  },
  error: {
    label: "Fehler",
    title: "Etwas ist schiefgelaufen",
    body: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    retry: "Erneut versuchen →",
  },
  notFound: {
    label: "404",
    title: "Seite nicht gefunden",
    body: "Diese Seite existiert nicht oder wurde verschoben.",
    back: "Zurück zur Startseite →",
  },
  maintenance: {
    metaTitle: "Bald wieder online",
    metaDescription: "Rautaki ist kurzzeitig offline für Wartungsarbeiten.",
    title: "Bald wieder online.",
    body: "Wir verfeinern gerade einige Details. Die Seite ist in Kürze wieder erreichbar — vielen Dank für Ihre Geduld.",
    urgentPrefix: "Für dringende Anfragen: ",
    email: "hello@rautaki.ch",
  },
} satisfies CommonContent;
