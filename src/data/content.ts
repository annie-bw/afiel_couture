// Central content for the Afiel Couture site.
// Swap copy, numbers, and image labels here without touching component logic.

export const BRAND = {
  name: 'Afiel Couture',
  tagline: 'Where Every Stitch Defines Elegance',
  eyebrow: 'Couture and Textile Manufacturing · Kigali, Rwanda',
};

export const CONTACT = {
  phoneMain: '+250 796 690 256',
  phoneSupport: '+250 732 108 169',
  emailPrimary: 'afielcouture@gmail.com',
  emailSecondary: 'info@afielcouture.com',
  website: 'afielcouture.com',
  instagram: '@afiel_couture',
  tiktok: '@afiel.couture',
  addressShort: 'KG 7 St, Rindiro, Kigali',
  addressFull: 'KG 7 St, Rindiro, Kibagabaga, Kimironko, Gasabo, Kigali, Rwanda',
  hours: 'Mon to Sat, 8:00 AM to 6:00 PM',
};

/**
 * One photo slot. `src` is a path inside `public/`, so `/images/foo.jpg`
 * means the file lives at `public/images/foo.jpg`. Until that file exists the
 * brand gradient shows instead, so slots can be filled one at a time.
 */
export type GalleryImage = {
  label: string;
  src: string;
};

export type Product = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  cover: string; // wide card in the home-page category strip
  gallery: GalleryImage[]; // browsable stack on the Products page
};

