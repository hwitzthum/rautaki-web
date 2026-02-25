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
    title: "Enterprise AI Transformation Blueprint",
    description:
      "Defined a three-year AI operating model for a major Swiss financial institution, aligning governance, model rollout, and leadership accountability.",
    tag: "Finance",
    href: "/contact",
  },
  {
    image: "/images/work/clinical-ai-prioritisation-framework.webp",
    title: "Clinical AI Prioritisation Framework",
    description:
      "Built an AI opportunity map for a regional hospital group, focusing investment on high-impact diagnostics and workflow automation.",
    tag: "Healthcare",
    href: "/contact",
  },
  {
    image: "/images/work/saas-product-intelligence-roadmap.webp",
    title: "SaaS Product Intelligence Roadmap",
    description:
      "Translated product strategy into a phased AI capability roadmap, increasing retention and accelerating premium feature adoption.",
    tag: "Technology",
    href: "/contact",
  },
  {
    image: "/images/work/ai-enabled-operations-programme.webp",
    title: "AI-Enabled Operations Programme",
    description:
      "Reworked manufacturing planning with predictive models and leadership routines that reduced cycle-time volatility across four plants.",
    tag: "Manufacturing",
    href: "/contact",
  },
  {
    image: "/images/work/education-platform-decision-intelligence.webp",
    title: "Education Platform Decision Intelligence",
    description:
      "Designed a model-governed experimentation approach to improve acquisition efficiency and reduce expansion risk across DACH markets.",
    tag: "Education",
    href: "/contact",
  },
  {
    image: "/images/work/retail-demand-and-pricing-strategy.webp",
    title: "Retail Demand and Pricing Strategy",
    description:
      "Combined AI demand forecasting with leadership planning cadences, producing a measurable uplift in margin and stock precision.",
    tag: "Retail",
    href: "/contact",
  },
];

export default function WorkPage() {
  const [featured, ...rest] = projects;

  return (
    <>
      <HeroLight
        label="Our Work"
        title={
          <>
            Selected partnerships shaping measurable <em>AI impact</em>
          </>
        }
        description="Representative engagements where we helped executive teams define priorities, manage risk, and execute AI-driven transformation."
        rightContent={
          <div className="bg-cream border border-ink/10 px-8 py-9">
            <div className="font-serif text-[56px] leading-none text-ink">24</div>
            <div className="mt-2 font-ui text-xs uppercase tracking-wide-label text-mid-grey">
              AI projects supported since 2018
            </div>
          </div>
        }
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content">
          <SectionLabel text="Case Studies" />

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
                    Featured | {featured.tag}
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
              &ldquo;Rautaki helped us decide where AI should matter most, then
              gave our executive team the operating discipline to deliver
              it.&rdquo;
            </blockquote>
            <div className="font-ui text-xs uppercase tracking-wide-label text-white/55">
              Chief Strategy Officer, Zurich-based Private Bank
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <blockquote className="font-serif text-h4 tracking-tight-h4 font-normal italic leading-card text-white mb-6">
              &ldquo;Their advice was direct, evidence-led, and practical. Within
              six months, our AI programme moved from scattered pilots to
              aligned execution.&rdquo;
            </blockquote>
            <div className="font-ui text-xs uppercase tracking-wide-label text-white/55">
              COO, Regional Healthcare Network (DACH)
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
