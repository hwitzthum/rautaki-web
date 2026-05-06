# Rautaki Design Tokens — Complete Reference

All 159 tokens that define the Rautaki visual system. Use this as the authoritative
source when implementing any branded material. Tokens are grouped by domain.

---

## 1. Colour — Primitives

### Gold Family
| Token | Value | Purpose |
|-------|-------|---------|
| `--_gold-500` | `#F5A623` | Brand gold, primary accent |
| `--_gold-300` | `#FFD07A` | Lighter tint, hover states |
| `--_gold-900` | `#B87400` | Deep gold, rare high-contrast use |
| `--_gold-alpha-15` | `rgba(245,166,35,0.15)` | Gold dim fill |
| `--_gold-alpha-08` | `rgba(245,166,35,0.08)` | Hero ambient glow |

### Darks
| Token | Value | Purpose |
|-------|-------|---------|
| `--_obsidian` | `#0A0A0A` | Deepest dark — hero, footer |
| `--_ink` | `#1C1C1C` | Body text on light surfaces |
| `--_charcoal` | `#111111` | Card surface on dark |
| `--_charcoal-mid` | `#161616` | Card hover on dark |
| `--_dark-15` | `#151515` | Kerning demo alternate |

### Lights
| Token | Value | Purpose |
|-------|-------|---------|
| `--_white` | `#FAFAFA` | Off-white, clean surfaces |
| `--_cream` | `#F4F2EE` | Warm off-white, default bg |
| `--_warm-grey` | `#E8E5DF` | Social card bg, alternates |
| `--_email-bg` | `#DDD9D0` | Email section backdrop |

### Grey
| Token | Value | Purpose |
|-------|-------|---------|
| `--_mid-grey` | `#9A9590` | Captions, meta, muted text |

### Alpha on Dark (white-based)
| Token | Value | Purpose |
|-------|-------|---------|
| `--_white-alpha-45` | `rgba(255,255,255,0.45)` | Body text on dark |
| `--_white-alpha-28` | `rgba(255,255,255,0.28)` | Nav, contact on dark |
| `--_white-alpha-20` | `rgba(255,255,255,0.20)` | Footer copy, email labels |
| `--_white-alpha-05` | `rgba(255,255,255,0.05)` | Subtle dark dividers |
| `--_white-alpha-025` | `rgba(255,255,255,0.025)` | Watermark R letterform |

### Alpha on Light (ink-based)
| Token | Value | Purpose |
|-------|-------|---------|
| `--_ink-alpha-45` | `rgba(28,28,28,0.45)` | Muted text on light |
| `--_ink-alpha-10` | `rgba(28,28,28,0.10)` | Hair rules on light |
| `--_ink-alpha-07` | `rgba(28,28,28,0.07)` | Very subtle dividers |
| `--_ink-alpha-06` | `rgba(28,28,28,0.06)` | Logo-cell borders |

### Alpha on Gold (black-based)
| Token | Value | Purpose |
|-------|-------|---------|
| `--_gold-ink-60` | `rgba(0,0,0,0.65)` | Base letterforms on gold bg (token name is historical) |
| `--_gold-ink-55` | `rgba(0,0,0,0.55)` | Body copy on gold CTA |
| `--_gold-ink-35` | `rgba(0,0,0,0.35)` | Muted text on gold bg |
| `--_gold-ink-28` | `rgba(0,0,0,0.28)` | Gold-accent letters on gold bg |

---

## 2. Colour — Semantic Tokens

### Brand Accent
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--color-gold` | `#F5A623` | Primary brand accent |
| `--color-gold-light` | `#FFD07A` | Hover tint |
| `--color-gold-dim` | `rgba(245,166,35,0.15)` | Subtle gold fills |
| `--color-gold-glow` | `rgba(245,166,35,0.08)` | Hero ambient glow |

