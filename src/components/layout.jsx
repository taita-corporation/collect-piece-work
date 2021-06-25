import * as React from 'react';
import { SkipNavContent, SkipNavLink } from './skip-nav';
import { Header } from './header';
import { Footer } from './footer';
import Seo from './seo';

function Layout({ children }) {
  return (
    <div className="global-background">
      <Seo />
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  );
}

export default Layout;
