import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

function buildCsp(): string {
  // Derive the n8n chat webhook origin from the public env var so it can be
  // included in connect-src without hard-coding a domain in the policy.
  let n8nOrigin = "";
  try {
    const raw = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
    if (raw) n8nOrigin = new URL(raw).origin;
  } catch {
    // malformed URL — omit from CSP
  }

  const connectSrc = [
    "'self'",
    "*.ingest.de.sentry.io",
    "*.sentry.io",
    // Cal.com API calls (availability, booking confirmation)
    "https://cal.com",
    "https://app.cal.com",
    n8nOrigin,
  ]
    .filter(Boolean)
    .join(" ");

  // Next.js App Router requires 'unsafe-inline' for its hydration scripts.
  // 'unsafe-eval' is only needed during local development (HMR).
  // Cal.com's embed script is loaded from app.cal.com.
  const scriptSrc =
    process.env.NODE_ENV === "development"
      ? "'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com"
      : "'self' 'unsafe-inline' https://app.cal.com";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: images.unsplash.com https://*.n8n.cloud",
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
