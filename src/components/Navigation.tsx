"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(pathname !== "/");
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const nearTop = currentY < 24;

      setScrolled(pathname !== "/" || !nearTop);

      if (menuOpen) {
        setHidden(false);
      } else if (currentY > lastYRef.current + 8 && currentY > 120) {
        setHidden(true);
      } else if (currentY < lastYRef.current - 8) {
        setHidden(false);
      }

      lastYRef.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, menuOpen]);

  const headerSurface =
    scrolled || menuOpen
      ? "bg-obsidian/95 backdrop-blur-sm border-b border-white/10"
      : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-sticky transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${headerSurface}`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 sm:px-10 lg:px-20 py-4">
        <div onClick={() => setMenuOpen(false)}>
          <Logo size="sm" variant="dark" />
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-9 font-ui text-xs uppercase tracking-wide-nav"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link-sweep no-underline transition-colors duration-200 ${
                  active ? "text-gold" : "text-white/60 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={`lg:hidden overflow-hidden border-t border-white/10 transition-[max-height] duration-300 ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="px-6 sm:px-10 pb-6 pt-4 flex flex-col gap-4 font-ui text-xs uppercase tracking-wide-nav">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`no-underline transition-colors duration-200 py-2 ${
                  active ? "text-gold" : "text-white/60 hover:text-gold"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
