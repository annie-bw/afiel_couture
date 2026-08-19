import { ServicesHero } from "../components/ServicesHero"
import { ServicesList, ServiceRow, SERVICE_ROWS } from "../components/ServicesList"
import { ServicesCta } from "../components/ServicesCta"
import {
  StackedSections,
  useStackedScroll,
  type LayerScroll,
  type StackSection,
} from "../components/StackedSections"
import usePageMeta from '../lib/usePageMeta';

// Opaque hex rather than Tailwind tokens, because each stacked layer has to
// fully cover the one beneath it. #F3EDE2 is bg-blush/40 composited over pearl,
// so the alternating bands look identical to the plain layout.
const PEARL = "#F7F3EC"
const BLUSH_BAND = "#F3EDE2"
const BURGUNDY = "#7A1E2B"

export default function ServicesPage() {
  usePageMeta(
    'Services',
    'Fabric development, alterations and repairs, and fashion consultation, from a Kigali couture house that runs its own production floor.',
  );

  const stacked = useStackedScroll()

  // Below the breakpoint, or with reduced motion requested, this is an ordinary
  // document scroll with the sections in the same order.
  if (!stacked) {
    return (
      <main className="bg-pearl">
        <ServicesHero />
        <ServicesList />
        <ServicesCta />
      </main>
    )
  }

  const sections: StackSection[] = [
    { key: "hero", background: PEARL, content: <ServicesHero /> },
    // Function form: each row needs its own scroll window to drive the swap
    // between its two photographs before the section folds.
    ...SERVICE_ROWS.map((service, i) => ({
      key: service.slug,
      background: i % 2 === 1 ? BLUSH_BAND : PEARL,
      content: (scroll: LayerScroll) => (
        <ServiceRow service={service} index={i} swap={scroll} />
      ),
    })),
    { key: "cta", background: BURGUNDY, content: <ServicesCta /> },
  ]

  return (
    <main className="bg-pearl">
      <StackedSections sections={sections} />
    </main>
  )
}
