import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   EMT action styles. Deliberately hand-built rather than the stock
   shadcn Button so the site does not read as a registry starter.
   ------------------------------------------------------------------ */

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

const variants = {
  /** Primary conversion action. */
  brand: "bg-brand text-white hover:bg-brand-2",
  /** Secondary action on a light surface. */
  outline:
    "border border-line-2 bg-paper text-ink hover:border-ink-3 hover:bg-mist",
  /** Secondary action over photography or a dark band. */
  glass:
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40",
  /** Secondary action on the dark ink band. */
  onInk: "border border-line-dark bg-transparent text-on-dark hover:bg-white/10",
} as const;

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
} as const;

type ActionVariant = keyof typeof variants;
type ActionSize = keyof typeof sizes;

export function actionClass(
  variant: ActionVariant = "brand",
  size: ActionSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ActionLink({
  variant = "brand",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ActionVariant;
  size?: ActionSize;
}) {
  return (
    <Link className={actionClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function ActionButton({
  variant = "brand",
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"button"> & {
  variant?: ActionVariant;
  size?: ActionSize;
}) {
  return (
    <button className={actionClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

/**
 * Text link with an arrow that advances on hover. The arrow is
 * decorative — the label carries the meaning.
 */
export function ArrowLink({
  href,
  children,
  className,
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "brand" | "onDark";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-2 text-[0.9375rem] font-medium",
        tone === "ink" && "text-ink hover:text-brand",
        tone === "brand" && "text-brand hover:text-brand-2",
        tone === "onDark" && "text-on-dark hover:text-white",
        "transition-colors duration-200",
        className,
      )}
    >
      <span className="underline decoration-current/25 underline-offset-[6px] transition-[text-decoration-color] duration-200 group-hover/arrow:decoration-current/70">
        {children}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/arrow:translate-x-1"
      />
    </Link>
  );
}
