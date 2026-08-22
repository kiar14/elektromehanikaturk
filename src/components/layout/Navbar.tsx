"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRIMARY_NAV, ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE } from "@/lib/site";
import { onScroll } from "@/lib/scroll";
import { SHOP_MENU_GROUPS } from "@/lib/products";
import { ActionLink } from "@/components/ui/actions";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ProductSearch } from "@/components/commerce/ProductSearch";
import { CartButton } from "@/components/commerce/CartButton";

const NAV_OFFSET = 68;

const panelMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.16, ease: [0.32, 0.72, 0, 1] as const },
};

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sentinel = document.querySelector("[data-nav-sentinel]");
    if (!sentinel) {
      const frame = requestAnimationFrame(() => setSolid(true));
      return () => cancelAnimationFrame(frame);
    }

    let heroFoot = 0;
    const update = (y = window.scrollY) => setSolid(heroFoot - y < NAV_OFFSET);
    const remeasure = () => {
      heroFoot = sentinel.getBoundingClientRect().top + window.scrollY;
      update();
    };

    const frame = requestAnimationFrame(remeasure);
    const unsubscribe = onScroll(update);
    const onNativeScroll = () => update();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      window.removeEventListener("scroll", onNativeScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, [cancelClose]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      navRef.current
        ?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${openMenu}"]`)
        ?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid ? "px-0 pt-0" : "px-3 pt-3 sm:px-5 sm:pt-4",
      )}
      onMouseLeave={scheduleClose}
    >
      <div
        className={cn(
          "mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-5 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
          "transition-[background-color,border-color,border-radius,box-shadow,max-width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid
            ? "h-[60px] max-w-none rounded-none border-b border-line-dark bg-ink shadow-[0_8px_28px_-18px_rgba(0,0,0,0.7)] xl:px-8"
            : "h-[68px] max-w-[1440px] rounded-full border border-white/15 bg-ink/45 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl xl:px-6",
        )}
      >
        <Link
          href="/"
          className="col-start-1 flex shrink-0 items-center justify-self-start rounded-sm"
          aria-label="Elektromehanika Turk - domov"
        >
          <Image
            src="/images/emt-logo-white.webp"
            alt="Elektromehanika Turk"
            width={800}
            height={183}
            priority
            className={cn(
              "w-auto transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              solid ? "h-[22px] xl:h-[27px]" : "h-[26px] xl:h-[31px]",
            )}
          />
        </Link>

        <nav
          aria-label="Glavna navigacija"
          className="col-start-2 hidden items-center gap-0.5 justify-self-center xl:flex"
        >
          {PRIMARY_NAV.map((item) => {
            if (item.label === "Trgovina") {
              return (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="rounded-l-md py-2 pr-1 pl-3 text-[0.875rem] font-medium text-on-dark/85 transition-colors hover:text-white"
                  >
                    Trgovina
                  </Link>
                  <button
                    type="button"
                    data-menu-trigger={item.label}
                    aria-label="Odpri meni trgovine"
                    aria-expanded={openMenu === item.label}
                    aria-controls="menu-trgovina"
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                    className="flex size-8 items-center justify-center rounded-r-md text-on-dark/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        openMenu === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openMenu === item.label ? (
                      <ShopMegaMenu onNavigate={() => setOpenMenu(null)} />
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                >
                  <button
                    type="button"
                    data-menu-trigger={item.label}
                    aria-expanded={openMenu === item.label}
                    aria-controls={`menu-${slug(item.label)}`}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                    className="flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.8125rem] font-medium whitespace-nowrap text-on-dark/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        openMenu === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openMenu === item.label ? (
                      <motion.div
                        {...panelMotion}
                        id={`menu-${slug(item.label)}`}
                        className="absolute top-[calc(100%+0.75rem)] left-1/2 w-[41rem] -translate-x-1/2 rounded-[12px] border border-line bg-paper p-2 shadow-[0_24px_60px_-28px_rgba(18,21,26,0.45)]"
                      >
                        <ul className="grid grid-cols-2 gap-0.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-[8px] px-3.5 py-3 transition-colors hover:bg-mist"
                              >
                                <span className="block text-[0.9375rem] font-medium text-ink">
                                  {child.label}
                                </span>
                                {child.description ? (
                                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-3">
                                    {child.description}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={scheduleClose}
                className="rounded-md px-2.5 py-2 text-[0.8125rem] font-medium whitespace-nowrap text-on-dark/85 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="col-start-2 flex shrink-0 items-center gap-0.5 justify-self-end xl:col-start-3">
          {/* The centre column is the nav at its natural width and the two
              outer columns split what is left. Below ~1460px the utility
              side needs more than its half and starts crowding the last nav
              item, so the phone drops out first — it is repeated in the
              footer, the mobile bar and every page CTA. */}
          <a
            href={`tel:${PRIMARY_PHONE.tel}`}
            className="hidden items-center gap-2 rounded-md px-2 py-2 text-[0.875rem] font-medium whitespace-nowrap text-on-dark/85 transition-colors hover:text-white min-[1460px]:flex"
          >
            <Phone aria-hidden="true" className="size-4" />
            <span className="nums">{PRIMARY_PHONE.label}</span>
          </a>
          <ProductSearch />
          <CartButton />
          <ActionLink
            href={ROUTES.booking}
            variant="brand"
            className="ml-1 hidden h-10 px-3 text-[0.8125rem] xl:inline-flex 2xl:px-4 2xl:text-[0.875rem]"
          >
            Naroči servis
          </ActionLink>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

function ShopMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      {...panelMotion}
      id="menu-trgovina"
      className="absolute top-[calc(100%+0.75rem)] left-1/2 w-[50rem] -translate-x-1/2 rounded-[12px] border border-line bg-paper p-5 shadow-[0_24px_60px_-28px_rgba(18,21,26,0.45)]"
    >
      <div className="grid grid-cols-3 gap-6">
        {SHOP_MENU_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-ink">{group.title}</p>
            <ul className="mt-2 grid gap-0.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={shopFilterHref(link)}
                    onClick={onNavigate}
                    className="block rounded-[8px] px-2 py-2 text-sm text-ink-3 transition-colors hover:bg-mist hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <Link
          href="/trgovina"
          onClick={onNavigate}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
        >
          Vsi izdelki
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        <Link
          href="/trgovina?akcija=1#vsi-izdelki"
          onClick={onNavigate}
          className="text-sm font-semibold text-brand transition-colors hover:text-brand-2"
        >
          Izdelki v akciji
        </Link>
      </div>
    </motion.div>
  );
}

function shopFilterHref(link: {
  category?: string;
  brand?: string;
  subcategory?: string;
}) {
  const params = new URLSearchParams();
  if (link.category) params.set("kategorija", link.category);
  if (link.brand) params.set("znamka", link.brand);
  if (link.subcategory) params.set("podkategorija", link.subcategory);
  return `/trgovina?${params.toString()}#vsi-izdelki`;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z]+/g, "-");
}
