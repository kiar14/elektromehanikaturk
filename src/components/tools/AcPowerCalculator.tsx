"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ActionLink } from "@/components/ui/actions";
import { ROUTES } from "@/lib/navigation";
import {
  PRODUCT_BY_ID,
  formatPrice,
  productHref,
  type StoreProduct,
} from "@/lib/products";
import { PRIMARY_PHONE } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Simplified sizing model.

   kW = area × insulation factor. It is deliberately crude and the page
   says so: orientation, glazing and use pattern all move the answer and
   none of them are asked for here. The output is a starting point for a
   conversation, not a specification.
   ------------------------------------------------------------------ */

const INSULATION = [
  { value: "novogradnja", label: "Novogradnja", factor: 0.08 },
  { value: "prenovljena", label: "Prenovljena", factor: 0.1 },
  { value: "starejsa", label: "Starejša hiša", factor: 0.12 },
] as const;

const USAGE = [
  { value: "hlajenje", label: "Samo hlajenje" },
  { value: "hlajenje-ogrevanje", label: "Hlajenje in ogrevanje" },
] as const;

type InsulationValue = (typeof INSULATION)[number]["value"];
type UsageValue = (typeof USAGE)[number]["value"];

/** Above this the simplified formula stops describing a single split unit. */
const MAX_AREA = 300;

/**
 * Device classes the demo shop actually stocks. A result only earns a
 * product recommendation when it lands inside one of these bands;
 * everything else is sent to a person.
 */
const DEVICE_CLASSES = [
  { min: 2.8, max: 4.2, productIds: ["mitsubishi-msz-hr35vfk2", "mw-power-alfa-12k"] },
  { min: 6.2, max: 7.8, productIds: ["mitsubishi-msz-hr71vfk2", "mw-power-alfa-24k"] },
] as const;

