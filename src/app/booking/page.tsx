import HeroLight from "@/components/HeroLight";
import SectionLabel from "@/components/SectionLabel";
import BookingForm from "@/components/BookingForm";
import ScrollReveal from "@/components/ScrollReveal";

export default function BookingPage() {
  return (
    <>
      <HeroLight
        label="Booking"
        title={
          <>
            Book a focused <em>consultation</em> with Rautaki
          </>
        }
        description="Choose a time that works for you. We will confirm your session within one business day and prepare for a focused discussion on your AI strategy needs."
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-24">
        <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <SectionLabel text="How it works" />
            <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mb-8">
              Reserve your session
            </h2>

            <div className="space-y-6">
              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Step 1
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  Fill out the booking form with your preferred date, time, and
                  topic of discussion.
                </p>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Step 2
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  We review your request and confirm the session within one
                  business day.
                </p>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Step 3
                </div>
                <p className="font-ui text-body text-ink/65 md:text-mid-grey">
                  Join the consultation prepared for a focused discussion on
                  your AI strategy priorities.
                </p>
              </div>

              <div>
                <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-mid-grey mb-1">
                  Prefer email?
                </div>
                <a
                  href="mailto:hello@rautaki.ch"
                  className="font-ui text-body text-ink hover:text-gold transition-colors no-underline"
                >
                  hello@rautaki.ch
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SectionLabel text="Book a consultation" />
            <BookingForm />
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