/**
 * Cart drawer UI actions (FSD: features/cart-drawer).
 *
 * Action types are namespaced under `CartDrawerActionTypes` so every string is
 * a single, findable literal; callers dispatch the exported action creators.
 */
import { createAction } from '@reduxjs/toolkit';

export namespace CartDrawerActionTypes {
  const cartDrawer = 'cartDrawer';

  export const CART_DRAWER_OPENED = `${cartDrawer}/CART_DRAWER_OPENED`;
  export const CART_DRAWER_CLOSED = `${cartDrawer}/CART_DRAWER_CLOSED`;
}

export const cartDrawerOpened = createAction(CartDrawerActionTypes.CART_DRAWER_OPENED);
export const cartDrawerClosed = createAction(CartDrawerActionTypes.CART_DRAWER_CLOSED);
