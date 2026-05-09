import type { Metadata } from "next";
import { Suspense } from "react";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { CalInline } from "@/components/CalBooking";

export const metadata: Metadata = {
  title: "Gespräch buchen",
  description: "Vereinbaren Sie ein kostenloses 45-minütiges Erstgespräch mit Harry Witzthum.",
  alternates: { canonical: "https://www.rautaki.com/booking" },
};

function BookingTitle() {
  return (
    <>
      Beratung{" "}
      <span className="italic text-gold">reservieren</span>
    </>
  );
}

const callFacts = [
  { label: "Dauer", value: "45 Minuten" },
  { label: "Format", value: "Video-Call" },
  { label: "Kosten", value: "Kostenlos" },
  { label: "Bestätigung", value: "Per E-Mail" },
];

const expectations = [
  {
    number: "01",
    title: "Ausgangslage klären",
    body: "Wir analysieren gemeinsam, wo Ihre Organisation heute steht — und identifizieren, wo KI echten strategischen Mehrwert schaffen kann.",
  },
  {
    number: "02",
    title: "Prioritäten setzen",
    body: "Gemeinsam definieren wir erste strategische Prioritäten: wo KI führen soll, wo Leitplanken nötig sind und was sofort angepackt werden kann.",
  },
  {
    number: "03",
    title: "Nächste Schritte",
    body: "Sie verlassen das Gespräch mit konkreten, umsetzbaren Empfehlungen — kein allgemeines Fazit, sondern ein klarer Weg nach vorne.",
  },
];

export default function BookingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroLight
        label="Buchung"
        title={<BookingTitle />}
        description={
          <p>
            Wählen Sie einen Termin für ein erstes, unverbindliches
            Strategiegespräch. Kein Verkaufsgespräch — ein offener Austausch
            über Ihre KI-Ausgangslage und die nächsten sinnvollen Schritte.
          </p>
        }
        rightContent={
          <div className="bg-charcoal border-t-[3px] border-gold p-8">
            <p className="font-ui text-xs uppercase tracking-wide-label text-white/40 mb-6">
              Auf einen Blick
            </p>
            <dl className="space-y-0">
              {callFacts.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-baseline justify-between py-4 ${
                    i < callFacts.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <dt className="font-ui text-xs uppercase tracking-wide-label text-white/40">
                    {label}
                  </dt>
                  <dd className="font-serif text-h4 tracking-tight-h4 font-normal text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* ── Was Sie erwartet ──────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Was Sie erwartet" variant="dark" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {expectations.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 90}>
                <article className="bg-charcoal p-10 border-t-2 border-gold/75 h-full">
                  <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-4">
                    {item.number}
                  </div>
                  <h3 className="font-serif text-h3 tracking-tight-h3 font-normal text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="font-ui text-sm leading-body text-white/55 font-light">
                    {item.body}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kalender ──────────────────────────────────────── */}
      <section className="bg-white px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Termin wählen" />
            <div className="border-t-[3px] border-gold bg-white shadow-card">
              <Suspense fallback={<div className="h-96 bg-charcoal animate-pulse" />}>
                <CalInline />
              </Suspense>
            </div>
            <p className="mt-4 font-ui text-xs text-mid-grey">
              Alle Zeiten werden in Ihrer lokalen Zeitzone angezeigt.
              Bestätigung erfolgt automatisch per E-Mail.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
