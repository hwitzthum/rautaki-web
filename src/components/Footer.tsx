import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Booking" },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t-3 border-gold grain overflow-hidden">
      <div className="mx-auto max-w-content px-6 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <Logo size="sm" variant="dark" />
            <p className="mt-4 max-w-[280px] font-ui text-sm text-white/60">
              AI strategy and leadership advisory for organisations navigating
              rapid change.
            </p>
          </div>

          <div>
            <h3 className="font-ui text-xs uppercase tracking-wide-label text-white/45 mb-4">
              Navigate
            </h3>
            <ul className="space-y-3 font-ui text-sm text-white/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="no-underline hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-xs uppercase tracking-wide-label text-white/45 mb-4">
              Connect
            </h3>
            <ul className="space-y-3 font-ui text-sm text-white/70">
              <li>
                <a
                  href="mailto:hello@rautaki.ch"
                  className="no-underline hover:text-gold transition-colors"
                >
                  hello@rautaki.ch
                </a>
              </li>
              <li className="leading-relaxed">
                Rautaki AG
                <br />
                Bahnhofstrasse 10
                <br />
                8001 Zurich, Switzerland
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline hover:text-gold transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between font-ui text-xs uppercase tracking-wide-footer text-white/45">
          <div>© {new Date().getFullYear()} Rautaki. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="no-underline hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link href="/imprint" className="no-underline hover:text-gold transition-colors">
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
