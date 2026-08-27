import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart drawer UI state. Pure client-side, ephemeral — exactly the kind of
 * state that belongs in Redux while server data stays in loaders/actions.
 *
 * FSD: features/cart-drawer — owns the drawer's UI model.
 */
export interface CartDrawerState {
  isOpen: boolean;
}

const initialState: CartDrawerState = { isOpen: false };

const cartDrawerSlice = createSlice({
  name: 'cartDrawer',
  initialState,
  reducers: {
    cartDrawerOpened(state) {
      state.isOpen = true;
    },
    cartDrawerClosed(state) {
      state.isOpen = false;
    },
  },
});

export const { cartDrawerOpened, cartDrawerClosed } = cartDrawerSlice.actions;
export const cartDrawerReducer = cartDrawerSlice.reducer;

export const selectCartDrawerOpen = (state: { cartDrawer: CartDrawerState }) =>
  state.cartDrawer.isOpen;
