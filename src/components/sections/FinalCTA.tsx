"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActionButton } from "@/components/ui/actions";
import {
  Field,
  SuccessPanel,
  controlClass,
} from "@/components/forms/form-parts";
import {
  serviceEnquirySchema,
  type ServiceEnquiryValues,
} from "@/lib/schemas";
import { submitEnquiry } from "@/lib/enquiry";
import { OPENING_HOURS, PRIMARY_PHONE } from "@/lib/site";

const EMPTY: ServiceEnquiryValues = {
  ime: "",
  telefon: "",
  naprava: "",
  opis: "",
  kraj: "",
};

/** Two clear paths to reach EMT: call now, or describe the fault. */
export function FinalCTA() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceEnquiryValues>({
    resolver: zodResolver(serviceEnquirySchema),
    defaultValues: EMPTY,
    mode: "onTouched",
  });

  const onSubmit = async (values: ServiceEnquiryValues) => {
    setFailed(null);
    const result = await submitEnquiry({
      kind: "servisno-povprasevanje",
      ...values,
    });
    if (result.ok) {
      setSent(true);
      reset(EMPTY);
    } else {
      setFailed(result.message);
    }
  };

  return (
    <section
      id="narocilo-servisa"
      className="on-ink scroll-mt-20 bg-ink py-20 text-on-dark sm:py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* Path one — call */}
          <div data-reveal>
            <h2 className="text-[2.5rem] leading-[1.03] text-white sm:text-[3rem] lg:text-[3.75rem]">
              Povejte nam, kaj ne dela.
            </h2>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-on-dark-2">
              Za nujne primere je klic najhitrejši. Sicer izpolnite obrazec in
              se oglasimo mi.
            </p>

            <div className="mt-10 border-t border-line-dark pt-8">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-on-dark-2 uppercase">
                Pokličite
              </p>
              <a
                href={`tel:${PRIMARY_PHONE.tel}`}
                className="nums mt-4 inline-block text-[2rem] leading-none font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-brand-soft sm:text-[2.5rem]"
              >
                {PRIMARY_PHONE.label}
              </a>

              <dl className="mt-8 grid gap-1.5 text-[0.9375rem]">
                {OPENING_HOURS.map((entry) => (
                  <div key={entry.days} className="flex gap-3">
                    <dt className="w-20 shrink-0 text-on-dark-2">
                      {entry.days}
                    </dt>
                    <dd className="nums text-on-dark">{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Path two — describe the fault */}
          <div data-reveal>
            {sent ? (
              <SuccessPanel
                tone="dark"
                title="Povpraševanje je oddano."
                body="Hvala. Pregledali bomo opis težave in vas poklicali na navedeno številko."
              onReset={() => setSent(false)}
              />
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Ime" tone="dark" error={errors.ime?.message}>
                    {(field) => (
                      <Input
                        {...field}
                        {...register("ime")}
                        autoComplete="name"
                        className={controlClass("dark", "h-12")}
                      />
                    )}
                  </Field>

                  <Field
                    label="Telefon"
                    tone="dark"
                    error={errors.telefon?.message}
                  >
                    {(field) => (
                      <Input
                        {...field}
                        {...register("telefon")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={controlClass("dark", "h-12")}
                      />
                    )}
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Naprava / znamka"
                    tone="dark"
                    error={errors.naprava?.message}
                  >
                    {(field) => (
                      <Input
                        {...field}
                        {...register("naprava")}
                        className={controlClass("dark", "h-12")}
                      />
                    )}
                  </Field>

                  <Field label="Kraj" tone="dark" error={errors.kraj?.message}>
                    {(field) => (
                      <Input
                        {...field}
                        {...register("kraj")}
                        autoComplete="address-level2"
                        className={controlClass("dark", "h-12")}
                      />
                    )}
                  </Field>
                </div>

                <Field
                  label="Opis težave"
                  tone="dark"
                  error={errors.opis?.message}
                  hint="Kaj naprava dela oziroma česa ne dela? Pomaga tudi koda napake."
                >
                  {(field) => (
                    <Textarea
                      {...field}
                      {...register("opis")}
                      rows={5}
                      className={controlClass("dark", "min-h-32 py-3")}
                    />
                  )}
                </Field>

                {failed ? (
                  <p role="alert" className="text-[0.8125rem] text-danger-on-dark">
                    {failed}
                  </p>
                ) : null}

                <div>
                  <ActionButton
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Pošiljamo…" : "Pošlji povpraševanje"}
                  </ActionButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
