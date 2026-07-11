import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import N8nChatWidget from "@/components/N8nChatWidget";
import ConsentManager from "@/components/ConsentManager";
import JsonLd from "@/components/JsonLd";
import { OG_IMAGE } from "@/lib/og";
import { orgSameAs, personSameAs } from "@/lib/authority";
import { common } from "@/content/de/common";

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
      description: common.graph.orgDescription,
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
      // CH only — every visible surface (llms.txt, /services Service schema,
      // all copy) claims Switzerland; the schema must not assert more.
      areaServed: "CH",
      availableLanguage: ["German", "English"],
      knowsAbout: [
        "AI Strategy",
        "Artificial Intelligence",
        "Leadership Transformation",
        "Model Governance",
        "AI Risk Management",
      ],
      priceRange: "CHF 280 – CHF 3'500",
      founder: { "@id": "https://www.rautaki.ch/#harry-witzthum" },
      sameAs: orgSameAs,
    },
    {
      "@type": "Person",
      "@id": "https://www.rautaki.ch/#harry-witzthum",
      name: "Harry Witzthum",
      jobTitle: common.graph.personJobTitle,
      url: "https://www.rautaki.ch/about",
      image: "https://www.rautaki.ch/images/about/witzthum_portrait.webp",
      worksFor: { "@id": "https://www.rautaki.ch/#organization" },
      description: common.graph.personDescription,
      hasCredential: common.graph.credentials.map((credential) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: credential.category,
        name: credential.name,
      })),
      knowsAbout: [
        "AI Strategy",
        "Organizational Transformation",
        "Nonprofit Management",
        "Executive Leadership",
        "AI Governance",
      ],
      // Only profiles verified to be this person. ResearchGate adds an
      // academic authority signal alongside the professional LinkedIn one.
      sameAs: personSameAs,
    },
    {
      "@type": "WebSite",
      "@id": "https://www.rautaki.ch/#website",
      name: "Rautaki",
      url: "https://www.rautaki.ch",
      inLanguage: common.graph.websiteInLanguage,
      publisher: { "@id": "https://www.rautaki.ch/#organization" },
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
    "Rautaki begleitet Unternehmen bei der strategischen KI-Einführung — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Rautaki",
    title: "Rautaki — KI-Strategie für Entscheider",
    description:
      "Rautaki begleitet Unternehmen bei der strategischen KI-Einführung — von der Potenzialanalyse bis zur skalierbaren Umsetzung.",
    url: "https://www.rautaki.ch",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rautaki — KI-Strategie für Entscheider",
    description:
      "Rautaki begleitet Unternehmen bei der strategischen Einführung von KI.",
    images: [OG_IMAGE.url],
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
          {common.skipLink}
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
