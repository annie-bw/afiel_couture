import React from 'react';
import buildSrcSet from '../lib/srcSet';
import imageUrl from '../lib/imageUrl';

/**
 * How the photo relates to its frame:
 * - `cover`   fills a fixed frame and crops the overflow (full-bleed backgrounds)
 * - `contain` fits inside a fixed frame, leaving space around it
 * - `hug`     frame takes the photo's shape at full row height (width follows)
 * - `natural` frame takes the photo's shape at full column width (height follows)
 *
 * `hug` and `natural` are the ones that leave no empty space at all — the frame
 * matches the image instead of the image matching the frame.
 */
type Fit = 'cover' | 'contain' | 'hug' | 'natural';

type Props = {
  from: string;
  to: string;
  src?: string;
  alt?: string;
  label?: string;
  fit?: Fit;
  className?: string;
  /** Extra classes on the <img> itself, for tuning object-position on a crop. */
  imgClassName?: string;
  /**
   * How wide this image is drawn, in CSS terms, so the browser can pick a file
   * from srcset before layout exists. Wrong here means a wasteful download, so
   * pass the real thing at every call site that is not roughly a third of the
   * viewport.
   */
  sizes?: string;
  /**
   * Set on an image that is visible without scrolling. It stops the lazy
   * attribute holding the download back and asks the browser to fetch it ahead
   * of the rest.
   */
  priority?: boolean;
  labelClassName?: string;
};

const WRAPPER: Record<Fit, string> = {
  cover: 'w-full h-full',
  contain: 'w-full h-full',
  hug: 'h-full w-auto',
  natural: 'w-full',
};

const IMAGE: Record<Fit, string> = {
  cover: 'absolute inset-0 w-full h-full object-cover',
  contain: 'absolute inset-0 w-full h-full object-contain',
  // Fills the frame's height and lets width follow, upscaling if the file is
  // smaller than the frame. No max-width, deliberately: clamping width against
  // an explicit height is what squashes an image. Very wide photos overflow and
  // are clipped by the parent's overflow-hidden instead of distorting.
  hug: 'block h-full w-auto',
  natural: 'block w-full h-auto',
};

// Without a photo there is nothing to take a shape from, so the gradient
// fallback needs one of its own.
const FALLBACK_RATIO: Record<Fit, string> = {
  cover: '',
  contain: '',
  hug: 'aspect-3/4',
  natural: 'aspect-4/5',
};

/**
 * Renders real photography when `src` points at a file that exists, and falls
 * back to the brand gradient when it does not. That means photos can be added
 * one at a time — any slot without a file yet keeps looking intentional.
 *
 * Drop files into `public/` using the path in `src`: a src of
 * "/images/home/hero-section.jpg" lives at `public/images/home/hero-section.jpg`.
 */
export default function PlaceholderImage({
  from,
  to,
  src,
  alt,
  label,
  fit = 'cover',
  className = '',
  imgClassName = '',
  labelClassName = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
}: Props) {
  const [failed, setFailed] = React.useState(false);
  const showPhoto = Boolean(src) && !failed;

  const srcSet = buildSrcSet(src);
  const sizing = showPhoto ? WRAPPER[fit] : `${WRAPPER[fit]} ${FALLBACK_RATIO[fit]}`;

  return (
    <div
      className={`relative overflow-hidden ${sizing} ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      {showPhoto && (
        <img
          src={imageUrl(src)}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt ?? label ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`${IMAGE[fit]} ${imgClassName}`}
        />
      )}
      {label && (
        <span
          className={`absolute bottom-0 left-0 z-10 font-sans text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-lg font-semibold px-3 py-1.5 ${labelClassName}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
