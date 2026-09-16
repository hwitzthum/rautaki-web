# Archiv: ehemalige Lab-Werkzeuge

Stand: 2026-09-16 · Hintergrund: `docs/apps-umbau-plan.md`, Phase 3

Diese zwei HTML-Werkzeuge liefen bis zum 2026-09-16 unter `www.rautaki.ch/lab/` hinter einer
E-Mail-Schranke. Mit dem Umbau «Lab» → «Apps» (apps.rautaki.ch) wurden sie offline genommen
und hierher verschoben, statt gelöscht. Der Ordner liegt ausserhalb von `public/` und `src/`
und wird weder ausgeliefert noch gebaut.

| Datei | Was |
|---|---|
| `ki-governance-policy.html` | KI-Governance-Richtlinie Generator: vier Formulare, zehn Abschnitte, Word-Export |
| `multi-assistant-gpt.html` | Anleitung «Multi-Assistant-System mit Custom GPTs»: Team-Router und zwei Spezialisten-GPTs, Word-Export |
| `vendor/html-docx.js` | Word-Export-Bibliothek (nur diese beiden Werkzeuge brauchten sie) |
| `vendor/fonts/` | DM Sans (Kopie; das Original bleibt unter `public/lab/vendor/fonts/` für den EU-AI-Act-Checker) |

Nicht archiviert: `public/lab/eu-ai-act-check.html` bleibt online (Entscheid des Auftraggebers,
der Artikel «EU AI Act für Schweizer NPOs» verlinkt darauf).

## Lokal öffnen

Die Dateien laufen direkt aus dem Dateisystem, ohne Server:

```
open archiv/lab/ki-governance-policy.html
open archiv/lab/multi-assistant-gpt.html
```

Einzige Änderung gegenüber der Live-Version: Die Pfade zu `vendor/` sind relativ statt
`/lab/vendor/`, damit Schriften und Word-Export auch per `file://` funktionieren. Alle übrigen
Links (`/lab`, `/booking`, canonical-URLs) zeigen unverändert auf die frühere Live-Adresse und
sind offline ohne Funktion.
