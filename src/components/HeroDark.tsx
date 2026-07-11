"use client";

import React, { useEffect, useRef } from "react";
import Logo from "./Logo";
import Button from "./Button";
import Highlight from "./Highlight";
import { getContent } from "@/content";
import type { Locale } from "@/content/types";

interface HeroDarkProps {
  locale: Locale;
  onBookingClick: () => void;
}

// Reduced-motion handling lives entirely in CSS (globals.css neutralises the
// entrance animations; .hero-glow is disabled there explicitly). Reading
// matchMedia during render caused a hydration mismatch for reduced-motion
// users — the server has no window and always rendered the animated styles.
export default function HeroDark({ locale, onBookingClick }: HeroDarkProps) {
  const { headlineLines, intro, ctaTitle, ctaBody, ctaButton } =
    getContent(locale).home.heroDark;
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      if (parallaxRef.current) {
        const y = Math.min(window.scrollY * 0.08, 34);
        parallaxRef.current.style.setProperty("--parallax-y", `${y}px`);
      }
    };
    const sync = () => {
      window.removeEventListener("scroll", onScroll);
      if (!mq.matches)
        window.addEventListener("scroll", onScroll, { passive: true });
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="bg-obsidian grain min-h-[94vh] pt-24 pb-12 grid grid-cols-1 lg:grid-cols-hero-dark relative overflow-hidden">
      <div
        className="hero-glow lg:row-start-1 lg:col-start-1 absolute w-[700px] h-[700px] pointer-events-none"
        style={{
          position: "absolute",
          background:
            "radial-gradient(circle, var(--color-gold-glow) 0%, transparent 70%)",
          top: "-200px",
          left: "-140px",
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
                  // Under prefers-reduced-motion the global CSS collapses this
                  // to 0.01ms — "forwards" then fills opacity:1 instantly.
                  animation: "fade-up 600ms var(--ease-out-expo) forwards",
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {index === 1 ? <Highlight text={line} /> : line}
              </span>
            ))}
          </h1>

          <p className="font-ui text-body font-light leading-body text-white/45 max-w-[470px]">
            {intro}
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
            animation: "clip-reveal 600ms var(--ease-out-expo) both",
            animationDelay: "400ms",
          }}
        >
          <h2 className="font-serif text-h3 tracking-tight-h3 text-obsidian mb-3">
            {ctaTitle}
          </h2>
          <p className="font-ui text-sm text-obsidian/55 mb-6 max-w-narrow">
            {ctaBody}
          </p>
          <Button variant="dark" onClick={onBookingClick} showArrow>
            {ctaButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
