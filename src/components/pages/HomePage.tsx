import type { Metadata } from "next";
import ServiceCards from "@/components/ServiceCards";
import SectionLabel from "@/components/SectionLabel";
import StatBlock from "@/components/StatBlock";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import ScrollReveal from "@/components/ScrollReveal";
import HeroWithBooking from "@/components/BookingTrigger";
import Highlight from "@/components/Highlight";
import { getContent } from "@/content";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/types";

export function homeMetadata(_locale: Locale): Metadata {
  // Home inherits the site-wide title/description/canonical from the root
  // layout — no page-level metadata override.
  void _locale;
  return {};
}

export default function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale).home;

  return (
    <>
      <HeroWithBooking locale={locale} />

      {/* ── Referenzen-Streifen ─────────────────────────── */}
      <div className="bg-charcoal border-b border-white/5 overflow-hidden py-5">
        <ScrollReveal>
          <p className="text-center font-ui text-xs uppercase tracking-wide-label text-white/45 mb-4">
            {c.credentialsLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6 sm:px-10 lg:px-20 max-w-content mx-auto">
            {c.credentials.map((name) => (
              <span
                key={name}
                className="font-ui text-xs text-white/45 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* ── KI-Wirkung (Problem) ────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-hero-light gap-20 items-center">
          <ScrollReveal>
            <SectionLabel text={c.problem.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              <Highlight text={c.problem.heading} />
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/45 md:text-mid-grey max-w-narrow">
              {c.problem.body}
            </p>
          </ScrollReveal>

          <StatBlock stats={c.stats} />
        </div>
      </section>

      <ServiceCards locale={locale} />

      {/* ── Warum Rautaki ───────────────────────────────── */}
      <section className="bg-white px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={c.why.label} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-12">
              <Highlight text={c.why.heading} />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {c.why.items.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="border-l-2 border-gold pl-5">
                  <h3 className="font-serif text-h4 text-ink font-normal mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-ui text-sm font-light leading-body text-mid-grey">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <div className="flex justify-center">
            <SectionLabel text={c.cta.label} variant="dark" />
          </div>
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4 mt-10">
            {c.cta.heading}
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/45 mb-10 max-w-reading mx-auto">
            {c.cta.body}
          </p>
          <Button
            href={localePath(locale, "/booking")}
            variant="gold"
            showArrow
          >
            {c.cta.button}
          </Button>
          <p className="font-ui text-sm font-light text-white/45 mt-8">
            {c.cta.pricePrefix}
            <a
              href={localePath(locale, "/services#preise")}
              className="text-white/45 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
            >
              {c.cta.priceLinkLabel}
            </a>
            {c.cta.priceSuffix}
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
