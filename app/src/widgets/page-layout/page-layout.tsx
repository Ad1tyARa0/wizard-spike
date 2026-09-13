import { Suspense, useId } from 'react';
import { Await, Link } from 'react-router';
import { useSelector } from 'react-redux';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { selectThemeLayout } from '../../entities/theme';
import { CartDrawer } from '../../features/cart-drawer';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
  SearchResultsPredictive,
} from '../../features/search';
import { Aside, Button, ClientOnly } from '../../shared/ui';
import { Footer } from '../footer';
import { Header, HeaderMenu, HeaderSkeleton } from '../header';

interface PageLayoutProps {
  footer: Promise<FooterQuery | null>;
  header: Promise<HeaderQuery | null>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  children = null,
  footer,
  header,
  publicStoreDomain,
}: PageLayoutProps) {
  const layout = useSelector(selectThemeLayout);
  return (
    <Aside.Provider>
      <SearchAside />
      {/* The header is deferred and client-gated: until the data resolves AND
          the client hydrates, the WHOLE header renders as a skeleton (logo
          row, nav row, search + cart icon blocks) — never an isolated
          per-control skeleton. Same 64px height, so no layout shift. */}
      <ClientOnly fallback={<HeaderSkeleton />}>
        <Suspense fallback={<HeaderSkeleton />}>
          <Await resolve={header}>
            {(header) => (
              <>
                {header && (
                  <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
                )}
                {header && (
                  <Header header={header} publicStoreDomain={publicStoreDomain} />
                )}
              </>
            )}
          </Await>
        </Suspense>
      </ClientOnly>
      <ClientOnly>
        <CartDrawer />
      </ClientOnly>
      <main
        data-grid-density={layout.gridDensity}
        data-card-aspect={layout.cardAspectRatio}
      >
        {children}
      </main>
      <Footer footer={footer} header={header} publicStoreDomain={publicStoreDomain} />
    </Aside.Provider>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({ fetchResults, goToSearch, inputRef }) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <Button onClick={goToSearch}>Search</Button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link onClick={closeSearch} to={`${SEARCH_ENDPOINT}?q=${term.current}`}>
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  /** Resolved header (the deferred promise is awaited by the parent Await). */
  header: HeaderQuery;
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}
