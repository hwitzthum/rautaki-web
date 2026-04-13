import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Datenschutzerklärung der Rautaki. Informationen zum Umgang mit Ihren personenbezogenen Daten.",
};

export default function PrivacyPage() {
  return (
    <>
      <HeroLight
        label="Datenschutz"
        title={
          <>
            Datenschutz&shy;erklärung
          </>
        }
        description="Informationen zum Umgang mit Ihren personenbezogenen Daten gemäss dem Schweizer Datenschutzgesetz (nDSG) und der EU-Datenschutz-Grundverordnung (DSGVO)."
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-reading">
          <ScrollReveal>
            <SectionLabel text="Verantwortlich" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Verantwortliche Stelle
            </h2>
            {/* TODO: Replace with actual legal entity details */}
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p>Rautaki</p>
              <p>Weinbergstrasse 23</p>
              <p>8802 Kilchberg / ZH</p>
              <p>Schweiz</p>
              <p>
                <a href="mailto:hello@rautaki.ch" className="text-ink hover:text-gold transition-colors">
                  hello@rautaki.ch
                </a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <SectionLabel text="Datenerhebung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Welche Daten wir erheben
            </h2>
            {/* TODO: Replace with actual privacy policy content from legal counsel */}
            <div className="font-ui text-body text-ink/65 space-y-4 mb-12">
              <p>
                Wenn Sie unser Buchungsformular nutzen, erheben wir die von Ihnen
                eingegebenen Daten (Name, Unternehmen, E-Mail-Adresse, gewünschter
                Termin und Nachricht), um Ihre Beratungsanfrage bearbeiten zu können.
              </p>
              <p>
                Beim Besuch unserer Website werden automatisch technische Daten
                erfasst (z.&nbsp;B. IP-Adresse, Browser-Typ, Zugriffszeit). Diese
                Daten werden zur Fehlererkennung und Leistungsüberwachung über
                Sentry verarbeitet.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <SectionLabel text="Ihre Rechte" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Ihre Rechte
            </h2>
            {/* TODO: Replace with complete rights section from legal counsel */}
            <div className="font-ui text-body text-ink/65 space-y-4 mb-12">
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer
                personenbezogenen Daten. Für Anfragen wenden Sie sich bitte an{" "}
                <a href="mailto:hello@rautaki.ch" className="text-ink hover:text-gold transition-colors">
                  hello@rautaki.ch
                </a>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <SectionLabel text="Kontakt" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Fragen zum Datenschutz
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4">
              <p>
                Bei Fragen zum Datenschutz erreichen Sie uns unter{" "}
                <a href="mailto:hello@rautaki.ch" className="text-ink hover:text-gold transition-colors">
                  hello@rautaki.ch
                </a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
