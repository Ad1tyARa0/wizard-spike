import { Fragment, Suspense } from 'react';
import { Await, Link, useLoaderData, useRouteLoaderData } from 'react-router';
import { useSelector } from 'react-redux';
import { Image } from '@shopify/hydrogen';
import { ArrowRightIcon, type IconWeight } from '@phosphor-icons/react';
import type {
  FeaturedCollectionFragment,
  FeaturedCollectionQuery,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import type { Route } from './+types/route';
import { resolveHeroContent, selectTheme } from '~/src/entities/theme';
import type { HeroContent } from '~/src/entities/theme';
import { ButtonLink, SectionHeader, Skeleton, SkeletonRow } from '~/src/shared/ui';
import { Marquee, MockShopNotice, ProductItem } from '~/src/widgets';

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: data?.shopName ? `${data.shopName} | Home` : 'Home' }];
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
  // Section-level resilience: a failed featured query degrades to no featured
  // band (and no shop cover/title) instead of taking the whole page down.
  const featured = await context.storefront
    .query<FeaturedCollectionQuery>(FEATURED_COLLECTION_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: featured?.collections.nodes[0] ?? null,
    // Shop name backs the page title and the hero statement fallback.
    shopName: featured?.shop?.name ?? null,
    // Hero media fallback: the shop's brand cover image, resolved at first
    // paint (config `hero.image` wins over this in resolveHeroContent).
    shopCoverImageUrl: featured?.shop?.brand?.coverImage?.image?.url ?? null,
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
    { header?: { shop?: { name?: string; description?: string } } } | undefined;
  const theme = useSelector(selectTheme);
  const shop = rootData?.header?.shop;
  // Production-real hero: config copy ⊕ live shop data ⊕ generic fallback —
  // the presets ship no brand copy. The hero image is config-first
  // (`content.hero.image`), then the shop's brand cover image, then none.
  const hero = resolveHeroContent(theme.content.hero, {
    name: shop?.name,
    description: shop?.description,
    coverImageUrl: data.shopCoverImageUrl ?? undefined,
  });

  // Render the home sections in config order, numbering the statement
  // sections (hero, featured, recommended) with editorial index labels so the
  // numerals stay honest when a merchant reorders or hides a section. The
  // marquee band is never numbered.
  const statementIds = theme.layout.homeSectionOrder.filter(
    (id) =>
      id === 'hero' ||
      (id === 'featuredCollection' && Boolean(data.featuredCollection)) ||
      id === 'recommendedProducts',
  );

  const pad = (n: number) => String(n).padStart(2, '0');
  const statementIndex = (id: string) => pad(statementIds.indexOf(id) + 1);

  // Recommended must not repeat the featured collection's own products.
  const featuredProductIds = new Set(
    (data.featuredCollection?.products?.nodes ?? []).map((product) => product.id),
  );

  const sectionFor = (id: string): React.ReactNode => {
    switch (id) {
      case 'hero':
        return (
          <HeroSection
            content={hero}
            highlightTitle={data.featuredCollection?.title}
            iconWeight={theme.tokens.icon.weight}
            index={statementIndex(id)}
          />
        );
      case 'marquee':
        return <Marquee content={theme.content.marquee} />;
      case 'featuredCollection':
        return data.featuredCollection ? (
          <FeaturedCollection
            index={statementIndex(id)}
            collection={data.featuredCollection}
            iconWeight={theme.tokens.icon.weight}
          />
        ) : null;
      case 'recommendedProducts':
        return (
          <RecommendedProducts
            excludeIds={featuredProductIds}
            index={statementIndex(id)}
            products={data.recommendedProducts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="home">
      {data.isShopLinked ? null : <MockShopNotice />}
      {theme.layout.homeSectionOrder.map((id) => (
        <Fragment key={id}>{sectionFor(id)}</Fragment>
      ))}
    </div>
  );
}

function HeroSection({
  content,
  highlightTitle,
  iconWeight,
  index,
}: {
  content: HeroContent;
  /** Featured collection title shown in the media badge when present. */
  highlightTitle?: string;
  /** Icon-weight token (stroke thickness) for the CTA arrow. */
  iconWeight: IconWeight;
  index: string;
}) {
  // The numeral always renders so the section sequence stays honest; the
  // eyebrow is optional merchant copy.
  const metadata = content.eyebrow ? `${index} / ${content.eyebrow}` : index;
  // An image gets the floating badge; without one the placeholder label names
  // the same highlight instead (never both).
  const placeholderLabel = highlightTitle ?? content.eyebrow;
  const showBadge = Boolean(content.image && highlightTitle);
  let media: React.ReactNode = null;
  if (content.image) {
    media = (
      <Image
        alt=""
        className="hero-media-image"
        data={{ altText: '', url: content.image }}
        decoding="async"
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
      />
    );
  } else if (placeholderLabel) {
    media = <span className="hero-media-label">{placeholderLabel}</span>;
  }
  return (
    <section className="hero-unit" aria-labelledby="home-statement">
      <span className="hero-metadata">{metadata}</span>
      <h1 className="hero-headline" id="home-statement">
        {content.statement}
      </h1>
      <div className="hero-grid">
        <div className="hero-media-canvas">
          {media}
          {showBadge ? <p className="hero-badge">Featured lot: {highlightTitle}</p> : null}
        </div>
        <div className="hero-action-block">
          {content.sub ? <p className="hero-description">{content.sub}</p> : null}
          <ButtonLink
            className="hero-cta"
            href={content.ctaHref}
            icon={<ArrowRightIcon aria-hidden="true" weight={iconWeight} />}
            iconPosition="right"
            variant="solid"
          >
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollection({
  collection,
  index,
  iconWeight,
}: {
  collection: FeaturedCollectionFragment;
  index: string;
  /** Icon-weight token (stroke thickness) from the resolved theme scale. */
  iconWeight: IconWeight;
}) {
  if (!collection) {
    return null;
  }
  const image = collection?.image;
  const products = collection?.products?.nodes ?? [];
  const collectionClass = image
    ? 'featured-collection'
    : 'featured-collection featured-collection--text-only';
  const countLabel =
    products.length > 0
      ? `${String(products.length).padStart(2, '0')} ${products.length === 1 ? 'product' : 'products'}`
      : undefined;
  return (
    <section className={collectionClass} aria-labelledby="featured-collection-title">
      {image ? (
        <div className="featured-collection-split">
          <Link
            className="featured-collection-image"
            prefetch="intent"
            to={`/collections/${collection.handle}`}
          >
            <Image
              data={image}
              sizes="(min-width: 45em) 60vw, 100vw"
              alt={image.altText || collection.title}
            />
          </Link>
          <div className="featured-collection-side">
            <p className="section-kicker">
              <span className="section-index" aria-hidden="true">
                {index}
              </span>
              Featured Collection
            </p>
            <h2 className="section-title" id="featured-collection-title">
              {collection.title}
            </h2>
            <Link
              className="section-link"
              prefetch="intent"
              to={`/collections/${collection.handle}`}
            >
              <span>View collection</span>
              <ArrowRightIcon aria-hidden="true" weight={iconWeight} />
            </Link>
          </div>
        </div>
      ) : (
        <SectionHeader
          id="featured-collection-title"
          index={index}
          eyebrow="Featured Collection"
          title={collection.title}
          count={countLabel}
          action={{ label: 'View collection', to: `/collections/${collection.handle}` }}
          iconWeight={iconWeight}
        />
      )}
      {products.length > 0 && (
        <div className="featured-products">
          <div className="featured-products-grid">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function RecommendedProducts({
  excludeIds,
  products,
  index,
}: {
  excludeIds: Set<string>;
  products: Promise<RecommendedProductsQuery | null>;
  index: string;
}) {
  // Keep the two grids distinct; when everything would be filtered out, the
  // section shows its empty state instead of repeating the featured grid.
  const visibleProducts = (response: RecommendedProductsQuery | null) =>
    (response?.products.nodes ?? []).filter((product) => !excludeIds.has(product.id));

  return (
    <section className="recommended-products" aria-labelledby="recommended-products-title">
      <SectionHeader
        id="recommended-products-title"
        index={index}
        title="New arrivals"
        count={
          <Suspense fallback={null}>
            <Await resolve={products}>
              {(response) => {
                if (!response) {
                  return null;
                }
                const count = visibleProducts(response).length;
                return count > 0 ? `${count} ${count === 1 ? 'item' : 'items'}` : null;
              }}
            </Await>
          </Suspense>
        }
      />
      <Suspense fallback={<RecommendedSkeleton />}>
        <Await resolve={products}>
          {(response) => {
            if (!response) {
              return <RecommendedEmpty state="error" />;
            }
            const items = visibleProducts(response);
            if (items.length === 0) {
              return <RecommendedEmpty state="empty" />;
            }
            return (
              <div className="recommended-products-grid">
                {items.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

function RecommendedEmpty({ state }: { state: 'empty' | 'error' }) {
  return (
    <p className="recommended-products-empty">
      {state === 'error' ? 'New arrivals could not be loaded.' : 'New arrivals are on the way.'}{' '}
      <Link prefetch="intent" to="/collections/all">
        Browse the catalog
      </Link>
    </p>
  );
}

function RecommendedSkeleton() {
  return (
    <div
      className="recommended-products-grid recommended-products-grid--loading"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }, (_, i) => (
        <div className="recommended-skeleton-card" key={i}>
          <Skeleton className="recommended-skeleton-card__media" />
          <div className="recommended-skeleton-card__meta">
            <SkeletonRow style={{ width: '60%' }} />
            <SkeletonRow style={{ width: '25%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollectionProduct on Product {
    id
    title
    handle
    availableForSale
    productType
    vendor
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
    variants(first: 1) {
      nodes {
        id
        title
        availableForSale
      }
    }
  }
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
    products(first: 4) {
      nodes {
        ...FeaturedCollectionProduct
      }
    }
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
    shop {
      name
      brand {
        coverImage {
          image {
            url
          }
        }
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    availableForSale
    productType
    vendor
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
    variants(first: 1) {
      nodes {
        id
        title
        availableForSale
      }
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
