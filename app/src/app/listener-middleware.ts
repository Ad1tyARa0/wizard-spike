import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from './root-reducer';
import { cartHydrated, cartIdSet, cartLineAdded } from '~/src/entities/cart';
import { cartDrawerOpened } from '~/src/features/cart-drawer';

/**
 * Listener middleware — Redux Toolkit's createListenerMiddleware.
 *
 * Side effects live here (FSD: app layer). Current effects implement the
 * cart-persistence requirement: the server cart id is persisted to
 * localStorage so the cart can be recovered across sessions. Future effects
 * (per change `implement-cart-capability`) will reconcile optimistic cart
 * ops with Hydrogen server actions.
 */
export const CART_ID_STORAGE_KEY = 'cart-id';

const listenerMiddleware = createListenerMiddleware<RootState>();

function persistCartId(id: string) {
  try {
    window.localStorage.setItem(CART_ID_STORAGE_KEY, id);
  } catch {
    // Storage unavailable (private mode, disabled cookies) — cart still works
    // for the session; recovery is skipped gracefully.
  }
}

listenerMiddleware.startListening({
  matcher: isAnyOf(cartIdSet, cartHydrated),
  effect: (_action, listenerApi) => {
    const id = listenerApi.getState().cart.id;
    if (id) {
      persistCartId(id);
    }
  },
});

// FSD cross-feature coordination: opening the drawer on an optimistic add is
// app-layer behavior, so `features/product-form` does not import
// `features/cart-drawer` directly (slices on the same layer stay isolated).
listenerMiddleware.startListening({
  actionCreator: cartLineAdded,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(cartDrawerOpened());
  },
});

export { listenerMiddleware };