### Backgrounds
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--color-bg-dark` | `#0A0A0A` | Hero, footer, card sections |
| `--color-bg-light` | `#FAFAFA` | Clean sections |
| `--color-bg-cream` | `#F4F2EE` | Default page bg |
| `--color-bg-warm` | `#E8E5DF` | Social section |
| `--color-bg-email` | `#DDD9D0` | Email wrapper |
| `--color-bg-card-dark` | `#111111` | Service card base |
| `--color-bg-card-hover` | `#161616` | Service card hover |

### Text — on Light
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--color-text-primary` | `#1C1C1C` | Headings, body on cream/white |
| `--color-text-secondary` | `#9A9590` | Captions, meta |
| `--color-text-muted` | `rgba(28,28,28,0.45)` | Very muted annotations |
| `--color-text-accent` | `#F5A623` | Gold highlights in headings |

### Text — on Dark
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--color-text-on-dark` | `#FAFAFA` | Headings on dark |
| `--color-text-on-dark-body` | `rgba(255,255,255,0.45)` | Body text |
| `--color-text-on-dark-secondary` | `rgba(255,255,255,0.28)` | Nav, secondary |
| `--color-text-on-dark-muted` | `rgba(255,255,255,0.20)` | Footer, labels |

### Text — on Gold
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--color-text-on-gold` | `rgba(0,0,0,0.65)` | Base text on gold |
| `--color-text-on-gold-muted` | `rgba(0,0,0,0.55)` | Body on gold CTA |
| `--color-text-on-gold-accent` | `rgba(0,0,0,0.28)` | Logo accent on gold |

### Borders & Dividers
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--color-border-gold` | `#F5A623` | Gold accent borders |
| `--color-border-subtle` | `rgba(28,28,28,0.07)` | Light subtle border |
| `--color-border-hair` | `rgba(28,28,28,0.10)` | Hair rules on light |
| `--color-border-dark` | `rgba(255,255,255,0.05)` | Dividers on dark |
| `--color-border-card` | `rgba(28,28,28,0.06)` | Logo-cell on white |

---

## 3. Typography

### Font Families
| Token | Value | Use |
|-------|-------|-----|
| `--font-serif` | `Georgia, 'Times New Roman', serif` | Headings, logo, stats, quotes |
| `--font-ui` | `'DM Sans', system-ui, sans-serif` | Body, labels, nav, UI |
| `--font-mono` | `'Menlo', 'Consolas', monospace` | Code, hex values in docs |

### Type Scale
| Token | Value | Rem | Use |
|-------|-------|-----|-----|
| `--sz-hero` | `88px` | 5.5 | Hero display, banners |
| `--sz-d1` | `64px` | 4 | Display, section openers, large numerics |
| `--sz-h1` | `48px` | 3 | Page titles |
| `--sz-h2` | `36px` | 2.25 | Section headings, slide titles |
| `--sz-h3` | `26px` | 1.625 | Cards, email subjects, pull quotes |
| `--sz-h4` | `20px` | 1.25 | Sub-sections |
| `--sz-lead` | `18px` | 1.125 | Lead paragraph, italic emphasis (**Georgia, not DM Sans**) |
| `--sz-body` | `15px` | 0.9375 | All running copy |
| `--sz-sm` | `13px` | 0.8125 | Small, footnotes |
| `--sz-xs` | `11px` | 0.6875 | Labels, tags, captions |
| `--sz-logo-xl` | `56px` | 3.5 | Hero logo |
| `--sz-logo-md` | `36px` | 2.25 | Header logo |
| `--sz-logo-sm` | `24px` | 1.5 | Nav, cards, email |
| `--sz-logo-xs` | `18px` | 1.125 | Minimum logo |
| `--sz-deco-card` | `80px` | — | Ghost number on service cards |
| `--sz-deco-social` | `200px` | — | Ghost R on social cards |
| `--sz-deco-hero` | `500px` | — | Watermark R on dark hero |
| `--sz-specimen` | `96px` | — | Font specimen display |

