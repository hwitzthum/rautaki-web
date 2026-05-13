"use client";

import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  source?: string;
}

interface StatBlockProps {
  stats: Stat[];
}

export default function StatBlock({ stats }: StatBlockProps) {
  return (
    <div className="flex flex-col gap-9">
      {stats.map((stat, index) => (
        <ScrollReveal key={stat.label} delay={index * 100}>
          <div className="pl-5 border-l-2 border-gold">
            <div className="font-serif text-d1 leading-none text-ink">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 font-ui text-xs font-medium uppercase tracking-wide-mid text-mid-grey">
              {stat.label}
            </div>
            {stat.source && (
              <div className="mt-1 font-ui text-xs font-light leading-snug text-ink/45 not-italic">
                {stat.source}
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
