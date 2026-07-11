import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";
import ScrollReveal from "@/components/ScrollReveal";
import GoldRule from "@/components/GoldRule";
import JsonLd from "@/components/JsonLd";
import Highlight from "@/components/Highlight";
import { pageShareMeta } from "@/lib/og";
import { breadcrumbSchema } from "@/lib/breadcrumb";
import { absoluteUrl, localePath, pageAlternates } from "@/lib/i18n";
import { getContent } from "@/content";
import { formatArticleDate, getArticles } from "@/lib/articles";
import type { Locale } from "@/content/types";

export function wissenMetadata(locale: Locale): Metadata {
  const c = getContent(locale).wissen;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: pageAlternates(locale, "/wissen"),
    ...pageShareMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      path: localePath(locale, "/wissen"),
      locale,
    }),
  };
}

const INLANGUAGE: Record<Locale, string> = {
  de: "de-CH",
  en: "en-GB",
};

export default function WissenIndexPage({ locale }: { locale: Locale }) {
  const c = getContent(locale).wissen;
  const articles = getArticles(locale);
  const inLanguage = INLANGUAGE[locale];
  const wissenUrl = absoluteUrl(localePath(locale, "/wissen"));

  // CollectionPage for the section, with an ItemList of every article URL so
  // AI systems can enumerate the insights as one addressable collection.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${wissenUrl}#page`,
    url: wissenUrl,
    name: c.metaTitle,
    description: c.metaDescription,
    inLanguage,
    isPartOf: { "@id": "https://www.rautaki.ch/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(localePath(locale, `/wissen/${article.slug}`)),
        name: article.title,
      })),
    },
  };

  return (
    <>
      <JsonLd
        schema={[
          collectionSchema,
          breadcrumbSchema(
            [{ name: c.breadcrumbLabel, path: "/wissen" }],
            locale,
          ),
        ]}
      />

      <HeroLight
        label={c.heroLabel}
        title={<Highlight text={c.heroTitle} />}
        description={<p>{c.heroDescription}</p>}
      />

      <section className="bg-cream px-6 sm:px-10 lg:px-20 py-20 md:py-24">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 gap-[2px] bg-ink/10">
            {articles.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 80}>
                <a
                  href={localePath(locale, `/wissen/${article.slug}`)}
                  className="group block bg-white no-underline"
                >
                  <article className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 p-7 lg:p-9 items-baseline border-l-3 border-transparent group-hover:border-gold transition-colors duration-300">
                    <div className="max-w-reading">
                      <div className="font-ui text-xs uppercase tracking-wide-label text-gold mb-3">
                        {article.question}
                      </div>
                      <h2 className="font-serif text-h3 tracking-tight-h3 font-normal leading-heading text-ink mb-2">
                        {article.title}
                      </h2>
                      <p className="font-ui text-sm font-light leading-body text-ink/65 md:text-mid-grey">
                        {article.description}
                      </p>
                    </div>
                    <time
                      dateTime={article.datePublished}
                      className="font-ui text-xs uppercase tracking-wide-label text-mid-grey whitespace-nowrap lg:text-right"
                    >
                      {formatArticleDate(locale, article.datePublished)}
                    </time>
                  </article>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GoldRule />
    </>
  );
}
