/**
 * Site architecture. Routes are wired now even though most target
 * pages are not built yet — the navigation is meant to be final.
 */

/**
 * `icon` names a Lucide component rather than importing one: this module
 * is plain data shared by the server-rendered footer and two client
 * navigations, and pulling icon components in here would drag them into
 * every consumer. The navigations map the name to a component.
 */
export type NavIcon =
  | "wrench"
  | "snowflake"
  | "washing-machine"
  | "flame"
  | "refrigerator"
  | "video";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: NavIcon;
};

export const SERVICES_SECTION_HREF = "/#storitve";

export const SERVICES_NAV: NavLink[] = [
  {
    label: "Servis klimatskih naprav",
    href: "/storitve/servis-klimatskih-naprav",
    icon: "wrench",
    description: "Čiščenje, polnjenje in iskanje napak.",
  },
  {
    label: "Montaža klimatskih naprav",
    href: "/storitve/montaza-klimatskih-naprav",
    icon: "snowflake",
    description: "Split in multi-split sistemi s postavitvijo.",
  },
  {
    label: "Servis bele tehnike",
    href: "/storitve/servis-bele-tehnike",
    icon: "washing-machine",
    description: "Pralni, pomivalni in sušilni stroji, pečice.",
  },
  {
    label: "Toplotne črpalke",
    href: "/storitve/toplotne-crpalke",
    icon: "flame",
    description: "Svetovanje, montaža in vzdrževanje.",
  },
  {
    label: "Gostinska in hladilna oprema",
    href: "/storitve/gostinska-in-hladilna-oprema",
    icon: "refrigerator",
    description: "Omare, vitrine, komore, ledomati.",
  },
  {
    label: "Svetovanje na daljavo",
    href: "/storitve/svetovanje-na-daljavo",
    icon: "video",
    description: "Hitra pomoč brez čakanja na termin.",
  },
];

export const SHOP_NAV: NavLink[] = [
  {
    label: "Klimatske naprave",
    href: "/trgovina?kategorija=Klimatske%20naprave#vsi-izdelki",
  },
  {
    label: "Bela tehnika",
    href: "/trgovina?kategorija=Bela%20tehnika#vsi-izdelki",
  },
  {
    label: "Gostinska in hladilna oprema",
    href: "/trgovina?kategorija=Gostinska%20in%20hladilna%20oprema#vsi-izdelki",
  },
];

export const PRIMARY_NAV: {
  label: string;
  href: string;
  children?: NavLink[];
  layout?: "mega" | "list";
}[] = [
  {
    label: "Storitve",
    href: SERVICES_SECTION_HREF,
    children: SERVICES_NAV,
    layout: "mega",
  },
  { label: "Trgovina", href: "/trgovina", children: SHOP_NAV, layout: "list" },
  { label: "Cenik", href: "/cenik" },
  { label: "Izračun moči", href: "/izracun-moci" },
  { label: "Nasveti", href: "/nasveti" },
  { label: "Pogosta vprašanja", href: "/pogosta-vprasanja" },
  { label: "O nas", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];

export const ROUTES = {
  booking: "/narocilo-servisa",
  shop: "/trgovina",
  pricing: "/cenik",
  about: "/o-nas",
  contact: "/kontakt",
  advice: "/nasveti",
  remoteAdvice: "/storitve/svetovanje-na-daljavo",
  acCalculator: "/izracun-moci",
  cart: "/kosarica",
} as const;

export const LEGAL_NAV: NavLink[] = [
  { label: "Politika zasebnosti", href: "/politika-zasebnosti" },
  { label: "Pogoji poslovanja", href: "/pogoji-poslovanja" },
  { label: "Politika dostave", href: "/politika-dostave" },
  { label: "Pravilnik povrnitev in vračil", href: "/pravilnik-povrnitev-in-vracil" },
  { label: "Piškotki", href: "/piskotki" },
];
