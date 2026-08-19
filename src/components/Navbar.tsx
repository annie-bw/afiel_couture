import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BRAND } from '../data/content';
import imageUrl from '../lib/imageUrl';

// Both the desktop row and the mobile overlay map over this, so a single entry
// picks up the shared type styling, active state, and hover behaviour.
const links = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Fabrics', to: '/fabrics' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
];

// Routes whose hero sits on a dark background — everywhere else the page
// starts on pearl, so the unscrolled navbar has to switch to dark text.
const DARK_HERO_ROUTES = ['/', '/contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The scrolled bar and the open mobile menu are both dark surfaces.
  const onLight = !scrolled && !isOpen && !DARK_HERO_ROUTES.includes(pathname);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal/90 backdrop-blur-md py-4 text-pearl shadow-sm'
          : onLight
            ? 'bg-pearl/80 backdrop-blur-md py-8 text-charcoal'
            : 'bg-transparent py-8 text-pearl'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* The wordmark is a custom calligraphic script, so it ships as artwork
            rather than type. Two colour variants swap with the bar's surface. */}
        <Link to="/" className="relative z-10 flex items-center" aria-label={`${BRAND.name} home`}>
          <img
            src={imageUrl(onLight ? '/images/logo-dark.png' : '/images/logo-light.png')}
            alt={BRAND.name}
            className={`w-auto transition-all duration-500 ${scrolled ? 'h-9' : 'h-11'}`}
          />
        </Link>

        <div className="hidden md:flex space-x-10 text-[13px] font-sans font-medium">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `hover:opacity-70 transition-opacity ${
                  isActive ? (onLight ? 'text-burgundy font-semibold' : 'text-champagne') : ''
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className={`px-6 py-2.5 rounded-full font-sans text-[13px] font-medium transition-colors shadow-sm ${
              onLight
                ? 'bg-charcoal text-pearl hover:bg-burgundy'
                : 'bg-pearl text-charcoal hover:bg-champagne'
            }`}
          >
            Contact Us
          </Link>
        </div>

        <button className="md:hidden relative z-10" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-0 left-0 w-full h-svh bg-charcoal text-pearl py-24 px-6 flex flex-col space-y-8 text-center"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setIsOpen(false)}
                className="font-sans text-2xl font-medium tracking-wide text-pearl/80 hover:text-champagne transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="font-sans text-2xl font-medium tracking-wide text-champagne mt-8"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
