"use client";

import { useEffect, useRef } from "react";
import Logo from "./Logo";
import Button from "./Button";

interface HeroDarkProps {
  onBookingClick: () => void;
}

const headlineLines = ["Strategie", "im KI-Zeitalter", "mit Wirkung."];

export default function HeroDark({ onBookingClick }: HeroDarkProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        const y = Math.min(window.scrollY * 0.08, 34);
        parallaxRef.current.style.transform = `translateY(calc(-50% + ${y}px))`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-obsidian grain min-h-[94vh] pt-24 pb-12 grid grid-cols-1 lg:grid-cols-hero-dark relative overflow-hidden">
      <div
        className="absolute w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-glow) 0%, transparent 70%)",
          top: "-200px",
          left: "-140px",
          animation: "glow-drift 600ms ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="px-6 sm:px-10 lg:px-20 py-12 lg:py-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
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
                  animation: "fade-up 600ms var(--ease-out-expo) forwards",
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {index === 1 ? <em>{line}</em> : line}
              </span>
            ))}
          </h1>

          <p className="font-ui text-body font-light leading-body text-white/45 max-w-[470px]">
            Wir helfen Führungsteams, KI-Ambition in umsetzbare Strategie zu
            verwandeln und Modellpotenzial, operationelle Risiken sowie
            organisationsweite Anpassung auszubalancieren.
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-10 lg:px-20 py-12 lg:py-16 flex flex-col justify-end relative">
        <div
          ref={parallaxRef}
          className="absolute font-serif text-white/[0.025] pointer-events-none select-none hidden lg:block"
          style={{
            fontSize: "500px",
            top: "50%",
            right: "-44px",
            transform: "translateY(-50%)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          R
        </div>

        <div
          className="bg-gold p-9 md:p-10 mb-8 relative"
          style={{
            animation: "clip-reveal 600ms var(--ease-out-expo) both",
            animationDelay: "400ms",
          }}
        >
          <h2 className="font-serif text-h3 tracking-tight-h3 text-obsidian mb-3">
            Entwickeln Sie eine belastbare KI-Strategie
          </h2>
          <p className="font-ui text-sm text-black/55 mb-6 max-w-[420px]">
            Reservieren Sie eine Beratung, um Prioritäten,
            Governance-Entscheide und die Führungskompetenzen für Ihre nächste
            Phase zu klären.
          </p>
          <Button variant="dark" onClick={onBookingClick} showArrow>
            Beratung reservieren
          </Button>
        </div>
      </div>
    </section>
  );
}