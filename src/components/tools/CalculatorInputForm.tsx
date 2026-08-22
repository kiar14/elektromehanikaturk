"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowLeft, Calculator } from "lucide-react";

import { ActionButton } from "@/components/ui/actions";
import { cn } from "@/lib/utils";
import {
  type CalculatorDraft,
  type CalculatorMode,
  type HeatingSystem,
  type InsulationLevel,
} from "@/lib/power-calculator";

const MODE_COPY: Record<CalculatorMode, string> = {
  ac: "Izračunajte okvirno potrebno moč glede na površino ali volumen prostora.",
  water:
    "Izračunajte okvirno potrebno moč in prostornino zalogovnika glede na število uporabnikov.",
  heating:
    "Izračunajte okvirno potrebno moč toplotne črpalke glede na velikost in izolacijo objekta.",
  combined:
    "Združite podatke za ogrevanje prostorov in pripravo sanitarne tople vode.",
};

export function CalculatorInputForm({
  mode,
  modeLabel,
  draft,
  onDraftChange,
  onBack,
  onCalculate,
}: {
  mode: CalculatorMode;
  modeLabel: string;
  draft: CalculatorDraft;
  onDraftChange: (draft: CalculatorDraft) => void;
  onBack: () => void;
  onCalculate: () => string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  function update<K extends keyof CalculatorDraft>(key: K, value: CalculatorDraft[K]) {
    onDraftChange({ ...draft, [key]: value });
    setError(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(onCalculate());
  }

  return (
    <section aria-labelledby="calculator-input-heading" className="p-5 sm:p-8 lg:p-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-3 transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Spremeni vrsto izračuna
      </button>

      <div className="mt-7 border-b border-line pb-6 sm:flex sm:items-end sm:justify-between sm:gap-8">
        <div>
          <p className="eyebrow">1. PODATKI</p>
          <h2 id="calculator-input-heading" className="mt-3 text-[1.75rem] sm:text-[2.15rem]">
            {modeLabel}
          </h2>
          <p className="mt-2 max-w-[40rem] text-[0.875rem] leading-relaxed text-ink-3">
            {MODE_COPY[mode]}
          </p>
        </div>
        <p className="mt-4 shrink-0 text-[0.8125rem] font-medium tracking-[0.04em] text-ink-4 sm:mt-0">
          <span className="text-brand">1. Podatki</span>
          <span aria-hidden="true" className="mx-2 text-line-2">/</span>
          2. Rezultat
        </p>
      </div>

      <form onSubmit={submit} noValidate className="mt-7 max-w-[46rem]">
        {mode === "ac" ? (
          <>
            <RadioGroup
              legend="Način izračuna"
              name="ac-basis"
              value={draft.acBasis}
              options={[
                { value: "area", label: "Površina (m²)" },
                { value: "volume", label: "Volumen (m³)" },
              ]}
              onChange={(value) => update("acBasis", value as "area" | "volume")}
            />
            <NumberField
              label={draft.acBasis === "area" ? "Površina prostora" : "Volumen prostora"}
              name="ac-value"
              value={draft.acValue}
              unit={draft.acBasis === "area" ? "m²" : "m³"}
              placeholder={draft.acBasis === "area" ? "npr. 40" : "npr. 100"}
              error={error ?? undefined}
              errorId={errorId}
              onChange={(value) => update("acValue", value)}
            />
          </>
        ) : null}

        {mode === "water" ? (
          <NumberField
            label="Število članov gospodinjstva"
            name="people"
            value={draft.people}
            unit="oseb"
            placeholder="npr. 4"
            step="1"
            error={error ?? undefined}
            errorId={errorId}
            onChange={(value) => update("people", value)}
          />
        ) : null}

        {mode === "heating" || mode === "combined" ? (
          <div className="grid gap-7">
            <NumberField
              label="Ogrevana površina objekta"
              name="heating-area"
              value={draft.heatingArea}
              unit="m²"
              placeholder="npr. 140"
              error={error?.toLowerCase().includes("površin") || error?.includes("m²") ? error : undefined}
              errorId={errorId}
              onChange={(value) => update("heatingArea", value)}
            />
            <RadioGroup
              legend="Toplotna izolacija objekta"
              name="insulation"
              value={draft.insulation}
              options={[
                { value: "new", label: "Novogradnja", description: "Zgrajena po 2010, dobra izolacija" },
                { value: "renovated", label: "Prenovljena", description: "Izolacija fasade, nova okna" },
                { value: "old", label: "Stara hiša", description: "Slaba ali brez izolacije" },
              ]}
              onChange={(value) => update("insulation", value as InsulationLevel)}
            />
            <RadioGroup
              legend="Način ogrevanja"
              name="heating-system"
              value={draft.heatingSystem}
              options={[
                { value: "underfloor", label: "Talno gretje", description: "Nižja temperatura dovedene vode" },
                { value: "radiators", label: "Radiatorji", description: "Višja temperatura dovedene vode" },
              ]}
              hint="Način ogrevanja ne spremeni ocenjene moči, vpliva pa na strokovno priporočilo naprave."
              onChange={(value) => update("heatingSystem", value as HeatingSystem)}
            />
            {mode === "combined" ? (
              <NumberField
                label="Število članov gospodinjstva"
                name="combined-people"
                value={draft.people}
                unit="oseb"
                placeholder="npr. 4"
                step="1"
                error={error?.toLowerCase().includes("oseb") ? error : undefined}
                errorId={`${errorId}-people`}
                onChange={(value) => update("people", value)}
              />
            ) : null}
          </div>
        ) : null}

        {error && mode !== "ac" && mode !== "water" && !error.toLowerCase().includes("površin") && !error.includes("m²") && !error.toLowerCase().includes("oseb") ? (
          <p id={errorId} role="alert" className="mt-4 text-[0.8125rem] leading-relaxed text-danger">
            {error}
          </p>
        ) : null}

        <div className="mt-8 border-t border-line pt-6">
          <ActionButton type="submit" size="lg">
            <Calculator aria-hidden="true" className="size-4" />
            Izračunaj
          </ActionButton>
        </div>
      </form>
    </section>
  );
}

function NumberField({
  label,
  name,
  value,
  unit,
  placeholder,
  step = "any",
  error,
  errorId,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  unit: string;
  placeholder: string;
  step?: string;
  error?: string;
  errorId: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] font-medium text-ink">
        {label}
      </label>
      <div className="mt-2.5 flex items-center gap-3">
        <input
          id={id}
          name={name}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className="nums h-12 min-w-0 flex-1 rounded-[8px] border border-line-2 bg-paper px-4 text-[1rem] text-ink transition-colors duration-200 placeholder:text-ink-4 hover:border-ink-3 focus:border-brand focus:outline-none aria-invalid:border-danger"
        />
        <span className="w-10 shrink-0 text-[0.875rem] text-ink-3">{unit}</span>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2.5 text-[0.8125rem] leading-relaxed text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RadioGroup({
  legend,
  name,
  value,
  options,
  onChange,
  hint,
}: {
  legend: string;
  name: string;
  value: string;
  options: readonly { value: string; label: string; description?: string }[];
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <fieldset className="mb-7">
      <legend className="text-[0.9375rem] font-medium text-ink">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-[8px] border px-4 py-3 text-[0.9375rem]",
                "transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                selected
                  ? "border-brand bg-brand-soft font-medium text-ink"
                  : "border-line-2 bg-paper text-ink-2 hover:border-ink-3",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border",
                  selected ? "border-brand" : "border-line-2",
                )}
              >
                <span className={cn("size-2 rounded-full", selected ? "bg-brand" : "bg-transparent")} />
              </span>
              <span>
                <span className="block">{option.label}</span>
                {option.description ? (
                  <span className="mt-0.5 block text-[0.75rem] leading-relaxed font-normal text-ink-3">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      {hint ? <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-4">{hint}</p> : null}
    </fieldset>
  );
}
