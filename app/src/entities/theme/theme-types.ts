/**
 * Theme capability — config-driven theming types.
 *
 * The effective theme is always a full, self-contained `ThemeState`:
 *
 *   tokens  = defaults ⊕ preset ⊕ overrides   (resolved by resolveTokens)
 *   layout  = defaults ⊕ preset ⊕ overrides   (layout variant flags)
 *   content = defaults ⊕ preset ⊕ overrides   (nav/footer/hero/marquee copy)
 *
 * See the OpenSpec change `implement-config-driven-theming` and the
 * additive config contract documented in ./theme-schema.ts.
 */

/** Shipped design-language presets. */
export const THEME_PRESET_NAMES = ['minimal', 'playful'] as const;
export type ThemePresetName = (typeof THEME_PRESET_NAMES)[number];

/** Color roles — one complete set per preset (no preset depends on another). */
export interface ColorTokens {
  primary: string;
  onPrimary: string;
  background: string;
  foreground: string;
  accent: string;
  /** Darkened accent for small text (index numerals) — meets 4.5:1 on light surfaces. */
  accentStrong: string;
  onAccent: string;
  secondary: string;
  onSecondary: string;
  muted: string;
  mutedForeground: string;
  border: string;
  destructive: string;
  onDestructive: string;
  ring: string;
  /** Vibrant accent used for statement hovers (e.g. sticker-hover shadow). */
  heroAccent: string;
}

export interface FontTokens {
  display: string;
  editorial: string;
  heading: string;
  condensed: string;
  body: string;
  /** Monospaced face for technical metadata, item IDs, badges, and prices. */
  mono: string;
}

export interface TypeTokens {
  giant: string;
  /** Hero headline — fluid between display and giant. */
  hero: string;
  display: string;
  heading: string;
  body: string;
  bodyLg: string;
  label: string;
  /** 0.875rem — brand wordmark, prominent labels */
  labelLg: string;
  /** 0.75rem — monospace nav + utility labels */
  labelSm: string;
  /** 0.625rem — badges */
  labelXs: string;
}

export interface WeightTokens {
  black: number;
  bold: number;
  medium: number;
  regular: number;
  light: number;
}

export interface TrackingTokens {
  tight: string;
  label: string;
}

export interface SpaceTokens {
  /** Primitive 4px scale (values are fixed across presets). */
  '0-5': string;
  '1': string;
  '1-5': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '16': string;
  '20': string;
  '24': string;
  '32': string;
  /** Semantic aliases (presets may map these differently). */
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  huge: string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  /** Shared button primitive — the app's single CTA corner radius. */
  button: string;
  card: string;
  pill: string;
}

export interface MotionTokens {
  durationFast: string;
  durationBase: string;
  easeOut: string;
}

/** Icon stroke thicknesses — the Phosphor `IconWeight` subset the theme allows. */
export const ICON_WEIGHTS = ['thin', 'light', 'regular', 'bold', 'fill'] as const;
export type IconWeightToken = (typeof ICON_WEIGHTS)[number];

/** Predefined icon scale — sizes xs / sm / md / lg plus the stroke thickness. */
export interface IconTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  weight: IconWeightToken;
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ZIndexTokens {
  base: number;
  sticky: number;
  overlay: number;
  drawer: number;
  modal: number;
}

export interface LayoutTokens {
  containerMax: string;
  headerHeight: string;
}

/** The complete, non-nullable token set every preset defines. */
export interface TokenSet {
  colors: ColorTokens;
  fonts: FontTokens;
  type: TypeTokens;
  weights: WeightTokens;
  tracking: TrackingTokens;
  space: SpaceTokens;
  radius: RadiusTokens;
  motion: MotionTokens;
  icon: IconTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
  layout: LayoutTokens;
}

/** Merchant-facing partial token overrides (config `design` section). */
export type DesignOverrides = {
  colors?: Partial<ColorTokens>;
  fonts?: Partial<FontTokens>;
  type?: Partial<TypeTokens>;
  weights?: Partial<WeightTokens>;
  tracking?: Partial<TrackingTokens>;
  space?: Partial<SpaceTokens>;
  radius?: Partial<RadiusTokens>;
  motion?: Partial<MotionTokens>;
  icon?: Partial<IconTokens>;
};

export const HEADER_STYLES = ['slim', 'chunky'] as const;
export type HeaderStyle = (typeof HEADER_STYLES)[number];
export const GRID_DENSITIES = ['compact', 'comfortable'] as const;
export type GridDensity = (typeof GRID_DENSITIES)[number];
export const CARD_ASPECT_RATIOS = ['square', 'portrait', 'wide'] as const;
export type CardAspectRatio = (typeof CARD_ASPECT_RATIOS)[number];
export const MARQUEE_DIRECTIONS = ['left', 'right'] as const;
export type MarqueeDirection = (typeof MARQUEE_DIRECTIONS)[number];
export const MARQUEE_SPEEDS = ['fast', 'default', 'slow'] as const;
export type MarqueeSpeed = (typeof MARQUEE_SPEEDS)[number];

/** Layout variant flags — structure varies without code edits. */
export interface LayoutFlags {
  headerStyle: HeaderStyle;
  gridDensity: GridDensity;
  /** Product-card image crop: 1:1 / 4:5 / 16:10. */
  cardAspectRatio: CardAspectRatio;
  /** Ordered home section ids: hero | marquee | featuredCollection | recommendedProducts */
  homeSectionOrder: string[];
}

export interface MarqueeContent {
  items: string[];
  direction: MarqueeDirection;
  speed: MarqueeSpeed;
}

export interface HeroContent {
  eyebrow: string;
  statement: string;
  sub: string;
  cta: string;
  ctaHref: string;
  /**
   * Optional full-bleed hero media URL (config-driven). Empty string falls
   * back to the live shop `brand.coverImage` when present, else no media.
   */
  image: string;
}

/** Copy-first content defaults (nav/footer/hero/marquee). */
export interface ThemeContent {
  /** Fallback header menu titles (used when no Shopify menu is present). */
  nav: string[];
  /** Footer tagline lines, rendered under the footer menu. */
  footer: string[];
  hero: HeroContent;
  marquee: MarqueeContent;
}

/** The fully resolved, ready-to-render theme state (what the root loader emits). */
export interface ThemeState {
  preset: ThemePresetName;
  tokens: TokenSet;
  layout: LayoutFlags;
  content: ThemeContent;
}
