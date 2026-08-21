"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { publishScroll, registerScroller } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Owns the whole motion system for the site:
 *
 *  - Lenis smooth scrolling, driven by the GSAP ticker so the two never
 *    fight over rAF.
 *  - A single ScrollTrigger.batch that reveals every `[data-reveal]`
 *    element on the page, so section components can stay server
 *    components and simply mark up what should animate.
 *
 * Everything is skipped when the user prefers reduced motion. The
 * `.js-anim` class that hides pre-reveal elements is only ever added by
 * the inline script in <head>, so with JS off or reduced motion on the
 * content is plainly visible — animation can never gate access.
 */
export function MotionProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    // The inline bootstrap arms a timer that strips `.js-anim` if this
    // never runs. It did run, so reveals are in hand — cancel it.
    const fallback = (window as unknown as { __emtRevealFallback?: number })
      .__emtRevealFallback;
    if (fallback) clearTimeout(fallback);

    /* ---------- Smooth scroll ---------- */
    const lenis = new Lenis({
      // Short duration + a near-linear tail: perceptibly smoother than
      // native, without the floaty lag that makes a site feel slow.
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Native wheel behaviour on touch — mobile scrolling stays natural.
      syncTouch: false,
      touchMultiplier: 1,
      anchors: true,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    registerScroller(lenis);

    // Dev-only handle. Lenis owns the scroll position and reverts any
    // external scrollTo on the next tick, which makes the page awkward to
    // drive from a console or an automated check. Stripped from builds.
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Lenis owns the scroll position and emits no native scroll events,
    // so both ScrollTrigger and the rest of the app are driven from here.
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update();
      publishScroll(scroll);
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* ---------- Section reveals ---------- */
    // One ScrollTrigger per element, callbacks batched so items that
    // enter together animate as a staggered group.
    const revealBatch = ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true,
          // Drop the compositing hint once the element has landed.
          onComplete: () => gsap.set(elements, { clearProps: "willChange" }),
        });
      },
    });

    // Fine progress lines (process section) draw in from the left.
    const lineBatch = ScrollTrigger.batch("[data-reveal-line]", {
      start: "top 80%",
      once: true,
      onEnter: (elements) => {
        gsap.to(elements, {
          scaleX: 1,
          duration: 1.1,
          stagger: 0.06,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    /* ---------- Services entrance ---------- */
    // Its own choreography rather than the page-wide batch: the cards
    // need to arrive from the side of the grid they occupy, and the
    // heading has to land before them. GSAP owns this too, so the
    // section still has exactly one animation owner.
    const servicesTriggers: ScrollTrigger[] = [];
    const servicesSection = document.querySelector<HTMLElement>(
      "[data-services-sequence]",
    );

    if (servicesSection) {
      const heads = gsap.utils.toArray<HTMLElement>(
        "[data-service-head]",
        servicesSection,
      );
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-service-card]",
        servicesSection,
      );

      // The long slide only makes sense once the grid is two columns and
      // a card really does sit on one side of the layout. Below `lg` the
      // cards are full width, so a 88px slide would just push them past
      // the viewport edge; the shorter travel keeps the directional
      // character without the clipping.
      const stacked = window.matchMedia("(max-width: 1023px)").matches;
      const travel = stacked ? 36 : 88;

      gsap.set(heads, { opacity: 0, y: (i: number) => (i === 0 ? 10 : 16) });
      gsap.set(cards, {
        opacity: 0,
        scale: 0.985,
        x: (_i: number, el: HTMLElement) =>
          el.dataset.enter === "right" ? travel : -travel,
      });

      const cardGroups = stacked
        ? cards.map((card) => [card])
        : [cards.slice(0, 2), cards.slice(2, 4)];

      servicesTriggers.push(
        ScrollTrigger.create({
          trigger: servicesSection,
          start: "top 72%",
          once: true,
          onEnter: () => {
            heads.forEach((el, i) => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "expo.out",
                delay: i * 0.08,
              });
            });
          },
        }),
      );

      // Each desktop row owns a viewport trigger. In the single-column
      // layout every card becomes its own group, so no off-screen mobile
      // card is animated together with the card above it.
      cardGroups.forEach((group, groupIndex) => {
        if (!group[0]) return;

        servicesTriggers.push(
          ScrollTrigger.create({
            trigger: group[0],
            start: "top 82%",
            once: true,
            onEnter: () => {
              gsap.to(group, {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1.25,
                stagger: stacked ? 0 : 0.14,
                ease: "power3.out",
                delay: !stacked && groupIndex === 0 ? 0.16 : 0,
                overwrite: true,
                // Drop the transform once the group has landed so the
                // cards stop being their own compositing layers.
                onComplete: () =>
                  gsap.set(group, { clearProps: "transform,willChange" }),
              });
            },
          }),
        );
      });
    }

    // Anything already at or above the fold on arrival (deep link,
    // restored scroll) is shown straight away rather than animated in.
    const revealPresentContent = () => {
      const limit = window.innerHeight * 0.88;
      const settled = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-reveal],[data-service-head],[data-service-card]",
        ),
      ).filter((el) => el.getBoundingClientRect().top < limit);
      if (settled.length) {
        gsap.set(settled, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clearProps: "willChange",
        });
      }
      const lines = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal-line]"),
      ).filter((el) => el.getBoundingClientRect().top < limit);
      if (lines.length) gsap.set(lines, { scaleX: 1 });
    };

    // Images and fonts settle after hydration; recalculate positions once
    // everything has loaded so triggers do not fire against stale offsets.
    const onLoad = () => {
      ScrollTrigger.refresh();
      revealPresentContent();
    };
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") onLoad();

    // rAF is suspended while a tab is in the background, so the ticker
    // stops and no trigger can fire. A page loaded in a background tab
    // would otherwise show its sections still hidden the moment it is
    // brought forward; settle whatever is on screen when that happens.
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      ScrollTrigger.refresh();
      revealPresentContent();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", onVisible);
      revealBatch.forEach((t) => t.kill());
      servicesTriggers.forEach((t) => t.kill());
      lineBatch.forEach((t) => t.kill());
      gsap.ticker.remove(tick);
      registerScroller(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, {
    // RootLayout persists across App Router navigations. Rebuild the
    // page-scoped ScrollTriggers after the route DOM has been replaced,
    // otherwise a return to `/` leaves the new reveal elements hidden
    // while the triggers still reference the previous homepage nodes.
    dependencies: [pathname],
    revertOnUpdate: true,
  });

  return null;
}
