import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CalendarCheck, Ruler } from 'lucide-react';
import { ADVANTAGES } from '../data/content';

const icons = [ShieldCheck, CalendarCheck, Ruler];

export default function Advantages() {
  return (
    // Pearl rather than blush: this sits directly under the stats band, which is
    // blush, and two identical backgrounds would merge into one long section.
    <section className="py-24 md:py-28 bg-pearl border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-5">Our Advantage</h3>
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-14 max-w-2xl leading-tight">
          Why institutions keep coming back.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ADVANTAGES.map((a, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-charcoal/10 p-8"
              >
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-6">
                  <Icon size={20} className="text-burgundy" />
                </div>
                <h4 className="font-serif text-xl text-charcoal mb-3">{a.title}</h4>
                <p className="font-sans text-sm text-charcoal/65 leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
