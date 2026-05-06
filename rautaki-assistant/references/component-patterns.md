# Rautaki Component Patterns — Email, Social, Print & Shared

Full specifications for components used across offline/print media and shared patterns.
For web-specific component implementation, see `web-guide.md`.

---

## Email Template

### Structure
```
┌─────────────────────────────────────┐ ← outer wrapper: #DDD9D0
│  ┌─────────────────────────────┐    │
│  │  HEADER (obsidian)          │    │ ← 32px × 48px padding
│  │  [Logo SM]    [Label]       │    │
│  ├─────────────────────────────┤    │ ← 3px gold gradient rule
│  │  BODY (white)               │    │ ← 56px × 48px padding
│  │  <h2> with gold <em>        │    │
│  │  <p> body text              │    │
│  │  [btn-gold CTA]             │    │
│  ├─────────────────────────────┤    │ ← 1px subtle border-top
│  │  FOOTER                     │    │ ← 24px × 48px padding
│  │  © Rautaki · links          │    │
│  └─────────────────────────────┘    │ ← shadow: 0 24px 80px rgba(0,0,0,0.14)
└─────────────────────────────────────┘
```

### Specifications

| Element | Property | Value |
|---------|----------|-------|
| Wrapper | max-width | 640px |
| Wrapper | background | `#FAFAFA` |
| Wrapper | shadow | `0 24px 80px rgba(0,0,0,0.14)` |
| Outer table | background | `#DDD9D0` (email backdrop) |
| Outer table | cell-padding | `40px` |
| Header | background | `#0A0A0A` (obsidian) |
| Header | padding | `32px 48px` |
| Header | layout | flex, space-between, align-center |
| Header label | font | DM Sans 11px, 500, uppercase |
| Header label | letter-spacing | `0.18em` |
| Header label | color | `rgba(255,255,255,0.20)` |
| Gold divider | height | `3px` |
| Gold divider | background | `linear-gradient(to right, #F5A623, transparent)` |
| Gold divider (Outlook) | background | solid `#F5A623` (gradient not supported) |
| Body | padding | `56px 48px` |
| Body h2 | font | Georgia 36px, 400, -0.02em |
| Body h2 em | color | `#F5A623` (gold italic, 1-2 words max) |
| Body h2 | margin-bottom | `20px` |
| Body p | font | DM Sans 15px, 300 (light) |
| Body p | line-height | 1.75 |
| Body p | color | `#9A9590` (mid-grey) |
| Body p | margin-bottom | `28px` |
| Footer | padding | `24px 48px` |
| Footer | border-top | `1px solid rgba(28,28,28,0.07)` |
| Footer | font | DM Sans 11px |
| Footer | letter-spacing | `0.05em` |
| Footer links | color | `#F5A623` (gold) |

### Email-Specific Rules
- Use **inline styles** for all critical properties — many clients strip `<style>` blocks
- Use `<table>` layout, not CSS grid/flexbox
- `box-shadow` won't render in Outlook — use a border fallback
- Gold gradient rule should be solid `background-color: #F5A623` for Outlook
- Test in Litmus or Email on Acid before sending

---

## Social Cards

### Format
- Aspect ratio: 1:1 (square)
- Grid gap between cards: 24px
- Padding: 40px
- Layout: flex column, space-between

### Three Variants

| Property | Dark | Gold | Outline |
|----------|------|------|---------|
| Background | `#0A0A0A` | `#F5A623` | transparent |
| Border | none | none | `2px solid #1C1C1C` |
| Quote colour | `#FAFAFA` (white) | `rgba(0,0,0,0.6)` | `#1C1C1C` (ink) |
| Logo base colour | white | `rgba(0,0,0,0.65)` | ink |
| Logo gold letters | `#F5A623` | `rgba(0,0,0,0.28)` | `#F5A623` |
| Ghost R | white, 4% opacity | black, 8% opacity | none (hidden) |

### Pull Quote
| Property | Value |
|----------|-------|
| Font | Georgia, italic |
| Size | 20px |
| Letter-spacing | -0.01em |
| Line-height | 1.45 |

### Ghost R Watermark
| Property | Value |
|----------|-------|
| Font | Georgia, 200px |
| Position | absolute, bottom -24px, right -10px |
| Letter-spacing | -0.05em |
| Line-height | 1 |
| Interaction | pointer-events: none, user-select: none |
| Accessibility | `aria-hidden="true"` |

