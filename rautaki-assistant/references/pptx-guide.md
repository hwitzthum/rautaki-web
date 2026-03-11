# Rautaki PPTX Slide Specification

Reference for creating branded PowerPoint presentations. All slides use 16:9 format (10" x 5.625").

## Constants

```javascript
const C = {
  gold: "F5A623", goldLight: "FFD07A", obsidian: "0A0A0A",
  ink: "1C1C1C", cream: "F4F2EE", white: "FAFAFA",
  warmGrey: "E8E5DF", midGrey: "9A9590", charcoal: "111111"
};
const FONT_SERIF = "Georgia";
const FONT_UI = "Calibri";  // DM Sans fallback
const ML = 0.8;  // left margin (inches)
const MR = 0.8;  // right margin
const MT = 0.7;  // top margin
const CW = 10 - ML - MR;  // content width = 8.4"
```

## Shared Elements

### Section Label
Gold dash prefix + spaced uppercase text:
```javascript
slide.addText([
  { text: "——  ", options: { color: C.gold, fontSize: 8 } },
  { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });
```

### Logo Wordmark
"Rautaki" with gold 'a' (pos 5) and 'i' (pos 7):
```javascript
function addLogo(slide, x, y, size, baseColor) {
  const letters = [
    { text: "R", color: baseColor }, { text: "a", color: baseColor },
    { text: "u", color: baseColor }, { text: "t", color: baseColor },
    { text: "a", color: C.gold },   { text: "k", color: baseColor },
    { text: "i", color: C.gold },
  ];
  const textParts = letters.map(l => ({
    text: l.text,
    options: { fontFace: FONT_SERIF, fontSize: size, color: l.color, bold: false }
  }));
  slide.addText(textParts, { x, y, w: size * 0.09 * 7, h: size * 0.022, margin: 0 });
}
```

### Tagline
```javascript
function addTagline(slide, x, y, color) {
  slide.addText("STRATEGY  ·  ADVISORY  ·  GROWTH", {
    x, y, w: 3.5, h: 0.3,
    fontFace: FONT_UI, fontSize: 8, color: color || C.midGrey,
    charSpacing: 3, margin: 0,
  });
}
```

### Footer
Every slide gets a footer — gold rule line + "rautaki.ch" right-aligned:
```javascript
// Light variant
function addFooterLight(slide) {
  slide.addShape("line", {
    x: ML, y: 5.625 - 0.45, w: CW, h: 0,
    line: { color: C.gold, width: 1.5, transparency: 60 },
  });
  slide.addText("rautaki.ch", {
    x: ML, y: 5.625 - 0.4, w: CW, h: 0.3,
    fontFace: FONT_UI, fontSize: 7, color: C.midGrey,
    charSpacing: 2, align: "right", margin: 0,
  });
}
// Dark variant: same but transparency: 70
```

### Gold Accent Bar
Vertical accent for columns and stats:
```javascript
function addGoldAccent(slide, x, y, h) {
  slide.addShape("rect", { x, y, w: 0.04, h, fill: { color: C.gold } });
}
```

## Slide Types

### 1. Title Slide (Titelfolie)
- Logo at y=1.2, size=36
- Tagline at y=1.7
- Title: Georgia 36pt at y=2.3
- Gold line: 1.5" wide at y=3.3
- Subtitle: Calibri 11pt, mid-grey at y=3.55
- Date/Author: Calibri 10pt at y=3.95
- Dark variant: 'R' watermark (350pt, 97% transparent) top-right
- Light variant: gold rule at top of slide

### 2. Section Divider (Abschnittstrenner)
- Section number: Georgia 64pt, gold, at y=1.2
- Gold line at y=2.3
- Section title: Georgia 36pt at y=2.55
- Subtitle: Calibri 13pt, mid-grey at y=3.55

### 3. Bullet List (Aufzählungsliste)
- Section label + title at top
- 5 bullet points, Calibri 14pt
- Gold bullet markers: `bullet: { color: C.gold }`
- paraSpaceAfter: 10

### 4. Two-Column Text (Zwei-Spalten)
- Two equal columns with 0.5" gap
- Each column: gold accent bar on left + title (Georgia 18pt) + body (Calibri 12pt)
- Column width: `(CW - 0.5) / 2`

### 5. Text + Image
- Text left (4.2" wide), image placeholder right (3.7" × 4.1")
- Image placeholder: colored rect + "[Bild einfügen]" text centered

### 6. Image + Text
- Mirror of Text + Image: image left, text right starting at x=5.2

### 7. Fullscreen Overlay (Vollbild)
- Full-slide image placeholder
- Semi-transparent overlay on left side (5.5" wide)
- Title and supporting text over the overlay

### 8. Statistics (Kennzahlen)
- Three stat blocks in a row
- Each: gold accent bar + large number (Georgia 48pt) + uppercase label (Calibri 9pt)
- Width per stat: 2.5", evenly distributed across CW

### 9. Quote / Testimonial (Zitat)
- Large decorative opening quote mark: Georgia 120pt, gold, 30-40% transparent
- Quote: Georgia 24pt, italic
- Gold divider line below quote
- Attribution: name (Calibri 12pt) + title (Calibri 10pt, mid-grey)

### 10. Closing Slide (Abschlussfolie)
- Same layout as title slide but with "Vielen Dank." as title
- Contact info line: "[Name] · [E-Mail] · rautaki.ch"
- Dark variant gets 'R' watermark

## Responsive Patterns
When adapting for content density:
- Tight content: reduce margins to 0.6"
- Extra content: use smaller body text (11pt instead of 14pt)
- Never reduce heading sizes below H3 (26pt equivalent → 20pt in PPTX)