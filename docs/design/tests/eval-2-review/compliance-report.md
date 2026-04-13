# Rautaki Design Compliance Report — Homepage

> **Status:** Historical — generated March 2026. Several items (animation durations, English CTAs, glow opacity) have since been resolved. Review current code before acting on findings.

**Scope:** `src/app/page.tsx` and all imported components
**Date:** March 2026
**Reviewer:** Rautaki Assistant (Design System Guardian)

---

## Summary

| Severity | Count |
|----------|-------|
| Critical violations | 1 |
| Major violations | 7 |
| Minor violations | 10 |
| Passed checks | 12 |

---

## Critical Violations

### 1. `transition-all` on Button and ServiceCard
- **File:** `src/components/Button.tsx:50`
- **Found:** `transition-all duration-200`
- **File:** `src/components/ServiceCard.tsx:23`
- **Found:** `transition-all duration-slow` on the gold accent bar
- **Expected:** Transition individual properties only (`transition-colors`, `transition-transform`, `transition-[height]`)
- **Why:** The design system explicitly prohibits `transition: all` on complex elements (style-guide §7). It can cause jank on properties that shouldn't animate. The ServiceCard accent bar only animates `height` — use `transition-[height] duration-slow`.

---

## Major Violations

### 1. Gold ambient glow uses non-token opacity value
- **File:** `src/components/HeroDark.tsx:34`
- **Found:** `rgba(245,166,35,0.12)` — 12% opacity
- **Expected:** `rgba(245,166,35,0.08)` — the `--color-gold-glow` / `--_gold-alpha-08` token
- **Why:** The design system defines the hero ambient glow at 8% opacity (`--hero-glow-color`). Using 12% makes gold more prominent than intended, violating the "gold is rare" principle.

### 2. CTA body text uses non-token color
- **File:** `src/components/HeroDark.tsx:98`
- **Found:** `text-black/65` — translates to `rgba(0,0,0,0.65)`
- **Expected:** `text-black/55` — matching `--color-text-on-gold-muted` / `rgba(0,0,0,0.55)`, OR use `text-black/60` matching the text-on-gold base token
- **Why:** The design system defines exactly two alpha values for text on gold backgrounds: `rgba(0,0,0,0.60)` for base text and `rgba(0,0,0,0.55)` for body copy. The value 0.65 is not a token value.

### 3. Watermark 'R' uses non-token opacity
- **File:** `src/components/HeroDark.tsx:74`
- **Found:** `text-white/[0.05]` — 5% opacity
- **Expected:** `text-white/[0.025]` — matching `--watermark-color` / `rgba(255,255,255,0.025)`
- **Why:** The design system specifies the watermark R at 2.5% opacity. Using 5% makes it twice as visible as intended. The watermark should be nearly invisible — a subliminal brand element, not a visible decorative feature.

### 4. Ghost card numbers use non-token opacity
- **File:** `src/components/ServiceCard.tsx:29`
- **Found:** `text-white/[0.04]` — 4% opacity
- **Expected:** `text-white/[0.03]` — matching `--card-num-opacity: 0.03`
- **Why:** The design token `--card-num-opacity` is set at 3%. The ghost numbers should be barely perceptible.

### 5. ServiceCard body text and link use non-token alpha values
- **File:** `src/components/ServiceCard.tsx:39`
- **Found:** `text-white/55` — 55% opacity
- **Expected:** `text-white/45` (approved `--color-text-on-dark-body`) or `rgba(255,255,255,0.38)` (card body token `--card-body-color`)
- **File:** `src/components/ServiceCard.tsx:43`
- **Found:** `text-gold/80` — arbitrary 80% gold
- **Expected:** `text-gold` at full opacity. No reduced-opacity gold text is defined in the tokens.
- **Why:** Both 55% and 80% are non-token values. The card body color token is 38%, though 45% (the general body-on-dark token) provides better contrast. Either way, 55% is not a defined value.

