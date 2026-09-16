// Browser Sentry, loaded on demand. The SDK is ~70 KiB (gzip) of JavaScript;
// importing it statically put it on the critical path of every page and
// pushed Lighthouse's simulated mobile LCP above 2.5 s (P10.1). Everything on
// the client goes through this module so no static `@sentry/nextjs` import
// pulls the SDK back into the initial bundle.

type SentryModule = typeof import("./sentry-sdk");

let loading: Promise<SentryModule> | undefined;
let sentry: SentryModule | undefined;

export function loadSentry(): Promise<SentryModule> {
  loading ??= import("./sentry-sdk").then((mod) => {
    mod.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Keep local verification easy, but reduce production trace volume.
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

      // Leave automatic IP/cookie/user collection disabled unless you explicitly need it.
      sendDefaultPii: false,
    });
    sentry = mod;
    return mod;
  });
  return loading;
}

/** The SDK if it has finished loading, otherwise undefined. */
export function loadedSentry(): SentryModule | undefined {
  return sentry;
}

export function captureException(error: unknown): void {
  void loadSentry().then((mod) => mod.captureException(error));
}
