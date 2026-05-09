import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import N8nChatWidget from "@/components/N8nChatWidget";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Rautaki",
  url: "https://www.rautaki.com",
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
  sameAs: ["https://www.linkedin.com/in/harry-witzthum-25b814a/"],
};

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rautaki.com"),
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
    url: "https://www.rautaki.com",
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
  alternates: { canonical: "https://www.rautaki.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" data-scroll-behavior="smooth">
      <head>
        <JsonLd schema={organizationSchema} />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <N8nChatWidget />
      </body>
    </html>
  );
}
