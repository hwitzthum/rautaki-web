# Rautaki — Design Style Guide

> **Brand positioning:** Strategy · Advisory · Growth
> **Design language:** Editorial authority. Refined restraint. The precision of a consultant's memo, the confidence of a premium brand.
> **Reference tokens:** `docs/design/tokens.css`

---

## Contents

1. [Brand Identity](#1-brand-identity)
2. [Colour System](#2-colour-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Logo Usage](#5-logo-usage)
6. [Borders, Rules & Dividers](#6-borders-rules--dividers)
7. [Motion & Interaction](#7-motion--interaction)
8. [Accessibility](#8-accessibility)
9. [Do / Don't](#9-do--dont)

---

## 1. Brand Identity

### Essence

Rautaki is a Māori word meaning *strategy*. The brand projects authority without arrogance — it is the firm that leaders trust when stakes are high. Every design decision should reinforce: **clarity, decisiveness, and weight**.

### Tone in design

| Quality | Expressed as |
|---------|--------------|
| Authority | Generous negative space, serif headings, sharp edges |
| Clarity | High contrast, restrained palette, structured layouts |
| Warmth | Cream backgrounds, gold accent, italic emphasis in headings |
| Confidence | Strong typographic hierarchy, no decorative clutter |

### Logo mark

The wordmark **Rautaki** in Georgia Regular. Letters **a** (position 5) and **i** (position 7) are rendered in brand gold (`#F5A623`). The remaining letters are rendered in the surface-appropriate base colour.

```
R a u t [a] k [i]
         ↑       ↑
       gold    gold
```

Tagline: *Strategy · Advisory · Growth* — DM Sans, 11px, `letter-spacing: 0.22em`, uppercase, mid-grey.

---

## 2. Colour System

### Palette overview

| Token | Value | Name | Role |
|-------|-------|------|------|
| `--color-gold` | `#F5A623` | Gold | Brand accent — the only warm colour |
| `--color-gold-light` | `#FFD07A` | Gold Light | Tints, hover states on gold |
| `--color-gold-dim` | `rgba(245,166,35,0.15)` | Gold Dim | Subtle gold fills, tags |
| `--color-bg-dark` | `#0A0A0A` | Obsidian | Hero backgrounds, footer, cards section |
| `--color-text-primary` | `#1C1C1C` | Ink | Body text and headings on light |
| `--color-bg-cream` | `#F4F2EE` | Cream | Default page/section background |
| `--color-bg-light` | `#FAFAFA` | White | Clean sections, email body, cards on light |
| `--color-bg-warm` | `#E8E5DF` | Warm Grey | Social card section, secondary alternates |
| `--color-text-secondary` | `#9A9590` | Mid Grey | Meta, captions, muted body text |

### Canonical colour combinations

These are the only approved background/foreground pairings:

| Background | Text colour | Accent | Use case |
|------------|-------------|--------|----------|
| Obsidian `#0A0A0A` | White `#FAFAFA` | Gold `#F5A623` | Hero (dark), footer, service cards |
| White `#FAFAFA` | Ink `#1C1C1C` | Gold `#F5A623` | Typography section, email body |
| Cream `#F4F2EE` | Ink `#1C1C1C` | Gold `#F5A623` | Body default, logo system, bizcard section |
| Warm Grey `#E8E5DF` | Ink `#1C1C1C` | Gold `#F5A623` | Social card section |
| Gold `#F5A623` | Obsidian `rgba(0,0,0,0.6)` | — | CTA block, gold social card |

### Colour hierarchy

```
Gold ──── brand accent, never used as a background for large areas
Obsidian ─ primary dark surface (hero, footer)
Cream ──── primary light surface (page default)
White ───── secondary light surface (type system, email)
```

Gold should appear sparingly — as accent strokes, logo letters, button fills, and headline italics. It must not dominate. **One gold element per visual unit.**

### Alpha values (use tokens, not raw values)

| Token | Use |
|-------|-----|
| `--color-text-on-dark-body` | Body copy on obsidian backgrounds |
| `--color-text-on-dark-secondary` | Navigation, contact info on dark |
| `--color-text-on-dark-muted` | Footer copy, email labels |
| `--color-text-muted` | Annotations on light backgrounds |

---

## 3. Typography

### Font stack

**Primary — Georgia (Serif)**
System font. Zero loading overhead. Use for all headings, the logo, display text, pull quotes, italic emphasis, and statistics.

```css
font-family: var(--font-serif);
/* = Georgia, 'Times New Roman', serif */
```

**Secondary — DM Sans (Sans-serif)**
Load weights 300, 400, 500 only from Google Fonts.
Use for body copy, labels, navigation, captions, and all UI text.

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

```css
font-family: var(--font-ui);
/* = 'DM Sans', system-ui, sans-serif */
```

### Type scale

| Level | Size | Font | Tracking | Line height | Typical use |
|-------|------|------|----------|-------------|-------------|
| **Hero Display** | 88px | Georgia 400 | −0.04em | 1.0 | Homepage banners, event headers |
| **Display D1** | 64px | Georgia 400 | −0.03em | 1.0 | Section openers, stat numbers |
| **H1** | 48px | Georgia 400 | −0.03em | 1.15 | Page titles, article headings |
| **H2** | 36px | Georgia 400 | −0.02em | 1.15 | Section headings, slide titles |
| **H3** | 26px | Georgia 400 | −0.015em | 1.15 | Cards, email subjects, pull quotes |
| **H4** | 20px | Georgia 400 | −0.01em | 1.25 | Sub-sections, sidebar headings |
| **Lead** | 18px | Georgia 400 | 0 | 1.75 | First paragraph, emphasis italic |
| **Body** | 15px | DM Sans 400 | 0 | 1.75 | All running copy |
| **Body Small** | 13px | DM Sans 400 | 0 | 1.75 | Footnotes, supporting info |
| **Label / Caption** | 11px | DM Sans 500 | +0.18–0.22em | 1.5 | Section markers, tags, captions |

### The kerning rule

Georgia was designed for body-size rendering. At display sizes (20px+), its default tracking is optically too loose. **Always apply negative letter-spacing to Georgia headings.** The kerning values are pre-set in `tokens.css` — never override them.

```css
/* Correct — use the token */
h1 {
  font-family: var(--font-serif);
  font-size: var(--sz-h1);
  letter-spacing: var(--kern-h1);  /* −0.03em */
}

/* Wrong — unset or zero tracking on display Georgia */
h1 { letter-spacing: 0; }
```

### Label style

Section labels, tags, navigation items, and captions all share this pattern:
- DM Sans, weight 500
- 11px, uppercase, `letter-spacing: 0.18–0.22em`
- Mid-grey colour (`--color-text-secondary`)

```css
.label {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--kern-label-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
```

### Italic emphasis in headings

Italic words within serif headings should be coloured gold. This is the primary mechanism for adding warmth and brand character to copy.

```html
<h1>We don't just <em>advise</em> — we transform.</h1>
```

```css
h1 em { font-style: italic; color: var(--color-gold); }
```

Apply to 1–2 words maximum per heading. Never italicise an entire heading.

### Font weight discipline

| Weight | Font | Use |
|--------|------|-----|
| 300 (Light) | DM Sans | Body copy on dark surfaces, hero body paragraph |
| 400 (Regular) | DM Sans + Georgia | Standard body, all Georgia headings |
| 500 (Medium) | DM Sans | Labels, buttons, navigation |

Georgia has no weight variants — always use 400. Never attempt `font-weight: 700` on serif elements.

---

## 4. Spacing & Layout

### Spacing scale

All spacing values are multiples of 4px. Reference `--space-*` tokens.

| Token | Value | Common use |
|-------|-------|------------|
| `--space-1` | 4px | Micro: tagline margin-top |
| `--space-2` | 8px | Internal card gaps |
| `--space-6` | 24px | Scale-row gap, type-intro gap |
| `--space-8` | 32px | Email footer padding |
| `--space-9` | 36px | Stat block gap, nav gap |
| `--space-10` | 40px | Section-label margin-bottom, CTA padding |
| `--space-12` | 48px | Font-card padding, service card padding |
| `--space-20` | 80px | Standard section padding (all axes) |
| `--space-25` | 100px | Large sections (type system, hero-light) |

### Section rhythm

Sections alternate between Obsidian and light backgrounds (Cream → White → Obsidian → Cream). This creates rhythm without needing additional dividers.

```
[Obsidian]    Dark Hero
[White]       Typography System
[Obsidian]    Kerning Demo
[Cream]       Logo System
[White]       Colour System
[White]       Light Hero
[Obsidian]    Service Cards
[Warm Grey]   Social Cards
[Cream]       Business Cards / Email
[Obsidian]    Footer
```

### Grid system

All layouts use CSS Grid. No Bootstrap or framework grid columns.

| Layout | Definition | Use |
|--------|------------|-----|
| Two-column equal | `1fr 1fr` | Dark hero, font cards, kerning demo |
| Two-column weighted | `1.3fr 0.7fr` | Light hero (content + stats) |
| Three-column | `repeat(3, 1fr)` | Service cards, social cards, logo grid |
| Five-column | `repeat(5, 1fr)` | Colour swatches |
| Type scale table | `180px 1fr 120px 140px` | Type scale reference |

### Hairline grid gap

Between grid cells in card layouts, the gap is `2px`. This creates a distinctive "seam" aesthetic — not a space, not a merged surface. The seam colour comes from the section background bleeding through.

```css
.grid { display: grid; gap: 2px; }
```

### Maximum widths

| Context | Max-width |
|---------|-----------|
| Full-width sections | `1440px` |
| Reading content | `720px` |
| Email template | `640px` |
| Hero body paragraph | `400–480px` |

---

## 5. Logo Usage

### Construction

```html
<!-- Standard logo (ink on light) -->
<div class="logo logo-md" style="color: var(--ink)">
  R<span>aut</span><span class="gold">a</span><span>k</span><span class="gold">i</span>
</div>
```

The CSS `.logo .gold` class applies `color: var(--color-gold)`.

### Background variants

| Background | Base letter colour | Gold letters colour |
|------------|-------------------|---------------------|
| Obsidian | White `#FAFAFA` | Gold `#F5A623` |
| White | Ink `#1C1C1C` | Gold `#F5A623` |
| Cream | Ink `#1C1C1C` | Gold `#F5A623` |
| Gold | `rgba(0,0,0,0.65)` | `rgba(0,0,0,0.28–0.35)` |

On gold backgrounds, the gold accent letters become *more muted* than the base, reversing the hierarchy. Never use the standard gold accent on a gold background.

### Size system

| Class | Size | Minimum use |
|-------|------|-------------|
| `.logo-xl` | 56px | Hero, cover pages, full-width headers |
| `.logo-md` | 36px | Page headers, hero-light, section headers |
| `.logo-sm` | 24px | Navigation, cards, email, social cards |
| `.logo-xs` | 18px | Minimum digital size — do not go below |

**Absolute minimum: 18px digital / 12mm print.**
Below this threshold, the gold accent letters become illegible. Switch to a text-only treatment if constrained.

### Clearspace

Minimum clearspace around the logo = half the logo's cap-height on all sides.

### Prohibited uses

- Do not recolour or stylise the Georgia typeface
- Do not add drop shadows to the logo
- Do not place the logo on busy photographic backgrounds without a solid colour block
- Do not change which letters receive gold — only the **a** and the **i**
- Do not use all-caps, bold, or any weight other than Regular 400

### Tagline

```css
.logo-tagline {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);       /* 11px */
  font-weight: var(--fw-regular);
  letter-spacing: var(--kern-label-wide); /* 0.22em */
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-top: var(--space-2);    /* 8px */
}
```

The tagline appears only when the logo is rendered at `logo-md` or larger.

---

## 6. Borders, Rules & Dividers

### Gold rule (structural)

A 3px left-to-transparent gradient used at the top of the footer and at the top of the light hero section. Use to signal a primary section boundary.

```css
hr.gold-rule {
  border: none;
  height: 3px;
  background: var(--gradient-gold-rule);
  /* = linear-gradient(to right, var(--color-gold), transparent) */
}
```

### Hair rule

A 1px near-invisible rule for intra-section dividers on light surfaces.

```css
hr.hair {
  border: none;
  height: 1px;
  background: var(--color-border-hair); /* rgba(28,28,28,0.1) */
}
```

### Section label accent line

The `::before` pseudo-element on `.section-label` creates a 28px gold line that precedes the label text. This is the primary decorative connector between the label and its section.

```css
.section-label::before {
  content: '';
  width: var(--section-label-line-width);  /* 28px */
  height: var(--section-label-line-height); /* 1px */
  background: var(--color-gold);
}
```

### Left accent border on stats

Stats use a 2px left border in gold to create visual anchoring:

```css
.stat {
  padding-left: var(--stat-indent);  /* 20px */
  border-left: var(--stat-accent-border); /* 2px solid gold */
}
```

### Card hover accent

Service cards use a left-border reveal on hover — the 3px gold border starts at `height: 0` and transitions to `height: 100%`.

```css
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 0;
  background: var(--color-gold);
  transition: var(--transition-height);
}
.card:hover::before { height: 100%; }
```

### CTA accent

Left-border accent on the clearspace note and any inline callout:

```css
.callout {
  border-left: var(--border-cta-accent); /* 3px solid gold */
}
```

---

## 7. Motion & Interaction

### Philosophy

Motion is purposeful, not decorative. Every animation should reduce cognitive load or communicate state — not entertain.

### Standard transitions

| Interaction | Duration | Easing | Property |
|-------------|----------|--------|----------|
| Hover colour change | 200ms | `ease` | `color` |
| Background hover | 200ms | `ease` | `background-color` |
| Card left-border reveal | 400ms | `ease` | `height` |
| Row hover padding shift | 200ms | `ease` | `padding-left` (8px) |
| Type scale row hover | 200ms | `ease` | `background`, `padding` |

### Page-level motion (future)

For JS-driven page transitions or scroll reveals, use:
- Staggered fade-up for card grids (`animation-delay` per child)
- Single orchestrated page-load reveal (not scattered micro-animations)
- Scroll-triggered fade-in for below-fold sections

### Hover states

| Element | Hover change |
|---------|-------------|
| Nav item | Colour → Gold |
| Service card | Background `#111` → `#161616`, gold left-border reveals |
| Type scale row | Background → Cream, padding-left shifts 8px |
| Button | Opacity −10% or invert |
| Logo nav items | Colour → Gold |

### No-motion override

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Always include this block in production stylesheets.

---

## 8. Accessibility

### Contrast ratios

| Combination | Ratio | WCAG level |
|-------------|-------|------------|
| Ink `#1C1C1C` on Cream `#F4F2EE` | 16.7:1 | AAA |
| White `#FAFAFA` on Obsidian `#0A0A0A` | 19.4:1 | AAA |
| Gold `#F5A623` on Obsidian `#0A0A0A` | 6.8:1 | AA (large text) |
| Ink on Gold `#F5A623` | 6.9:1 | AA |
| `rgba(255,255,255,0.45)` on Obsidian | ~5.5:1 | AA (body only) |

> **Warning:** `rgba(255,255,255,0.28)` on Obsidian yields ~3:1 — use only for non-essential decorative text (nav, contact info at small size). Ensure interactive elements meet 4.5:1 minimum.

### Semantic HTML

- Use `<h1>`–`<h4>` in correct document order — never skip levels for visual effect
- Logo wordmark: wrap in `<a>` with `aria-label="Rautaki home"` when used as a link
- Buttons: use `<button>` or `<a>` with appropriate roles — never styled `<div>` or `<span>`
- Cards: if the whole card is clickable, wrap in `<a>` with descriptive text

### Focus management

```css
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}
/* Remove default :focus outline for mouse users only */
:focus:not(:focus-visible) { outline: none; }
```

### Images and icons

- All decorative images: `alt=""` (empty alt)
- All informative images: descriptive alt text
- Icon-only buttons: `aria-label` on the button, `aria-hidden="true"` on the icon

---

## 9. Do / Don't

### Colour

| Do | Don't |
|----|-------|
| Use gold as a single accent per visual unit | Use gold as the dominant background |
| Use Obsidian/Cream alternation for rhythm | Mix warm and cool greys |
| Reference semantic colour tokens | Hard-code hex values in component CSS |
| Maintain approved colour pair combinations | Place Ink text directly on Obsidian |

### Typography

| Do | Don't |
|----|-------|
| Apply kerning tokens to all Georgia headings | Set `letter-spacing: 0` on display Georgia |
| Load DM Sans at 300/400/500 only | Load all DM Sans variants (performance) |
| Use Georgia italic in gold for emphasis | Italicise full headings |
| Use DM Sans 500 for all label/caption text | Use DM Sans bold (700) — it is not loaded |
| Keep label text uppercase with wide tracking | Use lowercase for section labels |

### Spacing & layout

| Do | Don't |
|----|-------|
| Use `--space-*` tokens for all spacing | Use arbitrary pixel values |
| Use 2px gap for card/cell grids | Use larger gaps (breaks the seam aesthetic) |
| Give sections 80px padding minimum | Crowd sections below 48px padding |
| Centre-constrain reading content at 720px max | Let body text run full viewport width |

### Logo

| Do | Don't |
|----|-------|
| Render in Georgia Regular 400 only | Bold or italicise the wordmark |
| Apply gold only to the **a** (position 5) and **i** (position 7) | Apply gold to all letters |
| Use approved background variants | Place logo on photography without a backing surface |
| Respect 18px minimum digital size | Scale below minimum size |

### Motion

| Do | Don't |
|----|-------|
| Transition individual properties (`color`, `height`) | `transition: all` on complex elements |
| Use `400ms` for large reveals, `200ms` for hovers | Animate durations above 600ms |
| Respect `prefers-reduced-motion` | Omit the reduced-motion media query |