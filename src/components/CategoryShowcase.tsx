import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, WHY_CHOOSE } from '../data/content';
import PlaceholderImage from './PlaceholderImage';

export default function CategoryShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section className="reveal-section py-24 md:py-32 bg-[#3a2a26] text-pearl relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-bl from-[#7A1E2B]/40 to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5C4530]/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 stagger-container">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16 md:mb-24">
          <div className="max-w-3xl stagger-item">
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-champagne font-semibold mb-6">Our Products</h3>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight mb-8">
              Five categories. <br />
              <span className="italic font-light text-pearl/80">One standard of craft.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-pearl/70 leading-relaxed max-w-lg mb-10">
              From bridal gowns to bulk uniform orders, every category is handled with the same precision and premium fabric.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {WHY_CHOOSE.slice(0, 4).map((label, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors cursor-pointer text-[10px] md:text-xs font-sans tracking-wide uppercase"
                >
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 stagger-item w-full lg:w-auto flex lg:justify-end mt-4 lg:mt-0">
            <Link
              to="/products"
              className="group flex items-center justify-center space-x-4 px-8 py-4 rounded-full border border-pearl/30 hover:bg-pearl hover:text-[#3a2a26] transition-all duration-300 w-full md:w-auto"
            >
              <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">View All Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[1200px] sm:h-[900px] lg:h-[600px] w-full"
          onMouseLeave={() => setHoveredIndex(0)}
        >
          {PRODUCTS.map((prod, idx) => {
            const isExpanded = hoveredIndex === idx;
            return (
              <Link
                to={`/products/${prod.slug}`}
                key={prod.slug}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`stagger-item relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group bg-charcoal/20 block ${
                  isExpanded ? 'lg:flex-[3] flex-[3]' : 'lg:flex-[1] flex-[1]'
                }`}
              >
                <div className="absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-105">
                  <PlaceholderImage from={prod.colorFrom} to={prod.colorTo} src={prod.cover} alt={prod.title} />
                </div>
                <div className={`absolute inset-0 transition-colors duration-[800ms] ${isExpanded ? 'bg-black/10' : 'bg-black/40 group-hover:bg-black/20'}`}></div>

                <div className={`absolute top-6 left-6 font-sans text-xs font-semibold tracking-widest text-white transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 border border-white/30 shadow-xl ${isExpanded ? 'opacity-0 scale-150' : 'opacity-100 scale-100 group-hover:bg-white/30 group-hover:scale-110'}`}>
                  <ArrowRight size={20} className="text-white -rotate-45" />
                </div>

                {isExpanded && (
                  <div className="absolute bottom-10 left-10 right-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards opacity-0">
                    <h4 className="font-serif text-2xl md:text-3xl text-white mb-2">{prod.title}</h4>
                    <p className="font-sans text-xs uppercase tracking-widest text-white/80">{prod.tagline}</p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
