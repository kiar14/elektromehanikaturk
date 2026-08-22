import type { MetadataRoute } from "next";

import { ARTICLES, articleHref } from "@/content/nasveti";
import { SERVICE_PAGES } from "@/content/storitve";
import { PRODUCTS, productHref } from "@/lib/products";
import { SITE } from "@/lib/site";

/**
 * Indexable routes only. The cart and the legal pages carry
 * `robots: { index: false }` in their own metadata, so listing them here
 * would contradict the pages themselves.
 *
 * `lastModified` is deliberately absent: the content is static and no
 * verified revision dates exist, and a fabricated timestamp on every
 * route is worse than none at all.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/trgovina",
    ...PRODUCTS.map((product) => productHref(product)),
    ...SERVICE_PAGES.map((service) => `/storitve/${service.slug}`),
    "/cenik",
    "/izracun-moci",
    "/nasveti",
    ...ARTICLES.map((article) => articleHref(article.slug)),
    "/pogosta-vprasanja",
    "/o-nas",
    "/narocilo-servisa",
    "/kontakt",
  ];

  return paths.map((path) => ({
    url: new URL(path, SITE.url).toString(),
  }));
}
