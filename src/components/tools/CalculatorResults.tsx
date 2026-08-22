"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

import { CalculatorInquiryForm } from "@/components/tools/CalculatorInquiryForm";
import { ActionLink, ArrowLink } from "@/components/ui/actions";
import {
  formatPower,
  formatWhole,
  type CalculatorDraft,
  type CalculatorResult,
} from "@/lib/power-calculator";
import { ROUTES } from "@/lib/navigation";
import { formatPrice, productHref, type StoreProduct } from "@/lib/products";

export function CalculatorResults({
  result,
  draft,
  modeLabel,
  onEdit,
  onStartOver,
}: {
  result: CalculatorResult;
  draft: CalculatorDraft;
  modeLabel: string;
  onEdit: () => void;
  onStartOver: () => void;
}) {
  const summary = resultSummary(result, draft, modeLabel);
  const showInquiry = result.mode !== "ac" || result.products.length === 0;

  return (
    <section aria-labelledby="calculator-result-heading" className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-3 transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Popravi podatke
        </button>
        <p className="text-[0.8125rem] font-medium tracking-[0.04em] text-ink-4">
          1. Podatki
          <span aria-hidden="true" className="mx-2 text-line-2">/</span>
          <span className="text-brand">2. Rezultat</span>
        </p>
      </div>

      <div className="mt-7 grid gap-7 border-b border-line pb-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(16rem,0.82fr)] lg:gap-12">
        <div>
          <p className="eyebrow">{modeLabel}</p>
          <h2 id="calculator-result-heading" className="mt-3 text-[1.75rem] sm:text-[2.15rem]">
            Vaša informativna ocena
          </h2>
          <p className="mt-3 max-w-[39rem] text-[0.9375rem] leading-relaxed text-ink-3">
            Rezultat je izračunan iz vnesenih podatkov. Prikazane vrednosti niso končna tehnična specifikacija.
          </p>
        </div>
        <div className="rounded-[10px] border border-brand/20 bg-brand-soft p-5">
          <p className="flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] text-brand uppercase">
            <CheckCircle2 aria-hidden="true" className="size-4" />
            Izračun zaključen
          </p>
          <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{summary}</p>
        </div>
      </div>

      <div aria-live="polite" className="result-enter mt-8">
        <ResultFigures result={result} draft={draft} />

        {result.mode === "ac" ? (
          <div className="mt-9 border-t border-line pt-8">
            {result.products.length > 0 ? (
              <>
                <div className="max-w-[43rem]">
                  <h3 className="text-[1.35rem]">Naprave, ki ustrezajo oceni</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-3">
                    Izbor temelji samo na izračunani moči. Pred nakupom preverimo še postavitev in pogoje v prostoru.
                  </p>
                </div>
                <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                  {result.products.map((product) => (
                    <li key={product.id}>
                      <CompactProductCard product={product} />
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ArrowLink href={ROUTES.remoteAdvice}>Potrebujete pomoč pri izbiri?</ArrowLink>
                </div>
              </>
            ) : (
              <div className="max-w-[45rem]">
                <h3 className="text-[1.35rem]">Za to moč priporočamo individualno izbiro</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-3">
                  V katalogu ni naprave, ki bi jo lahko varno priporočili samo na podlagi te ocene. Pošljite nam podatke za prilagojeno rešitev.
                </p>
              </div>
            )}
          </div>
        ) : null}

        {result.mode === "heating" || result.mode === "combined" ? (
          <p className="mt-6 max-w-[48rem] rounded-[10px] border border-line bg-base p-4 text-[0.875rem] leading-relaxed text-ink-3">
            {result.system === "radiators"
              ? "Pri radiatorjih toplotna črpalka običajno deluje pri višji temperaturi dovedene vode, kar lahko zmanjša učinkovitost. Pred izbiro sistema priporočamo preverbo ustreznosti obstoječih radiatorjev."
              : "Talno gretje je zelo primerno za toplotno črpalko, saj deluje z nižjo temperaturo dovedene vode."}
          </p>
        ) : null}

        {result.mode === "water" ? (
          <p className="mt-7 max-w-[50rem] text-[0.9375rem] leading-relaxed text-ink-3">
            Naprave s priporočljivo močjo trenutno še nimamo na voljo v spletni trgovini. Pošljite nam povpraševanje in pripravili vam bomo ponudbo glede na vaše potrebe.
          </p>
        ) : null}

        {result.mode === "heating" || result.mode === "combined" ? (
          <p className="mt-7 max-w-[50rem] text-[0.9375rem] leading-relaxed text-ink-3">
            Toplotne črpalke s priporočeno močjo trenutno niso vključene v spletni ponudbi. Pošljite nam povpraševanje in pripravili vam bomo predlog glede na vaš objekt.
          </p>
        ) : null}

        {result.mode === "combined" ? (
          <p className="mt-4 max-w-[50rem] text-[0.875rem] leading-relaxed text-ink-3">
            Pri kombiniranem sistemu priporočamo toplotno črpalko z vgrajenim zalogovnikom ali ločen zalogovnik ustrezne prostornine.
          </p>
        ) : null}

        <p className="mt-8 max-w-[52rem] text-[0.875rem] leading-relaxed text-ink-3">
          Izračun je ocena po poenostavljeni metodi. Za natančno dimenzioniranje priporočamo{" "}
          <Link href={ROUTES.remoteAdvice} className="font-medium text-ink underline decoration-line-2 underline-offset-4 hover:text-brand">
            brezplačno svetovanje
          </Link>.
        </p>

        {showInquiry ? (
          <div className="mt-9">
            <CalculatorInquiryForm summary={summary} />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-3 transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Izberi drug izračun
          </button>
          <ActionLink href={ROUTES.contact} variant="outline">Kontakt</ActionLink>
        </div>
      </div>
    </section>
  );
}

function ResultFigures({ result, draft }: { result: CalculatorResult; draft: CalculatorDraft }) {
  if (result.mode === "ac") {
    return (
      <Figure
        label="Priporočena moč"
        value={`${formatPower(result.power)} kW`}
        secondary={`${draft.acValue} ${draft.acBasis === "area" ? "m²" : "m³"}`}
      />
    );
  }
  if (result.mode === "water") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Figure label="Priporočena moč" value={`${formatPower(result.power)} kW`} secondary={`${draft.people} osebe`} />
        <Figure label="Priporočen zalogovnik" value={`${formatWhole(result.volume)} L`} secondary={`min. ${draft.people} × 50 L`} />
      </div>
    );
  }
  if (result.mode === "heating") {
    return <Figure label="Priporočena moč" value={`${formatPower(result.power)} kW`} secondary={`${draft.heatingArea} m²`} />;
  }
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Figure label="Moč za ogrevanje" value={`${formatPower(result.heatingPower)} kW`} secondary={`${draft.heatingArea} m²`} />
      <Figure label="Moč za sanitarno vodo" value={`${formatPower(result.waterPower)} kW`} secondary={`${draft.people} osebe`} />
      <Figure label="Priporočen zalogovnik" value={`${formatWhole(result.waterVolume)} L`} secondary={`min. ${draft.people} × 50 L`} />
    </div>
  );
}

function Figure({ label, value, secondary }: { label: string; value: string; secondary: string }) {
  return (
    <div className="rounded-[10px] border border-line-dark bg-ink p-5 sm:p-6">
      <p className="text-[0.75rem] font-medium tracking-[0.1em] text-on-dark-2 uppercase">{label}</p>
      <p className="nums mt-3 text-[2rem] leading-none font-semibold tracking-[-0.03em] text-white sm:text-[2.5rem]">{value}</p>
      <p className="nums mt-3 text-[0.8125rem] text-on-dark-2">{secondary}</p>
    </div>
  );
}

function CompactProductCard({ product }: { product: StoreProduct }) {
  const href = productHref(product);
  return (
    <article className="group relative flex h-full items-center gap-4 rounded-[10px] border border-line bg-base p-3.5 transition-colors duration-200 hover:border-line-2">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-[8px] bg-paper">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading="eager"
          sizes="96px"
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-[0.6875rem] font-medium tracking-[0.1em] text-ink-4 uppercase">{product.brand}</p>
        <p className="nums mt-1 text-[0.75rem] text-ink-3">
          {product.specs.find((spec) => spec.label === "Moč")?.value ?? product.model}
        </p>
        <h4 className="mt-1.5 text-[0.9375rem] leading-snug font-semibold text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand">
            {product.title}
          </Link>
        </h4>
        <div className="nums mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.9375rem]">
          {product.oldPrice ? <span className="text-[0.8125rem] text-ink-4 line-through">{formatPrice(product.oldPrice)}</span> : null}
          <span className="font-semibold text-ink">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink-2 group-hover:text-brand">
          Poglej izdelek
          <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}

function resultSummary(result: CalculatorResult, draft: CalculatorDraft, modeLabel: string) {
  if (result.mode === "ac") {
    return `Namen: ${modeLabel}. ${draft.acBasis === "area" ? "Površina" : "Volumen"}: ${draft.acValue} ${draft.acBasis === "area" ? "m²" : "m³"}. Priporočena moč: ${formatPower(result.power)} kW.`;
  }
  if (result.mode === "water") {
    return `Namen: ${modeLabel}. Člani gospodinjstva: ${draft.people}. Priporočena moč: ${formatPower(result.power)} kW. Zalogovnik: ${formatWhole(result.volume)} L.`;
  }
  if (result.mode === "heating") {
    return `Namen: ${modeLabel}. Površina: ${draft.heatingArea} m². Izolacija: ${insulationLabel(draft.insulation)}. Sistem: ${systemLabel(draft.heatingSystem)}. Priporočena moč: ${formatPower(result.power)} kW.`;
  }
  return `Namen: ${modeLabel}. Površina: ${draft.heatingArea} m². Izolacija: ${insulationLabel(draft.insulation)}. Sistem: ${systemLabel(draft.heatingSystem)}. Člani gospodinjstva: ${draft.people}. Ogrevanje: ${formatPower(result.heatingPower)} kW. Sanitarna voda: ${formatPower(result.waterPower)} kW. Zalogovnik: ${formatWhole(result.waterVolume)} L.`;
}

function insulationLabel(value: CalculatorDraft["insulation"]) {
  return value === "new" ? "Novogradnja" : value === "renovated" ? "Prenovljena" : "Stara hiša";
}

function systemLabel(value: CalculatorDraft["heatingSystem"]) {
  return value === "underfloor" ? "Talno gretje" : "Radiatorji";
}
