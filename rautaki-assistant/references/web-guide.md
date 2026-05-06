# Rautaki Web Component Specification

Reference for creating or modifying branded web components.
Assumes a React + Tailwind CSS stack with the Rautaki token configuration.

## Constants — Tailwind Class Mapping

### Colors

```
# Primitives
bg-gold          #F5A623      text-gold
bg-gold-light    #FFD07A      text-gold-light
bg-gold-dim      rgba(…0.15)  — subtle fills
bg-gold-glow     rgba(…0.08)  — hero ambient radial glow
bg-gold-deep     #B87400      — rare, high-contrast only
bg-obsidian      #0A0A0A      text-obsidian
bg-ink           #1C1C1C      text-ink
bg-charcoal      #111111      — card backgrounds on dark
bg-charcoal-hover #161616     — card hover state
bg-white         #FAFAFA      text-white
bg-cream         #F4F2EE
bg-warm-grey     #E8E5DF
bg-mid-grey      #9A9590      text-mid-grey
bg-error         #C53030      text-error

# Alpha (Tailwind opacity modifiers)
text-white/45     — body on dark          text-ink/45   — muted on light
text-white/28     — nav/secondary on dark  text-ink/65   — body on gold
text-white/20     — footer/muted on dark   text-black/55 — body on gold
text-white/[0.025] — watermark R           text-black/28 — logo accent on gold bg
text-white/[0.04]  — ghost card numbers    text-ink/10   — hair rules
```

### Typography

```
# Font families
font-serif    Georgia, "Times New Roman", serif    — headings, logo, stats, quotes
font-ui       "DM Sans", system-ui, sans-serif     — body, labels, nav, UI
font-sans     alias for font-ui

# Type scale — each includes size + line-height + letter-spacing
text-hero     88px / 1.0  / -0.04em     font-serif — homepage hero only
text-d1       64px / 1.0  / -0.03em     font-serif — section numbers, display
text-h1       48px / 1.15 / -0.03em     font-serif — page titles
text-h2       36px / 1.15 / -0.02em     font-serif — section headings
text-h3       26px / 1.15 / -0.015em    font-serif — cards, sub-sections
text-h4       20px / 1.25 / -0.01em     font-serif — sub-sub-sections
text-lead     18px / 1.75 / 0           font-ui    — first paragraphs
text-body     15px / 1.75 / 0           font-ui    — running copy
text-sm       13px / 1.75 / 0           font-ui    — footnotes, small
text-xs       11px / 1.5  / 0.18em      font-ui    — labels, captions (uppercase)

# Logo sizes
text-logo-xl  56px   text-logo-md  36px   text-logo-sm  24px   text-logo-xs  18px

# Tracking (letter-spacing) — use when composing headings manually
tracking-tighter    -0.04em     hero
tracking-tight      -0.03em     h1, d1
tracking-tight-h2   -0.02em
tracking-tight-h3   -0.015em
tracking-tight-h4   -0.01em
tracking-normal      0em
tracking-wide-nav    0.16em     nav links
tracking-wide-mid    0.18em     stat labels
tracking-wide-btn    0.20em     button text
tracking-wide-label  0.22em     section labels, tagline

# Weights — only these three exist
font-light   300    — body on dark surfaces
font-normal  400    — default, headings (Georgia is always 400)
font-medium  500    — labels, buttons, nav
```

### Spacing (4px base)

```
p-1 = 4px    p-6 = 24px    p-12 = 48px    p-20 = 80px
p-2 = 8px    p-7 = 28px    p-14 = 56px    p-24 = 96px
p-3 = 12px   p-8 = 32px    p-15 = 60px    p-25 = 100px
p-4 = 16px   p-9 = 36px    p-16 = 64px    p-28 = 112px
p-5 = 20px   p-10 = 40px

gap-[2px]  — card grid seam aesthetic (NOT gap-px or gap-1)
```

### Layout

```
max-w-content   1440px    — full sections
max-w-reading   720px     — body text blocks
max-w-email     640px     — email templates
max-w-narrow    480px     — hero body text, constrained copy

grid-cols-hero-dark    1fr 1fr         — equal columns
grid-cols-hero-light   1.3fr 0.7fr     — weighted content + sidebar
```

### Transitions

