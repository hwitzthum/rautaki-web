# Rautaki — Component Specifications

> **Tech stack:** Vanilla HTML / CSS / JS — no framework.
> **Dependency:** `docs/design/tokens.css` must be imported before any component stylesheet.
> **Font:** DM Sans loaded from Google Fonts (see style-guide §3).

---

## Contents

1. [Logo](#1-logo)
2. [Section Label](#2-section-label)
3. [Dividers](#3-dividers)
4. [Buttons](#4-buttons)
5. [Navigation Bar](#5-navigation-bar)
6. [Hero — Dark Variant](#6-hero--dark-variant)
7. [Hero — Light Variant](#7-hero--light-variant)
8. [Stats Block](#8-stats-block)
9. [Service Cards](#9-service-cards)
10. [Social Cards](#10-social-cards)
11. [Business Cards](#11-business-cards)
12. [Email Template](#12-email-template)
13. [Footer](#13-footer)
14. [Typography Utilities](#14-typography-utilities)

---

## 1. Logo

### Purpose
The primary brand mark. Always a wordmark — no standalone icon exists.

### Variants
| Class | Size token | Typical context |
|-------|-----------|-----------------|
| `.logo-xl` | `--sz-logo-xl` (56px) | Hero cover, landing hero |
| `.logo-md` | `--sz-logo-md` (36px) | Page headers, hero-light |
| `.logo-sm` | `--sz-logo-sm` (24px) | Navigation, cards, email |
| `.logo-xs` | `--sz-logo-xs` (18px) | Minimum — inline, tight contexts |

### HTML

```html
<!-- On dark background -->
<div class="logo logo-sm" style="color: var(--color-text-on-dark)">
  R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
</div>

<!-- On light background -->
<div class="logo logo-md" style="color: var(--color-text-primary)">
  R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
</div>

<!-- With tagline (logo-md and larger only) -->
<div>
  <div class="logo logo-md" style="color: var(--color-text-primary)">
    R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
  </div>
  <div class="logo-tagline">Strategy · Advisory · Growth</div>
</div>
```

### CSS

```css
.logo {
  font-family: var(--font-serif);
  font-weight: var(--fw-regular);  /* 400 — never change */
  display: inline-block;
  letter-spacing: var(--logo-letter-spacing);  /* -0.01em */
  line-height: 1;
}

.logo-xl  { font-size: var(--sz-logo-xl); }
.logo-md  { font-size: var(--sz-logo-md); }
.logo-sm  { font-size: var(--sz-logo-sm); }
.logo-xs  { font-size: var(--sz-logo-xs); }

.logo-gold { color: var(--logo-accent-color); }  /* #F5A623 */
.logo-base { color: inherit; }

.logo-tagline {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  font-weight: var(--fw-regular);
  letter-spacing: var(--kern-label-wide);  /* 0.22em */
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-top: var(--space-2);  /* 8px */
}
```

### On-gold override

When the logo appears on a gold background (`.on-gold`), the accent letters become *more muted* than the base:

```css
.on-gold .logo-base { color: rgba(0, 0, 0, 0.65); }
.on-gold .logo-gold { color: rgba(0, 0, 0, 0.28); }
```

### Accessibility
- Wrap in `<a href="/">` with `aria-label="Rautaki — home"` when used as site navigation
- The logo is a visual wordmark — no additional `alt` text needed inside the link

---

## 2. Section Label

### Purpose
A small uppercase label that introduces a section. Always has a short gold horizontal rule to its left.

### HTML

```html
<div class="section-label">Typography System — CD / CI</div>

<!-- On dark backgrounds -->
<div class="section-label section-label--dark">Services Template</div>
```

### CSS

```css
.section-label {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);         /* 11px */
  font-weight: var(--fw-medium);   /* 500 */
  letter-spacing: var(--kern-label-wide);  /* 0.22em */
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-10);  /* 40px */
  display: flex;
  align-items: center;
  gap: var(--section-label-gap);   /* 14px */
}

.section-label::before {
  content: '';
  width: var(--section-label-line-width);   /* 28px */
  height: var(--section-label-line-height); /* 1px */
  background: var(--color-gold);
  flex-shrink: 0;
}

/* Dark variant */
.section-label--dark {
  color: rgba(255, 255, 255, 0.18);
}
.section-label--dark::before {
  background: rgba(255, 255, 255, 0.18);
}
```

### Notes
- Always the first element inside a section wrapper, before any content
- Do not omit the `::before` gold line — it is integral to the design language

---

## 3. Dividers

### Purpose
Horizontal rules used as structural separators at section boundaries and within content.

### Variants

**Gold Rule** — 3px gradient fade, section boundary emphasis:
```html
<hr class="gold-rule">
```

```css
hr.gold-rule {
  border: none;
  height: 3px;
  background: var(--gradient-gold-rule);
  /* linear-gradient(to right, var(--color-gold), transparent) */
}
```

**Hair Rule** — 1px subtle, intra-section:
```html
<hr class="hair">
```

```css
hr.hair {
  border: none;
  height: 1px;
  background: var(--color-border-hair);  /* rgba(28,28,28,0.1) */
}
```

### Usage rules
- `hr.gold-rule`: use at the top of major section transitions (e.g., email divider, hero-light top border)
- `hr.hair`: use within sections to separate content groups without adding visual weight

---

## 4. Buttons

### Purpose
Primary calls to action. Two variants: gold (primary) and dark (secondary).

### Variants

#### btn-gold (Primary CTA)
```html
<a href="#" class="btn-gold">Read the full insight →</a>
<button class="btn-gold">Get started</button>
```

```css
.btn-gold {
  display: inline-block;
  background: var(--btn-gold-bg);        /* #F5A623 */
  color: var(--btn-gold-color);          /* #0A0A0A */
  font-family: var(--btn-gold-font);     /* DM Sans */
  font-size: var(--btn-gold-size);       /* 11px */
  font-weight: var(--btn-gold-weight);   /* 500 */
  letter-spacing: var(--btn-gold-spacing); /* 0.20em */
  text-transform: uppercase;
  padding: var(--btn-gold-padding);      /* 16px 32px */
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: var(--radius-none);     /* 0 */
  transition: var(--transition-bg), var(--transition-color);
}

.btn-gold:hover {
  background: var(--color-gold-light);   /* #FFD07A */
}

.btn-gold:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}
```

#### btn-dark (Secondary CTA)
```html
<a href="#" class="btn-dark">Get in touch</a>
```

```css
.btn-dark {
  display: inline-block;
  background: var(--btn-dark-bg);        /* #0A0A0A */
  color: var(--btn-dark-color);          /* #FAFAFA */
  font-family: var(--btn-dark-font);     /* DM Sans */
  font-size: var(--btn-dark-size);       /* 11px */
  font-weight: var(--btn-dark-weight);   /* 500 */
  letter-spacing: var(--btn-dark-spacing); /* 0.20em */
  text-transform: uppercase;
  padding: var(--btn-dark-padding);      /* 14px 28px */
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: var(--radius-none);     /* 0 */
  transition: var(--transition-bg);
}

.btn-dark:hover {
  background: var(--_charcoal);          /* #111111 — slightly lighter black */
}

.btn-dark:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}
```

### States

| State | Gold button | Dark button |
|-------|-------------|-------------|
| Default | Gold bg, Obsidian text | Obsidian bg, White text |
| Hover | Gold-light bg (`#FFD07A`) | Charcoal bg (`#111`) |
| Focus | Gold 2px outline | Gold 2px outline |
| Active | Gold bg, 90% opacity | Obsidian bg, 90% opacity |
| Disabled | 40% opacity, `cursor: not-allowed` | 40% opacity, `cursor: not-allowed` |

### Usage rules
- Use `btn-gold` for the single primary action per section
- Use `btn-dark` for secondary or inverse actions (e.g., inside a gold CTA block)
- Never place two `btn-gold` buttons side by side — choose one primary action
- Buttons must be `<button>` for actions, `<a>` for navigation

---

## 5. Navigation Bar

### Purpose
Horizontal navigation used inside dark hero sections and the site header.

### HTML

```html
<nav class="nav-bar" aria-label="Main navigation">
  <a class="nav-item nav-item--active" href="/">Home</a>
  <a class="nav-item" href="/services">Services</a>
  <a class="nav-item" href="/work">Work</a>
  <a class="nav-item" href="/about">About</a>
  <a class="nav-item" href="/contact">Contact</a>
</nav>
```

### CSS

```css
.nav-bar {
  display: flex;
  gap: var(--nav-gap);           /* 36px */
  font-family: var(--nav-font);  /* DM Sans */
  font-size: var(--nav-size);    /* 11px */
  letter-spacing: var(--nav-spacing); /* 0.16em */
  text-transform: uppercase;
}

.nav-item {
  color: var(--nav-color);       /* rgba(255,255,255,0.28) */
  text-decoration: none;
  cursor: pointer;
  transition: var(--nav-transition);
}

.nav-item:hover,
.nav-item--active {
  color: var(--nav-color-active); /* #F5A623 */
}

.nav-item:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

### Notes
- Dark backgrounds only — this navigation does not have a light variant in the current brand
- For a light-mode sticky header, adapt colours: `color: var(--color-text-secondary)`, hover `color: var(--color-gold)`
- Always mark the current page with `.nav-item--active` and `aria-current="page"`

---

## 6. Hero — Dark Variant

### Purpose
Full-viewport dark hero for the home page. Left panel: logo + headline + body. Right panel: CTA block + navigation.

### HTML

```html
<section class="hero-dark">

  <!-- Left panel -->
  <div class="hero-dark__left">
    <div>
      <div class="logo logo-xl" style="color: var(--color-text-on-dark)">
        R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
      </div>
      <div class="logo-tagline">Strategy · Advisory · Growth</div>
    </div>
    <div>
      <h1 class="hero-h1">Shaping<br><em>bold</em><br>strategy.</h1>
      <p class="hero-body">We partner with organisations ready to think differently — turning complex challenges into clear, decisive direction.</p>
    </div>
  </div>

  <!-- Right panel -->
  <div class="hero-dark__right">
    <div class="cta-block">
      <h3>Begin your strategy</h3>
      <p>Discover how Rautaki can accelerate your next move.</p>
      <a href="/contact" class="btn-dark">Get in touch</a>
    </div>
    <nav class="nav-bar" aria-label="Main navigation">
      <a class="nav-item nav-item--active" href="/">Home</a>
      <a class="nav-item" href="/services">Services</a>
      <a class="nav-item" href="/work">Work</a>
      <a class="nav-item" href="/about">About</a>
      <a class="nav-item" href="/contact">Contact</a>
    </nav>
  </div>

</section>
```

### CSS

```css
.hero-dark {
  background: var(--color-bg-dark);   /* #0A0A0A */
  min-height: 92vh;
  display: grid;
  grid-template-columns: var(--grid-hero-dark);  /* 1fr 1fr */
  position: relative;
  overflow: hidden;
}

/* Ambient radial glow — top-left */
.hero-dark::before {
  content: '';
  position: absolute;
  width: var(--hero-glow-size);   /* 700px */
  height: var(--hero-glow-size);
  border-radius: 50%;
  background: radial-gradient(circle, var(--hero-glow-color) 0%, transparent 70%);
  top: var(--hero-glow-top);      /* -150px */
  left: var(--hero-glow-left);    /* -100px */
  pointer-events: none;
}

.hero-dark__left {
  padding: var(--space-section);  /* 80px */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: var(--border-dark-divider);  /* 1px solid rgba(255,255,255,0.05) */
  z-index: var(--z-raised);
}

.hero-dark__right {
  padding: var(--space-section);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: var(--z-raised);
  position: relative;
}

/* Watermark R letterform */
.hero-dark__right::after {
  content: 'R';
  font-family: var(--font-serif);
  font-size: var(--watermark-size);   /* 500px */
  font-weight: var(--fw-regular);
  color: var(--watermark-color);      /* rgba(255,255,255,0.025) */
  position: absolute;
  top: 50%;
  right: -40px;
  transform: translateY(-50%);
  pointer-events: none;
  letter-spacing: -0.05em;
  line-height: 1;
  z-index: var(--z-below);
}

/* Hero heading */
.hero-h1 {
  font-family: var(--font-serif);
  font-size: var(--sz-hero);          /* 88px */
  font-weight: var(--fw-regular);
  letter-spacing: var(--kern-hero);   /* -0.04em */
  line-height: var(--lh-display);     /* 1.0 */
  color: var(--color-text-on-dark);
  margin-bottom: var(--space-7);      /* 28px */
}
.hero-h1 em {
  font-style: italic;
  color: var(--color-gold);
}

/* Hero body paragraph */
.hero-body {
  font-family: var(--font-ui);
  font-size: var(--sz-body);          /* 15px */
  font-weight: var(--fw-light);       /* 300 */
  line-height: var(--lh-body);        /* 1.75 */
  color: var(--color-text-on-dark-body); /* rgba(255,255,255,0.45) */
  max-width: 400px;
}

/* CTA block (gold fill panel in right column) */
.cta-block {
  background: var(--color-gold);
  padding: var(--space-10);           /* 40px */
  margin-bottom: var(--space-10);
  position: relative;
  z-index: var(--z-raised);
}
.cta-block h3 {
  font-family: var(--font-serif);
  font-size: var(--sz-h3);            /* 26px */
  letter-spacing: var(--kern-h3);     /* -0.015em */
  color: var(--_obsidian);
  margin-bottom: var(--space-2);      /* 8px */
}
.cta-block p {
  font-family: var(--font-ui);
  font-size: var(--sz-sm);            /* 13px */
  color: var(--color-text-on-gold-muted); /* rgba(0,0,0,0.55) */
  margin-bottom: var(--space-5);      /* 20px */
}
```

### Responsive notes
- Below 1024px: stack panels vertically (`grid-template-columns: 1fr`)
- The watermark `::after` R should be hidden at mobile (`display: none`)
- Hero heading drops to `--sz-h1` (48px) at tablet, `--sz-h2` (36px) at mobile

---

## 7. Hero — Light Variant

### Purpose
A lighter hero for inner pages or as an alternative home page treatment. Left panel: logo + headline + body copy. Right panel: stats block.

### HTML

```html
<section class="hero-light">
  <div class="hero-light__content">
    <div class="logo logo-md" style="color: var(--color-text-primary); margin-bottom: var(--space-12);">
      R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
    </div>
    <h1>We don't just <em>advise</em> — we transform.</h1>
    <p>Rautaki partners with leaders who understand that real progress demands courage, clarity, and commitment.</p>
  </div>

  <div class="stat-block">
    <div class="stat">
      <div class="stat-num">12<span>+</span></div>
      <div class="stat-lbl">Years of strategic experience</div>
    </div>
    <div class="stat">
      <div class="stat-num">40<span>+</span></div>
      <div class="stat-lbl">Organisations transformed</div>
    </div>
    <div class="stat">
      <div class="stat-num">3<span>×</span></div>
      <div class="stat-lbl">Average growth acceleration</div>
    </div>
  </div>
</section>
```

### CSS

```css
.hero-light {
  background: var(--color-bg-light);    /* #FAFAFA */
  padding: var(--padding-section-lg);   /* 100px 80px */
  display: grid;
  grid-template-columns: var(--grid-hero-light);  /* 1.3fr 0.7fr */
  gap: var(--space-section);            /* 80px */
  align-items: center;
  border-top: var(--border-gold-rule);  /* 4px solid gold */
}

.hero-light h1 {
  font-family: var(--font-serif);
  font-size: var(--sz-h1);             /* 48px */
  letter-spacing: var(--kern-h1);      /* -0.03em */
  line-height: var(--lh-heading);      /* 1.15 */
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);       /* 24px */
}
.hero-light h1 em {
  font-style: italic;
  color: var(--color-gold);
}

.hero-light p {
  font-family: var(--font-ui);
  font-size: var(--sz-body);           /* 15px */
  font-weight: var(--fw-light);
  line-height: var(--lh-body);
  color: var(--color-text-secondary);
}
```

---

## 8. Stats Block

### Purpose
A vertical stack of metrics — large Georgia numeral with a gold suffix, small uppercase label. Anchored by a 2px gold left border.

### HTML

```html
<div class="stat-block">
  <div class="stat">
    <div class="stat-num">12<span>+</span></div>
    <div class="stat-lbl">Years of strategic experience</div>
  </div>
  <div class="stat">
    <div class="stat-num">40<span>+</span></div>
    <div class="stat-lbl">Organisations transformed</div>
  </div>
  <div class="stat">
    <div class="stat-num">3<span>×</span></div>
    <div class="stat-lbl">Average growth acceleration</div>
  </div>
</div>
```

### CSS

```css
.stat-block {
  display: flex;
  flex-direction: column;
  gap: var(--stat-block-gap);          /* 36px */
}

.stat {
  padding-left: var(--stat-indent);    /* 20px */
  border-left: var(--stat-accent-border); /* 2px solid gold */
}

.stat-num {
  font-family: var(--stat-num-font);   /* Georgia */
  font-size: var(--stat-num-size);     /* 64px */
  letter-spacing: var(--stat-num-kern); /* -0.03em */
  line-height: 1;
  color: var(--stat-num-color);        /* #1C1C1C */
}
.stat-num span {
  color: var(--stat-num-accent);       /* gold for +, × suffixes */
}

.stat-lbl {
  font-family: var(--stat-label-font); /* DM Sans */
  font-size: var(--stat-label-size);   /* 11px */
  letter-spacing: var(--stat-label-spacing); /* 0.18em */
  text-transform: uppercase;
  color: var(--stat-label-color);      /* #9A9590 */
  margin-top: var(--space-1);          /* 4px */
}
```

---

## 9. Service Cards

### Purpose
A three-column dark grid showcasing services. Each card has a ghost ordinal number, a serif heading with a gold italic accent, and a body paragraph. On hover, a gold left-border reveals from top to bottom.

### HTML

```html
<section class="cards-section">
  <div class="section-label section-label--dark">Services</div>

  <div class="cards-grid">

    <article class="card">
      <div class="card-num" aria-hidden="true">01</div>
      <h3>Strategic <span>Vision</span></h3>
      <p>Aligning your organisation around a shared, ambitious direction that drives every decision from the top down.</p>
    </article>

    <article class="card">
      <div class="card-num" aria-hidden="true">02</div>
      <h3><span>Advisory</span> &amp; Counsel</h3>
      <p>Trusted guidance for leadership teams navigating change, complexity, and high-stakes decisions.</p>
    </article>

    <article class="card">
      <div class="card-num" aria-hidden="true">03</div>
      <h3>Growth <span>Activation</span></h3>
      <p>Turning strategy into action with structured programmes that mobilise teams and accelerate outcomes.</p>
    </article>

  </div>
</section>
```

### CSS

```css
.cards-section {
  background: var(--color-bg-dark);    /* #0A0A0A */
  padding: var(--padding-section);     /* 80px */
}

.cards-grid {
  display: grid;
  grid-template-columns: var(--grid-3col); /* repeat(3, 1fr) */
  gap: var(--space-gap-grid);              /* 2px */
}

.card {
  background: var(--card-bg);          /* #111111 */
  padding: var(--card-padding);        /* 48px 40px */
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background var(--duration-base) var(--ease-default);
}

/* Gold left-border reveal */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--card-accent-width);     /* 3px */
  height: 0;
  background: var(--card-accent-color); /* gold */
  transition: var(--transition-height); /* height 0.4s ease */
}

.card:hover {
  background: var(--card-bg-hover);    /* #161616 */
}

.card:hover::before {
  height: 100%;
}

/* Ghost ordinal number */
.card-num {
  font-family: var(--font-serif);
  font-size: var(--card-num-size);     /* 80px */
  font-weight: var(--fw-regular);
  color: rgba(255, 255, 255, var(--card-num-opacity)); /* 0.03 */
  line-height: 1;
  margin-bottom: -16px;               /* pull the number up behind the heading */
  letter-spacing: var(--card-num-kerning); /* -0.05em */
  pointer-events: none;
  user-select: none;
}

.card h3 {
  font-family: var(--font-serif);
  font-size: var(--sz-h3);            /* 26px */
  letter-spacing: var(--kern-h3);     /* -0.015em */
  color: var(--card-heading-color);   /* white */
  margin-bottom: var(--space-3);      /* 12px */
  font-weight: var(--fw-regular);
}
.card h3 span {
  color: var(--card-heading-accent);  /* gold */
  font-style: italic;
}

.card p {
  font-family: var(--font-ui);
  font-size: var(--sz-sm);            /* 13px */
  line-height: var(--lh-body);        /* 1.75 */
  color: var(--card-body-color);      /* rgba(255,255,255,0.38) */
  font-weight: var(--card-body-weight); /* 300 */
}
```

### States

| State | Change |
|-------|--------|
| Default | Background `#111`, no left border visible |
| Hover | Background `#161616`, gold left-border reveals top→bottom over 400ms |
| Focus (keyboard) | Gold 2px outline, gold left-border at 100% |

### Responsive
- Below 768px: single column (`grid-template-columns: 1fr`)
- Ghost number hidden at small sizes

---

## 10. Social Cards

### Purpose
Square 1:1 aspect ratio cards for social media content. Three variants: Dark, Gold, Outline. Each has a pull quote, logo, and optional ghost R watermark.

### HTML

```html
<div class="social-grid">

  <!-- Dark variant -->
  <div class="social-card social-card--dark">
    <div class="logo logo-sm" style="color: var(--color-text-on-dark)">
      R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
    </div>
    <blockquote class="sc-quote">"Strategy without execution is a dream. Execution without strategy is a nightmare."</blockquote>
    <span class="sc-deco" aria-hidden="true">R</span>
  </div>

  <!-- Gold variant -->
  <div class="social-card social-card--gold">
    <div class="logo logo-sm" style="color: rgba(0,0,0,0.65)">
      R<span class="logo-base">aut</span><span style="color: rgba(0,0,0,0.3)">a</span><span class="logo-base">k</span><span style="color: rgba(0,0,0,0.3)">i</span>
    </div>
    <blockquote class="sc-quote">"The best strategy is the one your whole team believes in."</blockquote>
    <span class="sc-deco" aria-hidden="true">R</span>
  </div>

  <!-- Outline variant -->
  <div class="social-card social-card--outline">
    <div class="logo logo-sm" style="color: var(--color-text-primary)">
      R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
    </div>
    <blockquote class="sc-quote">"Bold thinking. Measured action. Real results."</blockquote>
  </div>

</div>
```

### CSS

```css
.social-grid {
  display: grid;
  grid-template-columns: var(--grid-3col);
  gap: var(--space-gap-loose);  /* 24px */
}

.social-card {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--social-card-padding);   /* 40px */
  position: relative;
  overflow: hidden;
}

/* Dark variant */
.social-card--dark {
  background: var(--social-dark-bg);    /* #0A0A0A */
}
.social-card--dark .sc-quote {
  color: var(--social-dark-quote);      /* white */
}

/* Gold variant */
.social-card--gold {
  background: var(--social-gold-bg);    /* #F5A623 */
}
.social-card--gold .sc-quote {
  color: var(--social-gold-quote);      /* obsidian */
}

/* Outline variant */
.social-card--outline {
  background: var(--social-outline-bg); /* transparent */
  border: var(--social-outline-border); /* 2px solid ink */
}
.social-card--outline .sc-quote {
  color: var(--social-outline-quote);   /* ink */
}

/* Pull quote */
.sc-quote {
  font-family: var(--font-serif);
  font-size: var(--sz-h4);              /* 20px */
  font-style: italic;
  letter-spacing: var(--kern-h4);      /* -0.01em */
  line-height: var(--lh-card);          /* 1.45 */
  margin: 0;
}

/* Ghost R watermark */
.sc-deco {
  position: absolute;
  font-family: var(--font-serif);
  font-size: var(--social-deco-size);   /* 200px */
  line-height: 1;
  bottom: -24px;
  right: -10px;
  letter-spacing: -0.05em;
  pointer-events: none;
  user-select: none;
}
.social-card--dark  .sc-deco { color: white;  opacity: var(--social-dark-deco-opacity); }
.social-card--gold  .sc-deco { color: black;  opacity: var(--social-gold-deco-opacity); }
.social-card--outline .sc-deco { display: none; }
```

---

## 11. Business Cards

### Purpose
Print-ready business card templates. Two variants: Dark (obsidian with gold bottom rule) and Light (white with gold top rule).

### HTML

```html
<div class="bizcard bizcard--dark">
  <div>
    <div class="bc-name">Alex Morgan</div>
    <div class="bc-title">Strategy Director</div>
  </div>
  <div class="bc-bottom">
    <div class="bc-contact">
      alex@rautaki.com<br>
      +64 9 123 4567<br>
      rautaki.com
    </div>
    <div class="logo logo-sm" style="color: var(--color-text-on-dark)">
      R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
    </div>
  </div>
</div>

<div class="bizcard bizcard--light">
  <div>
    <div class="bc-name">Alex Morgan</div>
    <div class="bc-title">Strategy Director</div>
  </div>
  <div class="bc-bottom">
    <div class="bc-contact">
      alex@rautaki.com<br>
      +64 9 123 4567<br>
      rautaki.com
    </div>
    <div class="logo logo-sm" style="color: var(--color-text-primary)">
      R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
    </div>
  </div>
</div>
```

### CSS

```css
.bizcard {
  width: 400px;    /* 85.6mm × 53.98mm — standard card aspect at screen scale */
  height: 230px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: var(--radius-none);
}

/* Dark variant — gold rule at bottom */
.bizcard--dark {
  background: var(--color-bg-dark);
}
.bizcard--dark::after {
  content: '';
  position: absolute;
  height: 3px;
  left: 0; right: 0; bottom: 0;
  background: var(--color-gold);
}
.bizcard--dark .bc-name  { color: var(--color-text-on-dark); }
.bizcard--dark .bc-title { color: var(--color-text-on-dark-secondary); }
.bizcard--dark .bc-contact { color: var(--color-text-on-dark-secondary); }

/* Light variant — gold rule at top */
.bizcard--light {
  background: var(--color-bg-light);
  border: 1px solid rgba(0,0,0,0.1);
}
.bizcard--light::before {
  content: '';
  position: absolute;
  height: 3px;
  left: 0; right: 0; top: 0;
  background: var(--color-gold);
}
.bizcard--light .bc-name  { color: var(--color-text-primary); }
.bizcard--light .bc-title { color: var(--color-text-secondary); }
.bizcard--light .bc-contact { color: var(--color-text-secondary); }

/* Shared type */
.bc-name {
  font-family: var(--font-serif);
  font-size: var(--sz-h4);            /* 20px */
  letter-spacing: var(--kern-h4);
  font-weight: var(--fw-regular);
}
.bc-title {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);            /* 11px */
  letter-spacing: var(--kern-label-mid); /* 0.18em */
  text-transform: uppercase;
  margin-top: var(--space-1);         /* 4px */
}
.bc-contact {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  line-height: var(--lh-loose);       /* 1.9 */
}
.bc-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
```

---

## 12. Email Template

### Purpose
HTML email layout for newsletters and client communications. Max-width 640px, white body, obsidian header.

### HTML

```html
<!-- Email wrapper (set background to #DDD9D0 in email client) -->
<table width="100%" bgcolor="#DDD9D0" cellpadding="40" cellspacing="0" border="0">
  <tr>
    <td align="center">

      <div class="email-wrap">

        <!-- Header -->
        <div class="email-hdr">
          <div class="logo logo-sm" style="color: #FAFAFA;">
            R<span style="color: #FAFAFA;">aut</span><span style="color: #F5A623;">a</span><span style="color: #FAFAFA;">k</span><span style="color: #F5A623;">i</span>
          </div>
          <div class="email-hdr-label">Monthly Insight</div>
        </div>

        <!-- Gold divider -->
        <div style="height: 3px; background: linear-gradient(to right, #F5A623, transparent);"></div>

        <!-- Body -->
        <div class="email-body-wrap">
          <h2>February's <em>strategic</em> focus</h2>
          <p>This month, we're examining how high-performing organisations align leadership teams around a single, unambiguous priority.</p>
          <p>Whether you're navigating growth, restructuring, or preparing for a significant transition, clarity at the top changes everything below it.</p>
          <a href="#" class="btn-gold">Read the full insight →</a>
        </div>

        <!-- Footer -->
        <div class="email-footer">
          © 2025 Rautaki · Strategy Advisory · <a href="https://rautaki.com">rautaki.com</a> · Unsubscribe
        </div>

      </div>

    </td>
  </tr>
</table>
```

### CSS

```css
.email-wrap {
  max-width: var(--layout-max-email);  /* 640px */
  background: var(--color-bg-light);   /* #FAFAFA */
  box-shadow: var(--shadow-email);     /* 0 24px 80px rgba(0,0,0,0.14) */
}

.email-hdr {
  background: var(--color-bg-dark);
  padding: 32px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.email-hdr-label {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  letter-spacing: var(--kern-label-mid); /* 0.18em */
  text-transform: uppercase;
  color: var(--color-text-on-dark-muted); /* rgba(255,255,255,0.2) */
}

.email-body-wrap {
  padding: var(--space-14) var(--space-12);  /* 56px 48px */
}

.email-body-wrap h2 {
  font-family: var(--font-serif);
  font-size: var(--sz-h2);             /* 36px */
  letter-spacing: var(--kern-h2);      /* -0.02em */
  line-height: var(--lh-heading);
  color: var(--color-text-primary);
  margin-bottom: var(--space-5);       /* 20px */
}
.email-body-wrap h2 em {
  font-style: italic;
  color: var(--color-gold);
}

.email-body-wrap p {
  font-family: var(--font-ui);
  font-size: var(--sz-body);           /* 15px */
  line-height: var(--lh-body);
  color: var(--color-text-secondary);
  font-weight: var(--fw-light);
  margin-bottom: var(--space-7);       /* 28px */
}

.email-footer {
  padding: var(--space-6) var(--space-12);  /* 24px 48px */
  border-top: var(--border-subtle);
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  color: var(--color-text-secondary);
  letter-spacing: 0.05em;
}
.email-footer a {
  color: var(--color-gold);
  text-decoration: none;
}
```

### Email-specific notes
- Use inline styles for all critical email styles (many clients strip `<style>` blocks)
- `box-shadow` won't render in Outlook — use a border fallback
- Test in Litmus or Email on Acid before sending
- The gold gradient rule should be a solid `background-color: #F5A623` for Outlook compatibility

---

## 13. Footer

### Purpose
Full-width dark footer with logo on the left, copyright/version text on the right, gold top rule.

### HTML

```html
<footer class="brand-footer">
  <div class="logo logo-sm" style="color: var(--color-text-on-dark)">
    R<span class="logo-base">aut</span><span class="logo-gold">a</span><span class="logo-base">k</span><span class="logo-gold">i</span>
  </div>
  <div class="brand-footer-copy">© 2025 Rautaki · Strategy Advisory</div>
</footer>
```

### CSS

```css
.brand-footer {
  background: var(--color-bg-dark);    /* #0A0A0A */
  padding: var(--space-15) var(--space-section); /* 60px 80px */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: var(--border-gold-rule); /* 3px solid gold */
}

.brand-footer-copy {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  letter-spacing: var(--kern-footer);  /* 0.15em */
  text-transform: uppercase;
  color: var(--color-text-on-dark-muted); /* rgba(255,255,255,0.2) */
}
```

---

## 14. Typography Utilities

### Heading styles

```css
/* Apply these classes to heading elements */

.ts-hero {
  font-family: var(--font-serif);
  font-size: var(--sz-hero);
  letter-spacing: var(--kern-hero);
  line-height: var(--lh-display);
  font-weight: var(--fw-regular);
}

.ts-d1 {
  font-family: var(--font-serif);
  font-size: var(--sz-d1);
  letter-spacing: var(--kern-d1);
  line-height: var(--lh-display);
  font-weight: var(--fw-regular);
}

.ts-h1 { font-size: var(--sz-h1); letter-spacing: var(--kern-h1); font-weight: var(--fw-regular); font-family: var(--font-serif); line-height: var(--lh-heading); }
.ts-h2 { font-size: var(--sz-h2); letter-spacing: var(--kern-h2); font-weight: var(--fw-regular); font-family: var(--font-serif); line-height: var(--lh-heading); }
.ts-h3 { font-size: var(--sz-h3); letter-spacing: var(--kern-h3); font-weight: var(--fw-regular); font-family: var(--font-serif); line-height: var(--lh-heading); }
.ts-h4 { font-size: var(--sz-h4); letter-spacing: var(--kern-h4); font-weight: var(--fw-regular); font-family: var(--font-serif); line-height: var(--lh-subhead); }

.ts-lead {
  font-family: var(--font-serif);
  font-size: var(--sz-lead);
  font-style: italic;
  color: var(--color-text-secondary);
  line-height: var(--lh-body);
}

.ts-body {
  font-family: var(--font-ui);
  font-size: var(--sz-body);
  font-weight: var(--fw-regular);
  line-height: var(--lh-body);
  color: var(--color-text-primary);
}

.ts-sm {
  font-family: var(--font-ui);
  font-size: var(--sz-sm);
  font-weight: var(--fw-regular);
  color: var(--color-text-secondary);
  line-height: var(--lh-body);
}

.ts-label {
  font-family: var(--font-ui);
  font-size: var(--sz-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--kern-label-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  line-height: var(--lh-ui);
}
```

### Inline gold italic

Applied directly to `<em>` within headings. Never applied to `<em>` in body copy — that retains normal italic in the body typeface.

```css
/* Within heading elements only */
.ts-h1 em,
.ts-h2 em,
.ts-h3 em,
.ts-h4 em,
.hero-h1 em {
  font-style: italic;
  color: var(--color-gold);
}
```

### Accessibility note

Do not use heading utility classes as a substitute for semantic HTML. The visual scale and the document outline must agree. `<h2 class="ts-h3">` is valid when you need a visually smaller H2; `<p class="ts-h1">` is not acceptable for content that is actually a heading.