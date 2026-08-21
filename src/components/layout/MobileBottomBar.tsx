import Link from "next/link";
import { Phone, ShoppingBag, Wrench } from "lucide-react";

import { PRIMARY_PHONE } from "@/lib/site";
import { ROUTES } from "@/lib/navigation";

/**
 * Persistent conversion bar for small screens. Body padding in the root
 * layout reserves the space it occupies, so it never covers the footer
 * or the last field of a form.
 */
export function MobileBottomBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink pb-[env(safe-area-inset-bottom)] md:hidden"
      role="navigation"
      aria-label="Hitre akcije"
    >
      <div className="grid h-[4.25rem] grid-cols-3 divide-x divide-line-dark">
        <a
          href={`tel:${PRIMARY_PHONE.tel}`}
          className="flex flex-col items-center justify-center gap-1 text-on-dark transition-colors duration-150 active:bg-white/10"
        >
          <Phone aria-hidden="true" className="size-[1.15rem]" />
          <span className="text-[0.75rem] font-medium">Pokliči</span>
        </a>

        <Link
          href={ROUTES.booking}
          className="flex flex-col items-center justify-center gap-1 bg-brand text-white transition-colors duration-150 active:bg-brand-2"
        >
          <Wrench aria-hidden="true" className="size-[1.15rem]" />
          <span className="text-[0.75rem] font-semibold">Naroči servis</span>
        </Link>

        <Link
          href={ROUTES.shop}
          className="flex flex-col items-center justify-center gap-1 text-on-dark transition-colors duration-150 active:bg-white/10"
        >
          <ShoppingBag aria-hidden="true" className="size-[1.15rem]" />
          <span className="text-[0.75rem] font-medium">Trgovina</span>
        </Link>
      </div>
    </div>
  );
}
