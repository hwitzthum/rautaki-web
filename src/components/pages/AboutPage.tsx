import type { Metadata } from "next";
import Image from "next/image";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldRule from "@/components/GoldRule";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import Highlight from "@/components/Highlight";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

export function aboutMetadata(locale: Locale): Metadata {
  const c = getContent(locale).about;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://www.rautaki.ch/about" },
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: "/about",
      locale,
    }),
  };
}

const INLANGUAGE: Record<Locale, string> = {
  de: "de-CH",
  en: "en-GB",
};

function BrandRautaki() {
  return (
    <span className="inline-flex items-baseline font-serif font-normal text-obsidian whitespace-nowrap">
      Raut<span className="text-gold">a</span>k
      <span className="text-gold">i</span>
    </span>
  );
}

export default function AboutPage({ locale }: { locale: Locale }) {
  const c = getContent(locale).about;
  const inLanguage = INLANGUAGE[locale];

  // Marks /about as the canonical profile page for the founder entity defined
  // in the site-wide @graph (layout.tsx) — strengthens E-A-T signals for AI.
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": ["AboutPage", "ProfilePage"],
    "@id": "https://www.rautaki.ch/about#page",
    url: "https://www.rautaki.ch/about",
    name: c.schema.profileName,
    inLanguage,
    isPartOf: { "@id": "https://www.rautaki.ch/#website" },
    about: { "@id": "https://www.rautaki.ch/#organization" },
    mainEntity: { "@id": "https://www.rautaki.ch/#harry-witzthum" },
  };

  // The CAS teaching engagements as Course entities with the founder as
  // instructor — turns the strongest credential signal from prose into
  // machine-readable authority (third-party institutions, linkable URLs).
  const teachingSchemas = c.teachingCourses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    url: course.url,
    inLanguage,
    provider: {
      "@type": "EducationalOrganization",
      name: course.institution,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      instructor: { "@id": "https://www.rautaki.ch/#harry-witzthum" },
    },
  }));

  return (
    <>
      <JsonLd
        schema={[
          profilePageSchema,
          ...teachingSchemas,
          breadcrumbSchema(
            [{ name: c.breadcrumbLabel, path: "/about" }],
            locale,
          ),
        ]}
      />
      <HeroLight
        label={c.heroLabel}
        title={<BrandRautaki />}
        descriptionClassName="max-w-[70ch] font-ui text-body font-light leading-body text-ink"
        description={
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                <Highlight text={c.hero.tagline} />
              </p>
              <div
                className="h-[3px] w-32 bg-gradient-to-r from-gold to-transparent"
                aria-hidden="true"
              />
            </div>

            <section className="space-y-4">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                <Highlight text={c.hero.nameHeading} />
              </h2>
              <p>
                <span className="font-serif italic text-ink">
                  {c.hero.brandRautaki}
                </span>{" "}
                {c.hero.namePara1Mid}{" "}
                <span className="font-serif italic text-ink">
                  {c.hero.brandStrategie}
                </span>
                .
              </p>
              <p>{c.hero.namePara2}</p>
              <p>{c.hero.namePara3}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-h3 tracking-tight-h3 leading-heading text-ink font-normal">
                {c.hero.whyHeading}
              </h2>
              <p>{c.hero.whyPara1}</p>
              <p>
                {c.hero.whyPara2Prefix}{" "}
                <span className="font-serif italic text-ink">
                  {c.hero.brandRautaki}
                </span>{" "}
                {c.hero.whyPara2Seg1}{" "}
                <span className="font-serif font-medium text-gold">
                  {c.hero.brandA}
                </span>{" "}
                {c.hero.whyPara2And}{" "}
                <span className="font-serif font-medium text-gold">
                  {c.hero.brandI}
                </span>{" "}
                {c.hero.whyPara2Seg3}{" "}
                <span className="font-serif italic text-ink">
                  {c.hero.brandAI}
                </span>
                {c.hero.whyPara2Seg4}
              </p>
            </section>
          </div>
        }
        rightContent={
          <div className="flex flex-col gap-0">
            <div className="relative h-[420px] overflow-hidden">
              <Image
                src="/images/about/witzthum_portrait.webp"
                alt={c.hero.portraitAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 380px"
                priority
              />
            </div>
            <div className="border border-t-0 border-ink/10 px-5 py-4 bg-white/60">
              <p className="font-ui text-xs uppercase tracking-wide-label text-mid-grey">
                {c.hero.portraitName}
              </p>
              <p className="font-serif italic text-sm text-ink/60 leading-snug mt-0.5">
                {c.hero.portraitRole}
              </p>
            </div>
          </div>
        }
      />

      {/* ── Perspektiven ──────────────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.perspective.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              <Highlight text={c.perspective.heading} />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
            <ScrollReveal>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
                {c.perspective.para1a}{" "}
                <span className="font-serif italic text-ink">
                  {c.perspective.und}
                </span>{" "}
                {c.perspective.para1b}{" "}
                <span className="font-serif italic text-ink">
                  {c.perspective.und}
                </span>{" "}
                {c.perspective.para1c}{" "}
                <span className="font-serif italic text-ink">
                  {c.perspective.und}
                </span>{" "}
                {c.perspective.para1d}
              </p>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
                {c.perspective.para2}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
                {c.perspective.para3}
              </p>
              <p className="font-serif italic text-body leading-body text-ink border-l-2 border-gold pl-5">
                {c.perspective.quote}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Was wir tun ───────────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.work.label} variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              {c.work.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {c.work.items.map((item, index) => (
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
            <SectionLabel text={c.approach.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              {c.approach.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-center">
            <ScrollReveal>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
                {c.approach.para1}
              </p>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
                {c.approach.para2}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="font-serif italic text-h3 leading-heading text-ink border-l-2 border-gold pl-6">
                {c.approach.quote}
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
                alt={c.founding.portraitAlt}
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionLabel text={c.founding.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.founding.heading}
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              {c.founding.para1}
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              {c.founding.para2}
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey mb-4">
              {c.founding.para3}
            </p>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey">
              {c.founding.para4}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-warm-grey px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content space-y-20">
          <div>
            <ScrollReveal>
              <SectionLabel text={c.workshops.label} />
              <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-4">
                {c.workshops.heading}
              </h2>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading mb-10">
                {c.workshops.intro}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 list-none pl-0 border-t border-ink/10">
                {c.workshopClients.map((client) => (
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
              <SectionLabel text={c.teaching.label} />
              <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-4">
                {c.teaching.heading}
              </h2>
              <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading mb-10">
                {c.teaching.intro}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <ul className="list-none pl-0 max-w-reading border-t border-ink/10">
                {c.teachingCourses.map((course) => (
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
            <SectionLabel text={c.valuesSection.label} variant="dark" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-12">
              {c.valuesSection.heading}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {c.values.map((value, index) => (
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
              {c.cta.eyebrow}
            </p>
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.cta.heading}
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 max-w-narrow mx-auto mb-10">
              {c.cta.body}
            </p>
            <Button href="/booking" variant="gold" showArrow>
              {c.cta.button}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
