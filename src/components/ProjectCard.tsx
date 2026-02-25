import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tag: string;
  href: string;
}

export default function ProjectCard({
  image,
  title,
  description,
  tag,
  href,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white overflow-hidden no-underline transition-transform duration-300 hover:-translate-y-[2px]"
    >
      <article>
        <div className="relative h-[260px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-slow group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute left-0 right-0 bottom-0 px-6 py-4 bg-obsidian/90 text-white font-ui text-xs uppercase tracking-wide-label translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            View case study
          </div>
        </div>

        <div className="p-10">
          <div className="font-ui text-xs font-medium uppercase tracking-wide-label text-gold mb-3">
            {tag}
          </div>
          <h3 className="font-serif text-h4 tracking-tight-h4 text-ink font-normal mb-2">
            {title}
          </h3>
          <p className="font-ui text-sm text-ink/65 font-light leading-body">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}
