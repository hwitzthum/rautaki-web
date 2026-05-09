"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1200,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimatedRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const timeoutId = window.setTimeout(() => {
        hasAnimatedRef.current = true;
        setCount(target);
        setIsAnimationComplete(true);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;
        observer.unobserve(el);

        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));

          if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate);
          } else {
            setIsAnimationComplete(true);
          }
        };

        frameRef.current = requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {/* Visible animated counter — hidden from screen readers during animation */}
      <span aria-hidden="true">
        {count}
        {suffix && <span className="text-gold">{suffix}</span>}
      </span>

      {/* Screen reader only — announces final value once */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isAnimationComplete ? `${target}${suffix}` : ''}
      </span>
    </span>
  );
}
