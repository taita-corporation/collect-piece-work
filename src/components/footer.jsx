import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import * as s from './footer.module.less';

export function Footer() {
  return (
    <footer className="container relative h-52 md:h-72 mt-8 py-2">
      <StaticImage
        src="../../static/collect_flower.png"
        placeholder="tracedSVG"
        className={s.background}
      />
      <nav className={s.nav} aria-label="footer">
        <ul className={s.footerNavList}>
          <li className={cn(s.footerNavListItem, s.navTitle)}>
            collect piece work online shop
          </li>
          <li className={s.footerNavListItem}>
            <a href="https://www.gatsbyjs.com/cloud/">タイタコーポレイション</a>
          </li>
        </ul>
        <ul className={s.footerNavList}>
          <li className={s.footerNavListItem}>
            <a href="https://github.com/gatsbyjs/gatsby-starter-shopify">
              プライバシーポリシー
            </a>
          </li>
          <li className={s.footerNavListItem}>
            <a href="https://www.gatsbyjs.com/cloud/">特定商取引法に基づく表記</a>
          </li>
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
