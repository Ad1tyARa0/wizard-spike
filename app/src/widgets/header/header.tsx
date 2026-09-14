import { NavLink } from 'react-router';
import { ListIcon, MagnifyingGlassIcon, UserIcon, type IconWeight } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import type { HeaderQuery } from 'storefrontapi.generated';
import {
  selectThemeContent,
  selectThemeLayout,
  selectThemePreset,
  selectThemeTokens,
} from '../../entities/theme';
import { CartToggle } from '../../features/cart-drawer';
import { Button, ButtonLink, useAside } from '../../shared/ui';

interface HeaderProps {
  header: HeaderQuery;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

/** Icon size + weight resolved from the active theme, shared by the controls. */
interface HeaderIcon {
  size: string;
  weight: IconWeight;
}

/**
 * Header — 70/20/10 "Rye Island" composition: canvas bar with a 1px structure
 * rule, Space Mono brand + nav, and compact (32px) square utility controls.
 *
 *   Desktop (≥ 48em): [logo] · [centered nav] · [search] [account] [bag]
 *   Mobile  (< 48em): [list] · [logo] · [search] [account] [bag]
 *
 * The DOM order is [menu toggle] [logo] [desktop nav] [ctas] so keyboard tab
 * order reads logo → nav → actions on desktop and menu → logo → actions on
 * mobile; the mobile account label collapses to icon-only.
 */
export function Header({ header, publicStoreDomain }: HeaderProps) {
  const { shop, menu } = header;
  const preset = useSelector(selectThemePreset);
  const tokens = useSelector(selectThemeTokens);
  const layout = useSelector(selectThemeLayout);
  const content = useSelector(selectThemeContent);
  // Phosphor ultra-thin icons for the minimal preset; bold for playful.
  const icon: HeaderIcon = {
    size: tokens.icon.xs,
    weight: preset === 'minimal' ? 'thin' : 'bold',
  };
  return (
    <header className="header" data-header-style={layout.headerStyle}>
      <div className="header__inner">
        <HeaderMenuMobileToggle icon={icon} />
        <NavLink className="header-logo" prefetch="intent" to="/" end>
          <span aria-hidden="true" className="header-logo-mark" />
          <strong>{shop.name}</strong>
        </NavLink>
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
          navFallback={content.nav}
        />
        <HeaderCtas icon={icon} />
      </div>
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
        <NavLink className="header-menu-item" end onClick={close} prefetch="intent" to="/">
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
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({ icon }: { icon: HeaderIcon }) {
  return (
    <nav className="header-ctas" role="navigation" aria-label="Header actions">
      <SearchToggle icon={icon} />
      <ButtonLink
        aria-label="Account"
        className="header-account btn--sm btn--collapse"
        href="/account"
        icon={<UserIcon aria-hidden="true" size={icon.size} weight={icon.weight} />}
      >
        <span className="header-account__label">Account</span>
      </ButtonLink>
      {/* The whole header is client-gated (see PageLayout), so the bag control
          only renders after hydration — no per-control skeleton needed. */}
      <CartToggle size={icon.size} weight={icon.weight} />
    </nav>
  );
}

function HeaderMenuMobileToggle({ icon }: { icon: HeaderIcon }) {
  const { open } = useAside();
  return (
    <Button
      className="btn--icon btn--sm header-menu-mobile-toggle"
      aria-label="Open menu"
      icon={<ListIcon aria-hidden="true" size={icon.size} weight={icon.weight} />}
      onClick={() => open('mobile')}
    />
  );
}

function SearchToggle({ icon }: { icon: HeaderIcon }) {
  const { open } = useAside();
  return (
    <Button
      className="btn--icon btn--sm"
      aria-label="Search"
      icon={<MagnifyingGlassIcon aria-hidden="true" size={icon.size} weight={icon.weight} />}
      onClick={() => open('search')}
    />
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
