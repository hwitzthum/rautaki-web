# GEO-Roadmap

Trackable Liste der GEO-Massnahmen. **Zyklus 1** (P1–P7): Benchmark vom 2026-07-10. **Zyklus 2** (P8–P11 + Re-Verifikation R): Sichtbarkeits-Audit vom 2026-09-16.
Quellen Zyklus 1: Search Engine Land (Mastering GEO in 2026), Google (Optimizing for Generative AI Features), LLMrefs (GEO Guide 2026), Firebrand (GEO Best Practices 2026); Wettbewerbs-Benchmark: transformind.ch, sollbergeraiconsulting.ch, kimpact.ch, spekt.ch.

Befund: On-Site-GEO ist erstklassig (llms.txt/llms-full.txt, @graph-Schemas, FAQPage, Wikidata, AI-Bots erhalten volles SSR-HTML). **Engpass ist Off-Site**: Für Kernqueries («KI-Strategie Beratung NPO Schweiz Verwaltungsrat») erscheinen Wettbewerber, Rautaki nicht.

Konventionen:
- Checkbox abhaken im selben PR, der das Item abschliesst; Status-Zeile mit Datum + PR-Link ergänzen.
- Zyklus-2-Items haben IDs (`P8.1`, `R3`, …) — in Commits und PR-Titeln referenzieren.
- Re-Verifikationen (R): beim Abhaken Datum + Ergebnis notieren — «✓ unverändert» oder «✗ Regression → Folge-Item Px.y».
- Mit jedem abgeschlossenen Item die Tabelle «Fortschritt» nachführen (Zähler + «Letzte Änderung»).

## Fortschritt

| Paket | Thema | Zyklus | Erledigt | Status | Letzte Änderung |
|---|---|---|---|---|---|
| P1 | Englische Version | 1 | 5/5 | abgeschlossen | 2026-07-11 |
| P2 | Wissen-Sektion | 1 | 6/6 | abgeschlossen | 2026-07-11 |
| P3 | Externe Erwähnungen | 1 + 2 | 0/8 | offen — Priorität 2 in Zyklus 2 | 2026-09-16 |
| P4 | Wikidata | 1 | 5/5 | abgeschlossen — Items am 2026-07-11 gelöscht (R6) | 2026-09-16 |
| P5 | Google-Business-Profile-URL | 1 | — | geschlossen mit Befund | 2026-07-11 |
| P6 | Aufgeschoben aus P1 | 1 | 2/2 | abgeschlossen | 2026-09-16 |
| P7 | GEO-Messung | 1 | 5/5 | abgeschlossen | 2026-07-11 |
| P8 | Indexierung der Kernseiten | 2 | 2/4 | in Arbeit — Priorität 1 | 2026-09-16 |
| P9 | Nicht-Marken-Suchen & Snippets | 2 | 4/6 | in Arbeit — Priorität 3 | 2026-09-16 |
| P10 | Performance & Technik | 2 | 0/6 | offen | 2026-09-16 |
| P11 | Externe Sichtbarkeitsmessung | 2 | 0/4 | offen | 2026-09-16 |
| R | Re-Verifikation Zyklus 1 | 2 | 1/12 | in Arbeit | 2026-09-16 |

Zähler aus der Datei neu berechnen (Abgleich mit der Tabelle):

```bash
awk '/^## /{s=$0; o[s]+=0; d[s]+=0} /^[[:space:]]*- \[x\]/{d[s]++} /^[[:space:]]*- \[ \]/{o[s]++} END{for(k in d) if(d[k]+o[k]) printf "%-50s %2d/%2d\n", k, d[k], d[k]+o[k]}' docs/geo-roadmap.md | sort -V
```

---

## P1 — Englische Version + DE|EN-Sprachumschalter

Status: in Arbeit (Start 2026-07-11). `/en`-Prefix, hreflang, DeepL-einmalig → committete Dateien, Toggle im Header. Architektur: siehe Plan.

