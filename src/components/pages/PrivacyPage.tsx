import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";
import { pageShareMeta } from "@/lib/og";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

export function privacyMetadata(locale: Locale): Metadata {
  const c = getContent(locale).privacy;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://www.rautaki.ch/privacy" },
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: "/privacy",
      locale,
    }),
  };
}

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const c = getContent(locale).privacy;

  return (
    <>
      <HeroLight
        label={c.heroLabel}
        title={c.heroTitle}
        description={c.heroDescription}
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-reading">
          <ScrollReveal>
            <SectionLabel text={c.responsible.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.responsible.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p>{c.responsible.name}</p>
              {c.responsible.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <a
                  href={`mailto:${c.responsible.email}`}
                  className="text-ink hover:text-gold transition-colors"
                >
                  {c.responsible.email}
                </a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <SectionLabel text={c.collection.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.collection.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4 mb-12">
              <p>{c.collection.para1}</p>
              <p>{c.collection.para2}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <SectionLabel text={c.cookies.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.cookies.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4 mb-12">
              <p>{c.cookies.para1}</p>
              <p>
                {c.cookies.para2a}
                <strong>{c.cookies.cookieSettingsLabel}</strong>
                {c.cookies.para2b}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <SectionLabel text={c.rights.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.rights.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4 mb-12">
              <p>
                {c.rights.para1a}
                <a
                  href={`mailto:${c.rights.email}`}
                  className="text-ink hover:text-gold transition-colors"
                >
                  {c.rights.email}
                </a>
                {c.rights.para1b}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <SectionLabel text={c.providers.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.providers.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4 mb-12">
              <h3 className="font-serif text-h3 text-ink mb-3">
                {c.providers.subheading}
              </h3>
              <ul className="font-sans text-body text-ink space-y-2 list-none">
                {c.providers.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <SectionLabel text={c.contact.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.contact.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4">
              <p>
                {c.contact.para1a}
                <a
                  href={`mailto:${c.contact.email}`}
                  className="text-ink hover:text-gold transition-colors"
                >
                  {c.contact.email}
                </a>
                {c.contact.para1b}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
