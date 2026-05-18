import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Rate limiting ──────────────────────────────────────────────────────────
// Persistent sliding-window limiter backed by Upstash Redis. Falls back to a
// per-instance in-memory limiter when UPSTASH_REDIS_REST_URL/TOKEN are unset
// (local dev). The fallback is best-effort only and intentionally noisy in
// logs so a missing prod env var surfaces immediately.
const RATE_MAX = 3;
const RATE_WINDOW = "15 m" as const;
const RATE_WINDOW_MS = 15 * 60 * 1000;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.slidingWindow(RATE_MAX, RATE_WINDOW),
        analytics: false,
        prefix: "rl:lab-access",
      })
    : null;

const memoryFallback = new Map<string, { count: number; resetAt: number }>();
function memoryLimit(ip: string): boolean {
  const now = Date.now();
  for (const [k, v] of memoryFallback) {
    if (now > v.resetAt) memoryFallback.delete(k);
  }
  const entry = memoryFallback.get(ip);
  if (!entry || now > entry.resetAt) {
    memoryFallback.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count++;
  return false;
}

// ── Input sanitisation ─────────────────────────────────────────────────────
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function hasControlChars(s: string): boolean {
  // Reject CR, LF, tab, NUL — header- and subject-injection vectors.
  return /[\r\n\t\0]/.test(s);
}

// ── Payload validation ─────────────────────────────────────────────────────
interface LabAccessPayload {
  name: string;
  company: string;
  email: string;
}

// Stricter than the previous `[^\s@]+@[^\s@]+\.[^\s@]+` — requires a TLD of
// 2+ chars and disallows consecutive dots / leading-or-trailing dots in the
// local part. Not RFC-perfect, but rejects the obvious abuse patterns.
const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

function isValidPayload(body: unknown): body is LabAccessPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  if (
    typeof b.name !== "string" ||
    typeof b.company !== "string" ||
    typeof b.email !== "string"
  ) {
    return false;
  }
  const name = b.name.trim();
  const company = b.company.trim();
  const email = b.email.trim();
  if (name.length === 0 || name.length > 200 || hasControlChars(name))
    return false;
  if (company.length === 0 || company.length > 200 || hasControlChars(company))
    return false;
  if (email.length === 0 || email.length > 254 || hasControlChars(email))
    return false;
  if (!EMAIL_RE.test(email)) return false;
  return true;
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // CSRF defence: Sec-Fetch-Site check — if present and not same-origin/same-site, reject.
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "same-site") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // CSRF defence: if a browser sends an Origin header it must match the host.
  // Server-to-server calls without Origin are permitted (no browser involved).
  const origin = request.headers.get("origin");
  if (origin) {
    const host = request.headers.get("host");
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      // unparseable Origin → reject
    }
    if (!originHost || originHost !== host) {
      return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 403 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-Mail-Service nicht konfiguriert" },
      { status: 503 },
    );
  }

  // Resolve a real client IP. On Vercel, the rightmost XFF entry is the
  // verified client IP appended by the edge — all other headers are
  // user-controlled and must not be trusted for rate limiting.
  const xff = request.headers.get("x-forwarded-for");
  const ip = xff
    ? xff.split(",").map((s) => s.trim()).filter(Boolean).at(-1) ?? null
    : null;

  if (!ip) {
    return NextResponse.json(
      { error: "Anfrage ohne Client-IP wird abgelehnt." },
      { status: 400 },
    );
  }

  let limited = false;
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    limited = !success;
  } else {
    if (process.env.NODE_ENV === "production") {
      // Fail closed: in-memory rate limiting is ineffective across serverless
      // instances. Refuse all requests until Redis env vars are configured.
      console.error(
        "[lab-access] UPSTASH_REDIS_REST_URL/TOKEN not set in production — rejecting request to protect endpoint.",
      );
      return NextResponse.json(
        { error: "Service nicht verfügbar" },
        { status: 503 },
      );
    }
    limited = memoryLimit(ip);
  }

  if (limited) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      {
        status: 429,
        headers: {
          "Retry-After": String(RATE_WINDOW_MS / 1000),
          "RateLimit-Limit": String(RATE_MAX),
          "RateLimit-Remaining": "0",
          "RateLimit-Reset": String(Math.ceil((Date.now() + RATE_WINDOW_MS) / 1000)),
        },
      },
    );
  }

  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Bitte füllen Sie alle Pflichtfelder korrekt aus." },
      { status: 400 },
    );
  }

  // Sanitised values for both subject (control chars already rejected, length
  // capped) and HTML body (escape every interpolation point).
  const name = body.name.trim();
  const company = body.company.trim();
  const email = body.email.trim();
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeEmail = escapeHtml(email);
  const mailtoHref = `mailto:${encodeURIComponent(email)}`;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Rautaki Lab <noreply@send.rautaki.ch>",
    to: "hello@rautaki.ch",
    // Note: no replyTo. Attacker-controlled replyTo turned this endpoint into
    // an open relay against rautaki.ch — replies went to the submitter. The
    // operator can still reach out via the mailto: link in the body.
    subject: `Neuer Lab-Zugang: ${name} (${company})`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #F4F2EE; padding: 0;">
        <div style="background: #0A0A0A; padding: 24px 32px;">
          <div style="font-size: 22px; color: #FAFAFA; font-weight: 400; letter-spacing: 0;">
            Raut<span style="color: #F5A623;">a</span>k<span style="color: #F5A623;">i</span>
          </div>
          <div style="font-family: system-ui, sans-serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.20); margin-top: 4px;">
            Lab · Neuer Zugang
          </div>
        </div>
        <div style="background: #FAFAFA; padding: 32px;">
          <p style="font-family: system-ui, sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(28,28,28,0.45); margin: 0 0 20px;">
            Neue Registrierung
          </p>
          <table style="width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: rgba(28,28,28,0.50); border-bottom: 1px solid rgba(28,28,28,0.08); width: 130px;">Name</td>
              <td style="padding: 10px 0; color: #1C1C1C; font-weight: 500; border-bottom: 1px solid rgba(28,28,28,0.08);">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(28,28,28,0.50); border-bottom: 1px solid rgba(28,28,28,0.08);">Unternehmen</td>
              <td style="padding: 10px 0; color: #1C1C1C; font-weight: 500; border-bottom: 1px solid rgba(28,28,28,0.08);">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(28,28,28,0.50);">E-Mail</td>
              <td style="padding: 10px 0; color: #1C1C1C; font-weight: 500;">
                <a href="${mailtoHref}" style="color: #1C1C1C;">${safeEmail}</a>
              </td>
            </tr>
          </table>
        </div>
        <div style="background: #F4F2EE; padding: 16px 32px; font-family: system-ui, sans-serif; font-size: 11px; color: rgba(28,28,28,0.35); text-align: center;">
          Rautaki · rautaki.ch
        </div>
      </div>
    `,
  });

  if (error) {
    // Log only the error code/name to avoid leaking the submitted email address
    // or other PII that may appear in the full error message.
    const safeErrorInfo = (error as { name?: string; statusCode?: number; message?: string }).name
      ?? (error as { name?: string; statusCode?: number; message?: string }).statusCode
      ?? "Resend API error";
    console.error("[lab-access] Resend error:", safeErrorInfo);
    return NextResponse.json(
      {
        error:
          "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
