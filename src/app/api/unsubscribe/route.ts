import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import {
  resolveUnsubscribeCredentials,
  verifyUnsubscribeToken,
} from "@/lib/email-security";

// Reads runtime headers/query and writes to Redis — never statically cached.
export const dynamic = "force-dynamic";

const SUPPRESSION_SET = "nurture:unsub";

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis =
  upstashUrl && upstashToken
    ? new Redis({ url: upstashUrl, token: upstashToken })
    : null;

function isValid(email: string, token: string): boolean {
  return verifyUnsubscribeToken(email, token, process.env.UNSUBSCRIBE_SECRET);
}

// ── Branded HTML shell ───────────────────────────────────────────────────────
function page(title: string, body: string): string {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Rautaki</title></head>
<body style="margin:0;background:#E8E5DF;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;"><tr><td align="center">
    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:480px;background:#FAFAFA;">
      <tr><td style="background:#0A0A0A;padding:22px 32px;font-family:Georgia,serif;font-size:22px;color:#FAFAFA;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></td></tr>
      <tr><td style="height:3px;font-size:0;line-height:3px;background:#F5A623;">&nbsp;</td></tr>
      <tr><td style="padding:36px 32px;color:#1C1C1C;">${body}</td></tr>
      <tr><td style="background:#F4F2EE;padding:16px 32px;text-align:center;font-size:11px;color:rgba(28,28,28,0.35);">Rautaki · rautaki.ch</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function html(status: number, title: string, body: string): NextResponse {
  return new NextResponse(page(title, body), {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

const invalidBody = `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 12px;">Link ungültig</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Dieser Abmelde-Link ist ungültig oder abgelaufen. Bei Fragen erreichen Sie uns unter <a href="mailto:hello@rautaki.ch" style="color:#1C1C1C;">hello@rautaki.ch</a>.</p>`;

// GET → confirmation page (a scanner/prefetch must NOT unsubscribe; only the POST does).
export async function GET(request: NextRequest) {
  const { email, token } = resolveUnsubscribeCredentials(
    new URL(request.url).searchParams,
  );
  if (!isValid(email, token)) return html(400, "Ungültig", invalidBody);

  // Escape for both the text-node context (h1/p/strong below) and the
  // hidden-input `value="..."` attribute context (the form action) —
  // the attribute context additionally requires quotes/apostrophes to be
  // encoded, otherwise a crafted `e` value could break out of the
  // double-quoted `value` attribute and inject additional attributes on
  // the <input> tag. `email` reaches here already HMAC-verified against
  // UNSUBSCRIBE_SECRET (see isValid above), but the same secret signs
  // whatever string an upstream caller (referral-action, nurture-send)
  // chose to pass in — those callers do not restrict the string to a
  // strict email shape — so this endpoint must not assume the value is
  // attribute-safe on its own.
  const safeEmail = email
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  const body = `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 14px;">Von den Lab-Notizen abmelden?</h1>
<p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0 0 24px;">Sie erhalten dann keine weiteren Notizen zu neuen Werkzeugen und Strategie-Updates an <strong>${safeEmail}</strong>.</p>
<form method="POST" action="/api/unsubscribe">
  <input type="hidden" name="e" value="${safeEmail}">
  <input type="hidden" name="t" value="${token}">
  <button type="submit" style="background:#F5A623;color:#0A0A0A;border:0;padding:14px 30px;font-family:system-ui,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;">Abmelden bestätigen</button>
</form>`;
  return html(200, "Abmelden", body);
}

// POST → perform the opt-out.
export async function POST(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  let form: FormData | undefined;
  const ct = request.headers.get("content-type") ?? "";
  if (
    ct.includes("application/x-www-form-urlencoded") ||
    ct.includes("multipart/form-data")
  ) {
    try {
      form = await request.formData();
    } catch {
      return html(400, "Ungültig", invalidBody);
    }
  }
  const { email, token } = resolveUnsubscribeCredentials(searchParams, form);

  if (!isValid(email, token)) return html(400, "Ungültig", invalidBody);

  if (redis) {
    try {
      await redis.sadd(SUPPRESSION_SET, email);
    } catch (err) {
      console.error(
        "[unsubscribe] Redis error:",
        (err as { name?: string })?.name ?? "unknown",
      );
      return html(
        503,
        "Fehler",
        `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Kurzer Fehler</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Bitte versuchen Sie es später erneut oder schreiben Sie uns an <a href="mailto:hello@rautaki.ch" style="color:#1C1C1C;">hello@rautaki.ch</a>.</p>`,
      );
    }
  } else {
    console.error(
      "[unsubscribe] UPSTASH_REDIS_REST_URL/TOKEN not set — cannot record opt-out.",
    );
    return html(
      503,
      "Fehler",
      `<p style="font-size:15px;">Abmeldung derzeit nicht möglich. Bitte schreiben Sie uns an <a href="mailto:hello@rautaki.ch">hello@rautaki.ch</a>.</p>`,
    );
  }

  const body = `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 14px;">Sie sind <em style="font-style:italic;color:#F5A623;">abgemeldet</em>.</h1>
<p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Sie erhalten keine weiteren Lab-Notizen. Falls Sie das versehentlich getan haben, schreiben Sie uns einfach an <a href="mailto:hello@rautaki.ch" style="color:#1C1C1C;">hello@rautaki.ch</a>.</p>`;
  return html(200, "Abgemeldet", body);
}
