/**
 * FSD public API — shared/config.
 * External modules may only import from this file, never from internals.
 *
 * Theme capability config-driven theming: schema, presets, pure resolver,
 * loader (hydrogen.config.json + preview seam), and CSS-var emission.
 */
export { parseThemeConfig, themeConfigSchema } from './theme-schema';
export type {
  ThemeConfig,
  DesignOverridesInput,
  LayoutOverridesInput,
  ContentOverridesInput,
} from './theme-schema';
export { tokensToCssVars } from './css-vars';
export { resolveHeroContent } from './resolve-content';
export type { ShopIdentity } from './resolve-content';
export { defaultTheme, getPreset, PRESETS, resolveTheme, resolveTokens } from './resolve-tokens';
export { MINIMAL_PRESET } from './presets/minimal';
export { PLAYFUL_PRESET } from './presets/playful';
export { applyPreviewOverride, loadConfig, readConfig } from './load-config';
export type { LoadConfigOptions } from './load-config';
export {
  CARD_ASPECT_RATIOS,
  GRID_DENSITIES,
  HEADER_STYLES,
  MARQUEE_DIRECTIONS,
  MARQUEE_SPEEDS,
  THEME_PRESET_NAMES,
} from './theme-types';
export type {
  BreakpointTokens,
  ColorTokens,
  DesignOverrides,
  FontTokens,
  GridDensity,
  HeaderStyle,
  HeroContent,
  LayoutFlags,
  LayoutTokens,
  MarqueeContent,
  MarqueeDirection,
  MarqueeSpeed,
  MotionTokens,
  RadiusTokens,
  SpaceTokens,
  ThemeContent,
  ThemePresetName,
  ThemeState,
  TokenSet,
  TrackingTokens,
  TypeTokens,
  WeightTokens,
  ZIndexTokens,
} from './theme-types';
