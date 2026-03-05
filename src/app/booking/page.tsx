import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import BookingForm from "@/components/BookingForm";
import ScrollReveal from "@/components/ScrollReveal";

export default function BookingPage() {
  return (
    <>
      <HeroLight
        label="Terminbuchung"
        title={
          <>
            Buchen Sie eine fokussierte <em>Beratung</em> mit Rautaki
          </>
        }
        description="Wählen Sie einen Termin, der für Sie passt. Wir bestätigen Ihre Sitzung innerhalb eines Arbeitstags und bereiten ein fokussiertes Gespräch zu Ihren KI-Strategiefragen vor."
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <SectionLabel text="Ablauf" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-8">
              Reservieren Sie Ihre Sitzung
            </h2>

            <div className="space-y-6">
              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Schritt 1
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  Füllen Sie das Buchungsformular mit Ihrem bevorzugten Datum,
                  Ihrer Uhrzeit und dem Gesprächsthema aus.
                </p>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Schritt 2
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  Wir prüfen Ihre Anfrage und bestätigen den Termin innerhalb
                  eines Arbeitstags.
                </p>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Schritt 3
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  Nehmen Sie an der Beratung teil, vorbereitet auf ein
                  fokussiertes Gespräch zu Ihren KI-Strategieprioritäten.
                </p>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Lieber per E-Mail?
                </div>
                <a
                  href="mailto:hello@rautaki.ch"
                  className="font-ui text-body text-ink hover:text-gold transition-colors no-underline"
                >
                  hello@rautaki.ch
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionLabel text="Beratung buchen" />
            <BookingForm />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-obsidian px-6 sm:px-10 lg:px-20 py-10">
        <div className="mx-auto max-w-content flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-ui text-sm text-white/70">
          <div className="font-ui text-xs uppercase tracking-wide-label text-white/45">
            Büro Kilchberg / ZH
          </div>
          <div className="leading-relaxed">
            Rautaki, Weinbergstrasse 23, 8802 Kilchberg / ZH
          </div>
        </div>
      </section>
    </>
  );
}
