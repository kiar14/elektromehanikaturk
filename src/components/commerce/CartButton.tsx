"use client";

import { ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "@/components/commerce/CartProvider";

export function CartButton({ className }: { className?: string }) {
  const { hydrated, itemCount, openCart } = useCart();
  const itemLabel =
    itemCount === 1
      ? "izdelek"
      : itemCount === 2
        ? "izdelka"
        : itemCount === 3 || itemCount === 4
          ? "izdelki"
          : "izdelkov";

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        itemCount > 0
          ? `Odpri košarico, ${itemCount} ${itemLabel}`
          : "Odpri košarico"
      }
      className={cn(
        "relative flex size-10 items-center justify-center rounded-[10px] text-on-dark transition-colors duration-200 hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <ShoppingBag aria-hidden="true" className="size-[1.15rem]" />
      {hydrated && itemCount > 0 ? (
        <span className="nums absolute -top-0.5 -right-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-brand px-1 text-[0.625rem] leading-[1.125rem] font-semibold text-white">
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
