// /feed.xml — RSS 2.0 feed of the German Wissen articles. Assembled from the
// same loader the pages use, so the feed cannot drift from the published
// content. Static like robots/sitemap/llms. The proxy matcher excludes paths
// ending in .xml, so this bypasses the maintenance gate exactly as sitemap.xml
// does — acceptable for a read-only crawler surface.

import { getArticles } from "@/lib/articles";
import { localePath } from "@/lib/i18n";

export const dynamic = "force-static";

const BASE = "https://www.rautaki.ch";
const FEED_URL = `${BASE}/feed.xml`;
const CHANNEL_URL = `${BASE}/wissen`;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// RFC-822 date for pubDate, built in UTC so it never shifts with the server TZ.
function rfc822(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toUTCString();
}

function buildFeed(): string {
  const articles = getArticles("de");
  const lastBuildDate = articles.length
    ? rfc822(articles[0].dateModified ?? articles[0].datePublished)
    : new Date().toUTCString();

  const items = articles
    .map((article) => {
      const url = `${BASE}${localePath("de", `/wissen/${article.slug}`)}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(article.datePublished)}</pubDate>
      <description>${escapeXml(article.description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rautaki — Wissen</title>
    <link>${CHANNEL_URL}</link>
    <description>Fundierte Analysen zu KI-Strategie, Governance und Regulierung für Führungsteams in NPO, öffentlichem Sektor und KMU.</description>
    <language>de-CH</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

const content = buildFeed();

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
