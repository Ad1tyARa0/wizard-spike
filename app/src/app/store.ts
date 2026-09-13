import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listener-middleware';
import { type RootState, rootReducer } from './root-reducer';

/**
 * Redux store — FSD: app layer.
 *
 * Holds ephemeral client state (cart view-model, drawer UI) plus the resolved
 * theme (seeded from the server). Server data (products, collections,
 * authoritative cart) stays in React Router loaders and actions; async side
 * effects run through listenerMiddleware.
 *
 * A fresh store is created per render via makeStore() — per request on the
 * server (entry.server.tsx seeds the theme), per boot on the client
 * (entry.client.tsx rehydrates it from the serialized `window.__THEME_STATE__`).
 * RootState lives in ./rootReducer to keep listenerMiddleware free of a
 * circular import.
 */
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type { RootState };
