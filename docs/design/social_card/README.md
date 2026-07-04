# Rautaki — LinkedIn Social Card

`rautaki-linkedin-card.html` — a self-contained template for producing on-brand
LinkedIn post images (**1080 × 1080**) in the Rautaki style, in three variants.

## Verwendung

1. Datei im Browser öffnen (Doppelklick auf `rautaki-linkedin-card.html`).
2. **Variante** wählen — `Dark`, `Gold` oder `Outline` (siehe unten).
3. Felder ausfüllen:
   - **Label / Rubrik** — kurze Kategorie oben links, z. B. `KI-GOVERNANCE`.
   - **Zitat / Kernaussage** — die Aussage in der Mitte. Passt sich automatisch
     an (Schriftgrösse + Umbruch) — kurze Zitate werden gross, lange kleiner.
   - **Website** — unten rechts, Standard `rautaki.ch`.
4. **PNG herunterladen** klicken → fertige `1080 × 1080`-Grafik zum Posten
   (Dateiname enthält die Variante).

## Varianten

- **Dark** — Obsidian-Hintergrund, weisses Zitat, gold-kursive Hervorhebung,
  Ghost-„R". Der autoritative Standard-Look (wie das Referenzbeispiel).
- **Gold** — Gold-Hintergrund. Hervorhebung wird zu vollem Ink, der übrige
  Text ist gedämpftes Ink (dieselbe Umkehrung wie das Logo auf Gold). Sparsam
  einsetzen (Gold-Regel).
- **Outline** — Cream-Hintergrund mit Ink-Rahmen, gold-kursive Hervorhebung,
  kein Ghost-„R". Zurückhaltend, editorial.

Die Vorschau **ist** der Export (`<canvas>`), das Bild entspricht also exakt der Anzeige.

## Gold-Hervorhebung

Gewünschte Wörter im Zitat in `*Sternchen*` setzen — sie werden hervorgehoben
(gold bei Dark/Outline, volles Ink bei Gold). Beispiel:

```
«Aus Daten-Souveränität wird *Modell-Souveränität»*
```

Schweizer Anführungszeichen `« »` nach Bedarf direkt eintippen.

## Design-Bezug

Folgt `docs/design/component-specs.md` §10 (Social Cards):

- Hintergrund Obsidian `#0A0A0A`, Zitat in Georgia _italic_, Gold `#F5A623`.
- Logo unten links (Buchstaben **a** und **i** in Gold), Ghost-„R"-Wasserzeichen.
- Section-Label mit gold-/heller Linie oben links.

DM Sans ist als Base64 eingebettet — die Datei ist vollständig offline und der
Export sieht auf jedem Rechner identisch aus. Georgia ist eine System-Schrift.
