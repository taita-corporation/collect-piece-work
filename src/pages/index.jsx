import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Heading from '../components/heading';
import ProductListing from '../components/product-listing';
import { Hero } from '../components/hero';
import * as s from './index.module.less';

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
    datoCmsTopPage {
      conceptContentNode {
        id
        childMarkdownRemark {
          html
        }
      }
      conceptImage {
        alt
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, aspectRatio: 1.5, height: 300)
      }
    }
  }
`;
export default function IndexPage({ data }) {
  return (
    <Layout>
      <div className="container">
        <Hero />

        {/* Concept Section */}
        <div className="relative my-2">
          <StaticImage
            layout="constrained"
            objectFit="cover"
            loading="eager"
            src="../../static/background.png"
            placeholder="tracedSVG"
            className={s.background}
          />
          <div className={s.concept}>
            <div className="relative px-2">
              <GatsbyImage
                image={data.datoCmsTopPage.conceptImage.gatsbyImageData}
                className={s.conceptImage}
                style={{
                  position: 'absolute',
                  transform: 'translateY(-50%)',
                }}
              />
            </div>
            <div className="pr-5 top-0 bottom-0 my-auto">
              <div as="h1" className={s.conceptHeading}>collect piece work</div>
              {/* eslint-disable react/no-danger */}
              <div
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsTopPage.conceptContentNode.childMarkdownRemark.html,
                }}
                className={s.conceptDesc}
              />
            </div>
          </div>
        </div>
        {/* Product Feature Section */}
        <div>
          <Heading>
            FEATURE
          </Heading>
          <ProductListing products={data.shopifyCollection.products} />
        </div>
        {/* Instagram Section */}
        {/* Shop Section */}
      </div>
    </Layout>
  );
}
