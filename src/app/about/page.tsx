import type { Metadata } from "next";
import Image from "next/image";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldRule from "@/components/GoldRule";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Harry Witzthum, Gründer von Rautaki — KI-Strategie mit echtem Implementierungswissen.",
  alternates: { canonical: "https://www.rautaki.ch/about" },
};

const values = [
  {
    title: "Evidenz vor Intuition",
    description:
      "Wichtige KI-Entscheide sollten auf Daten, operativen Rahmenbedingungen und klaren Annahmen beruhen statt auf Bauchgefühl der Führung.",
  },
  {
    title: "Klarheit unter Druck",
    description:
      "Wir fordern Führungsteams direkt heraus, wenn Ambition und Fähigkeiten nicht zueinander passen, besonders bei KI-Entscheiden mit hoher Tragweite.",
  },
  {
    title: "Umsetzung statt nur Analyse",
    description:
      "Strategie zählt erst, wenn sie Verhalten verändert. Wir bleiben nah dran, bis Pläne in Routinen, Governance und Anreizen verankert sind.",
  },
];

const workshopClients = [
  "Hepatitis Schweiz",
  "Universität Zürich",
  "Age Stiftung",
  "Astara Switzerland",
  "Verbandsmanagement Institut der Universität Fribourg",
  "Glaux Group",
  "AT Schweiz – Tabakkontrolle und Prävention",
  "Schweizerische Plattform der Ausbildungen im Sozialbereich SPAS",
];

const teachingCourses = [
  {
    title: "CAS Chief AI Officer",
    institution: "Institut für Kommunikation und Führung ikf",
    url: "https://ikf.ch/de/kurse/cas-chief-ai-officer",
  },
  {
    title: "CAS KI-Transformation",
    institution: "Institut für Kommunikation und Führung ikf",
    url: "https://www.ikf.ch/de/kurse/cas-ki-transformation",
  },
  {
    title: "CAS AI Hands-On",
    institution: "Institut für Kommunikation und Führung ikf",
    url: "https://ikf.ch/de/kurse/cas-ai-hands-on",
  },
  {
    title: "CAS KI als Teammitglied",
    institution: "Institut für Kommunikation und Führung ikf",
    url: "https://www.ikf.ch/de/kurse/cas-ki-als-teammitglied",
  },
  {
    title: "Digitale Transformation und KI in NPO",
    institution: "Verbandsmanagement Institut Universität Fribourg",
    url: "https://www.vmi.ch/de/npo-wissen-gezielt-vertiefen/digitalisierung-in-npo/",
  },
];