### Rules
- Logo always at SM size (24px)
- Ghost R: only on Dark and Gold variants — never on Outline
- One quote per card — keep it short and impactful
- No CTA buttons on social cards

---

## Business Cards

### Dimensions
| Property | Print | Screen |
|----------|-------|--------|
| Width | 85.6mm | 400px |
| Height | 53.98mm | 230px |
| Bleed | 3mm all sides | — |
| Padding | — | 36px |

### Two Variants

| Property | Dark | Light |
|----------|------|-------|
| Background | `#0A0A0A` (obsidian) | `#FAFAFA` (white) |
| Gold rule position | Bottom, 3px | Top, 3px |
| Border | none | `1px solid rgba(0,0,0,0.1)` |
| Name colour | white | ink (`#1C1C1C`) |
| Title colour | `rgba(255,255,255,0.28)` | `#9A9590` (mid-grey) |
| Contact colour | `rgba(255,255,255,0.28)` | `#9A9590` |
| Logo colour | white | ink |

### Typography
| Element | Font | Size | Weight | Tracking | Transform |
|---------|------|------|--------|----------|-----------|
| Name | Georgia | 20px (h4) | 400 | -0.01em | none |
| Title | DM Sans | 11px | 500 | 0.18em | uppercase |
| Contact | DM Sans | 11px | 400 | 0 | none |

### Layout
- Flex column, space-between
- Top: name + title (title has 4px margin-top)
- Bottom: contact info (left) + logo SM (right), flex space-between, align-end
- Contact line-height: 1.9

### Rules
- QR code on back panel, right-aligned
- Respect 3mm bleed for print production
- Never round corners — sharp edges throughout
- Print font fallback: Helvetica for DM Sans

---

## Stat Block

### Structure
Vertical stack of metrics. Each stat has a gold left border, large number with suffix, and small label.

```
│ 12+                    ← Georgia 64px, gold suffix
│ Years of experience    ← DM Sans 11px uppercase
│
│ 40+
│ Organisations advised
│
│ 3×
│ Growth acceleration
```

### Specifications
| Property | Value |
|----------|-------|
| Layout | flex column |
| Gap between stats | 36px |
| Stat left border | 2px solid gold |
| Stat left padding | 20px |
| Number font | Georgia, 64px (D1 size) |
| Number kerning | -0.03em |
| Number line-height | 1 |
| Number colour | ink (`#1C1C1C`) on light, white on dark |
| Suffix (+, ×) colour | gold (`#F5A623`) |
| Label font | DM Sans, 11px, 500 |
| Label tracking | 0.18em (mid, NOT 0.22em) |
| Label transform | uppercase |
| Label colour | mid-grey (`#9A9590`) |
| Label margin-top | 4px |

### Rules
- Suffix character (+, ×, %) is always gold, same font and size as the number
- Labels use `tracking-wide-mid` (0.18em), not `tracking-wide-label` (0.22em)
- On dark backgrounds: number colour switches to white, label to `rgba(255,255,255,0.45)`

---

## Footer

### Structure
Full-width dark bar with logo and copyright.

```
┌──────────────────────────────────────────────────────┐
│ 3px gold border-top                                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Logo SM]                © 2025 Rautaki · Strategy  │
│                                   Advisory           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Specifications
| Property | Value |
|----------|-------|
| Background | `#0A0A0A` (obsidian) |
| Border-top | 3px solid gold |
| Padding | 60px vertical, 80px horizontal |
| Layout | flex, space-between, align-center |
| Logo | SM size (24px), white variant |
| Copy font | DM Sans, 11px, 500 |
| Copy tracking | 0.15em |
| Copy transform | uppercase |
| Copy colour | `rgba(255,255,255,0.20)` |

### Grain Texture
Apply the `.grain` overlay (SVG noise at 3.5% opacity) to the footer for subtle texture.
Hidden when `prefers-reduced-motion: reduce` is active.

### Responsive
- Flex layout stacks on mobile (logo top, copy bottom)
- Reduce horizontal padding to 24px on mobile

### Rules
- Footer links: gold on hover, transition 200ms
- Copyright year should be dynamically generated
- In expanded footer variants (3-column): heading labels use `white/45`, body links use `white/70`
