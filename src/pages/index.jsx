import React, { useState, useEffect } from 'react';
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

const unified = require('unified');
const markdown = require('remark-parse');
const html = require('remark-html');
const breaks = require('remark-breaks');

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
          excerpt
        }
      }
    }
    allInstaNode(limit: 10, sort: {fields: timestamp, order: DESC}) {
        ...InstagramPost
    }
  }
`;

export default function IndexPage({ data }) {
  const [width, setWidth] = useState(undefined);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const instaPosts = data.allInstaNode.nodes.map((node) => (
    <InstagramPost key={node.id} node={node} />
  ));

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
            className={cn(s.background, s.concept)}
            alt="flower background"
          />
          <div className={cn(s.frame, s.concept)}>
            <div className="relative px-2 text-center">
              <GatsbyImage
                image={data.datoCmsTopPage.conceptImage.gatsbyImageData}
                className={s.conceptImage}
                alt={data.datoCmsTopPage.conceptImage.alt}
              />
            </div>
            <div className="text-center md:pr-5 md:top-0 md:bottom-0 md:my-auto">
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
        <div className="py-8">
          <Heading bgColor="green">FEATURE</Heading>
          <ProductListing products={data.shopifyCollection.products} />
          <div className="text-center my-4">
            <Button to="/products">VIEW MORE</Button>
          </div>
        </div>

        {/* Instagram Section */}
        {width < 768 && (
        <Heading bgColor="green">
          INSTAGRAM
        </Heading>
        ) }
        <div className="relative my-8">
          <StaticImage
            layout="constrained"
            objectFit="cover"
            loading="eager"
            src="../../static/flower.png"
            quality={70}
            placeholder="tracedSVG"
            className={cn(s.background, s.instagram)}
            alt="flower background"
          />
          <div className={cn(s.frame, s.instagram)}>
            {width >= 768 && <Heading bgColor="white">INSTAGRAM</Heading> }
            <div className={cn(s.listing, 'lg:mt-6')}>
              {width < 768 ? instaPosts.slice(0, 6)
                : width < 1280 ? instaPosts.slice(0, 8) : instaPosts}
            </div>
            <div className="text-center mt-6 lg:mt-20 mb-4">
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
          <div className="flex flex-col justify-between md:top-0 md:bottom-0 md:h-full md:pl-5">
            <div className={s.shopInfo}>
              <h2>
                collect piece work
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: unified()
                    .use(markdown)
                    .use(breaks)
                    .use(html)
                    .processSync(
                      data.datoCmsTopPage.shopInformationNode.childMarkdownRemark.excerpt,
                    ).contents,
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
