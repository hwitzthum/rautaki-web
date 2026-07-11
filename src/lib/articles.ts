// Article loader for the «Wissen» (insights) section. Reads Markdown files from
// src/content/articles/{de,en}/*.md, validates their frontmatter at load, and
// exposes typed metadata + body to the page components. The filename (without
// .md) is the slug and must match 1:1 across locales; if an English file is
// missing for a slug, the English index simply omits it (EN may lag DE).
//
// Frontmatter is content-driven, so the sitemap, RSS feed and llms surfaces all
// derive their article dates from here rather than hand-maintained lists.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/content/types";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  /** The buyer query the article answers — rendered as the hero label. */
  question: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}

export interface Article extends ArticleMeta {
  /** Raw Markdown body (frontmatter stripped) — rendered with react-markdown. */
  body: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const DATE_LOCALE: Record<Locale, string> = {
  de: "de-CH",
  en: "en-GB",
};

/**
 * Format a YYYY-MM-DD frontmatter date for display in the given locale
 * ("11. Juli 2026" / "11 July 2026"). Parsed and formatted in UTC so the
 * rendered day never shifts with the server's timezone.
 */
export function formatArticleDate(locale: Locale, date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function localeDir(locale: Locale): string {
  return path.join(ARTICLES_DIR, locale);
}

/**
 * Validate the frontmatter of one article and return typed metadata. Throws
 * with a precise, file-scoped message so a malformed article fails the build
 * loudly instead of shipping a half-rendered page.
 */
function parseMeta(
  slug: string,
  locale: Locale,
  data: Record<string, unknown>,
): ArticleMeta {
  const where = `articles/${locale}/${slug}.md`;

  const requireString = (key: string): string => {
    const value = data[key];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `${where}: frontmatter "${key}" must be a non-empty string`,
      );
    }
    return value;
  };

  const requireDate = (key: string): string => {
    const value = requireString(key);
    if (!DATE_RE.test(value)) {
      throw new Error(
        `${where}: frontmatter "${key}" must be YYYY-MM-DD, got "${value}"`,
      );
    }
    return value;
  };

  const title = requireString("title");
  const description = requireString("description");
  if (description.length > 160) {
    throw new Error(
      `${where}: frontmatter "description" must be ≤160 characters, got ${description.length}`,
    );
  }
  const question = requireString("question");
  const datePublished = requireDate("datePublished");

  let dateModified: string | undefined;
  if (data.dateModified !== undefined) {
    dateModified = requireDate("dateModified");
  }

  let tags: string[] | undefined;
  if (data.tags !== undefined) {
    if (
      !Array.isArray(data.tags) ||
      !data.tags.every((tag) => typeof tag === "string")
    ) {
      throw new Error(
        `${where}: frontmatter "tags" must be an array of strings`,
      );
    }
    tags = data.tags;
  }

  return {
    slug,
    title,
    description,
    question,
    datePublished,
    dateModified,
    tags,
  };
}

function readSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/** All articles for a locale, newest first. English omits slugs it lacks. */
export function getArticles(locale: Locale): ArticleMeta[] {
  return readSlugs(locale)
    .map((slug) => {
      const raw = fs.readFileSync(
        path.join(localeDir(locale), `${slug}.md`),
        "utf8",
      );
      return parseMeta(slug, locale, matter(raw).data);
    })
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/** One article (metadata + Markdown body), or null if the file is absent. */
export function getArticle(locale: Locale, slug: string): Article | null {
  const file = path.join(localeDir(locale), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { ...parseMeta(slug, locale, data), body: content.trim() };
}
