# Rautaki Accessibility Specification

WCAG AAA is the target. Every component must meet these standards.

---

## Contrast Ratios

| Combination | Ratio | WCAG Level | Use |
|-------------|-------|------------|-----|
| Ink `#1C1C1C` on Cream `#F4F2EE` | 16.7:1 | AAA | Primary body text |
| Ink `#1C1C1C` on White `#FAFAFA` | ~17:1 | AAA | Body text on white sections (calculated) |
| White `#FAFAFA` on Obsidian `#0A0A0A` | 19.4:1 | AAA | Headings on dark surfaces |
| Gold `#F5A623` on Obsidian `#0A0A0A` | 6.8:1 | AA large | Gold accent — large text only (18px+ / 14px bold+) |
| Ink `#1C1C1C` on Gold `#F5A623` | 6.9:1 | AA | Text on gold CTA blocks |
| `white/45` on Obsidian | ~5.5:1 | AA | Body text on dark — acceptable at 15px |
| `white/28` on Obsidian | ~3:1 | FAIL body | Decorative/non-essential only (nav, contact) |
| `white/20` on Obsidian | ~2.5:1 | FAIL | Footer copy, email labels — non-essential only |
| Mid Grey `#9A9590` on Cream `#F4F2EE` | ~3.4:1 | AA large | Captions, labels — large or non-essential |
| Mid Grey `#9A9590` on Warm Grey `#E8E5DF` | ~2.5:1 | FAIL body | Labels only, at 11px uppercase |

### Rules

- **Never** use Gold `#F5A623` as foreground on body-size text (under 18px) — fails AA 4.5:1
- `white/28` is **decorative only** — never for interactive or essential content
- Mid Grey on light surfaces is acceptable for labels/captions (non-essential text at 11px uppercase)
- Always validate new color pairings against WCAG 2.1 requirements before using
- When in doubt, test with a contrast checker — the ratios above are measured values

---

## Focus Management

### Global focus-visible

Define in your global stylesheet:

```css
:focus-visible {
  outline: 2px solid #F5A623;
  outline-offset: 3px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

All interactive elements (links, buttons, inputs) receive a gold outline on keyboard focus.
Mouse-only focus is suppressed to avoid visual noise for pointer users.

### Skip Link

```html
<a href="#main-content" className="skip-to-content">Skip to content</a>
```

```css
.skip-to-content {
  position: fixed;
  left: 12px;
  top: -100%;                      /* hidden off-screen */
  z-index: 9999;
  padding: 12px 20px;
  background: #F5A623;             /* gold */
  color: #0A0A0A;                  /* obsidian */
  font-family: "DM Sans", system-ui, sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  text-decoration: none;
  transition: top 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.skip-to-content:focus {
  top: 12px;                       /* slides into view */
}
```

- Target: `<main id="main-content">` wraps all page content
- Place in the root layout, style in the global stylesheet

---

## Modal Focus Trapping

Required behaviors for any modal:

1. **Focus trap**: Tab/Shift+Tab cycle through focusable elements within the modal only
2. **Escape key**: closes the modal
3. **Auto-focus**: first input receives focus after a short delay (90ms)
4. **Body scroll lock**: `document.body.style.overflow = 'hidden'` while open
5. **ARIA attributes**:
   - `role="dialog"`
   - `aria-modal="true"`
   - `aria-labelledby` pointing to the modal title element
6. **Overlay click**: clicking the backdrop closes the modal
7. **Return focus**: focus returns to the trigger element on close

---

## Reduced Motion

### CSS Global Override

Define in your global stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }

  [data-reveal] {
    opacity: 1;
    transform: none;
  }

  .grain::before {
    display: none;
  }
}
```

### Component-Level Checks

Every animated component must also check at the JavaScript level:

- **ScrollReveal**: checks `window.matchMedia('(prefers-reduced-motion: reduce)')`, sets `data-visible="true"` immediately if matched
- **AnimatedCounter**: checks the same media query, shows the target number without animation
- Both use `useEffect` cleanup to prevent memory leaks on unmount

**Rule**: Any new animated component must implement both the CSS override (automatic via the global stylesheet) AND a JavaScript `matchMedia` check if the animation is driven by JS (requestAnimationFrame, IntersectionObserver triggers, etc.).

---

## Semantic HTML Requirements

### Heading Hierarchy

- Each page has exactly **one `<h1>`**
- Heading levels never skip: `h1 → h2 → h3`, never `h1 → h3`
- Visual size classes are independent of semantic level — using `text-h3` on an `<h2>` is permitted
- The page `<h1>` is typically inside the hero section

### Navigation

- Primary nav: `<nav aria-label="Main navigation">`
- Mobile nav: separate `<nav aria-label="Mobile navigation">` (or shared with visibility toggle)
- Active link: `aria-current="page"` on the link matching the current route
- **Nav focus offset**: 2px (component-specific override of the global 3px default)
- Hamburger button:
  - `aria-expanded="true|false"` reflecting menu state
  - `aria-controls="mobile-menu-id"` linking to the nav element
- Collapsed mobile nav: `aria-hidden="true"` when closed

### Interactive Elements

- **Logo link**: `aria-label="Rautaki — home"`
- **Icon-only buttons**: must have `aria-label` describing the action (e.g., "Open menu", "Close modal")
- **Decorative elements**: `aria-hidden="true"` on:
  - Ghost card numbers
  - Watermark R
  - Gold line spans in SectionLabel
  - Ambient glow div
- **External links**: consider `rel="noopener noreferrer"` and indicating external navigation

### Forms

- Inputs wrapped in explicit `<label>` elements
- Required fields: `aria-required="true"` on the input
- Error messages: container with `role="alert"` for dynamic error states
- Placeholder text supplements labels, never replaces them
- Form submission feedback: success/error states announced to screen readers

### Images

- **Decorative images**: `alt=""` or `aria-hidden="true"` (parallax backgrounds, watermarks)
- **Content images**: descriptive `alt` text
- **Framework image components** (e.g., Next.js `<Image>`): always provide `sizes` prop for responsive loading
- **Icons within buttons**: `aria-hidden="true"` on the icon, label on the button

---

## Testing Checklist

When reviewing or creating web components, verify:

- [ ] **Tab order**: Tab through entire page — focus order is logical, all interactive elements reachable
- [ ] **Focus visible**: Gold outline (2px, 3px offset) appears on every focusable element via keyboard
- [ ] **Skip link**: Tab from page load lands on skip link first, activating it jumps to main content
- [ ] **Screen reader**: Headings, links, buttons, images announced correctly
- [ ] **Heading hierarchy**: One h1 per page, no skipped levels
- [ ] **ARIA attributes**: aria-current on active nav, aria-label on icon buttons, aria-hidden on decorative elements
- [ ] **Reduced motion**: Enable `prefers-reduced-motion: reduce` — no visible animations, content appears immediately
- [ ] **High contrast mode**: Content remains readable in OS high-contrast mode
- [ ] **Zoom 200%**: No content clipping or horizontal scroll at 200% browser zoom
- [ ] **Mobile 320px**: All content accessible and functional at 320px viewport width
- [ ] **Color independence**: Information is not conveyed by color alone
- [ ] **Modal behavior**: Focus trapped, Escape closes, backdrop click closes, focus returns on close
