import * as React from 'react';
import { graphql, Link } from 'gatsby';
import isEqual from 'lodash.isequal';
import { GatsbyImage, getSrc } from 'gatsby-plugin-image';
import cn from 'classnames';
import Layout from '../../components/layout';
import { StoreContext } from '../../context/store-context';
import AddToCart from '../../components/add-to-cart';
import ProductSlider from '../../components/product-slider';
import { formatPrice } from '../../utils/format-price';
import Seo from '../../components/seo';
import * as s from './product-page.module.less';

export default function Product({ data: { product, suggestions } }) {
  console.log(product);
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    descriptionHtml,
    images,
    images: [firstImage],
  } = product;
  const { client } = React.useContext(StoreContext);

  const [variant, setVariant] = React.useState({ ...initialVariant });
  const [quantity, setQuantity] = React.useState(1);

  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant;

  console.log(productVariant);

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
                <ul>
                  <ProductSlider>
                    {images.map((image, index) => (
                      <li
                        key={`product-image-${image.id}`}
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
                          className={s.productImage}
                        />
                      </li>
                    ))}
                  </ProductSlider>
                </ul>
              </div>
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
            <h2 className={s.priceValue}>
              <span>{price}</span>
            </h2>
            <fieldset className={cn(s.optionsWrapper, { [s.hidden]: !hasVariants })}>
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
            <div className={s.quantityFieldWrapper}>
              <label className="mr-2">
                数量
              </label>
              <select
                aria-label="数量"
                value={quantity}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                className={s.quantityField}
              >
                <option>
                  1
                </option>
                <option>
                  2
                </option>
              </select>
            </div>
            <div className={s.addToCartStyle}>
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              className={s.productDescription}
            />
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
      descriptionHtml
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
        gatsbyImageData(layout: CONSTRAINED, aspectRatio: 0.8)
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