export const PRODUCTS: Product[] = [
  {
    slug: 'bespoke-tailoring',
    title: 'Bespoke Tailoring',
    tagline: 'Timeless garments, precision-fit',
    description:
      "Bring us a picture, a sketch, or just an idea, and we will build the pattern from your own measurements. Evening and cocktail dresses, business wear, men's suits, and one-off pieces for the occasions that matter. Every garment is cut and finished in our Kigali workrooms.",
    colorFrom: '#B8897E',
    colorTo: '#7A1E2B',
    cover: '/images/home/five_categories/bespoke-tailoring.jpg',
    gallery: [
      { label: 'Evening Dresses', src: '/images/products/bespoke-tailoring/evening-dresses.jpg' },
      { label: 'Cocktail Dress', src: '/images/products/bespoke-tailoring/cocktail-dress.jpg' },
      { label: 'Business Wear', src: '/images/products/bespoke-tailoring/business-wear.jpg' },
      { label: 'Custom Attires', src: '/images/products/bespoke-tailoring/custom-attires.jpg' },
      { label: "Women's Outfits", src: '/images/products/bespoke-tailoring/womens-outfits.jpg' },
      { label: 'Custom Clothes', src: '/images/products/bespoke-tailoring/custom-clothes.jpeg' },
    ],
  },
  {
    slug: 'mushanana-collection',
    title: 'Mushanana Collection',
    tagline: "Rwanda's heritage, modern sophistication",
    description:
      "Umushanana for the days a family remembers. We make bridal and bridesmaid sets, men's imishanana, pieces for dance troupes, and smaller versions for children. Each one is draped and fitted to the wearer, in fabric chosen with you.",
    colorFrom: '#B08D5E',
    colorTo: '#5C4530',
    cover: '/images/home/five_categories/mushanana-collection.jpg',
    gallery: [
      { label: 'Bridal Umushanana', src: '/images/products/mushanana-collection/bridal-umushanana.jpeg' },
      { label: 'Male Umushanana', src: '/images/products/mushanana-collection/male-umushanana.jpg' },
      { label: 'Bridesmaids', src: '/images/products/mushanana-collection/bridesmaids.jpg' },
      { label: 'Custom Umushanana', src: '/images/products/mushanana-collection/custom-umushanana.jpg' },
      { label: 'Dancing Troupes', src: '/images/products/mushanana-collection/dancing-troupes.jpeg' },
      { label: 'Kids', src: '/images/products/mushanana-collection/kids.jpg' },
    ],
  },
  {
    slug: 'school-uniforms',
    title: 'School Uniforms',
    tagline: 'Comfort, durability, and pride',
    description:
      'Uniforms that survive a full school year. We supply nurseries through to universities, with shirts, blazers, trousers, skirts, sportswear and house colours produced in volume from our own fabric. School branding and sizing runs are handled in house.',
    colorFrom: '#5C7A85',
    colorTo: '#2E3E45',
    cover: '/images/home/five_categories/school-uniforms.jpg',
    gallery: [
      { label: 'Shirts', src: '/images/products/school-uniforms/shirts.jpeg' },
      { label: 'Blazers', src: '/images/products/school-uniforms/blazers.png' },
      { label: 'Dresses & Shorts', src: '/images/products/school-uniforms/dresses-shorts.png' },
      { label: 'Sportswear', src: '/images/products/school-uniforms/sportswear.png' },
    ],
  },
  {
    slug: 'corporate-uniforms',
    title: 'Corporate Uniforms',
    tagline: "Your team, your company's image",
    description:
      'Your team is the first thing a customer sees. We outfit hotels, restaurants, clinics, banks, and security firms, matching your colours exactly and adding embroidery or name tags as needed. Repeat orders stay consistent because we hold your specification on file.',
    colorFrom: '#5A5158',
    colorTo: '#2A2530',
    cover: '/images/home/five_categories/corporate-uniforms.png',
    gallery: [
      { label: 'Hotel Staff', src: '/images/products/corporate-uniforms/hotel-staff.jpg' },
      { label: 'Restaurant Staff', src: '/images/products/corporate-uniforms/restaurant-staff.jpeg' },
      { label: 'Chefs', src: '/images/products/corporate-uniforms/chefs.jpg' },
      { label: 'Security', src: '/images/products/corporate-uniforms/security.png' },
      { label: 'Logo Embroidery', src: '/images/products/corporate-uniforms/logo-embroidery.jpg' },
      { label: 'Technician Coats', src: '/images/products/corporate-uniforms/technician-coats.jpg' },
    ],
  },
  {
    slug: 'premium-fabric-sales',
    title: 'Premium Fabric Sales',
    tagline: 'Every garment begins with fabric',
    description:
      'We sell the same fabric we manufacture with. Kitenge, satin, Swiss voile, silk, chiffon and organza, along with suiting and uniform cloth, by the meter or by the bolt. Wholesale pricing is available for tailors and institutions.',
    colorFrom: '#D0B685',
    colorTo: '#8A6A3D',
    cover: '/images/home/five_categories/premium-fabric-sales.jpg',
    gallery: [
      { label: 'Cotton Kitenge', src: '/images/products/premium-fabric-sales/cotton-kitenge.jpg' },
      { label: 'Satin', src: '/images/products/premium-fabric-sales/satin.jpg' },
      { label: 'Kitenge Range', src: '/images/products/premium-fabric-sales/kitenge-range.jpg' },
      { label: 'Denim', src: '/images/products/premium-fabric-sales/denim.jpg' },
      { label: 'Assorted Fabrics', src: '/images/products/premium-fabric-sales/assorted-fabrics.jpg' },
      { label: 'Fabric Collection', src: '/images/products/premium-fabric-sales/fabric-collection.jpg' },
    ],
  },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  images: GalleryImage[]; // two photo slots per service
  /** Photos that must be shown whole and wide (e.g. before/after composites). */
  wideImages?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: 'fabric-development',
    title: 'Fabric Development',
    description:
      'Our fabric development process focuses on sourcing, evaluating, and selecting premium textiles for luxury, comfort, durability, and performance. Each fabric is inspected for texture, colour consistency, strength, breathability, finish, and overall quality to ensure garments that are beautiful and long-lasting.',
    includes: ['Sourcing & evaluation', 'Texture inspection', 'Colour consistency checks', 'Strength & breathability testing', 'Finish & quality control'],
    images: [
      { label: 'Fabric Dyeing', src: '/images/services/fabric-development/fabric-dyeing.jpg' },
      { label: 'Fabric Manufacturing', src: '/images/services/fabric-development/fabric-manufacturing.jpg' },
    ],
  },
  {
    slug: 'alterations-repairs',
    wideImages: true,
    title: 'Alterations & Repairs',
    description:
      'We restore the perfect fit through professional alterations and repairs, including waist adjustments, hemming, sleeve adjustments, zip replacement, button replacement, resizing, garment repairs, and restyling. Every alteration is completed with the same attention to detail as our custom-made garments.',
    includes: ['Waist adjustments', 'Hemming', 'Sleeve adjustments', 'Zip & button replacement', 'Resizing', 'Restyling'],
    images: [
      { label: 'Dress Alteration', src: '/images/services/alterations-repairs/dress-alteration.jpeg' },
      { label: 'Garment Repair', src: '/images/services/alterations-repairs/garment-repair.jpg' },
    ],
  },
  {
    slug: 'fashion-consultation',
    title: 'Fashion Consultation',
    description:
      'Our expert consultants provide guidance on personal styling, fabric selection, colour coordination, body shape analysis, wedding styling, corporate uniform planning, collection development, and fashion branding. We help clients make confident fashion decisions for every occasion.',
    includes: ['Personal styling', 'Fabric selection', 'Colour coordination', 'Body shape analysis', 'Wedding styling', 'Corporate uniform planning'],
    images: [
      { label: 'Colour Analysis', src: '/images/services/fashion-consultation/colour-analysis.jpg' },
      { label: 'Designer Fitting', src: '/images/services/fashion-consultation/designer-fitting.png' },
    ],
  },
];

