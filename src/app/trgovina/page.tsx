import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopCatalogFromQuery } from "@/components/store/ShopCatalog";
import { socialMetadata } from "@/lib/metadata";

export const metadata: Metadata = socialMetadata({
  title: "Trgovina",
  description:
    "Klimatske naprave, bela tehnika ter hladilna in gostinska oprema iz ponudbe Elektromehanike Turk.",
  path: "/trgovina",
});

export default function ShopPage() {
  return (
    <>
      <Suspense fallback={<ShopCatalogFallback />}>
        <ShopCatalogFromQuery />
      </Suspense>
    </>
  );
}

function ShopCatalogFallback() {
  return (
    <div
      className="shell pt-32 pb-24 sm:pt-36 lg:pt-40"
      aria-label="Nalaganje kataloga"
    >
      <div className="h-12 w-52 animate-pulse rounded-[8px] bg-mist" />
      <div className="mt-4 h-5 w-full max-w-md animate-pulse rounded-[6px] bg-mist" />
      <div className="mt-10 h-[4.75rem] animate-pulse border-y border-line bg-mist/50" />
      <div className="mt-8 grid gap-5 min-[540px]:grid-cols-2 lg:ml-[17rem] xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="aspect-[0.74] animate-pulse rounded-[12px] bg-mist"
          />
        ))}
      </div>
    </div>
  );
}
