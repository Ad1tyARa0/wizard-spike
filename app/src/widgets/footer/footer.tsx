import { Suspense } from 'react';
import { Await, NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { selectThemeContent } from '../../entities/theme';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: Promise<HeaderQuery | null>;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header: headerPromise,
  publicStoreDomain,
}: FooterProps) {
  const content = useSelector(selectThemeContent);
  return (
    <Suspense>
      <Await resolve={headerPromise}>
        {(header) => (
          <Await resolve={footerPromise}>
            {(footer) => (
              <footer className="footer">
                {footer?.menu && header?.shop.primaryDomain?.url && (
                  <FooterMenu
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
                {content.footer.length > 0 && (
                  <div className="footer-taglines">
                    {content.footer.map((line) => (
                      <p className="footer-tagline" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </footer>
            )}
          </Await>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: string;
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
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
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink end key={item.id} prefetch="intent" style={activeLinkStyle} to={url}>
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({ isActive, isPending }: { isActive: boolean; isPending: boolean }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'var(--color-muted)' : 'var(--color-on-primary)',
  };
}
