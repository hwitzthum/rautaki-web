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

- [ ] Sektion `/insights` (oder `/wissen`) mit Article-Schema aufsetzen
- [ ] Artikel 1 — Original-Daten: z.B. «KI-Reifegrad in Schweizer NPOs» (eigene Erhebung/Benchmark — stärkster Zitiergrund)
- [ ] Artikel 2 — Methodologie-Seite: das 9-Schritte/2-Gates-Programm als benannte Methode (eigene Entität für Attribution)
- [ ] Artikel 3 — Praxis-Guide: «EU AI Act: Was gilt für Schweizer NPOs?»
- [ ] Artikel 4 — Praxis-Guide: «KI-Strategie im Verwaltungsrat: die entscheidenden Fragen»
- [ ] RSS/Atom-Feed, sobald Artikel existieren

## P3 — Externe Erwähnungen (Off-Site-Autorität)

Retrieval-Engines finden nur, was Dritte erwähnen. Jede unabhängige Seite «Rautaki = Schweizer KI-Strategieberatung für NPOs» zählt.

- [ ] Brancheneinträge: local.ch / search.ch (Kilchberg, Beratung)
- [ ] Dozentenprofil mit Backlink auf ikf-Kursseiten anfragen
- [ ] Dozentenprofil mit Backlink beim VMI (Uni Fribourg) anfragen
- [ ] NPO-Fachmedien: Gastbeitrag/Interview (StiftungSchweiz, Fundraiso, …)
- [ ] Podcast-Auftritte im NPO-/KI-Umfeld
- [ ] LinkedIn-Kadenz mit Links auf kanonische Seiten beibehalten

## P4 — Wikidata-Anreicherung (Q140457396)

- [ ] Plain-`en`-Label + -Beschreibung ergänzen (aktuell nur `de` und `en-GB`)
- [ ] P112 (Gründer) — ggf. Item für Harry Witzthum anlegen
- [ ] P571 (Gründungsdatum)
- [ ] P1454 (Rechtsform: Einzelunternehmen)
- [ ] Belege/Referenzen an bestehende Claims (UID-Register-URL)
- Notiz: Google Knowledge Graph kgmid `/g/11zcsjwpcl`

## P5 — Google-Business-Profile-URL

- [ ] `share.google/…`-Shortlink in `src/lib/authority.ts` durch kanonische Maps-Place-URL ersetzen (URL aus GBP-Dashboard holen — Nutzer-Aktion, dann Ein-Zeilen-Änderung)

## P6 — Aufgeschoben aus P1

- [ ] Lab-Tools (3 statische HTML-Apps) auf Englisch — inkl. generierter Word/PDF-Dokumente
- [ ] n8n-Chatbot: englische Antworten (System-Prompt im n8n-Workflow, ausserhalb dieses Repos)

## P7 — GEO-Messung

- [ ] AI-Referrer-Tracking (chatgpt.com, perplexity.ai, …) in Analytics/Vercel
- [ ] Search Console: AI-Overview-Impressionen beobachten
- [ ] Monatliche Prompt-Probes: Top-10-Käuferfragen an ChatGPT/Perplexity/Claude, Zitate loggen (Skript oder n8n-Workflow)

---

## Erledigt

- [x] 2026-07-10 — Code-Level-Fixes aus dem Benchmark (PR #64): Authority-Links zentralisiert (`src/lib/authority.ts`), Lab-HTML-Schemas an /lab-Entities angeglichen, Booklet als `DigitalDocument` mit `datePublished`, CAS-Lehrgänge als `Course`-Entities
