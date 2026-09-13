import { describe, expect, test } from 'bun:test';
import {
  ThemeActionTypes,
  defaultTheme,
  resolveTheme,
  themeReducer,
  themeSet,
} from '../app/src/entities/theme';

describe('theme slice — themeSet', () => {
  test('themeSet uses the namespaced action type constant', () => {
    expect(themeSet.type).toBe(ThemeActionTypes.THEME_SET);
  });

  test('themeSet replaces the whole resolved theme state', () => {
    const playful = resolveTheme({ theme: 'playful' });
    const state = themeReducer(defaultTheme(), themeSet(playful));
    expect(state).toEqual(playful);
    expect(state.preset).toBe('playful');
  });

  test('reducer initialises to the default (minimal) theme', () => {
    const state = themeReducer(undefined, { type: 'unrelated/ACTION' });
    expect(state).toEqual(defaultTheme());
    expect(state.preset).toBe('minimal');
  });
});