// One-off photo slots that are not part of a product or service list.
export const SITE_IMAGES = {
  homeHero: '/images/home/hero-section.jpg',
  homeStory: '/images/home/our-story.jpg',
  aboutStory: '/images/about/our-story.jpg',
  aboutWorkshop: [
    { label: 'Fabric Making', src: '/images/about/behind_the_scene/fabric-making.jpg' },
    { label: 'Rolls of Material', src: '/images/about/behind_the_scene/rolls-of-material.jpg' },
    { label: 'Stitching', src: '/images/about/behind_the_scene/stitching.jpg' },
    { label: 'Final Product', src: '/images/about/behind_the_scene/final-product.jpg' },
  ] as GalleryImage[],
};

export const WHY_CHOOSE = [
  'Luxury Craftsmanship',
  'Premium Fabrics',
  'Experienced Designers',
  'Personalized Service',
  'Reliable Delivery',
  'Competitive Pricing',
];

// Confirmed figures, drawn from the Afriktexia manufacturing operation that
// produces for Afiel Couture.
export const STATS = [
  { value: '26+', label: 'Years of Experience', note: 'Building textile and garment capability in the region.' },
  { value: '690K', label: 'Meters Output per Month', note: 'Sustained monthly production from our own facility.' },
  { value: '100+', label: 'Skilled Employees', note: 'Cutters, machinists, dyers, and finishers on staff.' },
  { value: '99%', label: 'Client Satisfaction', note: 'Long-term partnerships built on delivered results.' },
];

// What sets the operation apart. Distinct from WHY_CHOOSE, which speaks to the
// couture client; these speak to scale and reliability.
export const ADVANTAGES = [
  {
    title: 'Quality and Sourcing Guaranteed',
    desc: 'Fabric is sourced, inspected, and signed off in house before a single piece is cut.',
  },
  {
    title: 'Controlled Deadlines',
    desc: 'Our own production floor means schedules are ours to hold, not a supplier\'s to miss.',
  },
  {
    title: '100% Tailor-Made Solutions',
    desc: 'From a single bridal gown to a full institutional order, every job is built to specification.',
  },
];

// The four steps every order moves through.
export const PROCESS = [
  { step: '01', title: 'Consultation and Quote', desc: 'We take your brief, confirm quantities and fabric, and price the work clearly.' },
  { step: '02', title: 'Prototyping and Validation', desc: 'You approve a sample before volume begins, so there are no surprises later.' },
  { step: '03', title: 'Production and Quality Control', desc: 'Made in our Kigali facility, with checks at cutting, stitching, and finishing.' },
  { step: '04', title: 'Delivery and Partnership', desc: 'Delivered on the agreed date, with capacity reserved for your repeat orders.' },
];

// Not rendered anywhere yet. These are invented examples kept only to show the
// shape the data takes. Replace them with real, attributable client quotes, then
// restore the testimonials section on the home page.
export const TESTIMONIALS = [
  {
    quote: 'Afiel Couture made my wedding day even more special. My Mushanana fit like it was made just for me.',
    author: 'Aline U., Bride',
  },
  {
    quote: "They handled our entire school's uniform order end-to-end, on time and on budget.",
    author: 'Headteacher, Partner School',
  },
  {
    quote: 'Professional, precise, and easy to work with for our staff uniforms.',
    author: 'Operations Manager, Partner Company',
  },
];

export const FAQS = [
  {
    q: 'What is the turnaround time for a bespoke order?',
    a: 'Most bespoke pieces take 2 to 4 weeks depending on garment complexity and fabric availability. Rush orders may be accommodated on request.',
  },
  {
    q: 'Do I need to schedule a fitting?',
    a: "Yes. At least one fitting is required to guarantee a perfect fit. Complex pieces like bridal gowns typically need two to three fittings.",
  },
  {
    q: 'How do you handle bulk school or corporate uniform orders?',
    a: 'We manage bulk production end-to-end, from measurements and fabric sourcing to delivery, with custom branding available on request.',
  },
  {
    q: 'What is your delivery/pickup process?',
    a: 'Completed garments can be collected at our Kimironko studio, or delivered locally by arrangement.',
  },
  {
    q: 'What are your price ranges?',
    a: 'Pricing depends on garment type, fabric, and complexity. Contact us directly for a personalised quote.',
  },
];

export const VISION_MISSION = {
  vision:
    "To be the name East Africa trusts for clothing made close to home, where a bridal gown and a thousand school uniforms leave the same floor held to the same standard.",
  mission:
    "To keep the whole process under one roof, from fabric to finished garment, so our clients get honest timelines, consistent quality, and work that supports Rwandan jobs and Rwandan skill.",
};
