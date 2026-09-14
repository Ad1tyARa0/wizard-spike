import { useDispatch } from 'react-redux';
import { ShoppingCartIcon, type IconWeight } from '@phosphor-icons/react';
import { cartDrawerOpened } from './cart-drawer-actions';
import { Button } from '~/src/shared/ui';

/**
 * Bag control — opens the cart drawer; the accent count badge renders only
 * when the cart has items. The count comes from the real Hydrogen cart (root
 * loader → PageLayout), not a client model. FSD: features/cart-drawer
 * (client-only; mount inside `<ClientOnly>`).
 */
export function CartToggle({
  weight = 'bold',
  cartCount,
}: {
  weight?: IconWeight;
  cartCount: number;
}) {
  const dispatch = useDispatch();
  const hasItems = cartCount > 0;

  return (
    <Button
      variant="stark"
      className="btn--sm"
      aria-label={`Open bag${hasItems ? ` (${cartCount} items)` : ''}`}
      icon={<ShoppingCartIcon aria-hidden="true" weight={hasItems ? 'fill' : weight} />}
      onClick={() => dispatch(cartDrawerOpened())}
    >
      Bag
      {hasItems ? (
        <span aria-hidden="true" className="btn__count">
          {String(cartCount).padStart(2, '0')}
        </span>
      ) : null}
    </Button>
  );
}
