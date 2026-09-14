/**
 * Theme preset #1 — `minimal` (Exaggerated Minimalism).
 *
 * 70/20/10 "Rye Island" system: 70% canvas (#F1F2F4), 20% structure
 * (#20242B), 10% accent (#6C757D). Zero corner radius, no shadows, 1px
 * structure borders, Inter display + Space Mono technical metadata.
 */
import type { LayoutFlags, ThemeContent, ThemePresetName, TokenSet } from '../theme-types';

export const MINIMAL_TOKENS: TokenSet = {
  colors: {
    primary: '#20242B',
    onPrimary: '#F1F2F4',
    background: '#F1F2F4',
    foreground: '#20242B',
    accent: '#6C757D',
    accentStrong: '#50585E',
    onAccent: '#FFFFFF',
    secondary: '#FFFFFF',
    onSecondary: '#20242B',
    muted: '#5F6773',
    mutedForeground: '#5F6773',
    border: '#20242B26',
    destructive: '#DC2626',
    onDestructive: '#FFFFFF',
    ring: '#20242B',
    heroAccent: '#6C757D',
  },
  fonts: {
    display: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    editorial: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    condensed: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter Variable', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'Space Mono', 'Courier New', monospace",
  },
  type: {
    giant: 'clamp(3rem, 10vw, 12rem)',
    display: 'clamp(2.25rem, 5vw, 4.5rem)',
    heading: 'clamp(1.5rem, 2.5vw, 2rem)',
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
    tight: '-0.04em',
    label: '0.12em',
  },
  space: {
    '0-5': '2px',
    '1': '4px',
    '1-5': '6px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '6': '24px',
    '8': '32px',
    '11': '44px',
    '12': '48px',
    '16': '64px',
    '24': '96px',
    '32': '128px',
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
    sm: '0',
    button: '0',
    card: '0',
    pill: '0',
  },
  motion: {
    durationFast: '150ms',
    durationBase: '250ms',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
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
