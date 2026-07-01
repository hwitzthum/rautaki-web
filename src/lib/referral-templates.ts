// Referral / testimonial flow templates.
// REFERRAL_EMAIL → sent to the paid client (informal "Du"). Placeholders:
//   {{VORNAME}}, {{UNSUBSCRIBE_URL}}.
// APPROVAL_EMAIL → sent to Harry to approve/skip. Placeholders:
//   {{COMPANY}}, {{CLIENT_EMAIL}}, {{SEND_URL}}, {{SKIP_URL}}.

const LINKEDIN_URL = "https://www.linkedin.com/in/harry-witzthum-25b814a/";

export const REFERRAL_SUBJECT = "Eine kurze Bitte zum Schluss";

export const REFERRAL_EMAIL = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Eine kurze Bitte zum Schluss</title></head>
<body style="margin:0; padding:0; background:#E8E5DF;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#E8E5DF; font-size:1px; line-height:1px;">Falls die Zusammenarbeit für dich wertvoll war.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8E5DF; padding:28px 12px;"><tr><td align="center">
    <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:520px; max-width:520px; margin:0 auto; font-family:Georgia,'Times New Roman',serif;">
      <tr><td style="background:#0A0A0A; padding:24px 32px;">
        <div style="font-size:22px; color:#FAFAFA; font-weight:400;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></div>
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.28); margin-top:6px;">Danke</div>
      </td></tr>
      <tr><td style="height:3px; line-height:3px; font-size:0; background:#F5A623; background:linear-gradient(90deg,#F5A623,rgba(245,166,35,0));">&nbsp;</td></tr>
      <tr><td style="background:#FAFAFA; padding:36px 32px;">
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:11px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#9A9590; margin:0 0 18px;">Danke</div>
        <h1 style="font-family:Georgia,serif; font-size:26px; line-height:1.15; letter-spacing:-0.015em; font-weight:400; color:#1C1C1C; margin:0 0 22px;">Eine kurze Bitte</h1>
        <p style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.75; color:rgba(28,28,28,0.72); margin:0 0 12px;">Hallo {{VORNAME}},</p>
        <p style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.75; color:rgba(28,28,28,0.72); margin:0 0 20px;">danke für die Zusammenarbeit — sie hat mir Freude gemacht. Falls sie für dich wertvoll war, würde mir eines dieser drei Dinge sehr helfen:</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          <tr><td valign="top" style="width:34px; font-family:Georgia,serif; font-size:20px; color:#1C1C1C; padding:0 0 16px;">1</td>
              <td valign="top" style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.6; color:rgba(28,28,28,0.72); padding:2px 0 16px;">Eine kurze Rückmeldung (ein, zwei Sätze), die ich — mit deinem Einverständnis — als Referenz nutzen darf.</td></tr>
          <tr><td valign="top" style="width:34px; font-family:Georgia,serif; font-size:20px; color:#1C1C1C; padding:0 0 16px;">2</td>
              <td valign="top" style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.6; color:rgba(28,28,28,0.72); padding:2px 0 16px;">Eine Empfehlung auf LinkedIn.</td></tr>
          <tr><td valign="top" style="width:34px; font-family:Georgia,serif; font-size:20px; color:#1C1C1C; padding:0;">3</td>
              <td valign="top" style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.6; color:rgba(28,28,28,0.72); padding:2px 0 0;">Ein Hinweis auf jemanden, für den KI-Strategie gerade Thema ist.</td></tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 26px;"><tr><td style="background:#F5A623;">
          <a href="${LINKEDIN_URL}" style="display:inline-block; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.16em; text-transform:uppercase; color:#0A0A0A; text-decoration:none; padding:15px 30px;">Auf LinkedIn empfehlen&nbsp;&rarr;</a>
        </td></tr></table>
        <p style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.75; color:rgba(28,28,28,0.72); margin:0 0 22px;">Kein Aufwand nötig — auch ein einzelner Satz genügt. Herzlichen Dank.</p>
        <p style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.75; color:rgba(28,28,28,0.72); margin:0;">Herzlich,<br>Harry</p>
      </td></tr>
      <tr><td style="background:#F4F2EE; padding:18px 32px; text-align:center; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:11px; line-height:1.7; color:rgba(28,28,28,0.35);">
        Rautaki · rautaki.ch<br>
        <a href="{{UNSUBSCRIBE_URL}}" style="color:rgba(28,28,28,0.40); text-decoration:underline;">Abmelden</a>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

export const APPROVAL_EMAIL = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Referral freigeben?</title></head>
<body style="margin:0; padding:0; background:#E8E5DF;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#E8E5DF; font-size:1px; line-height:1px;">{{COMPANY}} hat bezahlt — Referral-Anfrage freigeben?</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E8E5DF; padding:28px 12px;"><tr><td align="center">
    <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:520px; max-width:520px; margin:0 auto; font-family:Georgia,'Times New Roman',serif;">
      <tr><td style="background:#0A0A0A; padding:24px 32px;">
        <div style="font-size:22px; color:#FAFAFA; font-weight:400;">Raut<span style="color:#F5A623;">a</span>k<span style="color:#F5A623;">i</span></div>
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.28); margin-top:6px;">System · Freigabe</div>
      </td></tr>
      <tr><td style="height:3px; line-height:3px; font-size:0; background:#F5A623;">&nbsp;</td></tr>
      <tr><td style="background:#FAFAFA; padding:36px 32px;">
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:11px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:#9A9590; margin:0 0 18px;">Referral</div>
        <h1 style="font-family:Georgia,serif; font-size:26px; line-height:1.15; letter-spacing:-0.015em; font-weight:400; color:#1C1C1C; margin:0 0 20px;">Referral freigeben?</h1>
        <p style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:15px; line-height:1.7; color:rgba(28,28,28,0.72); margin:0 0 26px;"><strong>{{COMPANY}}</strong> hat eine Rechnung bezahlt. Soll die Testimonial-/LinkedIn-/Empfehlungs-Anfrage an <strong>{{CLIENT_EMAIL}}</strong> gesendet werden?</p>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="background:#F5A623;">
            <a href="{{SEND_URL}}" style="display:inline-block; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:#0A0A0A; text-decoration:none; padding:15px 28px;">Senden</a>
          </td>
          <td style="width:12px;">&nbsp;</td>
          <td style="border:1px solid rgba(28,28,28,0.30);">
            <a href="{{SKIP_URL}}" style="display:inline-block; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:12px; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:rgba(28,28,28,0.65); text-decoration:none; padding:14px 28px;">Überspringen</a>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#F4F2EE; padding:16px 32px; text-align:center; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; font-size:11px; color:rgba(28,28,28,0.35);">Rautaki · Automatisierung</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
