# Afiel Couture — Website

Bespoke tailoring, Mushanana wear, uniforms, and premium fabrics — reskinned onto the
Privea/Aura Beauty animation-rich template (React 19 + Vite + Tailwind CSS 4 + GSAP + Motion + Lenis).

## Structure

- `src/data/content.ts` — all copy lives here (products, services, FAQs, stats, contact info).
  Edit this file first for any text/content change.
- `src/components/PlaceholderImage.tsx` — gradient stand-in for real photography. Every
  image in the site currently uses this; swap for `<img src="..." />` once real garment
  and studio photos are ready.
- `src/pages/` — Home, Products (`/products/:slug`), Services, About, Contact.
- `src/components/` — shared pieces: Navbar, Footer, Ticker, TextCurtain (interactive canvas
  hero effect), CategoryShowcase (hover-expand product gallery), StatsAndFeatures,
  CraftsmanshipGallery (pinned horizontal-scroll section).

## Known placeholders to replace

- All photography (currently gradient blocks with labels).
- Stats bar numbers in `src/data/content.ts` (`STATS`).
- Testimonial quotes in `src/data/content.ts` (`TESTIMONIALS`).
- Contact page map (currently a static placeholder — swap in a Google Maps embed).
- Vision/Mission copy in `src/data/content.ts` (`VISION_MISSION`) — drafted, needs review.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`
3. Build for production: `npm run build`

No API keys or environment variables are required — this is a static frontend only.
