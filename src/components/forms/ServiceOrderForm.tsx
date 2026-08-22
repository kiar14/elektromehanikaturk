"use client";

import { useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";

import {
  ChipGroup,
  Field,
  SuccessPanel,
  controlClass,
} from "@/components/forms/form-parts";
import { ActionButton } from "@/components/ui/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEVICE_CATEGORIES } from "@/lib/content";
import { serviceOrderSchema, type ServiceOrderValues } from "@/lib/schemas";

const EMPTY: ServiceOrderValues = {
  ime: "",
  telefon: "",
  email: "",
  naprava: "",
  znamka: "",
  kraj: "",
  opis: "",
};

export function ServiceOrderForm() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceOrderValues>({
    resolver: zodResolver(serviceOrderSchema),
    defaultValues: EMPTY,
    mode: "onTouched",
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 550));
    setSent(true);
    setFileName("");
    reset(EMPTY);
  };

  if (sent) {
    return (
      <SuccessPanel
        title="Hvala. Prejeli smo vaše povpraševanje za servis."
        body="Kontaktirali vas bomo glede termina."
        resetLabel="Oddaj novo naročilo"
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
              aria-required="true"
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
              aria-required="true"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={controlClass("light", "h-12")}
            />
          )}
        </Field>

        <Field label="E-pošta" error={errors.email?.message} hint="Neobvezno">
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

        <Field label="Kraj" error={errors.kraj?.message}>
          {(field) => (
            <Input
              {...field}
              {...register("kraj")}
              aria-required="true"
              autoComplete="address-level2"
              className={controlClass("light", "h-12")}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
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

      <div className="mt-6 grid gap-5">
        <Field label="Znamka in model" error={errors.znamka?.message} hint="Neobvezno">
          {(field) => (
            <Input
              {...field}
              {...register("znamka")}
              className={controlClass("light", "h-12")}
            />
          )}
        </Field>

        <Field
          label="Opis težave"
          error={errors.opis?.message}
          hint="Kaj naprava dela oziroma česa ne dela? Pomaga tudi koda napake."
        >
          {(field) => (
            <Textarea
              {...field}
              {...register("opis")}
              aria-required="true"
              rows={7}
              className={controlClass("light", "min-h-44 py-3")}
            />
          )}
        </Field>
      </div>

      <div className="mt-6 grid gap-2">
        <label htmlFor={fileId} className="text-[0.8125rem] font-medium text-ink-2">
          Fotografija <span className="font-normal text-ink-4">(neobvezno)</span>
        </label>
        <label
          htmlFor={fileId}
          className="flex min-h-24 cursor-pointer items-center gap-4 rounded-[8px] border border-dashed border-line-2 bg-base px-4 py-4 transition-colors hover:border-brand hover:bg-brand-soft/40"
        >
          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-mist text-brand">
            <ImagePlus className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[0.9375rem] font-medium text-ink">
              {fileName || "Izberite fotografijo"}
            </span>
            <span className="mt-1 block text-[0.8125rem] text-ink-3">
              JPG, PNG, WEBP ali HEIC
            </span>
          </span>
        </label>
        <input
          ref={fileRef}
          id={fileId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          className="sr-only"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
        />
        {fileName ? (
          <button
            type="button"
            onClick={() => {
              setFileName("");
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="justify-self-start text-[0.8125rem] font-medium text-ink-3 underline underline-offset-4 transition-colors hover:text-brand"
          >
            Odstrani izbrano datoteko
          </button>
        ) : null}
      </div>

      <ActionButton type="submit" size="lg" disabled={isSubmitting} className="mt-7 w-full sm:w-auto">
        {isSubmitting ? "Oddajamo..." : "Oddaj naročilo"}
      </ActionButton>
    </form>
  );
}