const kw = new Intl.NumberFormat("sl-SI", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

type Result =
  | { state: "empty" }
  | { state: "invalid"; message: string }
  | {
      state: "ok";
      power: number;
      min: number;
      max: number;
      products: StoreProduct[];
    };

export function AcPowerCalculator() {
  const [area, setArea] = useState("");
  const [insulation, setInsulation] = useState<InsulationValue>("prenovljena");
  const [usage, setUsage] = useState<UsageValue>("hlajenje");

  const areaId = useId();

  const result = useMemo<Result>(() => {
    const raw = area.trim().replace(",", ".");
    if (raw === "") return { state: "empty" };

    const value = Number(raw);
    if (!Number.isFinite(value)) {
      return { state: "invalid", message: "Vnesite število kvadratnih metrov." };
    }
    if (value <= 0) {
      return {
        state: "invalid",
        message: "Vnesite površino prostora, večjo od 0 m².",
      };
    }
    if (value > MAX_AREA) {
      return {
        state: "invalid",
        message: `Za prostore nad ${MAX_AREA} m² poenostavljen izračun ni primeren. Priporočamo individualno svetovanje.`,
      };
    }

    const factor =
      INSULATION.find((option) => option.value === insulation)?.factor ?? 0.1;
    const power = round1(value * factor);

    const deviceClass = DEVICE_CLASSES.find(
      (candidate) => power >= candidate.min && power <= candidate.max,
    );

    return {
      state: "ok",
      power,
      min: round1(power * 0.9),
      max: round1(power * 1.1),
      products: (deviceClass?.productIds ?? [])
        .map((id) => PRODUCT_BY_ID.get(id))
        .filter((product): product is StoreProduct => Boolean(product)),
    };
  }, [area, insulation]);

  // The visible result updates on every keystroke; the announcement waits
  // until typing settles, so a screen reader is not read a new figure per
  // digit.
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const message =
      result.state === "ok"
        ? `Priporočena moč ${kw.format(result.power)} kW. Okvirni razpon ${kw.format(result.min)} do ${kw.format(result.max)} kW.`
        : result.state === "invalid"
          ? result.message
          : "";
    const timer = setTimeout(() => setAnnouncement(message), 600);
    return () => clearTimeout(timer);
  }, [result]);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
      {/* ---------- Inputs ---------- */}
      <form
        className="rounded-[12px] border border-line bg-paper p-6 sm:p-8"
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <label
            htmlFor={areaId}
            className="block text-[0.9375rem] font-medium text-ink"
          >
            Površina prostora
          </label>
          <div className="mt-2.5 flex items-center gap-3">
            <input
              id={areaId}
              name="povrsina"
              type="number"
              inputMode="decimal"
              min={1}
              max={MAX_AREA}
              step={1}
              placeholder="npr. 30"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              aria-describedby={
                result.state === "invalid" ? `${areaId}-error` : undefined
              }
              aria-invalid={result.state === "invalid" || undefined}
              className="nums h-12 w-full rounded-[8px] border border-line-2 bg-paper px-4 text-[1.0625rem] text-ink transition-colors duration-200 placeholder:text-ink-4 hover:border-ink-3 focus:border-brand focus:outline-none"
            />
            <span aria-hidden="true" className="text-[0.9375rem] text-ink-3">
              m²
            </span>
          </div>
          {result.state === "invalid" ? (
            <p
              id={`${areaId}-error`}
              className="mt-2.5 text-[0.8125rem] leading-relaxed text-danger"
            >
              {result.message}
            </p>
          ) : null}
        </div>

        <ChoiceGroup
          legend="Izolacija objekta"
          name="izolacija"
          options={INSULATION}
          value={insulation}
          onChange={(value) => setInsulation(value as InsulationValue)}
        />

        <ChoiceGroup
          legend="Namen uporabe"
          name="namen"
          options={USAGE}
          value={usage}
          onChange={(value) => setUsage(value as UsageValue)}
          hint="Podatek nam pomaga pri priporočilu, na sam izračun moči ne vpliva."
        />
      </form>

      {/* ---------- Result ---------- */}
      <div className="rounded-[12px] border border-line bg-base p-6 sm:p-8">
        <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-4 uppercase">
          Priporočena moč
        </p>

        {result.state === "ok" ? (
          <div key={result.power} className="result-enter">
            <p className="nums mt-4 text-[3rem] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[3.5rem]">
              {kw.format(result.power)} kW
            </p>
            <p className="nums mt-3 text-[0.9375rem] text-ink-3">
              Okvirni razpon {kw.format(result.min)}-{kw.format(result.max)} kW
            </p>

            <div className="mt-8 border-t border-line pt-6">
              {result.products.length > 0 ? (
                <>
                  <p className="text-[0.9375rem] font-semibold text-ink">
                    Priporočene naprave
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {result.products.map((product) => (
                      <li key={product.id}>
                        <CompactProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                    Za ta prostor priporočamo individualno svetovanje.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <ActionLink href={ROUTES.remoteAdvice}>
                      Svetovanje na daljavo
                    </ActionLink>
                    <ActionLink
                      href={`tel:${PRIMARY_PHONE.tel}`}
                      variant="outline"
                      className="nums"
                    >
                      {PRIMARY_PHONE.label}
                    </ActionLink>
                  </div>
                </>
              )}
            </div>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-3">
              Izračun je ocena po poenostavljeni metodi. Za natančno
              dimenzioniranje priporočamo brezplačno svetovanje.
            </p>
          </div>
        ) : result.state === "invalid" ? (
          <div className="result-enter">
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
              {result.message}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ActionLink href={ROUTES.remoteAdvice}>
                Svetovanje na daljavo
              </ActionLink>
              <ActionLink
                href={`tel:${PRIMARY_PHONE.tel}`}
                variant="outline"
                className="nums"
              >
                {PRIMARY_PHONE.label}
              </ActionLink>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-3">
            Vnesite podatke o prostoru za okvirni izračun.
          </p>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  hint,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <fieldset className="mt-8">
      <legend className="text-[0.9375rem] font-medium text-ink">
        {legend}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[8px] border px-4 py-3 text-[0.9375rem] transition-colors duration-200",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                selected
                  ? "border-brand bg-brand-soft text-ink"
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
                  "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                  selected ? "border-brand" : "border-line-2",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full transition-colors duration-200",
                    selected ? "bg-brand" : "bg-transparent",
                  )}
                />
              </span>
              {option.label}
            </label>
          );
        })}
      </div>
      {hint ? (
        <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-4">
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
}

/**
 * Compact form of the shop card. No Add to Cart on purpose: the result is
 * an estimate, and buying a heat pump off an estimate is not a decision
 * this page should be closing.
 */
function CompactProductCard({ product }: { product: StoreProduct }) {
  const href = productHref(product);

  return (
    <div className="group relative flex items-center gap-4 rounded-[10px] border border-line bg-paper p-3 transition-colors duration-200 hover:border-line-2">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-[8px] bg-base">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-ink-4 uppercase">
          {product.brand}
        </p>
        <p className="mt-1 text-[0.9375rem] leading-snug font-semibold text-ink">
          <Link
            href={href}
            className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-brand"
          >
            {product.title}
          </Link>
        </p>
        <p className="nums mt-1.5 text-[0.9375rem] font-semibold text-ink">
          {formatPrice(product.price)}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink-2 transition-colors duration-200 group-hover:text-brand">
          Poglej izdelek
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </p>
      </div>
    </div>
  );
}
