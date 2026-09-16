// Content-Security-Policy builder shared by next.config.ts (static fallback for
// every path) and src/proxy.ts (per-request nonce policy for pages).
//
// With a nonce, script-src trusts only Next's nonce-tagged scripts plus
// whatever they load ('strict-dynamic' — covers the lazy Sentry and n8n chat
// chunks, Cal.com's embed.js and Salesflare's two-hop loader). CSP3 browsers
// ignore 'unsafe-inline' and the host allowlist once a nonce/'strict-dynamic'
// is present; both stay only as a fallback for older browsers.
// style-src keeps 'unsafe-inline': a nonce there would make browsers ignore it
// and break every style attribute and the Cal.com/n8n runtime styles
// (Observatory does not penalise style-src; see roadmap P10.3).

// Chatbot calls go to the same-origin /api/chat proxy; Resend is server-side
// only — neither needs an entry here.
const connectSrc = [
  "'self'",
  "*.ingest.de.sentry.io",
  "*.sentry.io",
  // Cal.com API calls (availability, booking confirmation)
  "https://cal.com",
  "https://app.cal.com",
  // Salesflare visit beacons (actual_flare.js), only after cookie consent
  "https://api.salesflare.com",
].join(" ");

// Salesflare loads in two hops: track.salesflare.com/flare.js, then
// storage.googleapis.com/track.salesflare.com/actual_flare.js (path-restricted
// to Salesflare's bucket). Cal.com's embed script comes from app.cal.com.
const scriptHosts =
  "https://app.cal.com https://track.salesflare.com https://storage.googleapis.com/track.salesflare.com/";

export function buildCsp({ nonce, dev }: { nonce?: string; dev: boolean }): string {
  // 'unsafe-eval' only in development (React dev tooling / HMR).
  const scriptSrc = [
    "'self'",
    ...(nonce ? [`'nonce-${nonce}'`, "'strict-dynamic'"] : []),
    "'unsafe-inline'",
    ...(dev ? ["'unsafe-eval'"] : []),
    scriptHosts,
  ].join(" ");

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
