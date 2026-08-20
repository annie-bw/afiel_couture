import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, CONTACT } from '../data/content';
import imageUrl from '../lib/imageUrl';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-pearl pt-14 pb-8 px-6 md:px-12 border-t border-champagne/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 border-b border-pearl/10 pb-10">
        <div className="md:col-span-2">
          <img src={imageUrl('/images/logo-light.png')} alt={BRAND.name} className="h-12 w-auto mb-4" />
          <p className="font-sans text-sm text-pearl/60 max-w-sm leading-relaxed mb-2">{BRAND.tagline}.</p>
          {/* The name is written out here, not only inside the logo image. On
              every page it is the one place a search engine reads the business
              name, the trade and the city as plain text. */}
          <p className="font-sans text-sm text-pearl/60 max-w-sm leading-relaxed">
            {BRAND.name} is a bespoke fashion house in Kigali creating custom suits, elegant dresses and tailored
            uniforms, expertly crafted for your style and perfect fit.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-champagne mb-3">Quick Links</h3>
          <ul className="space-y-2 font-sans text-sm text-pearl/80">
            <li><Link to="/" className="hover:text-champagne transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-champagne transition-colors">Products</Link></li>
            <li><Link to="/fabrics" className="hover:text-champagne transition-colors">Fabrics</Link></li>
            <li><Link to="/services" className="hover:text-champagne transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-champagne transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-champagne transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-champagne mb-3">Contact</h3>
          <ul className="space-y-2 font-sans text-sm text-pearl/80">
            <li>{CONTACT.addressShort}</li>
            <li><a href={`mailto:${CONTACT.emailPrimary}`} className="hover:text-champagne transition-colors">{CONTACT.emailPrimary}</a></li>
            <li><a href={`tel:${CONTACT.phoneMain.replace(/\s/g, '')}`} className="hover:text-champagne transition-colors">{CONTACT.phoneMain}</a></li>
            <li className="text-pearl/50">Support: {CONTACT.phoneSupport}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-pearl/40 font-sans tracking-widest uppercase gap-2">
        <span>© {new Date().getFullYear()} {BRAND.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
        <span>Instagram {CONTACT.instagram} · TikTok {CONTACT.tiktok}</span>
      </div>
    </footer>
  );
}
