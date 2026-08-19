import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PlaceholderImage from './PlaceholderImage';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { label: 'Blue Dress', src: '/images/craftsmanship/blue-dress.jpg', from: '#B8897E', to: '#7A1E2B' },
  { label: 'Kitenge Dress', src: '/images/craftsmanship/kitenge-dress.jpg', from: '#B08D5E', to: '#5C4530' },
  { label: 'Mama Afrika', src: '/images/craftsmanship/mama-afrika.jpg', from: '#8A7A6A', to: '#3A2E24' },
  { label: 'Nylon Shorts', src: '/images/craftsmanship/nylon-shorts.jpg', from: '#D0B685', to: '#8A6A3D' },
  { label: 'Outfit Ideas', src: '/images/craftsmanship/outfit-ideas.jpg', from: '#5A5158', to: '#2A2530' },
];

export default function CraftsmanshipGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        x: () => {
          if (!scrollRef.current) return 0;
          return -(scrollRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.1);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          invalidateOnRefresh: true,
          end: () => {
            if (!scrollRef.current) return '+=1000';
            return '+=' + scrollRef.current.scrollWidth;
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-svh min-h-[560px] md:min-h-[700px] bg-charcoal text-pearl border-y border-champagne/10 overflow-hidden flex flex-col">
      <div className="w-full px-6 md:px-12 pt-16 md:pt-24 flex justify-between items-end max-w-7xl mx-auto z-20 pointer-events-none shrink-0 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-champagne font-semibold mb-2 md:mb-4">Behind The Scenes</h3>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl leading-none">Craftsmanship Archive</h2>
        </motion.div>
        <span className="hidden md:block font-sans text-[10px] tracking-widest uppercase text-pearl/50 pb-2">Scroll to explore</span>
      </div>

      <div className="w-full flex-1 flex items-center pb-12 min-h-0 relative z-10">
        <div ref={scrollRef} className="flex gap-6 md:gap-12 px-6 md:px-12 items-center w-max lg:pl-[10vw]">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`relative h-[40svh] sm:h-[50svh] md:h-[60svh] max-h-[500px] w-auto shrink-0 overflow-hidden rounded-2xl ${
                i % 2 === 0 ? 'aspect-[3/4] translate-y-4 md:translate-y-8' : 'aspect-[4/5] -translate-y-4 md:-translate-y-8'
              }`}
            >
              <PlaceholderImage
                from={s.from}
                to={s.to}
                src={s.src}
                alt={s.label}
                sizes="(max-width: 768px) 60vw, 30vw"
                className="hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-lg font-semibold bg-charcoal/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
