"use client";

import { useEffect } from "react";
import { captureException } from "@/lib/sentry-client";
import { common } from "@/content/de/common";
import { common as commonEn } from "@/content/en/common";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error);
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
        <p className="text-white/45 font-sans text-body mb-2">
          {common.error.body}
        </p>
        <p className="text-white/35 font-sans text-body mb-10" lang="en">
          {commonEn.error.body}
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
