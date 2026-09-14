import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  CollectionItemFragment,
  ProductItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '../../entities/product';
import { AddToCartButton } from '../../features/product-form';

type ProductCardFragment =
  CollectionItemFragment | ProductItemFragment | RecommendedProductFragment;

/**
 * Product card — the lightweight catalog card used in the home and collection
 * grids (not the product page): a media canvas with an optional status badge
 * and an accent quick-add bar, then title/price and product metadata.
 * Source: the responsive ProductCard wireframe (design-system pages/products.md).
 */
export function ProductItem({
  product,
  loading,
}: {
  product: ProductCardFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const variant = product.variants.nodes[0];
  const variantTitle = variant?.title && variant.title !== 'Default Title' ? variant.title : null;
  const metaTags = [product.vendor, variantTitle].filter((tag): tag is string => Boolean(tag));
  return (
    <article className="product-card">
      <div className="product-media-canvas">
        <Link
          aria-hidden="true"
          className="product-media-link"
          prefetch="intent"
          tabIndex={-1}
          to={variantUrl}
        >
          {image ? (
            <Image
              alt={image.altText || product.title}
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
            />
          ) : (
            <span className="product-media-placeholder">Product shot</span>
          )}
        </Link>
        {product.availableForSale ? null : <span className="product-card-badge">Sold out</span>}
        {variant ? (
          <AddToCartButton
            className="product-quick-add"
            disabled={!variant.availableForSale}
            lines={[{ merchandiseId: variant.id, quantity: 1 }]}
          >
            Quick add +
          </AddToCartButton>
        ) : null}
      </div>
      <div className="product-details">
        <h4 className="product-card-title">
          <Link prefetch="intent" to={variantUrl}>
            {product.title}
          </Link>
        </h4>
        {product.productType ? <p className="product-flavor-notes">{product.productType}</p> : null}
        <div className="product-meta-footer">
          {metaTags.map((tag) => (
            <span className="meta-tag" key={tag}>
              {tag}
            </span>
          ))}
          <span className="product-card-price">
            <Money data={product.priceRange.minVariantPrice} />
          </span>
        </div>
      </div>
    </article>
  );
}
