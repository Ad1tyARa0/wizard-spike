/**
 * Theme capability — runtime token resolution.
 *
 * `resolveTokens` is a PURE function: same (defaults, preset, overrides) in,
 * same resolved set out — unit-testable without rendering.
 *
 * Effective set = defaults ⊕ preset ⊕ overrides, merged by ./theme-merge
 * (the single merge semantics for the whole theme).
 */
import type { DesignOverrides, ThemeState, TokenSet } from './theme-types';
import { MINIMAL_CONTENT, MINIMAL_LAYOUT, MINIMAL_PRESET, MINIMAL_TOKENS } from './presets/minimal';
import { PLAYFUL_PRESET } from './presets/playful';
import type { ThemeConfig } from './theme-schema';
import { merge } from './theme-merge';

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
 * Overrides are shallow-per-group (colors/fonts/… merge per key); the groups
 * without a merchant override surface (breakpoints, zIndex, layout) resolve as
 * defaults ⊕ preset only.
 */
export function resolveTokens(
  defaults: TokenSet,
  preset: TokenSet,
  overrides: DesignOverrides = {},
): TokenSet {
  return merge<TokenSet>(defaults, preset, overrides);
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
    tokens: merge<TokenSet>(MINIMAL_TOKENS, preset.tokens, config.design),
    layout: merge<ThemeState['layout']>(MINIMAL_LAYOUT, preset.layout, config.layout),
    content: merge<ThemeState['content']>(MINIMAL_CONTENT, preset.content, config.content),
  };
}

/** Default theme state — what the storefront renders with no config file. */
export function defaultTheme(): ThemeState {
  return resolveTheme({ theme: 'minimal' });
}
