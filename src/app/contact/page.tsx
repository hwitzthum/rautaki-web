import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      <HeroLight
        label="Contact"
        title={
          <>
            Start a focused conversation about your <em>AI strategy</em>
          </>
        }
        description="Whether you are evaluating your first AI moves or resetting a programme that has stalled, we can help you define the right next decisions."
        rightContent={
          <a
            href="mailto:hello@rautaki.com"
            className="block border border-ink/15 px-7 py-8 no-underline hover:border-gold transition-colors"
          >
            <div className="font-ui text-xs uppercase tracking-wide-label text-mid-grey mb-2">
              Email directly
            </div>
            <div className="font-serif text-h4 text-ink">hello@rautaki.com</div>
          </a>
        }
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <SectionLabel text="Get in touch" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-8">
              Reach us directly
            </h2>

            <div className="space-y-6">
              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Email
                </div>
                <a
                  href="mailto:hello@rautaki.com"
                  className="font-ui text-body text-ink hover:text-gold transition-colors no-underline"
                >
                  hello@rautaki.com
                </a>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  LinkedIn
                </div>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-ui text-body text-ink hover:text-gold transition-colors no-underline"
                >
                  Follow Rautaki on LinkedIn
                </a>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Response time
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  We typically respond within one business day.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionLabel text="Send a message" />
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-obsidian px-6 sm:px-10 lg:px-20 py-10">
        <div className="mx-auto max-w-content flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-ui text-sm text-white/70">
          <div className="font-ui text-xs uppercase tracking-wide-label text-white/45">
            Zurich Office
          </div>
          <div className="leading-relaxed">
            Rautaki AG, Bahnhofstrasse 10, 8001 Zurich, Switzerland
          </div>
        </div>
      </section>
    </>
  );
}
