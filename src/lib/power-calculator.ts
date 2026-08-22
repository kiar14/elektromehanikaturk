import { PRODUCT_BY_ID, type StoreProduct } from "@/lib/products";

export type CalculatorMode = "ac" | "water" | "heating" | "combined";
export type AcBasis = "area" | "volume";
export type InsulationLevel = "new" | "renovated" | "old";
export type HeatingSystem = "underfloor" | "radiators";

export type HeatingInput = {
  area: number;
  insulation: InsulationLevel;
  system: HeatingSystem;
};

export type CalculatorDraft = {
  acBasis: AcBasis;
  acValue: string;
  people: string;
  heatingArea: string;
  insulation: InsulationLevel;
  heatingSystem: HeatingSystem;
};

export type CalculatorResult =
  | { mode: "ac"; power: number; products: StoreProduct[] }
  | { mode: "water"; power: number; volume: number }
  | { mode: "heating"; power: number; system: HeatingSystem }
  | {
      mode: "combined";
      heatingPower: number;
      waterPower: number;
      waterVolume: number;
      system: HeatingSystem;
    };

export const INSULATION_FACTORS: Record<InsulationLevel, number> = {
  new: 0.04,
  renovated: 0.06,
  old: 0.12,
};

export const LIMITS = {
  acArea: 300,
  acVolume: 900,
  heatingArea: 1000,
  people: 30,
} as const;

export function calculateAcPower(basis: AcBasis, value: number) {
  return value * (basis === "area" ? 0.08 : 0.03);
}

export function calculateWaterHeating(people: number) {
  return {
    power: people * 0.5,
    volume: people * 50,
  };
}

export function calculateHeatingPower(input: HeatingInput) {
  return input.area * INSULATION_FACTORS[input.insulation];
}

export function matchAcProducts(power: number): StoreProduct[] {
  // Normalize binary floating point noise at exact catalog boundaries.
  const normalizedPower = Math.round(power * 1_000_000) / 1_000_000;
  const ids =
    normalizedPower <= 3.5
      ? ["mw-power-alfa-12k", "mitsubishi-msz-hr35vfk2"]
      : normalizedPower <= 7.1
        ? ["mw-power-alfa-24k", "mitsubishi-msz-hr71vfk2"]
        : [];

  return ids
    .map((id) => PRODUCT_BY_ID.get(id))
    .filter((product): product is StoreProduct => Boolean(product));
}

export const formatPower = new Intl.NumberFormat("sl-SI", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
}).format;

export const formatWhole = new Intl.NumberFormat("sl-SI", {
  maximumFractionDigits: 0,
}).format;

export function parsePositiveNumber(value: string) {
  const normalized = value.trim().replace(",", ".");
  if (normalized === "") return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}
