import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getShopifyImage } from 'gatsby-source-shopify';
import { formatPrice } from '../utils/format-price';
import * as s from './product-card.module.css';

export function ProductCard({ product, eager }) {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    vendor,
    storefrontImages,
  } = product;

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount,
  );

  let storefrontImageData = {};
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node;
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: 'fixed',
        width: 200,
        height: 200,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Link
      className={s.productCardStyle}
      to={slug}
      aria-label={`View ${title} product page`}
    >
      <div className={s.productImageStyle} data-name="product-image-box">
        <GatsbyImage
          alt={firstImage?.altText ?? title}
          image={firstImage?.gatsbyImageData ?? storefrontImageData}
          loading={eager ? 'eager' : 'lazy'}
          className="block rounded-none"
        />
      </div>
      <div className={s.productDetailsStyle}>
        <div className={s.productVendorStyle}>{vendor}</div>
        <h2 as="h2" className={s.productHeadingStyle}>
          {title}
        </h2>
        <div className={s.productPrice}>{price}</div>
      </div>
    </Link>
  );
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 0.8, width: 640, placeholder: "BLURRED")
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`;