- [x] Roadmap-Datei angelegt (PR #65, 2026-07-11)
- [x] PR 1 — String-Extraktion: alle Inhalte nach `src/content/{de}/*`, Seiten → gemeinsame Komponenten mit `locale`-Param, deutsches HTML byte-identisch (PR #66, 2026-07-11)
- [x] PR 2 — DeepL-Skript (`npm run translate`) + generierte `src/content/en/*` (menschliches Review = Qualitäts-Gate; inkl. NEXT_LOCALE-Hinweis für Datenschutzseite) (PR #70, 2026-07-11)
- [x] PR 3 — `/en`-Routen, LocaleSwitch (Header + Mobile), Cookie, hreflang/og:locale, lokalisierte Schemas (PR #68, 2026-07-11)
- [x] PR 4 — Sitemap-Alternates, llms.txt «## English»-Sektion, llms-full.txt zweisprachig (PR #69, 2026-07-11)

**P1 abgeschlossen am 2026-07-11.** Offen geblieben (→ P6): Lab-Tools EN, n8n-Bot englische Antworten.

## P2 — Insights/Wissen-Sektion (zitierbarer, datierter Content)

**Abgeschlossen 2026-07-11** — Sektion + 4 Artikel (de+en) live. Weitere Artikel nach Bedarf; llms.txt-Liste handpflegen.

Wichtigster inhaltlicher Hebel: AI-Engines bevorzugen datierbare, attribuierbare Quellen. Article-Schema mit `datePublished`/`dateModified`, `author` → Person-Node.

- [x] Sektion `/wissen` (+ `/en/wissen`) mit BlogPosting-Schema, Markdown-Loader, Navigation (PR #78, 2026-07-11)
- [x] RSS-Feed `/feed.xml` mit Site-weiter Autodiscovery (PR #78)
- [x] Artikel «EU AI Act: Was gilt für Schweizer NPOs?» de+en live, Indexierung angefragt (PR #78, 2026-07-11; Zeitplan auf Stand Digital Omnibus)
- [x] Artikel «KI-Strategie im Verwaltungsrat: die entscheidenden Fragen» de+en live, Indexierung angefragt (PR #81, 2026-07-11; Art. 716a OR, sieben Fragen, swissVR II/2024)
- [x] Artikel «Der Weg zu wirksamer KI» (Methode) de+en live, Indexierung angefragt (PR #83, 2026-07-11)
- [x] Artikel «KI-Reifegrad in Schweizer NPOs» (Desk-Research-Synthese) de+en live, Indexierung angefragt (PR #83, 2026-07-11) — später ablösbar durch eigene Erhebung (Forschungslücken-Kapitel bereitet das vor)
- Pflege-Hinweis: llms.txt «## Wissen» ist handgepflegt — bei jedem neuen Artikel ergänzen (llms-full/Sitemap/Feed generieren sich automatisch)

## P3 — Externe Erwähnungen (Off-Site-Autorität)

Retrieval-Engines finden nur, was Dritte erwähnen. Jede unabhängige Seite «Rautaki = Schweizer KI-Strategieberatung für NPOs» zählt.

Audit 2026-09-16 bestätigt den Engpass: Share of Voice 0/10 bei ChatGPT, Perplexity und Gemini (HubSpot), 0 KI-Erwähnungen (Semrush), 1 verweisende Domain (Seobility), bekannte Backlinks nur Spam-Seiten, kein Eintrag auf local.ch/search.ch/Zefix. → Priorität 2 in Zyklus 2.

- [ ] Brancheneinträge: local.ch / search.ch (Kilchberg, Beratung) — Audit 2026-09-16: weiterhin kein Eintrag
- [ ] Dozentenprofil mit Backlink auf ikf-Kursseiten anfragen
- [ ] Dozentenprofil mit Backlink beim VMI (Uni Fribourg) anfragen
- [ ] NPO-Fachmedien: Gastbeitrag/Interview (StiftungSchweiz, Fundraiso, …)
- [ ] Podcast-Auftritte im NPO-/KI-Umfeld
- [ ] LinkedIn-Kadenz mit Links auf kanonische Seiten beibehalten
- [ ] LinkedIn-Unternehmensseite «Rautaki» anlegen und auf der Website verlinken (Audit 2026-09-16: nur persönliches Profil verlinkt)
- [ ] Wikidata-Items für Rautaki und Harry Witzthum neu anlegen — erst, wenn unabhängige Quellen (Fachmedien, Dozentenprofile, Brancheneinträge) die Notability belegen; dann `wikidata` wieder in `src/lib/authority.ts` aufnehmen (Folge-Item aus R6)

## P4 — Wikidata-Anreicherung (Q140457396)

**Abgeschlossen 2026-07-11.** **Regression (R6, festgestellt 2026-09-16):** Beide Items wurden noch am 2026-07-11 von einem Wikidata-Admin gelöscht — Q140500710 um 11:53, Q140457396 um 11:54 (Begründung: «Does not meet the notability policy»). Die Website verwies seither auf ein gelöschtes Item (`sameAs`, llms.txt, llms-full.txt); Link entfernt in P9.2. Neuanlage → P3.

- [x] Default-Label (`mul`, gilt für alle Sprachen) + `en`-Beschreibung ergänzt
- [x] P112 (Gründer) — Item für Harry Witzthum angelegt: **Q140500710** (human, management consultant + lecturer, ResearchGate-/LinkedIn-ID)
- [x] P571 (Gründungsdatum): Februar 2026
- [x] P1454 (Rechtsform): Einzelunternehmen (Schweiz)
- [x] Referenzen an allen Claims (UID-Register-URL; Industry via Impressum)
- Notiz: Google Knowledge Graph kgmid `/g/11zcsjwpcl`

## P5 — Google-Business-Profile-URL

**Geschlossen 2026-07-11 mit Befund:** Das GBP ist ein Service-Area-Profil mit verborgener Adresse — Google stellt dafür **keine öffentliche Maps-Place-Seite** bereit (`maps.google.com/?cid=824068227341883080` rendert leer). Der bestehende `share.google`-Link (→ Knowledge Panel) ist die beste stabile URL und bleibt in `src/lib/authority.ts`. Einzige Alternative wäre, die Adresse im GBP öffentlich zu machen (nicht empfohlen für eine Privatadresse).

## P6 — Aufgeschoben aus P1

- [x] ~~Lab-Tools (3 statische HTML-Apps) auf Englisch — inkl. generierter Word/PDF-Dokumente~~ — **hinfällig seit 2026-09-16:** «Lab» wurde durch «Apps» (apps.rautaki.ch) ersetzt, zwei der drei Tools sind archiviert (`archiv/lab/`); nur der EU-AI-Act-Check bleibt online, eine englische Fassung ist nicht geplant. Siehe `docs/apps-umbau-plan.md`.
  - [x] n8n-Chatbot: englische Antworten (2026-07-11) — Bot folgte bereits der Nutzersprache; ergänzt: Seiten-Locale-Fallback bei mehrdeutiger Eingabe (?locale via Proxy-URL, HMAC-kompatibel in beide Richtungen), /en-Links in englischen Antworten, englische Refusals, Wissen-Artikel im Prompt (Workflow-Update + PR #85; live E2E-verifiziert)

## P7 — GEO-Messung

**Implementiert 2026-07-11.**

- [x] AI-Referrer- und AI-Crawler-Tracking: monatliche Aggregat-Counter in Upstash, geschrieben im Proxy (`src/lib/geo-track.ts`), Read-back via `/api/geo-stats` (PR #74; kein PII, kein Cookie)
- [x] Monatliche Prompt-Probes: n8n-Workflow «Rautaki GEO-Probe (monatlich)» (ID `9VGsWbFuKGQYU4uV`) — 10 Fragen (5 DE/5 EN) an OpenAI, Perplexity, Gemini und Claude mit Web-Suche; Auswertung Erwähnung/Zitierung; Historie in Data Table `geo_probes`; Digest-Mail an hello@rautaki.ch inkl. Website-Signalen. Testlauf 2026-07-11 erfolgreich (Baseline: OpenAI 2/10 erwähnt+zitiert, Perplexity 0/10, Claude 0/10)
- [x] Search Console AI-Overview-Impressionen: als manuelle Prüf-Zeile im monatlichen Digest verankert
- [x] Gemini-API-Key in n8n-Credential «Google Gemini(PaLM) Api account» erneuert (2026-07-11); Verifikationslauf: alle vier Engines antworten (Testzeilen unter Monat `2026-07-verify` in `geo_probes`)
- [x] Workflow in n8n aktiviert (2026-07-11) — erster geplanter Lauf: 1. August 2026, 07:00

**P7 vollständig abgeschlossen am 2026-07-11.**

---

# Zyklus 2 — Sichtbarkeits-Audit vom 2026-09-16

Quellen (alle 2026-09-16, kostenlose Stufen): Semrush SEO Checker + AI Search Visibility Checker, HubSpot AI Search Grader, Peekaboo, Google Search Console, Seobility SEO-Check, Google Rich Results Test, validator.schema.org, Lighthouse 12 (lokal), Mozilla Observatory, securityheaders.com, local.ch / search.ch / Zefix, Cookie-Check per Headless Chrome. PDF-Bericht liegt beim Owner (nicht im Repo).

Reihenfolge (Empfehlung aus dem Audit): **1 · P8** Indexierung → **2 · P3** Off-Site-Erwähnungen → **3 · P9** Nicht-Marken-Suchen. P10, P11 und R laufen parallel.

## Baseline 2026-09-16

Messarten bewusst getrennt. Nach Abschluss von P8/P9 (frühestens 2026-10-16) mit identischen Eingaben wiederholen und Spalte «Folgemessung» füllen (→ P11.2).

| Messart | Quelle | Wert 2026-09-16 | Folgemessung |
|---|---|---|---|
| SEO-Score | Semrush SEO Checker (nur Startseite) | 46/100 — On-Page 85 %, Technik 80 %, Off-Page 0 %, Social 20 % | |
| SEO-Score | Seobility SEO-Check (Startseite) | On-Page 78 % — Seitenqualität 48 %, Links 86 %, Externe Faktoren 3 % | |
| Performance | Lighthouse 12 lokal | Mobil 78 (LCP 5.3 s, TBT 140 ms, CLS 0) · Desktop 100 (LCP 0.7 s) | |
| Strukturierte Daten | Rich Results Test / validator.schema.org | 2 gültige Elemente / 0 Fehler, 2 Warnungen | |
| Sicherheit | Mozilla Observatory / securityheaders.com | B+ (80/100) / A | |
| KI-Erwähnungen | HubSpot AI Search Grader (Rautaki / Switzerland / KI-Strategieberatung / Management Consulting) | ChatGPT 33 · Perplexity 35 · Gemini 44; Share of Voice 0/10 | |
| KI-Erwähnungen | Peekaboo (ChatGPT + Google AI Overview, auto-generierte Prompts) | Sichtbarkeit 3 %, Ø Position 3.0 | |
| KI-Erwähnungen | Semrush AI Search Visibility Checker | keine Daten (N/A) | |
| KI-Erwähnungen | GEO-Probe n8n (P7) | Juli 2026: OpenAI 2/10, Perplexity 0/10, Claude 0/10 (Aug/Sep → P11.3) | |
| Google-Impressionen | GSC Websuche 10.07.–13.09.2026 | 48 Klicks · 318 Impr. · CTR 15.1 % · Ø Pos. 13.4; 69 % der Klicks Markensuchen | |
| Google-KI-Impressionen | GSC «Generative AI features» (Beta), gleicher Zeitraum | 38 Impr. (CH 29, DE 4) | |
| Indexierung | GSC Seitenbericht (Stand 04.09.2026) | 19 indexiert / 15 nicht indexiert | |
| Lokale Präsenz | local.ch / search.ch / Zefix | kein Eintrag | |

## P8 — Indexierung der Kernseiten

Befund: GSC «Gefunden – zurzeit nicht indexiert» (Stand 04.09.2026) für `/services`, `/wissen`, `/en/vorgehen`, `/privacy`, drei EN-Artikel und drei alte `/lab`-URLs. Ohne Index weder Rankings noch Zitate in AI Overviews/AI Mode.

- [x] P8.1 GSC-URL-Prüfung + Indexierung beantragen: `/services`, `/wissen` (PR #121, 2026-09-16, beide «Indexierung beantragt»). Befund URL-Prüfung (Property `https://www.rautaki.ch/`): `/services` = «URL ist Google nicht bekannt» — keine verweisende Sitemap, keine verweisende Seite erkannt, obwohl in `sitemap.xml` enthalten; `/wissen` = «Gefunden – zurzeit nicht indexiert», bekannt über `sitemap.xml` und `/en/wissen`. Beides fliesst in P8.3 ein. Vorab live geprüft: beide 200, `index, follow`, selbstreferenzierender Canonical, nicht per robots.txt gesperrt.
- [ ] P8.2 GSC-URL-Prüfung + Indexierung beantragen: `/en/vorgehen`, `/en/wissen/der-weg-zu-wirksamer-ki`, `/en/wissen/ki-reifegrad-schweizer-npos`, `/en/wissen/ki-strategie-verwaltungsrat` — Stand 2026-09-16: 3/4 beantragt. Vorab live geprüft: alle 200, `index, follow`, selbstreferenzierender Canonical.
  - `/en/vorgehen`: **«Gecrawlt – zurzeit nicht indexiert»** (gecrawlt 11.09.2026, seit Seitenbericht vom 04.09. vorgerückt) → beantragt. Anders als «Gefunden» ist das eine Qualitäts-/Duplikat-Entscheidung von Google — bei P8.4 gezielt prüfen.
  - `/en/wissen/der-weg-zu-wirksamer-ki`: «URL ist Google nicht bekannt» (gleiche GSC-Inkonsistenz wie `/services`) → beantragt.
  - `/en/wissen/ki-reifegrad-schweizer-npos`: «Gefunden – zurzeit nicht indexiert» (via Sitemap) → beantragt.
  - `/en/wissen/ki-strategie-verwaltungsrat`: «Gefunden – zurzeit nicht indexiert» (via Sitemap und DE-Artikel) → **offen**: GSC meldete «Problem beim Senden des Indexierungsantrags»; zweiter Versuch hängte die GSC-Oberfläche auf. Wahrscheinlich Tageskontingent (7 Anträge an diesem Tag) — am Folgetag erneut beantragen.
- [x] P8.3 Ursache klären: interne Verlinkung auf `/services` und `/wissen` (Startseite, Artikel, Footer) und `lastModified` in `src/app/sitemap.ts` prüfen; Befund hier dokumentieren (PR #121, 2026-09-16) — **keine technische Ursache, sondern geringer Crawl-Bedarf; kein Code-Fix.**
  - Interne Verlinkung ✓: Jede deutsche Seite (Startseite, `/vorgehen`, `/about`, `/booking`, `/imprint`, `/wissen`, Artikel) liefert server-gerenderte `<a href>` auf `/services` und `/wissen` (Header + Footer); die Startseite verlinkt `/services` zusätzlich im Inhalt (4× plus 4 Anker).
  - Sitemap ✓: beide URLs enthalten (25 Einträge, hreflang-Alternates); GSC-Sitemaps-Bericht: zuletzt gelesen 08.09.2026, «Erfolg», 29 gefundene Seiten (vor Entfernen der `/lab`-Einträge). `lastModified.services` (de 06.07., en 11.07.) stimmt — spätere Commits waren nur Schema/i18n-Extraktion ohne inhaltliche Änderung; `/wissen` leitet sich aus den Artikeldaten ab.
  - Technik ✓: 200, `index, follow`, selbstreferenzierender Canonical, Redirects (http/apex/Trailing Slash → `https://www.rautaki.ch/services`) je ein sauberer 308. GSC-Crawling-Statistik: «Host hatte in den letzten 90 Tagen keine Probleme», Ø Antwortzeit 307 ms, 99 % 200.
  - Ursache: Google crawlt kaum Neues. Crawling-Statistik 10.07.–Mitte 09.2026: 540 Anfragen, davon 92 % Aktualisierung / 8 % Erkennung, nur 19 % HTML (66 % JS-Chunks als Seitenressourcen). 12 der 19 indexierten Seiten wurden zuletzt am 11.07.2026 gecrawlt — dem Tag mit EN-Launch, Sitemap-Einreichung und manuellen Indexierungsanträgen; danach nur noch einzelne HTML-Crawls alle 1–2 Wochen (13.07., 18.07., 20.07., 22.07., 04.08., 18.08., 30.08., 01.09.). Was am 11.07. nicht gecrawlt wurde, blieb in der Warteschlange (alle 10 «Gefunden»-URLs: «Zuletzt gecrawlt: N/A»). Passt zu junger Domain mit 1 verweisenden Domain (P3).
  - Folgerung: kurzfristig manuelle Anträge (P8.1, P8.2); strukturell nur über externe Links/Erwähnungen (P3). Keine Sitemap- oder Linkänderung nötig.
  - Randnotiz: Die URL-Prüfung meldet `/services` als «Google nicht bekannt», der Seitenbericht (Stand 04.09.) führt sie unter «Gefunden» — inkonsistente GSC-Daten, keine Aktion.
- [ ] P8.4 Frühestens 2026-10-01: GSC-Seitenbericht erneut prüfen — Ziel: keine Kernseite mehr in «Gefunden – nicht indexiert»
- Hinweis: `/lab`-URLs leiten per 308 auf apps.rautaki.ch um — keine Aktion. «Gecrawlt – nicht indexiert» betrifft nur `/_next/static/chunks/*.js` — unkritisch.

## P9 — Nicht-Marken-Suchen & Snippets

Befund: 69 % der Klicks stammen aus Markensuchen. «verwaltungsrat ki kompetenz» hat 21 Impressionen, 0 Klicks. Startseiten-Title nur 38 Zeichen; Meta-Description spricht «Unternehmen» statt NPO/Verwaltungsrat an; Seobility: Title-/H1-Begriffe kaum im Fliesstext. Peekaboo ordnete Rautaki neben McKinsey/BCG statt im Schweizer NPO-/VR-Umfeld ein.

Zielanfragen (Empfehlung) → beste Seite:

| Anfrage (Schweiz) | Seite | Beleg |
|---|---|---|
| KI-Strategie Beratung für NPO Schweiz | `/services` (P8.1) | Kernquery Benchmark 2026-07 |
| KI-Kompetenz im Verwaltungsrat | `/wissen/ki-strategie-verwaltungsrat` | GSC: 21 Impr., 0 Klicks |
| EU AI Act: Was gilt in der Schweiz? | `/wissen/eu-ai-act-schweizer-npos` | GSC-Query + 9 KI-Impressionen |
| Wie KI-bereit ist unsere Organisation? | `/wissen/ki-reifegrad-schweizer-npos` | Themen-Fit |
| KI-Tools und Datenschutz (nDSG) in Verein/Stiftung | neue Seite (P9.5) | keine passende Seite |

- [x] P9.1 Startseite: Title (50–60 Zeichen) und Meta-Description auf NPO · Verwaltungsrat · Schweiz schärfen, de + en (Entwurf zur Freigabe vor Umsetzung) (PR #122, 2026-09-16, Variante A freigegeben). Title/Description wirken auf `<title>`, `description`, `og:*` und `twitter:*` der Startseite; `lastModified.home` auf 2026-09-16.
  - DE: «KI-Strategie für Schweizer NPOs & Verwaltungsräte | Rautaki» (59) · «KI-Strategieberatung für Verwaltungsräte und Geschäftsleitungen in der Schweiz, mit Schwerpunkt NPO: von der Standortbestimmung bis zur Umsetzung.» (146)
  - EN: «AI Strategy for Swiss Non-Profits and Boards | Rautaki» (54) · «AI strategy consulting for boards and senior management in Switzerland, with a focus on non-profits: from assessing where you stand to implementation.» (150)
  - Vorher: «Rautaki — KI-Strategie für Entscheider» (38) · «Rautaki begleitet Unternehmen …» — der alte Text lebt noch in `common.graph.orgDescription` (Organization-Schema) und im `/wissen`-Title → P9.2
- [ ] P9.2 Positionierung konsistent nachziehen: Organization-Schema `description`, llms.txt, Wikidata-Beschreibung, LinkedIn — alle Flächen gleichzeitig (Regionsbehauptung nur CH) — Stand 2026-09-16: Website-Flächen umgesetzt (PR #123), LinkedIn offen.
  - Kernsatz (freigegeben 2026-09-16, Zielgruppe ohne KMU): «Rautaki ist eine Schweizer KI-Strategieberatung für Verwaltungsräte und Geschäftsleitungen, mit Schwerpunkt NPO, Sozialwesen und öffentlicher Sektor — von der Standortbestimmung bis zur Umsetzung.» / «Rautaki is a Swiss AI strategy consultancy for boards and senior management, with a focus on non-profits, the social sector and the public sector — from assessing where you stand to implementation.»
  - ✓ Website (de + en): Organization-Schema `description`, llms.txt (Summary, English-Absatz, Home-Link), llms-full.txt (Summaries), FAQ «Was macht Rautaki?» und «Für wen …» (KMU gestrichen), `/wissen` Title + Description, `/services` Description, RSS-Feed-Description, About-CTA «Ihr Unternehmen» → «Ihre Organisation»; `lastModified.services` → 2026-09-16
  - ✓ Wikidata: entfällt — Items gelöscht (siehe P4/R6); toter Link aus `sameAs`, llms.txt und llms-full.txt entfernt
  - offen: LinkedIn (persönliches Profil): Headline + Info nach Entwurf aktualisieren (Owner)
  - Bewusst unverändert: Apps-Beschreibungen (Zielgruppe der Apps inkl. Schulen und KMU) und Artikel «Der Weg zu wirksamer KI» (nennt KMU im publizierten Text); n8n-Chatbot-Prompt nicht geprüft
- [x] P9.3 VR-Artikel: Title/Description auf «KI-Kompetenz im Verwaltungsrat» ausrichten (CTR-Hebel) (PR #124, 2026-09-16, Umfang «Title + Abschnitt» freigegeben)
  - GSC vorher (3 Monate bis 13.09.2026): 56 Impr., 1 Klick, Ø Pos. 16.4; «verwaltungsrat ki kompetenz» 21 Impr., 0 Klicks, Ø Pos. **22.6** (Seite 3) — bei dieser Position wirkt der Title vor allem auf Relevanz, kaum auf CTR.
  - Inhaltslücke geschlossen: Artikel behandelte nur die KI-Kompetenz von GL/Mitarbeitenden (Frage 5), nicht die des Gremiums selbst → neuer Abschnitt «Welche KI-Kompetenz braucht der Verwaltungsrat selbst?» (de + en, ohne neue Zahlen/Quellen); `dateModified` → 2026-09-16.
  - DE: «KI-Kompetenz im Verwaltungsrat: sieben Fragen, die zählen» · Eyebrow «Welche KI-Kompetenz braucht ein Verwaltungsrat?»; EN: «AI literacy in the boardroom: seven questions that matter». Slug unverändert. llms.txt «## Wissen» nachgeführt (Feed, llms-full, Sitemap automatisch).
  - Folgemessung ab 2026-10-16 (mit P9.6): Position und Klicks für «verwaltungsrat ki kompetenz».
- [x] P9.4 Startseite: Begriffe aus Title und H1 im Fliesstext aufgreifen (Seobility-Warnungen) (PR #125, 2026-09-16, Variante «4 Stellen» freigegeben)
  - Gemessen gegen den neuen Title (P9.1) + H1 «Strategie im KI-Zeitalter mit Wirkung», Fliesstext in `<main>` ohne Überschriften, DE: «KI-Strategie» 0 → 3, «Schweizer» 0 → 1, «Schweiz» → 4, «Verwaltungsr…» → 3, «KI-Zeitalter» 0 → 1 (347 Wörter; kein Begriff > 4×). EN analog («AI strategy» 3, «AI era» 1, «Swiss» 1).
  - Geänderte Stellen (de + en, `src/content/{de,en}/home.ts`): Hero-Intro, Problem-Abschnitt, «Zuhause, wo Wirkung zählt», Schluss-CTA. Layout unverändert; mobil (390 px) ohne horizontales Scrollen geprüft.
  - Folgeprüfung mit P11.2: Seobility-Check der Startseite wiederholen.
- [x] P9.5 Neuer Wissen-Artikel «KI-Tools und Datenschutz (nDSG) in Vereinen und Stiftungen» de + en; llms.txt «## Wissen» und Chatbot-Prompt nachführen — 2026-09-16: Artikel de + en und llms.txt (PR #126), Chatbot-Prompt nachgeführt.
  - Umfang freigegeben: Praxisleitfaden (8 Abschnitte, Checkliste mit 7 Punkten), Slug `ki-tools-datenschutz-vereine-stiftungen`. Quellenreport: `docs/research/ki-datenschutz-ndsg-quellen.md` (DSG/DSV-Wortlaut, EDÖB, DPF-Register, Anbieterseiten; Stand 16.09.2026).
  - Befristete Angaben (vor Aktualisierung neu prüfen): DPF-Register (Microsoft/Google gelistet, OpenAI nicht), Anbieterbedingungen ChatGPT/Copilot/Gemini, Status Vernehmlassung KI-Konvention (am 16.09.2026 nicht eröffnet, angekündigt bis Ende 2026 → Artikel dann aktualisieren).
  - ✓ Chatbot-Prompt (Workflow `lIPMcSi2yljEbfPJ`, publiziert 2026-09-16): Artikel 5 mit Kernaussagen, dazu R8-Befunde behoben (VR-Artikeltitel, «fünf Fachartikel», Zielgruppe ohne KMU); live DE/EN getestet. Anschliessend Link-Fix und Prompt-Präzisierung → R8.
- [ ] P9.6 Monatlich GSC-Queries auf neue Nicht-Marken-Anfragen prüfen und der Tabelle oben zuordnen (erste Prüfung 2026-10-16)

## P10 — Performance & Technik

- [ ] P10.1 Mobile LCP 5.3 s → < 2.5 s: LCP-Element bestimmen, render-blockierende Ressourcen und ungenutztes/Legacy-JavaScript reduzieren; Ergebnis mit PageSpeed Insights gegenprüfen (lokales Lighthouse ≠ PSI)
- [ ] P10.2 Schema-Warnung beheben: `availableLanguage` am Organization-Node (2×) ist dort nicht erlaubt — auf `ContactPoint` verschieben oder entfernen
- [ ] P10.3 CSP ohne `'unsafe-inline'` (Nonces) evaluieren — Observatory B+ → A; nur ohne Funktionsverlust (cal.com, Salesflare, Sentry, Chat-Widget)
- [ ] P10.4 Accessibility (Lighthouse Desktop 96): Farbkontrast und «sichtbares Label ≠ accessible name» beheben
- [ ] P10.5 Apple-Touch-Icon ergänzen (Seobility-Warnung, geringe Priorität)
- [ ] P10.6 Core Web Vitals in GSC beobachten — derzeit «keine Daten» (zu wenig Traffic); bei ersten Felddaten hier eintragen

## P11 — Externe Sichtbarkeitsmessung (ergänzt P7)

- [ ] P11.1 Peekaboo: deutsche Prompts zu NPO/Verwaltungsrat/Schweiz und echte Mitbewerber (transformind.ch, sollbergeraiconsulting.ch, kimpact.ch, spekt.ch) statt Big Four hinterlegen, falls im Gratisplan möglich
- [ ] P11.2 Audit wiederholen mit identischen Eingaben (frühestens 2026-10-16) und Baseline-Spalte «Folgemessung» füllen
- [ ] P11.3 GEO-Probe-Resultate August + September 2026 aus `geo_probes` in die Baseline übernehmen
- [ ] P11.4 Spam-Backlinks (PBN-/Statistikseiten laut Semrush) beobachten; Disavow nur bei manueller Massnahme in der GSC

## R — Re-Verifikation Zyklus 1

Die erledigten Massnahmen aus P1–P7 und «Erledigt» erneut prüfen, damit Zyklus 2 auf einer funktionierenden Basis aufbaut (Apps-Umbau, Next.js-Updates und Content-Änderungen seit Juli können sie gebrochen haben). Ergebnis pro Item gemäss Konventionen notieren; Regressionen werden zu Folge-Items im passenden Paket.

- [ ] R1 (P1) `/en`-Routen, LocaleSwitch, hreflang inkl. `x-default` und `og:locale` für alle Seitenpaare live prüfen
- [ ] R2 (P1) Sitemap: Alternates vollständig (inkl. aller Artikel), `lastModified`-Konstanten in `src/app/sitemap.ts` entsprechen den letzten inhaltlichen Änderungen
- [ ] R3 (P1/P2) `llms.txt` («## Wissen», «## English») und `llms-full.txt` enthalten alle Artikel und Apps-Links, keine `/lab`-Reste
- [ ] R4 (P2) `/wissen` + `/en/wissen`: BlogPosting-Schema im Rich Results Test valide, `/feed.xml` gültig, `dateModified` korrekt
- [ ] R5 (P3) Offene P3-Items mit Audit-Befund neu priorisieren und Reihenfolge hier festhalten
- [x] R6 (P4) Wikidata Q140457396 + Q140500710: Claims und Referenzen unverändert vorhanden; Beschreibung mit P9.2 abgleichen — 2026-09-16: ✗ Regression — beide Items am 2026-07-11 gelöscht (Notability); toter Link entfernt (P9.2, PR #123) → Folge-Item in P3
- [ ] R7 (P5) GBP: prüfen, ob Google inzwischen eine öffentliche Place-Seite anbietet; `share.google`-Link in `src/lib/authority.ts` funktioniert
- [ ] R8 (P6) Chatbot (Workflow `lIPMcSi2yljEbfPJ`): DE/EN-Antworten, `/en`-Links, Wissen-Artikel und Apps statt Lab im System-Prompt — E2E-Test auf beiden Sprachen — Stand 2026-09-16: ✗ Regression gefunden, Fix in Arbeit; abhaken nach Live-Nachtest.
  - Befund (9 Live-Fragen über `/api/chat`): Inhalte und Apps korrekt; **englische Antworten verlinken deutsche Seiten** (`/wissen/…`, `/booking` statt `/en/…`) — auch beim unveränderten EU-AI-Act-Artikel, also vorbestehend (P6 war im Juli so verifiziert). Zudem vereinzelt eigene Rechtsurteile («meist nicht zulässig», «not compliant»), ein Link als `[/wissen/…]` ohne URL, Angebot «per E-Mail senden».
  - Fix: Proxy schreibt interne Links für `locale=en` deterministisch auf `/en/…` um und repariert `[/pfad]` (`src/lib/chat-output-filter.ts`, Tests in `security/test-libs.mjs`); Prompt präzisiert (englische Artikeltitel, keine eigenen Zulässigkeitsurteile, keine E-Mail-/Buchungsangebote, Links immer als Markdown).
- [ ] R9 (P7) `/api/geo-stats` liefert Counter für 2026-08 und 2026-09; Proxy-Tracking aktiv
- [ ] R10 (P7) GEO-Probe-Läufe vom 1.8. und 1.9.2026 in `geo_probes` vorhanden, Digest angekommen, alle vier Engines antworten
- [ ] R11 (Erledigt 2026-07-18) robots.txt sperrt nur `/api/` und `/maintenance`; GSC «Blocked by robots.txt» zeigt genau diese Pfade
- [ ] R12 (Erledigt 2026-07-10) Authority-Links, Booklet als `DigitalDocument` und CAS-Lehrgänge als `Course` im Live-Schema vorhanden

---

## Erledigt

- [x] 2026-07-18 — robots.txt: `Disallow: /_next/` entfernt (PR #88). Search Console meldete «Blocked by robots.txt» für die JS-Chunks unter `/_next/static/chunks/*.js` — Google fand sie im gerenderten HTML, konnte sie aber nicht crawlen und damit die Seiten nicht vollständig rendern. `/api/` und `/maintenance` bleiben gesperrt. Live verifiziert; «Fehler beheben» in Search Console angestoßen.
- [x] 2026-07-10 — Code-Level-Fixes aus dem Benchmark (PR #64): Authority-Links zentralisiert (`src/lib/authority.ts`), Lab-HTML-Schemas an /lab-Entities angeglichen, Booklet als `DigitalDocument` mit `datePublished`, CAS-Lehrgänge als `Course`-Entities
