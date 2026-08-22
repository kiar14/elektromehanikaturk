"use client";

import { useId, type ReactNode } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export type Tone = "light" | "dark";

type ControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

/**
 * Label above the control, validation message directly beneath it, and
 * the aria wiring that connects the three. Placeholders are never used
 * as the only label.
 */
export function Field({
  label,
  error,
  tone = "light",
  hint,
  className,
  children,
}: {
  label: string;
  error?: string;
  tone?: Tone;
  hint?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-napaka`;
  const hintId = `${id}-namig`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "text-[0.8125rem] font-medium",
          tone === "dark" ? "text-on-dark-2" : "text-ink-2",
        )}
      >
        {label}
      </Label>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {hint ? (
        <p
          id={hintId}
          className={cn(
            "text-[0.8125rem]",
            tone === "dark" ? "text-on-dark-2" : "text-ink-3",
          )}
        >
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className={cn(
            "text-[0.8125rem]",
            tone === "dark" ? "text-danger-on-dark" : "text-danger",
          )}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared control styling. Keeps 16px on mobile so iOS never zooms in. */
export function controlClass(tone: Tone, className?: string) {
  return cn(
    "w-full rounded-[8px] border px-4 text-[1rem] transition-colors duration-200",
    // 16px on mobile so iOS never zooms the field on focus. `md:` is
    // repeated to outrank the primitive's own `md:text-sm`.
    "focus-visible:ring-0 sm:text-[0.9375rem] md:text-[0.9375rem]",
    tone === "dark"
      ? [
          "border-line-dark bg-white/[0.06] text-on-dark placeholder:text-on-dark-2/70",
          "hover:border-white/25 focus-visible:border-white/40",
          "aria-invalid:border-danger-on-dark",
        ]
      : [
          "border-line-2 bg-paper text-ink placeholder:text-ink-4",
          "hover:border-ink-4/60 focus-visible:border-brand",
          "aria-invalid:border-danger",
        ],
    className,
  );
}

/**
 * Device category picker. Radio semantics under the hood, so it is
 * keyboard and screen-reader navigable like any other radio group.
 */
export function ChipGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  tone = "light",
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  tone?: Tone;
}) {
  const id = useId();
  const errorId = `${id}-napaka`;

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      aria-invalid={Boolean(error)}
    >
      <legend
        className={cn(
          "mb-2 text-[0.8125rem] font-medium",
          tone === "dark" ? "text-on-dark-2" : "text-ink-2",
        )}
      >
        {legend}
      </legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex h-10 items-center rounded-[8px] border px-3.5 text-[0.875rem] font-medium",
                "transition-colors duration-200",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                tone === "dark"
                  ? [
                      "border-line-dark bg-white/[0.06] text-on-dark hover:border-white/30",
                      "peer-checked:border-white peer-checked:bg-white peer-checked:text-ink",
                      "peer-focus-visible:outline-white",
                    ]
                  : [
                      "border-line-2 bg-paper text-ink-2 hover:border-ink-4/60",
                      "peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white",
                      "peer-focus-visible:outline-brand",
                    ],
              )}
            >
              {option}
            </span>
          </label>
        ))}
      </div>

      {error ? (
        <p
          id={errorId}
          className={cn(
            "mt-2 text-[0.8125rem]",
            tone === "dark" ? "text-danger-on-dark" : "text-danger",
          )}
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/**
 * Announced to assistive tech on submit. Rendered in place of the form
 * rather than as a browser alert, and never reloads the page.
 */
export function SuccessPanel({
  title,
  body,
  tone = "light",
  onReset,
  resetLabel = "Pošlji novo povpraševanje",
}: {
  title: string;
  body: string;
  tone?: Tone;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-[12px] border p-6 sm:p-7",
        tone === "dark"
          ? "border-line-dark bg-white/[0.06]"
          : "border-line-2 bg-paper",
      )}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white"
        >
          <Check className="size-[1.15rem]" />
        </span>
        <div>
          <p
            className={cn(
              "text-[1.125rem] font-semibold",
              tone === "dark" ? "text-on-dark" : "text-ink",
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "mt-2 text-[0.9375rem] leading-relaxed",
              tone === "dark" ? "text-on-dark-2" : "text-ink-3",
            )}
          >
            {body}
          </p>
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "mt-4 text-[0.9375rem] font-medium underline underline-offset-[6px] transition-colors duration-200",
              tone === "dark"
                ? "text-on-dark hover:text-white"
                : "text-ink hover:text-brand",
            )}
          >
            {resetLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
