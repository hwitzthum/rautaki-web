"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE } from "@/lib/i18n";

// DE | EN toggle. Locale is derived from the pathname; the two links point at
// the mirror slug in the other locale (slugs are 1:1, so the mapping is a plain
// prefix add/remove). Clicking writes the NEXT_LOCALE cookie so a returning
// visitor is sent to their language from the bare "/" (see src/proxy.ts).
export default function LocaleSwitch({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");

  const dePath = isEn ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : pathname;
  const enPath = isEn ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

  const setCookie = (locale: "de" | "en") => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    onNavigate?.();
  };

  const linkClass = (active: boolean) =>
    `no-underline transition-colors duration-200 ${
      active ? "text-gold" : "text-white/[0.28] hover:text-gold"
    }`;

  return (
    <div
      className={`flex items-center gap-2 font-ui text-xs uppercase tracking-wide-nav ${className}`}
    >
      <Link
        href={dePath}
        hrefLang="de-CH"
        lang="de"
        aria-current={!isEn ? "true" : undefined}
        onClick={() => setCookie("de")}
        className={linkClass(!isEn)}
      >
        DE
      </Link>
      <span aria-hidden="true" className="text-white/20">
        |
      </span>
      <Link
        href={enPath}
        hrefLang="en"
        lang="en"
        aria-current={isEn ? "true" : undefined}
        onClick={() => setCookie("en")}
        className={linkClass(isEn)}
      >
        EN
      </Link>
    </div>
  );
}
