import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import ProductListing from '../components/product-listing';
import { Hero } from '../components/hero';
import {
  container,
  intro,
  callOut,
  callToAction,
  deployButton,
} from './index.module.css';

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`;
export default function IndexPage({ data }) {
  return (
    <Layout>
      <div className="container">
        <Hero />
        {/* <ProductListing products={data.shopifyCollection.products} /> */}
      </div>
    </Layout>
  );
}
