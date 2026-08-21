import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { BRANDS, type Brand } from "@/lib/content";

/**
 * Two continuous brand tracks running in opposite directions.
 *
 * Every row carries the full set of fifteen logos rather than half each.
 * A marquee only loops without a visible gap while one sequence is at
 * least as wide as the viewport, and half the set is around 1600px —
 * short of a 1920px screen. The full set is roughly 3200px, so both rows
 * stay filled at every width. The bottom row is reordered so the two
 * tracks never read as the same line twice.
 *
 * Pure CSS: no rAF loop, no client component. See `.brand-track` in
 * globals.css for the seam-free -50% translation and the reduced-motion
 * fallback.
 */
const TOP_ROW = BRANDS;
// Interleaved rather than rotated. Both rows hold the full set, so the
// same mark is occasionally on screen twice; a rotation keeps runs of
// logos in the same relative order, which makes those repeats line up
// vertically. Splitting odds from evens breaks the runs, so the rows
// never read as two copies of one line. Deterministic, so SSR and the
// client agree.
const BOTTOM_ROW = [
  ...BRANDS.filter((_, i) => i % 2 === 1),
  ...BRANDS.filter((_, i) => i % 2 === 0),
];

export function BrandRail() {
  return (
    <div className="mt-20 lg:mt-28" data-reveal>
      <h3 className="text-center text-[0.6875rem] font-medium tracking-[0.16em] text-ink-4 uppercase">
        Uradni serviser in prodajalec
      </h3>

      <div className="mt-10 grid gap-4 sm:gap-6">
        <BrandRow brands={TOP_ROW} duration="36s" />
        <BrandRow brands={BOTTOM_ROW} duration="43s" reverse />
      </div>
    </div>
  );
}

function BrandRow({
  brands,
  duration,
  reverse = false,
}: {
  brands: Brand[];
  duration: string;
  reverse?: boolean;
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
        className={cn("brand-track", reverse && "brand-track--reverse")}
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
      className="flex shrink-0 items-center justify-center px-7 py-3 sm:px-9"
    >
      <Image
        src={brand.file}
        alt={clone ? "" : `${brand.name} — uradni serviser in prodajalec`}
        width={brand.w}
        height={brand.h}
        // 2–15 KB each and already sized; the optimizer would add cost.
        unoptimized
        // Height is normalised per mark, width follows the real aspect
        // ratio. `max-w-none` keeps wide wordmarks from being squashed.
        style={{ height: brand.size }}
        className="w-auto max-w-none object-contain"
      />
    </div>
  );
}