### Kerning (Letter-Spacing)
| Token | Value | Context |
|-------|-------|---------|
| `--kern-hero` | `-0.04em` | 88px hero |
| `--kern-d1` | `-0.03em` | 64px display |
| `--kern-h1` | `-0.03em` | 48px h1 |
| `--kern-h2` | `-0.02em` | 36px h2 |
| `--kern-h3` | `-0.015em` | 26px h3 |
| `--kern-h4` | `-0.01em` | 20px h4 |
| `--kern-body` | `0em` | Body text |
| `--kern-label-wide` | `0.22em` | Section labels, logo tagline |
| `--kern-label-mid` | `0.18em` | Stat labels, breadcrumbs, biz card titles |
| `--kern-label-tight` | `0.12em` | Email header, swatch names |
| `--kern-btn` | `0.20em` | Buttons |
| `--kern-nav` | `0.16em` | Navigation items |
| `--kern-footer` | `0.15em` | Footer copy |

### Line Heights
| Token | Value | Context |
|-------|-------|---------|
| `--lh-display` | `1.0` | Hero and D1 display |
| `--lh-heading` | `1.15` | H1–H3 headings |
| `--lh-subhead` | `1.25` | H4, pull quotes |
| `--lh-body` | `1.75` | Running copy |
| `--lh-ui` | `1.5` | Labels, captions |
| `--lh-loose` | `1.8` | Specimen, contact text |
| `--lh-card` | `1.45` | Social card quotes |

### Font Weights
| Token | Value | Context |
|-------|-------|---------|
| `--fw-light` | `300` | Body on dark, hero body |
| `--fw-regular` | `400` | Default, Georgia always 400 |
| `--fw-medium` | `500` | Labels, buttons, nav |

---

## 4. Spacing

### Base Scale (4px multiples)
| Token | Value | Common use |
|-------|-------|-----------|
| `--space-1` | `4px` | Micro gaps |
| `--space-2` | `8px` | Tight gaps |
| `--space-3` | `12px` | Small padding |
| `--space-4` | `16px` | Standard gap |
| `--space-5` | `20px` | Stat left-padding |
| `--space-6` | `24px` | Scale-row gap |
| `--space-7` | `28px` | Hero body mb |
| `--space-8` | `32px` | Email footer |
| `--space-9` | `36px` | Stat-block gap, nav gap |
| `--space-10` | `40px` | Label mb, CTA padding |
| `--space-12` | `48px` | Card padding |
| `--space-14` | `56px` | Email body padding |
| `--space-15` | `60px` | Footer padding-y |
| `--space-20` | `80px` | Section padding |
| `--space-25` | `100px` | Large section padding |

### Semantic Aliases
| Token | Resolves to | Purpose |
|-------|-------------|---------|
| `--space-section` | `80px` | Standard section padding |
| `--space-section-lg` | `100px` | Large section padding |
| `--space-card` | `48px` | Card internal padding |
| `--space-card-sm` | `40px` | Tighter cards (social) |
| `--space-gap-grid` | `2px` | Hairline gap (seam aesthetic) |
| `--space-gap-loose` | `24px` | Loose grid gap (social) |

---

## 5. Border, Radius & Shadows

### Radius
| Token | Value | Rule |
|-------|-------|------|
| `--radius-none` | `0` | ALL structural elements |
| `--radius-full` | `9999px` | Pill badges only |

### Gold Borders
| Token | Value | Use |
|-------|-------|-----|
| `--border-gold-rule` | `3px solid gold` | Footer top, hero-light top, card hover |
| `--border-gold-thin` | `2px solid gold` | Type-scale top, stat left-border |
| `--border-gold-hair` | `1px solid gold` | Section-label accent |

### Structural Borders
| Token | Value | Use |
|-------|-------|-----|
| `--border-subtle` | `1px solid rgba(28,28,28,0.07)` | Light subtle |
| `--border-hair` | `1px solid rgba(28,28,28,0.10)` | Hair rules |
| `--border-dark-divider` | `1px solid rgba(255,255,255,0.05)` | On dark |

