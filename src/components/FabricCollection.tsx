import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { categories, fabrics, type Fabric, type FabricCategory } from "../data/fabrics"
import { FabricCard } from "./FabricCard"

export function FabricCollection() {
  const [active, setActive] = useState<FabricCategory>("All")

  const visible = useMemo(() => {
    if (active !== "All") return fabrics.filter((f) => f.category === active)

    // "All" shows one representative per material rather than every swatch, so
    // the overview reads as a range of cloth instead of a long grid. The data
    // file orders each category best-first, so the first match is the pick.
    const seen = new Set<Fabric["category"]>()
    const oneEach: Fabric[] = []
    for (const fabric of fabrics) {
      if (seen.has(fabric.category)) continue
      seen.add(fabric.category)
      oneEach.push(fabric)
    }
    return oneEach
  }, [active])

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="border-b border-charcoal/10 pb-8">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-champagne">
            The Fabrics
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-light text-charcoal lg:text-5xl">
            Cloths we have in store
          </h2>
        </div>

        {/* Full-width row of its own rather than sharing one with the heading:
            twelve labels never fit beside a 5xl title, which is what forced the
            wrap. flex-nowrap keeps them on one line and narrow screens scroll
            sideways instead of stacking. */}
        <div
          className="mt-8 flex flex-nowrap gap-x-5 overflow-x-auto hide-scrollbar lg:gap-x-6"
          role="group"
          aria-label="Filter by material"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.18em] underline-offset-8 transition-colors ${
                active === cat
                  ? "text-charcoal underline decoration-champagne"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Column count follows what is actually showing. A fixed three-column
          grid left an empty cell for the two-swatch materials, which read as a
          missing image. Two swatches get two columns, capped in width so the
          cards stay the same size they are in the "All" view rather than
          stretching to half the page. */}
      <motion.div
        layout
        className={`mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 ${
          visible.length === 2 ? 'lg:max-w-[880px]' : 'lg:grid-cols-3'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((fabric, i) => (
            <motion.div
              key={fabric.id}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18, delay: 0 } }}
              transition={{ duration: 0.55, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              <FabricCard fabric={fabric} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-sm text-charcoal/50">
          No fabrics in this category yet.
        </p>
      )}
    </section>
  )
}
