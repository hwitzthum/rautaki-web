import Button from "./Button";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

export default function ServiceCards() {
  return (
    <section className="bg-obsidian px-6 sm:px-10 lg:px-20 py-24 grain">
      <div className="mx-auto max-w-content">
        <SectionLabel text="Leistungen" variant="dark" />

        <h2 className="font-serif text-h2 text-white mb-6">
          Unsere <span className="italic text-gold">Leistungen</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 90}>
              <ServiceCard
                number={service.number}
                title={service.title}
                description={service.shortDesc}
                href={`/services#${service.slug}`}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button href="/services" variant="gold" showArrow>
            Unsere Leistungen entdecken
          </Button>
        </div>
      </div>
    </section>
  );
}
