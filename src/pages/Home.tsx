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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

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

      if (heroRef.current && heroBgRef.current) {
        gsap.set(heroBgRef.current, { scale: 1, transformPerspective: 1000 });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { width, height, left, top } = heroRef.current!.getBoundingClientRect();
          const x = (clientX - left) / width - 0.5;
          const y = (clientY - top) / height - 0.5;

          gsap.to(heroBgRef.current, {
            x: x * -40,
            y: y * -40,
            rotationY: x * 10,
            rotationX: y * -10,
            scale: 1.03,
            ease: 'power2.out',
            duration: 1,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(heroBgRef.current, { x: 0, y: 0, rotationY: 0, rotationX: 0, scale: 1, ease: 'power2.out', duration: 1.5 });
        };

        heroRef.current.addEventListener('mousemove', handleMouseMove);
        heroRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-svh w-full flex flex-col justify-center bg-charcoal text-pearl overflow-hidden">
        {/* The photograph, oversized so the parallax drift never exposes an edge.
            It is a portrait shot in a landscape frame, so the crop is vertical:
            object-position pins it just above centre, which keeps the draped
            fabric and the armchair in view and loses only floor and ceiling. */}
        <div className="absolute top-[-10%] left-[-10%] right-[-10%] bottom-[-20%] z-0 pointer-events-none">
          <div ref={heroBgRef} className="absolute inset-0 w-full h-full">
            <PlaceholderImage
              from="#4a3530"
              to="#1C1A17"
              src={SITE_IMAGES.homeHero}
              alt="Fabric draped on ladder racks in the Afiel Couture showroom in Kigali"
              imgClassName="object-[center_42%]"
            />
          </div>
        </div>

        {/* Scrims, pinned to the viewport rather than to the oversized image, so
            each gradient lands exactly where the type sits. The rightward ramp
            stops at charcoal/15 instead of transparent: the photograph is bright
            and warm, and letting it run clear would overpower the headline. */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <div className="absolute inset-0 bg-charcoal/45"></div>
          <div className="absolute inset-0 bg-linear-to-r from-charcoal/95 via-charcoal/60 to-charcoal/15"></div>
          <div className="absolute inset-0 bg-linear-to-b from-charcoal/75 via-transparent to-charcoal"></div>
          {/* Vignette centred on the fabric, so the eye lands there and the
              corners fall away instead of ending on a hard edge. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(115% 85% at 70% 44%, rgba(28,26,23,0) 0%, rgba(28,26,23,0.45) 66%, rgba(28,26,23,0.88) 100%)',
            }}
          ></div>
        </div>

        <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none">
          <TextCurtain />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center mt-12 sm:mt-0">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="max-w-xs sm:max-w-md md:max-w-xl">
            <div className="flex items-center space-x-2 mb-4 md:mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse"></div>
              <h2 className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-pearl/80 font-medium">{BRAND.eyebrow}</h2>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] md:leading-[1.05] tracking-tight text-pearl mb-6 md:mb-8 drop-shadow-lg">
              Clothing that reflects<br className="hidden md:block" />
              <span className="text-pearl/80 font-serif italic font-normal block mt-2 md:inline md:mt-0">your confidence.</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Link to="/contact" className="bg-pearl text-charcoal px-6 py-3 md:px-7 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-champagne transition-colors shadow-xl">
                Book a Consultation
              </Link>
              <Link to="/products" className="flex items-center border border-pearl/30 text-pearl/90 hover:bg-pearl/10 hover:text-champagne hover:border-champagne/50 px-5 py-3 md:px-6 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors">
                Explore Products →
              </Link>
              <Link to="/services" className="flex items-center border border-pearl/30 text-pearl/90 hover:bg-pearl/10 hover:text-champagne hover:border-champagne/50 px-5 py-3 md:px-6 rounded-full font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors">
                Explore Services →
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }} className="hidden md:flex flex-col space-y-12 text-right mt-12 md:mt-0">
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
            <PlaceholderImage from="#B8897E" to="#5C4530" src={SITE_IMAGES.homeStory} alt="Afiel Couture tailor at work" />
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
            We are a couture house sitting on top of a working textile mill. The cloth in your gown was dyed and finished by the
            same company that cut it. Nothing waits on an importer, and nothing leaves Kigali to be made.
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

      {/* Testimonials. The quotes in TESTIMONIALS are stand-ins, not real client
          statements, so swap them for attributable ones before this goes live. */}
      <section className="reveal-section py-24 md:py-32 bg-pearl px-6 md:px-12">
        <div className="max-w-7xl mx-auto stagger-container">
          <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-burgundy font-semibold mb-4 stagger-item">What Our Clients Say</h3>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-14 stagger-item">Trusted by families & institutions.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="stagger-item bg-blush/30 rounded-2xl p-8">
                <p className="font-serif italic text-lg text-charcoal mb-6 leading-relaxed">"{t.quote}"</p>
                <p className="font-sans text-xs uppercase tracking-widest text-burgundy font-semibold">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CraftsmanshipGallery />
    </>
  );
}
