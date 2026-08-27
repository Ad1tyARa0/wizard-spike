/**
 * Design tokens — Exaggerated Minimalism (TypeScript mirror).
 * Source of truth: design-system/e-commerce-website/MASTER.md
 * CSS twin: ./tokens.css
 *
 * Keep in sync with tokens.css. Used for inline styles and JS-driven styling.
 */

export const colors = {
  primary: '#000000',
  onPrimary: '#ffffff',
  background: '#ffffff',
  foreground: '#000000',
  accent: '#d4af37',
  onAccent: '#000000',
  secondary: '#f5f5f4',
  onSecondary: '#000000',
  muted: '#a8a29e',
  mutedForeground: '#57534e',
  border: '#000000',
  destructive: '#dc2626',
  onDestructive: '#ffffff',
  ring: '#d4af37',
} as const;

export const fonts = {
  display: "'Montserrat Variable', system-ui, sans-serif",
  editorial: "'Cormorant Variable', Georgia, serif",
  body: "'Montserrat Variable', system-ui, sans-serif",
} as const;

export const type = {
  giant: 'clamp(3rem, 10vw, 12rem)',
  display: 'clamp(2.25rem, 5vw, 4.5rem)',
  heading: 'clamp(1.5rem, 2.5vw, 2rem)',
  body: '1rem',
  bodyLg: '1.125rem',
  label: '0.8125rem',
} as const;

export const weights = {
  black: 900,
  bold: 700,
  medium: 500,
  regular: 400,
  light: 300,
} as const;

export const tracking = {
  tight: '-0.05em',
  label: '0.08em',
} as const;

export const space = {
  xs: '4px',
  sm: '8px',
  md: '24px',
  lg: '48px',
  xl: '96px',
  '2xl': '128px',
  huge: '8rem',
} as const;

export const radius = {
  none: '0',
  sm: '2px',
} as const;

export const motion = {
  durationFast: '150ms',
  durationBase: '250ms',
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const breakpoints = {
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
} as const;

export const zIndex = {
  base: 0,
  sticky: 10,
  overlay: 20,
  drawer: 40,
  modal: 100,
} as const;

export const layout = {
  containerMax: '1440px',
  headerHeight: '64px',
} as const;
