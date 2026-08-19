import { Layers, Scissors, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent } from "motion/react"
import { useMemo, useState } from "react"
import type { LayerScroll } from "./StackedSections"

/**
 * The copy arrives line by line as the row is revealed, rather than the whole
 * block appearing at once. Staggered just enough to read as a sequence without
 * making the reader wait for the last line.
 */
const textGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.12 } },
}

const textLine = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/**
 * The photographs follow the copy rather than arriving with it. delayChildren
 * holds them back until the first couple of text lines have landed, so the row
 * reads as words first, then pictures.
 */
const imageGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

const imageCard = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
}

type ServiceImage = {
  src: string
  label: string
  alt: string
  /** Intrinsic pixel size, so the browser reserves the right box before load. */
  w: number
  h: number
  /** Side-by-side before/after composites: cropping these destroys the point. */
  noCrop?: boolean
}

type Service = {
  index: string
  slug: string
  title: string
  description: string
  points: string[]
  images: ServiceImage[]
  icon: typeof Layers
  accent: [string, string] // [light, dark], matching the per-service colour map
}

const services: Service[] = [
  {
    index: "01",
    slug: "fabric-development",
    title: "Fabric Development",
    description:
      "Our fabric development process focuses on sourcing, evaluating, and selecting premium textiles for luxury, comfort, durability, and performance. Each fabric is inspected for texture, colour consistency, strength, breathability, finish, and overall quality to ensure garments that are beautiful and long-lasting.",
    points: [
      "Sourcing & evaluation",
      "Texture inspection",
      "Colour consistency checks",
      "Strength & breathability testing",
      "Finish & quality control",
    ],
    images: [
      { src: "/images/services/fabric-development/fabric-dyeing.webp", label: "Fabric Dyeing", alt: "A fanned stack of hand-dyed fabric squares in teal, green and orange", w: 750, h: 750 },
      { src: "/images/services/fabric-development/fabric-manufacturing.jpg", label: "Fabric Manufacturing", alt: "A traditional loom weaving natural oat linen thread", w: 672, h: 481 },
    ],
    icon: Layers,
    accent: ["#D0B685", "#8A6A3D"],
  },
  {
    index: "02",
    slug: "alterations-repairs",
    title: "Alterations & Repairs",
    description:
      "We restore the perfect fit through professional alterations and repairs, including waist adjustments, hemming, sleeve adjustments, zip replacement, button replacement, resizing, garment repairs, and restyling. Every alteration is completed with the same attention to detail as our custom-made garments.",
    points: [
      "Waist adjustments",
      "Hemming",
      "Sleeve adjustments",
      "Zip & button replacement",
      "Resizing",
      "Restyling",
    ],
    images: [
      { src: "/images/services/alterations-repairs/shirt-altered.jpg", label: "Shirt Restyled", alt: "A striped shirt marked up, then restyled into a peplum wrap top and worn", w: 1792, h: 2370, noCrop: true },
      { src: "/images/services/alterations-repairs/damaged-cloth-repair.jpg", label: "Damaged Cloth Repaired", alt: "A torn suit lapel beside the same lapel after invisible repair", w: 1024, h: 1536, noCrop: true },
    ],
    icon: Scissors,
    accent: ["#8A7A6A", "#3A2E24"],
  },
  {
    index: "03",
    slug: "fashion-consultation",
    title: "Fashion Consultation",
    description:
      "Our expert consultants provide guidance on personal styling, fabric selection, colour coordination, body shape analysis, wedding styling, corporate uniform planning, collection development, and fashion branding. We help clients make confident fashion decisions for every occasion.",
    points: [
      "Personal styling",
      "Fabric selection",
      "Colour coordination",
      "Body shape analysis",
      "Wedding styling",
      "Corporate uniform planning",
    ],
    images: [
      { src: "/images/services/fashion-consultation/colour-analysis.jpg", label: "Colour Analysis", alt: "A stylist arranging fabric swatches and a colour palette fan", w: 1200, h: 669 },
      { src: "/images/services/fashion-consultation/designer-fitting.jpg", label: "Designer Fitting", alt: "A designer pinning a garment during a fitting session", w: 1844, h: 2304 },
    ],
    icon: Sparkles,
    accent: ["#B8897E", "#7A1E2B"],
  },
]

/** Exported so the stacked-scroll wrapper can render one layer per service. */
export const SERVICE_ROWS = services

/**
 * A single service row. The band background is applied by the caller: in the
 * stacked layout the layer beneath needs an opaque colour of its own, and
 * bg-blush/40 is translucent so it could not fully cover the layer below.
 */
