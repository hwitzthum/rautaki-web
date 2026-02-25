import Image from "next/image";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

const values = [
  {
    title: "Evidence over intuition",
    description:
      "Major AI decisions should be grounded in data, operating constraints, and clear assumptions instead of executive guesswork.",
  },
  {
    title: "Candour under pressure",
    description:
      "We challenge leadership teams directly when ambition and capability are out of sync, especially in high-stakes AI bets.",
  },
  {
    title: "Execution, not just analysis",
    description:
      "Strategy only matters when it changes behaviour. We stay close until plans are embedded in routines, governance, and incentives.",
  },
];

const milestones = [
  { year: "2018", event: "Rautaki founded in Zurich" },
  {
    year: "2019",
    event: "First leadership advisory engagements in finance and industry",
  },
  {
    year: "2021",
    event: "Scaled cross-border transformation work across the DACH region",
  },
  {
    year: "2023",
    event: "Established dedicated AI strategy and model governance practice",
  },
  { year: "2025", event: "Expanded to 40+ organisations advised" },
];

export default function AboutPage() {
  return (
    <>
      <HeroLight
        label="About"
        title={
          <>
            The strategy story behind <em>Rautaki</em>
          </>
        }
        description="Rautaki is a Maori word for strategy. It reflects how we work: clear direction, disciplined execution, and practical leadership in the AI era."
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
            <SectionLabel text="Founder" />
            {/* TODO: Replace with the founder's real name. */}
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Alex Rangi
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              Alex founded Rautaki after seeing how often leadership teams
              either overhype AI or underinvest in the capabilities required to
              use it responsibly.
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
              The firm was built to close that gap: strategy rigor on one side,
              execution reality on the other.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text="Milestones" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              How the practice evolved
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
            <SectionLabel text="Values" variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              Principles that shape our AI advisory work
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
