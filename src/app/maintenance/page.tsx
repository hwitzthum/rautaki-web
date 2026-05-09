import type { Metadata } from "next";
import Logo from "@/components/Logo";
import GoldRule from "@/components/GoldRule";

export const metadata: Metadata = {
  title: "Bald wieder online",
  description: "Rautaki ist kurzzeitig offline für Wartungsarbeiten.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-narrow text-center">
        <div className="flex justify-center mb-12">
          <Logo size="xl" variant="dark" showTagline />
        </div>

        <div className="mx-auto w-24 mb-10">
          <GoldRule />
        </div>

        <h1 className="font-serif text-h1 tracking-tight-h2 font-normal leading-heading mb-6">
          Bald wieder online.
        </h1>

        <p className="font-ui text-lead font-light leading-body text-mid-grey mb-10">
          Wir verfeinern gerade einige Details. Die Seite ist in Kürze wieder
          erreichbar — vielen Dank für Ihre Geduld.
        </p>

        <p className="font-ui text-body font-light leading-body text-mid-grey">
          Für dringende Anfragen:{" "}
          <a
            href="mailto:hello@rautaki.ch"
            className="text-gold hover:text-gold-light transition-colors"
          >
            hello@rautaki.ch
          </a>
        </p>
      </div>
    </div>
  );
}