### 6. Animation durations exceed 600ms maximum
- **File:** `src/components/HeroDark.tsx:37` — `glow-drift 12s ease-in-out infinite`
- **File:** `src/components/HeroDark.tsx:54` — `fade-up 700ms`
- **File:** `src/components/HeroDark.tsx:91` — `clip-reveal 700ms`
- **Expected:** Maximum animation duration is 600ms per style guide §7
- **Why:** 700ms and 12s exceed the design system's 600ms cap. The glow drift is arguably ambient and decorative (less critical), but the fade-up and clip-reveal at 700ms should be reduced to 600ms.

### 7. Language mixing — English CTAs on German page
- **File:** `src/components/HeroDark.tsx:104` — "Reserve a consultation"
- **File:** `src/components/ServiceCard.tsx:44` — "Learn more"
- **File:** `src/components/ServiceCards.tsx:28` — "Explore our services"
- **File:** `src/app/page.tsx:52` — "Reserve a consultation"
- **Expected:** German CTA text (e.g., "Beratung reservieren", "Mehr erfahren", "Unsere Leistungen")
- **Why:** The design system specifies German as the default output language. Brand terms ("Strategy · Advisory · Growth") stay in English, but UI elements and CTAs should be in German for a Swiss audience.

---

## Minor Violations

### 1. StatBlock gap not matching token
- **File:** `src/components/StatBlock.tsx:18`
- **Found:** `gap-10` (40px)
- **Expected:** `gap-9` (36px) — matching `--stat-block-gap: var(--space-9)` (36px)
- **Why:** The stat block gap token is 36px. 40px is close but off-grid from the design spec.

### 2. HeroDark headline tracking inconsistency
- **File:** `src/components/HeroDark.tsx:48`
- **Found:** `tracking-tighter` (-0.04em via Tailwind)
- **Note:** This is actually correct for hero-size text. However, the class `text-fluid-hero` uses `clamp(44px, 8vw, 88px)`, meaning at smaller viewports the text could be 44px (between H1 and D1), where `-0.03em` would be more appropriate. Consider using a responsive tracking adjustment.

### 3. Tagline font-weight
- **File:** `src/components/Logo.tsx:38`
- **Found:** `font-normal` (400)
- **Expected:** `font-normal` (400) is actually correct per `--fw-regular` for the tagline
- **Note:** This is correct — the design spec uses weight 400 for the tagline. No action needed. *(Initially flagged, verified as correct.)*

### 4. ServiceCards gap uses both Tailwind and inline style
- **File:** `src/components/ServiceCards.tsx:13`
- **Found:** `className="... gap-px"` AND `style={{ gap: "2px" }}`
- **Expected:** Only one gap declaration. Use `gap-[2px]` in className and remove the inline style.
- **Why:** The inline style overrides the Tailwind class, creating confusion. Both produce similar results (gap-px = 1px, inline = 2px), but the design spec requires exactly 2px. Use `gap-[2px]` only.

### 5. Section padding inconsistency
- **File:** `src/app/page.tsx:22` — Impact section uses `py-32` (128px)
- **File:** `src/app/page.tsx:42` — CTA section uses `py-36` (144px)
- **Expected:** Standard section padding is `py-20` (80px) or `py-25` (100px) per `--space-section` and `--space-section-lg`
- **Why:** 128px and 144px are not standard section padding values. While both are multiples of 4px (valid on the grid), they're larger than the design system's "large section" token of 100px. This makes sections feel disproportionately spaced. Consider using `py-25` (100px) for emphasis sections or keeping `py-20` (80px) for standard rhythm.

### 6. SectionLabel dark variant uses non-token alpha
- **File:** `src/components/SectionLabel.tsx:11`
- **Found:** `text-white/18` and `bg-white/18` (18% opacity)
- **Expected:** `text-white/20` and `bg-white/20` — matching `--color-text-on-dark-muted: rgba(255,255,255,0.20)`
- **Why:** 18% is not a token value. The closest approved alpha is 20%.

