/**
 * Cart capability — Redux actions (FSD: entities/cart).
 *
 * Action types are namespaced under `CartActionTypes` so every string is a
 * single, findable literal; callers dispatch the exported action creators.
 */
import { createAction } from '@reduxjs/toolkit';
import type { CartLineVM, CartVM } from './model';

export namespace CartActionTypes {
  const cart = 'cart';

  export const CART_HYDRATED = `${cart}/CART_HYDRATED`;
  export const CART_ID_SET = `${cart}/CART_ID_SET`;
  export const CART_LINE_ADDED = `${cart}/CART_LINE_ADDED`;
  export const CART_LINE_QUANTITY_CHANGED = `${cart}/CART_LINE_QUANTITY_CHANGED`;
  export const CART_LINE_REMOVED = `${cart}/CART_LINE_REMOVED`;
  export const CART_SYNC_SUCCEEDED = `${cart}/CART_SYNC_SUCCEEDED`;
  export const CART_SYNC_FAILED = `${cart}/CART_SYNC_FAILED`;
}

/** Replace the whole cart with a server-fetched cart (hydration/bridge). */
export const cartHydrated = createAction<CartVM>(CartActionTypes.CART_HYDRATED);

/** Record the server cart id (also triggers persistence via listener). */
export const cartIdSet = createAction<string>(CartActionTypes.CART_ID_SET);

/** Optimistic add: merge by merchandiseId or append a new line. */
export const cartLineAdded = createAction<CartLineVM>(CartActionTypes.CART_LINE_ADDED);

/** Optimistic quantity change. */
export const cartLineQuantityChanged = createAction<{ key: string; quantity: number }>(
  CartActionTypes.CART_LINE_QUANTITY_CHANGED,
);

/** Optimistic removal. */
export const cartLineRemoved = createAction<string>(CartActionTypes.CART_LINE_REMOVED);

/** Server confirmed the cart — replace optimistic state. */
export const cartSyncSucceeded = createAction<CartVM>(CartActionTypes.CART_SYNC_SUCCEEDED);

/** Server rejected the operation — surface error, keep last known cart. */
export const cartSyncFailed = createAction<string>(CartActionTypes.CART_SYNC_FAILED);
