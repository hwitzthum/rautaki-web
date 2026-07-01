import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

// Pre-call briefing. The n8n #4 workflow compiles a lead's context (Lab tool,
// nurture history, activity) for a booked Beratung and POSTs it here; this
// renders the branded briefing and sends it to hello@.
export const dynamic = "force-dynamic";

const TO = "hello@rautaki.ch";
const FROM = "Rautaki · Briefing <harry@send.rautaki.ch>";
const SANS = "system-ui,-apple-system,'Segoe UI',sans-serif";

interface BriefingPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  meeting?: string; // display string, e.g. "Heute 14:00"
  labTool?: string;
  nurture?: string;
  source?: string;
  message?: string;
  activity?: string[];
  salesflareUrl?: string;
}

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

function label(text: string): string {
  return `<div style="font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#9A9590;margin:0 0 10px;">${esc(text)}</div>`;
}
function line(l: string, r: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="font-family:${SANS};font-size:13px;color:#9A9590;padding:5px 0;width:34%;vertical-align:top;">${l}</td>
    <td style="font-family:${SANS};font-size:14px;color:rgba(28,28,28,0.82);padding:5px 0;vertical-align:top;">${r}</td></tr></table>`;
}

function render(d: BriefingPayload): { subject: string; html: string } {
  const name = esc(d.name || "Unbekannt");
  const company = esc(d.company || "");
  const meeting = esc(d.meeting || "");

  const contactRows =
    line("Name", `<strong>${name}</strong>`) +
    (company ? line("Firma", company) : "") +
    (d.email
      ? line(
          "E-Mail",
          `<a href="mailto:${esc(d.email)}" style="color:#1C1C1C;">${esc(d.email)}</a>`,
        )
      : "") +
    (d.phone ? line("Telefon", esc(d.phone)) : "") +
    line("Termin", `<strong>${meeting}</strong>`);

  const ctxRows =
    (d.labTool ? line("Lab-Tool", esc(d.labTool)) : "") +
    (d.nurture ? line("Nurture", esc(d.nurture)) : "") +
    (d.source ? line("Quelle", esc(d.source)) : "") +
    (d.message ? line("Notiz", esc(d.message)) : "");

  const acts = (d.activity ?? []).filter(Boolean);
  const activityBlock = acts.length
    ? label("Aktivität") +
      acts
        .slice(0, 8)
        .map(
          (a) =>
            `<div style="font-family:${SANS};font-size:14px;line-height:1.5;color:rgba(28,28,28,0.72);padding:3px 0 3px 14px;border-left:2px solid #F5A623;margin:0 0 4px;">${esc(a)}</div>`,
        )
        .join("")
    : "";

  const cta = d.salesflareUrl
    ? `<tr><td style="padding:8px 32px 4px;"><a href="${esc(d.salesflareUrl)}" style="font-family:${SANS};font-size:12px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#0A0A0A;text-decoration:none;background:#F5A623;display:inline-block;padding:13px 26px;">Volle Historie in Salesflare &rarr;</a></td></tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Pre-Call Briefing</title></head>
<body style="margin:0;padding:0;background:#E8E5DF;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#E8E5DF;font-size:1px;">Briefing: ${name}${company ? " · " + company : ""} — ${meeting}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8E5DF;padding:28px 12px;"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;background:#FAFAFA;">
      <tr><td style="background:#0A0A0A;padding:24px 32px;">
        <div style="font-size:22px;color:#FAFAFA;font-weight:400;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></div>
        <div style="font-family:${SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-top:6px;">Pre-Call Briefing</div>
      </td></tr>
      <tr><td style="height:3px;line-height:3px;font-size:0;background:#F5A623;background:linear-gradient(90deg,#F5A623,rgba(245,166,35,0));">&nbsp;</td></tr>
      <tr><td style="background:#FAFAFA;padding:30px 32px 6px;">
        <h1 style="font-family:Georgia,serif;font-size:25px;line-height:1.15;letter-spacing:-0.015em;font-weight:400;color:#1C1C1C;margin:0 0 4px;">${name}</h1>
        ${company ? `<div style="font-family:${SANS};font-size:14px;color:#9A9590;margin:0 0 20px;">${company}</div>` : `<div style="margin:0 0 16px;"></div>`}
      </td></tr>
      <tr><td style="padding:4px 32px 12px;">${label("Kontakt & Termin")}${contactRows}</td></tr>
      ${ctxRows ? `<tr><td style="padding:12px 32px;">${label("Kontext")}${ctxRows}</td></tr>` : ""}
      ${activityBlock ? `<tr><td style="padding:12px 32px;">${activityBlock}</td></tr>` : ""}
      ${cta}
      <tr><td style="background:#F4F2EE;padding:16px 32px;text-align:center;font-family:${SANS};font-size:11px;color:rgba(28,28,28,0.35);margin-top:16px;">Rautaki · Automatisierung</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  return {
    subject: `Briefing: ${d.name || "Beratung"}${company ? " · " + company : ""} — ${meeting}`,
    html,
  };
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (!sendToken || !resendKey) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let body: BriefingPayload & { token?: string };
  try {
    body = (await request.json()) as BriefingPayload & { token?: string };
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  if (
    !timingSafeEqual(
      typeof body.token === "string" ? body.token : "",
      sendToken,
    )
  ) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { subject, html } = render(body);
  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: TO,
    subject,
    html,
  });

  if (error) {
    console.error(
      "[briefing-send] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
