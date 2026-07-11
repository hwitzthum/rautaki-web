import Button from "./Button";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ServiceCard from "./ServiceCard";
import Highlight from "./Highlight";
import { services } from "@/content/de/services";
import { home } from "@/content/de/home";

export default function ServiceCards() {
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
                number={service.number}
                title={
                  <Highlight
                    text={service.title}
                    spanClassName="text-gold italic"
                  />
                }
                description={service.shortDesc}
                href={`/services#${service.slug}`}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button href="/services" variant="gold" showArrow>
            {home.serviceCards.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
