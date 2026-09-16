// This file configures the initialization of Sentry on the client.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
//
// The SDK itself is loaded once the page has loaded and the browser is idle
// (see src/lib/sentry-client.ts). Errors raised before that are forwarded by
// the temporary listeners below, which also trigger the load; once the SDK is
// initialised its own global handlers take over.

import {
  captureException,
  loadSentry,
  loadedSentry,
} from "@/lib/sentry-client";

const onError = (event: ErrorEvent) =>
  captureException(event.error ?? event.message);
const onRejection = (event: PromiseRejectionEvent) =>
  captureException(event.reason);

window.addEventListener("error", onError);
window.addEventListener("unhandledrejection", onRejection);

function load() {
  void loadSentry().then(() => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  });
}

function scheduleLoad() {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(load, { timeout: 5000 });
  } else {
    setTimeout(load, 2000);
  }
}

if (document.readyState === "complete") {
  scheduleLoad();
} else {
  window.addEventListener("load", scheduleLoad, { once: true });
}

export const onRouterTransitionStart: typeof import("@/lib/sentry-sdk").captureRouterTransitionStart =
  (...args) => loadedSentry()?.captureRouterTransitionStart(...args);
