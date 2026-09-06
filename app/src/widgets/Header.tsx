import { NavLink } from 'react-router';
import { ListIcon, MagnifyingGlassIcon, type IconWeight } from '@phosphor-icons/react';
import type { HeaderQuery } from 'storefrontapi.generated';
import type { ThemeState } from '../shared/config';
import { CartToggle } from '../features/cart-drawer';
import { useAside } from '../shared/ui';

interface HeaderProps {
  header: HeaderQuery;
  publicStoreDomain: string;
  theme: ThemeState;
}

type Viewport = 'desktop' | 'mobile';

/**
 * Header — Exaggerated Minimalism composition (see OpenSpec change
 * `redesign-minimal-header`): one ultra-minimal bar with three zones that
 * reorder by viewport.
 *
 *   Desktop (≥ 48em): [logo] · [centered nav] · [search] [cart]
 *   Mobile  (< 48em): [list] · [centered logo] · [search] [cart]
 *
 * The zone swap is pure CSS (`grid-template-areas` in app.css); the DOM order
 * stays [menu toggle] [logo] [desktop nav] [ctas] so keyboard tab order reads
 * logo → nav → actions on desktop and menu → logo → actions on mobile.
 */
export function Header({ header, publicStoreDomain, theme }: HeaderProps) {
  const { shop, menu } = header;
  // Phosphor ultra-thin icons for the minimal preset; bold for playful
  // (matches the pre-existing playful cart icon weight).
  const iconWeight: IconWeight = theme.preset === 'minimal' ? 'thin' : 'bold';
  // Predefined icon-size scale from the theme token set — header controls
  // standardize on md (24px).
  const iconSize = theme.tokens.icon.md;
  return (
    <header className="header" data-header-style={theme.layout.headerStyle}>
      <HeaderMenuMobileToggle weight={iconWeight} size={iconSize} />
      <NavLink className="header-logo" prefetch="intent" to="/" style={activeLinkStyle} end>
        <strong>{shop.name}</strong>
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
        navFallback={theme.content.nav}
      />
      <HeaderCtas iconWeight={iconWeight} iconSize={iconSize} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  navFallback = [],
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  /** Config-driven fallback nav labels (copy-first voice), used when the
   *  Shopify menu is absent (e.g. an unlinked mock shop). */
  navFallback?: string[];
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();

  type HeaderMenuItem = NonNullable<HeaderQuery['menu']>['items'][number];
  let items: HeaderMenuItem[] = menu?.items ?? [];
  if (items.length === 0) {
    // Config-driven fallback nav (copy-first voice) — or the static fallback.
    // Cast: fallback items carry no Shopify resourceId (same pattern as the
    // pre-existing FALLBACK_HEADER_MENU, which is never contextually checked).
    items = navFallback.length
      ? (navFallback.map((title, index) => ({
          id: `config-nav-${index}`,
          resourceId: null,
          tags: [],
          title,
          type: 'HTTP',
          url: '/collections',
          items: [],
        })) as HeaderMenuItem[])
      : (FALLBACK_HEADER_MENU.items as HeaderMenuItem[]);
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink end onClick={close} prefetch="intent" style={activeLinkStyle} to="/">
          Home
        </NavLink>
      )}
      {items.map((item) => {
        if (!item.url) {
          return null;
        }

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({ iconWeight, iconSize }: { iconWeight: IconWeight; iconSize: string }) {
  return (
    <nav className="header-ctas" role="navigation" aria-label="Header actions">
      <SearchToggle weight={iconWeight} size={iconSize} />
      {/* The whole header is client-gated (see PageLayout), so the cart control
          only renders after hydration — no per-control skeleton needed. */}
      <CartToggle weight={iconWeight} size={iconSize} />
    </nav>
  );
}

function HeaderMenuMobileToggle({ weight, size }: { weight: IconWeight; size: string }) {
  const { open } = useAside();
  return (
    <button
      className="header-icon-button header-menu-mobile-toggle reset"
      type="button"
      aria-label="Open menu"
      onClick={() => open('mobile')}
    >
      <ListIcon size={size} weight={weight} aria-hidden="true" />
    </button>
  );
}

function SearchToggle({ weight, size }: { weight: IconWeight; size: string }) {
  const { open } = useAside();
  return (
    <button
      className="header-icon-button reset"
      type="button"
      aria-label="Search"
      onClick={() => open('search')}
    >
      <MagnifyingGlassIcon size={size} weight={weight} aria-hidden="true" />
    </button>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({ isActive, isPending }: { isActive: boolean; isPending: boolean }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'var(--color-muted)' : 'var(--color-primary)',
  };
}
