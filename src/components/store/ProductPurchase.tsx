"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { QuantityControl } from "@/components/commerce/QuantityControl";

export function ProductPurchase({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <QuantityControl
        value={quantity}
        onChange={(value) => setQuantity(Math.max(1, value))}
      />
      <AddToCartButton
        productId={productId}
        quantity={quantity}
        className="min-w-[12rem] flex-1 sm:flex-none"
      />
    </div>
  );
}
