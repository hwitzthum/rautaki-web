// Payment-reminder (Mahnwesen) emails — informal "Du". Rendered by the endpoints
// from signed URL params, so values are interpolated here (no {{ }} merge).

const SANS = "system-ui,-apple-system,'Segoe UI',sans-serif";

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function shell(labelText: string, bodyInner: string): string {
  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(labelText)}</title></head>
<body style="margin:0;padding:0;background:#E8E5DF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8E5DF;padding:28px 12px;"><tr><td align="center">
    <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:520px;max-width:520px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;background:#FAFAFA;">
      <tr><td style="background:#0A0A0A;padding:24px 32px;">
        <div style="font-size:22px;color:#FAFAFA;font-weight:400;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></div>
        <div style="font-family:${SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-top:6px;">${esc(labelText)}</div>
      </td></tr>
      <tr><td style="height:3px;line-height:3px;font-size:0;background:#F5A623;">&nbsp;</td></tr>
      <tr><td style="background:#FAFAFA;padding:36px 32px;">${bodyInner}</td></tr>
      <tr><td style="background:#F4F2EE;padding:16px 32px;text-align:center;font-family:${SANS};font-size:11px;color:rgba(28,28,28,0.35);">Rautaki · rautaki.ch</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function h1(text: string): string {
  return `<h1 style="font-family:Georgia,serif;font-size:25px;line-height:1.15;letter-spacing:-0.015em;font-weight:400;color:#1C1C1C;margin:0 0 20px;">${text}</h1>`;
}
function p(text: string, mb = 18): string {
  return `<p style="font-family:${SANS};font-size:15px;line-height:1.75;color:rgba(28,28,28,0.72);margin:0 0 ${mb}px;">${text}</p>`;
}

export interface ReminderData {
  vorname: string;
  nr: string;
  betrag: string;
  faellig: string;
  deadline: string;
}

export function renderReminder(
  level: number,
  d: ReminderData,
): { subject: string; html: string } {
  const vn = esc(d.vorname) || "there";
  const nr = esc(d.nr);
  const betrag = esc(d.betrag);
  const faellig = esc(d.faellig);
  const deadline = esc(d.deadline);
  const sig = p("Herzlich,<br>Harry", 0);

  if (level >= 3) {
    return {
      subject: `2. Mahnung — Rechnung ${d.nr}`,
      html: shell(
        "2. Mahnung",
        h1("2. Mahnung") +
          p(`Hallo ${vn},`, 12) +
          p(
            `trotz unserer Erinnerungen ist die Rechnung <strong>${nr}</strong> über <strong>${betrag}</strong> (fällig am <strong>${faellig}</strong>) weiterhin unbeglichen. Ich bitte dich nun um Begleichung <strong>bis spätestens ${deadline}</strong>.`,
          ) +
          p(
            `Falls du Unterstützung brauchst oder etwas unklar ist, kontaktiere mich bitte umgehend — mir ist an einer guten, fairen Lösung gelegen.`,
            24,
          ) +
          sig,
      ),
    };
  }
  if (level === 2) {
    return {
      subject: `1. Mahnung — Rechnung ${d.nr}`,
      html: shell(
        "1. Mahnung",
        h1("1. Mahnung") +
          p(`Hallo ${vn},`, 12) +
          p(
            `unsere Rechnung <strong>${nr}</strong> über <strong>${betrag}</strong> (fällig am <strong>${faellig}</strong>) ist weiterhin offen. Ich bitte dich, den Betrag innerhalb der nächsten <strong>10 Tage</strong> zu begleichen.`,
          ) +
          p(
            `Sollte es ein Problem geben oder etwas unklar sein, melde dich bitte kurz — wir finden sicher eine Lösung.`,
            24,
          ) +
          sig,
      ),
    };
  }
  return {
    subject: `Zahlungserinnerung — Rechnung ${d.nr}`,
    html: shell(
      "Zahlungserinnerung",
      h1("Zahlungserinnerung") +
        p(`Hallo ${vn},`, 12) +
        p(
          `vermutlich ist es in der Alltagshektik untergegangen: Unsere Rechnung <strong>${nr}</strong> über <strong>${betrag}</strong> war am <strong>${faellig}</strong> fällig und ist noch offen. Falls deine Zahlung bereits unterwegs ist, betrachte diese Nachricht bitte als gegenstandslos.`,
        ) +
        p(
          `Bei Fragen oder falls die Rechnung nicht vorliegt, melde dich jederzeit.`,
          24,
        ) +
        sig,
    ),
  };
}

export interface ApprovalData {
  company: string;
  clientEmail: string;
  nr: string;
  betrag: string;
  level: number;
  sendUrl: string;
  skipUrl: string;
}

export function renderApproval(d: ApprovalData): {
  subject: string;
  html: string;
} {
  const stufe =
    d.level >= 3
      ? "2. Mahnung"
      : d.level === 2
        ? "1. Mahnung"
        : "Zahlungserinnerung";
  const body =
    `<div style="font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#9A9590;margin:0 0 14px;">Freigabe · ${esc(stufe)}</div>` +
    h1("Zahlungserinnerung freigeben?") +
    p(
      `<strong>${esc(d.company)}</strong> — Rechnung <strong>${esc(d.nr)}</strong> über <strong>${esc(d.betrag)}</strong> ist überfällig. <strong>${esc(stufe)}</strong> an <strong>${esc(d.clientEmail)}</strong> senden?`,
      26,
    ) +
    `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="background:#F5A623;"><a href="${d.sendUrl}" style="display:inline-block;font-family:${SANS};font-size:12px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#0A0A0A;text-decoration:none;padding:15px 28px;">Senden</a></td>
      <td style="width:12px;">&nbsp;</td>
      <td style="border:1px solid rgba(28,28,28,0.30);"><a href="${d.skipUrl}" style="display:inline-block;font-family:${SANS};font-size:12px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(28,28,28,0.65);text-decoration:none;padding:14px 28px;">Überspringen</a></td>
    </tr></table>`;
  return {
    subject: `Mahnung freigeben: ${d.company} — ${d.nr} (${stufe})`,
    html: shell(`System · Freigabe`, body),
  };
}

export interface HeadsUpData {
  company: string;
  nr: string;
  betrag: string;
  faellig: string;
  level: number;
}

// No client email on file → notify Harry to follow up manually (no action links).
export function renderHeadsUp(d: HeadsUpData): { subject: string; html: string } {
  const stufe =
    d.level >= 3 ? "2. Mahnung" : d.level === 2 ? "1. Mahnung" : "Zahlungserinnerung";
  const body =
    `<div style="font-family:${SANS};font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#9A9590;margin:0 0 14px;">Überfällig · ${esc(stufe)}</div>` +
    h1("Bitte manuell nachfassen") +
    p(
      `<strong>${esc(d.company)}</strong> — Rechnung <strong>${esc(d.nr)}</strong> über <strong>${esc(d.betrag)}</strong> (fällig am <strong>${esc(d.faellig)}</strong>) ist überfällig (<strong>${esc(stufe)}</strong>).`,
      14,
    ) +
    p(
      `Für diesen Kunden ist keine E-Mail hinterlegt — bitte per Post/Telefon nachfassen oder die E-Mail in CashCtrl ergänzen.`,
      0,
    );
  return {
    subject: `Überfällig (manuell): ${d.company} — ${d.nr} (${stufe})`,
    html: shell(`System · Überfällig`, body),
  };
}
