import { IMAGE_VARIANTS } from '../data/imageVariants';

/**
 * Builds the srcset for a photograph from the widths that exist on disk.
 *
 * Returns undefined when there are no variants, which is the right answer for
 * anything small enough that one file serves every screen. Pair it with a sizes
 * attribute that describes the slot, or the browser assumes full viewport width
 * and picks a larger file than it needs.
 */
export default function buildSrcSet(src: string | undefined): string | undefined {
  if (!src) return undefined;
  const widths = IMAGE_VARIANTS[src];
  if (!widths) return undefined;
  return widths
    .map((w, i) => {
      const isOriginal = i === widths.length - 1;
      const file = isOriginal ? src : src.replace(/(\.[a-z]+)$/i, `-${w}w$1`);
      return `${file} ${w}w`;
    })
    .join(', ');
}
