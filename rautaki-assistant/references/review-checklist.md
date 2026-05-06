# Rautaki Design Review Checklist

Use this checklist when auditing code, designs, or documents for brand compliance.
Report findings grouped by severity with file paths and line numbers.

## Color Audit

### Approved Hex Values
Only these colors may appear:
- `#F5A623` (Gold), `#FFD07A` (Gold Light), `#B87400` (Deep Gold — rare)
- `#0A0A0A` (Obsidian), `#1C1C1C` (Ink), `#111111` (Charcoal), `#161616` (Charcoal Hover)
- `#FAFAFA` (White), `#F4F2EE` (Cream), `#E8E5DF` (Warm Grey), `#DDD9D0` (Email BG)
- `#9A9590` (Mid Grey)

### Approved Alpha Values
- `rgba(255,255,255, 0.45)` — body on dark
- `rgba(255,255,255, 0.28)` — nav/secondary on dark
- `rgba(255,255,255, 0.20)` — footer/muted on dark
- `rgba(255,255,255, 0.05)` — subtle dark dividers
- `rgba(255,255,255, 0.025)` — watermark
- `rgba(28,28,28, 0.45)` — muted text on light
- `rgba(28,28,28, 0.10)` — hair rules
- `rgba(28,28,28, 0.07)` — subtle dividers
- `rgba(0,0,0, 0.60)` — text on gold
- `rgba(0,0,0, 0.55)` — body on gold
- `rgba(0,0,0, 0.35)` — muted on gold
- `rgba(0,0,0, 0.28)` — gold accent letters on gold bg
- `rgba(245,166,35, 0.15)` — gold dim fill
- `rgba(245,166,35, 0.08)` — gold ambient glow

### Color Pairing Check
For each text element, verify the background/foreground combination is in the approved list.
Flag any Ink text on Obsidian (use White instead) or White text on Cream (use Ink instead).

### Gold Usage Count
Per visual unit (section, card, slide), count gold elements. If more than one gold accent
competes for attention, flag as "gold overuse."

---

## Typography Audit

### Font Check
- All headings: Georgia (or --font-serif token)
- All body/UI: DM Sans (or --font-ui token)
- No other fonts should appear

### Kerning Check
For each Georgia heading, verify negative letter-spacing is applied:
- 88px → -0.04em
- 64px → -0.03em
- 48px → -0.03em
- 36px → -0.02em
- 26px → -0.015em
- 20px → -0.01em
- Missing letter-spacing on display Georgia is a **major violation**

### Weight Check
- Georgia: only 400. Flag any `font-weight: bold/700/900` on serif elements
- DM Sans: only 300, 400, 500. Flag 600, 700, or bold
- Label/caption/nav: must be 500 (medium)
- Body on dark: should be 300 (light)

### Italic Check
- Gold italic emphasis: max 1-2 words per heading
- Flag entire headings that are fully italicized
- Flag gold italic used in body text (should only be in headings)

### Label Pattern Check
All section labels, tags, captions should be:
- Uppercase
- Letter-spacing 0.18–0.22em
- DM Sans weight 500
- 11px size
- Mid Grey color

---

## Spatial Audit

### Spacing Grid
All spacing values should be multiples of 4px. Common violations:
- Arbitrary padding/margin values (e.g., 15px, 25px, 35px)
- Gap values not on the 4px grid

### Border Radius
Search for any `border-radius` that is not `0` or `9999px`.
Any structural element with rounded corners is a **critical violation**.

### Section Padding
Sections should have at least 80px padding. Flag anything below 48px.

### Grid Gap
Card grids should use 2px gap (the "seam" aesthetic). Larger gaps break the brand pattern.

### Max Widths
- Full sections: 1440px
- Reading content: 720px
- Email: 640px
- Hero body paragraph: 400-480px

---

## Logo Audit

### Letter Colors
Only positions 5 ('a') and 7 ('i') should be gold. All other letters inherit base color.

### Size Minimum
No logo instance below 18px (digital) or 12mm (print).

### Background Check
Logo must not appear on busy photographic backgrounds without a solid color backing block.

### Weight/Style
Logo must be Georgia Regular 400. Never bold, never italic, never all-caps.

### Tagline
Must only appear with MD (36px) or larger logo. Check font: DM Sans, 11px, uppercase,
letter-spacing 0.22em.

---

## Decorative Elements Audit

### Gold Rule
Should be 3px height with `linear-gradient(to right, gold, transparent)`.
Not a solid gold bar (unless in email for Outlook compatibility).

### Section Label Prefix
Every section label should have a 28px gold line before the text.
Missing prefix = minor violation.

### Stat Blocks
Should have 2px solid gold left border with 20px left padding.

---

## Motion Audit (Web/Interactive)

### Transition Properties
Flag `transition: all` — should transition individual properties only.

### Durations
- Hover: 200ms
- Card border reveal: 400ms
- Maximum: 600ms
Flag anything over 600ms.

### Reduced Motion
Must include `@media (prefers-reduced-motion: reduce)` override.

