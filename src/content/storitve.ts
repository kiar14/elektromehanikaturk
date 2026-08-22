import type { FaqItem } from "@/lib/faq";

export type ServiceAction = {
  label: string;
  href: string;
  external?: boolean;
};

type FixedPrice = {
  mode: "fixed";
  heading: string;
  items: { title: string; price: string; oldPrice?: string }[];
  note: string;
};

type ShopPrice = {
  mode: "shop";
  heading: string;
  body: string;
  productId: string;
};

type RangePrice = {
  mode: "range";
  heading: string;
  items: { title: string; price: string; detail?: string }[];
};

type QuotePrice = {
  mode: "quote";
  heading: string;
  body: string;
  secondaryAction?: ServiceAction;
};

type RemoteSteps = {
  mode: "remote";
  heading: string;
  body: string;
  note: string;
  steps: { title: string }[];
};

export type ServicePricing =
  | FixedPrice
  | ShopPrice
  | RangePrice
  | QuotePrice
  | RemoteSteps;

/**
 * A short shortlist of store products worth seeing alongside a service.
 * Products are referenced by id only: names, prices, images and routes
 * stay owned by src/lib/products.ts. Services with nothing genuinely
 * relevant in the catalogue simply omit this — the section is not
 * rendered rather than filled with something unrelated.
 */
export type ServiceProducts = {
  heading: string;
  productIds: string[];
};

export type ServicePageData = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  metaDescription: string;
  image: string;
  alt: string;
  imagePosition?: string;
  included: {
    label?: string;
    items: string[];
  }[];
  pricing: ServicePricing;
  products?: ServiceProducts;
  brands?: string[];
  faqs: FaqItem[];
  primaryAction: ServiceAction;
  finalCta: {
    title: string;
    body?: string;
    secondaryAction?: ServiceAction;
  };
};

