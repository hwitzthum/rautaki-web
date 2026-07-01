import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { NURTURE_TEMPLATES } from "@/lib/nurture-templates";

const SUPPRESSION_SET = "nurture:unsub";
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Renders + sends a nurture email; called only by the n8n nurture workflow
// (and by internal tests). Reads runtime data — never statically cached.
export const dynamic = "force-dynamic";

const FROM = "Rautaki · Harry Witzthum <harry@send.rautaki.ch>";
const REPLY_TO = "hello@rautaki.ch";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Same signing scheme the /api/unsubscribe endpoint verifies.
function unsubscribeUrl(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET ?? "";
  const token = crypto
    .createHmac("sha256", secret)
    .update(email.trim().toLowerCase())
    .digest("hex");
  const q = new URLSearchParams({ e: email.trim().toLowerCase(), t: token });
  return `https://www.rautaki.ch/api/unsubscribe?${q.toString()}`;
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (!sendToken || !resendKey || !process.env.UNSUBSCRIBE_SECRET) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Shared-secret auth (constant-time).
  const token = typeof body.token === "string" ? body.token : "";
  if (!timingSafeEqual(token, sendToken)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const templateKey = String(body.template ?? "");
  const template = NURTURE_TEMPLATES[templateKey as "1" | "2" | "3"];
  const to = typeof body.to === "string" ? body.to.trim() : "";
  const unsubEmail =
    typeof body.email === "string" && body.email.trim()
      ? body.email.trim()
      : to;
  const vorname = escapeHtml(
    (typeof body.vorname === "string" ? body.vorname : "").trim() || "there",
  );
  const tool = escapeHtml(
    (typeof body.tool === "string" ? body.tool : "").trim() ||
      "unser Lab-Werkzeug",
  );

  if (!template || !to || !unsubEmail) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  // GDPR: never send to an address that has opted out. Fail open only if Redis
  // is unreachable (better to send than to silently drop legitimate mail).
  if (redis) {
    try {
      const suppressed = await redis.sismember(SUPPRESSION_SET, unsubEmail);
      if (suppressed) {
        return NextResponse.json(
          { ok: true, skipped: "unsubscribed" },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
    } catch (err) {
      console.error(
        "[nurture-send] suppression check failed:",
        (err as { name?: string })?.name ?? "unknown",
      );
    }
  }

  const unsub = unsubscribeUrl(unsubEmail);
  const html = template.html
    .split("{{VORNAME}}")
    .join(vorname)
    .split("{{TOOL}}")
    .join(tool)
    .split("{{UNSUBSCRIBE_URL}}")
    .join(unsub);

  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: template.subject,
    html,
    headers: {
      "List-Unsubscribe": `<${unsub}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  if (error) {
    console.error(
      "[nurture-send] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json(
    { ok: true, id: (data as { id?: string })?.id ?? null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
