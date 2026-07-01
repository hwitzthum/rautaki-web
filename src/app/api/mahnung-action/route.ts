import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { renderReminder } from "@/lib/mahnung-templates";
import { verifyMahnung, type MahnungParams } from "@/lib/mahnung-sign";

// Harry's Approve/Skip click target for payment reminders. GET shows a
// confirmation (prefetch-safe); POST sends the reminder to the client.
export const dynamic = "force-dynamic";

const SENT_SET = "mahnung:sent";
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
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function page(title: string, inner: string, status = 200): NextResponse {
  const doc = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Rautaki</title></head>
<body style="margin:0;background:#E8E5DF;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;"><tr><td align="center">
    <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:480px;background:#FAFAFA;">
      <tr><td style="background:#0A0A0A;padding:22px 32px;font-family:Georgia,serif;font-size:22px;color:#FAFAFA;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></td></tr>
      <tr><td style="height:3px;font-size:0;line-height:3px;background:#F5A623;">&nbsp;</td></tr>
      <tr><td style="padding:36px 32px;color:#1C1C1C;">${inner}</td></tr>
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

const invalid = `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Link ungültig</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Dieser Link ist ungültig oder abgelaufen.</p>`;

function readParams(sp: URLSearchParams): { p: MahnungParams; t: string } {
  return {
    p: {
      e: (sp.get("e") ?? "").trim(),
      v: (sp.get("v") ?? "").trim(),
      n: (sp.get("n") ?? "").trim(),
      b: (sp.get("b") ?? "").trim(),
      f: (sp.get("f") ?? "").trim(),
      i: (sp.get("i") ?? "").trim(),
      l: (sp.get("l") ?? "").trim(),
      a: (sp.get("a") ?? "").trim(),
    },
    t: (sp.get("t") ?? "").trim(),
  };
}

function deadlinePlus10(): string {
  const d = new Date(Date.now() + 10 * 86400000);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export async function GET(request: NextRequest) {
  const { p, t } = readParams(new URL(request.url).searchParams);
  if (!verifyMahnung(p, t)) return page("Ungültig", invalid, 400);

  const stufe =
    p.l >= "3"
      ? "2. Mahnung"
      : p.l === "2"
        ? "1. Mahnung"
        : "Zahlungserinnerung";
  if (p.a === "skip") {
    return page(
      "Übersprungen",
      `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Übersprungen</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Für Rechnung <strong>${esc(p.n)}</strong> wurde keine ${esc(stufe)} gesendet.</p>`,
    );
  }
  const q = new URLSearchParams({
    e: p.e,
    v: p.v,
    n: p.n,
    b: p.b,
    f: p.f,
    i: p.i,
    l: p.l,
    a: p.a,
    t,
  });
  return page(
    "Bestätigen",
    `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 14px;">${esc(stufe)} senden?</h1>
<p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0 0 24px;">An <strong>${esc(p.v)}</strong> &lt;${esc(p.e)}&gt; — Rechnung <strong>${esc(p.n)}</strong> über <strong>${esc(p.b)}</strong>.</p>
<form method="POST" action="/api/mahnung-action?${q.toString()}">
  <button type="submit" style="background:#F5A623;color:#0A0A0A;border:0;padding:14px 30px;font-family:system-ui,sans-serif;font-size:12px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;">Senden bestätigen</button>
</form>`,
  );
}

export async function POST(request: NextRequest) {
  const { p, t } = readParams(new URL(request.url).searchParams);
  if (!verifyMahnung(p, t) || p.a !== "send")
    return page("Ungültig", invalid, 400);

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return page("Fehler", invalid, 503);

  const key = `${p.i}:${p.l}`;
  if (redis) {
    try {
      const added = await redis.sadd(SENT_SET, key);
      if (added === 0) {
        return page(
          "Bereits gesendet",
          `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 12px;">Bereits gesendet</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">Diese Stufe wurde für Rechnung <strong>${esc(p.n)}</strong> schon verschickt.</p>`,
        );
      }
    } catch (err) {
      console.error(
        "[mahnung-action] Redis error:",
        (err as { name?: string })?.name ?? "unknown",
      );
    }
  }

  const level = Number(p.l) || 1;
  const { subject, html } = renderReminder(level, {
    vorname: p.v,
    nr: p.n,
    betrag: p.b,
    faellig: p.f,
    deadline: deadlinePlus10(),
  });

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: p.e,
    replyTo: REPLY_TO,
    subject,
    html,
  });

  if (error) {
    if (redis) {
      try {
        await redis.srem(SENT_SET, key);
      } catch {
        /* best effort */
      }
    }
    console.error(
      "[mahnung-action] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return page("Fehler", invalid, 502);
  }

  const stufe =
    level >= 3
      ? "2. Mahnung"
      : level === 2
        ? "1. Mahnung"
        : "Zahlungserinnerung";
  return page(
    "Gesendet",
    `<h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;letter-spacing:-0.01em;margin:0 0 14px;">${esc(stufe)} <em style="font-style:italic;color:#F5A623;">gesendet</em>.</h1><p style="font-size:15px;line-height:1.7;color:rgba(28,28,28,0.65);margin:0;">An <strong>${esc(p.v)}</strong> für Rechnung <strong>${esc(p.n)}</strong>.</p>`,
  );
}
