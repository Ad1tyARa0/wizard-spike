import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartIcon, type IconWeight } from '@phosphor-icons/react';
import { cartDrawerOpened } from './model';
import { selectCartTotalQuantity } from '~/src/entities/cart';

/**
 * Cart trigger — FSD: features/cart-drawer (client-only; mount inside
 * <ClientOnly>). Opens the cart drawer and shows the live line count.
 * The glyph is always the Phosphor `ShoppingCart` (exported as
 * `ShoppingCartIcon`). Size comes from the theme's predefined icon-size
 * scale (header controls standardize on md). Weight reflects cart state:
 * the theme weight (ultra-thin in minimal) when empty, the Phosphor `fill`
 * weight once the cart has items.
 */
export function CartToggle({
  weight = 'bold',
  size,
}: {
  weight?: IconWeight;
  /** Icon-size token value from the theme scale (e.g. `theme.tokens.icon.md`). */
  size: string;
}) {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const hasItems = totalQuantity > 0;

  return (
    <button
      type="button"
      className="cart-toggle"
      aria-label={`Open cart${hasItems ? ` (${totalQuantity} items)` : ''}`}
      onClick={() => dispatch(cartDrawerOpened())}
    >
      <ShoppingCartIcon size={size} weight={hasItems ? 'fill' : weight} aria-hidden="true" />
      {hasItems ? (
        <span className="cart-toggle__count" aria-hidden="true">
          {totalQuantity}
        </span>
      ) : null}
    </button>
  );
}
