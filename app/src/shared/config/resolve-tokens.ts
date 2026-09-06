/**
 * Theme capability — runtime token resolution.
 *
 * `resolveTokens` is a PURE function: same (defaults, preset, overrides) in,
 * same resolved set out — unit-testable without rendering.
 *
 * Effective token set = defaults ⊕ preset ⊕ overrides.
 */
import type {
  DesignOverrides,
  LayoutFlags,
  ThemeContent,
  ThemeState,
  TokenSet,
} from './theme-types';
import { MINIMAL_CONTENT, MINIMAL_LAYOUT, MINIMAL_PRESET, MINIMAL_TOKENS } from './presets/minimal';
import { PLAYFUL_PRESET } from './presets/playful';
import type { ContentOverridesInput, LayoutOverridesInput, ThemeConfig } from './theme-schema';

/** Preset registry — the shipped design languages. */
export const PRESETS = {
  minimal: MINIMAL_PRESET,
  playful: PLAYFUL_PRESET,
} as const;

export function getPreset(name: string) {
  return PRESETS[name as keyof typeof PRESETS] ?? MINIMAL_PRESET;
}

/**
 * Resolve the effective token set as defaults ⊕ preset ⊕ overrides.
 * Overrides are shallow-per-group (colors/fonts/… merge per key).
 */
export function resolveTokens(
  defaults: TokenSet,
  preset: TokenSet,
  overrides: DesignOverrides = {},
): TokenSet {
  return {
    colors: { ...defaults.colors, ...preset.colors, ...overrides.colors },
    fonts: { ...defaults.fonts, ...preset.fonts, ...overrides.fonts },
    type: { ...defaults.type, ...preset.type, ...overrides.type },
    weights: { ...defaults.weights, ...preset.weights, ...overrides.weights },
    tracking: { ...defaults.tracking, ...preset.tracking, ...overrides.tracking },
    space: { ...defaults.space, ...preset.space, ...overrides.space },
    radius: { ...defaults.radius, ...preset.radius, ...overrides.radius },
    motion: { ...defaults.motion, ...preset.motion, ...overrides.motion },
    icon: { ...defaults.icon, ...preset.icon, ...overrides.icon },
    breakpoints: { ...defaults.breakpoints, ...preset.breakpoints },
    zIndex: { ...defaults.zIndex, ...preset.zIndex },
    layout: { ...defaults.layout, ...preset.layout },
  };
}

function mergeLayout(
  defaults: LayoutFlags,
  preset: LayoutFlags,
  overrides: LayoutOverridesInput = {},
): LayoutFlags {
  return {
    headerStyle: overrides.headerStyle ?? preset.headerStyle ?? defaults.headerStyle,
    gridDensity: overrides.gridDensity ?? preset.gridDensity ?? defaults.gridDensity,
    cardAspectRatio:
      overrides.cardAspectRatio ?? preset.cardAspectRatio ?? defaults.cardAspectRatio,
    homeSectionOrder:
      overrides.homeSectionOrder ?? preset.homeSectionOrder ?? defaults.homeSectionOrder,
  };
}

function mergeContent(
  defaults: ThemeContent,
  preset: ThemeContent,
  overrides: ContentOverridesInput = {},
): ThemeContent {
  return {
    nav: overrides.nav ?? preset.nav ?? defaults.nav,
    footer: overrides.footer ?? preset.footer ?? defaults.footer,
    hero: {
      ...defaults.hero,
      ...preset.hero,
      ...overrides.hero,
    },
    marquee: {
      ...defaults.marquee,
      ...preset.marquee,
      ...overrides.marquee,
    },
  };
}

/**
 * Resolve a validated config into a complete, self-contained ThemeState.
 * Preset defaults are the base; the minimal preset is the ultimate fallback,
 * so missing keys never leave a gap (preset-completeness).
 */
export function resolveTheme(config: ThemeConfig): ThemeState {
  const preset = getPreset(config.theme);
  return {
    preset: config.theme,
    // config.design is validated by zod (records of strings/numbers); the
    // cast narrows it to the typed override shape. Unknown extra keys are
    // tolerated and simply do not map onto known tokens (additive contract).
    tokens: resolveTokens(
      MINIMAL_TOKENS,
      preset.tokens,
      config.design as DesignOverrides | undefined,
    ),
    layout: mergeLayout(MINIMAL_LAYOUT, preset.layout, config.layout),
    content: mergeContent(MINIMAL_CONTENT, preset.content, config.content),
  };
}

/** Default theme state — what the storefront renders with no config file. */
export function defaultTheme(): ThemeState {
  return resolveTheme({ theme: 'minimal' });
}
