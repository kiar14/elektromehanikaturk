"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ActionLink } from "@/components/ui/actions";
import { PRIMARY_NAV, ROUTES, SERVICES_NAV, SHOP_NAV } from "@/lib/navigation";
import { PHONES, SITE } from "@/lib/site";
import { pauseScroll, resumeScroll } from "@/lib/scroll";

const FLAT_LINKS = PRIMARY_NAV.filter((item) => !item.children);

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  // Smooth scrolling must not keep running underneath the overlay.
  useEffect(() => {
    if (open) pauseScroll();
    else resumeScroll();
    return () => resumeScroll();
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Odpri meni"
        className="flex size-10 items-center justify-center rounded-[10px] border border-white/20 text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="on-ink w-[88%] border-l-line-dark bg-ink p-0 text-on-dark sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Navigacija</SheetTitle>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line-dark px-5 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label={`${SITE.name} — domov`}
            >
              <Image
                src="/images/emt-logo-white.webp"
                alt={SITE.name}
                width={800}
                height={183}
                className="h-[22px] w-auto"
              />
            </Link>
            <SheetClose
              aria-label="Zapri meni"
              className="flex size-10 items-center justify-center rounded-[10px] border border-white/20 text-white transition-colors duration-200 hover:bg-white/10"
            >
              <X aria-hidden="true" className="size-5" />
            </SheetClose>
          </div>

          <nav
            aria-label="Mobilna navigacija"
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-6"
          >
            <MenuGroup title="Storitve" href="/storitve" links={SERVICES_NAV} onNavigate={() => setOpen(false)} />
            <MenuGroup title="Trgovina" href={ROUTES.shop} links={SHOP_NAV} onNavigate={() => setOpen(false)} />

            <ul className="mt-8 grid gap-1 border-t border-line-dark pt-6">
              {[...FLAT_LINKS, { label: "Kontakt", href: ROUTES.contact }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 text-lg font-medium text-on-dark transition-colors duration-150 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-8 border-t border-line-dark pt-6">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-on-dark-2 uppercase">
                Pokličite nas
              </p>
              <ul className="mt-3 grid gap-2">
                {PHONES.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="nums inline-flex items-center gap-2.5 text-[1.0625rem] font-medium text-on-dark transition-colors duration-150 hover:text-white"
                    >
                      <Phone aria-hidden="true" className="size-4 text-on-dark-2" />
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="border-t border-line-dark p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <ActionLink
              href={ROUTES.booking}
              variant="brand"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Naroči servis
            </ActionLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MenuGroup({
  title,
  href,
  links,
  onNavigate,
}: {
  title: string;
  href: string;
  links: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <div className="mb-8">
      <Link
        href={href}
        onClick={onNavigate}
        className="text-[0.6875rem] font-medium tracking-[0.16em] text-on-dark-2 uppercase transition-colors duration-150 hover:text-white"
      >
        {title}
      </Link>
      <ul className="mt-3 grid gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block py-2 text-[1.0625rem] font-medium text-on-dark transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
