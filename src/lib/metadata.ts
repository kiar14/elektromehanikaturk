import type { Metadata } from "next";

import { SITE } from "@/lib/site";

/**
 * Link-preview metadata.
 *
 * Next merges `metadata` objects one level deep: a route that declares
 * its own `openGraph` **replaces** the parent's rather than extending it,
 * and a route that declares none inherits the parent's wholesale. Both
 * halves of that bite here — a page that set `openGraph` silently lost
 * `siteName` and `locale`, and every page that set none was advertising
 * the homepage title and description on X. `socialMetadata` is the one
 * place those fields are assembled, so a route only has to say what is
 * actually different about it.
 */

/**
 * The branded 1200x630 card, built by scripts/build-og-image.cjs. Width
 * and height are declared because WhatsApp and LinkedIn lay the card out
 * before the image finishes downloading; without them the preview can
 * settle as a small thumbnail even though a large one was available.
 */
export const SOCIAL_IMAGE = {
  url: "/images/og-emt.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Elektromehanika Turk - servis in prodaja klimatskih naprav, toplotnih črpalk in bele tehnike.",
} as const;

type SocialInput = {
  title: string;
  description: string;
  /** Route-relative canonical, e.g. `/storitve/servis-klimatskih-naprav`. */
  path?: string;
  /** Page-specific artwork. Falls back to the branded card. */
  image?: { url: string; alt: string };
  type?: "website" | "article";
  /**
   * X renders `summary_large_image` as a wide banner and crops whatever
   * it is given to roughly 1.91:1. That suits photography and the branded
   * card; it decapitates a product shot standing on a plain background,
   * which is what `summary` — a small square thumbnail — is for.
   */
  card?: "summary_large_image" | "summary";
  /**
   * Next's `title.template` rewrites the document title only — it never
   * reaches `og:title`. Mirroring it here keeps the shared card and the
   * browser tab saying the same thing. The homepage opts out: its title
   * already ends in a qualifier of its own.
   */
  appendSiteName?: boolean;
};

export function socialMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  card = "summary_large_image",
  appendSiteName = true,
}: SocialInput): Metadata {
  const socialTitle =
    appendSiteName && !title.includes(SITE.name)
      ? `${title} | ${SITE.name}`
      : title;
  const images = image
    ? [{ url: image.url, alt: image.alt }]
    : [{ ...SOCIAL_IMAGE }];

  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type,
      locale: "sl_SI",
      siteName: SITE.name,
      title: socialTitle,
      description,
      ...(path ? { url: path } : {}),
      images,
    },
    twitter: {
      card,
      title: socialTitle,
      description,
      images: images.map((entry) => entry.url),
    },
  };
}
