import { Link, useLoaderData } from 'react-router';
import { Money, getPaginationVariables } from '@shopify/hydrogen';
import { ArrowRightIcon } from '@phosphor-icons/react';
import type { CollectionFragment } from 'storefrontapi.generated';
import type { Route } from './+types/route';
import { PaginatedResourceSection } from '~/src/widgets';

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, request }: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { collections };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const { collections } = useLoaderData<typeof loader>();

  return (
    <div className="collections">
      <h1>Collections</h1>
      <PaginatedResourceSection<CollectionFragment>
        connection={collections}
        resourcesClassName="collections-grid"
      >
        {({ node: collection }) => <CollectionCard key={collection.id} collection={collection} />}
      </PaginatedResourceSection>
    </div>
  );
}

/**
 * Collection card — title + item count, a hairline-separated list of the
 * collection's first products, and a footer link into the full collection.
 * See `design-system/e-commerce-website/pages/collections.md`.
 */
function CollectionCard({ collection }: { collection: CollectionFragment }) {
  const products = collection.products.nodes;
  const count = String(products.length).padStart(2, '0');
  return (
    <article className="collection-card">
      <div className="collection-card-body">
        <header className="collection-card-header">
          <h3 className="collection-card-title">{collection.title}</h3>
          <span className="collection-card-count">{count} items</span>
        </header>
        {products.length > 0 && (
          <ul className="collection-card-products">
            {products.map((product) => (
              <li className="collection-card-product" key={product.id}>
                <div className="collection-card-product-info">
                  <span className="collection-card-product-name">{product.title}</span>
                  {product.productType ? (
                    <span className="collection-card-product-meta">{product.productType}</span>
                  ) : null}
                </div>
                <span className="collection-card-product-price">
                  <Money data={product.priceRange.minVariantPrice} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link
        className="collection-card-footer"
        prefetch="intent"
        to={`/collections/${collection.handle}`}
      >
        <span>View entire collection</span>
        <span aria-hidden="true" className="collection-card-arrow">
          <ArrowRightIcon />
        </span>
      </Link>
    </article>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    products(first: 4) {
      nodes {
        id
        title
        handle
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
