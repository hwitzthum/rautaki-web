# Umbau: «Lab» wird «Apps» (Anbindung von apps.rautaki.ch)

Stand: 2026-09-16 · Planungsdokument mit Fortschritts-Tracker · Projekt `rautaki-web`

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
| 4 | Weiterleitungen alter Lab-Adressen | offen | | | |
| 5 | Sitemap, llms.txt, Schemas nachführen | offen | | | |
| 6 | Dokumentation im Repository | offen | | | |
| 7 | Neuer Chatbot-Prompt für n8n (vollständig, freigegeben) | offen | | | Wortlaut braucht Freigabe des Auftraggebers |
| 8 | Ausserhalb des Repositories (Auftraggeber) | offen | | | n8n, Vercel, Netlify, Umami |
| 9 | Prüfung und Veröffentlichung | offen | | | |
| 10 | Kontrolle nach dem Livegang | offen | | | |

**Gesamtstand:** 4 von 11 Phasen erledigt. Livegang: noch nicht erfolgt.

---

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

- [ ] `/lab` → `https://apps.rautaki.ch`
- [ ] `/en/lab` → `https://apps.rautaki.ch`
- [ ] `/lab/ki-governance-policy.html` → `https://apps.rautaki.ch`
- [ ] `/lab/multi-assistant-gpt.html` → `https://apps.rautaki.ch`
- [ ] Lokal geprüft: alle vier leiten weiter, `/lab/eu-ai-act-check.html` nicht
- Status: offen

### Phase 5 — Sitemap, llms.txt und Schemas

- [ ] `sitemap.ts`: `/lab`, `/en/lab` und die zwei archivierten Werkzeuge entfernen; Checker-Eintrag bleibt
- [ ] `llms.txt`: Abschnitt «Lab» durch «Apps» ersetzen (DE und EN), Link auf apps.rautaki.ch, Checker als einzelnes Werkzeug
- [ ] `llms-full.txt`: dasselbe (`labHeading`, `labIntro`, `labTools` DE/EN)
- [ ] Prüfen, dass der Checker sein WebApplication-Schema weiterhin im eigenen HTML trägt (bisher wurde es zusätzlich von `/lab` ausgegeben)
- Status: offen

### Phase 6 — Dokumentation im Repository

- [ ] `README.md`: Seitentabelle (`/lab` raus, Checker als Einzelseite, Hinweis auf apps.rautaki.ch), API-Tabelle (`/api/lab-access` raus), CSP-Hinweis
- [ ] `docs/geo-roadmap.md`: P6-Punkt «Lab-Tools auf Englisch» als hinfällig markieren, Verweis auf dieses Dokument
- [ ] `security/chatbot-hardening-plan.md`: Hinweis, dass die Route lab-access entfernt wurde
- Status: offen

### Phase 7 — Neuer Chatbot-Prompt für n8n

Der Website-Chatbot («Rautaki-Support», n8n) beantwortet Fragen aus seinem Systemprompt. Der
heutige Prompt kennt das Lab mit drei Werkzeugen und nichts von apps.rautaki.ch. Ein blosses
Umbenennen des Lab-Abschnitts genügt nicht: Der Bot muss die neue Ausgangslage vollständig
kennen. Ergebnis dieser Phase ist ein **kompletter, einfügefertiger Prompt**, keine Teilkorrektur.

Quelle der Wahrheit für den Prompt-Text bleibt `security/n8n-workflow-hardening.md` (§1, Block
«Replace the system prompt with»). Dort steht heute eine byte-genaue Kopie des laufenden Prompts;
diese Regel gilt weiter: Was in n8n eingefügt wird, steht wortgleich im Dokument.

Inhalt des neuen Prompts (was sich gegenüber heute ändert):

