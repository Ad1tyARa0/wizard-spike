/**
 * Theme preset #1 — `minimal` (Exaggerated Minimalism).
 *
 * The original hard-coded design language (design-system/e-commerce-website/
 * MASTER.md, tokens.css / tokens.ts). Every value below mirrors the previous
 * static tokens so `theme: "minimal"` renders visually identical to the
 * pre-config storefront.
 */
import type { LayoutFlags, ThemeContent, ThemePresetName, TokenSet } from '../theme-types';

export const MINIMAL_TOKENS: TokenSet = {
  colors: {
    primary: '#000000',
    onPrimary: '#ffffff',
    background: '#ffffff',
    foreground: '#000000',
    accent: '#d4af37',
    accentStrong: '#8a6d1f',
    onAccent: '#000000',
    secondary: '#f5f5f4',
    onSecondary: '#000000',
    muted: '#a8a29e',
    mutedForeground: '#57534e',
    border: '#000000',
    destructive: '#dc2626',
    onDestructive: '#ffffff',
    ring: '#a87c0e',
    heroAccent: '#d4af37',
  },
  fonts: {
    display: "'Montserrat Variable', system-ui, sans-serif",
    editorial: "'Cormorant Variable', Georgia, serif",
    heading: "'Montserrat Variable', system-ui, sans-serif",
    condensed: "'Montserrat Variable', system-ui, sans-serif",
    body: "'Montserrat Variable', system-ui, sans-serif",
  },
  type: {
    giant: 'clamp(3rem, 10vw, 12rem)',
    display: 'clamp(2.25rem, 5vw, 4.5rem)',
    heading: 'clamp(1.5rem, 2.5vw, 2rem)',
    body: '1rem',
    bodyLg: '1.125rem',
    label: '0.8125rem',
  },
  weights: {
    black: 900,
    bold: 700,
    medium: 500,
    regular: 400,
    light: 300,
  },
  tracking: {
    tight: '-0.05em',
    label: '0.08em',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '24px',
    lg: '48px',
    xl: '96px',
    '2xl': '128px',
    huge: '8rem',
  },
  radius: {
    none: '0',
    sm: '2px',
    button: '4px',
    card: '0',
    pill: '999px',
  },
  motion: {
    durationFast: '150ms',
    durationBase: '250ms',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  icon: {
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
    containerMax: '1440px',
    headerHeight: '64px',
  },
};

export const MINIMAL_LAYOUT: LayoutFlags = {
  headerStyle: 'slim',
  gridDensity: 'comfortable',
  // Portrait 4:5 product-card crop (improved card composition — see
  // design-system/e-commerce-website/MASTER.md → Product card).
  cardAspectRatio: 'portrait',
  homeSectionOrder: ['hero', 'featuredCollection', 'recommendedProducts'],
};

/**
 * Content defaults are deliberately NEUTRAL (no brand copy): merchant-facing
 * copy lives in hydrogen.config.json, which the wizard (Layer 1) writes.
 * Empty hero fields fall back to live Shopify shop data at render time
 * (shop.name / shop.description), so production never ships demo copy.
 */
export const MINIMAL_CONTENT: ThemeContent = {
  nav: [],
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

export const MINIMAL_PRESET: {
  name: ThemePresetName;
  tokens: TokenSet;
  layout: LayoutFlags;
  content: ThemeContent;
} = {
  name: 'minimal',
  tokens: MINIMAL_TOKENS,
  layout: MINIMAL_LAYOUT,
  content: MINIMAL_CONTENT,
};
