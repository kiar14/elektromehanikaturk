/**
 * Placeholder layer for the cold-air effect that will later flow from
 * the air-conditioner in the hero photograph.
 *
 * It renders nothing today — on purpose. Faking the effect with blurred
 * CSS circles would look cheap, and pulling in a 3D runtime for an
 * unused placeholder would cost the LCP budget for nothing.
 *
 * When the real effect arrives, replace the body of this component with
 * a <canvas>, a WebGL surface (Three.js / React Three Fiber) or a
 * transparent <video>. The contract the rest of the hero relies on:
 *
 *   - absolutely positioned, filling the hero
 *   - pointer-events: none, so it never intercepts clicks
 *   - sits above the photograph and below the scrim + copy
 *   - contributes nothing to layout, so it cannot shift the headline
 *
 * The air-conditioner sits in the upper-right of the frame. Hero image
 * movement is kept to a slow, small scale so that anchor point stays
 * optically stable for whatever is layered on top.
 */
export function HeroAirEffect() {
  return (
    <div
      aria-hidden="true"
      data-hero-air-effect
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    />
  );
}
