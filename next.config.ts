import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import webpack from "webpack";

function buildCsp(): string {
  // The chatbot now talks to a same-origin proxy at /api/chat which forwards
  // to the n8n webhook server-side, so the n8n origin no longer needs to be
  // in connect-src. The change closes a small attack surface (the browser
  // can never be tricked into a cross-origin call to the bot's host).
  const connectSrc = [
    "'self'",
    "*.ingest.de.sentry.io",
    "*.sentry.io",
    // Cal.com API calls (availability, booking confirmation)
    "https://cal.com",
    "https://app.cal.com",
    // Salesflare website tracking (actual_flare.js) sends visit beacons here
    // via XHR/fetch/sendBeacon. Only loaded after cookie consent — see
    // ConsentManager. (The script itself is allowed via script-src below.)
    "https://api.salesflare.com",
    // Resend is called server-side only (/api/lab-access route handler) —
    // the browser never contacts it directly, so it must not appear here.
  ].join(" ");

  // Salesflare tracking loads in two hops: track.salesflare.com/flare.js (a
  // thin loader) then storage.googleapis.com/track.salesflare.com/actual_flare.js.
  // The GCS source is path-restricted to Salesflare's bucket so we don't allow
  // scripts from arbitrary Google Cloud Storage buckets.
  const salesflareScriptSrc =
    "https://track.salesflare.com https://storage.googleapis.com/track.salesflare.com/";

  // Next.js App Router requires 'unsafe-inline' for its hydration scripts.
  // 'unsafe-eval' is only needed during local development (HMR).
  // Cal.com's embed script is loaded from app.cal.com.
  const scriptSrc =
    process.env.NODE_ENV === "development"
      ? `'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com ${salesflareScriptSrc}`
      : `'self' 'unsafe-inline' https://app.cal.com ${salesflareScriptSrc}`;

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: images.unsplash.com",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "object-src 'none'",
    // Cal.com renders its booking UI inside an iframe from app.cal.com
    "frame-src https://cal.com https://app.cal.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://app.cal.com",
  ].join("; ");
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: buildCsp() },
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
  webpack(config) {
    // @n8n/chat is built with Vue. Define the three compile-time flags Vue
    // expects so the browser console stays clean and tree-shaking works correctly.
    config.plugins.push(
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    );
    return config;
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
