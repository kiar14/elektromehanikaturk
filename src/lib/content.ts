/**
 * Homepage content. Product names, prices and manufacturer logos are
 * taken from the live EMT shop — nothing here is invented. Prices are
 * a snapshot and should move to a CMS or the shop API before launch.
 */

export type Service = {
  title: string;
  blurb: string;
  href: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    title: "Servis klimatskih naprav",
    blurb: "Čiščenje, polnjenje, iskanje napak in letno vzdrževanje.",
    href: "/storitve/servis-klimatskih-naprav",
    image: "/images/storitve/servis-klimatskih-naprav.webp",
    alt: "Serviser čisti filtre stenske klimatske naprave v dnevni sobi.",
  },
  {
    title: "Montaža klimatskih naprav",
    blurb: "Svetovanje, dobava in montaža split ter multi-split sistemov.",
    href: "/storitve/montaza-klimatskih-naprav",
    image: "/images/storitve/montaza-klimatskih-naprav.webp",
    alt: "Monter namešča notranjo enoto klimatske naprave na steno.",
  },
  {
    title: "Servis bele tehnike",
    blurb: "Pralni in pomivalni stroji, hladilniki, pečice in sušilci.",
    href: "/storitve/servis-bele-tehnike",
    image: "/images/storitve/servis-bele-tehnike.webp",
    alt: "Serviser popravlja pralni stroj z odstranjeno stransko ploščo.",
  },
  {
    title: "Gostinska in hladilna oprema",
    blurb: "Hladilne omare, vitrine, komore, ledomati in kavni aparati.",
    href: "/storitve/gostinska-in-hladilna-oprema",
    image: "/images/storitve/gostinska-in-hladilna-oprema.webp",
    alt: "Serviser popravlja hladilni agregat v profesionalni gostinski kuhinji.",
  },
];

export type Product = {
  manufacturer: string;
  model: string;
  name: string;
  descriptor: string;
  price: string;
  priceBefore: string;
  href: string;
  image: string;
  alt: string;
  /** Product photography arrives in mixed framing; this tunes the fit. */
  imageClass: string;
};

export const PRODUCTS: Product[] = [
  {
    manufacturer: "Mitsubishi Electric",
    model: "MSZ-HR35VFK2",
    name: "Mitsubishi MSZ-HR35VFK2 - klimatska naprava 3,4 kW z montažo",
    descriptor: "Klimatska naprava 3,4 kW z montažo",
    price: "1.125,66 €",
    priceBefore: "1.324,10 €",
    href: "/trgovina/mitsubishi-msz-hr35vfk2-z-montazo",
    image: "/images/izdelki/mitsubishi-msz-hr35vfk2.webp",
    alt: "Notranja enota klimatske naprave Mitsubishi MSZ-HR35VFK2.",
    imageClass: "object-contain scale-[1.06]",
  },
  {
    manufacturer: "Mitsubishi Electric",
    model: "MSZ-HR71VFK2",
    name: "Mitsubishi MSZ-HR71VFK2 - klimatska naprava 7,1 kW z montažo",
    descriptor: "Klimatska naprava 7,1 kW z montažo",
    price: "2.215,19 €",
    priceBefore: "2.606,10 €",
    href: "/trgovina/mitsubishi-msz-hr71vfk2-z-montazo",
    image: "/images/izdelki/mitsubishi-msz-hr71vfk2.webp",
    alt: "Notranja enota klimatske naprave Mitsubishi MSZ-HR71VFK2.",
    imageClass: "object-contain scale-[1.06]",
  },
  {
    manufacturer: "MW Power",
    model: "ALFA 12K",
    name: "MW Power ALFA 12K - klimatska naprava 3,5 kW z montažo",
    descriptor: "Klimatska naprava 3,5 kW z montažo",
    price: "695,33 €",
    priceBefore: "795,33 €",
    href: "/trgovina/mw-power-alfa-12k-z-montazo",
    image: "/images/izdelki/mw-power-alfa-12k.webp",
    alt: "Notranja enota klimatske naprave MW Power ALFA 12K.",
    imageClass: "object-contain scale-[1.06]",
  },
  {
    manufacturer: "MW Power",
    model: "ALFA 24K",
    name: "MW Power ALFA 24K - klimatska naprava 7,0 kW z montažo",
    descriptor: "Klimatska naprava 7,0 kW z montažo",
    price: "1.062,15 €",
    priceBefore: "1.162,15 €",
    href: "/trgovina/mw-power-alfa-24k-z-montazo",
    image: "/images/izdelki/mw-power-alfa-24k.webp",
    alt: "Notranja in zunanja enota klimatske naprave MW Power ALFA 24K.",
    imageClass: "object-contain",
  },
];

export type Reason = {
  title: string;
  body: string;
  /** Lucide icon name; resolved to a component in WhyUs. */
  icon: "ShieldCheck" | "Wrench" | "ReceiptText" | "PanelsTopLeft" | "MapPin";
  /** Optional follow-through, rendered under the copy. */
  link?: { label: string; href: string };
};

