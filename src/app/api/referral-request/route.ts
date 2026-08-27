import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { APPROVAL_EMAIL } from "@/lib/referral-templates";
import { linkExpiry, signReferral } from "@/lib/referral-sign";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  emailIdempotencyKey,
  hasControlChars,
  isValidEmail,
  tokenMatches,
} from "@/lib/email-security";
import { readJsonObject } from "@/lib/request-body";

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

function actionUrl(
  e: string,
  v: string,
  c: string,
  o: string,
  a: "send" | "skip",
): string {
  const x = linkExpiry();
  const t = signReferral({ e, v, c, o, a, x });
  const q = new URLSearchParams({ e, v, c, o, a, x, t });
  return `https://www.rautaki.ch/api/referral-action?${q.toString()}`;
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (
    !sendToken ||
    !resendKey ||
    !process.env.REFERRAL_SECRET ||
    !process.env.UNSUBSCRIBE_SECRET
  ) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const ip = getClientIp(request);
  if (!ip) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const rl = await checkRateLimit("referral-request", ip, 60, 300);
  if (rl === "limited") {
    return NextResponse.json(
      { error: "rate limited" },
      { status: 429, headers: { "Retry-After": "300" } },
    );
  }
  if (rl === "unavailable") {
    return NextResponse.json({ error: "service unavailable" }, { status: 503 });
  }

  const parsed = await readJsonObject(request);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.status === 413 ? "payload too large" : "bad request" },
      { status: parsed.status },
    );
  }
  const body = parsed.body;

  if (!tokenMatches(body.token, sendToken)) {
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

  if (
    !isValidEmail(clientEmail) ||
    vorname.length > 200 ||
    company.length > 200 ||
    oppId.length > 200 ||
    hasControlChars(company)
  ) {
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
  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: APPROVER,
      replyTo: APPROVER,
      subject: `Referral freigeben: ${company}?`,
      html,
    },
    {
      idempotencyKey: emailIdempotencyKey(
        "referral-request",
        oppId || clientEmail.toLowerCase(),
      ),
    },
  );

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