function BrandRautaki() {
  return (
    <span className="inline-flex items-baseline font-serif font-normal text-obsidian whitespace-nowrap">
      Raut<span className="text-gold">a</span>k
      <span className="text-gold">i</span>
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroLight
        label="Über uns"
        title={<BrandRautaki />}
        descriptionClassName="max-w-[70ch] font-ui text-body font-light leading-body text-ink"
        description={
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                Strategie für das Zeitalter der{" "}
                <span className="italic text-gold">
                  Künstlichen Intelligenz
                </span>
              </p>
              <div
                className="h-[3px] w-32 bg-gradient-to-r from-gold to-transparent"
                aria-hidden="true"
              />
            </div>

            <section className="space-y-4">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                Ein Wort, das von{" "}
                <span className="italic text-gold">weit her</span> kommt
              </h2>
              <p>
                <span className="font-serif italic text-ink">Rautaki</span>{" "}
                stammt aus te reo Māori und bedeutet{" "}
                <span className="font-serif italic text-ink">Strategie</span>.
              </p>
              <p>
                Es ist ein Wort, das in den Gemeinschaften der Māori in Aotearoa
                lebt – und das eine Idee von Strategie trägt, die uns vertraut
                sein sollte, aber im Alltag oft verloren geht: Strategie
                entsteht nicht am Schreibtisch einer einzelnen Person. Sie
                wächst im Gespräch zwischen Generationen, zwischen
                Wissensformen, zwischen unterschiedlichen Stimmen. Sie verbindet
                das, was war, mit dem, was möglich ist.
              </p>
              <p>Genau dieses Verständnis tragen wir in unsere Arbeit.</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                Warum dieser Name?
              </h2>
              <p>
                Künstliche Intelligenz ist eine der grössten Transformationen
                unserer Zeit. Sie verändert, wie wir arbeiten, wie wir
                entscheiden, wie wir Wissen schaffen. Doch Technologie allein
                ist keine Strategie. Wer KI ohne Richtung einführt, landet bei
                Pilotprojekten, die niemandem dienen – und bei Investitionen,
                die keine Wirkung entfalten.
              </p>
              <p>
                Der Name{" "}
                <span className="font-serif italic text-ink">Rautaki</span>{" "}
                trägt dazu eine stille Pointe: In ihm stecken die Buchstaben{" "}
                <span className="font-serif font-medium text-gold">a</span> und{" "}
                <span className="font-serif font-medium text-gold">i</span> –
                die Initialen von{" "}
                <span className="font-serif italic text-ink">
                  Artificial Intelligence
                </span>
                . Strategie und KI gehören zusammen. Das eine ohne das andere
                bleibt unvollständig.
              </p>
            </section>
          </div>
        }
        rightContent={
          <div className="flex flex-col gap-0">
            <div className="relative h-[420px] overflow-hidden">
              <Image
                src="/images/about/witzthum_portrait.webp"
                alt="Harry Witzthum, Gründer von Rautaki"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 380px"
                priority
              />
            </div>
            <div className="border border-t-0 border-ink/10 px-5 py-4 bg-white/60">
              <p className="font-ui text-xs uppercase tracking-wide-label text-mid-grey">
                Harry Witzthum
              </p>
              <p className="font-serif italic text-sm text-ink/60 leading-snug mt-0.5">
                Gründer, Rautaki
              </p>
            </div>
          </div>
        }
      />

      {/* ── Perspektiven ──────────────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Perspektive" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              Vielfalt der Perspektiven —{" "}
              <span className="italic text-gold">im Kern</span> unserer Arbeit
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
            <ScrollReveal>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
                Eine gute KI-Strategie entsteht nie aus einem einzigen
                Blickwinkel. Sie braucht Technik{" "}
                <span className="font-serif italic text-ink">und</span>{" "}
                Fachwissen. Führung{" "}
                <span className="font-serif italic text-ink">und</span>{" "}
                Mitarbeitende. Ökonomie{" "}
                <span className="font-serif italic text-ink">und</span> Ethik.
              </p>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
                Wer KI nur durch die Linse der Technologie betrachtet, übersieht
                ihren menschlichen Kontext. Wer nur über Risiken spricht,
                verschenkt ihre Möglichkeiten. Wer nur den Business Case sieht,
                vergisst die Menschen, die sie tragen müssen.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
                Die besten Strategien entstehen dort, wo verschiedene Stimmen
                aufeinandertreffen — und wo zugehört wird, bevor entschieden
                wird.
              </p>
              <p className="font-serif italic text-body leading-body text-ink border-l-2 border-gold pl-5">
                Das ist kein methodischer Zusatz. Das ist der Kern.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Was wir tun ───────────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Leistungen" variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              Was wir tun
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {[
              {
                title: "Strategische KI-Beratung",
                body: "Klarheit schaffen, bevor investiert wird — von der ersten Einordnung bis zur fundierten Entscheidungsgrundlage.",
              },
              {
                title: "Transformation von Organisationen",
                body: "KI in Strukturen, Prozessen und Kultur verankern, damit Veränderung wirklich trägt.",
              },
              {
                title: "Workshops und Trainings",
                body: "Führungskräfte und Teams befähigen, KI verantwortungsvoll und wirkungsvoll einzusetzen.",
              },
              {
                title: "Praxisorientierte Umsetzung",
                body: "Anwendungen entwickeln und begleiten, die im Alltag von Organisationen bestehen.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <article className="bg-charcoal p-10 border-t-2 border-gold/75 h-full">
                  <h3 className="font-serif text-h3 tracking-tight-h3 text-white font-normal mb-3">
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

      {/* ── Unser Ansatz ──────────────────────────────────── */}
      <section className="bg-white px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Ansatz" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              Unser Ansatz
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
            <ScrollReveal>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
                Nicht jede Organisation braucht mehr Technologie.
              </p>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
                Aber jede Organisation, die KI einsetzen will, braucht eine
                klare Strategie für deren Einsatz — mit Respekt vor der
                Komplexität, mit Offenheit für unterschiedliche Stimmen, und mit
                einem klaren Blick auf das, was wirklich Wert schafft.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="font-serif italic text-h3 leading-heading text-ink border-l-2 border-gold pl-6">
                Dabei helfen wir Ihnen.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── Gründung ──────────────────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative h-[400px] lg:h-[460px] bg-charcoal overflow-hidden">
              <Image
                src="/images/about/witzthum_portrait.webp"
                alt="Harry Witzthum, Gründer von Rautaki"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionLabel text="Gründung" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Harry Witzthum
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              Harry gründete Rautaki, nachdem er gesehen hatte, wie häufig
              Führungsteams KI entweder überhöhen oder zu wenig in die nötigen
              Fähigkeiten für einen verantwortungsvollen Einsatz investieren.
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              Er kommt aus einem Feld, das Ausdauer fordert und Umsetzungsstärke
              verlangt: langjährige Führungsverantwortung in nationalen
              Nonprofit-Organisationen, Transformationsprozesse unter realen
              Bedingungen, der Aufbau agiler Strukturen — einschliesslich
              Holacracy — in Organisationen, die sich grundlegend neu ausrichten
              mussten. Als Diplomierter Verbands- und NPO-Manager VMI und Doktor
              der Philosophie verbindet er institutionelles Denken mit dem
              Anspruch konkreter Wirkung. Digitale Transformation war für ihn
              nie ein Technologieprojekt — sondern immer eine Frage der Führung.
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              Genau das prägt seine Art, KI einzuführen: nicht als isoliertes
              Tool, sondern entlang von Entscheidungswegen, Rollen und
              Verantwortlichkeiten. Sein Blick für Strukturen sorgt dafür, dass
              KI dort ansetzt, wo sie echte Wirkung entfaltet; seine Erfahrung
              mit realen Transformationen verhindert, dass Projekte im
              Pilotstadium versanden; und sein Führungsverständnis stellt
              sicher, dass Menschen befähigt statt überfahren werden.
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
              Die Firma wurde gebaut, um genau diese Lücke zu schliessen:
              strategische Stringenz auf der einen, Umsetzungsrealität auf der
              anderen Seite.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-warm-grey px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content space-y-20">
          <div>
            <ScrollReveal>
              <SectionLabel text="Praxis" />
              <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-4">
                Workshops mit Organisationen
              </h2>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading mb-10">
                Eine Auswahl von Organisationen, mit denen Rautaki in Workshops
                und Trainings zusammengearbeitet hat.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 list-none pl-0 border-t border-ink/10">
                {workshopClients.map((client) => (
                  <li
                    key={client}
                    className="flex items-start gap-3 py-4 border-b border-ink/10 font-ui text-body font-light leading-body text-ink"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-none bg-gold"
                      aria-hidden="true"
                    />
                    <span className="font-medium">{client}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal>
              <SectionLabel text="Lehre" />
              <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-4">
                Lehrtätigkeit an Hochschulen und Instituten
              </h2>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading mb-10">
                Harry Witzthum unterrichtet als Dozent in folgenden
                Weiterbildungsprogrammen.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <ul className="list-none pl-0 max-w-reading border-t border-ink/10">
                {teachingCourses.map((course) => (
                  <li
                    key={course.title}
                    className="flex flex-col gap-1 py-5 border-b border-ink/10"
                  >
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-ui text-body font-medium text-ink leading-snug underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                    >
                      {course.title}
                    </a>
                    <span className="font-serif italic text-sm text-mid-grey leading-snug">
                      {course.institution}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Werte" variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              Prinzipien, die unsere KI-Beratung prägen
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 90}>
                <article className="bg-charcoal p-10 border-t-2 border-gold/75">
                  <h3 className="font-serif text-h3 tracking-tight-h3 text-white font-normal mb-3">
                    {value.title}
                  </h3>
                  <p className="font-ui text-sm leading-body text-white/55 font-light">
                    {value.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content text-center">
          <ScrollReveal>
            <p className="font-sans text-sm tracking-wide-label uppercase text-gold mb-4">
              Gespräch vereinbaren
            </p>
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 max-w-narrow mx-auto mb-10">
              Erfahren Sie, wie Rautaki Ihr Unternehmen bei der strategischen
              KI-Einführung begleiten kann.
            </p>
            <Button href="/booking" variant="gold" showArrow>
              Kennenlernen — unverbindlich
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
