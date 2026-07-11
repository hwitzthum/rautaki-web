import Button from "./Button";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ServiceCard from "./ServiceCard";
import Highlight from "./Highlight";
import { getContent } from "@/content";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/types";

export default function ServiceCards({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const home = content.home;
  const services = content.services;

  return (
    <section className="bg-obsidian px-6 sm:px-10 lg:px-20 py-24 grain">
      <div className="mx-auto max-w-content">
        <SectionLabel text={home.serviceCards.label} variant="dark" />

        <h2 className="font-serif text-h2 text-white mb-6">
          <Highlight text={home.serviceCards.heading} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {services.items.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 90}>
              <ServiceCard
                locale={locale}
                number={service.number}
                title={
                  <Highlight
                    text={service.title}
                    spanClassName="text-gold italic"
                  />
                }
                description={service.shortDesc}
                href={localePath(locale, `/services#${service.slug}`)}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            href={localePath(locale, "/services")}
            variant="gold"
            showArrow
          >
            {home.serviceCards.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
