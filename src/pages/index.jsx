import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import Layout from '../components/layout';
import Heading from '../components/heading';
import ProductListing from '../components/product-listing';
import Button from '../components/button';
import InstagramPost from '../components/instagram/instagram-post';
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
    allInstaNode(limit: 10) {
      nodes {
        ...InstagramPost
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
            src="../../static/collect_flower.png"
            quality={70}
            placeholder="tracedSVG"
            className={s.background}
            style={{
              height: 520,
            }}
            alt="flower background"
          />
          <div className={cn(s.frame, s.concept)}>
            <div className="relative px-2">
              <GatsbyImage
                image={data.datoCmsTopPage.conceptImage.gatsbyImageData}
                className={s.conceptImage}
                alt={data.datoCmsTopPage.conceptImage.alt}
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
          <Heading bgColor="green">FEATURE</Heading>
          <ProductListing products={data.shopifyCollection.products} />
          <div className="text-center my-4">
            <Button to="/products">VIEW MORE</Button>
          </div>
        </div>

        {/* Instagram Section */}
        <div className="relative my-2">
          <StaticImage
            layout="constrained"
            objectFit="cover"
            loading="eager"
            src="../../static/flower.png"
            quality={70}
            placeholder="tracedSVG"
            className={s.background}
            style={{
              height: 920,
            }}
            alt="flower background"
          />
          <div className={cn(s.frame, s.instagram)}>
            <Heading bgColor="white">INSTAGRAM</Heading>
            <div className="grid grid-cols-5">
              {data.allInstaNode.nodes.map((node) => (
                <InstagramPost key={node.id} node={node} />
              ))}
            </div>
          </div>
        </div>
        {/* Shop Section */}
      </div>
    </Layout>
  );
}
