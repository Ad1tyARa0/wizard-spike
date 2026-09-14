import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import {
  CartForm,
  Image,
  Money,
  useOptimisticCart,
  type OptimisticCartLine,
} from '@shopify/hydrogen';
import type { CartLineUpdateInput } from '@shopify/hydrogen/storefront-api-types';
import { ArrowRightIcon, X } from '@phosphor-icons/react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/src/entities/product';
import { selectThemeTokens } from '~/src/entities/theme';
import { cartDrawerClosed, cartDrawerOpened } from './cart-drawer-actions';
import { selectCartDrawerOpen } from './cart-drawer-selectors';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * Cart drawer — FSD: features/cart-drawer (client-only; mounted by PageLayout
 * inside `<ClientOnly>`). Renders the live Hydrogen cart: line items with
 * server-backed quantity steppers and remove, a cost summary, and checkout.
 * The root loader owns the cart; `useOptimisticCart` shows pending changes.
 * The drawer opens itself whenever the cart quantity increases, so both the
 * product form and the card quick-add reveal it.
 */
export function CartDrawer({ cart: originalCart }: { cart: CartApiQueryFragment | null }) {
  const dispatch = useDispatch();
  const tokens = useSelector(selectThemeTokens);
  const isOpen = useSelector(selectCartDrawerOpen);
  const cart = useOptimisticCart(originalCart);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => dispatch(cartDrawerClosed());

  const totalQuantity = cart?.totalQuantity ?? 0;
  const previousQuantity = useRef(totalQuantity);

  useEffect(() => {
    if (totalQuantity > previousQuantity.current) {
      dispatch(cartDrawerOpened());
    }
    previousQuantity.current = totalQuantity;
  }, [totalQuantity, dispatch]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const lines = (cart?.lines?.nodes ?? []).filter(
    (line) => !('parentRelationship' in line && line.parentRelationship?.parent),
  );
  const hasItems = totalQuantity > 0;

  return (
    <div className="cart-drawer-root">
      <button
        type="button"
        className="cart-drawer-backdrop"
        aria-label="Close cart"
        onClick={close}
      />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <header className="cart-drawer-header">
          <div className="cart-drawer-heading-group">
            <span className="cart-drawer-manifest">
              [ Manifest // {String(totalQuantity).padStart(2, '0')}{' '}
              {totalQuantity === 1 ? 'item' : 'items'} ]
            </span>
            <h3 className="cart-drawer-heading">Your bag</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="cart-drawer-close"
            aria-label="Close cart"
            onClick={close}
          >
            <X weight={tokens.icon.weight} aria-hidden="true" />
          </button>
        </header>

        {hasItems ? (
          <>
            <div className="cart-drawer-items">
              <ul className="cart-drawer-lines">
                {lines.map((line) => (
                  <CartDrawerLine key={line.id} line={line} onNavigate={close} />
                ))}
              </ul>
            </div>
            <footer className="cart-drawer-footer">
              <div className="cart-drawer-summary">
                <p className="cart-drawer-summary-row">
                  <span>Subtotal</span>
                  {cart?.cost?.subtotalAmount ? (
                    <Money data={cart.cost.subtotalAmount} />
                  ) : (
                    <span>-</span>
                  )}
                </p>
                <p className="cart-drawer-summary-row cart-drawer-summary-row--meta">
                  <span>Estimated shipping</span>
                  <span>Calculated at checkout</span>
                </p>
                <p className="cart-drawer-summary-row cart-drawer-summary-row--total">
                  <span>Total</span>
                  {cart?.cost?.totalAmount ? (
                    <Money data={cart.cost.totalAmount} />
                  ) : (
                    <span>-</span>
                  )}
                </p>
              </div>
              {cart?.checkoutUrl ? (
                <a className="cart-drawer-checkout" href={cart.checkoutUrl}>
                  <span>Proceed to checkout</span>
                  <ArrowRightIcon aria-hidden="true" weight={tokens.icon.weight} />
                </a>
              ) : null}
            </footer>
          </>
        ) : (
          <div className="cart-drawer-empty">
            <p className="cart-drawer-empty-statement">Your bag is empty.</p>
            <Link
              className="cart-drawer-checkout"
              to="/collections/all"
              onClick={close}
              prefetch="viewport"
            >
              <span>Shop the collection</span>
              <ArrowRightIcon aria-hidden="true" weight={tokens.icon.weight} />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}

function CartDrawerLine({ line, onNavigate }: { line: CartLine; onNavigate: () => void }) {
  const { merchandise, quantity, isOptimistic } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li className="cart-drawer-line">
      <div className="cart-drawer-line-media">
        {image ? (
          <Image data={image} alt={title} aspectRatio="1/1" sizes="70px" />
        ) : (
          <span className="cart-drawer-line-media-placeholder">Shot</span>
        )}
      </div>
      <div className="cart-drawer-line-info">
        <div className="cart-drawer-line-title-row">
          <Link
            className="cart-drawer-line-title"
            prefetch="intent"
            to={lineUrl}
            onClick={onNavigate}
          >
            {product.title}
          </Link>
          <CartLineRemoveButton disabled={!!isOptimistic} lineId={line.id} />
        </div>
        <span className="cart-drawer-line-variant">Vendor: {product.vendor}</span>
        <div className="cart-drawer-line-pricing">
          <div className="cart-drawer-stepper">
            <CartLineUpdateButton
              disabled={!!isOptimistic || quantity <= 1}
              label="Decrease quantity"
              lineId={line.id}
              quantity={Math.max(0, quantity - 1)}
            >
              &#8722;
            </CartLineUpdateButton>
            <span className="cart-drawer-stepper-count">{quantity}</span>
            <CartLineUpdateButton
              disabled={!!isOptimistic}
              label="Increase quantity"
              lineId={line.id}
              quantity={quantity + 1}
            >
              &#43;
            </CartLineUpdateButton>
          </div>
          <span className="cart-drawer-line-price">
            <Money data={line.cost.totalAmount} />
          </span>
        </div>
      </div>
    </li>
  );
}

function CartLineUpdateButton({
  children,
  disabled,
  label,
  lineId,
  quantity,
}: {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  lineId: string;
  quantity: number;
}) {
  const lines: CartLineUpdateInput[] = [{ id: lineId, quantity }];
  return (
    <CartForm
      fetcherKey={`update-${lineId}`}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      <button type="submit" className="cart-drawer-step" aria-label={label} disabled={disabled}>
        {children}
      </button>
    </CartForm>
  );
}

function CartLineRemoveButton({ disabled, lineId }: { disabled: boolean; lineId: string }) {
  return (
    <CartForm
      fetcherKey={`remove-${lineId}`}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds: [lineId] }}
    >
      <button
        type="submit"
        className="cart-drawer-remove"
        aria-label="Remove item"
        disabled={disabled}
      >
        &times;
      </button>
    </CartForm>
  );
}
