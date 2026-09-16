// The parts of the browser SDK this app uses. Imported dynamically from
// sentry-client.ts: a dynamic import of "@sentry/nextjs" itself can't be
// tree-shaken and would ship the whole SDK (~180 KiB instead of ~70 KiB).
export {
  captureException,
  captureRouterTransitionStart,
  init,
} from "@sentry/nextjs";
