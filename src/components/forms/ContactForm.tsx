"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, SuccessPanel, controlClass } from "@/components/forms/form-parts";
import { ActionButton } from "@/components/ui/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/schemas";

const EMPTY: ContactValues = {
  ime: "",
  email: "",
  telefon: "",
  sporocilo: "",
};

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY,
    mode: "onTouched",
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSent(true);
    reset(EMPTY);
  };

  if (sent) {
    return (
      <SuccessPanel
        title="Hvala za sporočilo."
        body="Oglasimo se vam v najkrajšem možnem času."
        resetLabel="Pošlji novo sporočilo"
        onReset={() => setSent(false)}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[12px] border border-line-2 bg-paper p-5 sm:p-7 lg:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ime in priimek" error={errors.ime?.message}>
          {(field) => (
            <Input
              {...field}
              {...register("ime")}
              autoComplete="name"
              className={controlClass("light", "h-12")}
            />
          )}
        </Field>

        <Field label="E-pošta" error={errors.email?.message}>
          {(field) => (
            <Input
              {...field}
              {...register("email")}
              type="email"
              autoComplete="email"
              className={controlClass("light", "h-12")}
            />
          )}
        </Field>

        <Field
          label="Telefon"
          error={errors.telefon?.message}
          hint="Neobvezno"
          className="sm:col-span-2"
        >
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

        <Field
          label="Sporočilo"
          error={errors.sporocilo?.message}
          className="sm:col-span-2"
        >
          {(field) => (
            <Textarea
              {...field}
              {...register("sporocilo")}
              rows={7}
              className={controlClass("light", "min-h-44 py-3")}
            />
          )}
        </Field>
      </div>

      <p className="mt-5 max-w-[42rem] text-[0.8125rem] leading-relaxed text-ink-3">
        S pošiljanjem obrazca se strinjate, da vaše kontaktne podatke hranimo,
        da vam lahko odgovorimo.
      </p>

      <ActionButton type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? "Pošiljamo..." : "Pošlji sporočilo"}
      </ActionButton>
    </form>
  );
}
