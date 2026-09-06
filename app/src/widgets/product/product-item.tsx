import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  CollectionItemFragment,
  ProductItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '../../entities/product';
import { StickerHover } from '../../shared/ui';

export function ProductItem({
  product,
  loading,
}: {
  product: CollectionItemFragment | ProductItemFragment | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link className="product-item" key={product.id} prefetch="intent" to={variantUrl}>
      {image && (
        <StickerHover>
          {/* No hard-coded aspectRatio prop: the crop is config-driven via
              layout.cardAspectRatio (CSS on main[data-card-aspect=…]). */}
          <Image
            alt={image.altText || product.title}
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        </StickerHover>
      )}
      <div className="product-meta">
        <h4>{product.title}</h4>
        <small className="product-price">
          <Money data={product.priceRange.minVariantPrice} />
        </small>
      </div>
    </Link>
  );
}
