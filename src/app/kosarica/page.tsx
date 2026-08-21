import type { Metadata } from "next";

import { CartPageContent } from "@/components/commerce/CartPageContent";

export const metadata: Metadata = {
  title: "Košarica",
  description: "Pregled izdelkov v demo košarici Elektromehanike Turk.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Trgovina</p>
          <h1 className="mt-5 text-[2.75rem] leading-[1.02] sm:text-[3.75rem]">
            Košarica
          </h1>
        </div>
        <div className="mt-10 sm:mt-12">
          <CartPageContent />
        </div>
      </div>
    </section>
  );
}
