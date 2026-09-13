/**
 * Theme capability — Redux selectors (FSD: entities/theme).
 *
 * Granular selectors let a component subscribe to only the slice of the theme
 * it renders (tokens vs layout vs content vs preset), so a re-render is
 * scoped to the pieces it actually reads. `state` is typed structurally
 * (`{ theme: ThemeState }`) to avoid importing `RootState` from the app layer
 * (which would create a circular dependency — madge checks this).
 */
import type {
  LayoutFlags,
  ThemeContent,
  ThemePresetName,
  ThemeState,
  TokenSet,
} from './theme-types';

export const selectTheme = (state: { theme: ThemeState }): ThemeState => state.theme;
export const selectThemePreset = (state: { theme: ThemeState }): ThemePresetName =>
  state.theme.preset;
export const selectThemeTokens = (state: { theme: ThemeState }): TokenSet => state.theme.tokens;
export const selectThemeLayout = (state: { theme: ThemeState }): LayoutFlags => state.theme.layout;
export const selectThemeContent = (state: { theme: ThemeState }): ThemeContent =>
  state.theme.content;