### Shadows
| Token | Value | Use |
|-------|-------|-----|
| `--shadow-none` | `none` | Default |
| `--shadow-email` | `0 24px 80px rgba(0,0,0,0.14)` | Email wrapper |
| `--shadow-card` | `0 8px 32px rgba(0,0,0,0.10)` | Card elevation |
| `--shadow-modal` | `0 32px 96px rgba(0,0,0,0.20)` | Modals |

---

## 6. Motion & Transitions

### Durations
| Token | Value | Use |
|-------|-------|-----|
| `--duration-instant` | `80ms` | Micro-interactions |
| `--duration-fast` | `150ms` | Quick feedback |
| `--duration-base` | `200ms` | Hover colour/bg |
| `--duration-slow` | `400ms` | Card border reveal |
| `--duration-xslow` | `600ms` | Page transitions (max) |

### Easing
| Token | Value | Use |
|-------|-------|-----|
| `--ease-default` | `ease` | Standard transitions |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | Scroll reveals, entries |
| `--ease-in-out` | `cubic-bezier(0.45,0,0.55,1)` | Symmetrical motion |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Slight overshoot |

### Shorthand Transitions
| Token | Value |
|-------|-------|
| `--transition-base` | `all 200ms ease` |
| `--transition-color` | `color 200ms ease` |
| `--transition-bg` | `background-color 200ms ease` |
| `--transition-height` | `height 400ms ease` |
| `--transition-padding` | `padding 200ms ease` |

### Interaction Mapping
| Interaction | Duration | Easing | Property |
|-------------|----------|--------|----------|
| Hover colour change | 200ms | ease | `color` |
| Background hover | 200ms | ease | `background-color` |
| Card left-border reveal | 400ms | ease | `height` |
| Row hover padding shift | 200ms | ease | `padding-left` |

---

## 7. Z-Index & Layout

### Z-Index Scale
| Token | Value | Use |
|-------|-------|-----|
| `--z-below` | `-1` | Watermarks, decorative ::after |
| `--z-base` | `0` | Default flow |
| `--z-raised` | `1` | Raised content in stacking context |
| `--z-dropdown` | `10` | Dropdowns, tooltips |
| `--z-sticky` | `20` | Sticky navigation |
| `--z-overlay` | `30` | Overlays, drawers |
| `--z-modal` | `40` | Modals |
| `--z-toast` | `50` | Notifications |

### Layout Max Widths
| Token | Value | Use |
|-------|-------|-----|
| `--layout-max-content` | `1440px` | Full-width sections |
| `--layout-max-reading` | `720px` | Optimal reading width |
| `--layout-max-email` | `640px` | Email template |
| `--layout-max-narrow` | `480px` | Constrained hero body |

### Grid Templates
| Token | Value | Use |
|-------|-------|-----|
| `--grid-2col` | `1fr 1fr` | Generic 2-col |
| `--grid-3col` | `repeat(3,1fr)` | Service cards, social |
| `--grid-5col` | `repeat(5,1fr)` | Colour swatches |
| `--grid-hero-dark` | `1fr 1fr` | Dark hero layout |
| `--grid-hero-light` | `1.3fr 0.7fr` | Light hero (content + stats) |

### Section Padding Shorthand
| Token | Value |
|-------|-------|
| `--padding-section` | `80px 80px` |
| `--padding-section-lg` | `100px 80px` |

---

## 8. Decorative & Brand Tokens

### Section Label
| Token | Value |
|-------|-------|
| `--section-label-line-width` | `28px` |
| `--section-label-line-height` | `1px` |
| `--section-label-gap` | `14px` |

### Logo
| Token | Value |
|-------|-------|
| `--logo-accent-color` | `#F5A623` |
| `--logo-letter-spacing` | `-0.01em` |

### Card Ghost Number
| Token | Value |
|-------|-------|
| `--card-num-size` | `80px` |
| `--card-num-opacity` | `0.03` |
| `--card-num-color` | `white` |
| `--card-num-kerning` | `-0.05em` |

