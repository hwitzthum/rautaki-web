import { NextRequest, NextResponse } from "next/server";

// Maintenance-mode gate.
//
// Toggle by setting MAINTENANCE_MODE=true in the Vercel project's
// Environment Variables (Production / Preview / Development as needed),
// then redeploy or use "Redeploy" → "Use existing build cache" to roll
// the change forward without a rebuild.
//
// On Vercel, this file runs on the Edge runtime by default and reads
// `process.env.MAINTENANCE_MODE` directly — no `next.config.ts` env
// passthrough is required.

const MAINTENANCE_PATH = "/maintenance";

export function proxy(request: NextRequest) {
  const enabled = process.env.MAINTENANCE_MODE === "true";

  if (!enabled) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Never rewrite the maintenance page itself or its assets.
  if (
    pathname === MAINTENANCE_PATH ||
    pathname.startsWith(`${MAINTENANCE_PATH}/`)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = MAINTENANCE_PATH;

  // Forward a request header so the root layout (server component) can
  // read it via `headers()` and drop site chrome.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-maintenance", "true");

  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });

  // Response headers seen by the browser / crawlers / CDNs.
  response.headers.set("cache-control", "no-store, must-revalidate");
  response.headers.set("x-robots-tag", "noindex, nofollow");

  return response;
}

// Run on every request except Next.js internals, common static assets,
// and well-known endpoints. The `/api/*` paths are deliberately included
// so form submissions and webhooks return the holding page during
// maintenance instead of executing.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known|images|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js|map|txt|xml)).*)",
  ],
};
