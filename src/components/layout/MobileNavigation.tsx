"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ActionLink } from "@/components/ui/actions";
import {
  PRIMARY_NAV,
  ROUTES,
  SERVICES_NAV,
  SERVICES_SECTION_HREF,
  SHOP_NAV,
} from "@/lib/navigation";
import { PRIMARY_PHONE, SITE } from "@/lib/site";
import { pauseScroll, resumeScroll } from "@/lib/scroll";

const FLAT_LINKS = PRIMARY_NAV.filter((item) => !item.children);
// Svetovanje na daljavo used to be filtered out here because it also sat in
// the top-level bar. That duplicate is gone, so the Storitve group is the
// only place it appears and has to list it.
const MOBILE_SERVICES = SERVICES_NAV;

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
        className="flex size-10 items-center justify-center rounded-[10px] border border-white/20 text-white transition-colors duration-200 hover:bg-white/10 xl:hidden"
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
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-5"
          >
            <MenuGroup
              title="Storitve"
              href={SERVICES_SECTION_HREF}
              links={MOBILE_SERVICES}
              onNavigate={() => setOpen(false)}
            />
            <MenuGroup
              title="Trgovina"
              href={ROUTES.shop}
              links={SHOP_NAV}
              onNavigate={() => setOpen(false)}
            />

            <ul className="mt-5 grid gap-0.5 border-t border-line-dark pt-5">
              {FLAT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-[1.0625rem] font-medium text-on-dark transition-colors duration-150 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

          </nav>

          <div className="grid gap-3 border-t border-line-dark px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <a
              href={`tel:${PRIMARY_PHONE.tel}`}
              className="nums inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/20 text-[1rem] font-medium text-on-dark transition-colors duration-200 hover:border-white/35 hover:bg-white/10 hover:text-white"
            >
              <Phone aria-hidden="true" className="size-4 text-on-dark-2" />
              {PRIMARY_PHONE.label}
            </a>
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
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href={href}
          onClick={onNavigate}
          className="text-lg font-semibold text-on-dark transition-colors hover:text-white"
        >
          {title}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-label={`${expanded ? "Skrij" : "Prikaži"} kategorije: ${title}`}
          aria-expanded={expanded}
          className="flex size-9 items-center justify-center rounded-[10px] border border-white/15 text-on-dark transition-colors hover:bg-white/10"
        >
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {expanded ? (
        <ul className="mt-3 grid gap-1 border-l border-line-dark pl-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="block py-2 text-[0.9375rem] font-medium text-on-dark-2 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
