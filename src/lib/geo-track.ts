// GEO measurement (roadmap P7): counts visits referred by AI answer engines
// and page hits by AI crawlers, as monthly aggregate counters in Upstash
// Redis. No cookies, no PII, no per-visitor data — pure counts, so it needs
// no consent and runs outside the consent manager.
//
// Called fire-and-forget from src/proxy.ts; read back by /api/geo-stats and
// the monthly n8n GEO digest workflow. Normal traffic (no AI referrer, no AI
// crawler UA) causes zero Redis calls.

// Referrer hosts of AI answer engines → counter slug.
const AI_REFERRERS: [pattern: RegExp, slug: string][] = [
  [/(^|\.)chatgpt\.com$/, "chatgpt"],
  [/(^|\.)chat\.openai\.com$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)gemini\.google\.com$/, "gemini"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)claude\.ai$/, "claude"],
  [/(^|\.)you\.com$/, "you"],
  [/(^|\.)poe\.com$/, "poe"],
  [/(^|\.)duckduckgo\.com$/, "duckassist"],
];

// AI crawler / assistant user-agent substrings (case-insensitive) → slug.
// Order matters: more specific first (e.g. OAI-SearchBot before GPTBot).
const AI_BOTS: [needle: string, slug: string][] = [
  ["oai-searchbot", "oai-searchbot"],
  ["chatgpt-user", "chatgpt-user"],
  ["gptbot", "gptbot"],
  ["claude-searchbot", "claude-searchbot"],
  ["claude-user", "claude-user"],
  ["claudebot", "claudebot"],
  ["anthropic-ai", "anthropic-ai"],
  ["perplexity-user", "perplexity-user"],
  ["perplexitybot", "perplexitybot"],
  ["google-extended", "google-extended"],
  ["googleother", "googleother"],
  ["meta-external", "meta-external"],
  ["ccbot", "ccbot"],
  ["bytespider", "bytespider"],
  ["amazonbot", "amazonbot"],
  ["applebot-extended", "applebot-extended"],
  ["duckassistbot", "duckassistbot"],
  ["mistralai", "mistral"],
  ["cohere", "cohere"],
];

// Slugs /api/geo-stats iterates when reading counters back.
export const REFERRER_SLUGS = [...new Set(AI_REFERRERS.map(([, s]) => s))];
export const BOT_SLUGS = [...new Set(AI_BOTS.map(([, s]) => s))];

export interface GeoSignal {
  kind: "ref" | "bot";
  slug: string;
}

export function classifyGeoSignal(
  referer: string | null,
  userAgent: string | null,
): GeoSignal | null {
  if (userAgent) {
    const ua = userAgent.toLowerCase();
    for (const [needle, slug] of AI_BOTS) {
      if (ua.includes(needle)) return { kind: "bot", slug };
    }
  }
  if (referer) {
    let host: string;
    try {
      host = new URL(referer).hostname.toLowerCase();
    } catch {
      return null;
    }
    for (const [pattern, slug] of AI_REFERRERS) {
      if (pattern.test(host)) return { kind: "ref", slug };
    }
  }
  return null;
}

export const geoKey = (month: string, signal: GeoSignal) =>
  `geo:${month}:${signal.kind}:${signal.slug}`;

export const monthKey = (date: Date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

// Counters expire after ~13 months — a rolling year of history without
// unbounded key growth. EXPIRE on every INCR keeps the TTL fresh enough
// while staying a two-command pipeline.
const TTL_SECONDS = 13 * 31 * 24 * 60 * 60;

/**
 * Fire-and-forget increment via the Upstash REST pipeline. Never throws —
 * measurement must not affect request handling. Returns the fetch promise
 * so the proxy can hand it to event.waitUntil().
 */
export function trackGeoSignal(signal: GeoSignal): Promise<void> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return Promise.resolve();

  const key = geoKey(monthKey(new Date()), signal);
  return fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(TTL_SECONDS)],
    ]),
  }).then(
    () => undefined,
    () => undefined,
  );
}
