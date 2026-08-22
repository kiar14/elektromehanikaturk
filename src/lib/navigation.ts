/**
 * Site architecture. Routes are wired now even though most target
 * pages are not built yet — the navigation is meant to be final.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const SERVICES_NAV: NavLink[] = [
  {
    label: "Servis klimatskih naprav",
    href: "/storitve/servis-klimatskih-naprav",
    description: "Čiščenje, polnjenje in iskanje napak.",
  },
  {
    label: "Montaža klimatskih naprav",
    href: "/storitve/montaza-klimatskih-naprav",
    description: "Split in multi-split sistemi s postavitvijo.",
  },
  {
    label: "Servis bele tehnike",
    href: "/storitve/servis-bele-tehnike",
    description: "Pralni, pomivalni in sušilni stroji, pečice.",
  },
  {
    label: "Toplotne črpalke",
    href: "/storitve/toplotne-crpalke",
    description: "Svetovanje, montaža in vzdrževanje.",
  },
  {
    label: "Gostinska in hladilna oprema",
    href: "/storitve/gostinska-in-hladilna-oprema",
    description: "Omare, vitrine, komore, ledomati.",
  },
  {
    label: "Svetovanje na daljavo",
    href: "/storitve/svetovanje-na-daljavo",
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
  { label: "Storitve", href: "/storitve", children: SERVICES_NAV, layout: "mega" },
  { label: "Trgovina", href: "/trgovina", children: SHOP_NAV, layout: "list" },
  { label: "Cenik", href: "/cenik" },
  {
    label: "Svetovanje na daljavo",
    href: "/storitve/svetovanje-na-daljavo",
  },
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
  cart: "/kosarica",
} as const;

export const LEGAL_NAV: NavLink[] = [
  { label: "Politika zasebnosti", href: "/politika-zasebnosti" },
  { label: "Pogoji poslovanja", href: "/pogoji-poslovanja" },
  { label: "Politika dostave", href: "/politika-dostave" },
  { label: "Pravilnik povrnitev in vračil", href: "/pravilnik-povrnitev-in-vracil" },
  { label: "Piškotki", href: "/piskotki" },
];
