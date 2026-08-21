import {
  BadgeCheck,
  MapPin,
  PanelsTopLeft,
  ReceiptText,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/actions";
import { BrandRail } from "@/components/sections/BrandRail";
import { REASONS, type Reason } from "@/lib/content";
import { ROUTES } from "@/lib/navigation";
import { YEARS_EXPERIENCE } from "@/lib/site";

/** Icon names live in the content file; components are resolved here so
 *  the data layer stays free of JSX imports. */
const ICONS: Record<Reason["icon"], LucideIcon> = {
  ShieldCheck,
  Wrench,
  ReceiptText,
  PanelsTopLeft,
  MapPin,
};

/**
 * Consolidates capabilities, trust signals and the brand marquee into
 * one section, so the page argues its case once and moves on.
 *
 * The five reasons run three-up then two centred beneath, which needs a
 * six-column grid: each card spans two columns, and the last row starts
 * at column two so the pair sits centred at the same width as the three
 * above rather than being stretched to fill.
 */
export function WhyUs() {
  return (
    <section
      id="zakaj-emt"
      className="scroll-mt-24 bg-base py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <header className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow eyebrow-center">Zakaj mi</p>
          <h2 className="mt-5 text-[2.5rem] leading-[1.03] sm:text-[3rem] lg:text-[3.75rem]">
            Zakaj Elektromehanika Turk
          </h2>
          <p className="mx-auto mt-6 max-w-[44rem] text-[1.0625rem] leading-relaxed text-ink-3 sm:text-[1.125rem]">
            Že več kot 20 let popravljamo, montiramo in vzdržujemo klimatske
            naprave, toplotne črpalke, belo tehniko in hladilno opremo.
          </p>
          <div className="mt-6 flex justify-center">
            <ArrowLink href={ROUTES.about}>Več o nas</ArrowLink>
          </div>
        </header>

        <TrustRow />

        {/* Reasons — 3 up, then 2 centred */}
        <ul className="mx-auto mt-12 grid max-w-[77.5rem] gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-6 lg:gap-6">
          {REASONS.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </ul>

        <BrandRail />
      </div>
    </section>
  );
}

/**
 * Three signals of the same weight. Only the first is a figure — the
 * other two are statements, so they are set as labels rather than dressed
 * up as statistics. Nothing here is a number that was not supplied.
 */
function TrustRow() {
  return (
    <div
      className="mx-auto mt-12 grid max-w-[54rem] divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-14"
      data-reveal
    >
      <div className="px-6 py-5 text-center">
        <p className="nums text-[2rem] leading-none font-semibold tracking-[-0.03em] text-ink">
          {YEARS_EXPERIENCE}
        </p>
        <p className="mt-2 text-[0.875rem] text-ink-3">let izkušenj</p>
      </div>

      <TrustItem
        icon={ShieldCheck}
        label="Uradni servis"
        caption="za vodilne proizvajalce"
      />
      <TrustItem
        icon={ReceiptText}
        label="Javni cenik"
        caption="osnovnih servisnih storitev"
      />
    </div>
  );
}

function TrustItem({
  icon: Icon,
  label,
  caption,
}: {
  icon: LucideIcon;
  label: string;
  caption: string;
}) {
  return (
    <div className="px-6 py-5 text-center">
      <p className="flex items-center justify-center gap-2 text-[1.0625rem] leading-none font-semibold text-ink">
        <Icon aria-hidden="true" className="size-[1.125rem] text-brand" strokeWidth={1.9} />
        {label}
      </p>
      <p className="mt-2 text-[0.875rem] text-ink-3">{caption}</p>
    </div>
  );
}

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const Icon = ICONS[reason.icon] ?? BadgeCheck;

  return (
    <li
      data-reveal
      className={cn(
        "lg:col-span-2",
        // Fourth and fifth cards start one column in, centring the pair
        // under the three above without widening either card.
        index === 3 && "lg:col-start-2",
        index === 4 && "lg:col-start-4",
      )}
    >
      {/* Centred as a composition, not just `text-align`: the column is
          centre-aligned so the icon, heading and copy all share one axis,
          and the copy has its own measure so it never runs card-wide. */}
      <div
        className={cn(
          "flex h-full min-h-[15.5rem] flex-col items-center px-7 py-10 text-center sm:px-8 sm:py-11",
          "rounded-[12px] border border-line bg-paper",
          "shadow-[0_1px_2px_rgba(18,21,26,0.04)]",
          "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_12px_28px_-20px_rgba(18,21,26,0.35)]",
        )}
      >
        <span
          aria-hidden="true"
          className="flex size-13 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-soft"
        >
          <Icon className="size-[1.375rem] text-brand" strokeWidth={1.75} />
        </span>

        <h3 className="mt-7 text-[1.25rem] leading-snug font-semibold text-balance text-ink">
          {reason.title}
        </h3>
        <p className="mx-auto mt-3 max-w-[19rem] text-[0.9375rem] leading-relaxed text-ink-3 sm:text-[1rem]">
          {reason.body}
        </p>

        {reason.link ? (
          <div className="mt-5">
            <ArrowLink href={reason.link.href} tone="brand">
              {reason.link.label}
            </ArrowLink>
          </div>
        ) : null}
      </div>
    </li>
  );
}
