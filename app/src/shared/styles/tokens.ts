/**
 * Design tokens — TypeScript mirror of the RESOLVED theme token set.
 *
 * The static exports below are the `minimal` preset's defaults (previously
 * hard-coded here and in tokens.css — both now derive from the config
 * segment's minimal preset, a single source of truth).
 *
 * `createTokens(theme)` returns the fully resolved, typed token set for the
 * active theme (defaults ⊕ preset ⊕ overrides), for TypeScript consumers
 * that need a token value at runtime.
 *
 * CSS twin: ./tokens.css (static minimal defaults; the root layout overlays
 * the resolved runtime values as CSS custom properties on `<html>`).
 */
import { MINIMAL_PRESET } from '~/src/shared/config';
import type { ThemeState, TokenSet } from '~/src/shared/config';

export const colors = MINIMAL_PRESET.tokens.colors;
export const fonts = MINIMAL_PRESET.tokens.fonts;
export const type = MINIMAL_PRESET.tokens.type;
export const weights = MINIMAL_PRESET.tokens.weights;
export const tracking = MINIMAL_PRESET.tokens.tracking;
export const space = MINIMAL_PRESET.tokens.space;
export const radius = MINIMAL_PRESET.tokens.radius;
export const motion = MINIMAL_PRESET.tokens.motion;
export const icon = MINIMAL_PRESET.tokens.icon;
export const breakpoints = MINIMAL_PRESET.tokens.breakpoints;
export const zIndex = MINIMAL_PRESET.tokens.zIndex;
export const layout = MINIMAL_PRESET.tokens.layout;

/** The complete minimal token set (as resolved with no overrides). */
export const tokens: TokenSet = MINIMAL_PRESET.tokens;

/**
 * Typed mirror of the resolved token set for the active theme.
 * Pass the `theme` value from the root loader data.
 */
export function createTokens(theme: ThemeState): TokenSet {
  return theme.tokens;
}
