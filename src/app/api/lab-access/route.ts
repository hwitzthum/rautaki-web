import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Rate limiting ──────────────────────────────────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_MAX = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function pruneRateMap(): void {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  pruneRateMap();
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count++;
  return false;
}

// ── Payload validation ─────────────────────────────────────────────────────
interface LabAccessPayload {
  name: string;
  company: string;
  email: string;
}

function isValidPayload(body: unknown): body is LabAccessPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    b.name.length <= 200 &&
    typeof b.company === "string" &&
    b.company.trim().length > 0 &&
    b.company.length <= 200 &&
    typeof b.email === "string" &&
    b.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)
  );
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-Mail-Service nicht konfiguriert" },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    (request.headers.get("x-forwarded-for") ?? "unknown")
      .split(",")[0]
      .trim();

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Bitte füllen Sie alle Pflichtfelder korrekt aus." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Rautaki Lab <noreply@send.rautaki.ch>",
    to: "hello@rautaki.ch",
    replyTo: body.email,
    subject: `Neuer Lab-Zugang: ${body.name} (${body.company})`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #F4F2EE; padding: 0;">
        <div style="background: #0A0A0A; padding: 24px 32px;">
          <div style="font-size: 22px; color: #FAFAFA; font-weight: 400; letter-spacing: 0;">
            Raut<span style="color: #F5A623;">a</span>k<span style="color: #F5A623;">i</span>
          </div>
          <div style="font-family: system-ui, sans-serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.20); margin-top: 4px;">
            Lab · Neuer Zugang
          </div>
        </div>
        <div style="background: #FAFAFA; padding: 32px;">
          <p style="font-family: system-ui, sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(28,28,28,0.45); margin: 0 0 20px;">
            Neue Registrierung
          </p>
          <table style="width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: rgba(28,28,28,0.50); border-bottom: 1px solid rgba(28,28,28,0.08); width: 130px;">Name</td>
              <td style="padding: 10px 0; color: #1C1C1C; font-weight: 500; border-bottom: 1px solid rgba(28,28,28,0.08);">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(28,28,28,0.50); border-bottom: 1px solid rgba(28,28,28,0.08);">Unternehmen</td>
              <td style="padding: 10px 0; color: #1C1C1C; font-weight: 500; border-bottom: 1px solid rgba(28,28,28,0.08);">${body.company}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(28,28,28,0.50);">E-Mail</td>
              <td style="padding: 10px 0; color: #1C1C1C; font-weight: 500;">
                <a href="mailto:${body.email}" style="color: #1C1C1C;">${body.email}</a>
              </td>
            </tr>
          </table>
        </div>
        <div style="background: #F4F2EE; padding: 16px 32px; font-family: system-ui, sans-serif; font-size: 11px; color: rgba(28,28,28,0.35); text-align: center;">
          Rautaki · rautaki.ch
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[lab-access] Resend error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
