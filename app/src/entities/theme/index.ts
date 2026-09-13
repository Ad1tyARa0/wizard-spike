/**
 * FSD public API — entities/theme.
 * External modules may only import from this file, never from internals.
 *
 * This is the seam, not the whole slice: it exposes only what other layers
 * need (the loader, the pure resolver, the CSS-var emitter, the Redux slice
 * actions/reducer/selectors, and the few types consumers actually reference).
 * Everything else — schema, presets, merge, internal helpers — is an internal
 * seam used by the slice's own tests and tooling via relative paths.
 */
export { defaultTheme, resolveTheme } from './resolve-tokens';
export { loadConfig } from './load-config';
export { tokensToCssVars } from './css-vars';
export { resolveHeroContent } from './resolve-content';
export { ThemeActionTypes, themeSet } from './theme-actions';
export { themeReducer } from './theme-reducer';
export {
  selectTheme,
  selectThemeContent,
  selectThemeLayout,
  selectThemePreset,
  selectThemeTokens,
} from './theme-selectors';
export type { ThemeConfig } from './theme-schema';
export type { HeroContent, MarqueeContent, ThemePresetName, ThemeState } from './theme-types';
