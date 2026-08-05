import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { VISION_MISSION, FAQS, SITE_IMAGES } from '../data/content';
import PlaceholderImage from '../components/PlaceholderImage';
import StatsAndFeatures from '../components/StatsAndFeatures';
import Advantages from '../components/Advantages';

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-32 md:pt-40 pb-0 bg-pearl min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-sans text-xs text-charcoal/50 mb-3">
          <Link to="/" className="hover:text-burgundy">Home</Link> / About Us
        </p>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-4">Our Story</h3>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Weaving craftsmanship into every stitch.
            </h1>
            <p className="font-sans text-charcoal/70 leading-loose">
              Afiel Couture was built on a belief that clothing should reflect the personality, confidence, and lifestyle of the
              person wearing it. From a small tailoring studio in Kigali, we've grown into a full-service fashion house, crafting
              bespoke garments, celebrating Rwandan heritage through our Mushanana collection, producing uniforms for schools and
              companies, and sourcing premium fabric for clients across the region. Every piece that leaves our studio carries the
              same meticulous attention to detail as our very first.
            </p>
          </div>
          <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
            <PlaceholderImage from="#B8897E" to="#5C4530" src={SITE_IMAGES.aboutStory} alt="Inside the Afiel Couture studio" />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white rounded-2xl border border-charcoal/10 p-8">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-burgundy font-semibold mb-4">Our Vision</h3>
            <p className="font-sans text-charcoal/70 leading-relaxed">{VISION_MISSION.vision}</p>
          </div>
          <div className="bg-white rounded-2xl border border-charcoal/10 p-8">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-burgundy font-semibold mb-4">Our Mission</h3>
            <p className="font-sans text-charcoal/70 leading-relaxed">{VISION_MISSION.mission}</p>
          </div>
        </div>

        {/* Workshop photos */}
        <div className="mb-24">
          <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-6">Behind The Scenes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SITE_IMAGES.aboutWorkshop.map((image, i) => {
              const palette = [
                ['#D0B685', '#8A6A3D'],
                ['#8A7A6A', '#3A2E24'],
                ['#B8897E', '#7A1E2B'],
                ['#B08D5E', '#5C4530'],
              ];
              const [from, to] = palette[i % palette.length];
              return (
                // Each card lifts and fades in as it enters, staggered left to
                // right, then eases into a slow zoom on hover.
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group aspect-4/5 rounded-2xl overflow-hidden"
                >
                  <PlaceholderImage
                    from={from}
                    to={to}
                    src={image.src}
                    fit="cover"
                    label={image.label}
                    className="transition-transform duration-1200 ease-out group-hover:scale-110"
                    labelClassName="m-4 bg-black/30 rounded-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <StatsAndFeatures />

      <Advantages />

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-4">FAQ</h3>
        <h2 className="font-serif text-4xl text-charcoal mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="border border-charcoal/10 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-serif text-lg text-charcoal">{f.q}</span>
                <ChevronDown size={18} className={`text-burgundy shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && <p className="px-6 pb-5 font-sans text-sm text-charcoal/70 leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
