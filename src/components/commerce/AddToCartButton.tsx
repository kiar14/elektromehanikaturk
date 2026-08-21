"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "@/components/commerce/CartProvider";

export function AddToCartButton({
  productId,
  quantity = 1,
  className,
  compact = false,
}: {
  productId: string;
  quantity?: number;
  className?: string;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId, quantity);
        setAdded(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setAdded(false), 1000);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand font-semibold whitespace-nowrap text-white transition-[background-color,transform] duration-200 hover:bg-brand-2 active:scale-[0.98]",
        compact ? "h-10 px-3.5 text-[0.8125rem]" : "h-12 px-6 text-[0.9375rem]",
        className,
      )}
    >
      {added ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <ShoppingBag aria-hidden="true" className="size-4" />
      )}
      {added ? "Dodano" : "Dodaj v košarico"}
    </button>
  );
}
