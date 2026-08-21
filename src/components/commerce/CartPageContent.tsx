"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

import { QuantityControl } from "@/components/commerce/QuantityControl";
import { useCart } from "@/components/commerce/CartProvider";
import { actionClass } from "@/components/ui/actions";
import { formatPrice, productHref } from "@/lib/products";

export function CartPageContent() {
  const {
    lines,
    subtotal,
    hydrated,
    setQuantity,
    removeItem,
  } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="h-72 animate-pulse rounded-[12px] bg-mist" />
        <div className="h-64 animate-pulse rounded-[12px] bg-mist" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-[12px] border border-line bg-paper px-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
          <ShoppingBag aria-hidden="true" className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl">Vaša košarica je prazna.</h2>
        <p className="mt-3 max-w-sm leading-relaxed text-ink-3">
          Oglejte si ponudbo in dodajte izdelek v košarico.
        </p>
        <Link href="/trgovina" className={actionClass("brand", "lg", "mt-7")}>
          V trgovino
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-14">
      <section aria-labelledby="cart-items-title">
        <h2 id="cart-items-title" className="sr-only">
          Izdelki v košarici
        </h2>
        <ul className="overflow-hidden rounded-[12px] border border-line bg-paper px-5 sm:px-7">
          {lines.map((line) => (
            <li
              key={line.productId}
              className="grid gap-5 border-b border-line py-6 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)]"
            >
              <Link
                href={productHref(line.product)}
                className="relative aspect-square w-28 overflow-hidden rounded-[10px] bg-base sm:w-auto"
              >
                <Image
                  src={line.product.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-contain p-3"
                />
              </Link>
              <div className="min-w-0">
                <div className="flex items-start gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-[0.1em] text-ink-4 uppercase">
                      {line.product.brand}
                    </p>
                    <h3 className="mt-1.5 text-base leading-snug font-semibold text-ink">
                      <Link
                        href={productHref(line.product)}
                        className="transition-colors hover:text-brand"
                      >
                        {line.product.title}
                      </Link>
                    </h3>
                    <p className="nums mt-2 text-sm text-ink-3">
                      {formatPrice(line.product.price)} na kos
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId)}
                    aria-label={`Odstrani ${line.product.title}`}
                    className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-[8px] text-ink-4 transition-colors hover:bg-mist hover:text-danger"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                  </button>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <QuantityControl
                    value={line.quantity}
                    onChange={(quantity) => setQuantity(line.productId, quantity)}
                  />
                  <p className="nums text-lg font-semibold text-ink">
                    {formatPrice(line.lineTotal)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="rounded-[12px] border border-line bg-paper p-6 lg:sticky lg:top-24">
        <h2 className="text-2xl">Povzetek</h2>
        <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-5">
          <p className="text-sm text-ink-3">Vmesni seštevek</p>
          <p className="nums text-xl font-semibold text-ink">
            {formatPrice(subtotal)}
          </p>
        </div>
        <p className="mt-5 rounded-[10px] bg-brand-soft p-4 text-sm leading-relaxed text-ink-2">
          Zaključek naročila bo omogočen v končni različici trgovine.
        </p>
        <Link
          href="/trgovina"
          className={actionClass("outline", "lg", "mt-5 w-full")}
        >
          Nadaljuj z nakupovanjem
        </Link>
      </aside>
    </div>
  );
}
