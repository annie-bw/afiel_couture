import { Link } from "react-router-dom"
import { motion } from "motion/react"

const textGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.1 } },
}

const textLine = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const jumpLinks = [
  { index: "01", label: "Fabric Development", href: "#fabric-development" },
  { index: "02", label: "Alterations & Repairs", href: "#alterations-repairs" },
  { index: "03", label: "Fashion Consultation", href: "#fashion-consultation" },
]

export function ServicesHero() {
  return (
    // pt clears the fixed navbar, which is 108px tall unscrolled (py-8 plus the
    // 44px logo). The previous pt-24 was 96px, so the breadcrumb sat behind it.
    <div className="bg-pearl pt-28 md:pt-30 pb-12 md:pb-14 lg:flex lg:min-h-svh lg:flex-col lg:justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* items-center rather than items-end: the figure is much taller than the
            text, and bottom-aligning left a large dead gap above the heading. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
          <motion.div
            variants={textGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p variants={textLine} className="font-sans text-xs text-charcoal/50 mb-6">
              <Link to="/" className="hover:text-burgundy transition-colors">
                Home
              </Link>{" "}
              / Services
            </motion.p>

            <motion.span variants={textLine} className="block font-sans text-[10px] uppercase tracking-[0.3em] text-champagne font-semibold">
              What We Offer
            </motion.span>

            <motion.h1 variants={textLine} className="mt-5 font-serif text-4xl md:text-6xl text-charcoal leading-tight">
              Services
            </motion.h1>

            <motion.span variants={textLine} className="mt-6 block h-px w-14 bg-champagne/70" />

            <motion.p variants={textLine} className="mt-6 font-sans text-sm md:text-base text-charcoal/60 max-w-xl leading-relaxed">
              Beyond our product categories, these are the services that keep
              every Afiel garment fitting perfectly. Measured, cut, and finished
              in the studio by people who know the fibre.
            </motion.p>

            {/* Jump links to the three sections below, which already carry ids */}
            <motion.div variants={textLine} className="mt-9 flex flex-wrap gap-2.5">
              {jumpLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/70 transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <span className="font-serif text-burgundy">{item.index}</span>
                  {item.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Capped width so the portrait does not tower over the column. It is
              natively 1844x2304, exactly 4:5, so nothing is cropped. */}
          {/* Follows the copy, same as the photographs in the rows below. */}
          <motion.figure
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm md:max-w-[min(480px,calc(80vh_-_141px))] lg:ml-auto rounded-3xl overflow-hidden shadow-sm"
          >
            <img
              src="/images/services/fashion-consultation/designer-fitting.jpg"
              alt="A tailor measuring a client's jacket with a tape measure in the Afiel Couture showroom"
              width={1844}
              height={2304}
              className="block aspect-4/5 w-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-charcoal/70 via-charcoal/20 to-transparent px-5 pb-4 pt-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-pearl">
                Every order starts with a measurement
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </div>
  )
}
