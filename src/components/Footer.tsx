import Link from "next/link";
import Logo from "./Logo";
import CookieSettingsLink from "./CookieSettingsLink";
import { getContent } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const common = getContent(locale).common;
  const navLinks = common.footer.navLinks;

  return (
    <footer className="bg-obsidian grain overflow-hidden">
      <div className="h-[3px] bg-gold-rule" aria-hidden="true" />
      <div className="mx-auto max-w-content px-6 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <Logo size="sm" variant="dark" />
            <p className="mt-4 max-w-[280px] font-ui text-sm text-white/45">
              {common.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-ui text-xs uppercase tracking-wide-label text-white/45 mb-4">
              {common.footer.navHeading}
            </h3>
            <ul className="space-y-3 font-ui text-sm text-white/45">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
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
              {common.footer.contactHeading}
            </h3>
            <ul className="space-y-3 font-ui text-sm text-white/45">
              <li>
                <a
                  href={`mailto:${common.footer.email}`}
                  className="underline decoration-gold/70 underline-offset-4 hover:text-gold hover:decoration-gold transition-colors"
                >
                  {common.footer.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {common.footer.addressLines[0]}
                <br />
                {common.footer.addressLines[1]}
                <br />
                {common.footer.addressLines[2]}
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/harry-witzthum-25b814a/"
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline hover:text-gold transition-colors"
                >
                  {common.footer.linkedInLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between font-ui text-xs uppercase tracking-wide-footer text-white/45">
          <div>
            © {new Date().getFullYear()} {common.footer.copyright}
          </div>
          <div className="flex gap-6">
            <Link
              href={localePath(locale, "/privacy")}
              className="no-underline hover:text-gold transition-colors"
            >
              {common.footer.privacyLabel}
            </Link>
            <Link
              href={localePath(locale, "/imprint")}
              className="no-underline hover:text-gold transition-colors"
            >
              {common.footer.imprintLabel}
            </Link>
            <CookieSettingsLink locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