- [ ] Abschnitt «LAB — KOSTENLOSE WERKZEUGE» ersetzen durch «APPS — KI-APPS ZUM AUSPROBIEREN»: Link https://apps.rautaki.ch, ein Satz zum Zweck (KI-Apps zum sofortigen Ausprobieren im Browser, kostenlos, ohne Konto), und die sechs Apps je mit Name, Adresse und einem Satz Nutzen: Dokumenten-Chat mit Quellen (`/dokumenten-chat`), Antwort-Assistent (`/antwort-assistent`), Verständlich machen (`/verstaendlich-machen`), Entwurf-Check (`/entwurf-check`), Kommunikation aus einem Anlass (`/kommunikation`), KI-Potenzial-Radar (`/ki-radar`). Wortlaut aus den freigegebenen Texten des Schaufensters (`app-schaufenster/src/apps/*`, Startseite), nicht aus dem Gedächtnis
- [ ] Regel für die Testphase: Solange apps.rautaki.ch einen Zugangscode verlangt, sagt der Bot das offen («derzeit in einer geschlossenen Testphase, Zugang auf Anfrage an hello@rautaki.ch») und verspricht keinen freien Zugang. Der Satz ist so markiert, dass er nach Ende der Testphase gestrichen wird (Eintrag im Änderungsprotokoll dieses Dokuments)
- [ ] EU-AI-Act-Checker als einzelnes, weiterhin kostenloses Werkzeug nennen (`/lab/eu-ai-act-check.html`), mit Bezug zum Artikel «EU AI Act für Schweizer NPOs»; Governance-Generator und Multi-Assistant-Anleitung streichen. Auf Fragen danach: «nicht mehr online», Hinweis auf die Apps
- [ ] Abgrenzung im Prompt: «Apps» auf apps.rautaki.ch sind fertige KI-Apps zum Ausprobieren; sie sind kein Beratungsersatz und keine Rechtsberatung (bestehende Haltung des Prompts beibehalten)
- [ ] Regel R4 (Themenrahmen) anpassen: «the Lab tools» → «the Apps on apps.rautaki.ch and the EU AI Act checker»; alle weiteren Stellen, die «Lab», «Werkzeuge», «Tools», «Generatoren» als Auslöser nennen, auf die neue Lage umschreiben
- [ ] Link-Regeln prüfen: apps.rautaki.ch ist eine absolute Adresse und bekommt nie das `/en`-Präfix; die Apps sind nur auf Deutsch, das sagt der Bot englischsprachigen Besuchern
- [ ] Abschnitt «WEITERE SEITEN» um «Apps» ergänzen
- [ ] Sync-Liste im Kopf von §1 anpassen: `src/app/lab/page.tsx` ersetzen durch den Hinweis, dass die App-Beschreibungen aus dem Projekt `app-schaufenster` stammen und bei jeder neuen oder umbenannten App nachgeführt werden
- [ ] Alle übrigen Abschnitte (Canary, R1 bis R3, Leistungen, Vorgehen, Preise, Wissen, Kontakt, Buchung, Content Rules) unverändert übernehmen; Vergleich alt/neu als Diff im PR sichtbar

Ablauf:

- [ ] Entwurf des vollständigen Prompts als Block in `security/n8n-workflow-hardening.md` (Stand-Hinweis mit neuem Datum, «Stand: … noch nicht in n8n eingespielt» bis Phase 8 erledigt ist)
- [ ] Wortlaut der neuen Abschnitte dem Auftraggeber zur Freigabe vorlegen (Texte sind Business-Entscheid, kein Tech-Entscheid); Freigabe mit Datum hier eintragen
- [ ] Freigegebenen Prompt offline gegen die Testfragen aus §5 des Hardening-Dokuments und gegen fünf neue Fragen prüfen: «Was ist das Lab?», «Gibt es den Governance-Generator noch?», «Wo finde ich den EU-AI-Act-Check?», «Was kann ich auf apps.rautaki.ch ausprobieren?», «Brauche ich einen Zugangscode?». Erwartete Antworten neben die Fragen schreiben
- [ ] Übergabe an Phase 8: Der Auftraggeber fügt den Block in n8n ein (Anleitung §1 des Hardening-Dokuments); danach Stand-Hinweis im Dokument auf «byte-genaue Kopie, eingespielt am …» setzen
- Status: offen

### Phase 8 — Ausserhalb des Repositories (Auftraggeber)

Diese Punkte kann Claude nicht ausführen; sie brauchen Konten und Zugänge.

