import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/maintenance"],
      },
    ],
    sitemap: "https://www.rautaki.ch/sitemap.xml",
  };
}
