import SectionLabel from "./SectionLabel";

interface HeroLightProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  rightContent?: React.ReactNode;
}

export default function HeroLight({
  label,
  title,
  description,
  rightContent,
}: HeroLightProps) {
  return (
    <section className="bg-white border-t-3 border-gold pt-24">
      <div className="mx-auto max-w-content px-6 sm:px-10 lg:px-20 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-hero-light gap-16 lg:gap-20 items-end">
        <div>
          <SectionLabel text={label} />
          <h1 className="font-serif text-h2 lg:text-h1 font-normal leading-heading tracking-tight text-ink mb-6">
            {title}
          </h1>
          {description && (
            <p className="font-ui text-body font-light leading-body text-ink/65 md:text-mid-grey max-w-reading">
              {description}
            </p>
          )}
        </div>

        {rightContent && (
          <div className="lg:justify-self-end w-full lg:max-w-[360px]">
            {rightContent}
          </div>
        )}
      </div>
    </section>
  );
}
