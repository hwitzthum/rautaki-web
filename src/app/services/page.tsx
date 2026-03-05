import Image from "next/image";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export default function ServicesPage() {
  const [firstService, secondService, thirdService] = services;

  return (
    <>
      <HeroLight
        label="Unsere Leistungen"
        title={
          <>
            Strategie, Beratung und Umsetzung für das <em>KI-Zeitalter</em>
          </>
        }
        description="Drei Leistungsbereiche, die Führungsteams dabei unterstützen, Richtung zu setzen, Risiken zu steuern und KI-Initiativen von der Idee zur organisationalen Fähigkeit zu entwickeln."
        rightContent={
          <div className="hidden lg:block space-y-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="font-serif text-[40px] leading-none text-ink/25"
              >
                {service.titlePlain}
              </div>
            ))}
          </div>
        }
      />

      <section className="bg-obsidian px-6 sm:px-10 lg:px-20 py-20">
        <div className="mx-auto max-w-content">
          <SectionLabel text="Was wir tun" variant="dark" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ gap: "2px" }}>
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 80}>
                <ServiceCard
                  number={service.number}
                  title={service.title}
                  description={service.shortDesc}
                  href={`#${service.slug}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id={firstService.slug} className="bg-white px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 items-start">
          <div>
            <SectionLabel text={firstService.titlePlain} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Definieren Sie, wo KI Wettbewerbsvorteile schafft
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading">
              {firstService.longDesc}
            </p>
          </div>

          <div className="relative h-[440px] lg:h-[520px] overflow-hidden">
            <Image
              src={firstService.image}
              alt={firstService.titlePlain}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>
        </ScrollReveal>
      </section>

      <section id={secondService.slug} className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] gap-10 items-center">
          <div className="relative h-[340px] lg:h-[420px] overflow-hidden lg:order-1">
            <Image
              src={secondService.image}
              alt={secondService.titlePlain}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="lg:order-2">
            <SectionLabel text={secondService.titlePlain} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6">
              Treffen Sie KI-Entscheide mit hoher Tragweite mit Sicherheit
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading">
              {secondService.longDesc}
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id={thirdService.slug} className="bg-white px-6 sm:px-10 lg:px-20 pt-24 pb-28 overflow-hidden">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <SectionLabel text={thirdService.titlePlain} />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-6 max-w-reading">
              Machen Sie aus Strategie KI-Fähigkeit mit operativer Geschwindigkeit
            </h2>
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading">
              {thirdService.longDesc}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-14">
          <div className="relative h-[360px] md:h-[460px] lg:h-[560px] -mx-6 sm:-mx-10 lg:-mx-20">
            <Image
              src={thirdService.image}
              alt={thirdService.titlePlain}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </ScrollReveal>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-32">
        <ScrollReveal className="mx-auto max-w-content text-center">
          <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-white mb-4">
            Bereit, Ihre KI-Strategie aufzubauen?
          </h2>
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10 max-w-reading mx-auto">
            Wir können Ihre strategische Ausgangslage rasch bewerten und einen
            praxisnahen Weg zu messbarem Wert definieren.
          </p>
          <Button href="/booking" variant="gold" showArrow>
            Book a consultation
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
