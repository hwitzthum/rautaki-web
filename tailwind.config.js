/** @type {import('tailwindcss').Config} */

// Rautaki — Tailwind CSS v3 configuration
// All values derived from docs/design/tokens.json and docs/design/tokens.css
// Run: npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

module.exports = {
  content: [
    './**/*.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Add framework-specific paths here when adopted, e.g.:
    // './templates/**/*.html',  (Jinja/Django)
    // './src/**/*.{jsx,tsx,vue}',
  ],

  // The brand is predominantly dark-surface — disable class-based dark mode
  // until a light/dark toggle is implemented.
  // darkMode: 'class',

  theme: {
    // ─── Override defaults entirely ──────────────────────────────────────────
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Primitives
      gold: {
        DEFAULT: '#F5A623',
        light:   '#FFD07A',
        deep:    '#B87400',
        dim:     'rgba(245, 166, 35, 0.15)',
        glow:    'rgba(245, 166, 35, 0.08)',
      },
      obsidian:   '#0A0A0A',
      ink:        '#1C1C1C',
      charcoal:   '#111111',
      'charcoal-hover': '#161616',
      white:      '#FAFAFA',
      cream:      '#F4F2EE',
      'warm-grey':'#E8E5DF',
      'mid-grey': '#9A9590',

      // Semantic aliases — use these in components
      accent: {
        DEFAULT: '#F5A623',   // gold
        light:   '#FFD07A',
      },
      surface: {
        dark:  '#0A0A0A',
        light: '#FAFAFA',
        cream: '#F4F2EE',
        warm:  '#E8E5DF',
        card:  '#111111',
      },
    },

    fontFamily: {
      serif: ['Georgia', 'Times New Roman', 'serif'],
      ui:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],  // Tailwind alias
      mono:  ['Menlo', 'Consolas', 'monospace'],
    },

    fontWeight: {
      light:   '300',
      normal:  '400',
      medium:  '500',
      // DM Sans is loaded at 300/400/500 only.
      // Do not use semibold (600) or bold (700).
    },

    // fontSize: [size, { lineHeight, letterSpacing }]
    fontSize: {
      'hero': ['88px',  { lineHeight: '1.0',  letterSpacing: '-0.04em' }],
      'd1':   ['64px',  { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
      'h1':   ['48px',  { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      'h2':   ['36px',  { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      'h3':   ['26px',  { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      'h4':   ['20px',  { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      'lead': ['18px',  { lineHeight: '1.75', letterSpacing: '0em' }],
      'body': ['15px',  { lineHeight: '1.75', letterSpacing: '0em' }],
      'sm':   ['13px',  { lineHeight: '1.75', letterSpacing: '0em' }],
      'xs':   ['11px',  { lineHeight: '1.5',  letterSpacing: '0.18em' }],
      // Logo sizes
      'logo-xl': ['56px', { lineHeight: '1', letterSpacing: '-0.01em' }],
      'logo-md': ['36px', { lineHeight: '1', letterSpacing: '-0.01em' }],
      'logo-sm': ['24px', { lineHeight: '1', letterSpacing: '-0.01em' }],
      'logo-xs': ['18px', { lineHeight: '1', letterSpacing: '-0.01em' }],
    },

    lineHeight: {
      display: '1.0',
      heading: '1.15',
      subhead: '1.25',
      body:    '1.75',
      ui:      '1.5',
      loose:   '1.8',
      card:    '1.45',
      none:    '1',
    },

    letterSpacing: {
      tighter:      '-0.04em',   // hero
      tight:        '-0.03em',   // h1, d1
      'tight-h2':   '-0.02em',
      'tight-h3':   '-0.015em',
      'tight-h4':   '-0.01em',
      normal:        '0em',
      'wide-btn':    '0.20em',
      'wide-label':  '0.22em',   // section labels, tagline
      'wide-mid':    '0.18em',   // stat labels
      'wide-tight':  '0.12em',   // email header
      'wide-nav':    '0.16em',
      'wide-footer': '0.15em',
    },

    // Full 4px-base spacing scale matching tokens.css --space-* values
    spacing: {
      px:  '1px',
      0:   '0px',
      1:   '4px',
      2:   '8px',
      3:   '12px',
      4:   '16px',
      5:   '20px',
      6:   '24px',
      7:   '28px',
      8:   '32px',
      9:   '36px',
      10:  '40px',
      11:  '44px',
      12:  '48px',
      14:  '56px',
      15:  '60px',
      16:  '64px',
      20:  '80px',
      24:  '96px',
      25:  '100px',
      28:  '112px',
      32:  '128px',
      36:  '144px',
      40:  '160px',
      44:  '176px',
      48:  '192px',
    },

    borderRadius: {
      none:   '0',     // Brand default — all structural elements are sharp
      full:   '9999px', // Pill badges only — use sparingly
    },

    borderWidth: {
      DEFAULT: '1px',
      0:  '0',
      2:  '2px',
      3:  '3px',   // gold-rule width
    },

    boxShadow: {
      none:  'none',
      email: '0 24px 80px rgba(0, 0, 0, 0.14)',
      card:  '0 8px 32px rgba(0, 0, 0, 0.10)',
      modal: '0 32px 96px rgba(0, 0, 0, 0.20)',
    },

    screens: {
      'sm':  '480px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1440px',
    },

    transitionDuration: {
      instant: '80ms',
      fast:    '150ms',
      DEFAULT: '200ms',
      slow:    '400ms',
      xslow:   '600ms',
    },

    transitionTimingFunction: {
      DEFAULT:   'ease',
      'out':     'cubic-bezier(0.16, 1, 0.3, 1)',
      'in-out':  'cubic-bezier(0.45, 0, 0.55, 1)',
      'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },

    zIndex: {
      below:    '-1',
      0:        '0',
      raised:   '1',
      dropdown: '10',
      sticky:   '20',
      overlay:  '30',
      modal:    '40',
      toast:    '50',
    },

    maxWidth: {
      content: '1440px',
      reading: '720px',
      email:   '640px',
      narrow:  '400px',
      none:    'none',
    },

    // ─── Extend — add to Tailwind's defaults ─────────────────────────────────
    extend: {
      // Background image utilities for the gold gradient rule
      backgroundImage: {
        'gold-rule': 'linear-gradient(to right, #F5A623, transparent)',
        'gold-glow':
          'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)',
      },

      // Aspect ratio for social cards
      aspectRatio: {
        '1': '1 / 1',
      },

      // Custom grid template columns matching the brand layouts
      gridTemplateColumns: {
        'hero-dark':   '1fr 1fr',
        'hero-light':  '1.3fr 0.7fr',
        'type-scale':  '180px 1fr 120px 140px',
        '5-swatches':  'repeat(5, 1fr)',
      },
    },
  },

  plugins: [
    // Add plugins here as needed, e.g.:
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
};