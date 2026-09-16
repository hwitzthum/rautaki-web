# Gesamtpaket «Apps»: Umbau rautaki.ch und Vorlagen für alle Apps

Stand: 2026-09-16 · Planungsdokument mit Fortschritts-Tracker · Projekte `rautaki-web` (Teil A) und
`app-schaufenster` (Teil B)

Zwei Teile, ein Tracker:

- **Teil A** — www.rautaki.ch: «Lab» wird «Apps», Anbindung von apps.rautaki.ch (Phasen 1–10, Projekt `rautaki-web`).
- **Teil B** — apps.rautaki.ch: Vorlage («Skill») zum Herunterladen für die fünf übrigen Apps, wie beim
  Antwort-Assistenten (Phasen B0–B7, Projekt `app-schaufenster`; die Aufgaben entstehen dort unter `docs/tasks/`).

Konventionen (wie `docs/geo-roadmap.md`): Checkbox im selben PR abhaken, der den Punkt
abschliesst. Die Tabelle «Stand der Umsetzung» bei jedem Schritt nachführen: Status,
Datum, PR oder Person. Wer den Stand wissen will, liest nur diese Tabelle.

---

## Stand der Umsetzung

Status-Werte: `offen` · `in Arbeit` · `erledigt` · `blockiert` (Grund in der Spalte Notiz).

