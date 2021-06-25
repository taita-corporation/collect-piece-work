import * as React from 'react';
import { SkipNavContent, SkipNavLink } from './skip-nav';
import { Header } from './header';
import { Footer } from './footer';
import Seo from './seo';

function Layout({ children }) {
  return (
    <div className="bg-green-200">
      <Seo />
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  );
}

export default Layout;