export const REASONS: Reason[] = [
  {
    title: "Uradni serviser vodilnih znamk",
    body: "Servis po postopkih proizvajalcev ter dostop do ustreznih nadomestnih delov.",
    icon: "ShieldCheck",
  },
  {
    title: "Prodaja, montaža in servis",
    body: "Od izbire naprave in nakupa do montaže, vzdrževanja in kasnejšega servisa.",
    icon: "Wrench",
  },
  {
    title: "Javno objavljene cene",
    body: "Cenik osnovnih servisnih storitev je dostopen že pred naročilom.",
    icon: "ReceiptText",
    link: { label: "Poglejte cenik", href: "/cenik" },
  },
  {
    title: "Več vrst naprav na enem mestu",
    body: "Klime, toplotne črpalke, bela tehnika ter hladilna in gostinska oprema.",
    icon: "PanelsTopLeft",
  },
  {
    title: "Lokalna servisna ekipa",
    body: "Ekipa z Otočca za stranke na Dolenjskem in v Posavju.",
    icon: "MapPin",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Oddate povpraševanje",
    body: "Povejte, kaj se dogaja z napravo. Pomaga fotografija.",
  },
  {
    title: "Ugotovimo napako",
    body: "Pridemo na dogovorjen termin ali svetujemo na daljavo.",
  },
  {
    title: "Popravimo",
    body: "Večino napak odpravimo na kraju samem, z deli, ki jih imamo v vozilu.",
  },
  {
    title: "Naprava spet dela",
    body: "Za opravljeno delo in vgrajene dele jamčimo.",
  },
];

export type Review = { quote: string; author: string };

/** Verbatim customer reviews — do not paraphrase or shorten. */
export const REVIEWS: Review[] = [
  {
    quote: "Korektna komunikacija, hiter odziv, kvalitetno popravilo!",
    author: "Nejc S.",
  },
  { quote: "Hiter odziv, strokovno odpravljena težava.", author: "Ana Z." },
  { quote: "Profesionalni, hitri, korektni, priporočam", author: "Uroš O." },
  {
    quote: "Prijazni, hitro odzivni, odličen bosch servis, priporočam",
    author: "Jože R.",
  },
  {
    quote:
      "Super izkušnja. Prijazna serviserja sta prišla, hitro uredila, naučila, svetovala. Priporočam!",
    author: "Nina R.",
  },
  {
    quote: "Težavo rešili v istem dnevu, strokovni in prijazni",
    author: "Katarina P.",
  },
];

export type Brand = {
  name: string;
  file: string;
  /** Intrinsic pixels of the normalised asset. */
  w: number;
  h: number;
  /** Rendered height in px, tuned per mark for equal optical weight. */
  size: number;
};

/**
 * All six reviews, in the order the rotator should cycle them. Derived
 * from REVIEWS by author so the wording can only ever come from the
 * verbatim list above.
 */
const FEATURED_ORDER = [
  "Nina R.",
  "Nejc S.",
  "Katarina P.",
  "Jože R.",
  "Ana Z.",
  "Uroš O.",
];

export const FEATURED_REVIEWS: Review[] = FEATURED_ORDER.flatMap((author) =>
  REVIEWS.filter((review) => review.author === author),
);

/**
 * The 15 manufacturers EMT publishes as official service and sales
 * brands, in their original colours. scripts/build-brand-logos.cjs
 * prepares them: white plates are turned to alpha so the marks float on
 * the off-white surface, and `size` normalises optical height rather
 * than width, so wide wordmarks stay wide.
 */
export const BRANDS: Brand[] = [
  { name: "AEG", file: "/images/znamke/aeg.webp", w: 420, h: 159, size: 46 },
  { name: "Alpfrigo", file: "/images/znamke/alpfrigo.webp", w: 420, h: 87, size: 42 },
  { name: "Beko", file: "/images/znamke/beko.webp", w: 280, h: 160, size: 46 },
  { name: "Bosch", file: "/images/znamke/bosch.webp", w: 420, h: 94, size: 42 },
  { name: "Daikin", file: "/images/znamke/daikin.webp", w: 420, h: 88, size: 42 },
  { name: "Electrolux", file: "/images/znamke/electrolux.webp", w: 420, h: 97, size: 42 },
  { name: "Elmont", file: "/images/znamke/elmont.webp", w: 120, h: 160, size: 50 },
  { name: "Icematic", file: "/images/znamke/icematic.webp", w: 420, h: 51, size: 36 },
  { name: "Liebherr", file: "/images/znamke/liebherr.webp", w: 420, h: 52, size: 36 },
  { name: "Mitsubishi Electric", file: "/images/znamke/mitsubishi.webp", w: 420, h: 123, size: 42 },
  { name: "MW Power", file: "/images/znamke/mw-power.webp", w: 279, h: 160, size: 46 },
  { name: "Samsung", file: "/images/znamke/samsung.webp", w: 420, h: 64, size: 36 },
  { name: "Siemens", file: "/images/znamke/siemens.webp", w: 420, h: 70, size: 36 },
  { name: "Toshiba", file: "/images/znamke/toshiba.webp", w: 420, h: 64, size: 36 },
  { name: "Zanussi", file: "/images/znamke/zanussi.webp", w: 317, h: 160, size: 46 },
];

/** Device categories offered in both booking forms. */
export const DEVICE_CATEGORIES = [
  "Klima",
  "Bela tehnika",
  "Toplotna črpalka",
  "Gostinska oprema",
  "Drugo",
] as const;
