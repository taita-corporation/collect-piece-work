import * as React from 'react';
import { graphql, Link } from 'gatsby';
import isEqual from 'lodash.isequal';
import { GatsbyImage, getSrc } from 'gatsby-plugin-image';
import Layout from '../../components/layout';
import { StoreContext } from '../../context/store-context';
import AddToCart from '../../components/add-to-cart';
import { NumericInput } from '../../components/numeric-input';
import { formatPrice } from '../../utils/format-price';
import Seo from '../../components/seo';
import * as s from './product-page.module.css';

export default function Product({ data: { product, suggestions } }) {
  console.log(product);
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product;
  const { client } = React.useContext(StoreContext);

  const [variant, setVariant] = React.useState({ ...initialVariant });
  const [quantity, setQuantity] = React.useState(1);

  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale,
  );

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result = fetchedProduct?.variants.filter(
          (variant) => variant.id === productVariant.storefrontId,
        ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product],
  );

  const handleOptionChange = (index, event) => {
    const { value } = event.target;

    if (value === '') {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find((variant) => isEqual(currentOptions, variant.selectedOptions));

    setVariant({ ...selectedVariant });
  };

  React.useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price,
  );

  const hasVariants = variants.length > 1;
  const hasImages = images.length > 0;
  const hasMultipleImages = true || images.length > 1;

  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className="container mt-4">
        <div className={s.productBox}>
          {hasImages && (
            <div className={s.productImageWrapper}>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul className={s.productImageList}>
                  {images.map((image, index) => (
                    <li
                      key={`product-image-${image.id}`}
                      className={s.productImageListItem}
                    >
                      <GatsbyImage
                        objectFit="contain"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        alt={
                          image.altText
                            ? image.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                        image={image.gatsbyImageData}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {hasMultipleImages && (
                <div className={s.scrollForMore} id="instructions">
                  <span aria-hidden="true">←</span>
                  {' '}
                  scroll for more
                  {' '}
                  <span aria-hidden="true">→</span>
                </div>
              )}
            </div>
          )}
          {!hasImages && (
            <span className={s.noImagePreview}>No Preview image</span>
          )}
          <div>
            {/* <div className={breadcrumb}>
              <Link to={product.productTypeSlug}>{product.productType}</Link>
              <ChevronIcon size={12} />
          </div> */}
            <h1 className={s.header}>{title}</h1>
            <p className={s.productDescription}>{description}</p>
            <h2 className={s.priceValue}>
              <span>{price}</span>
            </h2>
            <fieldset className={s.optionsWrapper}>
              {hasVariants
                && options.map(({ id, name, values }, index) => (
                  <div className={s.selectVariant} key={id}>
                    <select
                      aria-label="Variants"
                      onChange={(event) => handleOptionChange(index, event)}
                    >
                      <option value="">{`Select ${name}`}</option>
                      {values.map((value) => (
                        <option value={value} key={`${name}-${value}`}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </fieldset>
            <div className={s.addToCartStyle}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 1))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                value={quantity}
                min="1"
                max="1"
              />
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
            <div className={s.metaSection}>
              <span className={s.labelFont}>Type</span>
              <span className={s.tagList}>
                <Link to={product.productTypeSlug}>{product.productType}</Link>
              </span>
              <span className={s.labelFont}>Tags</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 0.8)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
