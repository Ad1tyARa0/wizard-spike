/**
 * Cart drawer UI state (FSD: features/cart-drawer). Pure client-side,
 * ephemeral — never seeded on the server and consumed inside `<ClientOnly>`.
 * The slice owns no actions of its own — both cases come from
 * `cart-drawer-actions.ts` via `extraReducers`.
 */
import { createSlice } from '@reduxjs/toolkit';
import { cartDrawerClosed, cartDrawerOpened } from './cart-drawer-actions';

export interface CartDrawerState {
  isOpen: boolean;
}

const initialState: CartDrawerState = { isOpen: false };

const cartDrawerSlice = createSlice({
  name: 'cartDrawer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartDrawerOpened, (state) => {
        state.isOpen = true;
      })
      .addCase(cartDrawerClosed, (state) => {
        state.isOpen = false;
      });
  },
});

export const cartDrawerReducer = cartDrawerSlice.reducer;
