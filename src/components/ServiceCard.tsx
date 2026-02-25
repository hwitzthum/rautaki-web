import Link from "next/link";

interface ServiceCardProps {
  number: string;
  title: React.ReactNode;
  description: string;
  href: string;
}

export default function ServiceCard({
  number,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-charcoal p-12 relative overflow-hidden transition-transform duration-300 hover:-translate-y-[2px] hover:bg-charcoal-hover no-underline"
    >
      <article>
        <div
          className="absolute top-0 left-0 w-[3px] h-0 bg-gold transition-all duration-slow ease-out group-hover:h-full"
          aria-hidden="true"
        />

        <div
          className="font-serif text-white/[0.04] leading-none pointer-events-none select-none -mb-4 hidden md:block"
          style={{ fontSize: "80px", letterSpacing: "-0.05em" }}
          aria-hidden="true"
        >
          {number}
        </div>

        <h3 className="font-serif text-h3 tracking-tight-h3 text-white font-normal mb-3">
          {title}
        </h3>

        <p className="font-ui text-sm leading-body text-white/55 font-light">
          {description}
        </p>

        <div className="mt-6 font-ui text-xs uppercase tracking-wide-label text-gold/80">
          Learn more
        </div>
      </article>
    </Link>
  );
}
