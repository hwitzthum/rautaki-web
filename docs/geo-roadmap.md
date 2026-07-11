# GEO-Roadmap

Trackable Liste der GEO-Massnahmen aus dem Benchmark vom 2026-07-10.
Quellen: Search Engine Land (Mastering GEO in 2026), Google (Optimizing for Generative AI Features), LLMrefs (GEO Guide 2026), Firebrand (GEO Best Practices 2026); Wettbewerbs-Benchmark: transformind.ch, sollbergeraiconsulting.ch, kimpact.ch, spekt.ch.

Befund: On-Site-GEO ist erstklassig (llms.txt/llms-full.txt, @graph-Schemas, FAQPage, Wikidata, AI-Bots erhalten volles SSR-HTML). **Engpass ist Off-Site**: Für Kernqueries («KI-Strategie Beratung NPO Schweiz Verwaltungsrat») erscheinen Wettbewerber, Rautaki nicht.

Konventionen: Checkbox abhaken im selben PR, der das Item abschliesst; Status-Zeile mit Datum + PR-Link ergänzen.

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

Wichtigster inhaltlicher Hebel: AI-Engines bevorzugen datierbare, attribuierbare Quellen. Article-Schema mit `datePublished`/`dateModified`, `author` → Person-Node.

- [x] Sektion `/wissen` (+ `/en/wissen`) mit BlogPosting-Schema, Markdown-Loader, Navigation (PR #78, 2026-07-11)
- [x] RSS-Feed `/feed.xml` mit Site-weiter Autodiscovery (PR #78)
- [x] Artikel «EU AI Act: Was gilt für Schweizer NPOs?» de+en live, Indexierung angefragt (PR #78, 2026-07-11; Zeitplan auf Stand Digital Omnibus)
- [x] Artikel «KI-Strategie im Verwaltungsrat: die entscheidenden Fragen» de+en live, Indexierung angefragt (PR #81, 2026-07-11; Art. 716a OR, sieben Fragen, swissVR II/2024)
- [ ] Artikel Methodologie-Seite: das 9-Schritte/2-Gates-Programm als benannte Methode (eigene Entität für Attribution)
- [ ] Artikel «KI-Reifegrad in Schweizer NPOs» — Desk-Research-Synthese (Quellenreport liegt vor: `docs/research/ki-reifegrad-quellen.md`; Kernbefund: keine publizierte CH-NPO-Studie → Forschungslücken-Framing); später ablösbar durch eigene Erhebung
- Pflege-Hinweis: llms.txt «## Wissen» ist handgepflegt — bei jedem neuen Artikel ergänzen (llms-full/Sitemap/Feed generieren sich automatisch)

## P3 — Externe Erwähnungen (Off-Site-Autorität)

Retrieval-Engines finden nur, was Dritte erwähnen. Jede unabhängige Seite «Rautaki = Schweizer KI-Strategieberatung für NPOs» zählt.

- [ ] Brancheneinträge: local.ch / search.ch (Kilchberg, Beratung)
- [ ] Dozentenprofil mit Backlink auf ikf-Kursseiten anfragen
- [ ] Dozentenprofil mit Backlink beim VMI (Uni Fribourg) anfragen
- [ ] NPO-Fachmedien: Gastbeitrag/Interview (StiftungSchweiz, Fundraiso, …)
- [ ] Podcast-Auftritte im NPO-/KI-Umfeld
- [ ] LinkedIn-Kadenz mit Links auf kanonische Seiten beibehalten

## P4 — Wikidata-Anreicherung (Q140457396)

**Abgeschlossen 2026-07-11.**

- [x] Default-Label (`mul`, gilt für alle Sprachen) + `en`-Beschreibung ergänzt
- [x] P112 (Gründer) — Item für Harry Witzthum angelegt: **Q140500710** (human, management consultant + lecturer, ResearchGate-/LinkedIn-ID)
- [x] P571 (Gründungsdatum): Februar 2026
- [x] P1454 (Rechtsform): Einzelunternehmen (Schweiz)
- [x] Referenzen an allen Claims (UID-Register-URL; Industry via Impressum)
- Notiz: Google Knowledge Graph kgmid `/g/11zcsjwpcl`

## P5 — Google-Business-Profile-URL

**Geschlossen 2026-07-11 mit Befund:** Das GBP ist ein Service-Area-Profil mit verborgener Adresse — Google stellt dafür **keine öffentliche Maps-Place-Seite** bereit (`maps.google.com/?cid=824068227341883080` rendert leer). Der bestehende `share.google`-Link (→ Knowledge Panel) ist die beste stabile URL und bleibt in `src/lib/authority.ts`. Einzige Alternative wäre, die Adresse im GBP öffentlich zu machen (nicht empfohlen für eine Privatadresse).

## P6 — Aufgeschoben aus P1

- [ ] Lab-Tools (3 statische HTML-Apps) auf Englisch — inkl. generierter Word/PDF-Dokumente
- [ ] n8n-Chatbot: englische Antworten (System-Prompt im n8n-Workflow, ausserhalb dieses Repos)

## P7 — GEO-Messung

**Implementiert 2026-07-11.**

- [x] AI-Referrer- und AI-Crawler-Tracking: monatliche Aggregat-Counter in Upstash, geschrieben im Proxy (`src/lib/geo-track.ts`), Read-back via `/api/geo-stats` (PR #74; kein PII, kein Cookie)
- [x] Monatliche Prompt-Probes: n8n-Workflow «Rautaki GEO-Probe (monatlich)» (ID `9VGsWbFuKGQYU4uV`) — 10 Fragen (5 DE/5 EN) an OpenAI, Perplexity, Gemini und Claude mit Web-Suche; Auswertung Erwähnung/Zitierung; Historie in Data Table `geo_probes`; Digest-Mail an hello@rautaki.ch inkl. Website-Signalen. Testlauf 2026-07-11 erfolgreich (Baseline: OpenAI 2/10 erwähnt+zitiert, Perplexity 0/10, Claude 0/10)
- [x] Search Console AI-Overview-Impressionen: als manuelle Prüf-Zeile im monatlichen Digest verankert
- [x] Gemini-API-Key in n8n-Credential «Google Gemini(PaLM) Api account» erneuert (2026-07-11); Verifikationslauf: alle vier Engines antworten (Testzeilen unter Monat `2026-07-verify` in `geo_probes`)
- [x] Workflow in n8n aktiviert (2026-07-11) — erster geplanter Lauf: 1. August 2026, 07:00

**P7 vollständig abgeschlossen am 2026-07-11.**

---

## Erledigt

- [x] 2026-07-10 — Code-Level-Fixes aus dem Benchmark (PR #64): Authority-Links zentralisiert (`src/lib/authority.ts`), Lab-HTML-Schemas an /lab-Entities angeglichen, Booklet als `DigitalDocument` mit `datePublished`, CAS-Lehrgänge als `Course`-Entities
