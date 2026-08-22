import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { NURTURE_TEMPLATES } from "@/lib/nurture-templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  createUnsubscribeToken,
  isValidEmail,
  normalizeEmail,
  tokenMatches,
} from "@/lib/email-security";
import { readJsonObject } from "@/lib/request-body";

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
function unsubscribeUrl(email: string, secret: string): string {
  const normalized = normalizeEmail(email);
  const token = createUnsubscribeToken(normalized, secret);
  const q = new URLSearchParams({ e: normalized, t: token });
  return `https://www.rautaki.ch/api/unsubscribe?${q.toString()}`;
}

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  const unsubscribeSecret = process.env.UNSUBSCRIBE_SECRET;
  if (!sendToken || !resendKey || !unsubscribeSecret) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const ip = getClientIp(request);
  if (!ip) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const rl = await checkRateLimit("nurture-send", ip, 60, 300);
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

  // Shared-secret auth (constant-time).
  if (!tokenMatches(body.token, sendToken)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const templateKey = String(body.template ?? "");
  const template = NURTURE_TEMPLATES[templateKey as "1" | "2" | "3"];
  const to = typeof body.to === "string" ? body.to.trim() : "";
  // The suppression key and unsubscribe link must always describe the actual
  // recipient. Trusting a second `email` field allowed workflow drift to send
  // to one address while suppressing another.
  const unsubEmail = normalizeEmail(to);
  const vorname = escapeHtml(
    (typeof body.vorname === "string" ? body.vorname : "").trim() || "there",
  );
  const tool = escapeHtml(
    (typeof body.tool === "string" ? body.tool : "").trim() ||
      "unser Lab-Werkzeug",
  );

  if (
    !template ||
    !to ||
    !unsubEmail ||
    !isValidEmail(to)
  ) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  // Never send when suppression state cannot be checked. Failing open here
  // can contact someone who has opted out, which is worse than a retryable
  // workflow failure.
  if (!redis) {
    return NextResponse.json({ error: "service unavailable" }, { status: 503 });
  }
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
    return NextResponse.json({ error: "service unavailable" }, { status: 503 });
  }

  const unsub = unsubscribeUrl(unsubEmail, unsubscribeSecret);
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
