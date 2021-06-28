import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
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
        <div className="relative">
          <StaticImage layout="constrained" objectFit="cover" loading="eager" src="../../static/background.png" placeholder="tracedSVG" className={s.background} />
          <div className={s.concept}>
            <div className="relative">
              <GatsbyImage
                image={data.datoCmsTopPage.conceptImage.gatsbyImageData}
                className={s.conceptImage}
                style={{
                  position: 'absolute',
                  transform: 'translateY(-50%)',
                }}
              />
            </div>
            <div>
              <div>collect piece work</div>
              {/* eslint-disable react/no-danger */}
              <div
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsTopPage.conceptContentNode.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
        </div>
        {/* Product Feature Section */}
        {/* <ProductListing products={data.shopifyCollection.products} /> */}
        {/* Instagram Section */}
        {/* Shop Section */}
      </div>
    </Layout>
  );
}