```
duration-instant   80ms     — micro-interactions
duration-fast      150ms    — quick feedback
duration-DEFAULT   200ms    — hover color changes
duration-slow      400ms    — card border reveal
duration-xslow     600ms    — maximum allowed

ease-out     cubic-bezier(0.16, 1, 0.3, 1)     — scroll reveals, page transitions
ease-in-out  cubic-bezier(0.45, 0, 0.55, 1)
ease-spring  cubic-bezier(0.34, 1.56, 0.64, 1)  — playful bounce
```

### Z-Index

```
z-below -1    z-raised 1    z-dropdown 10    z-sticky 20
z-overlay 30  z-modal 40    z-toast 50
```

### Border

```
rounded-none    — brand default, ALL structural elements
rounded-full    — pill badges only, use very sparingly
border-3        — gold rule width
border-2        — stat accent, subtle borders
```

### Shadows

```
shadow-none     shadow-email    shadow-card    shadow-modal
```

---

## Section Rhythm

Pages alternate dark/light backgrounds. The color shift IS the divider — no explicit `<hr>` between sections (except GoldRule at select transitions).

**Pattern:** `[Obsidian] → [Cream or White] → [Obsidian] → repeat`

Standard section wrapper:
```tsx
<section className="bg-obsidian px-6 sm:px-10 lg:px-20 py-20">
  <div className="mx-auto max-w-content">
    {/* content */}
  </div>
</section>
```

Light variant:
```tsx
<section className="bg-cream px-6 sm:px-10 lg:px-20 py-20">
  <div className="mx-auto max-w-content">
    {/* content */}
  </div>
</section>
```

**Rules:**
- Never place two same-background sections consecutively
- Responsive padding: `px-6 sm:px-10 lg:px-20` (mobile → tablet → desktop)
- Standard vertical: `py-20` (80px). Large sections: `py-25` (100px)

---

## Component Patterns

### 1. Logo

**Props:** `size` (xl | md | sm | xs), `variant` (dark | light), `showTagline` (boolean)

```tsx
<Link href="/" aria-label="Rautaki — home" className="inline-block">
  <span className={`font-serif font-normal tracking-tight-h4 ${sizeClass} ${colorClass}`}>
    R<span>aut</span><span className="text-gold">a</span><span>k</span><span className="text-gold">i</span>
  </span>
  {showTagline && size !== 'xs' && size !== 'sm' && (
    <span className="block text-xs font-ui font-medium uppercase tracking-wide-label text-mid-grey mt-2">
      Strategy · Advisory · Growth
    </span>
  )}
</Link>
```

**Rules:** Gold on positions 5 (a) and 7 (i) only. Tagline only at md/xl. Georgia Regular 400 — never bold.

### 2. Button

**Props:** `variant` (gold | dark | ghost), `href`, `onClick`, `showArrow`, `disabled`

```tsx
// Variant class map:
gold:  "bg-gold text-obsidian hover:bg-gold-light"
dark:  "bg-obsidian text-white hover:bg-charcoal"
ghost: "border border-white/20 text-white hover:border-gold hover:text-gold"

// Common classes on all variants:
"inline-flex items-center gap-3 px-7 py-4 text-xs font-medium uppercase
 tracking-wide-btn rounded-none transition-colors duration-200
 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
```

**Rules:** Always `rounded-none`. Renders `<Link>` when `href` provided, `<button>` otherwise. Arrow icon animates right on hover.

**States:** Active: 90% opacity (`active:opacity-90`). Disabled: 40% opacity, `cursor-not-allowed`.

### 3. SectionLabel

**Props:** `text` (string), `variant` (dark | light)

```tsx
<div className="flex items-center gap-[14px] mb-10">
  <span className={`w-7 h-px ${variant === 'dark' ? 'bg-white/[0.18]' : 'bg-gold'}`} />
  <span className={`text-xs font-ui font-medium uppercase tracking-wide-label
    ${variant === 'dark' ? 'text-white/[0.18]' : 'text-mid-grey'}`}>
    {text}
  </span>
</div>
```

**Rules:** Gold line on light surfaces, `white/[0.18]` on dark (not white/20). Always 28px wide (w-7), 1px tall (h-px).

### 4. GoldRule


```tsx
<hr className="border-none h-[3px] bg-gold-rule" />
```

