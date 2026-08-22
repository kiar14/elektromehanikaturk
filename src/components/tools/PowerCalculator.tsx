"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronRight, Droplets, Flame, House, Snowflake, type LucideIcon } from "lucide-react";

import { CalculatorInputForm } from "@/components/tools/CalculatorInputForm";
import { CalculatorResults } from "@/components/tools/CalculatorResults";
import { cn } from "@/lib/utils";
import {
  calculateAcPower,
  calculateHeatingPower,
  calculateWaterHeating,
  LIMITS,
  matchAcProducts,
  parsePositiveNumber,
  type CalculatorDraft,
  type CalculatorMode,
  type CalculatorResult,
} from "@/lib/power-calculator";

const MODES: {
  value: CalculatorMode;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "ac",
    label: "Klimatska naprava",
    description: "Hlajenje in ogrevanje",
    icon: Snowflake,
  },
  {
    value: "water",
    label: "Sanitarna topla voda",
    description: "Moč in velikost zalogovnika",
    icon: Droplets,
  },
  {
    value: "heating",
    label: "Ogrevanje prostorov",
    description: "S toplotno črpalko",
    icon: Flame,
  },
  {
    value: "combined",
    label: "Ogrevanje + sanitarna voda",
    description: "Celovit izračun sistema",
    icon: House,
  },
];

const INITIAL_DRAFT: CalculatorDraft = {
  acBasis: "area",
  acValue: "",
  people: "",
  heatingArea: "",
  insulation: "renovated",
  heatingSystem: "underfloor",
};

export function PowerCalculator() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CalculatorMode | null>(null);
  const [stage, setStage] = useState<"select" | "input" | "result">("select");
  const [draft, setDraft] = useState<CalculatorDraft>(INITIAL_DRAFT);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const selectedMode = useMemo(
    () => MODES.find((candidate) => candidate.value === mode),
    [mode],
  );

  function chooseMode(nextMode: CalculatorMode) {
    setMode(nextMode);
    setResult(null);
    setStage("input");
    focusCalculator();
  }

  function focusCalculator() {
    requestAnimationFrame(() => {
      calculatorRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }

  function showStage(nextStage: "select" | "input") {
    setStage(nextStage);
    focusCalculator();
  }

  function calculate(): string | null {
    if (!mode) return "Najprej izberite vrsto izračuna.";

    if (mode === "ac") {
      const value = parsePositiveNumber(draft.acValue);
      const maximum = draft.acBasis === "area" ? LIMITS.acArea : LIMITS.acVolume;
      if (value === null) return "Vnesite veljavno površino ali prostornino.";
      if (value <= 0) return "Vrednost mora biti večja od 0.";
      if (value > maximum) {
        return `Za vrednosti nad ${maximum} ${draft.acBasis === "area" ? "m²" : "m³"} priporočamo neposredno svetovanje.`;
      }
      const power = calculateAcPower(draft.acBasis, value);
      setResult({ mode, power, products: matchAcProducts(power) });
    }

    if (mode === "water") {
      const people = parsePositiveNumber(draft.people);
      if (people === null || !Number.isInteger(people)) {
        return "Vnesite celo število oseb.";
      }
      if (people <= 0) return "Število oseb mora biti večje od 0.";
      if (people > LIMITS.people) {
        return `Za več kot ${LIMITS.people} oseb priporočamo neposredno svetovanje.`;
      }
      setResult({ mode, ...calculateWaterHeating(people) });
    }

    if (mode === "heating" || mode === "combined") {
      const area = parsePositiveNumber(draft.heatingArea);
      if (area === null) return "Vnesite veljavno ogrevano površino.";
      if (area <= 0) return "Ogrevana površina mora biti večja od 0.";
      if (area > LIMITS.heatingArea) {
        return `Za objekte nad ${LIMITS.heatingArea} m² priporočamo neposredno svetovanje.`;
      }

      const heatingPower = calculateHeatingPower({
        area,
        insulation: draft.insulation,
        system: draft.heatingSystem,
      });

      if (mode === "heating") {
        setResult({ mode, power: heatingPower, system: draft.heatingSystem });
      } else {
        const people = parsePositiveNumber(draft.people);
        if (people === null || !Number.isInteger(people)) {
          return "Vnesite celo število oseb.";
        }
        if (people <= 0) return "Število oseb mora biti večje od 0.";
        if (people > LIMITS.people) {
          return `Za več kot ${LIMITS.people} oseb priporočamo neposredno svetovanje.`;
        }
        const water = calculateWaterHeating(people);
        setResult({
          mode,
          heatingPower,
          waterPower: water.power,
          waterVolume: water.volume,
          system: draft.heatingSystem,
        });
      }
    }

    setStage("result");
    focusCalculator();
    return null;
  }

  return (
    <div ref={calculatorRef} className="scroll-mt-28 rounded-[12px] border border-line bg-paper shadow-[0_24px_70px_-56px_rgba(18,21,26,0.45)]">
      {stage === "select" ? (
        <section aria-labelledby="calculator-mode-heading" className="p-5 sm:p-8 lg:p-10">
          <div className="max-w-[45rem]">
            <p className="eyebrow">ZAČNITE TUKAJ</p>
            <h2 id="calculator-mode-heading" className="mt-4 text-[1.75rem] sm:text-[2.15rem]">
              Kaj želite izračunati?
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3 sm:text-[1rem]">
              Izberite namen. Naslednji korak bo prikazal samo podatke, ki jih za to oceno potrebujemo.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-9">
            {MODES.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => chooseMode(item.value)}
                  className={cn(
                    "group flex min-h-32 items-start gap-4 rounded-[10px] border border-line-2 bg-base p-5 text-left",
                    "transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:-translate-y-0.5 hover:border-brand/55 hover:bg-brand-soft/40",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  )}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-line bg-paper text-brand">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[1rem] font-semibold text-ink sm:text-[1.0625rem]">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-ink-3">
                      {item.description}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="mt-1 ml-auto size-4 shrink-0 text-ink-4 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </button>
              );
            })}
          </div>
        </section>
      ) : stage === "input" && mode && selectedMode ? (
        <CalculatorInputForm
          mode={mode}
          modeLabel={selectedMode.label}
          draft={draft}
          onDraftChange={setDraft}
          onBack={() => showStage("select")}
          onCalculate={calculate}
        />
      ) : result && mode && selectedMode ? (
        <CalculatorResults
          result={result}
          draft={draft}
          modeLabel={selectedMode.label}
          onEdit={() => showStage("input")}
          onStartOver={() => showStage("select")}
        />
      ) : null}
    </div>
  );
}
