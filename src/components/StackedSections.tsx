import { Fragment, useEffect, useRef, useState, type ReactNode } from "react"
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

/** Below this the effect is off and the page is an ordinary document scroll. */
// 1024px is where the service rows become two columns; below it the row is a
// single column and could not fit one viewport. No height bound: the row's own
// padding is tight enough that the copy fits short windows too.
const STACK_BREAKPOINT = "(min-width: 1024px)"

/** Same curve the rest of the site animates on, so the recede feels native. */
const EASE = cubicBezier(0.22, 1, 0.36, 1)

/**
 * How long each section holds, fully visible and pinned, before the next one
 * begins rising over it, measured in viewport heights. This is also the window
 * the service rows use to swap between their two photographs, so it needs room
 * for both: roughly 0.8 of a screen per image, then a full screen of travel
 * while the next section covers this one.
 */
const DWELL = 1.6

/**
 * The covered layer settles back to this scale. Deliberately shallow: any more
 * and its edges pull far enough off the viewport to reveal what is underneath,
 * which breaks the illusion of one sheet sliding under another.
 *
 * There is intentionally no dimming or tinting. An overlay greys the section out
 * and shifts its colour, and these sections are defined by their colour, so the
 * depth cue is a shadow cast by the incoming layer instead.
 */
const SCALE_TO = 0.955

/**
 * True only on wide viewports and when the visitor has not asked for reduced
 * motion. Starts false so first paint is the plain fallback, then the effect
 * enables after mount rather than flashing a half-built stack.
 */
export function useStackedScroll() {
  const prefersReduced = useReducedMotion()
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(STACK_BREAKPOINT)
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return wide && !prefersReduced
}

/** The scroll window a layer occupies, handed to content that needs it. */
export type LayerScroll = {
  progress: MotionValue<number>
  /** Progress at which this layer is fully in place and pinned. */
  enterAt: number
  /** Progress at which the next layer starts covering it. */
  coverAt: number
}

export type StackSection = {
  key: string
  /** Must be opaque: a translucent layer cannot hide the one beneath it. */
  background: string
  /**
   * Either plain content, or a function given this layer's scroll window. The
   * function form exists because a sticky element cannot measure its own
   * progress: while pinned it reports the same bounding box every frame.
   */
  content: ReactNode | ((scroll: LayerScroll) => ReactNode)
}

function StackLayer({
  index,
  count,
  progress,
  background,
  children,
}: {
  index: number
  count: number
  progress: MotionValue<number>
  background: string
  children: ReactNode | ((scroll: LayerScroll) => ReactNode)
}) {
  const isLast = index === count - 1

  // Flow height per section is one viewport plus the dwell spacer that follows
  // it. The container's scroll range is the whole run minus the one viewport
  // that is already on screen at progress 0.
  const stride = 1 + DWELL
  const range = count + (count - 1) * DWELL - 1
  const enterAt = (index * stride) / range
  const from = (index * stride + DWELL) / range
  const to = (index * stride + stride) / range

  const rawScale = useTransform(progress, [from, to], [1, SCALE_TO], {
    ease: EASE,
    clamp: true,
  })

  // A light spring takes the last edge off the scale so it glides rather than
  // tracking the scroll wheel step for step. Heavily damped, so it settles
  // without any rubber-band overshoot.
  const scale = useSpring(rawScale, {
    stiffness: 140,
    damping: 40,
    mass: 0.35,
    restDelta: 0.0005,
  })

  return (
    // Sticky, not fixed: the layer stays in normal flow and normal DOM order, so
    // tab order and screen-reader order are untouched and focus is never trapped.
    <div className="sticky top-0" style={{ zIndex: index + 1 }}>
      <motion.div
        // Exactly one viewport. A layer taller than the viewport would have its
        // lower half unreachable, because the scroll that would reveal it is
        // spent bringing the next layer up instead.
        className="relative h-svh overflow-hidden"
        style={{
          background,
          // Anchored at the top edge, which is where the layer is pinned, so it
          // recedes straight back rather than drifting as it shrinks.
          transformOrigin: "50% 0%",
          // Each layer casts a shadow upward onto the one it is covering. This
          // replaces the dimming overlay: it reads as depth without touching
          // the colour of the section underneath.
          boxShadow: index === 0 ? undefined : "0 -28px 60px -12px rgba(28, 26, 23, 0.28)",
          ...(isLast ? null : { scale, willChange: "transform" }),
        }}
      >
        {typeof children === "function"
          ? children({ progress, enterAt, coverAt: from })
          : children}
      </motion.div>
    </div>
  )
}

export function StackedSections({ sections }: { sections: StackSection[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // One scroll subscription for the whole stack. Each layer derives its own
  // window from this via useTransform. Measuring each sticky layer separately
  // does not work: while pinned, a sticky element reports the same bounding box
  // every frame, so it cannot report its own progress.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="relative">
      {sections.map((section, i) => (
        <Fragment key={section.key}>
          <StackLayer
            index={i}
            count={sections.length}
            progress={scrollYProgress}
            background={section.background}
          >
            {section.content}
          </StackLayer>

          {/* Dwell spacer. Empty and transparent, so while it scrolls past you
              simply keep looking at the pinned layer above. This is what buys
              each section time on screen before the next one rises. */}
          {i < sections.length - 1 && (
            <div aria-hidden="true" style={{ height: `${DWELL * 100}svh` }} />
          )}
        </Fragment>
      ))}
    </div>
  )
}