One-line component. Used sparingly at select section transitions — NOT between every section.

### 5. ServiceCard

**Props:** `number` (string), `title` (ReactNode), `description`, `href`

Key patterns:
- Background: `bg-charcoal` (hover: `bg-charcoal-hover`)
- Ghost number: `text-[80px] font-serif font-normal text-white/[0.03] leading-none tracking-[-0.05em] mb-[-16px]` — negative margin pulls number behind heading. Decorative: `aria-hidden="true"`
- Title: `font-serif text-h3 font-normal text-white` with gold italic `<em>` on 1-2 words
- Body: `text-sm font-light text-white/[0.38] leading-body` — note: weight 300, opacity 0.38
- Gold left border: absolute `div` with `w-[3px] bg-gold`, scales from `h-0` to `h-full` on hover over `duration-slow`
- Grid: parent uses `gap-[2px]` (the "seam" aesthetic) and `grid-cols-1 lg:grid-cols-3`
- Padding: `py-12 px-10` (48px vertical, 40px horizontal — NOT uniform 48px)
- Focus state: gold 2px outline + gold left-border at 100%

### 6. StatBlock + AnimatedCounter


```tsx
<div className="border-l-2 border-gold pl-5">
  <span className="font-serif text-d1 tracking-tight font-normal text-ink">
    <AnimatedCounter target={150} />
    <span className="text-gold">+</span>
  </span>
  <span className="block text-xs font-ui font-medium uppercase tracking-wide-mid text-mid-grey mt-2">
    Projekte begleitet
  </span>
</div>
```

**Key details:**
- Gap between stats: `gap-9` (36px)
- Number size: `text-d1` (64px), kerning `-0.03em`
- Label tracking: `tracking-wide-mid` (0.18em) — NOT `tracking-wide-label` (0.22em)
- Label margin-top: `mt-1` (4px)
- On dark backgrounds: number `text-white`, label `text-white/45`

AnimatedCounter: IntersectionObserver-triggered, requestAnimationFrame with ease-out cubic, shows target value immediately when `prefers-reduced-motion: reduce`.

### 7. ScrollReveal

**Props:** `delay` (ms), `threshold` (0-1), `className`

```tsx
// Sets data-reveal attribute + --reveal-delay CSS variable
// IntersectionObserver triggers data-visible="true" on first intersection
// CSS handles the transition (define in your global stylesheet):
[data-reveal] {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo);
}
[data-reveal][data-visible="true"] { opacity: 1; transform: translateY(0); }
```

