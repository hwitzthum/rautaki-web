# rautaki-web

Website von [Rautaki](https://www.rautaki.ch) — Strategieberatung für das
KI-Zeitalter (Kilchberg ZH, Schweiz). „Rautaki" ist te reo Māori für
_Strategie_; Positionierung: **Strategy · Advisory · Growth**.

## Tech-Stack

| Ebene            | Technologie                                              |
| ---------------- | -------------------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19, TypeScript            |
| Styling          | Tailwind CSS v4, Design-Tokens aus `docs/design/`        |
| Hosting          | Vercel (inkl. Cron `/api/cron/keepalive`, täglich 06:00) |
| E-Mail           | Resend (`send.rautaki.ch`)                               |
| State/Limits     | Upstash Redis (Rate-Limits, Idempotenz-Sets)             |
| Monitoring       | Sentry (Client/Server/Edge, `sendDefaultPii: false`)     |
| Automationen     | n8n (Chat-Backend, CRM-Forwards, Mahnwesen, Referrals)   |
| Buchung          | Cal.com-Embed (`/booking`)                               |
| Consent-Tracking | Salesflare — nur nach Opt-in via ConsentManager          |

## Seiten

| Route                  | Inhalt                                                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                    | Startseite — Hero, Leistungsüberblick, CTA                                                                                                                                                                |
| `/services`            | Leistungen, **„Der Weg zu wirksamer KI"** (`#vorgehen`: 3 Phasen, 9 Schritte, 2 Gates), Preise (`#preise`), Booklet-Download                                                                              |
| `/about`               | Profil Harry Witzthum, Lehrtätigkeit (CAS ikf)                                                                                                                                                            |
| `/booking`             | Erstgespräch buchen (Cal.com)                                                                                                                                                                             |
| `/lab`                 | Kostenlose KI-Tools (Zugang via E-Mail-Gate): EU-AI-Act-Check, KI-Governance-Policy-Generator, Multi-Assistant-GPT — statische HTML-Tools unter `public/lab/` mit eigener, strikterer CSP (`vercel.json`) |
| `/imprint`, `/privacy` | Impressum, Datenschutz                                                                                                                                                                                    |
| `/maintenance`         | Wartungsseite — aktiv via `MAINTENANCE_MODE=true` (`src/proxy.ts`), `noindex`                                                                                                                             |
| `/llms.txt`            | Maschinenlesbare Site-Zusammenfassung für AI-Crawler (llmstxt.org)                                                                                                                                        |

Downloads: `public/downloads/rautaki-ki-beratung-booklet.pdf` (KI-Beratungspaket
für Geschäftsleitungen & Verwaltungsräte; Quelle: `docs/Rautaki_KI-Beratung_Booklet.pdf`).

## API-Routen

| Route                                                              | Zweck                                                         | Schutz                                                                                    |
| ------------------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `POST /api/chat`                                                   | Same-Origin-Proxy für das n8n-Chat-Widget                     | Origin-Gate, IP-/Session-Rate-Limit, Tages-Token-Budget, HMAC Richtung n8n, Output-Filter |
| `POST /api/lab-access`                                             | Lab-Gate-Anmeldung (Operator-Mail + Bestätigung, CRM-Forward) | IP-Limit (3/15 min) + Empfänger-Limit (2/24 h), CSRF-Checks                               |
| `GET/POST /api/mahnung-action`                                     | Approve/Skip-Klickziel Mahnwesen (GET bestätigt, POST sendet) | Signierte Links (HMAC + 14-Tage-Ablauf), Redis-Replay-Schutz (prod fail-closed)           |
| `POST /api/mahnung-request`                                        | n8n → Freigabe-Mail mit signierten Links                      | `N8N_SEND_TOKEN`, Ask-Dedup                                                               |
| `GET/POST /api/referral-action`                                    | Approve/Skip-Klickziel Referrals                              | wie mahnung-action                                                                        |
| `POST /api/referral-request`                                       | n8n → Referral-Freigabe-Mail                                  | `N8N_SEND_TOKEN`                                                                          |
| `POST /api/briefing-send`, `/api/digest-send`, `/api/nurture-send` | n8n-getriggerte Versand-Routen                                | `N8N_SEND_TOKEN`; Nurture zusätzlich fail-closed Suppression-Check                        |
| `GET/POST /api/unsubscribe`                                        | Abmeldung (HMAC-Token + RFC-8058-One-Click)                   | fail-closed ohne Secret                                                                   |
| `GET /api/cron/keepalive`                                          | Hält Upstash Redis aktiv                                      | `CRON_SECRET` (Bearer)                                                                    |

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte eintragen — jede gelesene Variable ist dort dokumentiert
npm run dev                  # http://localhost:3000
```

| Script                            | Zweck                                                       |
| --------------------------------- | ----------------------------------------------------------- |
| `npm run dev` / `build` / `start` | Next.js Standard                                            |
| `npm run lint`                    | ESLint                                                      |
| `npm run test:libs`               | Security-Unit-Tests (Chat, HMAC, E-Mail, JSON, SSRF)        |
| `npm run test:api`                | Chat-API-Härtungstests gegen laufenden Dev-Server           |

Ohne Upstash-Env-Vars fallen reine Rate-Limits lokal auf In-Memory zurück.
Routen, die persistente Suppression oder Idempotenz benötigen, lehnen ab;
in Produktion gilt dies für alle geschützten Routen (fail-closed).

## Sicherheit

Härtungskonzepte und Tests liegen in `security/` (Chatbot-Hardening-Plan,
n8n-Workflow-Hardening, Attack-Probes, Secret-Rotation). Kernpunkte:

- **CSP + Security-Header** global in `next.config.ts`; striktere Zusatz-CSP
  für die statischen Lab-Tools in `vercel.json` (Schnittmenge = Sandbox).
- **Signierte Action-Links** (Mahnung/Referral): HMAC-SHA256 über alle Params
  inkl. Ablauf (`x`, 14 Tage), timing-safe verglichen; GET zeigt nur eine
  Bestätigungsseite (prefetch-sicher), POST löst aus.
- **SSRF-Guard** (`src/lib/ssrf-guard.ts`) für alle ausgehenden Webhook-URLs —
  blockt private/reservierte Adressen inkl. alternativer IP-Schreibweisen.
- **Maintenance-Proxy** (`src/proxy.ts`, Next-16-Konvention — nicht nach
  `middleware.ts` umbenennen): rewrited alles auf `/maintenance`,
  API-Routen antworten 503 JSON, Cron bleibt offen.

## Design-System

Single Source of Truth: `docs/design/` — `style-guide.md`,
`component-specs.md`, `tokens.css`/`tokens.json`, Logo-/Karten-/OG-Generatoren
(`create-logos.py`, `create-og-image.py`, `create-visitenkarte.py`,
`create-praesentation-vorlage.js`) sowie Social-Card-Template.
Palette: Gold `#F5A623` (sparsam — Gold-Regel), Obsidian `#0A0A0A`,
Ink `#1C1C1C`, Cream `#F4F2EE`. Typografie: Georgia (Headings, mit negativem
Letter-Spacing) + DM Sans (UI). Kanten scharf — kein Border-Radius.

## SEO / GEO

- `sitemap.ts`, `robots.ts`, Canonicals auf `https://www.rautaki.ch`
- JSON-LD-Graph in `layout.tsx` (Organization, Person, WebSite) plus
  Service-, OfferCatalog- und HowTo-Schema auf `/services`
- `/llms.txt` für AI-Crawler; OG-Bild `public/og-image.png`
  (Generator: `docs/design/create-og-image.py`)

## Deployment

Vercel, verbunden mit diesem Repo — Push auf `main` deployt Produktion.
Vor Merges mit neuen Env-Abhängigkeiten: Variablen im Vercel-Projekt
anlegen (siehe `.env.example`), nach dem Push Build-Logs prüfen.