| Phase | Inhalt | Status | Datum | PR / Wer | Notiz |
|---|---|---|---|---|---|
| 0 | Entscheide und Plan | erledigt | 2026-09-16 | Auftraggeber + Claude | dieses Dokument |
| 1 | Menü und Fusszeile: «Lab» → «Apps» | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab` | zusätzlich `localePath` in `src/lib/i18n.ts`: absolute URLs bleiben ohne `/en`-Präfix |
| 2 | Lab-Seiten und E-Mail-Schranke abbauen | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab` | `/lab`, `/en/lab` liefern bis Phase 4 ein 404 |
| 3 | HTML-Werkzeuge archivieren | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab` | `archiv/lab/`, Vendor-Pfade dort relativ; `archiv/**` in ESLint-Ignores |
| 4 | Weiterleitungen alter Lab-Adressen | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab` | `redirects()` in `next.config.ts`, 308, exakte Pfade |
| 5 | Sitemap, llms.txt, Schemas nachführen | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab` | App-Texte wörtlich aus `app-schaufenster/src/apps/verzeichnis.ts`; EN-Fassung ist Übersetzung durch Claude — Wortlaut-Freigabe offen |
| 6 | Dokumentation im Repository | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab` | README, geo-roadmap P6, chatbot-hardening-plan |
| 7 | Neuer Chatbot-Prompt für n8n (vollständig, freigegeben) | erledigt | 2026-09-16 | Claude, Branch `claude/apps-statt-lab`; Freigabe Auftraggeber | Block in `security/n8n-workflow-hardening.md` §1, Status dort «DRAFT» bis Phase 8 ihn einspielt |
| 8 | Ausserhalb des Repositories (Auftraggeber) | in Arbeit | 2026-09-16 | n8n-Prompt + apps.rautaki.ch: Claude; Rest: Auftraggeber | Prompt eingespielt und geprüft (10/10, Schweizer Schreibweise nachgezogen); apps.rautaki.ch öffentlich; offen: Lab-Workflow n8n, Vercel-Variable, Netlify, Umami |
| 9 | Prüfung und Veröffentlichung | erledigt | 2026-09-16 | Claude; Merge-Freigabe Auftraggeber | PR #111 gemerged (`7d093ee`), Vercel-Produktion grün, Livegang 2026-09-16 11:01 Uhr |
| 10 | Kontrolle nach dem Livegang | in Arbeit | 2026-09-16 | Claude | www-Seite geprüft; offen: apps.rautaki.ch ohne Zugangscode, Chatbot (beides nach Phase 8) |
| B0 | Entscheide des Auftraggebers zu den Vorlagen | erledigt | 2026-09-16 | Auftraggeber | alle fünf gemäss Empfehlung; decisions.md + Brief in app-schaufenster |
| B1 | Gemeinsame Vorbereitung im Kern (Knopf-Baustein, `ersetzeGenau`) | erledigt | 2026-09-16 | Claude, Aufgabe 154 | `src/kern/vorlage/download.tsx`, `download-texte.ts`, `ersetze-genau.ts`; Muster im Brief `vorlage-weitere-apps.md` |
| B2 | Vorlage Entwurf-Check | in Arbeit | 2026-09-16 | Claude, Aufgaben 155 (A), 160 (B) | Bau fertig (Vorlage, ZIP-Datei, Knopf, Texte und Titel freigegeben); offen nur die Prüfung in Claude durch den Auftraggeber (Aufgabe 162 in app-schaufenster) |
| B3 | Vorlage Kommunikation aus einem Anlass | in Arbeit | 2026-09-16 | Claude, Aufgaben 156 (A), 161 (B) | Bau fertig; offen nur die Prüfung in Claude (Aufgabe 162) |
| B4 | Vorlage Verständlich machen | in Arbeit | 2026-09-16 | Claude, Aufgaben 157 (A), 163 (B) | Bau fertig (eine Vorlage mit beiden Stufen); offen nur die Prüfung in Claude je Stufe (Aufgabe 162) |
| B5 | Vorlage Dokumenten-Chat | in Arbeit | 2026-09-16 | Claude, Aufgaben 158 (A), 164 (B) | Bau fertig; offen nur die Prüfung in Claude mit einem Beispiel-Dokument (Aufgabe 162) |
| B6 | Vorlage KI-Potenzial-Radar | in Arbeit | 2026-09-16 | Claude, Aufgaben 159 (A), 165 (B) | Bau fertig; offen nur die Prüfung in Claude für einen Organisationstyp (Aufgabe 162) |
| B7 | Abschluss: Profil, Chatbot-Prompt, Auswertung | in Arbeit | 2026-09-16 | Claude, Aufgaben 167, 169 | Profil, llms.txt/llms-full.txt und Prompt-Nachtrag (freigegeben 2026-09-16) erledigt und in PR #111 committet; Einspielen = Phase 8; Auswertung = Aufgabe 168 (Datum offen bis Livegang) |

**Gesamtstand:** 11 von 19 Phasen erledigt (Teil A: 9 von 11 · Teil B: 2 von 8; B2–B7 gebaut, offen nur Prüfung in
Claude, Einspielen des Prompts und Auswertung). Livegang Teil A: 2026-09-16 (PR #111, `7d093ee`). Vorlagen gebaut: 6 von 6 Apps mit
Knopf «Vorlage herunterladen»; online sind sie erst mit der Veröffentlichung von apps.rautaki.ch (Phase 8).

**Übergabe (2026-09-16): `rautaki-web` übernimmt die weiteren Schritte direkt.** Offen, mit Ort:

- ~~Phase 8, n8n~~ — erledigt 2026-09-16 (siehe Phase 8). Ursprünglicher Punkt: den freigegebenen Block aus `security/n8n-workflow-hardening.md` §1 in den Knoten «AI Agent» des
  Workflows `Rautaki-Support` (`lIPMcSi2yljEbfPJ`) einsetzen, `<CANARY>` durch den Wert von `N8N_CHAT_SYSTEM_CANARY`
  ersetzen; danach die zehn Kontrollfragen aus §5 und den Stand-Hinweis auf «deployed on …». Ein Einspielen über die
  n8n-Anbindung aus `app-schaufenster` heraus wurde am 2026-09-16 von der Sicherheitsregel der Arbeitsumgebung
  abgelehnt; nichts verändert.
- Phase 8, übrige Punkte: apps.rautaki.ch live schalten (Zugangscode, `noindex`), Lab-Workflow in n8n, Vercel-Variable,
  Netlify, Umami — unverändert beim Auftraggeber.
- In diesem Repo committet und in PR #111 (2026-09-16): `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`
  (je ein Satz zu den Vorlagen, DE und EN), `security/n8n-workflow-hardening.md` (Absatz zu den Vorlagen, Stand-Hinweis,
  Kontrollfrage 10), `docs/apps-umbau-plan.md` (dieses Dokument).
- In `app-schaufenster`: Aufgabe 162 (Prüfung jeder Vorlage im eigenen Claude, dann die Features F424, F432, F440,
  F448, F456 auf PASSING) und Aufgabe 168 (Auswertung `vorlage` ÷ `benutzt` je App, 30 Tage nach Livegang; Datum
  eintragen, sobald der Livegang feststeht). Dort liegen 17 Commits auf `main` (154–167) und Branch
  `claude/169-freigaben-eintragen` noch nicht hochgeladen bzw. zusammengeführt.

---

# Teil A — www.rautaki.ch: «Lab» wird «Apps»

## 1. Ziel

www.rautaki.ch führt im Hauptmenü und in der Fusszeile nicht mehr auf den Bereich «Lab»,
sondern unter «Apps» auf die eigenständige Seite https://apps.rautaki.ch (KI-Apps zum
sofortigen Ausprobieren, eigenes Projekt `app-schaufenster` auf Vercel). Der Bereich «Lab»
mit der E-Mail-Schranke wird abgebaut. Von den drei HTML-Werkzeugen bleibt nur der
EU-AI-Act-Checker online; die beiden anderen werden im Repository archiviert, nicht gelöscht.

Grundlage: Profil des App-Schaufensters, §4.6 «Verbindung zu rautaki.ch»
(`app-schaufenster/docs/profil/produkte.md`): rautaki.ch verweist auf apps.rautaki.ch, beide
Seiten bleiben getrennt, die Änderung gehört ins Projekt `rautaki-web`.

## 2. Entscheide des Auftraggebers (2026-09-16)

| Frage | Entscheid | Folge |
|---|---|---|
| Zeitpunkt | **Jetzt sofort**, nicht erst nach der Testphase | Bis der Zugangscode auf apps.rautaki.ch entfernt ist, landen Besucher aus dem Menü auf der Zugangsseite. Bewusst in Kauf genommen. |
| Livegang apps.rautaki.ch (Entscheid vom 2026-09-16, nachgetragen) | **Die Site geht mit diesem Umbau live**: Zugangscode entfernen, `noindex` aufheben, über www.rautaki.ch erreichbar | Besucher aus Menü und Fusszeile landen direkt in den Apps. Der Satz zur Testphase im Chatbot-Prompt (Phase 7) entfällt, sobald Phase 8 den Zugangscode entfernt hat. Umsetzung im Projekt `app-schaufenster` (Phase 8). |
| Artikel «EU AI Act für Schweizer NPOs» (3 Links DE, 3 Links EN auf den Checker) | **Checker bleibt online** unter `/lab/eu-ai-act-check.html`, ohne E-Mail-Schranke | Artikel bleibt unverändert. Nur Governance-Generator und Multi-Assistant-Anleitung werden archiviert. |
| E-Mail-Schranke (Adressen ins CRM) | **Kanal fällt weg** | Schranke, `/api/lab-access` und CRM-Weiterleitung werden entfernt. Kontakt nur noch über Buchung und E-Mail. |
| Wortlaut und alte Adressen | **«Apps»** in DE und EN; `/lab`, `/en/lab` und die zwei archivierten Werkzeuge leiten **dauerhaft auf https://apps.rautaki.ch** | Keine 404-Seiten für alte Links und Suchmaschinen. |

Nicht gewählt: Einbau der Apps direkt in www.rautaki.ch. Grund: Bot-Schutz (Turnstile),
Sicherheitsregeln, Zugangscode und Zählung sind auf die eigene Adresse apps.rautaki.ch
ausgelegt; das Profil hat die Trennung festgelegt.

## 3. Was heute am «Lab» hängt (Bestandesaufnahme)

Alles, was der Umbau berührt. Dient als Checkliste, dass nichts vergessen geht.

| Ort | Was | Massnahme |
|---|---|---|
| `src/content/de/common.ts`, `src/content/en/common.ts` | Menüpunkt und Fusszeilen-Link «Lab» → `/lab` | ersetzen durch «Apps» → `https://apps.rautaki.ch` |
| `src/lib/i18n.ts` | `localePath()` setzte das `/en`-Präfix auch vor absolute URLs (`/enhttps://…`) | absolute URLs unverändert durchlassen (erledigt in Phase 1) |
| `src/components/Navigation.tsx` | rendert die Menüpunkte mit `Link`; markiert den aktiven Punkt über den Pfad | externer Link braucht `target`/`rel` nicht zwingend (gleiche Marke, selber Tab gemäss Profil E6); prüfen, dass der Punkt nie fälschlich «aktiv» ist |
| `src/components/Footer.tsx` | rendert `footer.navLinks` | keine Codeänderung nötig, wenn ein absoluter Link funktioniert; prüfen |
| `src/app/lab/page.tsx`, `src/app/en/lab/page.tsx` | Lab-Übersichtsseiten, WebApplication-Schemas der drei Werkzeuge | löschen |
| `src/components/LabGateModal.tsx` | E-Mail-Schranke (`LabGate`, `LabToolLink`, `useLabGate`), nur von den zwei Lab-Seiten benutzt | löschen |
| `src/app/api/lab-access/route.ts` | Anmeldung an der Schranke: Resend-Mails, Rate-Limit, CRM-Weiterleitung an n8n | löschen |
| `.env.example` | `N8N_LAB_WEBHOOK_URL` (nur von lab-access benutzt); `RESEND_API_KEY` bleibt (andere Routen) | Eintrag `N8N_LAB_WEBHOOK_URL` entfernen, Kommentar zu Resend anpassen |
| Kommentare in `src/app/api/mahnung-action/route.ts`, `src/app/api/chat/route.ts`, `src/lib/rate-limit.ts`, `src/lib/ssrf-guard.ts`, `next.config.ts` | verweisen auf lab-access als Muster | Verweise anpassen, damit sie nicht ins Leere zeigen (erledigt in Phase 2) |
| `public/lab/eu-ai-act-check.html` + `public/lab/vendor/fonts/` | Checker, braucht nur die Schriften; keine eigene Schranke im HTML | bleibt |
| `public/lab/ki-governance-policy.html`, `public/lab/multi-assistant-gpt.html`, `public/lab/vendor/html-docx.js` | Generator und Anleitung, brauchen `html-docx.js` und die Schriften | nach `archiv/lab/` verschieben (mit Kopie von `vendor/`, damit das Archiv für sich lauffähig bleibt) |
| `vercel.json` | strengere Sicherheitsregeln für `/lab/(.*)` | bleibt, weil der Checker weiter unter `/lab/` liegt |
| `src/app/sitemap.ts` | `/lab` (DE/EN) und die drei Werkzeuge | `/lab` und zwei Werkzeuge entfernen; Checker bleibt |
| `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts` | Abschnitt «Lab — kostenlose KI-Tools» DE/EN | Abschnitt «Apps» mit Link auf apps.rautaki.ch; Checker als einzelnes Werkzeug nennen |
| `src/content/articles/{de,en}/eu-ai-act-schweizer-npos.md` | 3 Links auf den Checker | bleiben (Entscheid) |
| `README.md` | Zeilen zu `/lab`, `/api/lab-access`, CSP-Hinweis | nachführen |
| `docs/geo-roadmap.md` | P6: «Lab-Tools (3 statische HTML-Apps) auf Englisch» | Punkt als hinfällig markieren (nur noch der Checker, Englisch offen) |
| `security/n8n-workflow-hardening.md` | Systemprompt des Chatbots (byte-genaue Kopie des Prompts in n8n) mit Abschnitt «LAB — KOSTENLOSE WERKZEUGE», Regel R4, Abschnitt «WEITERE SEITEN» und Sync-Liste, die auf `src/app/lab/page.tsx` zeigt | Vollständig neuen Prompt ausarbeiten (Phase 7); der laufende Prompt in n8n wird vom Auftraggeber ersetzt (Phase 8) |
| `security/chatbot-hardening-plan.md` | nennt lab-access als Code-Muster | historisches Dokument, bleibt; Hinweis «Route entfernt am …» ergänzen |
| n8n (ausserhalb des Repos) | Workflow, der Lab-Anmeldungen ins CRM Salesflare weiterleitet; Chatbot-Systemprompt im Workflow `Rautaki-Support` | Phase 8 |
| Vercel-Projekt `rautaki-web` (ausserhalb des Repos) | Umgebungsvariable `N8N_LAB_WEBHOOK_URL` | Phase 8 |

## 4. Phasen und Arbeitsschritte

### Phase 1 — Menü und Fusszeile

- [x] Branch `claude/apps-statt-lab` von `main` anlegen
- [x] DE: Menü und Fusszeile «Lab» → «Apps», Ziel `https://apps.rautaki.ch`
- [x] EN: Menü und Fusszeile «Lab» → «Apps», Ziel `https://apps.rautaki.ch`
- [x] Desktop-Menü, Mobilmenü und Fusszeile im Browser geprüft (DE und EN); Punkt ist nie als «aktive Seite» markiert — geprüft am gerenderten HTML des Produktions-Builds auf `/`, `/en`, `/lab`, `/en/lab`: kein `aria-current`, keine Aktiv-Farbe
- Status: erledigt (2026-09-16)

### Phase 2 — Lab-Seiten und E-Mail-Schranke abbauen

- [x] `src/app/lab/page.tsx` und `src/app/en/lab/page.tsx` löschen
- [x] `src/components/LabGateModal.tsx` löschen
- [x] `src/app/api/lab-access/route.ts` löschen
- [x] `.env.example`: `N8N_LAB_WEBHOOK_URL` entfernen, Resend-Kommentar anpassen
- [x] Verweise auf lab-access in Kommentaren (`mahnung-action`, `chat`, `rate-limit`, `ssrf-guard`, `next.config.ts`) bereinigen
- [x] `npm run lint` und `npm run build` grün — Hinweis: ein veraltetes `.next/dev/types/validator.ts` aus einer früheren `next dev`-Sitzung listet gelöschte Routen weiter und lässt `tsc`/`build` scheitern; `rm -rf .next/dev` behebt das
- Status: erledigt (2026-09-16). Geprüft am Produktions-Build: `/lab`, `/en/lab`, `GET`/`POST /api/lab-access` → 404; `/lab/eu-ai-act-check.html` und dessen Schriften → 200

### Phase 3 — HTML-Werkzeuge archivieren

- [x] Ordner `archiv/lab/` anlegen mit kurzer `README.md`: was hier liegt, warum, seit wann, wie man es lokal öffnet
- [x] `ki-governance-policy.html`, `multi-assistant-gpt.html` und `vendor/` (html-docx.js + fonts) nach `archiv/lab/` verschieben; `public/lab/vendor/fonts/` für den Checker behalten, `public/lab/vendor/html-docx.js` entfernen — in den archivierten Dateien `/lab/vendor/` → `vendor/` (relativ), sonst laufen sie nicht aus dem Dateisystem; `archiv/**` in `eslint.config.mjs` ignoriert
- [x] Beide archivierten Dateien lokal im Browser geöffnet: laufen samt Word-Export — headless geprüft (Playwright, statisch aus `archiv/lab/` serviert): DM Sans geladen, `htmlDocx.asBlob` liefert ein Word-Blob, keine fehlenden Ressourcen
- [x] Checker unter `/lab/eu-ai-act-check.html` läuft weiterhin (Schriften laden, Bericht herunterladbar) — Produktions-Build: Schriften geladen, `downloadReport()` erzeugt den HTML-Bericht (84 kB), keine Konsolenfehler; `/lab/ki-governance-policy.html`, `/lab/multi-assistant-gpt.html`, `/lab/vendor/html-docx.js` → 404
- Status: erledigt (2026-09-16)

### Phase 4 — Weiterleitungen

Dauerhaft (308) in `next.config.ts` unter `redirects()`. Wichtig: den Checker nicht mitfangen,
also nur exakte Pfade, kein Muster `/lab/(.*)`.

- [x] `/lab` → `https://apps.rautaki.ch`
- [x] `/en/lab` → `https://apps.rautaki.ch`
- [x] `/lab/ki-governance-policy.html` → `https://apps.rautaki.ch`
- [x] `/lab/multi-assistant-gpt.html` → `https://apps.rautaki.ch`
- [x] Lokal geprüft: alle vier leiten weiter, `/lab/eu-ai-act-check.html` nicht — Produktions-Build: alle vier 308 auf `https://apps.rautaki.ch/`, Query-Parameter werden mitgegeben; `/lab/` und `/en/lab/` (Schrägstrich) normalisiert Next zuerst auf `/lab` bzw. `/en/lab` und leitet dann weiter (zwei Hops); Checker 200
- Status: erledigt (2026-09-16)

### Phase 5 — Sitemap, llms.txt und Schemas

- [x] `sitemap.ts`: `/lab`, `/en/lab` und die zwei archivierten Werkzeuge entfernen; Checker-Eintrag bleibt — Sitemap hat neu 25 statt 29 URLs; einziger `/lab/`-Eintrag ist der Checker
- [x] `llms.txt`: Abschnitt «Lab» durch «Apps» ersetzen (DE und EN), Link auf apps.rautaki.ch, Checker als einzelnes Werkzeug — Abschnitt «Apps — KI-Apps zum Ausprobieren» mit Einleitung (Startseiten-Text des Schaufensters), den sechs Apps (Kartentexte wörtlich aus `verzeichnis.ts`, Reihenfolge wie im Raster) und dem Checker als letztem Punkt; in «Seiten» und «English» je eine «Apps»-Zeile, EN zusätzlich der Checker
- [x] `llms-full.txt`: dasselbe (`labHeading`, `labIntro`, `labTools` DE/EN) — neu `appsHeading`, `appsIntro`, `appsList`, `checkerNote`; Konstante `APPS`; EN-App-Namen und -Texte sind Übersetzungen (kein freigegebener EN-Text im Schaufenster vorhanden)
- [x] Prüfen, dass der Checker sein WebApplication-Schema weiterhin im eigenen HTML trägt (bisher wurde es zusätzlich von `/lab` ausgegeben) — ja, `public/lab/eu-ai-act-check.html` Zeile 38 ff. (`WebApplication`, `url`, `offers`, `publisher`)
- Status: erledigt (2026-09-16). Offen: Freigabe des Wortlauts durch den Auftraggeber (DE-Einleitung leicht angepasst: «mit Ihrem eigenen Text» → «mit eigenem Text»; EN komplett übersetzt)

### Phase 6 — Dokumentation im Repository

- [x] `README.md`: Seitentabelle (`/lab` raus, Checker als Einzelseite, Hinweis auf apps.rautaki.ch), API-Tabelle (`/api/lab-access` raus), CSP-Hinweis
- [x] `docs/geo-roadmap.md`: P6-Punkt «Lab-Tools auf Englisch» als hinfällig markieren, Verweis auf dieses Dokument
- [x] `security/chatbot-hardening-plan.md`: Hinweis, dass die Route lab-access entfernt wurde — Notiz im Kopf (§4, §6, Anhang A nennen die Route weiter; Muster leben in `api/chat` und `lib/rate-limit.ts`), Rest unverändert als historischer Stand
- Status: erledigt (2026-09-16)

### Phase 7 — Neuer Chatbot-Prompt für n8n

Der Website-Chatbot («Rautaki-Support», n8n) beantwortet Fragen aus seinem Systemprompt. Der
heutige Prompt kennt das Lab mit drei Werkzeugen und nichts von apps.rautaki.ch. Ein blosses
Umbenennen des Lab-Abschnitts genügt nicht: Der Bot muss die neue Ausgangslage vollständig
kennen. Ergebnis dieser Phase ist ein **kompletter, einfügefertiger Prompt**, keine Teilkorrektur.

Quelle der Wahrheit für den Prompt-Text bleibt `security/n8n-workflow-hardening.md` (§1, Block
«Replace the system prompt with»). Dort steht heute eine byte-genaue Kopie des laufenden Prompts;
diese Regel gilt weiter: Was in n8n eingefügt wird, steht wortgleich im Dokument.

Inhalt des neuen Prompts (was sich gegenüber heute ändert):

- [x] Abschnitt «LAB — KOSTENLOSE WERKZEUGE» ersetzen durch «APPS — KI-APPS ZUM AUSPROBIEREN»: Link https://apps.rautaki.ch, ein Satz zum Zweck (KI-Apps zum sofortigen Ausprobieren im Browser, kostenlos, ohne Konto), und die sechs Apps je mit Name, Adresse und einem Satz Nutzen: Dokumenten-Chat mit Quellen (`/dokumenten-chat`), Antwort-Assistent (`/antwort-assistent`), Verständlich machen (`/verstaendlich-machen`), Entwurf-Check (`/entwurf-check`), Kommunikation aus einem Anlass (`/kommunikation`), KI-Potenzial-Radar (`/ki-radar`). Wortlaut aus den freigegebenen Texten des Schaufensters (`app-schaufenster/src/apps/*`, Startseite), nicht aus dem Gedächtnis
- [x] ~~Regel für die Testphase~~ — **entfällt** (Entscheid 2026-09-16: Satz weglassen, weil die Site mit dem Umbau live geht und der Prompt erst nach Phase 8 eingespielt wird). Ursprünglicher Wortlaut: Solange apps.rautaki.ch einen Zugangscode verlangt, sagt der Bot das offen («derzeit in einer geschlossenen Testphase, Zugang auf Anfrage an hello@rautaki.ch») und verspricht keinen freien Zugang. Der Satz ist so markiert, dass er nach Ende der Testphase gestrichen wird (Eintrag im Änderungsprotokoll dieses Dokuments). Entfällt ganz, wenn Phase 8 den Zugangscode entfernt hat, bevor der Prompt in n8n eingespielt wird (Entscheid vom 2026-09-16: Site geht live)
- [x] EU-AI-Act-Checker als einzelnes, weiterhin kostenloses Werkzeug nennen (`/lab/eu-ai-act-check.html`), mit Bezug zum Artikel «EU AI Act für Schweizer NPOs»; Governance-Generator und Multi-Assistant-Anleitung streichen. Auf Fragen danach: «nicht mehr online», Hinweis auf die Apps
- [x] Abgrenzung im Prompt: «Apps» auf apps.rautaki.ch sind fertige KI-Apps zum Ausprobieren; sie sind kein Beratungsersatz und keine Rechtsberatung (bestehende Haltung des Prompts beibehalten)
- [x] Regel R4 (Themenrahmen) anpassen: «the Lab tools» → «the Apps on apps.rautaki.ch and the EU AI Act checker»; alle weiteren Stellen, die «Lab», «Werkzeuge», «Tools», «Generatoren» als Auslöser nennen, auf die neue Lage umschreiben
- [x] Link-Regeln prüfen: apps.rautaki.ch ist eine absolute Adresse und bekommt nie das `/en`-Präfix; die Apps sind nur auf Deutsch, das sagt der Bot englischsprachigen Besuchern
- [x] Abschnitt «WEITERE SEITEN» um «Apps» ergänzen
- [x] Sync-Liste im Kopf von §1 anpassen: `src/app/lab/page.tsx` ersetzen durch den Hinweis, dass die App-Beschreibungen aus dem Projekt `app-schaufenster` stammen und bei jeder neuen oder umbenannten App nachgeführt werden
- [x] Alle übrigen Abschnitte (Canary, R1 bis R3, Leistungen, Vorgehen, Preise, Wissen, Kontakt, Buchung, Content Rules) unverändert übernehmen; Vergleich alt/neu als Diff im PR sichtbar — Ausnahmen mit Grund: Rollen-Satz («Lab tools» → «apps»), Wissen-Regel (Checker-Link statt «im Lab»), Content Rules (Themenrahmen); der Satz «Weitere Werkzeuge … in Entwicklung» ist gestrichen (kein belegbares Versprechen mehr). Vorab geprüft: Der laufende Prompt in n8n entspricht dem Dokumentstand vom 2026-08-22 (Abgleich über die n8n-API am 2026-09-16, Lesevergleich Abschnitt für Abschnitt)

Ablauf:

- [x] Entwurf des vollständigen Prompts als Block in `security/n8n-workflow-hardening.md` (Stand-Hinweis mit neuem Datum, «Stand: … noch nicht in n8n eingespielt» bis Phase 8 erledigt ist)
- [x] Wortlaut der neuen Abschnitte dem Auftraggeber zur Freigabe vorlegen (Texte sind Business-Entscheid, kein Tech-Entscheid); Freigabe mit Datum hier eintragen — **freigegeben am 2026-09-16** (inkl. Streichung von «Weitere Werkzeuge … in Entwicklung» und Verzicht auf den Testphase-Satz)
- [ ] Freigegebenen Prompt offline gegen die Testfragen aus §5 des Hardening-Dokuments und gegen fünf neue Fragen prüfen: «Was ist das Lab?», «Gibt es den Governance-Generator noch?», «Wo finde ich den EU-AI-Act-Check?», «Was kann ich auf apps.rautaki.ch ausprobieren?», «Brauche ich einen Zugangscode?». Erwartete Antworten neben die Fragen schreiben — die fünf Fragen stehen mit erwarteten Antworten in §5 (Fragen 5–9). Offline-Prüfung 2026-09-16: Fragen 1–4 (Canary, R1–R3) unverändert abgedeckt; 5–8 haben je eine ausdrückliche Regel im Block («kein Bereich Lab mehr», «nicht mehr online», Checker-Link, sechs Apps); 9 stützt sich auf «Kostenlos, ohne Anmeldung» — das Wort «Zugangscode» steht nicht im Prompt, die Live-Kontrolle in Phase 8 zeigt, ob das reicht. Alle 28 Links des Blocks aufgelöst (www lokal am Produktions-Build, apps.rautaki.ch live, je 200); die `/en`-Ausnahmen sind vollständig (nur Booklet und Checker haben keine EN-Fassung)
- [x] Übergabe an Phase 8: Der Auftraggeber fügt den Block in n8n ein (Anleitung §1 des Hardening-Dokuments); danach Stand-Hinweis im Dokument auf «byte-genaue Kopie, eingespielt am …» setzen — übergeben 2026-09-16; Einspielen und Stand-Hinweis sind der erste Punkt von Phase 8
- Status: erledigt (2026-09-16)

### Phase 8 — Ausserhalb des Repositories (Auftraggeber)

Diese Punkte kann Claude nicht ausführen; sie brauchen Konten und Zugänge.

- [x] n8n: Systemprompt des Website-Chatbots durch den in Phase 7 freigegebenen Block ersetzen (Anleitung in `security/n8n-workflow-hardening.md`, §1); danach die fünf Kontrollfragen aus Phase 7 live stellen und die Antworten mit den erwarteten vergleichen (§5, Fragen 5–9) und den Stand-Hinweis in §1 von «DRAFT» auf «byte-exact copy, deployed on …» setzen — **erledigt 2026-09-16 11:06 Uhr** durch Claude über die n8n-REST-API (Freigabe des Auftraggebers): Canary aus dem laufenden Prompt übernommen, Sicherung des alten Workflows lokal, Rücklesen byte-gleich zum Dokumentblock, `activeVersionId` = neue Version (veröffentlicht, nicht nur Entwurf). Alle zehn §5-Fragen live über `/api/chat` gestellt: 1–4 exakte Refusals, 5–10 wie erwartet (kein `/lab`-Übersichtslink, Checker-Link korrekt, sechs Apps mit Links, Vorlagen-Antwort mit Abo-Hinweis). Beobachtung: Frage 9 wird mit «kein Zugangscode» beantwortet — stimmt erst, wenn der nächste Punkt erledigt ist
- [x] apps.rautaki.ch (Projekt `app-schaufenster`): Site live schalten — Zugangscode entfernen, `noindex` aufheben, Sitemap/robots dort prüfen — damit der Klick aus Menü und Fusszeile von www.rautaki.ch direkt in die Apps führt (Entscheid vom 2026-09-16). Danach Datum in §5 «Zugangscode» eintragen — **erledigt 2026-09-16 11:10 Uhr** durch Claude (Freigabe des Auftraggebers): Umgebungsvariable `ACCESS_CODE` im Vercel-Projekt `app-schaufenster` entfernt (der eine Eintrag galt für Production und Preview; Vorschau-Server liefen laut decisions.md ohnehin ohne Code), Produktion neu ausgerollt. Geprüft: `/` und alle sechs App-Seiten 200, kein `X-Robots-Tag`, `robots.txt` = `Allow: /`, `/zugang` leitet auf `/`. Kein Code geändert — der Code kennt «leer = öffentlich» (`src/kern/zugang/zugang.ts`). Festgehalten in `app-schaufenster/docs/state/decisions.md`; Aufgabe 168 hat jetzt das Datum
- [ ] n8n: Workflow «Lab-Anmeldung → Salesflare» deaktivieren oder löschen
- [ ] Vercel, Projekt `rautaki-web`: Umgebungsvariable `N8N_LAB_WEBHOOK_URL` entfernen
- [ ] Netlify: offene Formularanfragen der alten Demo prüfen, Site `rautaki-apps.netlify.app` löschen, Konto schliessen, falls sonst nichts darauf liegt
- [ ] Umami Cloud: Website der alten Demo löschen, Konto schliessen
- Status: offen

### Phase 9 — Prüfung und Veröffentlichung

- [x] `npm run lint`, `npm run build` grün; `security/test-libs.mjs` läuft — 2026-09-16: Lint, `tsc --noEmit`, Build, `test:libs` 38/38. Nicht gelaufen: `test-chat-api.sh` (braucht laufenden Server mit n8n-Secrets; von diesem Umbau nicht berührt)
- [x] Manuelle Prüfung lokal: Menü DE/EN, Fusszeile, vier Weiterleitungen, Checker, Artikel-Links, `/sitemap.xml`, `/llms.txt` — am Produktions-Build: je 3 Apps-Anker (Desktop, Mobil, Fusszeile) auf `/` und `/en`, kein `/lab`-Anker, kein `aria-current`; vier 308 nach apps.rautaki.ch; Checker 200; Artikel DE/EN je 3 Links auf den Checker; Sitemap/llms/llms-full nennen unter `/lab/` nur den Checker. **Nebenbefund behoben:** Checker-Logo zeigte auf `/lab` («Zurück zum Rautaki Lab»), Titel/Kopf/Fuss nannten das Lab → Logo auf `/`, Wortlaut «Rautaki», Sitemap-Datum gesetzt
- [x] Pull Request mit Verweis auf dieses Dokument; ehrliche Einschätzung an den Auftraggeber; Freigabe abwarten — PR #111 eröffnet 2026-09-16 (https://github.com/hwitzthum/rautaki-web/pull/111); freigegeben 2026-09-16
- [x] Zusammenführen in `main`; Vercel veröffentlicht automatisch — Merge-Commit `7d093ee`, 2026-09-16 11:01 Uhr; Vercel-Produktions-Deployment grün nach 30 s
- Status: erledigt (2026-09-16)

### Phase 10 — Kontrolle nach dem Livegang

- [x] www.rautaki.ch: Menü und Fusszeile zeigen «Apps», Klick landet auf apps.rautaki.ch — ohne Zugangscode direkt im App-Raster (Phase 8 wirksam) — geprüft 2026-09-16: je 3 Apps-Anker auf `/` und `/en`, kein Lab-Anker; apps.rautaki.ch antwortet seit 11:10 Uhr mit 200 und dem Raster aller sechs Apps
- [ ] apps.rautaki.ch: Wortmarke führt zurück auf www.rautaki.ch (Profil §4.6)
- [x] `https://www.rautaki.ch/lab` und `/en/lab` leiten weiter; Checker erreichbar — geprüft 2026-09-16 auf Produktion: vier 308 nach apps.rautaki.ch, Checker 200 (Logo → `/`), `/api/lab-access` 404, Sitemap und llms.txt ohne alte Lab-Links
- [x] Chatbot auf www.rautaki.ch beantwortet die fünf Kontrollfragen aus Phase 7 wie erwartet (Phasen 7 und 8 wirksam) — 2026-09-16, alle zehn §5-Fragen (Antworten im Protokoll der Session; Erwartungen in §5 des Hardening-Dokuments)
- [x] Datum des Livegangs hier eintragen und im Projekt `app-schaufenster` melden (Handoff: Pilot-Auswertung 30 Tage danach) — Livegang www.rautaki.ch 2026-09-16 11:01 Uhr, apps.rautaki.ch öffentlich 2026-09-16 11:10 Uhr; in `app-schaufenster` eingetragen (decisions.md, handoff.md, Aufgabe 168: Auswertung ab 2026-10-16)
- Status: offen

## 5. Risiken und offene Punkte

- **Zugangscode:** Solange apps.rautaki.ch in der Testphase ist, sehen Besucher aus dem Menü
  die Zugangsseite. Entscheid des Auftraggebers vom 2026-09-16. Gleichentags nachgetragen: Die
  Site soll mit dem Umbau live gehen (Phase 8). **Code entfernt am 2026-09-16, 11:10 Uhr** —
  apps.rautaki.ch ist öffentlich, `noindex` weg.
- **Suchmaschinen:** `/lab` war indexiert. Die Weiterleitung übergibt das Ranking an
  apps.rautaki.ch; dort gilt bis Ende der Testphase `noindex`. Kein Handlungsbedarf, nur wissen.
- **Chatbot:** Der Prompt liegt in n8n, nicht im Repository. Ohne den neuen Prompt aus Phase 7
  und das Einspielen in Phase 8 empfiehlt der Bot Seiten, die weiterleiten, und kennt die Apps
  nicht. Deshalb steht die Kontrolle mit festen Fragen in Phase 10.
- **Testphase im Prompt:** Der Satz zum Zugangscode muss nach Ende der Testphase wieder raus,
  sonst weist der Bot Besucher ab, die längst hinein dürften. Punkt im Änderungsprotokoll offen
  halten, bis er gestrichen ist.
- **Archiv:** `archiv/` liegt ausserhalb von `public/` und `src/`, wird also weder ausgeliefert
  noch gebaut. Sollte `tsconfig` oder ESLint darüber stolpern, den Ordner dort ausschliessen.

# Teil B — apps.rautaki.ch: Vorlagen für die fünf übrigen Apps

Die Arbeit von Teil B geschieht im Projekt `app-schaufenster` (Aufgaben unter `docs/tasks/`, Abschluss nur über
`./scripts/finish-task.sh`, Entscheide in `docs/state/decisions.md`). Dieses Dokument ist der Tracker des Gesamtpakets:
Aufgaben-Nummern und Daten werden hier nachgetragen, sobald sie feststehen.

## B1. Ziel und Ausgangslage

Jede der sechs Apps auf apps.rautaki.ch bietet nach dem Ergebnis einen Knopf «Vorlage herunterladen»: eine ZIP-Datei
mit `SKILL.md` im offenen Standard Agent Skills, die sich im eigenen Claude oder ChatGPT als Skill hochladen lässt.
Heute hat das nur der Antwort-Assistent (Pilot, Aufgaben 143–147, online mit der Veröffentlichung).

Was schon da ist und wiederverwendet wird:

- **Kern-Baustein** `src/kern/vorlage/skill.ts` (setzt `SKILL.md` aus den Angaben einer App zusammen, prüft Kopf und
  Grenzen) und `src/kern/vorlage/zip.ts` (ZIP mit festem Datum, Byte für Byte gleich). Beide sind allgemein gebaut:
  «eine weitere App liefert später nur ihre Angaben».
- **Messung:** Das Ereignis `vorlage` mit `app` ist für jede App schon zugelassen (`src/kern/messung/ereignisse.ts`).
- **Muster:** `src/apps/antwort-assistent/vorlage.ts` (Angaben und Chat-Anpassung), `src/app/antwort-assistent/vorlage.zip/route.ts`
  (feste Datei), `src/app/antwort-assistent/vorlage-download.tsx` (Knopf), Tests dazu (`vorlage.test.ts`,
  `route.test.ts`, `tests/e2e/vorlage.spec.ts`), Features F354–F368 in `docs/state/features.md`.
- **Entscheide, die weitergelten** (decisions.md 2026-09-15): CC BY 4.0, Kopfzeile «Vorlage von Rautaki,
  apps.rautaki.ch», Beschreibung höchstens 200 Zeichen, Ausgabe als lesbare Abschnitte statt JSON, kein Zusatz in der
  Datenschutzerklärung, Knopf ohne Menünamen und ohne eigene Fehlermeldung, Knopf kommt je App als Letztes.

## B2. Entscheide des Auftraggebers (Phase B0)

Ohne diese Entscheide beginnt keine App-Aufgabe. Antworten mit Datum hier eintragen und in decisions.md festhalten.

| Nr. | Frage | Empfehlung | Entscheid |
|---|---|---|---|
| 1 | Der Brief zum Pilot sagt: Die übrigen Apps folgen erst, wenn nach 30 Tagen mindestens 5 % der Nutzungen zu einem Download führen. Wird dieser Entscheid aufgehoben und jetzt gebaut? | Ja, aufheben und in decisions.md begründen (Gesamtpaket, Vorlage als Bestandteil jeder App). Die Auswertung nach 30 Tagen bleibt, je App. | **Ja, aufgehoben** (2026-09-16); decisions.md und Brief `vorlage-weitere-apps.md` in app-schaufenster |
| 2 | Reihenfolge der Apps | Von leicht nach schwer: Entwurf-Check, Kommunikation, Verständlich machen, Dokumenten-Chat, KI-Radar. So entsteht das Muster an den einfachen Apps und die schwierigen profitieren davon. | **Wie empfohlen** (2026-09-16): Entwurf-Check, Kommunikation, Verständlich machen, Dokumenten-Chat, KI-Radar |
| 3 | Verständlich machen hat je Stufe eine eigene Anweisung. Eine Vorlage, in der die Person die Stufe im Chat nennt, oder eine Vorlage je Stufe? | Eine Vorlage mit allen Stufen und einer Regel, welche gilt (Standardstufe, wenn keine genannt). Ein Download, ein Skill. | **Eine Vorlage mit allen Stufen**, Standardstufe der Seite, wenn keine genannt (2026-09-16) |
| 4 | Dokumenten-Chat: Auf der Website zerlegt Code das PDF in nummerierte Abschnitte, die die KI zitiert. Im Chat liest Claude das PDF selbst. Zitierweise? | Nach Seiten und wörtlichem Zitat («Seite 3: “…”»); keine Abschnittsnummern. | **Nach Seiten und wörtlichem Zitat** (2026-09-16) |
| 5 | KI-Potenzial-Radar: Grafik und PDF gibt es im Chat nicht; die Vorlage wäre ein Fragebogen im Chat mit einer Einschätzung als Text. Bauen? | Ja, aber als Letztes und mit dem Hinweis in der Vorlage, was fehlt. Alternativ weglassen, dann fünf statt sechs Vorlagen. | **Ja, bauen, als Letztes**, mit Hinweis auf fehlende Grafik/PDF (2026-09-16) |

Dazu je App: Freigabe der Texte (Beschreibung, Einleitung, die zwei Ersatzsätze, Titel beim Knopf) vor dem Knopf,
wie bei Aufgabe 146.

## B3. Kosten und Prüfung: ohne bezahlte Läufe

- **Echte KI: 0 USD.** Die Vorlage entsteht aus dem Code, ohne KI-Aufruf. Keine Aufgabe von Teil B nennt `npm run eval`
  oder `beispiele:erzeugen` als Abnahmezeile.
- **Automatisch geprüft:** Unit-Tests (Vitest) je Vorlage und ZIP-Route, e2e-Tests (Playwright, `TESTMODUS=1`, Testanbieter
  statt Anthropic) je Knopf, `./scripts/verify.sh --deep` (axe, CSP, Lighthouse mobil) vor der Freigabe.
- **Mit echter KI prüft nur der Auftraggeber im eigenen Abo,** einmal je Vorlage, wie bei Aufgabe 146: ZIP aus der
  Vorschau laden, in Claude als Skill hochladen, ein Beispiel ausprobieren, die Abschnitte und die Prüfliste anschauen.
  Ergebnis mit Datum und Beispiel in decisions.md; erst dann kommt der Knopf.
- **Warum kein Testlauf gegen die API:** Er würde die Anweisung der Website prüfen, nicht die Vorlage im Chat.
- **Bekannte Grenze:** Vier Apps (Entwurf-Check, Kommunikation, Verständlich machen, KI-Radar) lassen die KI auf der
  Website bei Befunden aus Code-Prüfungen einmal nachbessern. Im Chat gibt es diesen Code nicht. Die Code-Prüfungen
  stehen als Sätze in der Prüfliste der Vorlage, die die Person selbst abhakt. Die Vorlage sagt das offen.

## B4. Muster je App: so wird die Vorlage fehlerfrei

Jede App-Aufgabe folgt dieser Liste. Abweichungen nur mit Eintrag in decisions.md.

1. **Angaben aus dem Code** in `src/apps/<app>/vorlage.ts`, nach dem Vorbild des Antwort-Assistenten:
   `VORLAGE_NAME` = Route der App (Kleinbuchstaben, Bindestriche; Test prüft das Muster); Beschreibung eine Zeile,
   höchstens 200 Zeichen, endet mit «Vorlage von Rautaki, apps.rautaki.ch»; Lizenz `CC-BY-4.0`; Titel = Name der App;
   Grenze aus dem Seitentext; Beispiele = die vier Varianten (NPO, Verwaltung, Bildung/Hochschule, KMU) wörtlich;
   Prüfliste = alle Testfälle mit Modellbewertung, je Fall Eingabe und jeder Bewertungssatz.
2. **Chat-Anpassung der Anweisung** nur über `ersetzeGenau`: genau die Stelle, die den Datenblock der Website nennt,
   und genau die Stelle, die das JSON-Format verlangt, werden durch die freigegebenen Ersatzsätze ersetzt. Steht eine
   Stelle nicht genau einmal in der Anweisung, bricht die Erzeugung ab, und mit ihr der Build. Das ist gewollt: Eine
   veränderte App darf nie still eine falsche Vorlage liefern. Jede App hat eigene Formulierungen (siehe B5); die
   Sätze werden aus `prompt.ts` kopiert, nicht aus dem Gedächtnis.
3. **Beschriftungen aus einer Quelle ohne zod:** Die Überschriften der Ausgabe kommen aus `felder.ts` der App (Feldliste
   und Beschriftungen, Typen nur als `import type`). Fehlt `felder.ts`, wird es angelegt; Browser-Code importiert nie
   Werte aus `schema.ts` (CSP-Falle, Aufgabe 092).
4. **Unit-Tests** `src/apps/<app>/vorlage.test.ts`, gleiche Fälle wie beim Pilot: Kopf (genau `name`, `description`,
   `license`); jede Überschrift und jeder Regelblock der Anweisung in der Vorlage; eine veränderte Regel erscheint
   verändert; ohne Datenblock und JSON, Abbruch, wenn eine Stelle fehlt; jede Beschriftung der Ausgabe; «Darf
   nicht»-Regeln und Grenze; die vier Beispiele wörtlich; jeder Testfall mit Bewertung in der Prüfliste; Hinweis zu
   Datenschutz und Kosten; zweimal erzeugt Zeichen für Zeichen gleich.
5. **Feste ZIP-Datei** `src/app/<app>/vorlage.zip/route.ts` mit `force-static`, Dateiname `<app>.zip`, genau ein
   Ordner `<app>` mit `SKILL.md`. Tests wie `route.test.ts` des Pilots: force-static, Dateiname, kein Cookie, Ordner
   und Inhalt gleich der Vorlage, jede Antwort dieselben Bytes.
6. **Knopf** über den gemeinsamen Baustein aus Phase B1, mit den Texten der App (`vorlageDownloadTexte` in
   `src/app/<app>/texte.ts`: Knopf, Titel «Den/Die … im eigenen Claude oder ChatGPT nutzen», Hinweis Claude, Hinweis
   ChatGPT mit Vorbehalt je Land, Hinweis Datenschutz und Kosten). Nur nach einem Ergebnis; nicht vor dem Absenden,
   nicht bei einer Meldung, nicht beim Beispielergebnis bei erschöpftem Budget. Jeder Klick meldet `vorlage` mit der
   Route der App, genau einmal.
7. **e2e-Tests** (Playwright, nach `npm run build`, Exit-Code jeder Stufe ausgeben): kein Knopf vor dem Ergebnis und bei
   einer Meldung; nach dem Ergebnis Knopf, Titel, drei Hinweise; Download beginnt mit «PK»; geladene Adresse genau
   `/<app>/vorlage.zip`, ohne Parameter, ohne Teile von Eingabe oder Ergebnis; Ereignis `vorlage` einmal je Klick;
   Tastatur; axe ohne Verstösse im Zustand mit Ergebnis; 360 px ohne seitliches Scrollen; gleiche Bytes mit und ohne
   Parameter und Cookie.
8. **Features** in `docs/state/features.md` als eigene Gruppe «Vorlage mitnehmen: <App> (Stufe 2)», nach dem Muster
   F354–F368 (inkl. eines Features «lässt sich in Claude hochladen und liefert …», das nur der Auftraggeber belegt).
9. **Reihenfolge innerhalb der App:** Vorlage und Tests → ZIP-Route → Texte zur Freigabe und Prüfung in Claude durch den
   Auftraggeber → Knopf und e2e. So ist jederzeit hochladbar, ohne dass Ungeprüftes online geht. Eine Aufgabe je
   Entscheid: mindestens zwei Aufgaben je App (Vorlage + ZIP; Freigabe + Knopf).
10. **Abschluss je Aufgabe:** `./scripts/verify.sh --deep` grün, Eintrag in decisions.md in Alltagssprache (Was, Warum,
    Gegenprobe, Folge für den Auftraggeber), README von `app-schaufenster` nachführen (Vorlage je App), `finish-task.sh`
    mit Modell, Runden, Tokens.

Fallen, die der Pilot gezeigt hat: drei Anführungs-Backticks in einem Beispiel schliessen den Codeblock (Kern wirft);
Zeilenumbruch in der Beschreibung (Kern wirft); `vi.useFakeTimers` hält `jszip` an, nur die Uhrzeit verfälschen;
Playwright kann keine Server-Module laden, ZIP-Inhalt im e2e über die Adresse prüfen; `finish-task.sh` nimmt alles
Geänderte mit, vorher `git status` lesen.

## B5. Besonderheiten je App

| App (Route) | Eingabe auf der Website | Was im Chat anders ist | Besondere Punkte |
|---|---|---|---|
| Entwurf-Check (`entwurf-check`) | zwei benannte Texte, Entwurf und Anforderungen, je in einem Datenblock; `anKi` nummeriert die Kriterien | Die Person fügt beide Texte im Chat ein; die Vorlage sagt, dass sie die Kriterien selbst nummeriert | `felder.ts` vorhanden. Nachbessern und Platzhalter-Regeln (`platzhalter.ts`) nur als Prüfliste. Anweisung nennt zwei Datenblöcke, beide Stellen ersetzen |
| Kommunikation aus einem Anlass (`kommunikation`) | benannte Texte in einem Datenblock; Quelle und Platzhalter werden im Code nachbearbeitet | Texte im Chat; Quellenregel als Anweisung an die KI | `felder.ts` vorhanden. Nachbessern nur als Prüfliste |
| Verständlich machen (`verstaendlich-machen`) | Text mit Einstellung (Stufe); eine Anweisung je Stufe | Je nach Entscheid 3: eine Vorlage mit allen Stufen und Auswahlregel, oder eine je Stufe | Kein `felder.ts`, anlegen. Code-Regeln in `regeln.ts` (z. B. Wortlänge) hält die KI schlecht ein: in der Prüfliste ausdrücklich, in der Vorlage als Hinweis. Ausgabe-Beschriftungen aus `texte.ts` der Seite |
| Dokumenten-Chat (`dokumenten-chat`) | PDF wird im Code zerlegt (`dokumente.ts`), Frage plus nummerierte Abschnitte, Antwort mit Quellen (`erzeugeMitQuellen`) | Die Person hängt das PDF selbst an und stellt die Frage; Zitierweise nach Entscheid 4 | Kein `felder.ts`, Beschriftungen aus `antwort.ts`/Seite. Die Anweisung spricht von Abschnitten und Quellen-Nummern: grössere Anpassung, mehrere `ersetzeGenau`-Stellen, jede einzeln getestet. PDF-Meldungen der Website (`pdf-meldungen.ts`) entfallen. Kein Nachbessern |
| KI-Potenzial-Radar (`ki-radar`) | Antworten zum Anklicken aus festen Listen (`fragen.ts`), `alsNachricht` macht daraus Text; Auswertung, Grafik und PDF im Code | Nur nach Entscheid 5. Die Vorlage stellt die Fragen mit ihren Antwortmöglichkeiten nacheinander, dann Einschätzung als Text nach den Feldern der App | `felder.ts` vorhanden. Aufgabentexte je Organisationstyp (`aufgabeTextFuerKi`, Aufgabe 152) übernehmen. In der Vorlage steht, was fehlt (Grafik, PDF). Nachbessern nur als Prüfliste |

## B6. Phasen und Arbeitsschritte

### Phase B0 — Entscheide des Auftraggebers

- [x] Fünf Fragen aus B2 beantwortet, mit Datum in der Tabelle (2026-09-16, alle gemäss Empfehlung)
- [x] Eintrag in `docs/state/decisions.md` («Vorlagen für die fünf übrigen Apps: Entscheide des Auftraggebers», 2026-09-16); neuer Brief `docs/briefs/vorlage-weitere-apps.md`
- [x] Brief `docs/briefs/vorlage-antwort-assistent.md` um den Nachtrag ergänzt, dass die übrigen Apps unabhängig vom Ergebnis folgen
- Status: erledigt (2026-09-16)

### Phase B1 — Gemeinsame Vorbereitung im Kern (eine Aufgabe in `app-schaufenster`)

- [x] Knopf-Baustein in den Kern gezogen: `src/kern/vorlage/download.tsx` nimmt Route und Titel; Adresse `/<app>/vorlage.zip` und Meldung `vorlage` folgen aus der Route; Knopf und die drei Hinweise einmal in `src/kern/vorlage/download-texte.ts` (Wortlaut aus 146 unverändert); Gestaltung unverändert (CSS-Modul mitgezogen)
- [x] Antwort-Assistent auf den Baustein umgestellt; Pilot-Tests unverändert grün, ZIP-Datei Byte für Byte gleich (SHA-256 in decisions.md)
- [x] `ersetzeGenau` in `src/kern/vorlage/ersetze-genau.ts` mit fünf Tests (`ersetze-genau.test.ts`)
- [x] Muster aus B4 mit endgültigen Pfaden im Brief `app-schaufenster/docs/briefs/vorlage-weitere-apps.md`, Abschnitt «Muster je App» (zwölf Schritte, Fallen)
- [x] `./scripts/verify.sh --deep` grün, decisions.md, finish-task
- Aufgabe: 154 (`docs/tasks/154-vorlage-kern-baustein-fuer-alle-apps.md`) · Status: erledigt (2026-09-16)

### Phase B2 — Vorlage Entwurf-Check

- [x] Aufgabe A: `vorlage.ts` + Unit-Tests + ZIP-Route + Tests (B4 Punkte 1–5) · Aufgabe: 155 (2026-09-16)
- [x] Texte dem Auftraggeber vorgelegt und freigegeben (2026-09-16)
- [ ] Prüfung in Claude durch den Auftraggeber: Datum, Beispiel, Ergebnis in decisions.md (folgt später)
- [x] Aufgabe B: Knopf + e2e (B4 Punkte 6–7), Features, README · Aufgabe: 160 (2026-09-16; Entscheid des Auftraggebers: Knopf vor der Prüfung in Claude, F424 bleibt offen)
- [x] `./scripts/verify.sh --deep` grün, finish-task (155 und 160)
- Status: in Arbeit — Bau fertig, offen nur die Prüfung in Claude (Aufgabe 162)

### Phase B3 — Vorlage Kommunikation aus einem Anlass

- [x] Aufgabe A: Vorlage, Tests, ZIP-Route · Aufgabe: 156 (2026-09-16); Kern: `skillMarkdown` mit wahlfreier `quelle` je Beispiel (Studie CC BY)
- [x] Texte freigegeben (2026-09-16)
- [ ] Prüfung in Claude durch den Auftraggeber (Datum, Beispiel) — folgt später
- [x] Aufgabe B: Knopf, e2e, Features, README · Aufgabe: 161 (2026-09-16)
- [x] `./scripts/verify.sh --deep` grün, finish-task (156 und 161)
- Status: in Arbeit — Bau fertig, offen nur die Prüfung in Claude (Aufgabe 162)

### Phase B4 — Vorlage Verständlich machen

- [x] Entscheid 3 liegt vor (2026-09-16: eine Vorlage mit allen Stufen)
- [x] `felder.ts` nicht nötig: Die Seite importiert nur den Typ `Stufe` aus `regeln.ts` (ohne zod), Beschriftungen aus `texte.ts` (decisions.md, 157)
- [x] Aufgabe A: Vorlage (mit Stufenregel, Regeln und Beispielpaare beider Stufen wörtlich aus den zwei Anweisungen), Tests, ZIP-Route · Aufgabe: 157 (2026-09-16)
- [x] Texte freigegeben (2026-09-16)
- [ ] Prüfung in Claude durch den Auftraggeber, je Stufe einmal (Datum, Beispiel) — folgt später (Aufgabe 162)
- [x] Aufgabe B: Knopf, e2e, Features, README · Aufgabe: 163 (2026-09-16)
- [x] `./scripts/verify.sh --deep` grün, finish-task (157 und 163)
- Status: in Arbeit — Bau fertig, offen nur die Prüfung in Claude (Aufgabe 162)

### Phase B5 — Vorlage Dokumenten-Chat

- [x] Entscheid 4 liegt vor (2026-09-16: nach Seiten und wörtlichem Zitat)
- [x] Aufgabe A: Vorlage (Anweisung für PDF im Chat, Zitierweise; sechs Ersatzstellen je einzeln getestet; Beispiele mit Dokument-Adressen; Prüffall mit Test-PDF fehlt, offen gesagt), ZIP-Route · Aufgabe: 158 (2026-09-16)
- [x] Texte freigegeben (2026-09-16)
- [ ] Prüfung in Claude durch den Auftraggeber mit einem der Beispiel-Dokumente (Datum, Dokument, Frage) — folgt später (Aufgabe 162)
- [x] Aufgabe B: Knopf, e2e, Features, README · Aufgabe: 164 (2026-09-16)
- [x] `./scripts/verify.sh --deep` grün, finish-task (158 und 164)
- Status: in Arbeit — Bau fertig, offen nur die Prüfung in Claude (Aufgabe 162)

### Phase B6 — Vorlage KI-Potenzial-Radar

- [x] Entscheid 5 liegt vor (2026-09-16: ja, bauen, als Letztes)
- [x] Aufgabe A: Vorlage (Fragen mit Antwortmöglichkeiten, Vorgaben als Tabellen aus dem Code, Einschätzung als Text wie «Kopieren», Hinweis auf fehlende Grafik/PDF), Tests, ZIP-Route · Aufgabe: 159 (2026-09-16)
- [x] Texte freigegeben (2026-09-16)
- [ ] Prüfung in Claude durch den Auftraggeber (Datum, Organisationstyp) — folgt später (Aufgabe 162)
- [x] Aufgabe B: Knopf, e2e, Features, README · Aufgabe: 165 (2026-09-16)
- [x] `./scripts/verify.sh --deep` grün, finish-task (159 und 165)
- Status: in Arbeit — Bau fertig, offen nur die Prüfung in Claude (Aufgabe 162)

### Phase B7 — Abschluss des Gesamtpakets

- [x] `docs/profil/produkte.md` §5.1: Stand «alle sechs Apps mit Vorlage seit 2026-09-16», Pilot-Entscheid aufgehoben, Auswertung je App (Aufgabe 167)
- [x] Chatbot-Prompt (Teil A, Phase 7): Absatz «Jede App lässt sich als Vorlage mitnehmen» im Abschnitt APPS, Vermerk im Stand-Hinweis, Kontrollfrage 10 in §5 — Wortlaut vom Auftraggeber freigegeben (2026-09-16); Einspielen in n8n = Phase 8
- [x] `llms.txt`/`llms-full.txt` in `rautaki-web`: je ein Satz zu den Vorlagen im Abschnitt «Apps» (DE und EN); committet in PR #111 (2026-09-16)
- [x] Auswertung: Aufgabe 168 in `app-schaufenster` angelegt (je App `vorlage` ÷ `benutzt`, 30 Tage nach Livegang); Datum offen, bis der Auftraggeber den Livegang meldet
- [x] handoff.md in `app-schaufenster` nachgeführt
- [x] Freigabe des Prompt-Nachtrags durch den Auftraggeber (2026-09-16); Phase 8 (Einspielen) und Kontrollfrage 10 live stehen aus
- Status: in Arbeit (2026-09-16); erledigt, sobald Phase 8 den Prompt eingespielt hat und 168 ein Datum hat. Weitere Schritte übernimmt `rautaki-web` direkt (Übergabe im Abschnitt «Stand der Umsetzung»).

## B7. Risiken und offene Punkte

- **Qualität im Chat unter der Website** bei den vier Apps mit Nachbessern (B3). Wird das in der Prüfung durch den
  Auftraggeber sichtbar, ist die Antwort ein deutlicherer Hinweis in der Vorlage, kein bezahlter Lauf und keine neue
  Regel, die nur der Chat kennt.
- **Build bricht bei Änderung einer Anweisung:** gewollt (B4 Punkt 2). Wer eine Anweisung ändert, führt die
  Ersatzstellen in `vorlage.ts` nach; der Test «fehlt eine Stelle, bricht die Erzeugung ab» zeigt es sofort.
- **Sechs ZIP-Dateien, sechs Texte:** Die Hinweise beim Knopf (Claude, ChatGPT, Abo) sind bei allen Apps gleich und
  liegen nach B1 einmal im Kern; je App nur Titel und Beschreibung. So bleiben die Freigaben klein.
- **Zeitpunkt der Auswertung:** Jede Vorlage bekommt ihr eigenes Datum; eine gemeinsame Auswertung erst, wenn die
  letzte 30 Tage online ist.

# Änderungsprotokoll (beide Teile)

- 2026-09-16 — Dokument angelegt; Entscheide des Auftraggebers aufgenommen (Zeitpunkt sofort, Checker bleibt, E-Mail-Kanal fällt weg, «Apps» mit Weiterleitung).
- 2026-09-16 — Phase 1 erledigt: «Lab» → «Apps» in Menü und Fusszeile (DE/EN). Nebenbefund: `localePath()` hätte `/en` vor die absolute Adresse gesetzt; behoben in `src/lib/i18n.ts`. `npm run lint`, `tsc`, `npm run build` grün.
- 2026-09-16 — Phase 2 erledigt: Lab-Seiten, `LabGateModal`, `/api/lab-access` und `N8N_LAB_WEBHOOK_URL` entfernt; Kommentare bereinigt (zusätzlich in `src/app/api/chat/route.ts`). Stolperstein: veraltete `.next/dev`-Typen, siehe Phase 2.
- 2026-09-16 — Phase 3 erledigt: Generator und Multi-Assistant-Anleitung samt `html-docx.js` und Font-Kopie nach `archiv/lab/` (README dort); Vendor-Pfade im Archiv relativ gesetzt. Checker und seine Schriften bleiben unter `public/lab/`.
- 2026-09-16 — Phase 4 erledigt: vier dauerhafte Weiterleitungen (308) in `next.config.ts` auf https://apps.rautaki.ch; Checker bleibt erreichbar.
- 2026-09-16 — Phase 5 erledigt: Sitemap ohne `/lab` und die zwei Werkzeuge; `llms.txt`/`llms-full.txt` mit Abschnitt «Apps» (sechs Apps aus `verzeichnis.ts`, Checker als Einzelwerkzeug). Diese App-Texte sind dieselbe Quelle, die Phase 7 für den Chatbot-Prompt braucht.
- 2026-09-16 — Entscheid nachgetragen: apps.rautaki.ch geht mit dem Umbau live (Zugangscode weg, `noindex` aufheben) und ist über www.rautaki.ch erreichbar. Neuer Punkt in Phase 8, Folgehinweise in Phase 7, Phase 10 und §5.
- 2026-09-16 — Phase 6 erledigt: README (Seiten-/API-Tabelle, CSP-Hinweis), geo-roadmap P6 hinfällig, Notiz im chatbot-hardening-plan.
- 2026-09-16 — Phase 8, Punkt apps.rautaki.ch erledigt (11:10 Uhr): `ACCESS_CODE` in Vercel entfernt, neu ausgerollt, Site öffentlich ohne `noindex`. Prompt-Nachtrag 11:14 Uhr: Regel «Schweizer Schreibweise, ss statt ß» in den LANGUAGE RULES (erster Livelauf antwortete mit «Außerdem»); Version `e408e377…`, byte-gleich rückgelesen, Fragen 5 und 6 ohne ß. Zeitangaben in diesem Dokument ab jetzt in Europe/Zurich (bisherige UTC-Angaben umgerechnet).
- 2026-09-16 — Phase 8, Punkt n8n erledigt: neuer Prompt über die REST-API eingespielt (Version `ba0298fa…`), byte-gleich rückgelesen, zehn Kontrollfragen live bestanden; Stand-Hinweis im Hardening-Dokument auf «deployed». Dringend: Zugangscode auf apps.rautaki.ch entfernen, der Bot sagt bereits «kein Zugangscode».
- 2026-09-16 — Phase 9 erledigt: PR #111 gemerged (`7d093ee`, 11:01 Uhr), Produktion geprüft (Redirects, Menü, Checker, Sitemap, llms.txt). Phase 10 begonnen; Rest hängt an Phase 8.
- 2026-09-16 — Phase 9 Prüfung bestanden (Lint, tsc, Build, test:libs, manuelle Endprüfung am Produktions-Build); Nebenbefund im Checker behoben; PR #111 eröffnet.
- 2026-09-16 — Phase 7 erledigt: Wortlaut freigegeben, Offline-Prüfung (Regelabdeckung der neun Testfragen, alle Links aufgelöst) bestanden, an Phase 8 übergeben.
- 2026-09-16 — Phase 7 Entwurf: vollständiger neuer Prompt in `security/n8n-workflow-hardening.md` §1 (Stand-Hinweis «DRAFT, not yet deployed»), fünf Kontrollfragen mit erwarteten Antworten in §5. Satz zur Testphase weggelassen (Entscheid Auftraggeber).
- 2026-09-16 — Phase 7 «Neuer Chatbot-Prompt für n8n» eingefügt (vollständiger Prompt statt Teilkorrektur, Freigabe des Wortlauts, Kontrollfragen); bisherige Phasen 7 bis 9 sind neu 8 bis 10. Offen: Satz zur Testphase im Prompt nach Ende der Testphase streichen.
- 2026-09-16 — Teil B «Vorlagen für die fünf übrigen Apps» angefügt (Phasen B0–B7, Muster je App, Kosten 0 USD, keine bezahlten Läufe); Dokument in Teil A und Teil B gegliedert, Tracker um acht Zeilen erweitert.
- 2026-09-16 — Phase B0 erledigt: alle fünf Entscheide gemäss Empfehlung; Aufgabe 154 (Phase B1) in app-schaufenster angelegt.
- 2026-09-16 — Phase B1 erledigt (Aufgabe 154 in app-schaufenster): Knopf-Baustein und `ersetzeGenau` im Kern, Antwort-Assistent umgestellt ohne sichtbare Änderung; Muster je App im Brief `vorlage-weitere-apps.md`.
- 2026-09-16 — Phase B2 begonnen: Aufgabe 155 (Vorlage und ZIP-Datei des Entwurf-Checks) in app-schaufenster; Freigabe und Prüfung in Claude offen.
- 2026-09-16 — Phase B3 begonnen: Aufgabe 156 (Vorlage und ZIP-Datei von «Kommunikation aus einem Anlass»). Texte der Vorlage Entwurf-Check (B2) freigegeben, Prüfung in Claude folgt später.
- 2026-09-16 — Phase B4 begonnen: Aufgabe 157 (Vorlage «Verständlich machen» mit beiden Stufen, ZIP-Datei); kein `felder.ts` nötig.
- 2026-09-16 — Phase B5 begonnen: Aufgabe 158 (Vorlage Dokumenten-Chat für PDF im Chat, ZIP-Datei).
- 2026-09-16 — Phase B6 begonnen: Aufgabe 159 (Vorlage KI-Potenzial-Radar als Fragebogen im Chat, ZIP-Datei). Damit sind alle fünf Vorlagen gebaut (Aufgaben A der Phasen B2–B6); offen je App Freigabe, Prüfung in Claude und Aufgabe B.
- 2026-09-16 — Phase B2, Aufgabe B (160): Knopf auf /entwurf-check, e2e, README. Entscheid des Auftraggebers: Knopf vor der Prüfung in Claude; die Prüfung folgt später.
- 2026-09-16 — Phase B3, Aufgabe B (161): Texte freigegeben, Knopf auf /kommunikation, e2e, README; Prüfung in Claude folgt später.
- 2026-09-16 — Phase B4, Aufgabe B (163): Texte freigegeben, Knopf auf /verstaendlich-machen, e2e, README; Prüfung in Claude je Stufe folgt später (Aufgabe 162 in app-schaufenster sammelt die Prüfungen).
- 2026-09-16 — Phase B5, Aufgabe B (164): Texte freigegeben, Knopf auf /dokumenten-chat, e2e, README; Prüfung in Claude folgt später (162).
- 2026-09-16 — Phase B6, Aufgabe B (165): Texte freigegeben, Knopf auf /ki-radar, e2e, README. Damit haben alle sechs Apps Vorlage, ZIP-Datei und Knopf; offen sind die Prüfungen in Claude (Aufgabe 162 in app-schaufenster) und Phase B7.
- 2026-09-16 — Phase B7 (Aufgabe 167 in app-schaufenster): Profil §5.1, Vorlagen in llms.txt/llms-full.txt (DE/EN) und als Nachtrag im Chatbot-Prompt (Freigabe offen, Kontrollfrage 10). Auswertung als Aufgabe 168 angelegt, Datum offen bis Livegang. Aufgabe 166 (Turnstile im Test nachgebildet) ebenfalls erledigt.
- 2026-09-16 — Freigaben (Aufgabe 169 in app-schaufenster): Prompt-Nachtrag zu den Vorlagen und Titel beim Knopf der fünf Apps. Versuch, den Prompt über die n8n-Anbindung einzuspielen, von der Sicherheitsregel der Arbeitsumgebung abgelehnt; Phase 8 bleibt beim Auftraggeber.
- 2026-09-16 — Übergabe an `rautaki-web`: Tracker auf den Stand nach Aufgabe 169 gebracht (B2–B6 Bau fertig, offen nur Prüfung in Claude; B7 bis auf Phase 8 und Auswertung erledigt); Liste der offenen Punkte mit Ort im Abschnitt «Stand der Umsetzung».
