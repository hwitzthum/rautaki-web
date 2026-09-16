import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { classifyGeoSignal, trackGeoSignal } from "@/lib/geo-track";
import { buildCsp } from "@/lib/csp";

// Maintenance-mode gate — Next.js 16 "proxy" convention (formerly middleware).
//
// Toggle by setting MAINTENANCE_MODE=true in the Vercel project's
// Environment Variables (Production / Preview / Development as needed),
// then redeploy or use "Redeploy" → "Use existing build cache" to roll
// the change forward without a rebuild.

const MAINTENANCE_PATH = "/maintenance";

// The English site lives under /en; everything else is German. Derived here and
// forwarded to the layout via x-locale so the server components never have to
// re-parse the pathname.
// Per-request nonce CSP for pages (roadmap P10.7). Rollout: Report-Only first
// (the static enforcing policy from next.config.ts stays in force), then
// switch the response header to the enforcing one.
const NONCE_CSP_HEADER = "Content-Security-Policy-Report-Only";

function applyNonceCsp(requestHeaders: Headers): string {
  const nonce = btoa(crypto.randomUUID());
  const policy = buildCsp({
    nonce,
    dev: process.env.NODE_ENV === "development",
  });
  // Next.js takes the nonce from the `content-security-policy` REQUEST header
  // and only falls back to the report-only one. On Vercel the static policy
  // from next.config.ts (no nonce) already arrives there, so the nonce policy
  // must overwrite exactly this header — otherwise no script gets a nonce.
  requestHeaders.set("content-security-policy", policy);
  return policy;
}

function localeFromPathname(pathname: string): "de" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const enabled = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;
  const locale = localeFromPathname(pathname);

  // GEO measurement (roadmap P7): count AI-referred visits and AI-crawler
  // page hits as monthly aggregates. Fire-and-forget — never blocks the
  // response, no-ops for normal traffic. API routes are excluded (bot hits
  // there are noise, and the chat endpoint has its own telemetry).
  if (request.method === "GET" && !pathname.startsWith("/api/")) {
    const signal = classifyGeoSignal(
      request.headers.get("referer"),
      request.headers.get("user-agent"),
    );
    if (signal) event.waitUntil(trackGeoSignal(signal));
  }

  if (!enabled) {
    // A returning English visitor who lands on the bare "/" is sent to "/en".
    // Only the bare root and only when the cookie says "en": crawlers send no
    // cookie (never redirected), deep links never redirect, and the DE toggle
    // sets the cookie to "de" so there is no loop.
    if (
      pathname === "/" &&
      request.cookies.get("NEXT_LOCALE")?.value === "en"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url, 307);
    }

    // Strip any client-sent x-maintenance / x-locale headers so the layout
    // server component cannot be tricked into suppressing the chat widget or
    // flipping the locale via header injection; then set the derived locale.
    const cleaned = new Headers(request.headers);
    cleaned.delete("x-maintenance");
    cleaned.delete("x-locale");
    cleaned.set("x-locale", locale);
    if (pathname.startsWith("/api/")) {
      return NextResponse.next({ request: { headers: cleaned } });
    }
    const policy = applyNonceCsp(cleaned);
    const response = NextResponse.next({ request: { headers: cleaned } });
    response.headers.set(NONCE_CSP_HEADER, policy);
    return response;
  }

  // Keep-alive cron must reach Redis even during maintenance — keeping the
  // shared store from being archived is precisely its job.
  if (pathname.startsWith("/api/cron/")) {
    return NextResponse.next();
  }

  // Never rewrite the maintenance page itself or its assets.
  if (
    pathname === MAINTENANCE_PATH ||
    pathname.startsWith(`${MAINTENANCE_PATH}/`)
  ) {
    return NextResponse.next();
  }

  // API routes must return a machine-readable error, not an HTML page.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Wartungsarbeiten. Bitte versuchen Sie es später erneut." },
      {
        status: 503,
        headers: {
          "Retry-After": "3600",
          "cache-control": "no-store, must-revalidate",
        },
      },
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = MAINTENANCE_PATH;

  // Forward request headers so the root layout (server component) can read
  // them via `headers()` — x-maintenance drops site chrome, x-locale keeps
  // <html lang> consistent with the requested URL. Strip any client-sent
  // x-locale first (same injection guard as x-maintenance).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-locale");
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-maintenance", "true");
  const policy = applyNonceCsp(requestHeaders);

  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });

  // Response headers seen by the browser / crawlers / CDNs.
  response.headers.set("cache-control", "no-store, must-revalidate");
  response.headers.set("x-robots-tag", "noindex, nofollow");
  response.headers.set(NONCE_CSP_HEADER, policy);

  return response;
}

// Run on every request except Next.js internals, common static assets,
// and well-known endpoints. The `/api/*` paths are deliberately included
// so form submissions and webhooks return the holding page during
// maintenance instead of executing.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known|images|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js|map|txt|xml|pdf)).*)",
  ],
};
