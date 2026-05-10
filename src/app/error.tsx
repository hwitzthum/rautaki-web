"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

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
          Fehler
        </p>
        <h1 className="font-serif text-h2 text-white mb-4">
          Etwas ist schiefgelaufen
        </h1>
        <p className="text-white/45 font-sans text-body mb-10">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es
          erneut.
        </p>
        <button
          onClick={reset}
          className="text-white font-sans text-sm tracking-wide hover:text-gold transition-colors duration-200"
        >
          Erneut versuchen →
        </button>
      </div>
    </main>
  );
}