**Rules:** Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` — sets `data-visible` immediately if true. Wrap any element that should fade-in on scroll.

### 8. Navigation

**Dark backgrounds only** — no light variant exists in the brand. For a light-mode adaptation,
use `text-mid-grey` default and `hover:text-gold`.

- Position: `fixed top-0`, `z-sticky` (20)
- Background: transparent at top → `bg-obsidian/95 backdrop-blur-sm` on scroll
- Scroll-direction aware: hides on scroll-down, reveals on scroll-up
- Active link: `text-gold` + `aria-current="page"`
- Default link colour: `text-white/28` (decorative — nav is non-essential text)
- Hover: `.nav-link-sweep` class (gold `::after` underline, 0.28s)
- Nav item gap: 36px
- Nav focus offset: **2px** (differs from global 3px default)
- Mobile: hamburger button with `aria-expanded`, max-h transition for menu
- Responsive padding: `px-6 sm:px-10 lg:px-20`

### 9. HeroDark

- Full viewport: `min-h-[92vh]`, `bg-obsidian`, `grid-cols-hero-dark` on lg+
- Left column: Logo xl + headline (`text-fluid-hero font-serif`) + body (`text-white/45 font-light max-w-narrow`)
- Left column border: `border-r border-white/5`
- Right column: Gold CTA block (`bg-gold p-10`) + watermark R
- CTA block: heading `text-h3 font-serif`, body `text-black/55`, btn-dark inside
- Watermark R: `text-[500px] text-white/[0.025]`, right -40px, vertically centred, `tracking-[-0.05em]`, `z-below`
- Ambient glow: 700px circle, `bg-gold-glow`, positioned top -150px / left -100px, fades to transparent at 70%
- Staggered fade-up animation per headline line
- Grain texture overlay via `.grain` class

### 10. HeroLight

**Props:** `label`, `title`, `description`, `rightContent`

- Background: `bg-white`, gold top border: `border-t-3 border-gold`
- Grid: `grid-cols-hero-light` (1.3fr 0.7fr) on lg+, single column on mobile
- Left: SectionLabel + `h1` (`text-h1 tracking-tight font-serif font-normal`) + description
- Right: optional `rightContent` slot (used for StatBlock on about page)
- Padding: `py-20 lg:py-25`

### 11. Footer

- Background: `bg-obsidian`, grain texture, gold top border: `border-t-3 border-gold`
- Layout: flex, space-between, align-center. Padding: 60px vertical, 80px horizontal
- Minimal variant: Logo SM (24px) left, copyright right
- Expanded variant: 3-column grid on lg+ (Logo+desc | Nav links | Contact info)
- Heading labels: `text-xs font-medium uppercase tracking-wide-label text-white/45`
- Body links: `text-white/70 hover:text-gold transition-colors`
- Copyright copy: DM Sans 11px, `tracking-[0.15em]` (wide-footer), uppercase, `text-white/20`
- Bottom bar: copyright left, Privacy/Imprint links right
- Collapses to stacked on mobile

### 12. BookingModal


- Portal-based (`createPortal`)
- Overlay: `bg-obsidian/80`, `z-modal` (40)
- Panel: `bg-white`, `shadow-modal`, gold top bar (`h-[3px] bg-gold`)
- Scale-up animation on entry
- Focus trap: Tab/Shift+Tab cycle through focusable elements, Escape closes
- Auto-focus first input after 90ms delay
- `body.style.overflow = 'hidden'` while open
- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

---

## Global CSS Patterns

These patterns should be defined in your global stylesheet:

| Pattern | Implementation |
|---------|---------------|
| Focus visible | `outline: 2px solid #F5A623; outline-offset: 3px` on `:focus-visible` |
| Mouse focus suppressed | `:focus:not(:focus-visible) { outline: none }` |
| Skip link | `.skip-to-content` — fixed, hidden off-screen, gold bg, appears on Tab |
| Gold italic in headings | `h1 em, h2 em, h3 em, h4 em { font-style: italic; color: #F5A623 }` |
| Scroll reveal | `[data-reveal]` / `[data-visible="true"]` — opacity + translateY transition |
| Grain texture | `.grain::before` — SVG noise overlay at 3.5% opacity |
| Fluid hero type | `.text-fluid-hero` — `clamp(44px, 8vw, 88px)` |
| Nav link sweep | `.nav-link-sweep::after` — gold underline that grows from 0 to 100% width |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — zeros all animation/transition durations |

### Keyframes

| Name | Effect | Used by |
|------|--------|---------|
| `fade-up` | translateY(24px) → 0, opacity 0 → 1 | ScrollReveal |
| `fade-in` | opacity 0 → 1 | General |
| `scale-up` | scale(0.95) → 1, opacity 0 → 1 | BookingModal |
| `clip-reveal` | clip-path inset right → none | Decorative reveals |
| `glow-drift` | translate + scale oscillation, opacity 0.08 → 0.14 | HeroDark ambient glow |

---

## Responsive Breakpoints

```
sm:  480px     md:  768px     lg:  1024px     xl:  1280px     2xl: 1440px
```

**Collapse rules (mobile-first):**
- All multi-column grids → single column below `lg`
- Hero heading: `text-fluid-hero` uses `clamp(44px, 8vw, 88px)`
- Watermark R: hidden below `lg`
- Ghost card numbers: hidden below `md`
- Navigation: hamburger menu below `lg`
- Section padding: `px-6 sm:px-10 lg:px-20`
- Touch targets: minimum 44x44px on mobile

---

## n8n Chat Widget

If integrating the `@n8n/chat` widget, override its CSS variables to match brand. All CSS variables overridden to match brand:
- `--chat--border-radius: 0px` (sharp edges)
- Header: obsidian bg, Georgia h1, gold top border
- Body: obsidian bg, DM Sans text
- User messages: gold bg, obsidian text
- Bot messages: dark bg, cream text
- Input: dark bg, gold accent on send button
- Toggle button: gold bg, 50px, circular (the one exception to sharp-edge rule)
