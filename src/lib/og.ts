import type { Metadata } from "next";

// Single source for the OpenGraph image reference. The ?v=2 busts LinkedIn's
// per-URL image cache (it negatively cached the 404 from before the image
// existed) — bump the version if the image file is ever replaced.
export const OG_IMAGE = {
  url: "/og-image.png?v=2",
  width: 1200,
  height: 630,
  alt: "Rautaki",
};

// Next.js merges metadata shallowly: a page that sets `openGraph` replaces the
// layout's object wholesale — images, locale and siteName included. Without
// this helper every page share card falls back to the site-wide og:title
// (LinkedIn prefers og:title over <title>). Pages spread the result into their
// metadata to get a page-specific share title without losing the shared fields.
export function pageShareMeta(opts: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const title = `${opts.title} | Rautaki`;
  return {
    openGraph: {
      type: "website",
      locale: "de_CH",
      siteName: "Rautaki",
      title,
      description: opts.description,
      url: `https://www.rautaki.ch${opts.path}`,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
      images: [OG_IMAGE.url],
    },
  };
}
