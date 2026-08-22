import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { ProductPurchase } from "@/components/store/ProductPurchase";
import { ProductCard } from "@/components/store/ProductCard";
import { socialMetadata } from "@/lib/metadata";
import {
  PRODUCT_BY_SLUG,
  PRODUCTS,
  formatPrice,
  getRelatedProducts,
  type StoreProduct,
} from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG.get(slug);
  if (!product) return {};
  // `summary` rather than the wide card: these are studio shots standing
  // on a plain background at every aspect from 1100x414 to 867x2560, and
  // a 1.91:1 crop of a tall fridge is a picture of its middle drawer.
  return socialMetadata({
    title: product.title,
    description: product.summary,
    path: `/trgovina/${product.slug}`,
    image: { url: product.image, alt: product.imageAlt },
    card: "summary",
  });
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG.get(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <article className="pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
        <div className="shell">
          <Breadcrumbs product={product} />

          <div className="mt-7 grid gap-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(23rem,0.92fr)] lg:items-start lg:gap-14 xl:gap-20">
            <div className="relative aspect-square overflow-hidden rounded-[12px] border border-line bg-paper">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="object-contain p-8 sm:p-12 lg:p-14"
              />
              {product.oldPrice ? (
                <span className="absolute top-4 left-4 rounded-[6px] bg-brand px-2.5 py-1.5 text-xs font-semibold text-white uppercase">
                  Akcija
                </span>
              ) : null}
            </div>

            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                {product.brand}
              </p>
              <h1 className="mt-4 text-[2.25rem] leading-[1.06] sm:text-[3rem] lg:text-[3.25rem]">
                {product.title}
              </h1>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="nums text-[2rem] font-semibold text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice ? (
                  <span className="nums text-base text-ink-4 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                ) : null}
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink-3 sm:text-[1.0625rem]">
                {product.summary}
              </p>
              <div className="mt-8 border-y border-line py-6">
                <ProductPurchase productId={product.id} />
              </div>
              <p className="mt-5 text-sm text-ink-3">
                Kategorija:{" "}
                <Link
                  href={`/trgovina?kategorija=${encodeURIComponent(product.category)}#vsi-izdelki`}
                  className="font-semibold text-ink transition-colors hover:text-brand"
                >
                  {product.category}
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-12 border-t border-line pt-14 lg:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)] lg:gap-20 lg:pt-20">
            <section>
              <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">Opis</h2>
              <div className="mt-6 grid gap-4 text-base leading-relaxed text-ink-3">
                {product.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[1.5rem] leading-tight">Ključne lastnosti</h2>
              <ul className="mt-6 grid gap-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                      <Check aria-hidden="true" className="size-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-16 border-t border-line pt-14 lg:mt-20 lg:pt-20">
            <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">
              Tehnične specifikacije
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-[12px] border border-line bg-paper p-5"
                >
                  <p className="text-xs font-medium tracking-[0.08em] text-ink-4 uppercase">
                    {spec.label}
                  </p>
                  <p className="nums mt-2 text-lg font-semibold text-ink">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      <section className="bg-mist py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <h2 className="text-[2.25rem] leading-tight sm:text-[3rem]">
            Morda vas zanima tudi
          </h2>
          <div className="mt-10 grid gap-5 min-[540px]:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Breadcrumbs({ product }: { product: StoreProduct }) {
  return (
    <nav aria-label="Drobtinice">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-4">
        <li>
          <Link href="/trgovina" className="transition-colors hover:text-brand">
            Trgovina
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href={`/trgovina?kategorija=${encodeURIComponent(product.category)}#vsi-izdelki`}
            className="transition-colors hover:text-brand"
          >
            {product.category}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="max-w-full truncate font-medium text-ink-2" aria-current="page">
          {product.model}
        </li>
      </ol>
    </nav>
  );
}
