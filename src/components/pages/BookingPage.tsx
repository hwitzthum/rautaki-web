import type { Metadata } from "next";
import { Suspense } from "react";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { CalInline } from "@/components/CalBooking";
import JsonLd from "@/components/JsonLd";
import Highlight from "@/components/Highlight";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

export function bookingMetadata(locale: Locale): Metadata {
  const c = getContent(locale).booking;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://www.rautaki.ch/booking" },
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: "/booking",
      locale,
    }),
  };
}

export default function BookingPage({ locale }: { locale: Locale }) {
  const c = getContent(locale).booking;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema(
          [{ name: c.breadcrumbLabel, path: "/booking" }],
          locale,
        )}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroLight
        label={c.heroLabel}
        title={<Highlight text={c.heroTitle} />}
        description={<p>{c.heroDescription}</p>}
        rightContent={
          <div className="bg-charcoal border-t-[3px] border-gold p-8">
            <p className="font-ui text-xs uppercase tracking-wide-label text-white/40 mb-6">
              {c.callFactsHeading}
            </p>
            <dl className="space-y-0">
              {c.callFacts.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-baseline justify-between py-4 ${
                    i < c.callFacts.length - 1 ? "border-b border-white/10" : ""
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
            <SectionLabel text={c.expectationsLabel} variant="dark" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {c.expectations.map((item, index) => (
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
            <SectionLabel text={c.calendar.label} />
            <div className="border-t-[3px] border-gold bg-white shadow-card">
              <Suspense
                fallback={<div className="h-96 bg-charcoal animate-pulse" />}
              >
                <CalInline />
              </Suspense>
            </div>
            <p className="mt-4 font-ui text-xs text-mid-grey">
              {c.calendar.note}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
