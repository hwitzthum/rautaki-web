import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { renderApproval } from "@/lib/mahnung-templates";
import { signMahnung } from "@/lib/mahnung-sign";

// Called by the n8n #9 workflow for each overdue invoice. Emails Harry an
// Approve/Skip message with signed action links. Never statically cached.
export const dynamic = "force-dynamic";

const APPROVER = "hello@rautaki.ch";
const FROM = "Rautaki · System <harry@send.rautaki.ch>";

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (!sendToken || !resendKey || !process.env.MAHNUNG_SECRET) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
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

  const str = (k: string, fb = "") =>
    typeof body[k] === "string" && (body[k] as string).trim()
      ? (body[k] as string).trim()
      : String(body[k] ?? fb).trim() || fb;

  const e = str("clientEmail");
  const v = str("vorname", "there");
  const company = str("company", "Kunde");
  const n = str("nr");
  const b = str("betrag");
  const f = str("faellig");
  const i = str("invoiceId");
  const l = str("level", "1");

  if (!e || e.indexOf("@") === -1 || !n) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const mk = (a: "send" | "skip") => {
    const t = signMahnung({ e, v, n, b, f, i, l, a });
    const q = new URLSearchParams({ e, v, n, b, f, i, l, a, t });
    return `https://www.rautaki.ch/api/mahnung-action?${q.toString()}`;
  };

  const { subject, html } = renderApproval({
    company,
    clientEmail: e,
    nr: n,
    betrag: b,
    level: Number(l) || 1,
    sendUrl: mk("send"),
    skipUrl: mk("skip"),
  });

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: APPROVER,
    replyTo: APPROVER,
    subject,
    html,
  });

  if (error) {
    console.error(
      "[mahnung-request] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
