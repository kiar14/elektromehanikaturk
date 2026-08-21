"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { actionClass } from "@/components/ui/actions";
import { QuantityControl } from "@/components/commerce/QuantityControl";
import { useCart } from "@/components/commerce/CartProvider";
import { formatPrice, productHref } from "@/lib/products";

export function CartDrawer() {
  const {
    lines,
    subtotal,
    drawerOpen,
    closeCart,
    setQuantity,
    removeItem,
  } = useCart();

  return (
    <Sheet open={drawerOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[min(92vw,30rem)] max-w-none gap-0 border-l border-line bg-paper p-0 shadow-[0_24px_80px_-32px_rgba(18,21,26,0.5)]"
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5 sm:px-6">
          <SheetTitle className="text-xl font-semibold text-ink">
            Košarica
          </SheetTitle>
          <SheetClose
            aria-label="Zapri košarico"
            className="flex size-10 items-center justify-center rounded-[10px] text-ink-3 transition-colors hover:bg-mist hover:text-ink"
          >
            <X aria-hidden="true" className="size-5" />
          </SheetClose>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
              <ShoppingBag aria-hidden="true" className="size-6" />
            </span>
            <p className="mt-5 text-xl font-semibold text-ink">
              Vaša košarica je prazna.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-3">
              Oglejte si ponudbo in dodajte izdelek v košarico.
            </p>
            <Link
              href="/trgovina"
              onClick={closeCart}
              className={actionClass("brand", "md", "mt-6")}
            >
              V trgovino
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain px-5 py-2 sm:px-6">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border-b border-line py-5"
                >
                  <Link
                    href={productHref(line.product)}
                    onClick={closeCart}
                    className="relative aspect-square overflow-hidden rounded-[10px] bg-base"
                  >
                    <Image
                      src={line.product.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex items-start gap-3">
                      <Link
                        href={productHref(line.product)}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm leading-snug font-semibold text-ink transition-colors hover:text-brand"
                      >
                        {line.product.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(line.productId)}
                        aria-label={`Odstrani ${line.product.title}`}
                        className="ml-auto shrink-0 rounded-md p-1 text-ink-4 transition-colors hover:bg-mist hover:text-danger"
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                    <p className="nums mt-2 text-sm font-semibold text-ink">
                      {formatPrice(line.lineTotal)}
                    </p>
                    <div className="mt-3">
                      <QuantityControl
                        compact
                        value={line.quantity}
                        onChange={(quantity) =>
                          setQuantity(line.productId, quantity)
                        }
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line bg-base p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-ink-3">
                  Vmesni seštevek
                </p>
                <p className="nums text-xl font-semibold text-ink">
                  {formatPrice(subtotal)}
                </p>
              </div>
              <Link
                href="/kosarica"
                onClick={closeCart}
                className={actionClass("brand", "lg", "mt-5 w-full")}
              >
                Poglej košarico
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 h-11 w-full rounded-[10px] text-sm font-medium text-ink-2 transition-colors hover:bg-mist"
              >
                Nadaljuj z nakupovanjem
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
