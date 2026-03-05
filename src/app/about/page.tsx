import Image from "next/image";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

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
    event: "Erste Beratungsmandate für Führungsteams in Finanz- und Industrieunternehmen",
  },
  {
    year: "2021",
    event: "Skalierung grenzüberschreitender Transformationsarbeit in der DACH-Region",
  },
  {
    year: "2023",
    event: "Aufbau einer dedizierten Praxis für KI-Strategie und Modell-Governance",
  },
  { year: "2025", event: "Ausweitung auf über 40 beratene Organisationen" },
];

function BrandRautaki() {
  return (
    <strong className="inline-flex items-baseline font-serif font-black tracking-tight text-obsidian whitespace-nowrap">
      Raut<span className="text-gold">a</span>k<span className="text-gold">i</span>
    </strong>
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroLight
        label="Über uns"
        title={
          <>
            <BrandRautaki /> - Strategie für das Zeitalter der Künstlichen Intelligenz
          </>
        }
        descriptionClassName="max-w-[70ch] font-ui text-[1.05rem] md:text-[1.125rem] font-medium leading-[1.88] text-obsidian"
        description={
          <div className="space-y-6">
            <p className="rounded-r-sm border-l-2 border-gold bg-cream/55 px-5 py-3">
              Der Name <BrandRautaki /> stammt aus der Sprache der Māori und
              bedeutet Strategie. Eine gute Strategie schafft Orientierung,
              verbindet Menschen und macht Zukunft gestaltbar.
            </p>
            <p>
              Genau darum geht es bei <BrandRautaki />.
            </p>
            <p>
              Organisationen stehen heute vor einer der grössten
              Transformationen unserer Zeit: Künstliche Intelligenz verändert,
              wie wir arbeiten, entscheiden und Innovation schaffen.
            </p>
            <p>Doch Technologie allein ist keine Strategie.</p>
            <p>
              <BrandRautaki /> unterstützt Organisationen dabei, KI sinnvoll,
              verantwortungsvoll und wirkungsvoll einzusetzen - von der ersten
              Einordnung über strategische Entscheidungen bis zur konkreten
              Umsetzung in Teams und Prozessen.
            </p>
            <p>
              Der Name trägt dabei eine besondere Symbolik: Im Wort <BrandRautaki />
              stecken die Buchstaben A und I - die Initialen von Artificial
              Intelligence.
            </p>
            <p>Strategie und KI gehören zusammen.</p>
            <div>
              <p className="mb-3">
                <BrandRautaki /> verbindet beides:
              </p>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                  <span>Strategische KI-Beratung</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                  <span>Transformation von Organisationen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                  <span>Workshops und Trainings für Führungskräfte und Teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                  <span>Praxisorientierte Umsetzung von KI-Anwendungen</span>
                </li>
              </ul>
            </div>
            <p>
              Unser Ansatz ist klar: Nicht jede Organisation braucht mehr
              Technologie.
            </p>
            <p>
              Aber jede Organisation braucht eine klare Strategie für den Umgang
              mit KI.
            </p>
            <p>
              <BrandRautaki /> hilft Ihnen, diese Strategie zu entwickeln.
            </p>
          </div>
        }
        rightContent={
          <div className="relative h-[220px] overflow-hidden border border-ink/10">
            <Image
              src="/images/about/founder-portrait.webp"
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
                src="/images/about/founder-portrait.webp"
                alt="Founder portrait"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionLabel text="Gründung" />
            {/* TODO: Replace with the founder's real name. */}
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Alex Rangi
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              Alex gründete Rautaki, nachdem er gesehen hatte, wie häufig
              Führungsteams KI entweder überhöhen oder zu wenig in die nötigen
              Fähigkeiten für einen verantwortungsvollen Einsatz investieren.
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
              Die Firma wurde gebaut, um genau diese Lücke zu schliessen:
              strategische Stringenz auf der einen, Umsetzungsrealität auf der
              anderen Seite.
            </p>
          </ScrollReveal>
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
            <div className="absolute left-3 top-1 bottom-1 w-px bg-gold/70" aria-hidden="true" />
            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 90}>
                <div className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[21px] top-2 h-4 w-4 rounded-full border-2 border-gold bg-white" />
                  <div className="font-serif text-h4 text-gold mb-1">{milestone.year}</div>
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

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2px" }}>
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
