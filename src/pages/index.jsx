import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image';
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
      shopImages {
        alt
        gatsbyImageData(aspectRatio: 1.5, placeholder: BLURRED)
      }
      shopInformationNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allInstaNode(limit: 10, sort: {fields: timestamp, order: DESC}) {
        ...InstagramPost
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
              height: 720,
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
            <div className="text-center mt-6 mb-4">
              <Button isExternal to="https://instagram.com/collect_piece_work">FOLLOW US</Button>
            </div>
          </div>
        </div>

        {/* Shop Section */}
        <div className={s.shopWrapper}>
          <GatsbyImage
            image={getImage(data.datoCmsTopPage.shopImages[0])}
            alt={data.datoCmsTopPage.shopImages[0].alt}
            style={{
              display: 'block',
            }}
            className={s.firstShopImage}
          />
          <div className="flex flex-col justify-between top-0 bottom-0 h-full pl-5">
            <div className={s.shopInfo}>
              <h2>
                collect piece work
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsTopPage.shopInformationNode.childMarkdownRemark.html,
                }}
              />

            </div>
            <div className={s.otherShopImages}>
              {data.datoCmsTopPage.shopImages.slice(1).map((item) => (
                <GatsbyImage
                  image={item.gatsbyImageData}
                  alt={item.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
