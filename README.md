# Elektromehanika Turk

Homepage and site navigation for Elektromehanika Turk (EMT) — HVAC
service, appliance repair and equipment sales in Dolenjska and Posavje.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
GSAP/ScrollTrigger · Lenis · Motion · React Hook Form + Zod.

## Running

```bash
npm run dev
```

`npm run build` produces a fully static prerender of `/`.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/app/globals.css` | Design tokens — surfaces, ink scale, brand accent, radii, motion easings |
| `src/lib/site.ts` | Business facts (address, phones, hours, service area) and the Google profile flags |
| `src/lib/content.ts` | Homepage content: services, products, reasons, reviews, brands |
| `src/lib/navigation.ts` | Site architecture and every route the nav points at |
| `src/lib/scroll.ts` | Central scroll signal — see "Scrolling" below |
| `src/components/motion/MotionProvider.tsx` | The single owner of Lenis + all scroll reveals |
| `src/components/sections/` | One component per homepage section |

## Google Business Profile

Profile: **Elektromehanika Turk Marko s.p.** (knowledge-graph `/g/1ttdx74w`,
CID `3113223537819948156`). `GOOGLE_URL` in `src/lib/site.ts` uses the
`cid` permalink because `share.google` links can expire. The coordinates
in the `LocalBusiness` schema come from the same listing.

**The rating is 3,8 and is deliberately not displayed.** Below roughly
4,3 a visible rating costs a local service business more conversions
than it wins, so the hero, the figures row and the reviews heading lead
with signals that are both true and favourable, and the profile is one
click away for anyone who wants the number.

To show it everywhere it used to appear, set `SHOW_GOOGLE_RATING = true`
in `src/lib/site.ts` — the hero chip, the third figure and the reviews
button all read that one flag.

Google publishes no review count for this profile, so there is no
`[ŠT. MNENJ]` figure to fill and `aggregateRating` is absent from the
structured data (a rating without a count is not valid there anyway).

## Still to wire up

`src/lib/enquiry.ts` holds the single `TODO(backend)`: both enquiry
forms funnel through `submitEnquiry`, which currently resolves after a
short delay instead of sending anything.

## Scrolling

Lenis owns the scroll position and **emits no native `scroll` events**.
Anything that needs to react to scrolling must therefore be driven from
Lenis, not from `window`. `src/lib/scroll.ts` is that seam:
`MotionProvider` publishes on every Lenis frame, and subscribers also
attach a native listener to cover the case where Lenis is not running at
all (reduced motion).

For the same reason the navbar compares a cached offset against
`scrollY` rather than using an `IntersectionObserver`: the hero sentinel
is one pixel tall, so an in-page anchor or a restored scroll position
can take it from below the viewport to above it inside a single frame —
the intersection state never changes and no callback fires.

## Motion

All reveals are driven by one `ScrollTrigger.batch` over `[data-reveal]`,
so section components stay server components and only need the
attribute. Pre-reveal elements are hidden by `.js-anim` on `<html>`,
which an inline script in `<head>` adds **only** when JS runs and
reduced motion is not requested — with either absent, content is simply
visible. Animation can never gate access to content.

## Assets

Source imagery lives in `.assets-src/`. Three scripts regenerate
everything under `public/images/`:

```bash
node scripts/build-images.cjs           # hero, service photos, products, logo
node scripts/build-brand-logos.cjs      # the 15 manufacturer logos
node scripts/build-og-image.cjs         # the 1200x630 social preview card
```

`build-og-image.cjs` needs the trimmed wordmark `build-images.cjs`
produces, so run it second. It rebuilds the homepage hero at card
proportions — same photograph, same left-hand ink scrim, same white
wordmark — and burns no headline into the pixels: every platform the
card is aimed at renders `og:title` and `og:description` as live text
beside the image, so repeating the headline inside it is what makes a
preview look cluttered. `src/lib/metadata.ts` is the single place the
`openGraph` and `twitter` blocks are assembled; a route that writes its
own `openGraph` **replaces** the parent's rather than extending it, which
is how pages used to lose `og:site_name` and advertise the homepage on X.

The manufacturer logos need their own pass because the sources arrive
in three shapes and all of them have to end up floating on the off-white
surface in their **original brand colours**:

- colour on transparency (the SVGs, Zanussi's yellow plate, Elmont's red
  badge) — rasterised and trimmed as-is;
- an opaque white plate behind the mark (the two JPEGs) — alpha is taken
  from the distance to white and the colour un-premultiplied, so a red
  mark stays saturated red instead of going pink;
- a **white** mark on transparency (Icematic) — its original colour is
  invisible on a light background, so its shape is painted in ink. This
  is the one logo that cannot be shown exactly as supplied; a dark or
  colour version of that wordmark would remove the exception.

`size` in the BRANDS array normalises optical *height* (36–50px) rather
than width, so wide wordmarks stay wide. The script prints the array to
paste into `src/lib/content.ts`.

## Not built yet

The navigation intentionally points at routes that do not exist:
`/storitve/*`, `/trgovina`, `/trgovina/klimatske-naprave/[slug]`,
`/cenik`, `/nasveti`, `/o-nas`, `/kontakt`, `/narocilo-servisa` and the
legal pages. Product cards already use the future
`/trgovina/<kategorija>/<slug>` shape.

`HeroAirEffect` is a deliberate no-op placeholder for the cold-air
effect. It is absolutely positioned, `pointer-events: none`, sits above
the photograph and below the scrim, and contributes nothing to layout —
so it can be replaced with Canvas, WebGL or transparent video without
touching the hero.
