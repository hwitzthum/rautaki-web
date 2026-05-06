// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const tracesSampleRate = process.env.NODE_ENV === "production" ? 0.1 : 1;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Keep local verification easy, but reduce production trace volume.
  tracesSampleRate,

  // Leave automatic IP/cookie/user collection disabled unless you explicitly need it.
  sendDefaultPii: false,
});
