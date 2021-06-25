import * as React from 'react';
import Logo from '../icons/logo';
import * as s from './footer.module.css';

export function Footer() {
  return (
    <footer className={s.footerStyle}>
      <div className={s.blurb}>
        <div className={s.logos}>
          <Logo />
        </div>
        <strong>gatsby-starter-shopify</strong>
        {' '}
        change this by editing
        {' '}
        <code>src/components/footer.jsx</code>
      </div>
      <nav className={s.links} aria-label="footer">
        <ul className={s.footerNavList}>
          <li className={s.footerNavListItem}>
            <a href="https://github.com/gatsbyjs/gatsby-starter-shopify">
              Source Code and Docs
            </a>
          </li>
          <li className={s.footerNavListItem}>
            <a href="https://www.gatsbyjs.com/cloud/">About Gatsby Cloud</a>
          </li>
          {process.env.GATSBY_DEMO_STORE === 'true' && (
            <li className={s.footerNavListItem}>
              <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
                <img
                  src="https://www.gatsbyjs.com/deploynow.png"
                  alt="Deploy to Gatsby Cloud"
                  height="38"
                  width="251"
                />
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className={s.copyright}>
        Copyright &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        · All rights reserved
      </div>
    </footer>
  );
}