export function ServiceRow({
  service,
  index,
  swap,
}: {
  service: Service
  index: number
  /** Present only in the stacked view, where scrolling drives the image swap. */
  swap?: LayerScroll
}) {
  const Icon = service.icon
  const reversed = index % 2 === 1

  // The dwell window is split evenly between the photographs, so each gets the
  // same amount of scrolling before the section folds away.
  const [shown, setShown] = useState(0)
  const idle = useMotionValue(0)
  const steps = useMemo(() => {
    if (!swap || service.images.length < 2) return [] as number[]
    const span = swap.coverAt - swap.enterAt
    return service.images
      .slice(1)
      .map((_, k) => swap.enterAt + (span * (k + 1)) / service.images.length)
  }, [swap, service.images])

  useMotionValueEvent(swap?.progress ?? idle, "change", (v) => {
    if (!steps.length) return
    let next = 0
    for (const step of steps) if (v >= step) next += 1
    setShown((prev) => (prev === next ? prev : next))
  })


  return (
    <section
      id={service.slug}
      className="relative flex items-center overflow-hidden py-16 lg:min-h-svh lg:pt-27 lg:pb-6"
    >
            {/* Giant faint numeral, editorial background flourish */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 select-none font-serif text-[220px] leading-none text-charcoal/4 md:text-[320px]"
              style={{ [reversed ? "left" : "right"]: "-0.05em" }}
            >
              {service.index}
      </span>

            {/* w-full matters: the section is a flex container, so without it
                this wrapper shrinks to fit instead of filling the row. */}
            <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
              <div
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
              >
                {/* Text column. Each line is a variant child, so the copy
                    arrives in sequence as the row is revealed. `once` means it
                    plays a single time and the text then simply stays put. */}
                <motion.div
                  variants={textGroup}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <motion.div
                    variants={textLine}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-sm"
                    style={{ backgroundColor: `${service.accent[0]}22` }}
                  >
                    <Icon size={20} style={{ color: service.accent[1] }} />
                  </motion.div>

                  <motion.div variants={textLine} className="flex items-baseline gap-4">
                    <span
                      className="font-serif text-xl font-light"
                      style={{ color: service.accent[1] }}
                    >
                      {service.index}
                    </span>
                    <h2 className="font-serif text-3xl leading-tight text-charcoal xl:text-5xl">
                      {service.title}
                    </h2>
                  </motion.div>

                  <motion.p
                    variants={textLine}
                    className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-charcoal/60 xl:text-base"
                  >
                    {service.description}
                  </motion.p>

                  <motion.ul variants={textLine} className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 font-sans text-sm text-charcoal">
                        <span
                          className="mt-2 h-px w-4 shrink-0"
                          style={{ backgroundColor: service.accent[1] }}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div variants={textLine}>
                    <Link
                      to="/contact"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-burgundy px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-pearl shadow-lg transition-opacity hover:opacity-90"
                    >
                      Request a Consultation
                    </Link>
                  </motion.div>
                </motion.div>

                {/* One card at a time, the same 419x523 the Fabrics cards use.
                    On desktop the pair is revealed by scrolling: image 01 holds,
                    then swaps to 02, and only after that does the section fold.
                    Below the breakpoint there is no scroll window, so both are
                    simply stacked. */}
                {swap && service.images.length > 1 ? (
                  /* A little larger than a Fabrics card: 480px wide at 4:5, so 480x600.
                     The vh term is only a guard for short windows, derived from
                     the row padding so the card can never overflow the fold. An
                     earlier flat 50vh cap was quietly shrinking this to 395px on
                     a laptop, which is what made it look small.
                     The auto margin sits on this element, which has a definite
                     width, because an auto margin on a grid item with
                     `width: auto` shrink-wraps it to fit-content. */
                  <div
                    className={`w-full max-w-[min(480px,calc(80vh_-_132px))] ${
                      reversed ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-blush shadow-lg">
                        <AnimatePresence initial={false} mode="sync">
                          <motion.figure
                            key={service.images[shown].src}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                          >
                            <img
                              src={service.images[shown].src}
                              alt={service.images[shown].alt}
                              width={service.images[shown].w}
                              height={service.images[shown].h}
                              className={`h-full w-full ${
                                service.images[shown].noCrop ? "object-contain" : "object-cover"
                              }`}
                            />
                            <figcaption
                              className="absolute left-4 top-4 rounded-full px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-pearl shadow-md"
                              style={{ backgroundColor: service.accent[1] }}
                            >
                              {service.images[shown].label}
                            </figcaption>
                          </motion.figure>
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    variants={imageGroup}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className={`flex w-full max-w-[min(480px,calc(80vh_-_132px))] flex-col gap-5 ${
                      reversed ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                      {service.images.map((image) => (
                        <motion.figure
                          key={image.src}
                          variants={imageCard}
                          className="relative aspect-4/5 overflow-hidden rounded-3xl bg-blush shadow-lg"
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            width={image.w}
                            height={image.h}
                            loading="lazy"
                            className={`h-full w-full ${image.noCrop ? "object-contain" : "object-cover"}`}
                          />
                          <figcaption
                            className="absolute left-4 top-4 rounded-full px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-pearl shadow-md"
                            style={{ backgroundColor: service.accent[1] }}
                          >
                            {image.label}
                          </figcaption>
                        </motion.figure>
                    ))}
                  </motion.div>
                )}
              </div>
      </div>
    </section>
  )
}

/** Plain stacked-in-flow rendering, used below the stacking breakpoint. */
export function ServicesList() {
  return (
    <div>
      {SERVICE_ROWS.map((service, i) => (
        <div key={service.slug} className={i % 2 === 1 ? "bg-blush/40" : "bg-pearl"}>
          <ServiceRow service={service} index={i} />
        </div>
      ))}
    </div>
  )
}
