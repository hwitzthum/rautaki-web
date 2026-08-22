import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { REFERRAL_EMAIL, REFERRAL_SUBJECT } from "@/lib/referral-templates";
import { verifyReferral, type ReferralParams } from "@/lib/referral-sign";
import {
  createUnsubscribeToken,
  emailIdempotencyKey,
  isValidEmail,
  normalizeEmail,
} from "@/lib/email-security";

// Harry's Approve/Skip click target. GET shows a confirmation (a scanner/prefetch
// must NOT trigger the send); POST performs the send. Never statically cached.
export const dynamic = "force-dynamic";

const SENT_SET = "referral:sent";
const FROM = "Rautaki · Harry Witzthum <harry@send.rautaki.ch>";
const REPLY_TO = "hello@rautaki.ch";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function page(title: string, bodyInner: string, status = 200): NextResponse {
  const doc = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Rautaki</title></head>
<body style="margin:0;background:#E8E5DF;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;"><tr><td align="center">
    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:480px;background:#FAFAFA;">
      <tr><td style="background:#0A0A0A;padding:22px 32px;font-family:Georgia,serif;font-size:22px;color:#FAFAFA;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></td></tr>
      <tr><td style="height:3px;font-size:0;line-height:3px;background:#F5A623;">&nbsp;</td></tr>
      <tr><td style="padding:36px 32px;color:#1C1C1C;">${bodyInner}</td></tr>
      <tr><td style="background:#F4F2EE;padding:16px 32px;text-align:center;font-size:11px;color:rgba(28,28,28,0.35);">Rautaki · Automatisierung</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
  return new NextResponse(doc, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

const invalidBody = `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Link ungültig</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Dieser Link ist ungültig oder abgelaufen.</p>`;

function readParams(sp: URLSearchParams): { p: ReferralParams; t: string } {
  return {
    p: {
      e: (sp.get("e") ?? "").trim(),
      v: (sp.get("v") ?? "").trim(),
      c: (sp.get("c") ?? "").trim(),
      o: (sp.get("o") ?? "").trim(),
      a: (sp.get("a") ?? "").trim(),
      x: (sp.get("x") ?? "").trim(),
    },
    t: (sp.get("t") ?? "").trim(),
  };
}

function unsubscribeUrl(email: string, secret: string): string {
  const normalized = normalizeEmail(email);
  const token = createUnsubscribeToken(normalized, secret);
  const q = new URLSearchParams({ e: normalized, t: token });
  return `https://www.rautaki.ch/api/unsubscribe?${q.toString()}`;
}

// GET → confirmation (send) or acknowledgement (skip). Never sends.
export async function GET(request: NextRequest) {
  const { p, t } = readParams(new URL(request.url).searchParams);
  if (!verifyReferral(p, t)) return page("Ungültig", invalidBody, 400);

  if (p.a === "skip") {
    return page(
      "Übersprungen",
      `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Übersprungen</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Es wurde keine Anfrage an <strong>${esc(p.c)}</strong> gesendet.</p>`,
    );
  }

  // send → confirm page with a POST button (prefetch-safe)
  const q = new URLSearchParams({
    e: p.e,
    v: p.v,
    c: p.c,
    o: p.o,
    a: p.a,
    x: p.x,
    t,
  });
  return page(
    "Bestätigen",
    `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 14px;">Referral senden?</h1>
<p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0 0 24px;">Die Testimonial-/Empfehlungs-Anfrage geht an <strong>${esc(p.v)}</strong> &lt;${esc(p.e)}&gt; (${esc(p.c)}).</p>
<form method="POST" action="/api/referral-action?${q.toString()}">
  <button type="submit" style="background:#F5A623;color:#0A0A0A;border:0;padding:14px 30px;font-family:system-ui,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;">Senden bestätigen</button>
</form>`,
  );
}

// POST → actually send the referral email to the client.
export async function POST(request: NextRequest) {
  const { p, t } = readParams(new URL(request.url).searchParams);
  if (!verifyReferral(p, t) || p.a !== "send") {
    return page("Ungültig", invalidBody, 400);
  }
  const resendKey = process.env.RESEND_API_KEY;
  const unsubscribeSecret = process.env.UNSUBSCRIBE_SECRET;
  if (!resendKey || !unsubscribeSecret) return page("Fehler", invalidBody, 503);
  if (!isValidEmail(p.e)) return page("Ungültig", invalidBody, 400);

  // Replay protection needs the shared dedup set — without Redis in production
  // every re-POST of the same link would send another referral email. Fail closed.
  if (!redis && process.env.NODE_ENV === "production") {
    console.error(
      "[referral-action] UPSTASH_REDIS_REST_URL/TOKEN not set in production — refusing send (no replay protection).",
    );
    return page("Fehler", invalidBody, 503);
  }

  const key = p.o || p.e.toLowerCase();
  if (redis) {
    try {
      const added = await redis.sadd(SENT_SET, key);
      if (added === 0) {
        return page(
          "Bereits gesendet",
          `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Bereits gesendet</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">An <strong>${esc(p.c)}</strong> wurde die Anfrage schon verschickt.</p>`,
        );
      }
    } catch (err) {
      console.error(
        "[referral-action] Redis error:",
        (err as { name?: string })?.name ?? "unknown",
      );
      return page("Fehler", invalidBody, 503);
    }
  }

  const html = REFERRAL_EMAIL.split("{{VORNAME}}")
    .join(esc(p.v || "there"))
    .split("{{UNSUBSCRIBE_URL}}")
    .join(unsubscribeUrl(p.e, unsubscribeSecret));

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: p.e,
      replyTo: REPLY_TO,
      subject: REFERRAL_SUBJECT,
      html,
    },
    { idempotencyKey: emailIdempotencyKey("referral-action", t) },
  );

  if (error) {
    // roll back the idempotency marker so it can be retried
    if (redis) {
      try {
        await redis.srem(SENT_SET, key);
      } catch {
        /* best effort */
      }
    }
    console.error(
      "[referral-action] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return page("Fehler", invalidBody, 502);
  }

  return page(
    "Gesendet",
    `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 14px;">Referral <em style="font-style:italic;color:#F5A623;">gesendet</em>.</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Die Anfrage ging an <strong>${esc(p.v)}</strong> (${esc(p.c)}).</p>`,
  );
}
