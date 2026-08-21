"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { FEATURED_REVIEWS, type Review } from "@/lib/content";
import { GOOGLE_RATING, GOOGLE_URL, SHOW_GOOGLE_RATING } from "@/lib/site";

const INTERVAL_MS = 4250;
const COUNT = FEATURED_REVIEWS.length;

/**
 * One review at a time inside a fixed card.
 *
 * The card itself never moves — only its contents cross-fade — so the
 * arrows either side stay put and the section never shifts. Outgoing and
 * incoming quotes share a single grid cell, which keeps the card as tall
 * as the taller of the two mid-transition instead of collapsing.
 *
 * Autoplay stops while the pointer is over the card, while focus is
 * anywhere inside the region, and while the tab is hidden. Any manual
 * navigation restarts the timer rather than letting it fire immediately
 * after a click.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  // Bumping this restarts the interval effect after manual navigation.
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % COUNT) + COUNT) % COUNT);
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    const onVisibility = () =>
      setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = hovered || focused || !tabVisible;

  useEffect(() => {
    if (paused || COUNT < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % COUNT), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, index, tick]);

  const review = FEATURED_REVIEWS[index];
  if (!review) return null;

  const variants = reduceMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: { opacity: 0, y: 8, filter: "blur(2px)" },
        center: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -6, filter: "blur(2px)" },
      };

  return (
    <section className="bg-mist py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <header className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow eyebrow-center">Mnenja strank</p>
          <h2 className="mt-5 text-[2.5rem] leading-[1.03] sm:text-[3rem] lg:text-[3.75rem]">
            Kaj pravijo naše stranke
          </h2>
        </header>

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="karusel"
          aria-label="Mnenja strank"
          className="mt-14 lg:mt-16"
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!regionRef.current?.contains(event.relatedTarget as Node)) {
              setFocused(false);
            }
          }}
          data-reveal
        >
          {/* One set of arrow buttons for both layouts. Below `lg` the
              card takes the full row and `order` drops the pair beneath
              it, which avoids duplicating the controls or overflowing. */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-7 lg:gap-x-6">
            <ArrowButton
              label="Prejšnje mnenje"
              onClick={() => go(index - 1)}
              className="order-2 lg:order-1"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </ArrowButton>

            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={cn(
                // Flexible rather than a fixed 52rem: at exactly 1024px a
                // fixed card plus both arrows overflows the container, so
                // the row wraps and only the right arrow drops below.
                // Growing to the space left over keeps the pair symmetric
                // at every width, with 52rem as the ceiling.
                "order-1 w-full lg:order-2 lg:w-auto lg:max-w-[52rem] lg:flex-1",
                "flex items-center justify-center",
                "rounded-[14px] border border-line-2 bg-paper",
                "px-6 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-14",
                "shadow-[0_1px_2px_rgba(18,21,26,0.04)]",
              )}
            >
              {/* One grid cell holding every quote on top of each other.
                  The five inactive ones are invisible but still laid out,
                  so the cell — and therefore the card — is always as tall
                  as the LONGEST review, whichever one is showing. That
                  keeps the card a fixed size without hard-coding a pixel
                  height that would break at another width, font size or
                  after an edit to the copy. */}
              <div className="grid w-full grid-cols-1 grid-rows-1">
                {FEATURED_REVIEWS.map((item) => (
                  <figure
                    key={`sizer-${item.author}`}
                    aria-hidden="true"
                    className="pointer-events-none invisible col-start-1 row-start-1 flex flex-col items-center justify-center text-center"
                  >
                    <QuoteContent review={item} />
                  </figure>
                ))}

                <AnimatePresence initial={false} mode="sync">
                  <motion.figure
                    key={index}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: reduceMotion ? 0.2 : 0.52,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="col-start-1 row-start-1 flex flex-col items-center justify-center self-center text-center"
                  >
                    <QuoteContent review={review} live />
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            <ArrowButton
              label="Naslednje mnenje"
              onClick={() => go(index + 1)}
              className="order-3"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </ArrowButton>
          </div>

          {/* Six segments, one per review. */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {FEATURED_REVIEWS.map((item, i) => (
              <button
                key={item.author}
                type="button"
                onClick={() => go(i)}
                aria-label={`Pokaži mnenje ${i + 1} od ${COUNT}`}
                aria-current={i === index ? "true" : undefined}
                className="group/bar py-2"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-[width,background-color] duration-300",
                    i === index
                      ? "w-8 bg-brand"
                      : "w-4 bg-line-2 group-hover/bar:bg-ink-4",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center" data-reveal>
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group/g inline-flex items-center gap-2.5 rounded-[10px] border border-line-2 bg-paper px-4 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-ink-4/60 hover:text-brand"
          >
            <Star aria-hidden="true" className="size-4 fill-brand text-brand" />
            {SHOW_GOOGLE_RATING ? (
              <span>
                <span className="nums font-semibold">{GOOGLE_RATING}</span> na
                Googlu
              </span>
            ) : (
              <span>Mnenja na Googlu</span>
            )}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-ink-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/g:-translate-y-0.5 group-hover/g:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Shared by the visible quote and by the invisible height reservers, so
 * what is measured is exactly what is rendered. Only the live copy gets
 * `aria-live`; the reservers are hidden from assistive tech entirely.
 */
function QuoteContent({
  review,
  live = false,
}: {
  review: Review;
  live?: boolean;
}) {
  return (
    <>
      {/* Five stars per review, as published alongside these same quotes
          on elektromehanikaturk.com. One label for the row rather than
          five repeated icons. */}
      <div
        className="mb-6 flex items-center gap-1"
        role={live ? "img" : undefined}
        aria-label={live ? "Ocena 5 od 5 zvezdic" : undefined}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            aria-hidden="true"
            className="size-[1.125rem] fill-brand text-brand"
          />
        ))}
      </div>

      <blockquote
        aria-live={live ? "polite" : undefined}
        className="text-[1.375rem] leading-[1.38] font-medium text-balance text-ink sm:text-[1.625rem] lg:text-[2rem]"
      >
        {`„${review.quote}”`}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-2.5">
        <span aria-hidden="true" className="h-px w-6 bg-line-2" />
        <span className="text-[0.9375rem] text-ink-3">{review.author}</span>
      </figcaption>
    </>
  );
}

function ArrowButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full",
        "border border-line-2 bg-paper text-ink-3",
        "shadow-[0_1px_2px_rgba(18,21,26,0.05)]",
        "transition-[transform,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:border-ink-4/60 hover:text-ink hover:shadow-[0_6px_14px_-8px_rgba(18,21,26,0.4)]",
        "active:translate-y-0",
        className,
      )}
    >
      {children}
    </button>
  );
}
