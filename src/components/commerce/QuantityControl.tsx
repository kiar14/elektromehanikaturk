"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export function QuantityControl({
  value,
  onChange,
  compact = false,
}: {
  value: number;
  onChange: (value: number) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-grid grid-cols-[auto_2.5rem_auto] items-center rounded-[10px] border border-line-2 bg-paper",
        compact ? "h-9" : "h-11",
      )}
      aria-label="Količina"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label="Zmanjšaj količino"
        className="flex h-full items-center justify-center px-2.5 text-ink-3 transition-colors hover:text-brand"
      >
        <Minus aria-hidden="true" className="size-3.5" />
      </button>
      <span className="nums text-center text-sm font-semibold text-ink" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Povečaj količino"
        className="flex h-full items-center justify-center px-2.5 text-ink-3 transition-colors hover:text-brand"
      >
        <Plus aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  );
}
