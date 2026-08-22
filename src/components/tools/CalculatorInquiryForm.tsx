"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Paperclip } from "lucide-react";
import { useForm } from "react-hook-form";

import { Field, SuccessPanel, controlClass } from "@/components/forms/form-parts";
import { ActionButton } from "@/components/ui/actions";
import {
  calculatorInquirySchema,
  type CalculatorInquiryValues,
} from "@/lib/schemas";

export function CalculatorInquiryForm({ summary }: { summary: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CalculatorInquiryValues>({
    resolver: zodResolver(calculatorInquirySchema),
    defaultValues: {
      ime: "",
      telefon: "",
      email: "",
      opombe: "",
      marketing: false,
    },
  });

  async function submit() {
    await new Promise((resolve) => setTimeout(resolve, 250));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessPanel
        title="Obrazec je preverjen"
        body="To je predstavitvena različica, zato povpraševanje ni bilo poslano. Za takojšnjo pomoč nas pokličite ali uporabite kontaktno stran."
        resetLabel="Ponovno odpri obrazec"
        onReset={() => {
          reset();
          setFileName("");
          setSubmitted(false);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="rounded-[12px] border border-line bg-base p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-line bg-paper text-brand">
          <FileText aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h3 className="text-[1.25rem]">Pošljite povpraševanje</h3>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-3">
            Podatke iz izračuna smo že pripravili. Dodajte kontaktne podatke in po želji tloris ali dodatne informacije.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Ime in priimek" error={errors.ime?.message}>
          {(props) => <input {...props} {...register("ime")} autoComplete="name" className={controlClass("light", "h-12 text-[1rem]")} />}
        </Field>
        <Field label="Telefon" hint="Vnesite telefon ali e-pošto." error={errors.telefon?.message}>
          {(props) => <input {...props} {...register("telefon")} type="tel" autoComplete="tel" className={controlClass("light", "h-12 text-[1rem]")} />}
        </Field>
        <Field label="E-pošta" error={errors.email?.message}>
          {(props) => <input {...props} {...register("email")} type="email" autoComplete="email" className={controlClass("light", "h-12 text-[1rem]")} />}
        </Field>
        <div className="grid gap-2">
          <p id="calculator-summary-label" className="text-[0.8125rem] font-medium text-ink-2">
            Izračunani podatki
          </p>
          <div
            role="textbox"
            aria-readonly="true"
            aria-labelledby="calculator-summary-label"
            className="min-h-24 rounded-[8px] border border-line bg-paper px-4 py-3 text-[0.875rem] leading-relaxed text-ink-3"
          >
            {summary}
          </div>
        </div>
        <Field label="Opombe / dodatne informacije" error={errors.opombe?.message} className="sm:col-span-2">
          {(props) => (
            <textarea
              {...props}
              {...register("opombe")}
              rows={4}
              placeholder="Npr. lokacija objekta, posebnosti prostora ali želeni termin."
              className={controlClass("light", "resize-y py-3 text-[1rem]")}
            />
          )}
        </Field>
      </div>

      <div className="mt-5">
        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-[8px] border border-line-2 bg-paper px-4 py-3 text-[0.875rem] font-medium text-ink-2 transition-colors duration-200 hover:border-ink-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand">
          <Paperclip aria-hidden="true" className="size-4 text-brand" />
          <span>{fileName || "Tloris ali fotografija"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="sr-only"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          />
        </label>
        <p className="mt-2 text-[0.75rem] text-ink-4">Priponka je v prototipu prikazana lokalno in se ne nalaga.</p>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-ink-3">
        <input {...register("marketing")} type="checkbox" className="mt-0.5 size-4 shrink-0 accent-brand" />
        Želim prejemati obvestila o akcijah, novostih in servisnih ponudbah.
      </label>

      <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-4">
        S pošiljanjem obrazca se strinjate, da vaše kontaktne podatke hranimo, da vam lahko odgovorimo.
      </p>

      <div className="mt-6 border-t border-line pt-5">
        <ActionButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Preverjanje ..." : "Pošlji povpraševanje"}
        </ActionButton>
      </div>
    </form>
  );
}
