/**
 * Theme preset #2 — `playful` (Playful DTC, Partake Foods-inspired).
 *
 * Design language master: design-system/e-commerce-website/PLAYFUL-DTC-MASTER.md
 *
 * Cream-dominant paired-hue palette, indigo-navy ink, magenta hero accent,
 * condensed poster display in uppercase, rounded product surfaces with square
 * buttons, banded full-bleed sections, marquee motion, sticker-style hover.
 *
 * FONTS (all Google Fonts — redistributable): Archivo Black (display),
 * Anton (condensed subheads + marquee), Fredoka (headings), Manrope (body).
 * Replaces Partake's proprietary faces (Toroka/Bunch/Gilroy).
 */
import type { LayoutFlags, ThemeContent, ThemePresetName, TokenSet } from '../theme-types';

export const PLAYFUL_TOKENS: TokenSet = {
  colors: {
    primary: '#181b48', // indigo-navy ink
    onPrimary: '#fff6eb', // cream
    background: '#fff6eb', // cream — dominant surface
    foreground: '#181b48',
    accent: '#be008b', // magenta hero accent
    accentStrong: '#be008b', // passes 4.5:1 on the cream surface
    onAccent: '#fff6eb',
    secondary: '#e6edff', // light indigo wash
    onSecondary: '#181b48',
    muted: '#8f93ae',
    mutedForeground: '#575c7d',
    border: '#181b48',
    destructive: '#c62828',
    onDestructive: '#fff6eb',
    ring: '#be008b',
    heroAccent: '#be008b',
  },
  fonts: {
    display: "'Archivo Black', system-ui, sans-serif",
    editorial: "'Manrope Variable', system-ui, sans-serif",
    heading: "'Fredoka Variable', system-ui, sans-serif",
    condensed: "'Anton', system-ui, sans-serif",
    body: "'Manrope Variable', system-ui, sans-serif",
    mono: "'Space Mono', 'Courier New', monospace",
  },
  type: {
    giant: 'clamp(2.5rem, 8vw, 7rem)',
    hero: 'clamp(2.5rem, 8vw, 6rem)',
    display: 'clamp(2rem, 5.5vw, 4rem)',
    heading: 'clamp(1.25rem, 2.5vw, 2rem)',
    body: '1rem',
    bodyLg: '1.125rem',
    label: '0.8125rem',
    labelLg: '0.875rem',
    labelSm: '0.75rem',
    labelXs: '0.625rem',
  },
  weights: {
    black: 900,
    bold: 700,
    medium: 500,
    regular: 400,
    light: 300,
  },
  tracking: {
    tight: '-0.02em',
    label: '0.08em',
  },
  space: {
    '0-5': '2px',
    '1': '4px',
    '1-5': '6px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '7': '28px',
    '8': '32px',
    '9': '36px',
    '10': '40px',
    '11': '44px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
    '32': '128px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
    '2xl': '96px',
    huge: '6rem',
  },
  radius: {
    none: '0',
    sm: '4px',
    button: '0',
    card: '2rem',
    pill: '999px',
  },
  motion: {
    durationFast: '200ms',
    durationBase: '350ms',
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  icon: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    sm: '375px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },
  zIndex: {
    base: 0,
    sticky: 10,
    overlay: 20,
    drawer: 40,
    modal: 100,
  },
  layout: {
    containerMax: '80rem',
    headerHeight: '72px',
  },
};

export const PLAYFUL_LAYOUT: LayoutFlags = {
  headerStyle: 'chunky',
  gridDensity: 'compact',
  // Square product cards — rounded-square surfaces are part of the playful
  // language; revisit after the minimal card is settled.
  cardAspectRatio: 'square',
  homeSectionOrder: ['hero', 'marquee', 'featuredCollection', 'recommendedProducts'],
};

/**
 * Content defaults are deliberately NEUTRAL (no brand copy): merchant-facing
 * copy lives in hydrogen.config.json, which the wizard (Layer 1) writes.
 * Empty hero fields fall back to live Shopify shop data at render time;
 * an empty marquee simply renders no banner.
 */
export const PLAYFUL_CONTENT: ThemeContent = {
  nav: ['Shop All', 'Our Story', 'Journal'],
  footer: [],
  hero: {
    eyebrow: '',
    statement: '',
    sub: '',
    cta: 'Shop now',
    ctaHref: '/collections/all',
    image: '',
  },
  marquee: {
    items: [],
    direction: 'left',
    speed: 'default',
  },
};

export const PLAYFUL_PRESET: {
  name: ThemePresetName;
  tokens: TokenSet;
  layout: LayoutFlags;
  content: ThemeContent;
} = {
  name: 'playful',
  tokens: PLAYFUL_TOKENS,
  layout: PLAYFUL_LAYOUT,
  content: PLAYFUL_CONTENT,
};
