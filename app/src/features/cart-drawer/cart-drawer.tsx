import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from '@phosphor-icons/react';
import { cartDrawerClosed } from './cart-drawer-actions';
import { selectCartDrawerOpen } from './cart-drawer-selectors';
import {
  selectCart,
  selectCartLines,
  selectCartSubtotal,
  selectCartTotalQuantity,
} from '~/src/entities/cart';
import { selectThemeTokens } from '~/src/entities/theme';

/**
 * Cart drawer — FSD: features/cart-drawer (client-only; mount inside
 * <ClientOnly>). Renders the Redux cart view-model. The real add/update/remove
 * reconciliation with Hydrogen server actions is scoped to change
 * `implement-cart-capability`.
 */
export function CartDrawer() {
  const dispatch = useDispatch();
  const iconSize = useSelector(selectThemeTokens).icon.md;
  const isOpen = useSelector(selectCartDrawerOpen);
  const lines = useSelector(selectCartLines);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const subtotal = useSelector(selectCartSubtotal);
  const cart = useSelector(selectCart);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => dispatch(cartDrawerClosed());

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

  return (
    <div className="drawer-root">
      <button type="button" className="drawer-backdrop" aria-label="Close cart" onClick={close} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Cart">
        <header className="drawer__header">
          <h2 className="drawer__title">
            Cart
            {totalQuantity > 0 ? <span className="drawer__count">({totalQuantity})</span> : null}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="drawer__close"
            onClick={close}
            aria-label="Close cart"
          >
            <X size={iconSize} weight="bold" aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p className="drawer__empty-statement">Your cart is empty.</p>
            <p className="drawer__empty-sub">
              {cart.status === 'error' ? cart.error : 'Nothing here yet.'}
            </p>
            <a className="drawer__cta" href="/collections/all" onClick={close}>
              Shop the collection
            </a>
          </div>
        ) : (
          <div className="drawer__body">
            <ul className="drawer__lines">
              {lines.map((line) => (
                <li key={line.key} className="drawer__line">
                  {line.imageUrl ? (
                    <img
                      className="drawer__line-image"
                      src={line.imageUrl}
                      alt={line.productTitle}
                      width={72}
                      height={72}
                    />
                  ) : null}
                  <div className="drawer__line-info">
                    <a className="drawer__line-title" href={line.url} onClick={close}>
                      {line.productTitle}
                    </a>
                    <p className="drawer__line-variant">{line.variantTitle}</p>
                    <p className="drawer__line-meta">
                      {line.quantity} × {line.unitPrice.amount} {line.unitPrice.currencyCode}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="drawer__footer">
              <p className="drawer__subtotal">
                <span>Subtotal</span>
                <span>
                  {subtotal.amount} {subtotal.currencyCode}
                </span>
              </p>
              <a className="drawer__cta" href="/cart" onClick={close}>
                View cart &amp; checkout
              </a>
            </footer>
          </div>
        )}
      </aside>
    </div>
  );
}
