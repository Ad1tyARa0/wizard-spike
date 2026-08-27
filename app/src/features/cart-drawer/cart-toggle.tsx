import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBagOpen } from '@phosphor-icons/react';
import { cartDrawerOpened } from './model';
import { selectCartTotalQuantity } from '~/src/entities/cart';

/**
 * Cart trigger — FSD: features/cart-drawer (client-only; mount inside
 * <ClientOnly>). Opens the cart drawer and shows the live line count.
 */
export function CartToggle() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <button
      type="button"
      className="cart-toggle"
      aria-label={`Open cart${totalQuantity > 0 ? ` (${totalQuantity} items)` : ''}`}
      onClick={() => dispatch(cartDrawerOpened())}
    >
      <ShoppingBagOpen size={22} weight="bold" aria-hidden="true" />
      {totalQuantity > 0 ? (
        <span className="cart-toggle__count" aria-hidden="true">
          {totalQuantity}
        </span>
      ) : null}
    </button>
  );
}
