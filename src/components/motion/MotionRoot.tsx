"use client";

import dynamic from "next/dynamic";

/**
 * GSAP, ScrollTrigger and Lenis are ~110 KB gzipped and none of it is
 * needed to paint the page or to answer the first tap — the provider
 * renders nothing and every element it animates sits below the fold.
 * Loading it after hydration keeps that cost off the critical path
 * instead of blocking the main thread while the hero is still settling.
 *
 * `ssr: false` needs a client component to sit in, which is all this is.
 */
const MotionProvider = dynamic(
  () => import("./MotionProvider").then((m) => m.MotionProvider),
  { ssr: false },
);

export function MotionRoot() {
  return <MotionProvider />;
}
