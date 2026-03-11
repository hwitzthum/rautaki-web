#!/usr/bin/env node
/**
 * Rautaki PowerPoint Template Generator
 * Generates a branded PPTX template following the Rautaki design system.
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

// ── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  gold:       "F5A623",
  goldLight:  "FFD07A",
  goldDim:    "F5A623", // will use transparency
  obsidian:   "0A0A0A",
  ink:        "1C1C1C",
  cream:      "F4F2EE",
  white:      "FAFAFA",
  warmGrey:   "E8E5DF",
  midGrey:    "9A9590",
  charcoal:   "111111",
};

const FONT_SERIF = "Georgia";
const FONT_UI    = "Calibri"; // DM Sans fallback for PPTX (not embeddable)

// Slide dimensions (16:9)
const SW = 10;    // width in inches
const SH = 5.625; // height in inches

// Margins
const ML = 0.8;   // left margin
const MR = 0.8;   // right margin
const MT = 0.7;   // top margin
const CW = SW - ML - MR; // content width

// ── Helper: Logo wordmark ──────────────────────────────────────────────────
function addLogo(slide, x, y, size, baseColor) {
  // "Rautaki" with gold 'a' (pos 5) and 'i' (pos 7)
  const letters = [
    { text: "R",  color: baseColor },
    { text: "a",  color: baseColor },
    { text: "u",  color: baseColor },
    { text: "t",  color: baseColor },
    { text: "a",  color: C.gold },
    { text: "k",  color: baseColor },
    { text: "i",  color: C.gold },
  ];
  const textParts = letters.map(l => ({
    text: l.text,
    options: { fontFace: FONT_SERIF, fontSize: size, color: l.color, bold: false }
  }));
  slide.addText(textParts, { x, y, w: size * 0.09 * 7, h: size * 0.022, margin: 0 });
}

// ── Helper: Tagline ────────────────────────────────────────────────────────
function addTagline(slide, x, y, color) {
  slide.addText("STRATEGY  ·  ADVISORY  ·  GROWTH", {
    x, y, w: 3.5, h: 0.3,
    fontFace: FONT_UI, fontSize: 8, color: color || C.midGrey,
    charSpacing: 3, margin: 0,
  });
}

// ── Helper: Footer bar ─────────────────────────────────────────────────────
function addFooterLight(slide) {
  // Gold rule line
  slide.addShape("line", {
    x: ML, y: SH - 0.45, w: CW, h: 0,
    line: { color: C.gold, width: 1.5, transparency: 60 },
  });
  slide.addText("rautaki.ch", {
    x: ML, y: SH - 0.4, w: CW, h: 0.3,
    fontFace: FONT_UI, fontSize: 7, color: C.midGrey,
    charSpacing: 2, align: "right", margin: 0,
  });
}

function addFooterDark(slide) {
  slide.addShape("line", {
    x: ML, y: SH - 0.45, w: CW, h: 0,
    line: { color: C.gold, width: 1.5, transparency: 70 },
  });
  slide.addText("rautaki.ch", {
    x: ML, y: SH - 0.4, w: CW, h: 0.3,
    fontFace: FONT_UI, fontSize: 7, color: C.midGrey,
    charSpacing: 2, align: "right", margin: 0,
  });
}

// ── Helper: Gold left accent bar ───────────────────────────────────────────
function addGoldAccent(slide, x, y, h) {
  slide.addShape("rect", {
    x, y, w: 0.04, h,
    fill: { color: C.gold },
  });
}

// ── Helper: Placeholder rectangle (image placeholder) ──────────────────────
function addImagePlaceholder(slide, x, y, w, h, bgColor) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: bgColor || C.warmGrey },
  });
  slide.addText("[Bild einfügen]", {
    x, y, w, h,
    fontFace: FONT_UI, fontSize: 11, color: C.midGrey,
    align: "center", valign: "middle", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
//  BUILD PRESENTATION
// ══════════════════════════════════════════════════════════════════════════════

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Rautaki";
pres.title  = "Rautaki Präsentationsvorlage";


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 1 — TITELFOLIE (DUNKEL)
//  Spacing matches slide 15 (Abschlussfolie): logo y=1.2 size=36, tagline y=1.7
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Decorative large 'R' watermark
  slide.addText("R", {
    x: 5.5, y: -0.5, w: 5, h: 6.5,
    fontFace: FONT_SERIF, fontSize: 350, color: C.white,
    transparency: 97, margin: 0, valign: "middle", align: "center",
  });

  // Logo — same position/size as closing slide 15
  addLogo(slide, ML, 1.2, 36, C.white);
  addTagline(slide, ML, 1.7, C.midGrey);

  // Title
  slide.addText("[Präsentationstitel]", {
    x: ML, y: 2.3, w: 7, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 36, color: C.white,
    margin: 0, valign: "top",
  });

  // Gold line — same as closing slide
  slide.addShape("line", {
    x: ML, y: 3.3, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Subtitle + Date
  slide.addText("[Untertitel oder kurze Beschreibung]", {
    x: ML, y: 3.55, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 11, color: C.midGrey,
    margin: 0,
  });

  slide.addText("[Datum]  ·  [Autor/in]", {
    x: ML, y: 3.95, w: 5, h: 0.35,
    fontFace: FONT_UI, fontSize: 10, color: C.midGrey,
    charSpacing: 1.5, margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 2 — TITELFOLIE (HELL)
//  Spacing matches slide 16 (Abschlussfolie hell): logo y=1.2 size=36, tagline y=1.7
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Gold rule at top
  slide.addShape("line", {
    x: 0, y: 0.08, w: SW, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // Logo — same position/size as closing slide 16
  addLogo(slide, ML, 1.2, 36, C.ink);
  addTagline(slide, ML, 1.7, C.midGrey);

  // Title
  slide.addText("[Präsentationstitel]", {
    x: ML, y: 2.3, w: 7, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 36, color: C.ink,
    margin: 0, valign: "top",
  });

  // Gold line — same as closing slide
  slide.addShape("line", {
    x: ML, y: 3.3, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Subtitle + Date
  slide.addText("[Untertitel oder kurze Beschreibung]", {
    x: ML, y: 3.55, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 11, color: C.midGrey,
    margin: 0,
  });

  slide.addText("[Datum]  ·  [Autor/in]", {
    x: ML, y: 3.95, w: 5, h: 0.35,
    fontFace: FONT_UI, fontSize: 10, color: C.midGrey,
    charSpacing: 1.5, margin: 0,
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 3 — ABSCHNITTSTRENNER (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Section number
  slide.addText("01", {
    x: ML, y: 1.2, w: 2, h: 1,
    fontFace: FONT_SERIF, fontSize: 64, color: C.gold,
    margin: 0,
  });

  // Gold accent line
  slide.addShape("line", {
    x: ML, y: 2.3, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Section title
  slide.addText("[Abschnittstitel]", {
    x: ML, y: 2.55, w: 7, h: 1,
    fontFace: FONT_SERIF, fontSize: 36, color: C.white,
    margin: 0,
  });

  // Section subtitle
  slide.addText("[Kurze Beschreibung des Abschnitts]", {
    x: ML, y: 3.55, w: 6, h: 0.5,
    fontFace: FONT_UI, fontSize: 13, color: C.midGrey,
    margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 4 — ABSCHNITTSTRENNER (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section number
  slide.addText("01", {
    x: ML, y: 1.2, w: 2, h: 1,
    fontFace: FONT_SERIF, fontSize: 64, color: C.gold,
    margin: 0,
  });

  // Gold accent line
  slide.addShape("line", {
    x: ML, y: 2.3, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Section title
  slide.addText("[Abschnittstitel]", {
    x: ML, y: 2.55, w: 7, h: 1,
    fontFace: FONT_SERIF, fontSize: 36, color: C.ink,
    margin: 0,
  });

  // Section subtitle
  slide.addText("[Kurze Beschreibung des Abschnitts]", {
    x: ML, y: 3.55, w: 6, h: 0.5,
    fontFace: FONT_UI, fontSize: 13, color: C.midGrey,
    margin: 0,
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 5 — AUFZÄHLUNGSLISTE (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Bullet list
  slide.addText([
    { text: "Erster Aufzählungspunkt mit wichtiger Information",   options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Zweiter Aufzählungspunkt mit Details",                options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Dritter Aufzählungspunkt mit Erklärung",              options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Vierter Aufzählungspunkt als Ergänzung",              options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Fünfter Aufzählungspunkt zum Abschluss",              options: { bullet: true, color: C.ink } },
  ], {
    x: ML, y: 1.7, w: CW - 0.5, h: 3,
    fontFace: FONT_UI, fontSize: 14, color: C.ink,
    paraSpaceAfter: 10, margin: 0, valign: "top",
    bullet: { color: C.gold },
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 6 — AUFZÄHLUNGSLISTE (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.white,
    margin: 0,
  });

  // Bullet list
  slide.addText([
    { text: "Erster Aufzählungspunkt mit wichtiger Information",   options: { bullet: true, breakLine: true, color: C.white } },
    { text: "Zweiter Aufzählungspunkt mit Details",                options: { bullet: true, breakLine: true, color: C.white } },
    { text: "Dritter Aufzählungspunkt mit Erklärung",              options: { bullet: true, breakLine: true, color: C.white } },
    { text: "Vierter Aufzählungspunkt als Ergänzung",              options: { bullet: true, breakLine: true, color: C.white } },
    { text: "Fünfter Aufzählungspunkt zum Abschluss",              options: { bullet: true, color: C.white } },
  ], {
    x: ML, y: 1.7, w: CW - 0.5, h: 3,
    fontFace: FONT_UI, fontSize: 14, color: C.white,
    paraSpaceAfter: 10, margin: 0, valign: "top",
    bullet: { color: C.gold },
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 7 — ZWEI-SPALTEN TEXT (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  const colW = (CW - 0.5) / 2;
  const colY = 1.75;

  // Left column
  addGoldAccent(slide, ML, colY, 2.8);
  slide.addText("[Linke Spalte Titel]", {
    x: ML + 0.2, y: colY, w: colW, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 18, color: C.ink, margin: 0,
  });
  slide.addText("[Hier steht der Inhalt der linken Spalte. Ersetzen Sie diesen Platzhaltertext durch Ihren eigenen Inhalt.]", {
    x: ML + 0.2, y: colY + 0.5, w: colW, h: 2.3,
    fontFace: FONT_UI, fontSize: 12, color: C.ink, margin: 0, valign: "top",
  });

  // Right column
  const col2X = ML + colW + 0.5;
  addGoldAccent(slide, col2X, colY, 2.8);
  slide.addText("[Rechte Spalte Titel]", {
    x: col2X + 0.2, y: colY, w: colW, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 18, color: C.ink, margin: 0,
  });
  slide.addText("[Hier steht der Inhalt der rechten Spalte. Ersetzen Sie diesen Platzhaltertext durch Ihren eigenen Inhalt.]", {
    x: col2X + 0.2, y: colY + 0.5, w: colW, h: 2.3,
    fontFace: FONT_UI, fontSize: 12, color: C.ink, margin: 0, valign: "top",
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 7b — ZWEI-SPALTEN TEXT (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.white,
    margin: 0,
  });

  const colW = (CW - 0.5) / 2;
  const colY = 1.75;

  // Left column
  addGoldAccent(slide, ML, colY, 2.8);
  slide.addText("[Linke Spalte Titel]", {
    x: ML + 0.2, y: colY, w: colW, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 18, color: C.white, margin: 0,
  });
  slide.addText("[Hier steht der Inhalt der linken Spalte. Ersetzen Sie diesen Platzhaltertext durch Ihren eigenen Inhalt.]", {
    x: ML + 0.2, y: colY + 0.5, w: colW, h: 2.3,
    fontFace: FONT_UI, fontSize: 12, color: C.white, margin: 0, valign: "top",
  });

  // Right column
  const col2X = ML + colW + 0.5;
  addGoldAccent(slide, col2X, colY, 2.8);
  slide.addText("[Rechte Spalte Titel]", {
    x: col2X + 0.2, y: colY, w: colW, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 18, color: C.white, margin: 0,
  });
  slide.addText("[Hier steht der Inhalt der rechten Spalte. Ersetzen Sie diesen Platzhaltertext durch Ihren eigenen Inhalt.]", {
    x: col2X + 0.2, y: colY + 0.5, w: colW, h: 2.3,
    fontFace: FONT_UI, fontSize: 12, color: C.white, margin: 0, valign: "top",
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 8 — TEXT + BILD (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: 5, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Text content left
  slide.addText("[Hier steht Ihr Textinhalt. Beschreiben Sie den Kontext, die Kernaussage oder die wichtigsten Punkte, die zum Bild rechts gehören.]", {
    x: ML, y: 1.75, w: 4.2, h: 2.8,
    fontFace: FONT_UI, fontSize: 13, color: C.ink,
    margin: 0, valign: "top",
  });

  // Image placeholder right
  addImagePlaceholder(slide, 5.5, MT, 3.7, 4.1, C.warmGrey);

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 9 — TEXT + BILD (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: 5, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.white,
    margin: 0,
  });

  // Text content left
  slide.addText("[Hier steht Ihr Textinhalt. Beschreiben Sie den Kontext, die Kernaussage oder die wichtigsten Punkte, die zum Bild rechts gehören.]", {
    x: ML, y: 1.75, w: 4.2, h: 2.8,
    fontFace: FONT_UI, fontSize: 13, color: C.white,
    margin: 0, valign: "top",
  });

  // Image placeholder right
  addImagePlaceholder(slide, 5.5, MT, 3.7, 4.1, C.charcoal);

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 10 — BILD + TEXT (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Image placeholder left
  addImagePlaceholder(slide, ML, MT, 3.7, 4.1, C.warmGrey);

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: 5.2, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: 5.2, y: MT + 0.35, w: 4, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Text content right
  slide.addText("[Hier steht Ihr Textinhalt. Beschreiben Sie den Kontext, die Kernaussage oder die wichtigsten Punkte, die zum Bild links gehören.]", {
    x: 5.2, y: 1.75, w: 4, h: 2.8,
    fontFace: FONT_UI, fontSize: 13, color: C.ink,
    margin: 0, valign: "top",
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 11 — BILD + TEXT (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Image placeholder left
  addImagePlaceholder(slide, ML, MT, 3.7, 4.1, C.charcoal);

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ABSCHNITT", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: 5.2, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: 5.2, y: MT + 0.35, w: 4, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.white,
    margin: 0,
  });

  // Text content right
  slide.addText("[Hier steht Ihr Textinhalt. Beschreiben Sie den Kontext, die Kernaussage oder die wichtigsten Punkte, die zum Bild links gehören.]", {
    x: 5.2, y: 1.75, w: 4, h: 2.8,
    fontFace: FONT_UI, fontSize: 13, color: C.white,
    margin: 0, valign: "top",
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 10 — VOLLBILD (DUNKEL MIT OVERLAY)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Simulated image area (full slide)
  slide.addShape("rect", {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.charcoal },
  });

  // Dark overlay gradient (left side)
  slide.addShape("rect", {
    x: 0, y: 0, w: 5.5, h: SH,
    fill: { color: C.obsidian, transparency: 20 },
  });

  // Instruction text
  slide.addText("[Hintergrundbild einfügen — Rechtsklick → Hintergrund formatieren]", {
    x: 0, y: 0, w: SW, h: 0.4,
    fontFace: FONT_UI, fontSize: 8, color: C.midGrey,
    align: "center", margin: 0,
  });

  // Title on overlay
  slide.addText("[Aussagekräftiger Titel]", {
    x: ML, y: 1.5, w: 5, h: 1.2,
    fontFace: FONT_SERIF, fontSize: 36, color: C.white,
    margin: 0,
  });

  // Supporting text
  slide.addText("[Kurzer begleitender Text zur Untermauerung der visuellen Aussage.]", {
    x: ML, y: 2.8, w: 4.5, h: 0.8,
    fontFace: FONT_UI, fontSize: 13, color: C.white,
    transparency: 50, margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 10b — VOLLBILD (HELL MIT OVERLAY)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Simulated image area (full slide)
  slide.addShape("rect", {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.warmGrey },
  });

  // Light overlay (left side)
  slide.addShape("rect", {
    x: 0, y: 0, w: 5.5, h: SH,
    fill: { color: C.cream, transparency: 15 },
  });

  // Instruction text
  slide.addText("[Hintergrundbild einfügen — Rechtsklick → Hintergrund formatieren]", {
    x: 0, y: 0, w: SW, h: 0.4,
    fontFace: FONT_UI, fontSize: 8, color: C.midGrey,
    align: "center", margin: 0,
  });

  // Title on overlay
  slide.addText("[Aussagekräftiger Titel]", {
    x: ML, y: 1.5, w: 5, h: 1.2,
    fontFace: FONT_SERIF, fontSize: 36, color: C.ink,
    margin: 0,
  });

  // Supporting text
  slide.addText("[Kurzer begleitender Text zur Untermauerung der visuellen Aussage.]", {
    x: ML, y: 2.8, w: 4.5, h: 0.8,
    fontFace: FONT_UI, fontSize: 13, color: C.ink,
    transparency: 40, margin: 0,
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 11 — KENNZAHLEN / STATISTIKEN (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "KENNZAHLEN", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Three stat blocks
  const stats = [
    { num: "150+", label: "PROJEKTE ABGESCHLOSSEN" },
    { num: "98%",  label: "KUNDENZUFRIEDENHEIT" },
    { num: "12×",  label: "DURCHSCHNITTLICHER ROI" },
  ];

  const statW = 2.5;
  const gap = (CW - statW * 3) / 2;

  stats.forEach((s, i) => {
    const sx = ML + i * (statW + gap);
    const sy = 2.0;

    // Gold left accent
    addGoldAccent(slide, sx, sy, 2.2);

    // Big number
    slide.addText(s.num, {
      x: sx + 0.25, y: sy, w: statW - 0.3, h: 1.2,
      fontFace: FONT_SERIF, fontSize: 48, color: C.ink,
      margin: 0, valign: "middle",
    });

    // Label
    slide.addText(s.label, {
      x: sx + 0.25, y: sy + 1.3, w: statW - 0.3, h: 0.5,
      fontFace: FONT_UI, fontSize: 9, color: C.midGrey,
      charSpacing: 2.5, margin: 0,
    });
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 12 — KENNZAHLEN (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "KENNZAHLEN", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("[Folientitel]", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.white,
    margin: 0,
  });

  const stats = [
    { num: "150+", label: "PROJEKTE ABGESCHLOSSEN" },
    { num: "98%",  label: "KUNDENZUFRIEDENHEIT" },
    { num: "12×",  label: "DURCHSCHNITTLICHER ROI" },
  ];

  const statW = 2.5;
  const gap = (CW - statW * 3) / 2;

  stats.forEach((s, i) => {
    const sx = ML + i * (statW + gap);
    const sy = 2.0;

    addGoldAccent(slide, sx, sy, 2.2);

    slide.addText(s.num, {
      x: sx + 0.25, y: sy, w: statW - 0.3, h: 1.2,
      fontFace: FONT_SERIF, fontSize: 48, color: C.white,
      margin: 0, valign: "middle",
    });

    slide.addText(s.label, {
      x: sx + 0.25, y: sy + 1.3, w: statW - 0.3, h: 0.5,
      fontFace: FONT_UI, fontSize: 9, color: C.midGrey,
      charSpacing: 2.5, margin: 0,
    });
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 13 — ZITAT / TESTIMONIAL (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Large decorative quote mark
  slide.addText("\u201C", {
    x: ML - 0.2, y: 0.6, w: 1.5, h: 1.5,
    fontFace: FONT_SERIF, fontSize: 120, color: C.gold,
    transparency: 30, margin: 0,
  });

  // Quote text
  slide.addText("[Hier steht ein aussagekräftiges Zitat, das die Kernbotschaft der Präsentation unterstreicht und den Zuhörer inspiriert.]", {
    x: ML + 0.3, y: 1.5, w: CW - 1, h: 2,
    fontFace: FONT_SERIF, fontSize: 24, color: C.white,
    italic: true, margin: 0, valign: "top",
  });

  // Gold line divider
  slide.addShape("line", {
    x: ML + 0.3, y: 3.65, w: 1.2, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Attribution
  slide.addText("[Name der Person]", {
    x: ML + 0.3, y: 3.85, w: 5, h: 0.35,
    fontFace: FONT_UI, fontSize: 12, color: C.white,
    margin: 0,
  });
  slide.addText("[Titel / Unternehmen]", {
    x: ML + 0.3, y: 4.15, w: 5, h: 0.3,
    fontFace: FONT_UI, fontSize: 10, color: C.midGrey,
    margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 14 — ZITAT / TESTIMONIAL (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Large decorative quote mark
  slide.addText("\u201C", {
    x: ML - 0.2, y: 0.6, w: 1.5, h: 1.5,
    fontFace: FONT_SERIF, fontSize: 120, color: C.gold,
    transparency: 40, margin: 0,
  });

  // Quote text
  slide.addText("[Hier steht ein aussagekräftiges Zitat, das die Kernbotschaft der Präsentation unterstreicht und den Zuhörer inspiriert.]", {
    x: ML + 0.3, y: 1.5, w: CW - 1, h: 2,
    fontFace: FONT_SERIF, fontSize: 24, color: C.ink,
    italic: true, margin: 0, valign: "top",
  });

  // Gold line divider
  slide.addShape("line", {
    x: ML + 0.3, y: 3.65, w: 1.2, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Attribution
  slide.addText("[Name der Person]", {
    x: ML + 0.3, y: 3.85, w: 5, h: 0.35,
    fontFace: FONT_UI, fontSize: 12, color: C.ink,
    margin: 0,
  });
  slide.addText("[Titel / Unternehmen]", {
    x: ML + 0.3, y: 4.15, w: 5, h: 0.3,
    fontFace: FONT_UI, fontSize: 10, color: C.midGrey,
    margin: 0,
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 15 — ABSCHLUSSFOLIE (DUNKEL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.obsidian };

  // Decorative large 'R' watermark
  slide.addText("R", {
    x: 5.5, y: -0.5, w: 5, h: 6.5,
    fontFace: FONT_SERIF, fontSize: 350, color: C.white,
    transparency: 97, margin: 0, valign: "middle", align: "center",
  });

  // Logo
  addLogo(slide, ML, 1.2, 36, C.white);
  addTagline(slide, ML, 1.7, C.midGrey);

  // Thank you
  slide.addText("Vielen Dank.", {
    x: ML, y: 2.3, w: 6, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 36, color: C.white,
    margin: 0,
  });

  // Gold line
  slide.addShape("line", {
    x: ML, y: 3.3, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Contact info
  slide.addText([
    { text: "[Name]  ·  [E-Mail]  ·  rautaki.ch", options: { color: C.midGrey } },
  ], {
    x: ML, y: 3.55, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 11, margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 16 — ABSCHLUSSFOLIE (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Gold rule at top
  slide.addShape("line", {
    x: 0, y: 0.08, w: SW, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // Logo
  addLogo(slide, ML, 1.2, 36, C.ink);
  addTagline(slide, ML, 1.7, C.midGrey);

  // Thank you
  slide.addText("Vielen Dank.", {
    x: ML, y: 2.3, w: 6, h: 0.9,
    fontFace: FONT_SERIF, fontSize: 36, color: C.ink,
    margin: 0,
  });

  // Gold line
  slide.addShape("line", {
    x: ML, y: 3.3, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Contact info
  slide.addText("[Name]  ·  [E-Mail]  ·  rautaki.ch", {
    x: ML, y: 3.55, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 11, color: C.midGrey, margin: 0,
  });

  addFooterLight(slide);
}


// ══════════════════════════════════════════════════════════════════════════════
//  WRITE FILE
// ══════════════════════════════════════════════════════════════════════════════

const outputPath = path.join(__dirname, "praesentation-vorlage.pptx");
pres.writeFile({ fileName: outputPath })
  .then(() => console.log(`✓ Created: ${outputPath}`))
  .catch(err => { console.error("Error:", err); process.exit(1); });