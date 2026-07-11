import type { Metadata } from "next";
import type { Components } from "react-markdown";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "@/components/Button";
import GoldRule from "@/components/GoldRule";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import JsonLd from "@/components/JsonLd";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { absoluteUrl, localePath, pageAlternates } from "@/lib/i18n";
import { getContent } from "@/content";
import { formatArticleDate, getArticle } from "@/lib/articles";
import type { Locale } from "@/content/types";

export function articleMetadata(locale: Locale, slug: string): Metadata {
  const article = getArticle(locale, slug);
  if (!article) return {};
  const path = `/wissen/${slug}`;
  const share = pageShareMeta({
    title: article.title,
    description: article.description,
    path: localePath(locale, path),
    locale,
  });
  return {
    title: article.title,
    description: article.description,
    alternates: pageAlternates(locale, path),
    ...share,
    openGraph: {
      ...share.openGraph,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
    },
  };
}

const INLANGUAGE: Record<Locale, string> = {
  de: "de-CH",
  en: "en-GB",
};

// Map Markdown elements to the brand typography. No @tailwindcss/typography
// plugin is loaded, so prose is styled here — serif headings, DM-Sans body,
// gold-underlined links — the same tokens the rest of the site uses.
const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="font-serif text-h2 tracking-tight-h2 font-normal leading-heading text-ink mt-14 mb-5">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink mt-10 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-serif text-h4 tracking-tight-h4 font-normal leading-subhead text-ink mt-8 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-ui text-body font-light leading-body text-ink/80 mb-6">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ink underline decoration-gold/70 underline-offset-4 transition-colors hover:decoration-gold"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-disc pl-5 space-y-2 font-ui text-body font-light leading-body text-ink/80 marker:text-gold">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal pl-5 space-y-2 font-ui text-body font-light leading-body text-ink/80 marker:text-gold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-medium text-ink">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="font-serif italic text-ink">{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gold pl-6 my-8 font-serif italic text-lead leading-body text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-none h-px bg-ink/10 my-10" />,
  code: ({ children }) => (
    <code className="font-mono text-sm bg-ink/[0.06] px-1.5 py-0.5">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-sm bg-ink/[0.06] p-5 overflow-x-auto my-6">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse font-ui text-sm text-ink/80">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-ink/20 py-3 pr-6 text-left font-medium uppercase tracking-wide-label text-xs text-mid-grey">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-ink/10 py-3 pr-6 font-light align-top">
      {children}
    </td>
  ),
};

export default function ArticlePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const article = getArticle(locale, slug);
  if (!article) return null;

  const c = getContent(locale).wissen;
  const inLanguage = INLANGUAGE[locale];
  const articleUrl = absoluteUrl(localePath(locale, `/wissen/${slug}`));
  const dateModified = article.dateModified ?? article.datePublished;
  const showUpdated = Boolean(
    article.dateModified && article.dateModified !== article.datePublished,
  );

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified,
    inLanguage,
    author: { "@id": "https://www.rautaki.ch/#harry-witzthum" },
    publisher: { "@id": "https://www.rautaki.ch/#organization" },
    mainEntityOfPage: articleUrl,
    isPartOf: { "@id": "https://www.rautaki.ch/#website" },
  };

  return (
    <>
      <JsonLd
        schema={[
          blogPostingSchema,
          breadcrumbSchema(
            [
              { name: c.breadcrumbLabel, path: "/wissen" },
              { name: article.title, path: `/wissen/${slug}` },
            ],
            locale,
          ),
        ]}
      />

      {/* ── Header ────────────────────────────────────────── */}
      <section className="bg-white border-t-3 border-gold pt-24">
        <div className="mx-auto max-w-reading px-6 sm:px-10 lg:px-20 py-16 md:py-20">
          <SectionLabel text={article.question} variant="bare" />
          <h1 className="font-serif text-h2 lg:text-h1 font-normal leading-heading tracking-tight text-ink mb-6">
            {article.title}
          </h1>
          <p className="font-ui text-lead font-light leading-body text-ink/70 mb-8">
            {article.description}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-ui text-xs uppercase tracking-wide-label text-mid-grey border-t border-ink/10 pt-5">
            <span>
              {c.publishedLabel}{" "}
              <time dateTime={article.datePublished}>
                {formatArticleDate(locale, article.datePublished)}
              </time>
            </span>
            {showUpdated && (
              <span>
                {c.updatedLabel}{" "}
                <time dateTime={dateModified}>
                  {formatArticleDate(locale, dateModified)}
                </time>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────── */}
      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-16 md:py-20">
        <div className="mx-auto max-w-reading">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {article.body}
          </Markdown>

          {/* ── Author ──────────────────────────────────── */}
          <div className="mt-16 pt-10 border-t border-ink/10 flex items-center gap-5">
            <div className="relative h-16 w-16 flex-none overflow-hidden">
              <Image
                src="/images/about/witzthum_portrait.webp"
                alt="Harry Witzthum"
                fill
                className="object-cover object-top"
                sizes="64px"
              />
            </div>
            <div>
              <a
                href={localePath(locale, "/about")}
                className="font-serif text-h4 tracking-tight-h4 text-ink no-underline transition-colors hover:text-gold"
              >
                Harry Witzthum
              </a>
              <p className="font-ui text-sm font-light leading-snug text-mid-grey mt-0.5">
                {c.authorRole}
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoldRule />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-obsidian grain px-6 sm:px-10 lg:px-20 py-24">
        <ScrollReveal className="mx-auto max-w-reading text-center">
          <p className="font-ui text-body font-light leading-body text-white/55 mb-10">
            {c.ctaText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            <Button
              href={localePath(locale, "/booking")}
              variant="gold"
              showArrow
            >
              {c.ctaButton}
            </Button>
            <a
              href={localePath(locale, "/wissen")}
              className="font-sans text-sm tracking-wide text-white hover:text-gold transition-colors duration-200"
            >
              ← {c.backLabel}
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
