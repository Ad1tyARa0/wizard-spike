import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listener-middleware';
import { type RootState, rootReducer } from './root-reducer';

/**
 * Redux store — FSD: app layer.
 *
 * Holds ephemeral client state (cart view-model, drawer UI). Server data
 * (products, collections, authoritative cart) stays in React Router loaders
 * and actions; async side effects run through listenerMiddleware.
 *
 * A fresh store is created per client boot via makeStore(). The server render
 * does not mount the Redux provider (see entry.client.tsx), so no request
 * cross-contamination is possible.
 *
 * RootState lives in ./rootReducer to keep listenerMiddleware free of a
 * circular import.
 */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type { RootState };
