"use client";

import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";

interface HeroDarkProps {
  onBookingClick: () => void;
}

const headlineLines = ["Strategie", "im KI-Zeitalter", "mit Wirkung."];

export default function HeroDark({ onBookingClick }: HeroDarkProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const onScroll = () => {
      if (parallaxRef.current) {
        const y = Math.min(window.scrollY * 0.08, 34);
        parallaxRef.current.style.setProperty("--parallax-y", `${y}px`);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReduced]);

  return (
    <section className="bg-obsidian grain min-h-[94vh] pt-24 pb-12 grid grid-cols-1 lg:grid-cols-hero-dark relative overflow-hidden">
      <div
        className="lg:row-start-1 lg:col-start-1 absolute w-[700px] h-[700px] pointer-events-none"
        style={{
          position: "absolute",
          background:
            "radial-gradient(circle, var(--color-gold-glow) 0%, transparent 70%)",
          top: "-200px",
          left: "-140px",
          animation: prefersReduced
            ? undefined
            : "glow-drift 12s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="lg:row-start-1 lg:col-start-1 px-6 sm:px-10 lg:px-20 py-12 lg:py-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
        <div>
          <Logo size="xl" variant="dark" showTagline />
        </div>

        <div className="mt-14 lg:mt-0">
          <h1 className="font-serif font-normal leading-display tracking-tighter text-white mb-7 text-fluid-hero">
            {headlineLines.map((line, index) => (
              <span
                key={line}
                className="block opacity-0"
                style={{
                  animation: prefersReduced
                    ? undefined
                    : "fade-up 600ms var(--ease-out-expo) forwards",
                  animationDelay: prefersReduced
                    ? undefined
                    : `${index * 80}ms`,
                  opacity: prefersReduced ? 1 : undefined,
                }}
              >
                {index === 1 ? (
                  <>
                    im <span className="italic text-gold">KI-Zeitalter</span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="font-ui text-body font-light leading-body text-white/45 max-w-[470px]">
            Wir verbinden strategische Beratung für Geschäftsleitungen und
            Verwaltungsräte mit akkreditierter Weiterbildung — von der
            Standortbestimmung bis zur produktionsreifen Lösung. Mit besonderer
            Erfahrung im NPO-, Sozial- und öffentlichen Sektor.
          </p>
        </div>
      </div>

      <div className="lg:row-start-1 lg:col-start-2 px-6 sm:px-10 lg:px-20 py-12 lg:py-16 flex flex-col justify-end relative">
        <div
          ref={parallaxRef}
          className="absolute font-serif text-white/[0.025] pointer-events-none select-none hidden lg:block"
          style={{
            fontSize: "500px",
            top: "50%",
            right: "-44px",
            transform: "translateY(calc(-50% + var(--parallax-y, 0px)))",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          R
        </div>

        {/* Gold CTA card */}
        <div
          className="bg-gold p-9 md:p-10 mb-8 relative"
          style={{
            animation: prefersReduced
              ? undefined
              : "clip-reveal 600ms var(--ease-out-expo) both",
            animationDelay: prefersReduced ? undefined : "400ms",
          }}
        >
          <h2 className="font-serif text-h3 tracking-tight-h3 text-obsidian mb-3">
            Entwickeln Sie eine belastbare KI-Strategie
          </h2>
          <p className="font-ui text-sm text-obsidian/55 mb-6 max-w-narrow">
            Im Erstgespräch klären wir Prioritäten, Governance-Entscheide und
            die Führungskompetenzen für Ihre nächste Phase.
          </p>
          <Button variant="dark" onClick={onBookingClick} showArrow>
            Erstgespräch vereinbaren
          </Button>
        </div>
      </div>
    </section>
  );
}
