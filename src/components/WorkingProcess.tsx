import React from 'react';
import { motion } from 'motion/react';
import { PROCESS } from '../data/content';

export default function WorkingProcess() {
  return (
    <section className="reveal-section py-24 md:py-32 bg-charcoal text-pearl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-14 md:mb-20">
          <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-champagne font-semibold mb-5">How We Work</h3>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
            Four steps, no guesswork.
          </h2>
          <p className="font-sans text-sm md:text-base text-pearl/70 leading-relaxed">
            The same route whether you are ordering one gown or ten thousand uniforms. You see and approve the work before
            volume starts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative pt-8 border-t border-pearl/15"
            >
              {/* The rule above each card carries a champagne tick at the step it marks */}
              <span className="absolute -top-px left-0 w-10 h-px bg-champagne" />
              <span className="font-sans text-[10px] tracking-[0.25em] text-champagne font-semibold">{p.step}</span>
              <h4 className="font-serif text-xl md:text-2xl mt-3 mb-3">{p.title}</h4>
              <p className="font-sans text-xs md:text-sm text-pearl/60 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
