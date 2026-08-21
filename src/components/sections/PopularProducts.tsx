import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/actions";
import { PRODUCTS, type Product } from "@/lib/content";
import { ROUTES } from "@/lib/navigation";

/**
 * EMT also sells equipment, so the homepage has to introduce the shop
 * rather than reading as a pure service site. Merchandising treatment,
 * not service-feature cards.
 */
export function PopularProducts() {
  return (
    <section
      id="izdelki"
      className="scroll-mt-24 bg-mist py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <header
          className="flex flex-wrap items-end justify-between gap-6"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="eyebrow">Trgovina</p>
            <h2 className="mt-5 text-[2.5rem] leading-[1.03] sm:text-[3rem] lg:text-[3.75rem]">
              Priljubljene naprave
            </h2>
            <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-3">
              Klimatske naprave, ki jih montiramo najpogosteje. Cena vključuje
              montažo.
            </p>
          </div>
          <div className="hidden lg:block">
            <ArrowLink href={ROUTES.shop}>Poglejte trgovino</ArrowLink>
          </div>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>

        <div className="mt-10 lg:hidden" data-reveal>
          <ArrowLink href={ROUTES.shop}>Poglejte trgovino</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article data-reveal className="h-full">
      <Link
        href={product.href}
        aria-label={product.name}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-paper",
          "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_18px_40px_-28px_rgba(18,21,26,0.4)]",
        )}
      >
        {/* Wall units are wide and shallow; a squarer frame would leave
            most of the card empty above and below the product. */}
        <div className="relative aspect-[3/2] overflow-hidden bg-base">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className={cn(
              "p-5 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              product.imageClass,
            )}
          />
          <span className="absolute top-3.5 left-3.5 rounded-[6px] bg-brand px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.04em] text-white uppercase">
            Akcija
          </span>
        </div>

        <div className="flex flex-1 flex-col border-t border-line p-5">
          <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-ink-4 uppercase">
            {product.manufacturer}
          </p>
          <h3 className="mt-2 text-[1.125rem] leading-snug font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
            {product.model}
          </h3>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-3">
            {product.descriptor}
          </p>

          <p className="mt-auto flex flex-wrap items-baseline gap-x-2.5 gap-y-1 pt-5">
            <span className="nums text-[1.25rem] font-semibold text-ink">
              {product.price}
            </span>
            <span className="nums text-[0.875rem] text-ink-4 line-through">
              {product.priceBefore}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
