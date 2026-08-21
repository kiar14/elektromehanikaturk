"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRIMARY_NAV, ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE } from "@/lib/site";
import { onScroll } from "@/lib/scroll";
import { ActionLink } from "@/components/ui/actions";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

/** Height of the bar at rest; the hero is "gone" once it passes this. */
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

  /* Glass over the hero, solid dark once the hero has scrolled away.
     A sentinel at the foot of the hero marks the crossing point.

     Deliberately not an IntersectionObserver: the sentinel is one pixel
     tall, so a jump — an in-page anchor, restored scroll, find-in-page —
     can take it from below the viewport to above it within a single
     frame. The intersection state never changes, no callback fires, and
     the bar would stay glass over light content. Comparing a cached
     offset against scrollY is both cheaper and correct in that case. */
  useEffect(() => {
    const sentinel = document.querySelector("[data-nav-sentinel]");
    if (!sentinel) {
      // Pages without a hero (everything except the homepage) get the
      // solid bar. Deferred a frame so it is not a cascading render.
      const frame = requestAnimationFrame(() => setSolid(true));
      return () => cancelAnimationFrame(frame);
    }

    // Measured once rather than per scroll event, so the handler never
    // forces layout; re-measured only when the page can have reflowed.
    let heroFoot = 0;
    const update = (y = window.scrollY) => setSolid(heroFoot - y < NAV_OFFSET);
    const remeasure = () => {
      heroFoot = sentinel.getBoundingClientRect().top + window.scrollY;
      update();
    };

    const frame = requestAnimationFrame(remeasure);

    // Lenis emits no native scroll events, so subscribe to it; the native
    // listener covers the case where Lenis is not running at all (reduced
    // motion), and is simply silent when it is.
    const unsubscribe = onScroll(update);
    const onNativeScroll = () => update();
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    // Late-loading images and the font swap both move the hero's foot.
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

  /* Escape closes; clicking outside the bar closes. */
  useEffect(() => {
    if (!openMenu) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(
        `[data-menu-trigger="${openMenu}"]`,
      );
      trigger?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
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
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500",
        "ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid ? "px-0 pt-0" : "px-3 pt-3 sm:px-5 sm:pt-4",
      )}
      onMouseLeave={scheduleClose}
    >
      <div
        className={cn(
          // Three tracks rather than `justify-between`: the brand and the
          // actions differ in width, so space-between would pull the links
          // off-centre. Equal outer tracks keep the middle one centred on
          // the bar regardless of what sits either side.
          //
          // The columns are assigned explicitly because the nav is
          // `display:none` below `lg`, which removes it from the grid
          // altogether — auto-placement would then drop the actions into
          // the middle track and strand the hamburger mid-bar.
          "mx-auto grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4",
          "transition-[background-color,border-color,border-radius,box-shadow,max-width,height]",
          "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "px-4 sm:px-5",
          solid
            ? "h-[60px] max-w-none rounded-none border-b border-line-dark bg-ink shadow-[0_8px_28px_-18px_rgba(0,0,0,0.7)] lg:px-10"
            : [
                "h-[68px] max-w-[1440px] rounded-full border border-white/15",
                // Scrim beneath the blur keeps the labels legible over any
                // part of the photograph.
                "bg-ink/45 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl lg:px-6",
              ],
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="col-start-1 flex shrink-0 items-center justify-self-start rounded-sm"
          aria-label="Elektromehanika Turk — domov"
        >
          <Image
            src="/images/emt-logo-white.webp"
            alt="Elektromehanika Turk"
            width={800}
            height={183}
            priority
            className={cn(
              "w-auto transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              // The asset is trimmed, so these are the height of the mark
              // itself rather than of a half-empty box. 34px inside the
              // 68px glass bar and 28px inside the 60px solid one both
              // leave ~16px of clearance.
              solid ? "h-[22px] lg:h-[28px]" : "h-[26px] lg:h-[34px]",
            )}
          />
        </Link>

        {/* Primary navigation */}
        <nav
          aria-label="Glavna navigacija"
          className="col-start-2 hidden items-center gap-1 justify-self-center lg:flex"
        >
          {PRIMARY_NAV.map((item) =>
            item.children ? (
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
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[0.9375rem] font-medium",
                    "text-on-dark/85 transition-colors duration-200 hover:text-white",
                    openMenu === item.label && "text-white",
                  )}
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
                  {openMenu === item.label && (
                    <motion.div
                      {...panelMotion}
                      id={`menu-${slug(item.label)}`}
                      className={cn(
                        "absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2",
                        "rounded-[12px] border border-line bg-paper p-2",
                        "shadow-[0_24px_60px_-28px_rgba(18,21,26,0.45)]",
                        item.layout === "mega" ? "w-[41rem]" : "w-[17rem]",
                      )}
                    >
                      {item.layout === "mega" ? (
                        <>
                          <ul className="grid grid-cols-2 gap-0.5">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group/item block rounded-[8px] px-3.5 py-3 transition-colors duration-150 hover:bg-mist"
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
                          <div className="mt-2 flex items-center justify-between gap-4 rounded-[8px] bg-brand-soft px-4 py-3">
                            <p className="text-[0.8125rem] text-ink-2">
                              Ne veste, kaj potrebujete?
                            </p>
                            <a
                              href={`tel:${PRIMARY_PHONE.tel}`}
                              className="text-[0.8125rem] font-semibold text-brand hover:text-brand-2"
                            >
                              Pokličite {PRIMARY_PHONE.label}
                            </a>
                          </div>
                        </>
                      ) : (
                        <ul className="grid gap-0.5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-[8px] px-3.5 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors duration-150 hover:bg-mist"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={scheduleClose}
                className="rounded-md px-3.5 py-2 text-[0.9375rem] font-medium text-on-dark/85 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Conversion actions */}
        <div className="col-start-3 flex shrink-0 items-center gap-2 justify-self-end sm:gap-3">
          <a
            href={`tel:${PRIMARY_PHONE.tel}`}
            className="hidden items-center gap-2 rounded-md px-2 py-2 text-[0.9375rem] font-medium text-on-dark/85 transition-colors duration-200 hover:text-white xl:flex"
          >
            <Phone aria-hidden="true" className="size-4" />
            <span className="nums">{PRIMARY_PHONE.label}</span>
          </a>
          <ActionLink
            href={ROUTES.booking}
            variant="brand"
            className="hidden h-10 px-5 text-[0.9375rem] sm:inline-flex"
          >
            Naroči servis
          </ActionLink>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z]+/g, "-");
}
