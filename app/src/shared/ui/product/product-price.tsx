import { Money } from '@shopify/hydrogen';
import type { MoneyV2 } from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  let content: React.ReactNode = <span>&nbsp;</span>;

  if (compareAtPrice) {
    content = (
      <div className="product-price-on-sale">
        {price ? <Money data={price} /> : null}
        <s>
          <Money data={compareAtPrice} />
        </s>
      </div>
    );
  } else if (price) {
    content = <Money data={price} />;
  }

  return (
    <div aria-label="Price" className="product-price" role="group">
      {content}
    </div>
  );
}
