import Image from "next/image";
import { Star } from "lucide-react";

import { ActionLink } from "@/components/ui/actions";
import { HeroAirEffect } from "@/components/sections/HeroAirEffect";
import { ROUTES } from "@/lib/navigation";
import {
  GOOGLE_RATING,
  PRIMARY_PHONE,
  SHOW_GOOGLE_RATING,
  YEARS_EXPERIENCE,
} from "@/lib/site";

/**
 * Layer order, bottom to top:
 *   1. photograph        2. air-effect layer (empty for now)
 *   3. scrim             4. copy            5. navigation (root layout)
 *
 * Composition changes shape rather than crop severity across
 * breakpoints. A 16:9 photograph inside a ~1:2 phone viewport cannot be
 * covered without slicing the air-conditioner out of frame, so below
 * `lg` the picture becomes a band and the copy sits beneath it on ink.
 * The band starts under the navigation rather than behind it: the unit
 * sits at the very top of the frame, so a full-bleed band would put the
 * focal point behind the bar at exactly the sizes where it matters most.
 * From `lg` up the photograph fills the section and the copy moves onto
 * its dark left-hand side.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-ink lg:justify-center">
      {/* 1 — photograph */}
      <div className="absolute inset-x-0 top-[4.75rem] h-[36dvh] lg:inset-0 lg:top-0 lg:h-auto">
        <Image
          src="/images/hero-ac-bedroom.webp"
          alt="Stenska klimatska naprava v mirni spalnici v večernem svetlobnem vzdušju."
          fill
          priority
          quality={82}
          // Below `lg` the band is far taller than the photo's 16:9, so
          // object-cover scales the picture to roughly 2.2x the viewport
          // width. Plain "100vw" would hand a 375px file to an 820px slot
          // and the LCP image would arrive visibly soft.
          sizes="(max-width: 1023px) 230vw, 100vw"
          // The unit sits upper-right in the frame; the small-screen band
          // is anchored right so it stays whole instead of being sliced.
          className="hero-drift object-cover [object-position:86%_50%] lg:[object-position:50%_50%]"
        />
      </div>

      {/* 2 — future cold-air effect */}
      <HeroAirEffect />

      {/* 3 — scrim. Small screens dissolve the photo into the ink panel
             below it; large screens darken only the left third. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[4.75rem] z-20 h-[38dvh] bg-[linear-gradient(to_top,var(--color-ink)_2%,rgba(18,21,26,0.5)_30%,rgba(18,21,26,0.04)_70%,rgba(18,21,26,0)_100%)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 hidden bg-[linear-gradient(to_right,rgba(9,11,14,0.9)_0%,rgba(9,11,14,0.68)_34%,rgba(9,11,14,0.18)_62%,rgba(9,11,14,0)_82%)] lg:block"
      />
      {/* Backs the glass navigation against the bright ceiling. Only
          needed from `lg`, where the bar overlaps the photograph; below
          that it already sits on ink. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 hidden h-32 bg-[linear-gradient(to_bottom,rgba(9,11,14,0.55),rgba(9,11,14,0))] lg:block"
      />

      {/* 4 — copy. Bottom padding clears the fixed mobile action bar so
             the trust line is never permanently sitting underneath it. */}
      <div className="shell relative z-30 pt-[calc(4.75rem+38dvh)] pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:pb-16 lg:pt-32 lg:pb-32">
        <div className="max-w-[34rem] lg:max-w-[38rem]">
          <h1 className="text-[clamp(2.125rem,9.4vw,2.75rem)] leading-[0.98] font-semibold text-white sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]">
            <span className="block whitespace-nowrap">Ko mora tehnika{" "}</span>
            <span className="mt-1 block whitespace-nowrap">
              preprosto delovati.
            </span>
          </h1>

          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-white/80 sm:text-[1.125rem]">
            Servis, montaža in prodaja klimatskih naprav, toplotnih črpalk,
            bele tehnike in hladilne opreme.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-9">
            <ActionLink href={ROUTES.booking} variant="brand" size="lg">
              Naroči servis
            </ActionLink>
            <ActionLink
              href={`tel:${PRIMARY_PHONE.tel}`}
              variant="glass"
              size="lg"
              className="nums"
            >
              {PRIMARY_PHONE.label}
            </ActionLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.875rem] text-white/70">
            <span>
              <strong className="nums font-semibold text-white">
                {YEARS_EXPERIENCE}
              </strong>{" "}
              let izkušenj
            </span>
            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-white/25 sm:block"
            />
            <span className="inline-flex items-center gap-2">
              <Star
                aria-hidden="true"
                className="size-4 fill-white/80 text-white/80"
              />
              {SHOW_GOOGLE_RATING ? (
                <>
                  <strong className="nums font-semibold text-white">
                    {GOOGLE_RATING}
                  </strong>{" "}
                  Google ocena
                </>
              ) : (
                // No brand count here either — the claim stands on its
                // own without a number attached to it.
                <span className="font-medium text-white">
                  Uradni serviser vodilnih znamk
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Tells the navigation when the hero has scrolled away. */}
      <div
        aria-hidden="true"
        data-nav-sentinel
        className="absolute inset-x-0 bottom-0 h-px"
      />
    </section>
  );
}
