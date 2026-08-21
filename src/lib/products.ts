export const PRODUCT_CATEGORIES = [
  "Klimatske naprave",
  "Bela tehnika",
  "Gostinska in hladilna oprema",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductSpec = {
  label: string;
  value: string;
};

export type StoreProduct = {
  id: string;
  slug: string;
  title: string;
  model: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  oldPrice?: number;
  image: string;
  imageAlt: string;
  summary: string;
  description: string[];
  features: string[];
  specs: ProductSpec[];
  sourceUrl: string;
  featured?: boolean;
};

export const PRODUCTS: StoreProduct[] = [
  {
    id: "mitsubishi-msz-hr35vfk2",
    slug: "mitsubishi-msz-hr35vfk2-z-montazo",
    title:
      "Mitsubishi MSZ-HR35VFK2 - klimatska naprava 3,4 kW z montažo",
    model: "MSZ-HR35VFK2",
    brand: "Mitsubishi Electric",
    category: "Klimatske naprave",
    subcategory: "Mitsubishi Electric",
    price: 1125.66,
    oldPrice: 1324.1,
    image: "/images/izdelki/mitsubishi-msz-hr35vfk2.webp",
    imageAlt: "Notranja enota klimatske naprave Mitsubishi MSZ-HR35VFK2.",
    summary:
      "Učinkovita inverterska klimatska naprava za prostore do 50 m². Cena vključuje dobavo in profesionalno montažo.",
    description: [
      "Mitsubishi MSZ-HR35VFK2 je zanesljiva in energetsko učinkovita klimatska naprava za manjše in srednje velike stanovanjske ali poslovne prostore.",
      "V ceno so vključeni notranja in zunanja enota, osnovni montažni material, montaža do štirih metrov instalacije ter nastavitev in preizkus delovanja.",
    ],
    features: [
      "Vgrajen WiFi modul",
      "Inverterska tehnologija",
      "Hlajenje in ogrevanje",
      "Profesionalna montaža vključena v ceno",
    ],
    specs: [
      { label: "Hladilna moč", value: "3,4 kW" },
      { label: "Grelna moč", value: "3,6 kW" },
      { label: "Priporočena površina", value: "do 50 m²" },
      { label: "Energijski razred", value: "A++ / A+" },
      { label: "Hladivo", value: "R32" },
      { label: "Garancija", value: "36 mesecev" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/mitsubishi-msz-hr35vfk2-z-montazo/",
    featured: true,
  },
  {
    id: "mitsubishi-msz-hr71vfk2",
    slug: "mitsubishi-msz-hr71vfk2-z-montazo",
    title:
      "Mitsubishi MSZ-HR71VFK2 - klimatska naprava 7,1 kW z montažo",
    model: "MSZ-HR71VFK2",
    brand: "Mitsubishi Electric",
    category: "Klimatske naprave",
    subcategory: "Mitsubishi Electric",
    price: 2215.19,
    oldPrice: 2606.1,
    image: "/images/izdelki/mitsubishi-msz-hr71vfk2.webp",
    imageAlt: "Notranja enota klimatske naprave Mitsubishi MSZ-HR71VFK2.",
    summary:
      "Visokozmogljiva inverterska klimatska naprava za večje prostore od 85 do 100 m², z vključeno montažo.",
    description: [
      "Mitsubishi MSZ-HR71VFK2 je zasnovana za večje stanovanjske in poslovne prostore, kjer sta pomembna visoka moč in zanesljivo celoletno delovanje.",
      "V ceno so vključeni notranja in zunanja enota, osnovni montažni material, montaža do štirih metrov instalacije ter nastavitev in preizkus delovanja.",
    ],
    features: [
      "Vgrajen WiFi modul",
      "Visoka moč za večje prostore",
      "Hlajenje in ogrevanje",
      "Profesionalna montaža vključena v ceno",
    ],
    specs: [
      { label: "Hladilna moč", value: "7,1 kW" },
      { label: "Grelna moč", value: "8,1 kW" },
      { label: "Priporočena površina", value: "85-100 m²" },
      { label: "Energijski razred", value: "A++ / A+" },
      { label: "Hladivo", value: "R32" },
      { label: "Garancija", value: "36 mesecev" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/mitsubishi-msz-hr71vfk2-z-montazo/",
    featured: true,
  },
  {
    id: "mw-power-alfa-12k",
    slug: "mw-power-alfa-12k-z-montazo",
    title: "MW Power ALFA 12K - klimatska naprava 3,5 kW z montažo",
    model: "ALFA 12K",
    brand: "MW Power",
    category: "Klimatske naprave",
    subcategory: "MW Power",
    price: 695.33,
    oldPrice: 795.33,
    image: "/images/izdelki/mw-power-alfa-12k.webp",
    imageAlt: "Notranja enota klimatske naprave MW Power ALFA 12K.",
    summary:
      "Cenovno dostopna inverterska klimatska naprava za prostore do 50 m². Cena vključuje dobavo in montažo.",
    description: [
      "MW Power ALFA 12K je preprosta in zanesljiva izbira za stanovanja, pisarne in manjše poslovne prostore.",
      "V ceno so vključeni notranja in zunanja enota, osnovni montažni material, montaža do štirih metrov instalacije ter nastavitev in preizkus delovanja.",
    ],
    features: [
      "Inverterska tehnologija",
      "Hlajenje in ogrevanje",
      "Kompaktna notranja enota",
      "Profesionalna montaža vključena v ceno",
    ],
    specs: [
      { label: "Moč", value: "3,5 kW" },
      { label: "Zmogljivost", value: "12.000 BTU" },
      { label: "Priporočena površina", value: "do 50 m²" },
      { label: "Hladivo", value: "R32" },
      { label: "Garancija", value: "24 mesecev" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/mw-power-alfa-12k-z-montazo/",
    featured: true,
  },
  {
    id: "mw-power-alfa-24k",
    slug: "mw-power-alfa-24k-z-montazo",
    title: "MW Power ALFA 24K - klimatska naprava 7,0 kW z montažo",
    model: "ALFA 24K",
    brand: "MW Power",
    category: "Klimatske naprave",
    subcategory: "MW Power",
    price: 1062.15,
    oldPrice: 1162.15,
    image: "/images/izdelki/mw-power-alfa-24k.webp",
    imageAlt: "Notranja in zunanja enota klimatske naprave MW Power ALFA 24K.",
    summary:
      "Zmogljiva inverterska klimatska naprava za večje prostore od 85 do 100 m², z vključeno montažo.",
    description: [
      "MW Power ALFA 24K ponuja veliko hladilne in grelne moči za večje stanovanjske ali poslovne prostore.",
      "V ceno so vključeni notranja in zunanja enota, osnovni montažni material, montaža do štirih metrov instalacije ter nastavitev in preizkus delovanja.",
    ],
    features: [
      "Visoka moč za večje prostore",
      "Inverterska tehnologija",
      "Hlajenje in ogrevanje",
      "Profesionalna montaža vključena v ceno",
    ],
    specs: [
      { label: "Moč", value: "7,0 kW" },
      { label: "Zmogljivost", value: "24.000 BTU" },
      { label: "Priporočena površina", value: "85-100 m²" },
      { label: "Hladivo", value: "R32" },
      { label: "Garancija", value: "24 mesecev" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/mw-power-alfa-24k-z-montazo/",
    featured: true,
  },
  {
    id: "alpfrigo-cm-700-b",
    slug: "alpfrigo-cm-700-b",
    title: "Alpfrigo CM 700 B - profesionalna hladilna omara 700 L, bela/inox",
    model: "CM 700 B",
    brand: "Alpfrigo",
    category: "Gostinska in hladilna oprema",
    subcategory: "Hladilne omare",
    price: 2052.59,
    oldPrice: 2160.62,
    image: "/images/izdelki/alpfrigo-cm-700-b.jpg",
    imageAlt: "Profesionalna hladilna omara Alpfrigo CM 700 B.",
    summary:
      "Profesionalna gostinska hladilna omara s 650 L neto prostornine, belo zunanjostjo in inox notranjostjo.",
    description: [
      "Alpfrigo CM 700 B je zmogljiva profesionalna hladilna omara za gostinske in prehrambne obrate, kjer sta pomembna enakomerna temperatura in preprosto čiščenje.",
      "Belo lakirana zunanjost ponuja ugodnejšo alternativo polni inox izvedbi, notranjost pa ostaja izdelana iz nerjavnega jekla AISI 304.",
    ],
    features: [
      "Ventilatorsko hlajenje",
      "Nastavitev nizke ali visoke vlažnosti",
      "Samozapiralna vrata in notranja osvetlitev",
      "HACCP kompatibilna konstrukcija",
    ],
    specs: [
      { label: "Neto prostornina", value: "650 L" },
      { label: "Temperaturno območje", value: "-2 / +8 °C" },
      { label: "Dimenzije", value: "710 × 800 × 2000 mm" },
      { label: "Standard polic", value: "GN 2/1" },
      { label: "Energijski razred", value: "C" },
      { label: "Hladivo", value: "R290" },
    ],
    sourceUrl: "https://elektromehanikaturk.com/izdelek/alpfrigo-cm-700-b/",
  },
  {
    id: "alpfrigo-cn-700-b",
    slug: "alpfrigo-cn-700-b",
    title:
      "Alpfrigo CN 700 B - profesionalna zamrzovalna omara 700 L, bela/inox",
    model: "CN 700 B",
    brand: "Alpfrigo",
    category: "Gostinska in hladilna oprema",
    subcategory: "Zamrzovalne omare",
    price: 2496.49,
    oldPrice: 2627.88,
    image: "/images/izdelki/alpfrigo-cn-700-b.jpg",
    imageAlt: "Profesionalna zamrzovalna omara Alpfrigo CN 700 B.",
    summary:
      "Profesionalna zamrzovalna omara s 650 L neto prostornine in temperaturnim območjem do -24 °C.",
    description: [
      "Alpfrigo CN 700 B je profesionalna zamrzovalna omara za zahtevno gostinsko uporabo in zanesljivo dolgotrajno zamrzovanje živil.",
      "Bela zunanjost in notranjost iz nerjavnega jekla AISI 304 združujeta praktično ceno, robustno izdelavo in preprosto vzdrževanje.",
    ],
    features: [
      "Ventilatorsko hlajenje",
      "Grelec tesnilne gume proti zamrzovanju",
      "Samozapiralna vrata in notranja osvetlitev",
      "HACCP kompatibilna konstrukcija",
    ],
    specs: [
      { label: "Neto prostornina", value: "650 L" },
      { label: "Temperaturno območje", value: "-18 / -24 °C" },
      { label: "Dimenzije", value: "710 × 800 × 2000 mm" },
      { label: "Standard polic", value: "GN 2/1" },
      { label: "Energijski razred", value: "C" },
      { label: "Hladivo", value: "R290" },
    ],
    sourceUrl: "https://elektromehanikaturk.com/izdelek/alpfrigo-cn-700-b/",
  },
  {
    id: "bosch-wqb246dnby",
    slug: "bosch-susilni-stroj-wqb246dnby",
    title: "Bosch sušilni stroj s toplotno črpalko WQB246DNBY",
    model: "WQB246DNBY",
    brand: "Bosch",
    category: "Bela tehnika",
    subcategory: "Sušilni stroji",
    price: 995,
    oldPrice: 1139,
    image: "/images/izdelki/bosch-wqb246dnby.png",
    imageAlt: "Bosch sušilni stroj s toplotno črpalko WQB246DNBY.",
    summary:
      "Učinkovit sušilni stroj s toplotno črpalko, samodejnim prilagajanjem sušenja in samočistilnim kondenzatorjem.",
    description: [
      "Bosch WQB246DNBY združuje nežno sušenje pri nižjih temperaturah, energijsko učinkovitost in preprosto vsakodnevno uporabo.",
      "Sistem AutoDry spremlja sušenje, samočistilni kondenzator pa pomaga ohranjati učinkovito delovanje skozi čas.",
    ],
    features: [
      "Toplotna črpalka za nežno sušenje",
      "AutoDry samodejno prilagodi stopnjo suhosti",
      "Samočistilni kondenzator",
      "Smart Dry predlaga program glede na pranje",
    ],
    specs: [
      { label: "Tehnologija sušenja", value: "Toplotna črpalka" },
      { label: "Samodejno sušenje", value: "AutoDry" },
      { label: "Kondenzator", value: "Samočistilni" },
      { label: "Izbira programa", value: "Smart Dry" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/bosch-susilni-stroj-s-toplotno-crpalko-wqb246dnby/",
  },
  {
    id: "bosch-kgn49ocaf",
    slug: "bosch-hladilnik-kgn49ocaf",
    title: "Bosch prostostoječi hladilnik z zamrzovalnikom KGN49OCAF",
    model: "KGN49OCAF",
    brand: "Bosch",
    category: "Bela tehnika",
    subcategory: "Hladilniki",
    price: 1280,
    oldPrice: 1489,
    image: "/images/izdelki/bosch-kgn49ocaf.png",
    imageAlt: "Bosch prostostoječi hladilnik z zamrzovalnikom KGN49OCAF.",
    summary:
      "Prostoren prostostoječi hladilnik z zamrzovalnikom spodaj, sistemoma NoFrost in VitaFresh ter tihim delovanjem.",
    description: [
      "Bosch KGN49OCAF je zasnovan za sodobne domove, kjer so pomembni pregledna razporeditev, daljša svežina živil in manj vzdrževanja.",
      "NoFrost preprečuje nabiranje ledu, VitaFresh pa pomaga ohranjati primerno temperaturo in vlago za občutljiva živila.",
    ],
    features: [
      "NoFrost brez ročnega odtaljevanja",
      "VitaFresh za daljšo svežino",
      "Nastavljive police in prostorni predali",
      "LED osvetlitev in alarm odprtih vrat",
    ],
    specs: [
      { label: "Odtaljevanje", value: "NoFrost" },
      { label: "Ohranjanje svežine", value: "VitaFresh" },
      { label: "Osvetlitev", value: "LED" },
      { label: "Varnost", value: "Alarm odprtih vrat" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/bosch-prostostojeci-hladilnik-z-zamrzovalnikom-spodaj-kgn49ocaf/",
  },
  {
    id: "bosch-pvs611b16e",
    slug: "bosch-indukcijska-plosca-pvs611b16e",
    title: "Bosch indukcijska kuhalna plošča z integrirano napo PVS611B16E",
    model: "PVS611B16E",
    brand: "Bosch",
    category: "Bela tehnika",
    subcategory: "Kuhalne plošče",
    price: 1270,
    oldPrice: 1509,
    image: "/images/izdelki/bosch-pvs611b16e.png",
    imageAlt: "Bosch indukcijska kuhalna plošča z integrirano napo PVS611B16E.",
    summary:
      "Indukcijska kuhalna plošča Serie 6 z integrirano napo, prilagodljivim kuhališčem CombiZone in upravljanjem TouchSelect.",
    description: [
      "Bosch PVS611B16E združuje indukcijsko kuhalno ploščo in napo, ki paro in vonjave odstrani neposredno pri viru.",
      "CombiZone omogoča združitev dveh kuhališč za večje posode, PowerBoost pa skrajša čas segrevanja.",
    ],
    features: [
      "Integrirana napa",
      "CombiZone za večje posode",
      "PowerBoost za hitrejše segrevanje",
      "Otroška ključavnica in časovnik izklopa",
    ],
    specs: [
      { label: "Upravljanje", value: "TouchSelect" },
      { label: "Prilagodljivo kuhališče", value: "CombiZone" },
      { label: "Pospešeno gretje", value: "PowerBoost" },
      { label: "Odvod pare", value: "Integrirana napa" },
    ],
    sourceUrl:
      "https://elektromehanikaturk.com/izdelek/bosch-indukcijska-kuhalna-plosca-z-intergrirano-napo-serie-6-pvs611b16e/",
  },
];

export const PRODUCT_BY_SLUG = new Map(
  PRODUCTS.map((product) => [product.slug, product]),
);

export const PRODUCT_BY_ID = new Map(
  PRODUCTS.map((product) => [product.id, product]),
);

export const PRODUCT_BRANDS = Array.from(
  new Set(PRODUCTS.map((product) => product.brand)),
).sort((a, b) => a.localeCompare(b, "sl"));

export const CATEGORY_CARDS = [
  {
    name: "Klimatske naprave" as const,
    description: "Mitsubishi Electric in MW Power z vključeno montažo.",
    image: "/images/izdelki/mitsubishi-msz-hr35vfk2.webp",
    imageAlt: "Klimatska naprava Mitsubishi Electric.",
  },
  {
    name: "Bela tehnika" as const,
    description: "Izbrani Bosch aparati za dom in kuhinjo.",
    image: "/images/izdelki/bosch-kgn49ocaf.png",
    imageAlt: "Bosch hladilnik z zamrzovalnikom.",
  },
  {
    name: "Gostinska in hladilna oprema" as const,
    description: "Profesionalne hladilne in zamrzovalne omare Alpfrigo.",
    image: "/images/izdelki/alpfrigo-cn-700-b.jpg",
    imageAlt: "Profesionalna hladilna omara Alpfrigo.",
  },
];

export const SHOP_MENU_GROUPS = [
  {
    title: "Klimatske naprave",
    links: [
      { label: "Vse klimatske naprave", category: "Klimatske naprave" },
      { label: "Mitsubishi Electric", brand: "Mitsubishi Electric" },
      { label: "MW Power", brand: "MW Power" },
    ],
  },
  {
    title: "Bela tehnika",
    links: [
      { label: "Sušilni stroji", subcategory: "Sušilni stroji" },
      { label: "Hladilniki", subcategory: "Hladilniki" },
      { label: "Kuhalne plošče", subcategory: "Kuhalne plošče" },
    ],
  },
  {
    title: "Gostinska in hladilna oprema",
    links: [
      { label: "Hladilne omare", subcategory: "Hladilne omare" },
      { label: "Zamrzovalne omare", subcategory: "Zamrzovalne omare" },
    ],
  },
] as const;

export function productHref(product: Pick<StoreProduct, "slug">) {
  return `/trgovina/${product.slug}`;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("sl-SI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function getRelatedProducts(product: StoreProduct, limit = 3) {
  return PRODUCTS.filter((candidate) => candidate.id !== product.id)
    .map((candidate) => ({
      product: candidate,
      score:
        Number(candidate.category === product.category) * 2 +
        Number(candidate.brand === product.brand),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product: candidate }) => candidate);
}
