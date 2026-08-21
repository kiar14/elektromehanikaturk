/**
 * Central scroll signal.
 *
 * Lenis takes over the scroll position and does not dispatch native
 * `scroll` events, so anything that needs to react to scrolling has to
 * be fed by Lenis rather than by the window. This module is the seam:
 * `MotionProvider` publishes from Lenis when it is running, and
 * subscribers also attach a native listener for the cases where it is
 * not — reduced motion, or before hydration.
 *
 * It also lets overlays pause smooth scrolling without importing Lenis.
 */

type Controllable = { stop: () => void; start: () => void };
type Listener = (scrollY: number) => void;

let instance: Controllable | null = null;
const listeners = new Set<Listener>();

export function registerScroller(next: Controllable | null) {
  instance = next;
}

export function pauseScroll() {
  instance?.stop();
}

export function resumeScroll() {
  instance?.start();
}

/** Called by MotionProvider on every Lenis scroll frame. */
export function publishScroll(scrollY: number) {
  for (const listener of listeners) listener(scrollY);
}

/** Returns an unsubscribe function. */
export function onScroll(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
