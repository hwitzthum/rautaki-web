import Link from "next/link";
import { common } from "@/content/de/common";
import { common as commonEn } from "@/content/en/common";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="text-center max-w-narrow">
        <p className="text-gold font-sans text-sm tracking-widest uppercase mb-6">
          {common.notFound.label}
        </p>
        <h1 className="font-serif text-h2 text-white mb-4">
          {common.notFound.title}
        </h1>
        <p className="text-white/45 font-sans text-body mb-2">
          {common.notFound.body}
        </p>
        <p className="text-white/35 font-sans text-body mb-10" lang="en">
          {commonEn.notFound.body}
        </p>
        <Link
          href="/"
          className="text-white font-sans text-sm tracking-wide hover:text-gold transition-colors duration-200"
        >
          {common.notFound.back}
        </Link>
      </div>
    </main>
  );
}
