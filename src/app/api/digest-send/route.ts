import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

// Weekly business digest. n8n aggregates Salesflare + CashCtrl and POSTs the
// numbers here; this renders the branded email and sends it to hello@.
export const dynamic = "force-dynamic";

const TO = "hello@rautaki.ch";
const FROM = "Rautaki · Wochenüberblick <harry@send.rautaki.ch>";

interface Row {
  stage?: string;
  label?: string;
  company?: string;
  name?: string;
  count?: number;
  value?: number;
}
interface DigestPayload {
  period?: string;
  currency?: string;
  newLeads?: { count?: number; list?: Row[] };
  pipeline?: Row[];
  pipelineTotal?: { count?: number; value?: number };
  won?: { count?: number; value?: number };
  lost?: { count?: number };
  receivables?: { count?: number; total?: number };
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

function fmtMoney(n: number | undefined, cur: string): string {
  const v = Math.round(Number(n) || 0);
  return `${cur} ${v.toLocaleString("de-CH")}`;
}

// ── Rendering ────────────────────────────────────────────────────────────────
const SANS = "system-ui,-apple-system,'Segoe UI',sans-serif";

function label(text: string): string {
  return `<div style="font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#9A9590;margin:0 0 12px;">${esc(text)}</div>`;
}

function statLine(left: string, right: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 6px;"><tr>
    <td style="font-family:${SANS};font-size:14px;color:rgba(28,28,28,0.72);padding:6px 0;border-bottom:1px solid rgba(28,28,28,0.08);">${left}</td>
    <td align="right" style="font-family:Georgia,serif;font-size:15px;color:#1C1C1C;padding:6px 0;border-bottom:1px solid rgba(28,28,28,0.08);white-space:nowrap;">${right}</td>
  </tr></table>`;
}

function section(inner: string): string {
  return `<tr><td style="padding:28px 32px 8px;">${inner}</td></tr>`;
}

function render(d: DigestPayload): { subject: string; html: string } {
  const cur = d.currency || "CHF";
  const period = d.period || "Diese Woche";

  const leads = d.newLeads?.list ?? [];
  const leadsInner =
    label(`Neue Leads · ${d.newLeads?.count ?? 0}`) +
    (leads.length
      ? leads
          .slice(0, 8)
          .map((l) => statLine(esc(l.name || "—"), esc(l.company || "")))
          .join("")
      : `<p style="font-family:${SANS};font-size:14px;color:#9A9590;margin:0;">Keine neuen Leads diese Woche.</p>`);

  const pipe = d.pipeline ?? [];
  const pipeInner =
    label("Pipeline nach Stufe") +
    (pipe.length
      ? pipe
          .map((p) =>
            statLine(
              `${esc(p.stage || "—")} <span style="color:#9A9590;">· ${p.count ?? 0}</span>`,
              fmtMoney(p.value, cur),
            ),
          )
          .join("") +
        statLine(
          `<strong>Gesamt · ${d.pipelineTotal?.count ?? 0}</strong>`,
          `<strong>${fmtMoney(d.pipelineTotal?.value, cur)}</strong>`,
        )
      : `<p style="font-family:${SANS};font-size:14px;color:#9A9590;margin:0;">Keine offenen Opportunities.</p>`);

  const wlInner =
    label("Diese Woche") +
    statLine(
      "Gewonnen",
      `${d.won?.count ?? 0} · ${fmtMoney(d.won?.value, cur)}`,
    ) +
    statLine("Verloren", `${d.lost?.count ?? 0}`);

  const recInner =
    label("Offene Forderungen") +
    statLine(
      `Offene Rechnungen · ${d.receivables?.count ?? 0}`,
      `<strong>${fmtMoney(d.receivables?.total, cur)}</strong>`,
    );

  const html = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Wochenüberblick</title></head>
<body style="margin:0;padding:0;background:#E8E5DF;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#E8E5DF;font-size:1px;">Dein Wochenüberblick — Leads, Pipeline, Forderungen.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8E5DF;padding:28px 12px;"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;background:#FAFAFA;">
      <tr><td style="background:#0A0A0A;padding:24px 32px;">
        <div style="font-size:22px;color:#FAFAFA;font-weight:400;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></div>
        <div style="font-family:${SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-top:6px;">Wochenüberblick · ${esc(period)}</div>
      </td></tr>
      <tr><td style="height:3px;line-height:3px;font-size:0;background:#F5A623;background:linear-gradient(90deg,#F5A623,rgba(245,166,35,0));">&nbsp;</td></tr>
      ${section(leadsInner)}
      ${section(pipeInner)}
      ${section(wlInner)}
      ${section(recInner)}
      <tr><td style="padding:20px 32px 8px;"><a href="https://app.salesflare.com" style="font-family:${SANS};font-size:12px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#0A0A0A;text-decoration:none;background:#F5A623;display:inline-block;padding:13px 26px;">In Salesflare öffnen &rarr;</a></td></tr>
      <tr><td style="background:#F4F2EE;padding:16px 32px;text-align:center;font-family:${SANS};font-size:11px;color:rgba(28,28,28,0.35);margin-top:20px;">Rautaki · Automatisierung</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  return { subject: `Wochenüberblick · ${period}`, html };
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (!sendToken || !resendKey) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let body: DigestPayload & { token?: string };
  try {
    body = (await request.json()) as DigestPayload & { token?: string };
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
      "[digest-send] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
