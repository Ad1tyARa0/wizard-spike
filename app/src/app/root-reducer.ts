import { combineReducers } from '@reduxjs/toolkit';
import { cartReducer } from '~/src/entities/cart';
import { cartDrawerReducer } from '~/src/features/cart-drawer';

/**
 * Root reducer + RootState. Kept separate from store.ts so modules that need
 * the RootState type (e.g. listenerMiddleware) do not import the store and
 * create a circular dependency (madge checks this).
 */
export const rootReducer = combineReducers({
  cart: cartReducer,
  cartDrawer: cartDrawerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
