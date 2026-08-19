import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/content';
import PlaceholderImage from '../components/PlaceholderImage';
import usePageMeta from '../lib/usePageMeta';

// Two categories per line. Left to flex-wrap the first line took three labels
// and left the last one on its own, so the pairs are split up front instead.
const TABS_PER_ROW = 2;
const TAB_ROWS = Array.from(
  { length: Math.ceil(PRODUCTS.length / TABS_PER_ROW) },
  (_, row) => PRODUCTS.slice(row * TABS_PER_ROW, row * TABS_PER_ROW + TABS_PER_ROW),
);

export default function Products() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const active = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  // The snippet follows the category being viewed, so /products/school-uniforms
  // lists in search as its own page rather than as a copy of /products.
  usePageMeta(active.title, active.description);

  const [index, setIndex] = useState(0);
  const count = active.gallery.length;

  // Switching category restarts its gallery.
  useEffect(() => setIndex(0), [active.slug]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  // Where a card sits relative to the one being viewed, wrapped to the shortest
  // way round so the last slide sits to the left of the first.
  const offsetOf = (i: number) => {
    let offset = i - index;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  // Offsets are a share of each card's own width, and cards are only as wide as
  // their photo, so these run wider than a fixed-frame stack would.
  const placement = (offset: number) => {
    if (offset === 0) return { x: '0%', scale: 1, rotate: 0, opacity: 1 };
    if (offset === -1) return { x: '-34%', scale: 0.88, rotate: -4, opacity: 0.4 };
    if (offset === 1) return { x: '34%', scale: 0.88, rotate: 4, opacity: 0.4 };
    const side = offset < 0 ? -1 : 1;
    return { x: `${side * 48}%`, scale: 0.8, rotate: side * 6, opacity: 0 };
  };

  return (
    // One screen on desktop, natural flow below lg. The category switcher lives
    // in the text column rather than above both, which hands the gallery the
    // full height of the page instead of what is left under a header.
    <div className="bg-pearl flex flex-col pt-24 md:pt-28 pb-8 lg:h-svh lg:overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:flex-1 lg:min-h-0">
        <div>
          <p className="font-sans text-xs text-charcoal/50 mb-1.5">
            <Link to="/" className="hover:text-burgundy">Home</Link> / Products
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-5">Products</h1>

          {/* Category switcher. One flex line per pair; each pair still wraps
              on its own on phones, where two labels do not fit one line. */}
          <div className="flex flex-col gap-2 mb-7">
            {TAB_ROWS.map((row, i) => (
              <div key={i} className="flex flex-wrap gap-2">
                {row.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => navigate(`/products/${p.slug}`)}
                    className={`px-4 py-2 rounded-full font-sans text-[11px] uppercase tracking-wide transition-colors ${
                      active.slug === p.slug
                        ? 'bg-burgundy text-pearl'
                        : 'bg-white text-charcoal border border-charcoal/10 hover:border-burgundy/40'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">{active.title}</h2>
          <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-6">{active.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-block px-7 py-3.5 bg-burgundy text-pearl font-sans text-[11px] uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-opacity"
            >
              Request a Consultation
            </Link>
            <Link
              to="/services"
              className="inline-block px-7 py-3.5 border border-charcoal/20 text-charcoal font-sans text-[11px] uppercase tracking-[0.2em] rounded-full hover:border-burgundy hover:text-burgundy transition-colors"
            >
              Explore Services →
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full h-105 sm:h-130 lg:h-full lg:min-h-0">
          <div className="relative flex-1 min-h-0 overflow-hidden">
            {/* Signature Stack. One card per gallery image, each animating to
                the slot its offset dictates — so the left card travels into
                the centre rather than the centre card changing art. */}
            {active.gallery.map((image, i) => {
              const offset = offsetOf(i);
              // Only the centre, its neighbours, and the pair just off-stage
              // are mounted — a large category would otherwise load every
              // photo at once for three visible cards.
              if (Math.abs(offset) > 2) return null;
              const isCentre = offset === 0;
              const isNeighbour = Math.abs(offset) === 1;
              return (
                // Outer box only centres; the card inside takes the photo's
                // own shape, so no frame remains for empty space to show in.
                <div
                  key={image.src}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ zIndex: isCentre ? 30 : isNeighbour ? 20 : 10 }}
                >
                  <motion.div
                    onClick={isNeighbour ? () => go(offset) : undefined}
                    animate={placement(offset)}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative h-full aspect-2/3 max-w-full rounded-3xl overflow-hidden ${
                      isCentre ? 'shadow-2xl' : 'shadow-lg'
                    } ${isNeighbour ? 'cursor-pointer' : 'pointer-events-none'}`}
                  >
                    <PlaceholderImage
                      from={active.colorFrom}
                      to={active.colorTo}
                      src={image.src}
                      alt={`${active.title}: ${image.label}`}
                      fit="cover"
                      label={isCentre ? image.label : undefined}
                      labelClassName="m-6 bg-black/30 rounded-full"
                    />
                  </motion.div>
                </div>
              );
            })}

            {/* Prev / next */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-pearl/90 text-charcoal shadow-lg flex items-center justify-center hover:bg-burgundy hover:text-pearl transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-pearl/90 text-charcoal shadow-lg flex items-center justify-center hover:bg-burgundy hover:text-pearl transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Slide indicators. Dots stay readable up to six images; past that
              a caption and counter beat a row of sixteen identical dots. */}
          <div className="flex justify-center items-center gap-2 pt-4 shrink-0 min-h-6">
            {count <= 6 ? (
              active.gallery.map((image, i) => (
                <button
                  key={image.src}
                  onClick={() => setIndex(i)}
                  aria-label={`View ${image.label}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-6 bg-burgundy' : 'w-1.5 bg-charcoal/25 hover:bg-charcoal/50'
                  }`}
                />
              ))
            ) : (
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-charcoal/50">
                <span className="text-burgundy font-semibold">{active.gallery[index].label}</span>
                <span className="mx-2 text-charcoal/25">·</span>
                {index + 1} / {count}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
