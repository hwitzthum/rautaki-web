 Rautaki Website Enhancement Plan                                                                                                                                 │
│                                                                                                                                                                  │
│ Context                                                                                                                                                          │
│                                                                                                                                                                  │
│ The Rautaki website was implemented from a design spec and is structurally sound, but reads as a generic AI-generated template rather than a premium consultancy │
│  site. Three independent analyses (codebase audit, modern design research, devil's advocate review) converged on the same core problems: monotonous section      │
│ rhythm, zero motion/animation, identical inner-page heroes, bare footer, broken card affordances, accessibility failures, and copy that never mentions AI        │
│ despite Rautaki being an AI consultancy.                                                                                                                         │
│                                                                                                                                                                  │
│ Goal: Transform the site into a premium, bespoke consultancy website with editorial quality, restrained motion design, and AI-specific positioning — while       │
│ preserving the existing brand colors, fonts, sharp-edge aesthetic, and token system.                                                                             │
│                                                                                                                                                                  │
│ Constraints preserved: Colors (obsidian/cream/white/gold/ink), fonts (DM Sans + Georgia), sharp edges (no border-radius), gold italic <em> device (reduced from  │
│ 15+ to ~6 uses), 5-page structure.                                                                                                                               │
│                                                                                                                                                                  │
│ ---                                                                                                                                                              │
│ Phase 1: Foundation                                                                                                                                              │
│                                                                                                                                                                  │
│ Infrastructure that all later phases depend on.                                                                                                                  │
│                                                                                                                                                                  │
│ 1.1 src/app/globals.css — Add animation infrastructure                                                                                                           │
│                                                                                                                                                                  │
│ - CSS keyframes: fade-up, fade-in, scale-up, clip-reveal, glow-drift                                                                                             │
│ - CSS custom properties: --ease-out-expo, --ease-spring                                                                                                          │
│ - .grain::before — subtle SVG noise overlay for obsidian sections (3.5% opacity)                                                                                 │
│ - .text-fluid-hero — clamp(44px, 8vw, 88px) fluid hero type                                                                                                      │
│ - .nav-link-sweep — gold underline sweep on nav hover via ::after                                                                                                │
│ - .skip-to-content — accessible skip link styling                                                                                                                │
│ - [data-visible="true"] — ScrollReveal target state                                                                                                              │
│ - html { scroll-behavior: smooth }                                                                                                                               │
│ - Date/time input styling for BookingModal                                                                                                                       │
│ - Update prefers-reduced-motion block to suppress grain                                                                                                          │
│                                                                                                                                                                  │
│ 1.2 New: src/components/ScrollReveal.tsx                                                                                                                         │
│                                                                                                                                                                  │
│ - Client component, wraps children with IntersectionObserver                                                                                                     │
│ - Triggers data-visible="true" on first intersection                                                                                                             │
│ - Props: delay (stagger ms), threshold, className                                                                                                                │
│ - Starts at opacity: 0; translateY(24px), reveals to normal                                                                                                      │
│ - Respects prefers-reduced-motion (shows immediately)                                                                                                            │
│                                                                                                                                                                  │
│ 1.3 New: src/components/AnimatedCounter.tsx                                                                                                                      │
│                                                                                                                                                                  │
│ - Client component for stat count-up animation                                                                                                                   │
│ - Props: target (number), suffix, duration (default 1200ms)                                                                                                      │
│ - IntersectionObserver triggers count from 0 to target                                                                                                           │
│ - Ease-out cubic via requestAnimationFrame                                                                                                                       │
│ - Shows final number immediately if prefers-reduced-motion                                                                                                       │
│                                                                                                                                                                  │
│ 1.4 src/app/layout.tsx                                                                                                                                           │
│                                                                                                                                                                  │
│ - Add <a href="#main-content" className="skip-to-content">Skip to content</a>                                                                                    │
│ - Wrap {children} in <main id="main-content">                                                                                                                    │
│ - Expand metadata with Open Graph tags, "AI" in title/description                                                                                                │
│                                                                                                                                                                  │
│ ---                                                                                                                                                              │
│ Phase 2: Shared Components                                                                                                                                       │
│                                                                                                                                                                  │
│ 2.1 src/components/Navigation.tsx — Full rewrite                                                                                                                 │
│                                                                                                                                                                  │
│ - Show on ALL pages (remove if (pathname === "/") return null)                                                                                                   │
│ - position: fixed, transparent at top, bg-obsidian/95 backdrop-blur-sm on scroll                                                                                 │
│ - Scroll-direction aware: hide on scroll-down, reveal on scroll-up                                                                                               │
│ - Gold underline sweep on hover via .nav-link-sweep class                                                                                                        │
│ - Fix contrast: text-white/60 (was /28, ~1.5:1 ratio — now ~7:1)                                                                                                 │
│ - Fix mobile padding: px-6 sm:px-10 lg:px-20 (was px-20 everywhere)                                                                                              │
│ - Mobile menu: CSS max-h transition instead of conditional render (slide-down animation)                                                                         │
│                                                                                                                                                                  │
│ 2.2 src/components/Footer.tsx — Expand to 3-column                                                                                                               │
│                                                                                                                                                                  │
│ - Col 1: Logo + tagline + short AI descriptor                                                                                                                    │
│ - Col 2: "Navigate" — Services, Work, About, Contact links                                                                                                       │
│ - Col 3: "Connect" — email, Zurich address, LinkedIn                                                                                                             │
│ - Bottom bar: Copyright left, Privacy/Imprint links right                                                                                                        │
│ - Add grain texture overlay                                                                                                                                      │
│ - Keep obsidian bg + 3px gold border-top                                                                                                                         │
│                                                                                                                                                                  │
│ 2.3 src/components/Button.tsx — Expand                                                                                                                           │
│                                                                                                                                                                  │
│ - Add ghost variant (outline, transparent bg)                                                                                                                    │
│ - Add :active press state (scale(0.98))                                                                                                                          │
│ - Add optional trailing arrow icon                                                                                                                               │
│                                                                                                                                                                  │
│ 2.4 GoldRule usage reduction (across all pages)                                                                                                                  │
│                                                                                                                                                                  │
│ - Keep 3 of 11 instances (before key CTAs only)                                                                                                                  │
│ - Remove 8 — let bg color changes and whitespace create separation                                                                                               │
│                                                                                                                                                                  │
│ 2.5 New: src/data/services.tsx — Shared service data                                                                                                             │
│                                                                                                                                                                  │
│ - Single source of truth for service data (currently duplicated in ServiceCards.tsx and services/page.tsx)                                                       │
│ - Export typed ServiceData[] with id, slug, titles, descriptions, images                                                                                         │
│                                                                                                                                                                  │
│ 2.6 src/components/ServiceCard.tsx                                                                                                                               │
│                                                                                                                                                                  │
│ - Add href prop — cards become clickable links                                                                                                                   │
│ - Add translateY(-2px) lift on hover                                                                                                                             │
│ - Fix description contrast: text-white/55 (was /38)                                                                                                              │
│                                                                                                                                                                  │
│ 2.7 src/components/ServiceCards.tsx                                                                                                                              │
│                                                                                                                                                                  │
│ - Import from shared @/data/services.tsx                                                                                                                         │
│ - Wrap each card in ScrollReveal with staggered delay                                                                                                            │
│ - Increase section padding to py-28                                                                                                                              │
│                                                                                                                                                                  │
│ 2.8 src/components/ProjectCard.tsx                                                                                                                               │
│                                                                                                                                                                  │
│ - Add href prop for clickable cards                                                                                                                              │
│ - Gold-tinted image overlay on hover (bg-gold/10)                                                                                                                │
│ - "View case study" text reveals on hover                                                                                                                        │
│ - Fix description contrast                                                                                                                                       │
│                                                                                                                                                                  │
│ 2.9 src/components/BookingModal.tsx                                                                                                                              │
│                                                                                                                                                                  │
│ - Overlay fade-in animation (200ms)                                                                                                                              │
│ - Dialog scale-up animation (300ms, spring easing)                                                                                                               │
│ - Required field asterisk indicators                                                                                                                             │
│ - Style native date/time picker indicators                                                                                                                       │
│                                                                                                                                                                  │
│ 2.10 src/components/ContactForm.tsx                                                                                                                              │
│                                                                                                                                                                  │
│ - GDPR consent checkbox before submit                                                                                                                            │
│ - Required field asterisks                                                                                                                                       │
│ - Focus shadow enhancement                                                                                                                                       │
│ - Consistent input background (match BookingModal)                                                                                                               │
│                                                                                                                                                                  │
│ ---                                                                                                                                                              │
│ Phase 3: Home Page                                                                                                                                               │
│                                                                                                                                                                  │
│ 3.1 src/components/HeroDark.tsx — Significant rewrite                                                                                                            │
│                                                                                                                                                                  │
│ - Remove inline nav (Navigation.tsx now handles all pages)                                                                                                       │
│ - Staggered headline entrance: Each line fades up with 80ms delay                                                                                                │
│ - Copy update: "Shaping AI-led strategy." (was "bold" — now signals the firm's focus)                                                                            │
│ - Body copy: Explicitly mentions AI, models, risk, leadership adaptation                                                                                         │
│ - Animated ambient glow: 12s slow drift cycle (was static)                                                                                                       │
│ - Grain texture on the section                                                                                                                                   │
│ - Watermark R: 5% opacity (was 2.5%), subtle scroll parallax                                                                                                     │
│ - CTA box: clip-reveal animation with 400ms delay                                                                                                                │
│ - Fluid hero type: clamp(44px, 8vw, 88px) (was hardcoded breakpoint jump)                                                                                        │
│ - Fix mobile padding: px-6 sm:px-10 lg:px-20                                                                                                                     │
│ - Add pt-24 top padding to clear fixed navigation                                                                                                                │
│                                                                                                                                                                  │
│ 3.2 src/components/StatBlock.tsx                                                                                                                                 │
│                                                                                                                                                                  │
│ - Make "use client" (needs AnimatedCounter)                                                                                                                      │
│ - Replace static numbers with <AnimatedCounter> (counts up on scroll)                                                                                            │
│ - Wrap each stat in ScrollReveal with staggered delay                                                                                                            │
│                                                                                                                                                                  │
│ 3.3 src/app/page.tsx — Restructure                                                                                                                               │
│                                                                                                                                                                  │
│ - Remove the thin "About Rautaki" intro section (filler between hero and services)                                                                               │
│ - Remove 2 of 3 GoldRule instances (keep only before final CTA)                                                                                                  │
│ - Vary padding: Stats py-32, CTA py-36 (was uniform py-20)                                                                                                       │
│ - Grain on CTA section                                                                                                                                           │
│ - CTA copy update: "Is your organisation ready for AI?" + specific subtext about leadership teams                                                                │
│ - Stats labels: Mention AI ("Years of AI & strategy experience")                                                                                                 │
│ - Wrap sections in ScrollReveal                                                                                                                                  │
│                                                                                                                                                                  │
│ ---                                                                                                                                                              │
│ Phase 4: Inner Pages                                                                                                                                             │
│                                                                                                                                                                  │
│ 4.1 src/components/HeroLight.tsx — Differentiate per page                                                                                                        │
│                                                                                                                                                                  │
│ - Remove dangerouslySetInnerHTML — title becomes React.ReactNode                                                                                                 │
│ - Add rightContent?: React.ReactNode prop for distinct right columns per page:                                                                                   │
│   - Services: decorative service name stack in large muted Georgia                                                                                               │
│   - Work: large stat (project count)                                                                                                                             │
│   - About: founder image peek                                                                                                                                    │
│   - Contact: direct email link                                                                                                                                   │
│                                                                                                                                                                  │
│ 4.2 src/app/services/page.tsx                                                                                                                                    │
│                                                                                                                                                                  │
│ - Import service data from shared @/data/services.tsx                                                                                                            │
│ - Distinct hero right column (service keywords)                                                                                                                  │
│ - Vary detail section layouts (not all identical 2-col grids):                                                                                                   │
│   - Service 1: 1.4fr/0.6fr, taller image                                                                                                                         │
│   - Service 2: reversed 0.6fr/1.4fr                                                                                                                              │
│   - Service 3: full-width text with edge-bleeding image                                                                                                          │
│ - Remove mechanical "Service 01/02/03" labels — use service names                                                                                                │
│ - Update copy to mention AI capabilities specifically                                                                                                            │
│ - Add ScrollReveal to detail sections                                                                                                                            │
│ - CTA: "Ready to build your AI strategy?"                                                                                                                        │
│                                                                                                                                                                  │
│ 4.3 src/app/work/page.tsx                                                                                                                                        │
│                                                                                                                                                                  │
│ - Distinct hero right column (project count stat)                                                                                                                │
│ - Featured project layout: first project spans full width with larger image                                                                                      │
│ - Remaining 5 projects in 2-col grid with ScrollReveal stagger                                                                                                   │
│ - Add second testimonial with more specific attribution                                                                                                          │
│ - Update project descriptions with AI references                                                                                                                 │
│ - Grain on testimonial section, increase padding to py-32                                                                                                        │
│ - Fix attribution contrast (text-white/55)                                                                                                                       │
│                                                                                                                                                                  │
│ 4.4 src/app/about/page.tsx                                                                                                                                       │
│                                                                                                                                                                  │
│ - Distinct hero right column (founder image peek)                                                                                                                │
│ - Name the founder (placeholder with TODO comment for real name)                                                                                                 │
│ - Copy mentions AI and the Maori meaning of "Rautaki"                                                                                                            │
│ - Replace cliche values (Clarity/Courage/Commitment) with AI-specific values:                                                                                    │
│   - "Evidence over intuition"                                                                                                                                    │
│   - "Candour under pressure"                                                                                                                                     │
│   - "Execution, not just analysis"                                                                                                                               │
│ - Values cards: add subtle gold top border accent                                                                                                                │
│ - Milestones: Add visual timeline (gold connecting line + dot indicators)                                                                                        │
│ - Remove Location section (duplicates Contact page content)                                                                                                      │
│ - Grain on Values section                                                                                                                                        │
│                                                                                                                                                                  │
│ 4.5 src/app/contact/page.tsx                                                                                                                                     │
│                                                                                                                                                                  │
│ - Distinct hero right column (email link)                                                                                                                        │
│ - Copy mentions AI strategy exploration                                                                                                                          │
│ - Add LinkedIn and response time to contact info                                                                                                                 │
│ - Replace Zurich location section with compact obsidian address strip                                                                                            │
│ - Remove GoldRule                                                                                                                                                │
│                                                                                                                                                                  │
│ ---                                                                                                                                                              │
│ Files Modified Summary                                                                                                                                           │
│                                                                                                                                                                  │
│ ┌─────────────────────────────────┬─────────────────────────────────────────┐                                                                                    │
│ │              File               │                 Action                  │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/globals.css             │ Extend (keyframes, utilities, grain)    │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/layout.tsx              │ Edit (skip link, main wrapper, OG tags) │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/page.tsx                │ Restructure (remove intro, vary rhythm) │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/services/page.tsx       │ Rewrite (varied layouts, shared data)   │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/work/page.tsx           │ Rewrite (featured card, testimonials)   │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/about/page.tsx          │ Rewrite (values, timeline, founder)     │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/app/contact/page.tsx        │ Edit (GDPR, compact location)           │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/Navigation.tsx   │ Full rewrite                            │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/Footer.tsx       │ Full rewrite                            │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/HeroDark.tsx     │ Significant rewrite                     │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/HeroLight.tsx    │ Rewrite (ReactNode title, rightContent) │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/Button.tsx       │ Extend (ghost, active, icon)            │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/StatBlock.tsx    │ Edit (AnimatedCounter, ScrollReveal)    │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/ServiceCard.tsx  │ Edit (href, lift, contrast)             │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/ServiceCards.tsx │ Edit (shared data, ScrollReveal)        │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/ProjectCard.tsx  │ Edit (href, overlay, contrast)          │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/BookingModal.tsx │ Edit (animations, asterisks)            │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/ContactForm.tsx  │ Edit (GDPR, asterisks, styling)         │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/GoldRule.tsx     │ No change (usage reduced in pages)      │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/SectionLabel.tsx │ No change                               │                                                                                    │
│ ├─────────────────────────────────┼─────────────────────────────────────────┤                                                                                    │
│ │ src/components/Logo.tsx         │ No change                               │                                                                                    │
│ └─────────────────────────────────┴─────────────────────────────────────────┘                                                                                    │
│                                                                                                                                                                  │
│ ┌────────────────────────────────────┬────────┐                                                                                                                  │
│ │                File                │ Action │                                                                                                                  │
│ ├────────────────────────────────────┼────────┤                                                                                                                  │
│ │ src/components/ScrollReveal.tsx    │ New    │                                                                                                                  │
│ ├────────────────────────────────────┼────────┤                                                                                                                  │
│ │ src/components/AnimatedCounter.tsx │ New    │                                                                                                                  │
│ ├────────────────────────────────────┼────────┤                                                                                                                  │
│ │ src/data/services.tsx              │ New    │                                                                                                                  │
│ └────────────────────────────────────┴────────┘                                                                                                                  │
│                                                                                                                                                                  │
│ ---                                                                                                                                                              │
│ Verification                                                                                                                                                     │
│                                                                                                                                                                  │
│ 1. npm run dev — site loads without errors on all 5 routes                                                                                                       │
│ 2. Scroll animations fire correctly on first intersection, don't re-trigger                                                                                      │
│ 3. Stat counters animate on scroll into view                                                                                                                     │
│ 4. Navigation: transparent at top on home, solid on scroll, hides on scroll-down, appears on scroll-up                                                           │
│ 5. Mobile: hamburger menu slides down/up, padding is correct at 375px                                                                                            │
│ 6. Gold italic <em> appears exactly 6 times across all pages                                                                                                     │
│ 7. Grain texture visible on obsidian sections (subtle at 3.5% opacity)                                                                                           │
│ 8. Hero headline entrance staggers on page load                                                                                                                  │
│ 9. All cards (ServiceCard, ProjectCard) are clickable with hover effects                                                                                         │
│ 10. BookingModal fades in overlay + scales dialog                                                                                                                │
│ 11. Footer has nav links, legal links, social                                                                                                                    │
│ 12. npm run build — no TypeScript/build errors                                                                                                                   │
│ 13. npm run lint — clean                                                                                                                                         │
│ 14. Test prefers-reduced-motion — all animations suppressed, content visible immediately