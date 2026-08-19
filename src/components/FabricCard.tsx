import type { Fabric } from "../data/fabrics"
import imageUrl from '../lib/imageUrl';
import buildSrcSet from '../lib/srcSet';

/** Cards this far into the grid are on screen before any scrolling. */
const ABOVE_FOLD = 3

export const FABRIC_CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

export function FabricCard({ fabric, index }: { fabric: Fabric; index: number }) {
  // The first row is visible from the start, so it loads at once and at priority.
  // Everything below stays lazy.
  const onScreen = index < ABOVE_FOLD

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-blush">
        <img
          src={imageUrl(fabric.image)}
          srcSet={buildSrcSet(fabric.image)}
          sizes={FABRIC_CARD_SIZES}
          alt={fabric.name}
          loading={onScreen ? "eager" : "lazy"}
          fetchPriority={onScreen ? "high" : "auto"}
          decoding="async"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-pearl/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-charcoal backdrop-blur-sm">
          {fabric.category}
        </span>
        <span className="absolute right-4 top-4 font-serif text-sm text-pearl mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-serif text-xl font-normal leading-tight text-charcoal">
          {fabric.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          {fabric.note}
        </p>
      </div>
    </article>
  )
}
