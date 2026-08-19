import { Link } from "react-router-dom"
import imageUrl from "../lib/imageUrl"
import buildSrcSet from "../lib/srcSet"

export function ServicesCta() {
  return (
    <section className="bg-burgundy text-pearl lg:flex lg:min-h-svh lg:items-center">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-0 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* Natural aspect rather than object-cover: stretched to the full
              height of a half-width band this photo would lose most of its
              width. Also appears under Fabric Development below. */}
          <img
            src={imageUrl("/images/services/fabric-development/picking-fabric.jpg")}
            srcSet={buildSrcSet("/images/services/fabric-development/picking-fabric.jpg")}
            sizes="(max-width: 1024px) 100vw, 50vw"
            alt="Hands picking through folded fabric to choose a cloth"
            width={1000}
            height={500}
            className="block h-auto w-full"
          />
        </div>

        <div className="order-1 lg:order-2 flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-24">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-pearl/60">
            How to Start
          </span>
          <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            Start with the fabric
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm md:text-base leading-relaxed text-pearl/80">
            Not sure which service you need? Most people start by choosing fabric.
            Come and feel the cloth, see the colours, and we will help you work out
            what to make and how long it will take.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/fabrics"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-champagne px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal shadow-xl transition-colors hover:opacity-90"
            >
              See Our Fabrics
            </Link>
            {/* Was mailto:hello@afielcouture.com, an address that does not exist.
                Routes to the contact page, matching every other CTA on the site. */}
            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-pearl/30 px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-pearl/90 transition-colors hover:border-champagne hover:text-champagne"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