- [ ] n8n: Systemprompt des Website-Chatbots durch den in Phase 7 freigegebenen Block ersetzen (Anleitung in `security/n8n-workflow-hardening.md`, §1); danach die fünf Kontrollfragen aus Phase 7 live stellen und die Antworten mit den erwarteten vergleichen
- [ ] n8n: Workflow «Lab-Anmeldung → Salesflare» deaktivieren oder löschen
- [ ] Vercel, Projekt `rautaki-web`: Umgebungsvariable `N8N_LAB_WEBHOOK_URL` entfernen
- [ ] Netlify: offene Formularanfragen der alten Demo prüfen, Site `rautaki-apps.netlify.app` löschen, Konto schliessen, falls sonst nichts darauf liegt
- [ ] Umami Cloud: Website der alten Demo löschen, Konto schliessen
- Status: offen

### Phase 9 — Prüfung und Veröffentlichung

- [ ] `npm run lint`, `npm run build` grün; `security/test-libs.mjs` läuft
- [ ] Manuelle Prüfung lokal: Menü DE/EN, Fusszeile, vier Weiterleitungen, Checker, Artikel-Links, `/sitemap.xml`, `/llms.txt`
- [ ] Pull Request mit Verweis auf dieses Dokument; ehrliche Einschätzung an den Auftraggeber; Freigabe abwarten
- [ ] Zusammenführen in `main`; Vercel veröffentlicht automatisch
- Status: offen

### Phase 10 — Kontrolle nach dem Livegang

- [ ] www.rautaki.ch: Menü und Fusszeile zeigen «Apps», Klick landet auf apps.rautaki.ch
- [ ] apps.rautaki.ch: Wortmarke führt zurück auf www.rautaki.ch (Profil §4.6)
- [ ] `https://www.rautaki.ch/lab` und `/en/lab` leiten weiter; Checker erreichbar
- [ ] Chatbot auf www.rautaki.ch beantwortet die fünf Kontrollfragen aus Phase 7 wie erwartet (Phasen 7 und 8 wirksam)
- [ ] Datum des Livegangs hier eintragen und im Projekt `app-schaufenster` melden (Handoff: Pilot-Auswertung 30 Tage danach)
- Status: offen

## 5. Risiken und offene Punkte

- **Zugangscode:** Solange apps.rautaki.ch in der Testphase ist, sehen Besucher aus dem Menü
  die Zugangsseite. Entscheid des Auftraggebers vom 2026-09-16. Sobald der Code entfernt wird,
  hier vermerken.
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

## 6. Änderungsprotokoll

- 2026-09-16 — Dokument angelegt; Entscheide des Auftraggebers aufgenommen (Zeitpunkt sofort, Checker bleibt, E-Mail-Kanal fällt weg, «Apps» mit Weiterleitung).
- 2026-09-16 — Phase 1 erledigt: «Lab» → «Apps» in Menü und Fusszeile (DE/EN). Nebenbefund: `localePath()` hätte `/en` vor die absolute Adresse gesetzt; behoben in `src/lib/i18n.ts`. `npm run lint`, `tsc`, `npm run build` grün.
- 2026-09-16 — Phase 2 erledigt: Lab-Seiten, `LabGateModal`, `/api/lab-access` und `N8N_LAB_WEBHOOK_URL` entfernt; Kommentare bereinigt (zusätzlich in `src/app/api/chat/route.ts`). Stolperstein: veraltete `.next/dev`-Typen, siehe Phase 2.
- 2026-09-16 — Phase 3 erledigt: Generator und Multi-Assistant-Anleitung samt `html-docx.js` und Font-Kopie nach `archiv/lab/` (README dort); Vendor-Pfade im Archiv relativ gesetzt. Checker und seine Schriften bleiben unter `public/lab/`.
- 2026-09-16 — Phase 7 «Neuer Chatbot-Prompt für n8n» eingefügt (vollständiger Prompt statt Teilkorrektur, Freigabe des Wortlauts, Kontrollfragen); bisherige Phasen 7 bis 9 sind neu 8 bis 10. Offen: Satz zur Testphase im Prompt nach Ende der Testphase streichen.
