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
  display: string;
  heading: string;
  body: string;
  bodyLg: string;
  label: string;
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

/** Predefined icon-size scale — sm / md / lg. */
export interface IconSizeTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
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
  icon: IconSizeTokens;
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
  icon?: Partial<IconSizeTokens>;
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
