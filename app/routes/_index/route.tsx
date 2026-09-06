import { Fragment, Suspense } from 'react';
import { Await, Link, useLoaderData, useRouteLoaderData } from 'react-router';
import { Image } from '@shopify/hydrogen';
import type { FeaturedCollectionFragment, RecommendedProductsQuery } from 'storefrontapi.generated';
import type { Route } from './+types/route';
import { defaultTheme, resolveHeroContent } from '~/src/shared/config';
import type { HeroContent, ThemeState } from '~/src/shared/config';
import { Marquee, MockShopNotice, ProductItem } from '~/src/widgets';

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

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
async function loadCriticalData({ context }: Route.LoaderArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  // The theme (preset, layout flags, content) is resolved by the root loader
  // from hydrogen.config.json (with the preview seam applied). The shop
  // identity backs the hero when the config carries no copy.
  const rootData = useRouteLoaderData('root') as
    | { theme?: ThemeState; header?: { shop?: { name?: string; description?: string } } }
    | undefined;
  const theme = rootData?.theme ?? defaultTheme();
  const shop = rootData?.header?.shop;
  // Production-real hero: config copy ⊕ live shop data ⊕ generic fallback —
  // the presets ship no brand copy.
  const hero = resolveHeroContent(theme.content.hero, shop);

  const sections = new Map<string, React.ReactNode>([
    ['hero', <HeroSection key="hero" content={hero} />],
    ['marquee', <Marquee key="marquee" content={theme.content.marquee} />],
    [
      'featuredCollection',
      data.featuredCollection ? (
        <FeaturedCollection key="featuredCollection" collection={data.featuredCollection} />
      ) : null,
    ],
    [
      'recommendedProducts',
      <RecommendedProducts key="recommendedProducts" products={data.recommendedProducts} />,
    ],
  ]);

  return (
    <div className="home">
      {data.isShopLinked ? null : <MockShopNotice />}
      {theme.layout.homeSectionOrder.map((id) => (
        <Fragment key={id}>{sections.get(id)}</Fragment>
      ))}
    </div>
  );
}

function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section className="home__hero" aria-labelledby="home-statement">
      {content.eyebrow && <p className="eyebrow">{content.eyebrow}</p>}
      <h1 className="home__hero-statement" id="home-statement">
        {content.statement}
      </h1>
      {content.sub && <p className="home__hero-sub">{content.sub}</p>}
      <a className="home__hero-cta" href={content.ctaHref}>
        {content.cta}
      </a>
    </section>
  );
}

function FeaturedCollection({ collection }: { collection: FeaturedCollectionFragment }) {
  if (!collection) {
    return null;
  }
  const image = collection?.image;
  return (
    <Link className="featured-collection" to={`/collections/${collection.handle}`}>
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" alt={image.altText || collection.title} />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({ products }: { products: Promise<RecommendedProductsQuery | null> }) {
  return (
    <section className="recommended-products" aria-labelledby="recommended-products">
      <h2 id="recommended-products">Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
