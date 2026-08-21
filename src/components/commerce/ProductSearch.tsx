"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PRODUCTS, formatPrice, productHref } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("sl"));
  const results = deferredQuery
    ? PRODUCTS.filter((product) =>
        [product.title, product.brand, product.category, product.subcategory]
          .join(" ")
          .toLocaleLowerCase("sl")
          .includes(deferredQuery),
      ).slice(0, 6)
    : [];

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setQuery("");
      }}
    >
      <SheetTrigger
        aria-label="Išči izdelke"
        className={cn(
          "flex size-10 items-center justify-center rounded-[10px] text-on-dark transition-colors duration-200 hover:bg-white/10 hover:text-white",
          className,
        )}
      >
        <Search aria-hidden="true" className="size-[1.15rem]" />
      </SheetTrigger>

      <SheetContent
        side="top"
        showCloseButton={false}
        className="inset-x-0 top-0 h-auto max-h-[90dvh] w-full gap-0 overflow-y-auto border-b border-line bg-paper p-0 shadow-[0_28px_80px_-36px_rgba(18,21,26,0.45)]"
      >
        <SheetTitle className="sr-only">Iskanje izdelkov</SheetTitle>
        <div className="shell py-5 sm:py-7">
          <div className="flex items-center gap-3">
            <Search aria-hidden="true" className="size-5 shrink-0 text-ink-4" />
            <label htmlFor="product-search" className="sr-only">
              Poiščite izdelek
            </label>
            <input
              id="product-search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Poiščite izdelek"
              className="h-12 min-w-0 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-ink-4 sm:text-xl"
            />
            <SheetClose
              aria-label="Zapri iskanje"
              className="flex size-10 shrink-0 items-center justify-center rounded-[10px] text-ink-3 transition-colors hover:bg-mist hover:text-ink"
            >
              <X aria-hidden="true" className="size-5" />
            </SheetClose>
          </div>

          {deferredQuery ? (
            <div className="mt-5 border-t border-line pt-4">
              {results.length > 0 ? (
                <ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-6">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={productHref(product)}
                        onClick={() => setOpen(false)}
                        className="group grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 rounded-[10px] p-2 transition-colors hover:bg-base"
                      >
                        <span className="relative aspect-square overflow-hidden rounded-[8px] bg-base">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-contain p-1.5"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-sm leading-snug font-semibold text-ink transition-colors group-hover:text-brand">
                            {product.title}
                          </span>
                          <span className="nums mt-1 block text-sm text-ink-3">
                            {formatPrice(product.price)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-5 text-sm text-ink-3">
                  Za ta iskalni niz ni zadetkov v demo katalogu.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 border-t border-line pt-4 text-sm text-ink-3">
              Iščite po imenu, znamki ali kategoriji.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
