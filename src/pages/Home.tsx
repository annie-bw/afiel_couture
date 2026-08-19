import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import TextCurtain from '../components/TextCurtain';
import Ticker from '../components/Ticker';
import CategoryShowcase from '../components/CategoryShowcase';
import CraftsmanshipGallery from '../components/CraftsmanshipGallery';
import WorkingProcess from '../components/WorkingProcess';
import PlaceholderImage from '../components/PlaceholderImage';
import { BRAND, TESTIMONIALS, SITE_IMAGES } from '../data/content';
import usePageMeta from '../lib/usePageMeta';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  usePageMeta(
    'Afiel Couture',
    'Afiel Couture is a Kigali couture house and textile manufacturer: bespoke tailoring, umushanana, school and corporate uniforms, fabrics, and alterations.',
  );

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.batch('.reveal-section', {
        interval: 0.15,
        batchMax: 5,
        onEnter: (batch) =>
          gsap.fromTo(batch, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out', overwrite: true }),
        start: 'top 85%',
        once: true,
      });

      gsap.utils.toArray('.stagger-container').forEach((container: any) => {
        const items = container.querySelectorAll('.stagger-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.15,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: container, start: 'top 80%', once: true },
            }
          );
        }
      });

    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-svh xl:h-svh w-full flex flex-col justify-center bg-charcoal text-pearl overflow-hidden pt-24 pb-16 xl:py-0">
        {/* The hanging letters, behind the figure so they read around the
            cutout's silhouette. No mix-blend-overlay any more: overlay against a
            near-black base returns almost the base colour, so once the hero
            background became charcoal instead of a mid-toned photograph the
            letters all but disappeared. Plain opacity instead, kept low: the
            canvas already draws at 0.7 alpha, so 0.08 here lands near 0.055
            effective: present as texture, but you have to look for it. */}
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <TextCurtain />
        </div>

        {/* Settles to solid charcoal at the base, under the Ticker. */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-transparent to-charcoal pointer-events-none"></div>

        {/* Three columns from xl, all vertically centred. Below xl they stack in
            DOM order: headline, figure, stats. The row is capped at 1600 rather
            than 1280 so the figure fits without narrowing the headline. */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-8 sm:gap-12 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_auto] xl:items-center xl:gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="max-w-xs sm:max-w-md md:max-w-xl">
            <div className="flex items-center space-x-2 mb-4 md:mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse"></div>
              <h2 className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-pearl/80 font-medium">{BRAND.eyebrow}</h2>
            </div>

            <h1 className="font-sans text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] md:leading-[1.05] tracking-tight text-pearl mb-5 sm:mb-6 md:mb-8 drop-shadow-lg">
              Clothing that reflects<br className="hidden md:block" />
              <span className="text-pearl/80 font-serif italic font-normal block mt-2 md:inline md:mt-0">your confidence.</span>
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 md:gap-4">
              <Link to="/contact" className="bg-pearl text-charcoal px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-champagne transition-colors shadow-xl">
                Book a Consultation
              </Link>
              <Link to="/products" className="flex items-center border border-pearl/30 text-pearl/90 hover:bg-pearl/10 hover:text-champagne hover:border-champagne/50 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors">
                Explore Products →
              </Link>
              <Link to="/services" className="flex items-center border border-pearl/30 text-pearl/90 hover:bg-pearl/10 hover:text-champagne hover:border-champagne/50 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors">
                Explore Services →
              </Link>
            </div>
          </motion.div>

          {/* Middle column: the figure. No background, border, shadow or card,
              so it sits directly on the hero's charcoal. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* The figure holds still. It used to drift and tilt with the
                pointer, which also meant it never sat where it was composed to
                sit. No transform here now, so nothing to hint to the compositor
                either. */}
            <div>
              <img
                src={SITE_IMAGES.homeHero}
                alt="A model in a black and gold ruffled couture gown by Afiel Couture"
                width={645}
                height={1489}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-auto max-h-[30svh] sm:max-h-[44svh] md:max-h-[52svh] max-w-full object-contain xl:max-h-[88svh]"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }} className="hidden md:flex flex-col space-y-12 text-right">
            <div>
              <div className="flex justify-end gap-1.5 mb-2.5">
                <div className="w-1 h-1 bg-champagne/80 rounded-full"></div>
                <div className="w-1 h-1 bg-champagne/80 rounded-full"></div>
                <div className="w-1 h-1 bg-champagne/80 rounded-full"></div>
              </div>
              <h3 className="font-sans text-xl text-pearl font-light mb-1">26+ Years</h3>
              <p className="font-sans text-[9px] uppercase tracking-widest text-pearl/50">Textile and Garment Experience</p>
            </div>
            <div>
              <div className="flex justify-end gap-1.5 mb-2.5">
                <div className="w-1 h-1 bg-champagne/80 rounded-full"></div>
                <div className="w-1 h-1 bg-champagne/80 rounded-full"></div>
                <div className="w-1 h-1 bg-champagne/80 rounded-full"></div>
              </div>
              <h3 className="font-sans text-xl text-pearl font-light mb-1">Kigali, Rwanda</h3>
              <p className="font-sans text-[9px] uppercase tracking-widest text-pearl/50">Our Own Production Floor</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 w-full z-20 pointer-events-auto">
          <Ticker />
        </div>
      </section>

      {/* Philosophy / Our Story teaser */}
      <section className="reveal-section relative z-10 bg-pearl py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-champagne/20 -z-10 transform -rotate-2"></div>
          <div className="w-full aspect-4/5 shadow-lg">
            <PlaceholderImage
              from="#B8897E"
              to="#5C4530"
              src={SITE_IMAGES.homeStory}
              alt="Afiel Couture tailor at work"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-charcoal text-pearl p-8 hidden md:block z-10 shadow-xl max-w-50">
            <p className="font-serif italic text-xl">"Where every stitch defines elegance."</p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold">Made in Rwanda</h3>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-charcoal">From fabric to finish, under one roof.</h2>
          <div className="h-px w-12 bg-charcoal/20"></div>
          <p className="font-sans text-charcoal/70 leading-loose max-w-md text-sm md:text-base">
            Where textile craftsmanship meets couture. From the fabric itself to the final stitch, every piece is created with
            care, craftsmanship, and intention under one roof in Kigali.
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-4 bg-transparent border border-charcoal text-charcoal font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-charcoal hover:text-pearl transition-colors duration-300"
          >
            Discover Our Story
          </Link>
        </div>
      </section>

      <CategoryShowcase />
      <WorkingProcess />

      {/* Testimonials. The quotes are still stand-ins rather than statements a
          client has given us, so replace them, and the institutions named in
          their roles, once real ones are in hand. */}
      <section className="reveal-section py-24 md:py-32 bg-pearl px-6 md:px-12">
        <div className="max-w-7xl mx-auto stagger-container">
          <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-4 stagger-item">What Our Clients Say</h3>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal mb-10 md:mb-14 stagger-item">Trusted by families & institutions.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="stagger-item bg-blush/30 rounded-2xl p-6 sm:p-8">
                <p className="font-serif italic text-base sm:text-lg text-charcoal mb-6 leading-relaxed">"{t.quote}"</p>
                <p className="font-sans text-xs uppercase tracking-widest text-burgundy font-semibold">{t.author}</p>
                <p className="font-sans text-[11px] text-charcoal/50 mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CraftsmanshipGallery />
    </>
  );
}
