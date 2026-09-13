/**
 * Theme capability — Redux reducer (FSD: entities/theme).
 *
 * Holds the resolved `ThemeState`. Initialised to the default (minimal) theme
 * so `useSelector` returns a complete theme even before the store is seeded.
 * The initial state is replaced once by `makeStore(preloadedState)` (server
 * seed → client rehydration); `themeSet` replaces it again for runtime
 * previews (e.g. the Layer 1 wizard live-preview).
 */
import { createSlice } from '@reduxjs/toolkit';
import { defaultTheme } from './resolve-tokens';
import { themeSet } from './theme-actions';

const themeSlice = createSlice({
  name: 'theme',
  initialState: defaultTheme(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(themeSet, (_state, action) => action.payload);
  },
});

export const themeReducer = themeSlice.reducer;
