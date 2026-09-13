/**
 * Theme capability — Redux actions (FSD: entities/theme).
 *
 * The theme is server-resolved once per request and seeded into the store
 * (see app/entry.server.tsx). Actions live here, separate from the reducer,
 * with namespaced action-type constants so the string values are unique and
 * grep-able across the app.
 */
import { createAction } from '@reduxjs/toolkit';
import type { ThemeState } from './theme-types';

/**
 * Action-type constants. Namespaced under `ThemeActionTypes` so every type
 * string is a single, findable literal (no magic strings at call sites).
 */
export namespace ThemeActionTypes {
  export const THEME_SET = 'theme/THEME_SET';
}

/** Replace the resolved theme state (hydration from the server). */
export const themeSet = createAction<ThemeState>(ThemeActionTypes.THEME_SET);
