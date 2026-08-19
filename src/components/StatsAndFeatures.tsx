import React from 'react';
import { Scissors, Gem, Users, Truck } from 'lucide-react';
import { STATS } from '../data/content';

const features = [
  { icon: <Scissors size={22} className="text-burgundy" />, title: 'Luxury Craftsmanship', desc: 'Every garment finished with meticulous attention to detail.' },
  { icon: <Gem size={22} className="text-burgundy" />, title: 'Premium Fabrics', desc: 'Lace, silk, satin, Ankara, and bridal fabrics sourced with care.' },
  { icon: <Users size={22} className="text-burgundy" />, title: 'Experienced Designers', desc: 'A team that understands fit, culture, and occasion.' },
  { icon: <Truck size={22} className="text-burgundy" />, title: 'Reliable Delivery', desc: 'From single pieces to bulk institutional orders, on schedule.' },
];

export default function StatsAndFeatures() {
  return (
    <section className="reveal-section py-24 md:py-40 bg-blush/40 border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 stagger-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="stagger-item">
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-6">The Operation Behind the Label</h3>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight">
              We own the <br /> whole process.
            </h2>
            <p className="font-sans text-charcoal/70 leading-loose max-w-md text-sm md:text-base">
              Most fashion houses outsource and hope. We run our own textile floor in Kigali, so fabric, cutting, stitching
              and finishing all answer to us. That is why we can promise a date and keep it.
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-charcoal/10 pb-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="stagger-item">
                  <div className="font-serif text-4xl md:text-5xl text-charcoal mb-1.5">{stat.value}</div>
                  <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-burgundy font-semibold mb-2">{stat.label}</div>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed pr-4">{stat.note}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {features.map((feat) => (
                <div key={feat.title} className="stagger-item">
                  <div className="w-12 h-12 rounded-full bg-pearl flex items-center justify-center mb-6 shadow-sm border border-charcoal/5">
                    {feat.icon}
                  </div>
                  <h4 className="font-serif text-xl text-charcoal mb-3">{feat.title}</h4>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed pr-4">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
