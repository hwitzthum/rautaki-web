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