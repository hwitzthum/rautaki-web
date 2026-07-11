// /about copy: the founder narrative, workshop clients, teaching engagements
// and values. Also reused by the llms-full.txt route (workshopClients,
// teachingCourses) so machine-readable full text never drifts. Marker strings
// (*…*) mark inline gold emphasis via <Highlight>; brand fragments (Rautaki,
// Strategie, a, i, Artificial Intelligence) keep their own inline <span> styling
// in AboutPage and are split out so the surrounding prose stays translatable.

import type { AboutContent } from "../types";

export const about = {
  metaTitle: "Über uns",
  metaDescription:
    "Harry Witzthum, Gründer von Rautaki — KI-Strategie mit echtem Implementierungswissen und Lehre in CAS-Programmen.",
  workshopClients: [
    "Hepatitis Schweiz",
    "Universität Zürich",
    "Age Stiftung",
    "Astara Switzerland",
    "Verbandsmanagement Institut der Universität Fribourg",
    "Glaux Group",
    "AT Schweiz – Tabakkontrolle und Prävention",
    "Schweizerische Plattform der Ausbildungen im Sozialbereich SPAS",
  ],
  teachingCourses: [
    {
      title: "CAS Chief AI Officer",
      institution: "Institut für Kommunikation und Führung ikf",
      url: "https://ikf.ch/de/kurse/cas-chief-ai-officer",
    },
    {
      title: "CAS KI-Transformation",
      institution: "Institut für Kommunikation und Führung ikf",
      url: "https://www.ikf.ch/de/kurse/cas-ki-transformation",
    },
    {
      title: "CAS AI Hands-On",
      institution: "Institut für Kommunikation und Führung ikf",
      url: "https://ikf.ch/de/kurse/cas-ai-hands-on",
    },
    {
      title: "CAS KI als Teammitglied",
      institution: "Institut für Kommunikation und Führung ikf",
      url: "https://www.ikf.ch/de/kurse/cas-ki-als-teammitglied",
    },
    {
      title: "Digitale Transformation und KI in NPO",
      institution: "Verbandsmanagement Institut Universität Fribourg",
      url: "https://www.vmi.ch/de/npo-wissen-gezielt-vertiefen/digitalisierung-in-npo/",
    },
  ],
  values: [
    {
      title: "Evidenz vor Intuition",
      description:
        "Wichtige KI-Entscheide sollten auf Daten, operativen Rahmenbedingungen und klaren Annahmen beruhen statt auf Bauchgefühl der Führung.",
    },
    {
      title: "Klarheit unter Druck",
      description:
        "Wir fordern Führungsteams direkt heraus, wenn Ambition und Fähigkeiten nicht zueinander passen, besonders bei KI-Entscheiden mit hoher Tragweite.",
    },
    {
      title: "Umsetzung statt nur Analyse",
      description:
        "Strategie zählt erst, wenn sie Verhalten verändert. Wir bleiben nah dran, bis Pläne in Routinen, Governance und Anreizen verankert sind.",
    },
  ],
  heroLabel: "Über uns",
  hero: {
    tagline: "Strategie für das Zeitalter der *Künstlichen Intelligenz*",
    nameHeading: "Ein Wort, das von *weit her* kommt",
    brandRautaki: "Rautaki",
    namePara1Mid: "stammt aus te reo Māori und bedeutet",
    brandStrategie: "Strategie",
    namePara2:
      "Es ist ein Wort, das in den Gemeinschaften der Māori in Aotearoa lebt – und das eine Idee von Strategie trägt, die uns vertraut sein sollte, aber im Alltag oft verloren geht: Strategie entsteht nicht am Schreibtisch einer einzelnen Person. Sie wächst im Gespräch zwischen Generationen, zwischen Wissensformen, zwischen unterschiedlichen Stimmen. Sie verbindet das, was war, mit dem, was möglich ist.",
    namePara3: "Genau dieses Verständnis tragen wir in unsere Arbeit.",
    whyHeading: "Warum dieser Name?",
    whyPara1:
      "Künstliche Intelligenz ist eine der grössten Transformationen unserer Zeit. Sie verändert, wie wir arbeiten, wie wir entscheiden, wie wir Wissen schaffen. Doch Technologie allein ist keine Strategie. Wer KI ohne Richtung einführt, landet bei Pilotprojekten, die niemandem dienen – und bei Investitionen, die keine Wirkung entfalten.",
    whyPara2Prefix: "Der Name",
    whyPara2Seg1:
      "trägt dazu eine stille Pointe: In ihm stecken die Buchstaben",
    brandA: "a",
    whyPara2And: "und",
    brandI: "i",
    whyPara2Seg3: "– die Initialen von",
    brandAI: "Artificial Intelligence",
    whyPara2Seg4:
      ". Strategie und KI gehören zusammen. Das eine ohne das andere bleibt unvollständig.",
    portraitAlt: "Harry Witzthum, Gründer von Rautaki",
    portraitName: "Harry Witzthum",
    portraitRole: "Gründer, Rautaki",
  },
  perspective: {
    label: "Perspektive",
    heading: "Vielfalt der Perspektiven — *im Kern* unserer Arbeit",
    para1a:
      "Eine gute KI-Strategie entsteht nie aus einem einzigen Blickwinkel. Sie braucht Technik",
    und: "und",
    para1b: "Fachwissen. Führung",
    para1c: "Mitarbeitende. Ökonomie",
    para1d: "Ethik.",
    para2:
      "Wer KI nur durch die Linse der Technologie betrachtet, übersieht ihren menschlichen Kontext. Wer nur über Risiken spricht, verschenkt ihre Möglichkeiten. Wer nur den Business Case sieht, vergisst die Menschen, die sie tragen müssen.",
    para3:
      "Die besten Strategien entstehen dort, wo verschiedene Stimmen aufeinandertreffen — und wo zugehört wird, bevor entschieden wird.",
    quote: "Das ist kein methodischer Zusatz. Das ist der Kern.",
  },
  work: {
    label: "Arbeitsweise",
    heading: "Wie wir arbeiten",
    items: [
      {
        title: "Strategische KI-Beratung",
        body: "Klarheit schaffen, bevor investiert wird — von der ersten Einordnung bis zur fundierten Entscheidungsgrundlage.",
      },
      {
        title: "Transformation von Organisationen",
        body: "KI in Strukturen, Prozessen und Kultur verankern, damit Veränderung wirklich trägt.",
      },
      {
        title: "Workshops und Trainings",
        body: "Führungskräfte und Teams befähigen, KI verantwortungsvoll und wirkungsvoll einzusetzen — bis hin zu akkreditierten CAS-Programmen.",
      },
      {
        title: "Praxisorientierte Umsetzung",
        body: "Anwendungen entwickeln und begleiten, die im Alltag von Organisationen bestehen.",
      },
    ],
  },
  approach: {
    label: "Ansatz",
    heading: "Unser Ansatz",
    para1: "Nicht jede Organisation braucht mehr Technologie.",
    para2:
      "Aber jede Organisation, die KI einsetzen will, braucht eine klare Strategie für deren Einsatz — mit Respekt vor der Komplexität, mit Offenheit für unterschiedliche Stimmen, und mit einem klaren Blick auf das, was wirklich Wert schafft.",
    quote: "Dabei helfen wir Ihnen.",
  },
  founding: {
    label: "Gründung",
    heading: "Harry Witzthum",
    para1:
      "Harry gründete Rautaki, nachdem er gesehen hatte, wie häufig Führungsteams KI entweder überhöhen oder zu wenig in die nötigen Fähigkeiten für einen verantwortungsvollen Einsatz investieren.",
    para2:
      "Er kommt aus einem Feld, das Ausdauer fordert und Umsetzungsstärke verlangt: langjährige Führungsverantwortung in nationalen Nonprofit-Organisationen, Transformationsprozesse unter realen Bedingungen, der Aufbau agiler Strukturen — einschliesslich Holacracy — in Organisationen, die sich grundlegend neu ausrichten mussten. Als Diplomierter Verbands- und NPO-Manager VMI und Doktor der Philosophie verbindet er institutionelles Denken mit dem Anspruch konkreter Wirkung. Digitale Transformation war für ihn nie ein Technologieprojekt — sondern immer eine Frage der Führung.",
    para3:
      "Genau das prägt seine Art, KI einzuführen: nicht als isoliertes Tool, sondern entlang von Entscheidungswegen, Rollen und Verantwortlichkeiten. Sein Blick für Strukturen sorgt dafür, dass KI dort ansetzt, wo sie echte Wirkung entfaltet; seine Erfahrung mit realen Transformationen verhindert, dass Projekte im Pilotstadium versanden; und sein Führungsverständnis stellt sicher, dass Menschen befähigt statt überfahren werden.",
    para4:
      "Die Firma wurde gebaut, um genau diese Lücke zu schliessen: strategische Stringenz auf der einen, Umsetzungsrealität auf der anderen Seite.",
    portraitAlt: "Harry Witzthum, Gründer von Rautaki",
  },
  workshops: {
    label: "Praxis",
    heading: "Workshops mit Organisationen",
    intro:
      "Ein Grossteil unserer Arbeit entsteht mit NPO, Verbänden und Organisationen des Sozial- und öffentlichen Sektors — dort, wo jeder Einsatz von Mitteln Wirkung zeigen muss. Eine Auswahl.",
  },
  teaching: {
    label: "Lehre",
    heading: "Lehrtätigkeit an Hochschulen und Instituten",
    intro:
      "Was wir beraten, lehren wir auch: Harry Witzthum unterrichtet als Dozent in akkreditierten CAS-Programmen — vom Chief AI Officer bis zur KI-Transformation. Diese Verbindung von individueller Beratung und akkreditierter Weiterbildung macht Rautaki im Schweizer Markt selten.",
  },
  valuesSection: {
    label: "Werte",
    heading: "Prinzipien, die unsere KI-Beratung prägen",
  },
  cta: {
    eyebrow: "Gespräch vereinbaren",
    heading: "Bereit für den nächsten Schritt?",
    body: "Erfahren Sie, wie Rautaki Ihr Unternehmen bei der strategischen KI-Einführung begleiten kann.",
    button: "Erstgespräch vereinbaren",
  },
  breadcrumbLabel: "Über uns",
  schema: {
    profileName: "Über uns — Rautaki",
  },
} satisfies AboutContent;
