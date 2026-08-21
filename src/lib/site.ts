/**
 * Single source of truth for Elektromehanika Turk business data.
 *
 * Everything here is verified against elektromehanikaturk.com.
 * Values that are genuinely unknown are exported as bracketed
 * placeholders — search the codebase for "[" to find them all.
 */

export const SITE = {
  name: "Elektromehanika Turk",
  shortName: "EMT",
  legalTagline: "Za prijetnejše življenje.",
  url: "https://elektromehanikaturk.com",
  email: "info@elektromehanikaturk.com",
} as const;

export const ADDRESS = {
  street: "Nad Krko 18",
  postalCode: "8222",
  city: "Otočec",
  country: "SI",
  full: "Nad Krko 18, 8222 Otočec",
} as const;

/** Display form + E.164 tel: target. */
export const PHONES = [
  { label: "07 30 99 010", tel: "+38673099010", primary: true },
  { label: "051 324 696", tel: "+38651324696", primary: false },
  { label: "041 626 730", tel: "+38641626730", primary: false },
] as const;

export const PRIMARY_PHONE = PHONES[0];

export const OPENING_HOURS = [
  { days: "Pon-Pet", hours: "8:00-16:00" },
  { days: "Sob", hours: "8:00-12:00" },
  { days: "Ned", hours: "Zaprto" },
] as const;

/** Machine-readable form for schema.org openingHours. */
export const OPENING_HOURS_SPEC = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "12:00",
  },
] as const;

export const SERVICE_AREA = [
  "Novo mesto",
  "Otočec",
  "Šentjernej",
  "Trebnje",
  "Krško",
  "Brežice",
  "Sevnica",
] as const;

/** Google Business Profile: "Elektromehanika Turk Marko s.p."
 *  Knowledge-graph id /g/1ttdx74w, CID 3113223537819948156.
 *  The `cid` form is the stable permalink; share.google links can expire. */
export const GOOGLE_URL = "https://www.google.com/maps?cid=3113223537819948156";

/**
 * Verified from the profile on 2026-08-21: the rating is 3,8 and Google
 * publishes no review count for it.
 *
 * It is deliberately NOT displayed. Below roughly 4,3 a visible rating
 * costs a local service business more conversions than it wins, so the
 * hero, the figures row and the reviews heading all lead with signals
 * that are both true and favourable instead. The link to the profile
 * stays — anyone who wants the number can reach it in one click.
 *
 * Flip this to `true` to show the rating everywhere it used to appear.
 */
export const SHOW_GOOGLE_RATING = false;
export const GOOGLE_RATING = "3,8";

/** From the Google Business Profile listing. */
export const GEO = { latitude: 45.8330596, longitude: 15.2172547 } as const;

/**
 * Deliberately no "official brands" count. EMT is an official servicer
 * and seller for several named manufacturers and separately an official
 * installer; collapsing that into one number oversimplifies the
 * relationship, so the marquee names the brands and no figure claims to
 * total them.
 */
export const YEARS_EXPERIENCE = "20+";