const booking = { label: "Naroči servis", href: "/narocilo-servisa" };
const phone = { label: "07 30 99 010", href: "tel:+38673099010" };

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "servis-klimatskih-naprav",
    eyebrow: "SERVIS KLIMATSKIH NAPRAV",
    title: "Servis klimatskih naprav",
    lead: "Redni letni servis, čiščenje in iskanje napak na klimatskih napravah vseh znamk.",
    metaDescription:
      "Redni servis, čiščenje in diagnostika klimatskih naprav vseh znamk na Dolenjskem, v Beli krajini in Posavju.",
    image: "/images/storitve/servis-klimatskih-naprav.webp",
    alt: "Serviser čisti filtre stenske klimatske naprave v dnevni sobi.",
    included: [
      {
        label: "Osnovni servis",
        items: [
          "Čiščenje filtrov notranje enote",
          "Dezinfekcija uparjalnika",
          "Pregled zunanje enote",
          "Preverjanje odvoda kondenza",
          "Kontrola delovanja in temperature",
        ],
      },
      {
        label: "Temeljiti servis",
        items: [
          "Vse iz osnovnega servisa",
          "Temeljito čiščenje uparjalnika",
          "Čiščenje ventilatorja oziroma turbine",
          "Spiranje kondenzne posode",
          "Pregled tlaka hladiva",
          "Test delovanja sistema",
        ],
      },
    ],
    pricing: {
      mode: "fixed",
      heading: "Cene servisov",
      items: [
        { title: "Osnovni servis", price: "55,00 €", oldPrice: "65,00 €" },
        { title: "Temeljiti servis", price: "85,00 €", oldPrice: "100,00 €" },
        { title: "Dodatna notranja enota", price: "30,00 €" },
      ],
      note: "Servis ni vezan na znamko klimatske naprave. Po oddaji naročila vas pokličemo za uskladitev termina.",
    },
    products: {
      heading: "Priporočene naprave",
      productIds: [
        "mitsubishi-msz-hr35vfk2",
        "mitsubishi-msz-hr71vfk2",
        "mw-power-alfa-12k",
        "mw-power-alfa-24k",
      ],
    },
    brands: ["Daikin", "Mitsubishi Electric", "MW Power", "Samsung", "Toshiba"],
    faqs: [
      {
        question: "Kako pogosto je priporočljivo servisirati klimatsko napravo?",
        answer:
          "Priporočamo redni letni servis. Pogostost se lahko prilagodi načinu in intenzivnosti uporabe naprave.",
      },
      {
        question: "Ali servisirate vse znamke klimatskih naprav?",
        answer:
          "Da, servis klimatske naprave ni vezan na posamezno znamko. Pri določenih proizvajalcih imamo tudi status uradnega serviserja.",
      },
      {
        question: "Kaj storiti, če klima ne hladi?",
        answer:
          "Oddajte povpraševanje za servis ali nas pokličite. Najprej preverimo delovanje naprave in ugotovimo vzrok težave, nato predlagamo ustrezno rešitev.",
      },
    ],
    primaryAction: booking,
    finalCta: {
      title: "Je čas za servis klimatske naprave?",
      body: "Oddajte naročilo, mi pa vas pokličemo za uskladitev termina.",
      secondaryAction: phone,
    },
  },
  {
    slug: "montaza-klimatskih-naprav",
    eyebrow: "MONTAŽA KLIMATSKIH NAPRAV",
    title: "Montaža klimatskih naprav",
    lead: "Svetovanje, dobava in montaža split ter multi-split sistemov.",
    metaDescription:
      "Svetovanje, dobava in montaža split ter multi-split klimatskih naprav za domove in poslovne prostore.",
    image: "/images/storitve/montaza-klimatskih-naprav.webp",
    alt: "Monter namešča notranjo enoto klimatske naprave na steno.",
    included: [
      {
        items: [
          "Ogled ali svetovanje na daljavo",
          "Izbira ustrezne moči naprave",
          "Dobava naprave",
          "Montaža notranje enote",
          "Montaža zunanje enote",
          "Vakuumiranje in zagon sistema",
          "Predaja naprave in navodila za uporabo",
        ],
      },
    ],
    pricing: {
      mode: "shop",
      heading: "Naprava z montažo",
      body: "Cene izbranih klimatskih naprav v trgovini že vključujejo montažo, kjer je to navedeno pri izdelku.",
      productId: "mw-power-alfa-12k",
    },
    products: {
      heading: "Priporočene naprave",
      productIds: [
        "mitsubishi-msz-hr35vfk2",
        "mitsubishi-msz-hr71vfk2",
        "mw-power-alfa-12k",
        "mw-power-alfa-24k",
      ],
    },
    brands: ["Daikin", "Mitsubishi Electric", "MW Power", "Samsung", "Toshiba"],
    faqs: [
      {
        question: "Koliko časa traja montaža klimatske naprave?",
        answer:
          "Čas montaže je odvisen od vrste sistema, dostopnosti lokacije in zahtevnosti izvedbe. Po ogledu oziroma dogovoru vam lahko podamo natančnejšo oceno.",
      },
      {
        question: "Kam se namesti notranja enota?",
        answer:
          "Mesto določimo glede na razpored prostora, smer pihanja, možnosti odvoda kondenza in izvedbo povezave do zunanje enote. Cilj je učinkovito hlajenje brez neposrednega pihanja v območje, kjer se ljudje pogosto zadržujejo.",
      },
      {
        question: "Ali lahko montirate tudi napravo, kupljeno drugje?",
        answer:
          "Za tak primer nas predhodno kontaktirajte z znamko in modelom naprave ter lokacijo montaže. Preverili bomo možnosti izvedbe.",
      },
    ],
    primaryAction: { label: "Poglejte klimatske naprave", href: "/trgovina?kategorija=Klimatske%20naprave#vsi-izdelki" },
    finalCta: {
      title: "Iščete pravo klimo za svoj prostor?",
      body: "Pomagamo pri izbiri naprave, dobavi in montaži.",
      secondaryAction: { label: "Brezplačno svetovanje", href: "/storitve/svetovanje-na-daljavo" },
    },
  },
  {
    slug: "servis-bele-tehnike",
    eyebrow: "SERVIS BELE TEHNIKE",
    title: "Servis bele tehnike",
    lead: "Pralni in pomivalni stroji, hladilniki, sušilci, pečice in kuhalne plošče.",
    metaDescription:
      "Diagnostika in servis bele tehnike na lokaciji ali v delavnici za gospodinjske aparate različnih znamk.",
    image: "/images/storitve/servis-bele-tehnike.webp",
    alt: "Serviser popravlja pralni stroj z odstranjeno stransko ploščo.",
    included: [
      {
        items: [
          "Diagnostika okvare",
          "Pregled delovanja naprave",
          "Popravilo na lokaciji ali v delavnici",
          "Zamenjava potrebnih delov",
          "Testiranje po popravilu",
        ],
      },
    ],
    pricing: {
      mode: "range",
      heading: "Cene diagnostike in popravil",
      items: [
        { title: "Diagnostika malih aparatov", price: "17,08 € z DDV" },
        { title: "Diagnostika velikih aparatov", price: "30,50 € z DDV" },
        { title: "Popravilo velikih aparatov", price: "42,70 € do 91,50 € z DDV", detail: "Glede na zahtevnost popravila." },
      ],
    },
    products: {
      heading: "Poglejte tudi",
      productIds: [
        "bosch-wqb246dnby",
        "bosch-kgn49ocaf",
        "bosch-pvs611b16e",
      ],
    },
    brands: ["AEG", "Beko", "Bosch", "Electrolux", "Liebherr", "Samsung", "Siemens", "Zanussi"],
    faqs: [
      {
        question: "Ali pridete na dom?",
        answer:
          "Pri večjih gospodinjskih aparatih je servis glede na vrsto okvare možen tudi na lokaciji. Če popravilo zahteva delo v delavnici, se z vami dogovorimo za nadaljnji postopek.",
      },
      {
        question: "Kako poteka diagnostika?",
        answer:
          "Najprej pregledamo delovanje naprave in ugotovimo vzrok okvare. Nato vam predstavimo način popravila oziroma naslednje korake.",
      },
      {
        question: "Katere znamke servisirate?",
        answer:
          "Servisiramo večje uveljavljene znamke bele tehnike. Če niste prepričani, ali lahko servisiramo vašo napravo, nam sporočite znamko in model.",
      },
    ],
    primaryAction: booking,
    finalCta: {
      title: "Naprava ne deluje pravilno?",
      body: "Opišite težavo in se dogovorite za diagnostiko.",
      secondaryAction: { label: "Poglejte cenik", href: "/cenik" },
    },
  },
  {
    slug: "toplotne-crpalke",
    eyebrow: "TOPLOTNE ČRPALKE",
    title: "Toplotne črpalke",
    lead: "Svetovanje, prodaja, montaža in servis toplotnih črpalk za ogrevanje in sanitarno vodo.",
    metaDescription:
      "Svetovanje, prodaja, montaža in servis toplotnih črpalk za ogrevanje prostorov in sanitarne vode.",
    image: "/images/storitve/toplotne-crpalke.png",
    alt: "Zunanja enota toplotne črpalke ob sodobni stanovanjski hiši.",
    included: [
      {
        items: [
          "Ocena potreb objekta",
          "Pomoč pri izbiri ustreznega sistema",
          "Dobava opreme",
          "Montaža sistema",
          "Zagon in nastavitev",
          "Redno vzdrževanje",
          "Servis",
        ],
      },
    ],
    pricing: {
      mode: "quote",
      heading: "Ponudba po meri objekta",
      body: "Cena je odvisna od objekta, izbranega sistema in zahtevnosti izvedbe.",
      secondaryAction: phone,
    },
    faqs: [
      {
        question: "Kako izbrati ustrezno moč toplotne črpalke?",
        answer:
          "Ustrezna moč je odvisna od velikosti objekta, njegove izolacije, načina ogrevanja in drugih lastnosti. Zato pred izbiro priporočamo individualno svetovanje.",
      },
      {
        question: "Ali je toplotna črpalka primerna za obstoječe radiatorje?",
        answer:
          "Odvisno je od ogrevalnega sistema, potrebnih temperatur in lastnosti objekta. Primernost je najbolje preveriti za konkreten objekt pred izbiro naprave.",
      },
      {
        question: "Kako pogosto potrebuje servis?",
        answer:
          "Redno vzdrževanje pomaga ohranjati pravilno in učinkovito delovanje sistema. Primeren interval je odvisen od naprave in načina uporabe, zato upoštevajte tudi navodila proizvajalca.",
      },
    ],
    primaryAction: { label: "Pošlji povpraševanje", href: "/narocilo-servisa" },
    finalCta: {
      title: "Načrtujete toplotno črpalko?",
      body: "Povejte nam več o objektu in poiščimo ustrezno rešitev.",
      secondaryAction: phone,
    },
  },
  {
    slug: "gostinska-in-hladilna-oprema",
    eyebrow: "GOSTINSKA IN HLADILNA OPREMA",
    title: "Gostinska in hladilna oprema",
    lead: "Hladilne omare, vitrine, komore, ledomati in druga oprema za lokale, trgovine in profesionalne kuhinje.",
    metaDescription:
      "Servis, vzdrževanje, dobava in montaža gostinske ter hladilne opreme za lokale, trgovine in profesionalne kuhinje.",
    image: "/images/storitve/gostinska-in-hladilna-oprema.webp",
    alt: "Serviser popravlja hladilni agregat v profesionalni gostinski kuhinji.",
    included: [
      {
        items: [
          "Diagnostika in odprava okvar",
          "Servis hladilne opreme",
          "Redno vzdrževanje",
          "Dobava ustrezne opreme",
          "Montaža in zagon",
          "Svetovanje pri izbiri opreme",
        ],
      },
    ],
    pricing: {
      mode: "quote",
      heading: "Ponudba glede na opremo",
      body: "Cena je odvisna od vrste opreme, okvare in potrebnih delov.",
      secondaryAction: {
        label: "Poglejte ponudbo",
        href: "/trgovina?kategorija=Gostinska%20in%20hladilna%20oprema#vsi-izdelki",
      },
    },
    products: {
      heading: "Priporočene naprave",
      productIds: [
        "alpfrigo-cm-700-b",
        "alpfrigo-cn-700-b",
      ],
    },
    brands: ["Alpfrigo", "Elmont", "Icematic", "Liebherr"],
    faqs: [
      {
        question: "Ali servisirate tudi opremo, ki ni bila kupljena pri vas?",
        answer:
          "Kontaktirajte nas z znamko, modelom in opisom težave. Glede na vrsto opreme preverimo možnosti servisa.",
      },
      {
        question: "Katere vrste hladilne opreme servisirate?",
        answer:
          "Servisiramo hladilne omare, vitrine, komore, ledomate in drugo profesionalno hladilno ter gostinsko opremo.",
      },
      {
        question: "Ali nudite redno vzdrževanje?",
        answer:
          "Da, poleg odprave okvar izvajamo tudi vzdrževanje hladilne in gostinske opreme. Za obseg in način vzdrževanja nas kontaktirajte.",
      },
    ],
    primaryAction: { label: "Pošlji povpraševanje", href: "/narocilo-servisa" },
    finalCta: {
      title: "Naj oprema zanesljivo podpira vaše delo.",
      body: "Za servis, vzdrževanje ali novo opremo pošljite povpraševanje.",
      secondaryAction: phone,
    },
  },
  {
    slug: "svetovanje-na-daljavo",
    eyebrow: "SVETOVANJE NA DALJAVO",
    title: "Svetovanje na daljavo",
    lead: "Brezplačno svetovanje na daljavo pred nakupom klime, toplotne črpalke ali bele tehnike.",
    metaDescription:
      "Rezervirajte brezplačno svetovanje na daljavo pred nakupom klime, toplotne črpalke ali bele tehnike.",
    image: "/images/storitve/svetovanje-na-daljavo.png",
    alt: "Svetovanje o toplotni črpalki prek video klica na prenosnem računalniku.",
    imagePosition: "center center",
    included: [
      {
        items: [
          "Pogovor o vaših potrebah",
          "Pomoč pri izbiri naprave",
          "Pregled osnovnih podatkov o prostoru ali objektu",
          "Odgovori na vprašanja pred nakupom",
          "Predlog naslednjih korakov",
        ],
      },
    ],
    pricing: {
      mode: "remote",
      heading: "Kako poteka svetovanje",
      body: "Izberite storitev, ki vas zanima, in termin, ki vam ustreza, ter se posvetujte s strokovnjakom. Svetovanje na daljavo je brezplačno in vam je na voljo kot pomoč pri odločitvi.",
      note: "Svetovanje vas ne obvezuje k nakupu.",
      steps: [
        { title: "Izberete termin" },
        { title: "Poveste, kaj potrebujete" },
        { title: "Skupaj poiščemo ustrezno rešitev" },
      ],
    },
    faqs: [
      {
        question: "Ali je svetovanje res brezplačno?",
        answer:
          "Da. Svetovanje na daljavo je brezplačno in je namenjeno pomoči pri izbiri ustrezne naprave oziroma rešitve.",
      },
      {
        question: "Ali me svetovanje obvezuje k nakupu?",
        answer: "Ne. Svetovanje vas ne obvezuje k nakupu.",
      },
      {
        question: "Kaj moram pripraviti pred terminom?",
        answer:
          "Pripravite osnovne informacije o prostoru, objektu ali napravi, glede katere potrebujete pomoč. Če določenih podatkov ne poznate, si lahko termin vseeno rezervirate.",
      },
    ],
    primaryAction: {
      label: "Rezervirajte brezplačen termin",
      href: "https://elektromehanikaturk.setmore.com/",
      external: true,
    },
    finalCta: {
      title: "Potrebujete pomoč pri izbiri?",
      body: "Rezervirajte brezplačen termin, ki vam ustreza.",
      secondaryAction: phone,
    },
  },
];

export const SERVICE_PAGE_BY_SLUG = new Map(
  SERVICE_PAGES.map((service) => [service.slug, service]),
);

export const GENERIC_SERVICE_STEPS = [
  {
    title: "Oddate povpraševanje",
    body: "Sporočite nam, katero storitev ali napravo potrebujete.",
  },
  {
    title: "Uskladimo termin",
    body: "Dogovorimo se za termin in način izvedbe.",
  },
  {
    title: "Ugotovimo rešitev",
    body: "Pregledamo stanje in z vami uskladimo naslednji korak.",
  },
  {
    title: "Opravimo storitev",
    body: "Izvedemo dogovorjeno montažo, servis ali vzdrževanje.",
  },
];
