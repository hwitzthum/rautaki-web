import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import N8nChatWidget from "@/components/N8nChatWidget";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rautaki.com"),
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
    url: "https://rautaki.com",
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"
        />
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
