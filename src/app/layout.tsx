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
  url: "https://rautaki.ch",
  description:
    "Rautaki is a Zurich-based AI consultancy helping leadership teams shape AI strategy, manage model risk, and execute transformation with confidence.",
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
    contactType: "customer service",
    email: "hello@rautaki.ch",
  },
  areaServed: { "@type": "Country", name: "Switzerland" },
  knowsAbout: [
    "AI Strategy",
    "Artificial Intelligence",
    "Leadership Transformation",
    "Model Governance",
    "AI Risk Management",
  ],
  sameAs: ["https://www.linkedin.com"],
};

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rautaki.ch"),
  title: {
    default: "Rautaki | AI Strategy, Advisory, and Leadership Transformation",
    template: "%s | Rautaki",
  },
  description:
    "Rautaki is a Zurich-based AI consultancy helping leadership teams shape AI strategy, manage model risk, and execute transformation with confidence.",
  openGraph: {
    title: "Rautaki | AI Strategy, Advisory, and Leadership Transformation",
    description:
      "AI strategy and advisory for leadership teams navigating change, risk, and execution.",
    url: "https://rautaki.ch",
    siteName: "Rautaki",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
