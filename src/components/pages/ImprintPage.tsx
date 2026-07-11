import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";
import { pageShareMeta } from "@/lib/og";
import { localePath, pageAlternates } from "@/lib/i18n";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

export function imprintMetadata(locale: Locale): Metadata {
  const c = getContent(locale).imprint;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(locale, "/imprint"),
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: localePath(locale, "/imprint"),
      locale,
    }),
  };
}

export default function ImprintPage({ locale }: { locale: Locale }) {
  const c = getContent(locale).imprint;

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
            <SectionLabel text={c.company.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.company.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p className="font-medium text-ink">{c.company.name}</p>
              {c.company.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="font-sans text-body text-ink">
                <strong>{c.company.legalFormLabel}</strong>{" "}
                {c.company.legalFormValue}
              </p>
              <p className="font-sans text-body text-ink">
                <strong>{c.company.uidLabel}</strong> {c.company.uidValue}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <SectionLabel text={c.contact.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.contact.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p>
                {c.contact.emailPrefix}
                <a
                  href={`mailto:${c.contact.email}`}
                  className="text-ink hover:text-gold transition-colors"
                >
                  {c.contact.email}
                </a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <SectionLabel text={c.representation.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.representation.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-1 mb-12">
              <p>{c.representation.person}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <SectionLabel text={c.liability.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              {c.liability.heading}
            </h2>
            <div className="font-ui text-body text-ink/65 space-y-4">
              <p>{c.liability.para1}</p>
              <p>{c.liability.para2}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
