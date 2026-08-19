import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, ExternalLink } from 'lucide-react';
import { CONTACT } from '../data/content';
import usePageMeta from '../lib/usePageMeta';

/** lucide-react ships no TikTok glyph, so this one is drawn inline. */
function TikTok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.77.12v-3.1a5.7 5.7 0 0 0-.77-.05 5.69 5.69 0 1 0 5.69 5.69V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48z" />
    </svg>
  );
}

const socials = [
  {
    name: 'Instagram',
    handle: CONTACT.instagram,
    href: `https://instagram.com/${CONTACT.instagram.replace('@', '')}`,
    icon: <Instagram size={18} />,
  },
  {
    name: 'TikTok',
    handle: CONTACT.tiktok,
    href: `https://www.tiktok.com/${CONTACT.tiktok}`,
    icon: <TikTok size={18} />,
  },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.addressFull)}`;

export default function Contact() {
  usePageMeta(
    'Contact',
    'Visit KG 7 St, Rindiro, Kimironko, Kigali. Call +250 796 690 256 or email afielcouture@gmail.com. Open Monday to Saturday, 8:00 AM to 6:00 PM.',
  );

  return (
    <div className="bg-pearl min-h-screen pb-24">
      {/* Hero. The photograph is bright and busy, so it sits under a charcoal
          veil plus a top-and-bottom gradient: the fabric reads through the
          middle of the band while the type stays legible over it. */}
      <section className="relative isolate overflow-hidden">
        <img
          src="/images/contact/contact-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/95 via-charcoal/45 to-charcoal/95" />

        <div className="relative px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 text-pearl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto text-center"
          >
            <p className="font-sans text-xs text-pearl/60 mb-4">
              <Link to="/" className="hover:text-champagne transition-colors">Home</Link> / Contact
            </p>
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-champagne font-semibold mb-5">
              Let's Create Something Beautiful
            </h3>
            <h1 className="font-serif text-4xl md:text-6xl mb-6 drop-shadow-lg">Get In Touch</h1>
            <span className="block w-14 h-px bg-champagne/70 mx-auto mb-6" />
            <p className="font-sans text-sm md:text-base text-pearl/75 max-w-xl mx-auto leading-relaxed">
              We'd love to hear about your project. Reach out by phone, email, or visit our studio in Kigali.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Phone (Main Line)', value: CONTACT.phoneMain, href: `tel:${CONTACT.phoneMain.replace(/\s/g, '')}` },
              { icon: Phone, label: 'Phone (Support)', value: CONTACT.phoneSupport, href: `tel:${CONTACT.phoneSupport.replace(/\s/g, '')}` },
              { icon: Mail, label: 'Email', value: CONTACT.emailPrimary, href: `mailto:${CONTACT.emailPrimary}` },
              { icon: MapPin, label: 'Studio Address', value: CONTACT.addressFull, href: mapsUrl },
              { icon: Clock, label: 'Hours', value: CONTACT.hours },
            ].map((c) => {
              const body = (
                <>
                  <div className="w-11 h-11 rounded-full bg-burgundy/10 flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-burgundy" />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] uppercase tracking-widest text-burgundy font-semibold mb-1">{c.label}</p>
                    <p className="font-sans text-charcoal font-medium">{c.value}</p>
                  </div>
                </>
              );
              const shell = 'bg-white rounded-2xl border border-charcoal/10 p-6 flex items-start gap-4 shadow-sm';
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`${shell} transition-colors hover:border-burgundy/40`}
                >
                  {body}
                </a>
              ) : (
                <div key={c.label} className={shell}>
                  {body}
                </div>
              );
            })}

            {/* Social */}
            <div className="bg-white rounded-2xl border border-charcoal/10 p-6 shadow-sm">
              <p className="font-sans text-[11px] uppercase tracking-widest text-burgundy font-semibold mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${s.name} ${s.handle}`}
                    className="group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full border border-charcoal/10 text-charcoal hover:bg-charcoal hover:text-pearl hover:border-charcoal transition-colors"
                  >
                    <span className="text-burgundy group-hover:text-champagne transition-colors">{s.icon}</span>
                    <span className="font-sans text-sm font-medium">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-4/3 lg:aspect-auto lg:h-full min-h-80 rounded-2xl overflow-hidden border border-charcoal/10 shadow-sm"
            >
              <img
                src="/images/contact/map.png"
                alt={`Map showing the Afiel Couture studio at ${CONTACT.addressShort}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />

              <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-sm rounded-full pl-5 pr-4 py-3 shadow-lg">
                <span className="flex items-center gap-2.5 min-w-0">
                  <MapPin size={16} className="text-burgundy shrink-0" />
                  <span className="font-sans text-xs font-semibold text-charcoal truncate">{CONTACT.addressShort}</span>
                </span>
                <span className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest text-burgundy font-semibold shrink-0">
                  Directions <ExternalLink size={12} />
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
