"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { common } from "@/content/de/common";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="text-center max-w-narrow">
        <p className="text-gold font-sans text-sm tracking-widest uppercase mb-6">
          {common.error.label}
        </p>
        <h1 className="font-serif text-h2 text-white mb-4">
          {common.error.title}
        </h1>
        <p className="text-white/45 font-sans text-body mb-10">
          {common.error.body}
        </p>
        <button
          onClick={reset}
          className="text-white font-sans text-sm tracking-wide hover:text-gold transition-colors duration-200"
        >
          {common.error.retry}
        </button>
      </div>
    </main>
  );
}
