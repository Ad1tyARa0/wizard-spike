import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartIcon, type IconWeight } from '@phosphor-icons/react';
import { cartDrawerOpened } from './cart-drawer-actions';
import { selectCartTotalQuantity } from '~/src/entities/cart';
import { Button } from '~/src/shared/ui';

/**
 * Bag control — opens the cart drawer; the accent count badge renders only
 * when the cart has items. FSD: features/cart-drawer (client-only; mount
 * inside `<ClientOnly>`).
 */
export function CartToggle({ weight = 'bold', size }: { weight?: IconWeight; size: string }) {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const hasItems = totalQuantity > 0;

  return (
    <Button
      variant="stark"
      className="btn--sm"
      aria-label={`Open bag${hasItems ? ` (${totalQuantity} items)` : ''}`}
      icon={<ShoppingCartIcon aria-hidden="true" size={size} weight={hasItems ? 'fill' : weight} />}
      onClick={() => dispatch(cartDrawerOpened())}
    >
      Bag
      {hasItems ? (
        <span aria-hidden="true" className="btn__count">
          {String(totalQuantity).padStart(2, '0')}
        </span>
      ) : null}
    </Button>
  );
}
