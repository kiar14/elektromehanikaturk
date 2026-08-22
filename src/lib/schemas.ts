import { z } from "zod";

import { DEVICE_CATEGORIES } from "@/lib/content";

/** Lenient enough for the ways people actually write SI numbers. */
const phone = z
  .string()
  .trim()
  .min(1, "Vnesite telefonsko številko.")
  .refine(
    (value) => (value.match(/\d/g) ?? []).length >= 8,
    "Telefonska številka je prekratka.",
  )
  .refine(
    (value) => /^[+\d][\d\s()/.-]*$/.test(value),
    "Uporabite samo številke, presledke in znake + ( ) - /",
  );

const name = z
  .string()
  .trim()
  .min(2, "Vnesite svoje ime.")
  .max(80, "Ime je predolgo.");

const email = z
  .string()
  .trim()
  .min(1, "Vnesite e-poštni naslov.")
  .email("Vnesite veljaven e-poštni naslov.");

const optionalEmail = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.email().safeParse(value).success,
    "Vnesite veljaven e-poštni naslov.",
  );

export const quickBookingSchema = z.object({
  ime: name,
  telefon: phone,
  naprava: z
    .string()
    .min(1, "Izberite vrsto naprave.")
    .refine(
      (value) => (DEVICE_CATEGORIES as readonly string[]).includes(value),
      "Izberite vrsto naprave.",
    ),
});

export const serviceEnquirySchema = z.object({
  ime: name,
  telefon: phone,
  naprava: z
    .string()
    .trim()
    .min(2, "Navedite napravo ali znamko.")
    .max(120, "Vnos je predolg."),
  opis: z
    .string()
    .trim()
    .min(10, "Na kratko opišite težavo (vsaj 10 znakov).")
    .max(1500, "Opis je predolg."),
  kraj: z
    .string()
    .trim()
    .min(2, "Vnesite kraj.")
    .max(80, "Vnos je predolg."),
});

export const contactSchema = z.object({
  ime: name,
  email,
  telefon: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || (value.match(/\d/g) ?? []).length >= 8,
      "Telefonska številka je prekratka.",
    )
    .refine(
      (value) => value === "" || /^[+\d][\d\s()/.-]*$/.test(value),
      "Uporabite samo številke, presledke in znake + ( ) - /",
    ),
  sporocilo: z
    .string()
    .trim()
    .min(10, "Sporočilo naj vsebuje vsaj 10 znakov.")
    .max(2000, "Sporočilo je predolgo."),
});

export const serviceOrderSchema = z.object({
  ime: name,
  telefon: phone,
  email: optionalEmail,
  naprava: z
    .string()
    .min(1, "Izberite vrsto naprave.")
    .refine(
      (value) => (DEVICE_CATEGORIES as readonly string[]).includes(value),
      "Izberite vrsto naprave.",
    ),
  znamka: z.string().trim().max(120, "Vnos je predolg."),
  kraj: z.string().trim().min(2, "Vnesite kraj.").max(80, "Vnos je predolg."),
  opis: z
    .string()
    .trim()
    .min(10, "Na kratko opišite težavo (vsaj 10 znakov).")
    .max(2000, "Opis je predolg."),
});

export type QuickBookingValues = z.infer<typeof quickBookingSchema>;
export type ServiceEnquiryValues = z.infer<typeof serviceEnquirySchema>;
export type ContactValues = z.infer<typeof contactSchema>;
export type ServiceOrderValues = z.infer<typeof serviceOrderSchema>;
