import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { APPROVAL_EMAIL } from "@/lib/referral-templates";
import { signReferral } from "@/lib/referral-sign";

// Called by the n8n #10 workflow when a client pays. Emails Harry an
// Approve/Skip message with signed action links. Never statically cached.
export const dynamic = "force-dynamic";

const APPROVER = "hello@rautaki.ch";
const FROM = "Rautaki · System <harry@send.rautaki.ch>";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

function actionUrl(
  e: string,
  v: string,
  c: string,
  o: string,
  a: "send" | "skip",
): string {
  const t = signReferral({ e, v, c, o, a });
  const q = new URLSearchParams({ e, v, c, o, a, t });
  return `https://www.rautaki.ch/api/referral-action?${q.toString()}`;
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (!sendToken || !resendKey || !process.env.REFERRAL_SECRET) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  if (!timingSafeEqual(token, sendToken)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const clientEmail =
    typeof body.clientEmail === "string" ? body.clientEmail.trim() : "";
  const vorname =
    typeof body.vorname === "string" && body.vorname.trim()
      ? body.vorname.trim()
      : "there";
  const company =
    typeof body.company === "string" && body.company.trim()
      ? body.company.trim()
      : "Kunde";
  const oppId =
    typeof body.oppId === "string" ? body.oppId : String(body.oppId ?? "");

  if (!clientEmail || clientEmail.indexOf("@") === -1) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const sendUrl = actionUrl(clientEmail, vorname, company, oppId, "send");
  const skipUrl = actionUrl(clientEmail, vorname, company, oppId, "skip");

  const html = APPROVAL_EMAIL.split("{{COMPANY}}")
    .join(esc(company))
    .split("{{CLIENT_EMAIL}}")
    .join(esc(clientEmail))
    .split("{{SEND_URL}}")
    .join(sendUrl)
    .split("{{SKIP_URL}}")
    .join(skipUrl);

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: APPROVER,
    replyTo: APPROVER,
    subject: `Referral freigeben: ${company}?`,
    html,
  });

  if (error) {
    console.error(
      "[referral-request] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
