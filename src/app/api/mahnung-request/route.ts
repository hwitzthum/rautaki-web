import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { renderApproval, renderHeadsUp } from "@/lib/mahnung-templates";
import { linkExpiry, signMahnung } from "@/lib/mahnung-sign";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  emailIdempotencyKey,
  isValidEmail,
  tokenMatches,
} from "@/lib/email-security";
import { readJsonObject } from "@/lib/request-body";

// Called by the n8n #9 workflow for each overdue invoice. Emails Harry an
// Approve/Skip message with signed action links. Never statically cached.
export const dynamic = "force-dynamic";

const APPROVER = "hello@rautaki.ch";
const FROM = "Rautaki · System <harry@send.rautaki.ch>";
const ASKED_SET = "mahnung:asked";

// The n8n workflow POSTs every overdue invoice daily; dedup the ASK here so Harry
// is emailed at most once per (invoice, level). (Manual invoices have no
// Salesflare account to tag, so state lives here.)
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function POST(request: NextRequest) {
  const sendToken = process.env.N8N_SEND_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  if (!sendToken || !resendKey || !process.env.MAHNUNG_SECRET) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const ip = getClientIp(request);
  if (!ip) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const rl = await checkRateLimit("mahnung-request", ip, 60, 300);
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

  const level = Number(l);
  if (
    !n ||
    n.length > 100 ||
    v.length > 200 ||
    company.length > 200 ||
    b.length > 100 ||
    f.length > 100 ||
    i.length > 100 ||
    !Number.isInteger(level) ||
    level < 1 ||
    level > 3 ||
    (e !== "" && !isValidEmail(e))
  ) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  // With a valid client email → approval email (a real reminder can be sent).
  // Without one → heads-up to Harry to follow up manually.
  const hasEmail = !!e && e.indexOf("@") !== -1;
  const mode = hasEmail ? "email" : "manual";

  // Dedup: one message per (invoice, level). Invoice number is a stable
  // fallback for workflows that do not expose CashCtrl's numeric invoice ID.
  const dedupKey = `${i || n}:${level}`;
  if (!redis && process.env.NODE_ENV === "production") {
    console.error(
      "[mahnung-request] UPSTASH_REDIS_REST_URL/TOKEN not set in production — refusing request (no deduplication).",
    );
    return NextResponse.json({ error: "service unavailable" }, { status: 503 });
  }
  if (redis) {
    try {
      const added = await redis.sadd(ASKED_SET, dedupKey);
      if (added === 0) {
        return NextResponse.json(
          { ok: true, skipped: true },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
    } catch (err) {
      console.error(
        "[mahnung-request] asked-dedup failed:",
        (err as { name?: string })?.name ?? "unknown",
      );
      return NextResponse.json({ error: "service unavailable" }, { status: 503 });
    }
  }

  const x = linkExpiry();
  const mk = (a: "send" | "skip") => {
    const t = signMahnung({ e, v, n, b, f, i, l, a, x });
    const q = new URLSearchParams({ e, v, n, b, f, i, l, a, x, t });
    return `https://www.rautaki.ch/api/mahnung-action?${q.toString()}`;
  };

  const { subject, html } = hasEmail
    ? renderApproval({
        company,
        clientEmail: e,
        nr: n,
        betrag: b,
        level,
        sendUrl: mk("send"),
        skipUrl: mk("skip"),
      })
    : renderHeadsUp({ company, nr: n, betrag: b, faellig: f, level });

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: APPROVER,
      replyTo: APPROVER,
      subject,
      html,
    },
    { idempotencyKey: emailIdempotencyKey("mahnung-request", dedupKey) },
  );

  if (error) {
    // roll back the asked marker so this invoice/level can be retried tomorrow
    if (redis) {
      try {
        await redis.srem(ASKED_SET, dedupKey);
      } catch {
        /* best effort */
      }
    }
    console.error(
      "[mahnung-request] Resend error:",
      (error as { name?: string })?.name ?? "unknown",
    );
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json(
    { ok: true, skipped: false, mode },
    { headers: { "Cache-Control": "no-store" } },
  );
}
