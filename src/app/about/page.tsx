import type { Metadata } from "next";
import Image from "next/image";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rautaki wurde in Zürich gegründet, um Führungsteams bei der verantwortungsvollen KI-Strategie zu unterstützen. Erfahren Sie mehr über unsere Werte und unseren Ansatz.",
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

const milestones = [
  { year: "2018", event: "Rautaki in Zürich gegründet" },
  {
    year: "2019",
    event:
      "Erste Beratungsmandate für Führungsteams in Finanz- und Industrieunternehmen",
  },
  {
    year: "2021",
    event:
      "Skalierung grenzüberschreitender Transformationsarbeit in der DACH-Region",
  },
  {
    year: "2023",
    event:
      "Aufbau einer dedizierten Praxis für KI-Strategie und Modell-Governance",
  },
  { year: "2025", event: "Ausweitung auf über 40 beratene Organisationen" },
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
  },
  {
    title: "CAS KI-Transformation",
    institution: "Institut für Kommunikation und Führung ikf",
  },
  {
    title: "CAS AI Hands-On",
    institution: "Institut für Kommunikation und Führung",
  },
  {
    title: "Digitale Transformation und KI in NPO",
    institution: "Verbandsmanagement Institut Universität Fribourg",
  },
];

function BrandRautaki() {
  return (
    <strong className="inline-flex items-baseline font-serif font-medium tracking-tight text-obsidian whitespace-nowrap">
      Raut<span className="text-gold">a</span>k
      <span className="text-gold">i</span>
    </strong>
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroLight
        label="Über uns"
        title={<BrandRautaki />}
        descriptionClassName="max-w-[70ch] font-ui text-[1.0625rem] md:text-[1.125rem] font-light leading-[1.75] text-ink"
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
                Ein Wort, das von <em>weit her</em> kommt
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

            <section className="space-y-4">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                Vielfalt der Perspektiven – <em>im Kern</em> unserer Arbeit
              </h2>
              <p>
                Eine gute KI-Strategie entsteht nie aus einem einzigen
                Blickwinkel.
              </p>
              <p>
                Sie braucht Technik{" "}
                <span className="font-serif italic text-ink">und</span>{" "}
                Fachwissen. Führung{" "}
                <span className="font-serif italic text-ink">und</span>{" "}
                Mitarbeitende. Ökonomie{" "}
                <span className="font-serif italic text-ink">und</span> Ethik.
                Wer KI nur durch die Linse der Technologie betrachtet, übersieht
                ihren menschlichen Kontext. Wer nur über Risiken spricht,
                verschenkt ihre Möglichkeiten. Wer nur den Business Case sieht,
                vergisst die Menschen, die sie tragen müssen.
              </p>
              <p>
                Die besten Strategien entstehen dort, wo verschiedene Stimmen
                aufeinandertreffen – und wo zugehört wird, bevor entschieden
                wird. Das ist kein methodischer Zusatz. Das ist der Kern.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                Was wir tun
              </h2>
              <p>
                Rautaki begleitet Organisationen dabei, KI sinnvoll,
                verantwortungsvoll und wirkungsvoll einzusetzen – von der ersten
                Einordnung über strategische Entscheidungen bis zur konkreten
                Umsetzung in Teams und Prozessen.
              </p>
              <ul className="list-none space-y-3 pl-0 pt-1">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-ink">
                      Strategische KI-Beratung
                    </span>{" "}
                    — Klarheit schaffen, bevor investiert wird.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-ink">
                      Transformation von Organisationen
                    </span>{" "}
                    — KI in Strukturen, Prozessen und Kultur verankern.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-ink">
                      Workshops und Trainings
                    </span>{" "}
                    — Führungskräfte und Teams befähigen.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-ink">
                      Praxisorientierte Umsetzung
                    </span>{" "}
                    — Anwendungen, die im Alltag tragen.
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                Unser Ansatz
              </h2>
              <p>Nicht jede Organisation braucht mehr Technologie.</p>
              <p>
                Aber jede Organisation, die KI einsetzen will, braucht eine
                klare Strategie für deren Einsatz – mit Respekt vor der
                Komplexität, mit Offenheit für unterschiedliche Stimmen, und mit
                einem klaren Blick auf das, was wirklich Wert schafft.
              </p>
              <p className="font-serif italic text-[1.25rem] leading-[1.5] text-ink pt-2">
                Dabei helfen wir Ihnen.
              </p>
            </section>
          </div>
        }
        rightContent={
          <div className="relative h-[220px] overflow-hidden border border-ink/10">
            <Image
              src="/images/about/witzthum_portrait.webp"
              alt="Founder portrait preview"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        }
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative h-[400px] lg:h-[460px] bg-charcoal overflow-hidden">
              <Image
                src="/images/about/witzthum_portrait.webp"
                alt="Founder portrait"
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
              Er kommt aus einem Feld, das Ausdauer fordert und
              Umsetzungsstärke verlangt: langjährige Führungsverantwortung in
              nationalen Nonprofit-Organisationen, Transformationsprozesse
              unter realen Bedingungen, der Aufbau agiler Strukturen —
              einschliesslich Holacracy — in Organisationen, die sich
              grundlegend neu ausrichten mussten. Als Diplomierter Verbands-
              und NPO-Manager VMI und Doktor der Philosophie verbindet er
              institutionelles Denken mit dem Anspruch konkreter Wirkung.
              Digitale Transformation war für ihn nie ein Technologieprojekt —
              sondern immer eine Frage der Führung.
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
                      className="mt-[0.65em] h-1.5 w-1.5 flex-none rounded-full bg-gold"
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
                    <span className="font-ui text-body font-medium text-ink leading-snug">
                      {course.title}
                    </span>
                    <span className="font-serif italic text-[0.95rem] text-mid-grey leading-snug">
                      {course.institution}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Meilensteine" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              Wie sich die Praxis entwickelt hat
            </h2>
          </ScrollReveal>

          <div className="relative max-w-reading pl-8">
            <div
              className="absolute left-3 top-1 bottom-1 w-px bg-gold/70"
              aria-hidden="true"
            />
            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 90}>
                <div className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[21px] top-2 h-4 w-4 rounded-full border-2 border-gold bg-white" />
                  <div className="font-serif text-h4 text-gold mb-1">
                    {milestone.year}
                  </div>
                  <p className="font-ui text-body text-ink/65 md:text-mid-grey font-light leading-body">
                    {milestone.event}
                  </p>
                </div>
              </ScrollReveal>
            ))}
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
    </>
  );
}
