"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ActionButton } from "@/components/ui/actions";
import {
  ChipGroup,
  Field,
  SuccessPanel,
  controlClass,
} from "@/components/forms/form-parts";
import { DEVICE_CATEGORIES } from "@/lib/content";
import { quickBookingSchema, type QuickBookingValues } from "@/lib/schemas";
import { submitEnquiry } from "@/lib/enquiry";
import { PRIMARY_PHONE } from "@/lib/site";

const EMPTY: QuickBookingValues = { ime: "", telefon: "", naprava: "" };

/**
 * Sits immediately after Services so someone with a broken appliance can
 * act without reading the rest of the page. Deliberately shorter than
 * the detailed enquiry form at the foot of the page.
 */
export function QuickBooking() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickBookingValues>({
    resolver: zodResolver(quickBookingSchema),
    defaultValues: EMPTY,
    mode: "onTouched",
  });

  const onSubmit = async (values: QuickBookingValues) => {
    setFailed(null);
    const result = await submitEnquiry({
      kind: "hitro-povprasevanje",
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
    <section className="bg-sand py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div data-reveal>
            <h2 className="text-[2.125rem] leading-[1.06] sm:text-[2.5rem] lg:text-[3rem]">
              Potrebujete servis?
            </h2>
            <p className="mt-4 max-w-[26rem] text-[1.0625rem] leading-relaxed text-ink-3">
              Povejte nam, kaj ne dela. Kontaktirali vas bomo glede termina.
            </p>
            <a
              href={`tel:${PRIMARY_PHONE.tel}`}
              className="mt-6 inline-flex items-center gap-2.5 text-[0.9375rem] text-ink-2 transition-colors duration-200 hover:text-brand"
            >
              <Phone aria-hidden="true" className="size-4 text-brand" />
              <span>
                Ali pokličite{" "}
                <span className="nums font-semibold">{PRIMARY_PHONE.label}</span>
              </span>
            </a>
          </div>

          <div data-reveal>
            {sent ? (
              <SuccessPanel
                title="Povpraševanje je oddano."
                body="Hvala. Oglasili se bomo na navedeno številko in se dogovorili za termin."
                onReset={() => setSent(false)}
              />
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[12px] border border-line-2 bg-paper p-5 sm:p-7"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Ime" error={errors.ime?.message}>
                    {(field) => (
                      <Input
                        {...field}
                        {...register("ime")}
                        autoComplete="name"
                        className={controlClass("light", "h-12")}
                      />
                    )}
                  </Field>

                  <Field label="Telefon" error={errors.telefon?.message}>
                    {(field) => (
                      <Input
                        {...field}
                        {...register("telefon")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={controlClass("light", "h-12")}
                      />
                    )}
                  </Field>
                </div>

                <div className="mt-5">
                  <Controller
                    control={control}
                    name="naprava"
                    render={({ field }) => (
                      <ChipGroup
                        legend="Vrsta naprave"
                        name={field.name}
                        options={DEVICE_CATEGORIES}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.naprava?.message}
                      />
                    )}
                  />
                </div>

                {failed ? (
                  <p role="alert" className="mt-5 text-[0.8125rem] text-danger">
                    {failed}
                  </p>
                ) : null}

                <ActionButton
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="mt-6 w-full sm:w-auto"
                >
                  {isSubmitting ? "Pošiljamo…" : "Pošlji povpraševanje"}
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
