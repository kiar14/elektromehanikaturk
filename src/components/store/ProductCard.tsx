"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import {
  formatPrice,
  productHref,
  type StoreProduct,
} from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: StoreProduct;
  className?: string;
}) {
  const href = productHref(product);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-paper transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_18px_40px_-30px_rgba(18,21,26,0.45)]",
        className,
      )}
    >
      <Link
        href={href}
        aria-label={`Poglej ${product.title}`}
        className="relative aspect-square overflow-hidden bg-base"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 540px) 46vw, 92vw"
          className="object-contain p-7 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
        />
        {product.oldPrice ? (
          <span className="absolute top-3.5 left-3.5 rounded-[6px] bg-brand px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.04em] text-white uppercase">
            Akcija
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col border-t border-line p-5">
        <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-ink-4 uppercase">
          {product.brand}
        </p>
        <h3 className="mt-2 text-[1.0625rem] leading-snug font-semibold text-ink">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-brand"
          >
            {product.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-3">
          {product.summary}
        </p>

        <div className="mt-auto pt-5">
          <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="nums text-xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice ? (
              <span className="nums text-sm text-ink-4 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : null}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              href={href}
              className="group/link inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink-2 transition-colors hover:text-brand"
            >
              Poglej izdelek
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
              />
            </Link>
            <AddToCartButton productId={product.id} compact />
          </div>
        </div>
      </div>
    </article>
  );
}