### Hero Ambient Glow
| Token | Value |
|-------|-------|
| `--hero-glow-size` | `700px` |
| `--hero-glow-color` | `rgba(245,166,35,0.08)` |
| `--hero-glow-top` | `-150px` |
| `--hero-glow-left` | `-100px` |

### Watermark R
| Token | Value |
|-------|-------|
| `--watermark-size` | `500px` |
| `--watermark-color` | `rgba(255,255,255,0.025)` |

### Gradient
| Token | Value |
|-------|-------|
| `--gradient-gold-rule` | `linear-gradient(to right, #F5A623, transparent)` |

---

## 9. Component Tokens

### Buttons — Gold (Primary CTA)
| Token | Value |
|-------|-------|
| `--btn-gold-bg` | `#F5A623` |
| `--btn-gold-color` | `#0A0A0A` |
| `--btn-gold-font` | `DM Sans` |
| `--btn-gold-size` | `11px` |
| `--btn-gold-weight` | `500` |
| `--btn-gold-spacing` | `0.20em` |
| `--btn-gold-padding` | `16px 32px` |
| `--btn-gold-radius` | `0` |

### Buttons — Dark (Secondary CTA)
| Token | Value |
|-------|-------|
| `--btn-dark-bg` | `#0A0A0A` |
| `--btn-dark-color` | `#FAFAFA` |
| `--btn-dark-font` | `DM Sans` |
| `--btn-dark-size` | `11px` |
| `--btn-dark-weight` | `500` |
| `--btn-dark-spacing` | `0.20em` |
| `--btn-dark-padding` | `14px 28px` |
| `--btn-dark-radius` | `0` |

### Navigation
| Token | Value |
|-------|-------|
| `--nav-color` | `rgba(255,255,255,0.28)` |
| `--nav-color-active` | `#F5A623` |
| `--nav-color-hover` | `#F5A623` |
| `--nav-font` | `DM Sans` |
| `--nav-size` | `11px` |
| `--nav-spacing` | `0.16em` |
| `--nav-gap` | `36px` |

### Service Cards
| Token | Value |
|-------|-------|
| `--card-bg` | `#111111` |
| `--card-bg-hover` | `#161616` |
| `--card-padding` | `48px 40px` |
| `--card-accent-width` | `3px` |
| `--card-accent-color` | `#F5A623` |
| `--card-heading-color` | `white` |
| `--card-heading-accent` | `#F5A623` (italic span) |
| `--card-body-color` | `rgba(255,255,255,0.38)` |
| `--card-body-weight` | `300` |
| `--card-gap` | `2px` |

### Social Cards
| Token | Value |
|-------|-------|
| `--social-dark-bg` | `#0A0A0A` |
| `--social-dark-quote` | `white` |
| `--social-dark-deco-opacity` | `0.04` |
| `--social-gold-bg` | `#F5A623` |
| `--social-gold-quote` | `#0A0A0A` |
| `--social-gold-deco-opacity` | `0.08` |
| `--social-outline-bg` | `transparent` |
| `--social-outline-border` | `2px solid #1C1C1C` |
| `--social-outline-quote` | `#1C1C1C` |
| `--social-card-padding` | `40px` |
| `--social-deco-size` | `200px` |

### Stats Block
| Token | Value |
|-------|-------|
| `--stat-accent-border` | `2px solid #F5A623` |
| `--stat-indent` | `20px` |
| `--stat-num-font` | `Georgia` |
| `--stat-num-size` | `64px` |
| `--stat-num-kern` | `-0.03em` |
| `--stat-num-color` | `#1C1C1C` |
| `--stat-num-accent` | `#F5A623` |
| `--stat-label-font` | `DM Sans` |
| `--stat-label-size` | `11px` |
| `--stat-label-spacing` | `0.18em` |
| `--stat-label-color` | `#9A9590` |
| `--stat-block-gap` | `36px` |
