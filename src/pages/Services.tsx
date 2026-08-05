import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { SERVICES } from '../data/content';
import PlaceholderImage from '../components/PlaceholderImage';

const palette: Record<string, [string, string]> = {
  'fabric-development': ['#D0B685', '#8A6A3D'],
  'alterations-repairs': ['#8A7A6A', '#3A2E24'],
  'fashion-consultation': ['#B8897E', '#7A1E2B'],
};

const colorsFor = (slug: string) => palette[slug] ?? ['#B8897E', '#7A1E2B'];

export default function Services() {
  return (
    // Every service uses one identical block — no viewport-locked lead section,
    // which is what previously made the first service's photos smaller than the
    // rest. The header is compact so the first service still starts on screen.
    <div className="bg-pearl pt-24 md:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-xs text-charcoal/50 mb-1.5">
          <Link to="/" className="hover:text-burgundy">Home</Link> / Services
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">Services</h1>
        <p className="font-sans text-sm text-charcoal/60 max-w-xl mb-12 md:mb-14">
          Beyond our product categories, these are the services that keep every Afiel garment fitting perfectly.
        </p>

        <div className="space-y-20 md:space-y-28">
          {SERVICES.map((s) => {
            const [from, to] = colorsFor(s.slug);
            return (
              <div
                key={s.slug}
                id={s.slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                    <Sparkles size={22} className="text-burgundy" />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">{s.title}</h2>
                  <p className="font-sans text-charcoal/70 leading-relaxed mb-6">{s.description}</p>
                  <ul className="space-y-2 mb-8">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 font-sans text-sm text-charcoal">
                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-block px-8 py-4 bg-burgundy text-pearl font-sans text-[11px] uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-opacity"
                  >
                    Request a Consultation
                  </Link>
                </div>

                {s.wideImages ? (
                  /* Before/after composites: cropping to a portrait card would
                     cut off both halves, so these run full width and stacked,
                     shown whole. */
                  <div className="space-y-4">
                    {s.images.map((image) => (
                      <div key={image.src} className="rounded-3xl overflow-hidden">
                        <PlaceholderImage
                          from={from}
                          to={to}
                          src={image.src}
                          fit="natural"
                          label={image.label}
                          labelClassName="m-4 bg-black/30 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Every card is a 4:5 portrait — the shape of the designer
                     fitting photo — and fills it. */
                  <div className="grid grid-cols-2 gap-4">
                    {s.images.map((image) => (
                      <div key={image.src} className="aspect-4/5 rounded-3xl overflow-hidden">
                        <PlaceholderImage
                          from={from}
                          to={to}
                          src={image.src}
                          fit="cover"
                          label={image.label}
                          labelClassName="m-4 bg-black/30 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
