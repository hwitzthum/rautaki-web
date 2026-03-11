// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const tracesSampleRate = process.env.NODE_ENV === "production" ? 0.1 : 1;

Sentry.init({
  dsn: "https://c425aa465ac5c72f3bb2a34eb729656e@o4511026569412608.ingest.de.sentry.io/4511026614960208",

  // Keep local verification easy, but reduce production trace volume.
  tracesSampleRate,

  // Leave automatic IP/cookie/user collection disabled unless you explicitly need it.
  sendDefaultPii: false,
});
