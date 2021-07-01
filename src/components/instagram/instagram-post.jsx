import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaInstagram } from 'react-icons/fa';
import * as s from './instagram-post.module.less';

export default function InstagramPost({ node: { id, localFile } }) {
  return (
    <a href={`https://instagram.com/p/${id}`} className={s.wrapper}>
      <div className={s.overlay}>
        <FaInstagram className={s.icon} />
      </div>
      <GatsbyImage image={localFile.childImageSharp.gatsbyImageData} />
    </a>
  );
}

export const query = graphql`
    fragment InstagramPost on InstaNode {
        id
        localFile {
            childImageSharp {
                gatsbyImageData
            }
        }
} `;
