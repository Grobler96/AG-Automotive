import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StickyCTA from './StickyCTA';

/** A new page starts at the top, instead of keeping the scroll position of the page before. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col pb-[4.5rem] md:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-lime focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