---

## Web / Tailwind Audit

### Token Compliance
- All colors must use Tailwind brand classes (`bg-gold`, `text-ink`, `bg-obsidian`, etc.)
- Flag any raw hex values in `className` strings (e.g., `text-[#F5A623]`) — use the token class instead
- Flag any inline `style={{ color: '...' }}` that should be a Tailwind class
- Exceptions: ghost number opacity (`text-white/[0.03]`), fluid type (`clamp()`), and computed values are acceptable as arbitrary Tailwind values

### Component Pattern Checks
- ServiceCard grid: must use `gap-[2px]` (not `gap-2` or `gap-4`) — the "seam" aesthetic
- ServiceCard body: must use `font-light` (300) and `text-white/[0.38]`
- ServiceCard padding: `py-12 px-10` (48px × 40px, not uniform 48px)
- Logo: gold spans on positions 5 (a) and 7 (i) only — no other letters
- SectionLabel: must include gold/white line prefix (`w-7 h-px` span)
- SectionLabel dark: must use `white/[0.18]` (not white/20) for both line and text
- Buttons: must have `rounded-none` (zero border-radius)
- Dark button hover: must be `bg-charcoal` (#111111), NOT `bg-ink` (#1C1C1C)
- All serif headings: must combine `font-serif` + `text-hN` + `font-normal` (text-hN includes kerning)
- Gold italic emphasis: `<em>` inside headings renders italic + gold via global CSS — max 1-2 words
- Lead text (18px): must use Georgia (serif), NOT DM Sans — it is for first paragraphs only
- Stat labels: must use `tracking-wide-mid` (0.18em), NOT `tracking-wide-label` (0.22em)
- Navigation: dark backgrounds only — using nav on light requires explicit colour adaptation

### Responsive Checks
- All multi-column grids must collapse to single column below `lg` (1024px)
- Hero heading must use fluid sizing (`text-fluid-hero` or responsive classes)
- Watermark R and ghost card numbers: hidden below `lg` / `md`
- Navigation: hamburger menu below `lg`
- Section padding: `px-6 sm:px-10 lg:px-20` (not fixed `px-20` everywhere)
- Touch targets: minimum 44x44px on mobile

---

## Accessibility Audit (Web)

### Structure
- [ ] Skip link present: `<a href="#main-content" className="skip-to-content">`
- [ ] One `<h1>` per page, heading levels never skip (h1 → h2 → h3)
- [ ] `<main id="main-content">` wraps page content

### Focus & Keyboard
- [ ] `:focus-visible` styles: 2px gold outline, 3px offset
- [ ] `:focus:not(:focus-visible)` suppresses mouse focus outlines
- [ ] Modal focus trapping: Tab cycle within modal, Escape closes, focus returns to trigger
- [ ] All interactive elements reachable via Tab in logical order

### ARIA
- [ ] `aria-current="page"` on active nav link
- [ ] `aria-label` on icon-only buttons (hamburger, close, logo link)
- [ ] `aria-hidden="true"` on decorative elements (ghost numbers, watermark R, gold line spans, glow div)
- [ ] `aria-expanded` on hamburger button reflecting menu state
- [ ] Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

### Reduced Motion
- [ ] `@media (prefers-reduced-motion: reduce)` override in global stylesheet
- [ ] ScrollReveal checks `matchMedia` and sets `data-visible` immediately
- [ ] AnimatedCounter checks `matchMedia` and shows target value without animation
- [ ] Grain texture hidden in reduced motion

### Forms
- [ ] Inputs wrapped in explicit `<label>` elements
- [ ] Required fields: `aria-required="true"`
- [ ] Error messages: container with `role="alert"`
- [ ] Placeholder supplements labels, never replaces them

### Contrast
- Gold `#F5A623` as foreground on body-size text (under 18px) → **critical violation**
- `text-white/28` used for interactive or essential content → **critical violation** (~3:1 ratio)
- Mid Grey `#9A9590` on cream for body text → verify context (acceptable for non-essential labels)
- Any new color pairing not in approved list → **critical violation**

---

## Section Rhythm Check

- Verify dark/light alternation pattern across the page
- No consecutive same-background sections (e.g., two `bg-obsidian` sections in a row)
- GoldRule (`<hr>`) used only at select transitions, not between every section
- Each section uses standard wrapper: `px-6 sm:px-10 lg:px-20 py-20` with `max-w-content` inner container

---

## Report Format

```markdown
# Rautaki Design Compliance Report

## Summary
- Critical violations: X
- Major violations: Y
- Minor violations: Z

## Critical Violations
### 1. [Description]
- **File**: path/to/file:line
- **Found**: `border-radius: 8px`
- **Expected**: `border-radius: 0` (Rautaki uses sharp edges exclusively)

## Major Violations
### 1. [Description]
...

## Minor Violations
### 1. [Description]
...

## Passed Checks
- Color palette: All values within approved set
- Logo construction: Correct gold letters
- ...
```