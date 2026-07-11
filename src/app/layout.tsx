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
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getContent } from "@/content";

const OG_LOCALE: Record<Locale, string> = {
  de: "de_CH",
  en: "en_GB",
};

function localeFromHeader(value: string | null): Locale {
  return value === "en" ? "en" : "de";
}

// Unified entity graph: Organization + founder Person, cross-referenced via
// @id so AI systems can resolve Rautaki and Harry Witzthum as one entity graph.
// Localised text comes from the shared `common.graph` strings; the @ids and the
// bilingual WebSite.inLanguage are identical across locales so both the German
// and English pages resolve to the same entities.
function siteSchema(locale: Locale) {
  const g = getContent(locale).common.graph;
  return {
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
        description: g.orgDescription,
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
        jobTitle: g.personJobTitle,
        url: "https://www.rautaki.ch/about",
        image: "https://www.rautaki.ch/images/about/witzthum_portrait.webp",
        worksFor: { "@id": "https://www.rautaki.ch/#organization" },
        description: g.personDescription,
        hasCredential: g.credentials.map((credential) => ({
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
        // The site serves both languages under one host (German bare, English
        // under /en), so the WebSite entity is bilingual in both locales.
        inLanguage: ["de-CH", "en"],
        publisher: { "@id": "https://www.rautaki.ch/#organization" },
      },
    ],
  };
}

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Home metadata lives here (per-page builders override this for every other
// route). The locale comes from x-locale, set by the proxy from the pathname.
export async function generateMetadata(): Promise<Metadata> {
  const locale = localeFromHeader((await headers()).get("x-locale"));
  const home = getContent(locale).home;
  const alternates = pageAlternates(locale, "/");
  return {
    metadataBase: new URL("https://www.rautaki.ch"),
    title: {
      default: home.metaTitle,
      template: "%s | Rautaki",
    },
    description: home.metaDescription,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: "Rautaki",
      title: home.metaTitle,
      description: home.metaDescription,
      url: alternates.canonical,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: home.metaTitle,
      description: home.metaDescription,
      images: [OG_IMAGE.url],
    },
    robots: { index: true, follow: true },
    alternates,
  };
}

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
  const hdrs = await headers();
  const isMaintenance = hdrs.get("x-maintenance") === "true";
  const locale = localeFromHeader(hdrs.get("x-locale"));
  const common = getContent(locale).common;

  return (
    <html lang={locale === "en" ? "en" : "de-CH"} data-scroll-behavior="smooth">
      <head>
        <JsonLd schema={siteSchema(locale)} />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          {common.skipLink}
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
        {!isMaintenance && <N8nChatWidget locale={locale} />}
        {!isMaintenance && <ConsentManager locale={locale} />}
      </body>
    </html>
  );
}
