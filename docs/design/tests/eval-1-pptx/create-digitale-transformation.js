#!/usr/bin/env node
/**
 * Rautaki Präsentation: Digitale Transformation im Schweizer Mittelstand
 * Generated following the Rautaki design system.
 * Based on the canonical template generator (create-praesentation-vorlage.js).
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

// ── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  gold:       "F5A623",
  goldLight:  "FFD07A",
  goldDim:    "F5A623",
  obsidian:   "0A0A0A",
  ink:        "1C1C1C",
  cream:      "F4F2EE",
  white:      "FAFAFA",
  warmGrey:   "E8E5DF",
  midGrey:    "9A9590",
  charcoal:   "111111",
};

const FONT_SERIF = "Georgia";
const FONT_UI    = "Calibri";

// Slide dimensions (16:9)
const SW = 10;
const SH = 5.625;

// Margins
const ML = 0.8;
const MR = 0.8;
const MT = 0.7;
const CW = SW - ML - MR;

// ── Helper: Logo wordmark ──────────────────────────────────────────────────
function addLogo(slide, x, y, size, baseColor) {
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

// ── Helper: Image placeholder ──────────────────────────────────────────────
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
pres.title  = "Digitale Transformation im Schweizer Mittelstand";


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 1 — TITELFOLIE (DUNKEL)
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

  // Title
  slide.addText("Digitale Transformation\nim Schweizer Mittelstand", {
    x: ML, y: 2.2, w: 7, h: 1.0,
    fontFace: FONT_SERIF, fontSize: 34, color: C.white,
    margin: 0, valign: "top",
  });

  // Gold line
  slide.addShape("line", {
    x: ML, y: 3.35, w: 1.5, h: 0,
    line: { color: C.gold, width: 2 },
  });

  // Subtitle
  slide.addText("Chancen, Herausforderungen und strategische Handlungsfelder", {
    x: ML, y: 3.6, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 11, color: C.midGrey,
    margin: 0,
  });

  // Date + Author
  slide.addText("März 2026  ·  Rautaki GmbH", {
    x: ML, y: 4.0, w: 5, h: 0.35,
    fontFace: FONT_UI, fontSize: 10, color: C.midGrey,
    charSpacing: 1.5, margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 2 — AGENDA / ÜBERSICHT (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Gold rule at top
  slide.addShape("line", {
    x: 0, y: 0.08, w: SW, h: 0,
    line: { color: C.gold, width: 3 },
  });

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "AGENDA", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("Übersicht", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Agenda items with numbering
  const agenda = [
    "Ausgangslage — Status quo im Schweizer Mittelstand",
    "Herausforderungen — Typische Hindernisse der Transformation",
    "Kennzahlen — Digitalisierung in Zahlen",
    "Ist- vs. Soll-Zustand — Wo stehen wir, wohin wollen wir",
    "Unser Ansatz — Wie Rautaki den Wandel begleitet",
    "Stimmen aus der Praxis — Was unsere Kunden sagen",
    "Nächste Schritte — Ihr Weg zur digitalen Exzellenz",
  ];

  slide.addText(
    agenda.map((item, i) => ({
      text: `${String(i + 1).padStart(2, "0")}   ${item}`,
      options: { breakLine: true, color: C.ink },
    })),
    {
      x: ML, y: 1.7, w: CW - 0.5, h: 3.2,
      fontFace: FONT_UI, fontSize: 13, color: C.ink,
      paraSpaceAfter: 8, margin: 0, valign: "top",
    }
  );

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 3 — ABSCHNITTSTRENNER (DUNKEL) — Ausgangslage
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
  slide.addText("Ausgangslage", {
    x: ML, y: 2.55, w: 7, h: 1,
    fontFace: FONT_SERIF, fontSize: 36, color: C.white,
    margin: 0,
  });

  // Section subtitle
  slide.addText("Wo steht der Schweizer Mittelstand in der digitalen Transformation?", {
    x: ML, y: 3.55, w: 6, h: 0.5,
    fontFace: FONT_UI, fontSize: 13, color: C.midGrey,
    margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 4 — HERAUSFORDERUNGEN (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "HERAUSFORDERUNGEN", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 5, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("Typische Hindernisse der Transformation", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Bullet list
  slide.addText([
    { text: "Fehlende digitale Strategie — Einzelinitiativen statt ganzheitlicher Ansatz",
      options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Fachkräftemangel — Zu wenig interne Kompetenz für Umsetzung und Betrieb",
      options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Legacy-Systeme — Veraltete IT-Infrastruktur bremst Innovation",
      options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Kultureller Widerstand — Veränderungsbereitschaft auf allen Ebenen fehlt",
      options: { bullet: true, breakLine: true, color: C.ink } },
    { text: "Regulatorische Komplexität — Datenschutz, Compliance und branchenspezifische Auflagen",
      options: { bullet: true, color: C.ink } },
  ], {
    x: ML, y: 1.7, w: CW - 0.5, h: 3,
    fontFace: FONT_UI, fontSize: 14, color: C.ink,
    paraSpaceAfter: 10, margin: 0, valign: "top",
    bullet: { color: C.gold },
  });

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 5 — KENNZAHLEN (DUNKEL)
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
  slide.addText("Digitalisierung in Zahlen", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.white,
    margin: 0,
  });

  // Three stat blocks
  const stats = [
    { num: "67%", label: "DER KMU OHNE DIGITALE STRATEGIE" },
    { num: "3.2×", label: "HÖHERER ROI BEI STRATEGISCHER TRANSFORMATION" },
    { num: "45%", label: "PRODUKTIVITÄTSGEWINN DURCH KI-INTEGRATION" },
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
      fontFace: FONT_SERIF, fontSize: 48, color: C.white,
      margin: 0, valign: "middle",
    });

    // Label
    slide.addText(s.label, {
      x: sx + 0.25, y: sy + 1.3, w: statW - 0.3, h: 0.5,
      fontFace: FONT_UI, fontSize: 9, color: C.midGrey,
      charSpacing: 2.5, margin: 0,
    });
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 6 — ZWEI-SPALTEN: IST vs. SOLL (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "ANALYSE", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("Ist-Zustand vs. Soll-Zustand", {
    x: ML, y: MT + 0.35, w: CW, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  const colW = (CW - 0.5) / 2;
  const colY = 1.75;

  // Left column — Ist
  addGoldAccent(slide, ML, colY, 2.8);
  slide.addText("Ist-Zustand", {
    x: ML + 0.2, y: colY, w: colW, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 18, color: C.ink, margin: 0,
  });
  slide.addText(
    "• Isolierte Digitalisierungsprojekte\n" +
    "• Reaktive statt proaktive KI-Nutzung\n" +
    "• Fragmentierte Datenlandschaft\n" +
    "• Fehlende Governance-Strukturen\n" +
    "• Kompetenzlücken in Schlüsselrollen",
    {
      x: ML + 0.2, y: colY + 0.5, w: colW, h: 2.3,
      fontFace: FONT_UI, fontSize: 12, color: C.ink, margin: 0, valign: "top",
    }
  );

  // Right column — Soll
  const col2X = ML + colW + 0.5;
  addGoldAccent(slide, col2X, colY, 2.8);
  slide.addText("Soll-Zustand", {
    x: col2X + 0.2, y: colY, w: colW, h: 0.45,
    fontFace: FONT_SERIF, fontSize: 18, color: C.ink, margin: 0,
  });
  slide.addText(
    "• Integrierte Transformationsstrategie\n" +
    "• KI als strategischer Hebel verankert\n" +
    "• Einheitliche Datenarchitektur\n" +
    "• Klare Verantwortlichkeiten und Leitplanken\n" +
    "• Kontinuierlicher Kompetenzaufbau",
    {
      x: col2X + 0.2, y: colY + 0.5, w: colW, h: 2.3,
      fontFace: FONT_UI, fontSize: 12, color: C.ink, margin: 0, valign: "top",
    }
  );

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 7 — TEXT + BILD: UNSER ANSATZ (HELL)
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Section label
  slide.addText([
    { text: "——  ", options: { color: C.gold, fontSize: 8 } },
    { text: "UNSER ANSATZ", options: { color: C.midGrey, fontSize: 8, charSpacing: 3 } },
  ], { x: ML, y: MT, w: 4, h: 0.3, fontFace: FONT_UI, margin: 0 });

  // Title
  slide.addText("Wie Rautaki den Wandel begleitet", {
    x: ML, y: MT + 0.35, w: 5, h: 0.65,
    fontFace: FONT_SERIF, fontSize: 28, color: C.ink,
    margin: 0,
  });

  // Text content left
  slide.addText(
    "Rautaki verbindet strategische Beratung mit operativer Umsetzungskompetenz. " +
    "Wir arbeiten direkt mit Geschäftsleitungen zusammen, um:\n\n" +
    "• Eine massgeschneiderte Transformationsstrategie zu entwickeln\n" +
    "• KI-Initiativen mit messbaren Geschäftszielen zu verknüpfen\n" +
    "• Governance-Strukturen für verantwortungsvolle KI aufzubauen\n" +
    "• Teams zu befähigen, den Wandel eigenständig voranzutreiben",
    {
      x: ML, y: 1.75, w: 4.2, h: 2.8,
      fontFace: FONT_UI, fontSize: 13, color: C.ink,
      margin: 0, valign: "top",
    }
  );

  // Image placeholder right
  addImagePlaceholder(slide, 5.5, MT, 3.7, 4.1, C.warmGrey);

  addFooterLight(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 8 — ZITAT / TESTIMONIAL (DUNKEL)
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
  slide.addText("Rautaki hat uns geholfen, aus einer vagen Digitalisierungsambition eine klare, umsetzbare Strategie zu machen — mit messbaren Ergebnissen in unter sechs Monaten.", {
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
  slide.addText("[CEO / Geschäftsführer, Unternehmen AG]", {
    x: ML + 0.3, y: 4.15, w: 5, h: 0.3,
    fontFace: FONT_UI, fontSize: 10, color: C.midGrey,
    margin: 0,
  });

  addFooterDark(slide);
}


// ═══════════════════════════════════════════════════════════════════════════
//  SLIDE 9 — ABSCHLUSSFOLIE (DUNKEL)
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
  slide.addText("Lassen Sie uns gemeinsam Ihre digitale Zukunft gestalten.", {
    x: ML, y: 3.55, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 11, color: C.midGrey, margin: 0,
  });

  slide.addText([
    { text: "[Name]  ·  [E-Mail]  ·  rautaki.ch", options: { color: C.midGrey } },
  ], {
    x: ML, y: 3.95, w: 6, h: 0.4,
    fontFace: FONT_UI, fontSize: 10, margin: 0,
  });

  addFooterDark(slide);
}


// ══════════════════════════════════════════════════════════════════════════════
//  WRITE FILE
// ══════════════════════════════════════════════════════════════════════════════

const outputPath = path.join(__dirname, "digitale-transformation.pptx");
pres.writeFile({ fileName: outputPath })
  .then(() => console.log(`✓ Created: ${outputPath}`))
  .catch(err => { console.error("Error:", err); process.exit(1); });