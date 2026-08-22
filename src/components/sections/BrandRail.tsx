import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { BRANDS, type Brand } from "@/lib/content";

/**
 * One continuous brand track.
 *
 * It used to be two rows running in opposite directions, but with only
 * fifteen marks to spend both rows had to carry the full set — a marquee
 * loops without a visible gap only while one sequence is at least as
 * wide as the viewport, and half the set is around 1600px, short of a
 * 1920px screen. So every logo appeared twice on screen at once and the
 * second row read as a copy of the first rather than as more brands.
 * A single row says the same thing once.
 *
 * The full set is roughly 3400px at the spacing below, so one sequence
 * still overflows the widest common viewport and the -50% loop stays
 * seamless.
 *
 * Pure CSS: no rAF loop, no client component. See `.brand-track` in
 * globals.css for the seam-free translation and the reduced-motion
 * fallback.
 */
export function BrandRail() {
  return (
    <div className="mt-20 lg:mt-28" data-reveal>
      <h3 className="text-center text-[0.6875rem] font-medium tracking-[0.16em] text-ink-4 uppercase">
        Uradni serviser in prodajalec
      </h3>

      <div className="mt-10">
        <BrandRow brands={BRANDS} duration="52s" />
      </div>
    </div>
  );
}

function BrandRow({
  brands,
  duration,
}: {
  brands: Brand[];
  duration: string;
}) {
  return (
    <div
      className={cn(
        "brand-row relative overflow-hidden",
        // Gentle fade at both ends so marks leave the frame instead of
        // being cut off against it. Kept narrow — this should be barely
        // noticeable, not a vignette.
        "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]",
      )}
    >
      <div
        className="brand-track"
        style={{ "--brand-duration": duration } as CSSProperties}
      >
        {[0, 1].map((copy) =>
          brands.map((brand) => (
            <BrandMark
              key={`${copy}-${brand.name}`}
              brand={brand}
              clone={copy === 1}
            />
          )),
        )}
      </div>
    </div>
  );
}

function BrandMark({ brand, clone }: { brand: Brand; clone: boolean }) {
  return (
    <div
      // The second sequence exists only to close the loop: hidden from
      // assistive tech, and dropped entirely under reduced motion.
      {...(clone ? { "data-marquee-clone": "", "aria-hidden": true } : {})}
      // Carrying the section alone, so the marks are given more air and
      // a little more height than they had when a second row was sharing
      // the work.
      className="flex shrink-0 items-center justify-center px-8 py-4 sm:px-11"
    >
      <Image
        src={brand.file}
        alt={clone ? "" : `${brand.name} - uradni serviser in prodajalec`}
        width={brand.w}
        height={brand.h}
        // 2–15 KB each and already sized; the optimizer would add cost.
        unoptimized
        // Height is normalised per mark, width follows the real aspect
        // ratio. `max-w-none` keeps wide wordmarks from being squashed.
        style={{ height: Math.round(brand.size * 1.12) }}
        className="w-auto max-w-none object-contain"
      />
    </div>
  );
}
