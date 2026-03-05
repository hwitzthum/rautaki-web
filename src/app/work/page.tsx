import Image from "next/image";
import Link from "next/link";
import HeroLight from "@/components/HeroLight";
import GoldRule from "@/components/GoldRule";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";

const projects = [
  {
    image: "/images/work/enterprise-ai-transformation-blueprint.webp",
    title: "Blueprint für KI-Transformation im Unternehmen",
    description:
      "Entwicklung eines dreijährigen KI-Betriebsmodells für ein grosses Schweizer Finanzinstitut mit abgestimmter Governance, Modell-Rollout und Führungsverantwortung.",
    tag: "Finanzwesen",
    href: "/booking",
  },
  {
    image: "/images/work/clinical-ai-prioritisation-framework.webp",
    title: "Rahmenwerk zur Priorisierung klinischer KI",
    description:
      "Erstellung einer KI-Chancenkarte für eine regionale Spitalgruppe mit Fokus auf Investitionen in wirkungsstarke Diagnostik und Workflow-Automatisierung.",
    tag: "Gesundheitswesen",
    href: "/booking",
  },
  {
    image: "/images/work/saas-product-intelligence-roadmap.webp",
    title: "Roadmap für SaaS-Produktintelligenz",
    description:
      "Übersetzung der Produktstrategie in eine stufenweise Roadmap für KI-Fähigkeiten mit höherer Bindung und schnellerer Einführung von Premium-Funktionen.",
    tag: "Technologie",
    href: "/booking",
  },
  {
    image: "/images/work/ai-enabled-operations-programme.webp",
    title: "Programm für KI-gestützte Abläufe",
    description:
      "Neuausrichtung der Produktionsplanung mit prädiktiven Modellen und Führungsroutinen, die die Zykluszeit-Volatilität über vier Werke hinweg reduzierten.",
    tag: "Produktion",
    href: "/booking",
  },
  {
    image: "/images/work/education-platform-decision-intelligence.webp",
    title: "Decision Intelligence für eine Bildungsplattform",
    description:
      "Entwicklung eines modellgesteuerten Experimentieransatzes zur Verbesserung der Akquisitionseffizienz und zur Senkung von Expansionsrisiken in DACH-Märkten.",
    tag: "Bildung",
    href: "/booking",
  },
  {
    image: "/images/work/retail-demand-and-pricing-strategy.webp",
    title: "Strategie für Nachfrage und Preisgestaltung im Detailhandel",
    description:
      "Verknüpfung von KI-Nachfrageprognosen mit Führungsrhythmen, was zu einem messbaren Anstieg bei Marge und Warenverfügbarkeit führte.",
    tag: "Detailhandel",
    href: "/booking",
  },
];

export default function WorkPage() {
  const [featured, ...rest] = projects;

  return (
    <>
      <HeroLight
        label="Unsere Arbeit"
        title={
          <>
            Ausgewählte Partnerschaften mit messbarer <em>KI-Wirkung</em>
          </>
        }
        description="Beispielhafte Mandate, in denen wir Führungsteams unterstützt haben, Prioritäten zu setzen, Risiken zu steuern und KI-getriebene Transformation umzusetzen."
        rightContent={
          <div className="bg-cream border border-ink/10 px-8 py-9">
            <div className="font-serif text-[56px] leading-none text-ink">24</div>
            <div className="mt-2 font-ui text-xs uppercase tracking-wide-label text-mid-grey">
              Seit 2018 unterstützte KI-Projekte
            </div>
          </div>
        }
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <SectionLabel text="Fallbeispiele" />

          <ScrollReveal>
            <Link
              href={featured.href}
              className="group block bg-white overflow-hidden no-underline"
            >
              <article className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-slow group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <div className="font-ui text-xs uppercase tracking-wide-label text-gold mb-3">
                    Ausgewählt | {featured.tag}
                  </div>
                  <h2 className="font-serif text-h2 tracking-tight-h2 font-normal text-ink mb-4">
                    {featured.title}
                  </h2>
                  <p className="font-ui text-body font-light text-ink/65 md:text-mid-grey leading-body">
                    {featured.description}
                  </p>
                  <div className="mt-8 font-ui text-xs uppercase tracking-wide-label text-ink/60 group-hover:text-gold transition-colors">
                    View case study
                  </div>
                </div>
              </article>
            </Link>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 80}>
                <ProjectCard {...project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GoldRule />

      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-32">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ScrollReveal>
            <blockquote className="font-serif text-h4 tracking-tight-h4 font-normal italic leading-card text-white mb-6">
              &ldquo;Rautaki half uns zu entscheiden, wo KI am meisten Wirkung
              entfalten soll, und gab unserem Führungsteam die operative
              Disziplin für die Umsetzung.&rdquo;
            </blockquote>
            <div className="font-ui text-xs uppercase tracking-wide-label text-white/55">
              Chief Strategy Officer, Zürcher Privatbank
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <blockquote className="font-serif text-h4 tracking-tight-h4 font-normal italic leading-card text-white mb-6">
              &ldquo;Ihre Beratung war direkt, evidenzbasiert und praxisnah.
              Innerhalb von sechs Monaten wechselte unser KI-Programm von
              verstreuten Piloten zu abgestimmter Umsetzung.&rdquo;
            </blockquote>
            <div className="font-ui text-xs uppercase tracking-wide-label text-white/55">
              COO, Regionales Gesundheitsnetzwerk (DACH)
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
