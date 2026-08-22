import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  actions,
  image,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  className?: string;
}) {
  return (
    <header
      className={cn(
        "border-b border-line bg-base pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24",
        className,
      )}
    >
      <div className="shell page-hero-enter">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}

        <div
          className={cn(
            "mt-8",
            image
              ? "grid items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(28rem,1.12fr)] lg:gap-14 xl:gap-20"
              : "max-w-[52rem]",
          )}
        >
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1
              className={cn(
                "text-[2.625rem] leading-[1.02] sm:text-[3.5rem] lg:text-[4rem]",
                eyebrow && "mt-5",
              )}
            >
              {title}
            </h1>
            <p className="mt-6 max-w-[47rem] text-[1.0625rem] leading-relaxed text-ink-3 sm:text-[1.125rem]">
              {lead}
            </p>
            {actions ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
            ) : null}
          </div>

          {image ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-mist shadow-[0_22px_60px_-42px_rgba(18,21,26,0.55)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                quality={88}
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.objectPosition }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Drobtinice">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-4">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-brand"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-ink-2" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
