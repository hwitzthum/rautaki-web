import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import { buildCsp } from "./src/lib/csp";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The Wissen pages read article Markdown from src/content/articles/**/*.md at
  // request time (the root layout's headers() call makes every route dynamic).
  // Next's file tracing can't follow the computed fs paths in src/lib/articles.ts,
  // so include the files explicitly — otherwise the Vercel function throws ENOENT.
  outputFileTracingIncludes: {
    "/wissen": ["./src/content/articles/**/*.md"],
    "/wissen/[slug]": ["./src/content/articles/**/*.md"],
    "/en/wissen": ["./src/content/articles/**/*.md"],
    "/en/wissen/[slug]": ["./src/content/articles/**/*.md"],
  },
  // The former Lab (overview pages + two retired HTML tools) now lives on
  // apps.rautaki.ch — see docs/apps-umbau-plan.md. Exact paths only: the EU AI
  // Act checker stays at /lab/eu-ai-act-check.html and must not be caught.
  async redirects() {
    const apps = "https://apps.rautaki.ch";
    return [
      { source: "/lab", destination: apps, permanent: true },
      { source: "/en/lab", destination: apps, permanent: true },
      {
        source: "/lab/ki-governance-policy.html",
        destination: apps,
        permanent: true,
      },
      {
        source: "/lab/multi-assistant-gpt.html",
        destination: apps,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Static fallback for every path; pages additionally get a per-request
          // nonce policy from src/proxy.ts (roadmap P10.7).
          {
            key: "Content-Security-Policy",
            value: buildCsp({ dev: process.env.NODE_ENV === "development" }),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          // Disable cross-origin DNS prefetching to reduce information leakage
          // about which third-party resources a page links to.
          { key: "X-DNS-Prefetch-Control", value: "off" },
          // Prevent browsers from sending credentials in cross-origin requests
          // triggered by resource tags (img, script, etc.) that do not opt in.
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          // Isolate the browsing context to mitigate Spectre-class side-channel
          // attacks. Required for SharedArrayBuffer; generally a good practice.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // NOTE: Cross-Origin-Embedder-Policy is intentionally NOT set. COEP
          // (require-corp/credentialless) forces every embedded cross-origin
          // iframe to send its own COEP header, and Cal.com's booking iframe
          // (app.cal.com) does not — so COEP blocks it with
          // ERR_BLOCKED_BY_RESPONSE and the embed spins forever. The site uses
          // no SharedArrayBuffer / cross-origin-isolation features, so COEP
          // provides no benefit here while breaking the booking flow.
        ],
      },
      {
        // The OpenGraph image exists to be embedded cross-origin (LinkedIn,
        // WhatsApp, Slack previews). The global CORP: same-origin above makes
        // browsers refuse exactly that — override for this one asset. Listed
        // after the global rule so it wins for this path.
        source: "/og-image.png",
        headers: [
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // @n8n/chat is built with Vue. Define the three compile-time flags Vue
  // expects so the browser console stays clean and tree-shaking works correctly.
  //
  // This lives under `compiler.define` rather than a `webpack()` hook: builds
  // run on Turbopack, which never calls that hook, so the flags were silently
  // left unreplaced and Vue's dev-only branches stayed in the bundle.
  // `compiler.define` is applied by the SWC layer and so works under both
  // bundlers. Values are the literal source text substituted at the use site.
  compiler: {
    define: {
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    },
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "rautaki",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Delete local source maps after upload so they are never served to browsers.
  // Without this, .js.map files generated during the build remain in the
  // deployment bundle and are publicly accessible, leaking server-side source.
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
