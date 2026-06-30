// Cookie-consent primitives shared between the banner (ConsentManager) and the
// footer re-open link (CookieSettingsLink). Salesflare website tracking is only
// loaded after the visitor opts in — see ConsentManager.

export const CONSENT_STORAGE_KEY = "rautaki_cookie_consent";

// Dispatched on window to re-open the consent banner so a visitor can change or
// withdraw their choice (GDPR/nDSG: withdrawal must be as easy as granting).
export const COOKIE_SETTINGS_EVENT = "rautaki:cookie-settings";

// Dispatched on window when the stored choice changes, so the consent store
// (useSyncExternalStore) re-reads localStorage.
export const CONSENT_CHANGE_EVENT = "rautaki:consent-change";

// Public Salesflare site-tracking token. It is embedded in the page that loads
// flare.js, so it is not a secret.
export const SALESFLARE_TOKEN = "qCmvh-ukwVzsXq9A2EgvXS_7CP9XxiZ4P_YI3693TN2cG";

export type Consent = "granted" | "denied";
