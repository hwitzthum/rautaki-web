import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import N8nChatWidget from "@/components/N8nChatWidget";
import ConsentManager from "@/components/ConsentManager";
import JsonLd from "@/components/JsonLd";

// Unified entity graph: Organization + founder Person, cross-referenced via
// @id so AI systems can resolve Rautaki and Harry Witzthum as one entity graph.
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.rautaki.ch/#organization",
      name: "Rautaki",
      legalName: "Harry Siegbert Witzthum",
      url: "https://www.rautaki.ch",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "CH-UID",
        value: "CHE-362.050.451",
      },
      description:
        "Rautaki begleitet Unternehmen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Weinbergstrasse 23",
        addressLocality: "Kilchberg",
        postalCode: "8802",
        addressRegion: "ZH",
        addressCountry: "CH",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@rautaki.ch",
        availableLanguage: ["German", "English"],
      },
      areaServed: ["DE", "AT", "CH"],
      availableLanguage: "German",
      knowsAbout: [
        "AI Strategy",
        "Artificial Intelligence",
        "Leadership Transformation",
        "Model Governance",
        "AI Risk Management",
      ],
      priceRange: "CHF 280 – CHF 3'500",
      founder: { "@id": "https://www.rautaki.ch/#harry-witzthum" },
      sameAs: [
        "https://www.linkedin.com/in/harry-witzthum-25b814a/",
        "https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-362.050.451",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.rautaki.ch/#harry-witzthum",
      name: "Harry Witzthum",
      jobTitle: "Gründer & Berater für KI-Strategie",
      url: "https://www.rautaki.ch/about",
      image: "https://www.rautaki.ch/images/about/witzthum_portrait.webp",
      worksFor: { "@id": "https://www.rautaki.ch/#organization" },
      description:
        "Gründer von Rautaki. Doktor der Philosophie und Diplomierter Verbands- und NPO-Manager VMI. Langjährige Führungserfahrung in nationalen Nonprofit-Organisationen; Dozent in akkreditierten CAS-Programmen zu KI-Strategie und KI-Transformation.",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Doktorat",
          name: "Doktor der Philosophie (PhD)",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Diplom",
          name: "Diplomierter Verbands- und NPO-Manager VMI",
        },
      ],
      knowsAbout: [
        "AI Strategy",
        "Organizational Transformation",
        "Nonprofit Management",
        "Executive Leadership",
        "AI Governance",
      ],
      sameAs: ["https://www.linkedin.com/in/harry-witzthum-25b814a/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.rautaki.ch/#website",
      name: "Rautaki",
      url: "https://www.rautaki.ch",
      inLanguage: "de-CH",
      publisher: { "@id": "https://www.rautaki.ch/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rautaki.ch/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Start",
          item: "https://www.rautaki.ch",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Leistungen",
          item: "https://www.rautaki.ch/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Lab",
          item: "https://www.rautaki.ch/lab",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Über uns",
          item: "https://www.rautaki.ch/about",
        },
      ],
    },
  ],
};

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rautaki.ch"),
  title: {
    default: "Rautaki — KI-Strategie für Entscheider",
    template: "%s | Rautaki",
  },
  description:
    "Rautaki begleitet Unternehmen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Rautaki",
    title: "Rautaki — KI-Strategie für Entscheider",
    description:
      "Rautaki begleitet Unternehmen bei der strategischen Einführung von KI — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
    url: "https://www.rautaki.ch",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Rautaki" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rautaki — KI-Strategie für Entscheider",
    description:
      "Rautaki begleitet Unternehmen bei der strategischen Einführung von KI.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.rautaki.ch" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Maintenance gate: the proxy (src/proxy.ts) sets x-maintenance=true on
  // every non-API request when MAINTENANCE_MODE is on. Don't mount the chat
  // widget in that state — otherwise the bubble shows on the maintenance
  // page, visitors who click it hit /api/chat which returns 503, and Sentry
  // captures a "misconfigured" message on every attempt.
  const isMaintenance = (await headers()).get("x-maintenance") === "true";

  return (
    <html lang="de-CH" data-scroll-behavior="smooth">
      <head>
        <JsonLd schema={siteSchema} />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Zum Inhalt springen
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        {!isMaintenance && <N8nChatWidget />}
        {!isMaintenance && <ConsentManager />}
      </body>
    </html>
  );
}
