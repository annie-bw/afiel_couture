import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Home is the landing page, so it ships in the first bundle. Every other route
// is fetched when someone actually navigates to it, which keeps the scroll
// machinery on Services and the fabric catalogue out of the initial download.
const Products = lazy(() => import('./pages/Products'));
const FabricsPage = lazy(() => import('./pages/FabricsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* overflow-x-clip, not overflow-x-hidden. `hidden` on one axis forces the
          other axis to `auto`, which makes this div a scroll container, and
          position:sticky then resolves against it instead of the viewport. That
          silently breaks every sticky descendant, including the services stack.
          `clip` clips the same overflow without creating a scroll container. */}
      <div className="min-h-screen bg-pearl text-charcoal overflow-x-clip selection:bg-charcoal selection:text-pearl">
        <Navbar />
        {/* A page-height hold, so the footer does not jump up the screen and
            back down during the fetch. */}
        <Suspense fallback={<div className="min-h-svh bg-pearl" aria-hidden />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<Products />} />
            <Route path="/fabrics" element={<FabricsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