### 7. Watermark and glow sizes deviate from tokens
- **File:** `src/components/HeroDark.tsx:77` — Watermark font-size `520px`
- **Expected:** `500px` matching `--sz-deco-hero` / `--watermark-size`
- **File:** `src/components/HeroDark.tsx:31` — Glow element `720px`
- **Expected:** `700px` matching `--hero-glow-size`
- **Why:** Both are close but don't match the token values exactly.

### 8. Border divider opacity inconsistency
- **File:** `src/components/HeroDark.tsx:42`
- **Found:** `border-white/10` (10% opacity)
- **Expected:** `border-white/5` — matching `--color-border-dark: rgba(255,255,255,0.05)`
- **Why:** The dark border token is 5%, not 10%. Using 10% makes the panel divider too visible for the design intent.

---

## Passed Checks

| Check | Status | Notes |
|-------|--------|-------|
| **Color palette** | PASS | All hex colors are within the approved set |
| **Color pairings** | PASS | Obsidian bg → white text, Cream bg → ink text, Gold bg → dark text |
| **Logo construction** | PASS | Gold on correct letters (a pos 5, i pos 7), Georgia serif, weight 400 |
| **Logo minimum size** | PASS | XL (56px) used in hero — well above 18px minimum |
| **Logo tagline** | PASS | Only shows at MD or larger, correct font/spacing/color |
| **Border radius** | PASS | `rounded-none` explicitly set on buttons; no unauthorized rounding |
| **Typography — heading font** | PASS | All headings use `font-serif` (Georgia) |
| **Typography — body font** | PASS | All body text uses `font-ui` (DM Sans) |
| **Typography — kerning** | PASS | Proper tracking classes used (`tracking-tight-h2`, `tracking-tight-h3`, etc.) |
| **Gold italic emphasis** | PASS | Used sparingly (1 word "KI" in CTA heading), not full headings |
| **Section labels** | PASS | Correct pattern — 28px gold line + 14px gap + uppercase DM Sans 500 |
| **Gold rule** | PASS | 3px height with gradient background (`bg-gold-rule`) |

---

## Tailwind Config Assessment

The `tailwind.config.js` is well-structured and faithfully maps all design tokens:
- Color primitives and semantic aliases correctly defined
- Font families, weights, and sizes match `tokens.json` exactly
- Spacing scale follows 4px grid
- Border radius correctly restricted to `none` and `full` only
- Transition durations match token values
- Custom grid templates for hero layouts present

**One note:** The Tailwind config does not include `--card-body-color: rgba(255,255,255,0.38)` from the component spec. ServiceCard uses `text-white/55` (55% opacity) instead. The component spec says 38%. The current value (55%) actually provides better contrast and accessibility (roughly 5:1 vs 3:1), so this deviation may be intentional and beneficial. Consider updating the component spec to match.

---

## Recommendations (Priority Order)

1. **Fix gold glow opacity** (HeroDark.tsx:34) — Change 0.12 → 0.08
2. **Fix watermark opacity** (HeroDark.tsx:74) — Change 0.05 → 0.025
3. **Fix CTA text color** (HeroDark.tsx:98) — Change `text-black/65` → `text-black/55`
4. **Fix ghost number opacity** (ServiceCard.tsx:29) — Change 0.04 → 0.03
5. **Translate English CTAs to German** — 4 instances across 3 files
6. **Replace `transition-all`** in Button.tsx with specific property transitions
7. **Fix border divider** (HeroDark.tsx:42) — Change `border-white/10` → `border-white/5`
8. **Fix stat gap** (StatBlock.tsx:18) — Change `gap-10` → `gap-9`
9. **Clean up dual gap declaration** (ServiceCards.tsx:13)
10. **Consider standardizing section padding** to 80px or 100px tokens