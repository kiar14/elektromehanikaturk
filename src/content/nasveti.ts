/**
 * Nasveti — article content for the prototype.
 *
 * Static data on purpose: six short pieces do not justify a CMS, and the
 * shape below is the same one a CMS payload would take, so moving later
 * is a data swap rather than a rewrite.
 *
 * Nothing here claims a publication date, an author or a measured saving.
 * The advice is general and points to a technician wherever a real answer
 * depends on the device or the building.
 *
 * Photography
 * -----------
 * Every article image was downloaded once and is served from
 * /public/images/nasveti — nothing is hotlinked. Sources (all
 * royalty-free, commercial use permitted, no attribution required, so no
 * credit is displayed in the UI):
 *
 *   idealna-temperatura-klime-poleti      Unsplash — Caroline Badran
 *   kam-namestiti-notranjo-enoto-klime    Pexels   — Art Bovich
 *   split-ali-multi-split-klima           Pexels   — alpha innotec
 *   ogrevanje-s-klimo-pozimi              Pexels   — Art Bovich
 *   zakaj-pomivalni-stroj-ne-pomiva-dobro Pexels   — Art Bovich
 *   napake-pri-uporabi-susilnega-stroja   Pexels   — Art Bovich
 *
 * Originals live in .assets-src/photos/nasveti; scripts/build-images.cjs
 * normalises them to 3:2 WebP.
 */

export type ArticleCategory = "Klimatske naprave" | "Bela tehnika";

export type ArticleSection = {
  heading: string;
  /** Paragraphs. Kept short — the body column is ~68ch wide. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  list?: string[];
};

/** Which inline CTA the article carries. */
export type ArticleCtaKind = "klima" | "aparat";

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readingTime: string;
  category: ArticleCategory;
  image: string;
  imageAlt: string;
  /** Tunes the 3:2 crop per photograph where the default centre is off. */
  imagePosition?: string;
  /** Lead paragraph above the first H2. */
  intro: string[];
  sections: ArticleSection[];
  conclusion: string;
  cta: ArticleCtaKind;
  /** Slugs of the three articles offered under "Preberite tudi". */
  related: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "idealna-temperatura-klime-poleti",
    title: "Idealna temperatura klime poleti",
    metaTitle: "Idealna temperatura klime poleti",
    metaDescription:
      "Katera temperatura klimatske naprave je poleti prijetna, zakaj prenizka nastavitev ni nujno boljša in kako klimo uporabljati udobneje.",
    excerpt:
      "Idealna temperatura klime poleti je 24 do 26 °C. Preverite, zakaj prenizka nastavitev ni nujno boljša izbira in kako klimo uporabljati udobneje.",
    readingTime: "3 min branja",
    category: "Klimatske naprave",
    image: "/images/nasveti/idealna-temperatura-klime-poleti.webp",
    imageAlt:
      "Svetla sodobna dnevna soba s stensko klimatsko napravo nad televizorjem.",
    intro: [
      "Poleti je prva reakcija ob vročini pogosto ta, da klimo nastavimo na najnižjo možno temperaturo. Občutek je sicer takojšen, prijeten pa navadno ni dolgo.",
      "V praksi se večina ljudi najbolje počuti pri nastavitvi med 24 in 26 °C, pri čemer je pomembna tudi razlika glede na temperaturo zunaj.",
    ],
    sections: [
      {
        heading: "Zakaj nižje ni vedno bolje",
        body: [
          "Klimatska naprava prostor ohlaja postopoma. Če jo nastavite na 18 °C, se prostor ne ohladi hitreje, temveč naprava dlje časa deluje z višjo močjo in cilj prekorači.",
          "Velika razlika med zunanjo in notranjo temperaturo je za telo tudi neprijetna. Ob vsakem izhodu iz prostora se občutek toplote vrne močneje, marsikdo pa ob prehodih občuti tudi suha usta, glavobol ali napete mišice.",
        ],
      },
      {
        heading: "Kako nastaviti klimo, da je bivanje prijetno",
        body: [
          "Namesto ene same nastavitve je bolje pogledati celotno sliko: kam piha zrak, kaj se dogaja z okni in kdaj naprava sploh deluje.",
        ],
        list: [
          "Nastavite temperaturo med 24 in 26 °C in ji dajte čas, da se prostor izenači.",
          "Izogibajte se stalnemu neposrednemu pihanju v posteljo ali sedežno garnituro.",
          "Med hlajenjem imejte okna in vrata zaprta, sicer naprava hladi tudi zunanji zrak.",
          "Podnevi zasenčite okna z rolojem ali senčilom, da prostor sploh ne prejme toliko toplote.",
          "Ponoči je nekaterim prijetnejši nočni način, ki temperaturo počasi dvigne.",
        ],
      },
      {
        heading: "Čisti filtri so pogoj za dober občutek",
        body: [
          "Zamašeni filtri zmanjšajo pretok zraka, zato prostor kljub pravilni nastavitvi ostane premalo ohlajen, naprava pa deluje dlje.",
          "Filtre v sezoni redno pregledujte in čistite po navodilih proizvajalca. Notranjost naprave, izmenjevalnik in odtok kondenza pa sodijo v redni servis.",
        ],
      },
    ],
    conclusion:
      "Prijetna temperatura poleti je torej stvar razumne nastavitve, razporeditve zraka in vzdrževane naprave. Če vam prostor kljub temu ostaja pretopel ali klima deluje neenakomerno, se splača preveriti moč naprave in njeno stanje.",
    cta: "klima",
    related: [
      "kam-namestiti-notranjo-enoto-klime",
      "ogrevanje-s-klimo-pozimi",
      "split-ali-multi-split-klima",
    ],
  },
  {
    slug: "kam-namestiti-notranjo-enoto-klime",
    title: "Kam namestiti notranjo enoto klime",
    metaTitle: "Kam namestiti notranjo enoto klime",
    metaDescription:
      "Kaj upoštevati pri položaju notranje enote klimatske naprave in katerim pogostim napakam se je dobro izogniti pred montažo.",
    excerpt:
      "Kaj je treba upoštevati pri položaju notranje enote in katerim pogostim napakam se je dobro izogniti pred montažo.",
    readingTime: "4 min branja",
    category: "Klimatske naprave",
    image: "/images/nasveti/kam-namestiti-notranjo-enoto-klime.webp",
    imageAlt:
      "Stenska notranja enota klimatske naprave, nameščena visoko na steni sodobne dnevne sobe.",
    intro: [
      "Položaj notranje enote je odločitev, ki jo pozneje težko popravite. Vpliva na razporeditev zraka, na občutek udobja v prostoru in na to, kako preprosto je napravo vzdrževati.",
      "Spodaj je pregled dejavnikov, ki jih je smiselno premisliti, preden se monter loti dela.",
    ],
    sections: [
      {
        heading: "Razporeditev zraka po prostoru",
        body: [
          "Notranja enota naj zrak razpihuje po najdaljši osi prostora, brez ovir tik pred njo. Omara, visoka polica ali spuščen strop pred napravo zrak zaustavijo in prostor se ohlaja neenakomerno.",
          "Prav tako ni dobro, če enota piha naravnost v steno nekaj korakov stran. Zrak se mora imeti kam razliti, sicer se hladi predvsem tisti del prostora, kjer nikogar ni.",
        ],
      },
      {
        heading: "Kje ljudje sedijo in spijo",
        body: [
          "Stalen neposreden curek hladnega zraka v posteljo, za pisalno mizo ali v sedežno garnituro je najpogostejši razlog za nezadovoljstvo po montaži.",
          "Kjer je izvedljivo, enoto postavite tako, da glavni tok zraka poteka mimo teh mest, ne čeznje. Lopatice sicer smer nekoliko popravijo, celotne postavitve pa ne morejo nadomestiti.",
        ],
      },
      {
        heading: "Dostop, kondenz in povezava z zunanjo enoto",
        body: [
          "Ob položaju je treba premisliti tudi tehnični del, ki ga uporabnik opazi šele pozneje.",
        ],
        list: [
          "Do filtrov in ohišja mora biti mogoče priti brez razstavljanja pohištva.",
          "Kondenz mora imeti urejen in dovolj strm odtok, sicer se pojavijo kapljanje in vlažne sledi.",
          "Povezava do zunanje enote naj bo čim krajša in razumno speljana.",
          "Zunanja enota potrebuje prostor za nemoten pretok zraka in dostop za servis.",
          "Upoštevati je treba potek elektrike in nosilnost stene.",
        ],
      },
      {
        heading: "Pred montažo se posvetujte",
        body: [
          "Vsak prostor je drugačen: lega, steklene površine, razporeditev pohištva in način uporabe se seštejejo v odločitev, ki je na papirju ni mogoče posplošiti.",
          "Zato položaj enote pred montažo potrdite z monterjem. Ogled ali svetovanje na daljavo je za to dovolj in vas k ničemur ne obvezuje.",
        ],
      },
    ],
    conclusion:
      "Dobro izbran položaj notranje enote se pozna vsak dan: zrak je enakomerno razporejen, naprava je dostopna za vzdrževanje, hladen curek pa ne piha tja, kjer sedite.",
    cta: "klima",
    related: [
      "split-ali-multi-split-klima",
      "idealna-temperatura-klime-poleti",
      "ogrevanje-s-klimo-pozimi",
    ],
  },
  {
    slug: "split-ali-multi-split-klima",
    title: "Split ali multi-split klima",
    metaTitle: "Split ali multi-split klima",
    metaDescription:
      "Razlike med split in multi-split sistemom ter kaj upoštevati pri izbiri rešitve za enega ali več prostorov.",
    excerpt:
      "Ključne razlike med sistemoma ter kaj je smiselno upoštevati pri izbiri rešitve za enega ali več prostorov.",
    readingTime: "4 min branja",
    category: "Klimatske naprave",
    image: "/images/nasveti/split-ali-multi-split-klima.webp",
    imageAlt:
      "Zunanja enota klimatskega sistema ob steni sodobne stanovanjske hiše.",
    intro: [
      "Pri izbiri klimatske naprave se pogosto pojavi vprašanje, ali je bolje postaviti več samostojnih sistemov ali enega, ki oskrbuje več prostorov.",
      "Odgovor ni univerzalen. Odvisen je od števila prostorov, od zasnove objekta in od tega, kako želite sistem uporabljati.",
    ],
    sections: [
      {
        heading: "Kaj je split in kaj multi-split",
        body: [
          "Split sistem sestavljata ena notranja in ena zunanja enota. Je najpogostejša rešitev za posamezen prostor, na primer za dnevno sobo ali spalnico.",
          "Multi-split sistem pomeni več združljivih notranjih enot, priključenih na eno zunanjo enoto. Vsak prostor ima svojo notranjo enoto, zunanja enota pa je skupna.",
        ],
      },
      {
        heading: "Kaj upoštevati pri izbiri",
        body: [
          "Odločitev je najlažje sprejeti, če pogledate nekaj konkretnih točk namesto splošne primerjave.",
        ],
        list: [
          "Število prostorov: pri enem prostoru je split običajno preprostejša pot.",
          "Videz fasade: multi-split zahteva le eno zunanjo enoto namesto več.",
          "Zahtevnost montaže: multi-split pomeni daljše in bolj premišljeno speljane inštalacije.",
          "Prilagodljivost: pri ločenih split sistemih je vsak prostor povsem samostojen.",
          "Postopno urejanje: sistemi se ne dodajajo poljubno, zato je smiselno vnaprej predvideti končno zasnovo.",
          "Servis in vzdrževanje: pri multi-splitu je zunanja enota ena sama, kar poenostavi dostop.",
        ],
      },
      {
        heading: "Nobena od rešitev ni boljša sama po sebi",
        body: [
          "Za eno sobo je split praviloma najbolj neposredna izbira. Kjer je treba urediti več prostorov in je pomembno, koliko naprav visi na fasadi, se multi-split pogosto izkaže kot bolj urejena rešitev.",
          "Za dokončno odločitev je treba pogledati tloris, lego prostorov in predvideno uporabo, zato je pregled pred nakupom bolj smiseln kot primerjava po tehničnih listih.",
        ],
      },
    ],
    conclusion:
      "Split in multi-split rešujeta isto nalogo na dva različna načina. Katera je prava za vas, se pokaže šele ob konkretnem objektu in načrtu, koliko prostorov želite urediti.",
    cta: "klima",
    related: [
      "kam-namestiti-notranjo-enoto-klime",
      "ogrevanje-s-klimo-pozimi",
      "idealna-temperatura-klime-poleti",
    ],
  },
  {
    slug: "ogrevanje-s-klimo-pozimi",
    title: "Ogrevanje s klimo pozimi",
    metaTitle: "Ogrevanje s klimo pozimi",
    metaDescription:
      "Kako klimatska naprava deluje pri ogrevanju in kaj je dobro vedeti, če jo želite uporabljati tudi v hladnejših mesecih.",
    excerpt:
      "Kako klimatska naprava deluje pri ogrevanju in kaj je dobro vedeti, če jo želite uporabljati tudi v hladnejših mesecih.",
    readingTime: "4 min branja",
    category: "Klimatske naprave",
    image: "/images/nasveti/ogrevanje-s-klimo-pozimi.webp",
    imageAlt:
      "Sodobna dnevna soba z zagrnjenimi zavesami in stensko klimatsko napravo v hladnem delu leta.",
    intro: [
      "Sodobne klimatske naprave znajo delovati v obe smeri. Poleti prostor ohlajajo, pozimi pa lahko toploto prenašajo v nasprotno smer in prostor ogrevajo.",
      "Koliko je taka uporaba smiselna, je odvisno od naprave, prostora in razmer zunaj.",
    ],
    sections: [
      {
        heading: "Kako naprava ogreva",
        body: [
          "Klimatska naprava toplote ne ustvarja tako kot električni grelnik, temveč jo prenaša. Pozimi jo odvzema zunanjemu zraku in jo oddaja v prostor.",
          "Prav zato je zmogljivost pri ogrevanju odvisna od zunanjih razmer. Nižja kot je temperatura zunaj, več dela ima naprava, občasno pa mora zunanjo enoto tudi odtaliti.",
        ],
      },
      {
        heading: "Kdaj je ogrevanje s klimo smiselno",
        body: [
          "V dobro izoliranih in pravilno dimenzioniranih prostorih je klima lahko udoben vir toplote, predvsem v prehodnih mesecih ali kot dopolnitev obstoječega ogrevanja.",
          "Pri starejših, slabše izoliranih objektih ali pri zelo nizkih zunanjih temperaturah je pričakovanja treba prilagoditi. Ali naprava lahko prevzame glavnino ogrevanja, je vprašanje konkretnega objekta.",
        ],
        list: [
          "Naprava mora biti primerne moči za prostor.",
          "Izolacija in steklene površine pomembno vplivajo na rezultat.",
          "Zunanja enota mora imeti prost pretok zraka in urejen odtok kondenza.",
          "Filtri morajo biti čisti tudi v kurilni sezoni.",
          "Smiselno je izbrati nastavitev, ki jo pustite delovati enakomerno, namesto stalnega vklapljanja in izklapljanja.",
        ],
      },
      {
        heading: "Pravilna izbira moči je ključna",
        body: [
          "Premajhna naprava pozimi ne bo dosegla želene temperature, prevelika pa deluje v kratkih ciklih in prostor ogreva neenakomerno.",
          "Zato je moč smiselno določiti glede na prostor in način uporabe, ne le glede na kvadraturo. Za prvo oceno lahko uporabite izračun moči, natančno priporočilo pa pripravimo ob svetovanju.",
        ],
      },
    ],
    conclusion:
      "Klimatska naprava je lahko koristen vir toplote, če je pravilno izbrana in vzdrževana. Kaj lahko pričakujete v vašem primeru, je najlažje ugotoviti ob pregledu prostora.",
    cta: "klima",
    related: [
      "idealna-temperatura-klime-poleti",
      "split-ali-multi-split-klima",
      "kam-namestiti-notranjo-enoto-klime",
    ],
  },
  {
    slug: "zakaj-pomivalni-stroj-ne-pomiva-dobro",
    title: "Zakaj pomivalni stroj ne pomiva dobro",
    metaTitle: "Zakaj pomivalni stroj ne pomiva dobro",
    metaDescription:
      "Najpogostejši vzroki, zakaj posoda iz pomivalnega stroja ni čista, in kaj lahko preverite sami, preden pokličete servis.",
    excerpt:
      "Najpogostejši vzroki so umazani filtri, nepravilna uporaba detergenta, razporeditev posode in pomanjkljivo vzdrževanje.",
    readingTime: "3 min branja",
    category: "Bela tehnika",
    image: "/images/nasveti/zakaj-pomivalni-stroj-ne-pomiva-dobro.webp",
    imageAlt:
      "Odprt vgradni pomivalni stroj v čisti sodobni kuhinji.",
    intro: [
      "Ko posoda iz pomivalnega stroja pride motna ali z ostanki hrane, je vzrok pogosto v vzdrževanju ali uporabi, ne v okvari.",
      "Preden pokličete servis, je smiselno preveriti nekaj stvari, ki jih lahko naredite sami.",
    ],
    sections: [
      {
        heading: "Kaj preveriti najprej",
        body: [
          "Naslednje točke pokrijejo večino primerov, ko stroj pomiva slabše, kot je nekoč.",
        ],
        list: [
          "Filter na dnu: odstranite ga in operite pod tekočo vodo, saj ga ostanki hitro zamašijo.",
          "Brizgalne roke: preverite, ali se prosto vrtijo in ali so odprtine prehodne.",
          "Razporeditev posode: velike krožniki in pekači lahko zasenčijo curek vode do ostale posode.",
          "Detergent in sredstvo za izpiranje: preverite odmerek, sol in stanje posodice.",
          "Program: hitri programi so namenjeni manj umazani posodi.",
        ],
      },
      {
        heading: "Motna posoda ni vedno umazana posoda",
        body: [
          "Bel poprh na kozarcih pogosto ni ostanek hrane, temveč posledica trdote vode in nastavitev mehčalnega sistema.",
          "Preverite raven soli in nastavitev trdote vode po navodilih proizvajalca. Marsikdaj se rezultat opazno izboljša že s tem.",
        ],
      },
      {
        heading: "Kdaj je smiselno poklicati servis",
        body: [
          "Če ste zgornje preverili in se stanje ne izboljša, gre lahko za slabši dotok ali odtok vode, obrabljene sestavne dele ali napako na napravi.",
          "V takem primeru stroja ne razstavljajte sami. Opišite nam, kaj se dogaja, in kdaj se težava pojavi, pa bomo napravo pregledali.",
        ],
      },
    ],
    conclusion:
      "Redno čiščenje filtra, pravilno odmerjen detergent in premišljeno zložena posoda odpravijo večino težav. Če ostane, je čas za servisni pregled.",
    cta: "aparat",
    related: [
      "napake-pri-uporabi-susilnega-stroja",
      "idealna-temperatura-klime-poleti",
      "kam-namestiti-notranjo-enoto-klime",
    ],
  },
  {
    slug: "napake-pri-uporabi-susilnega-stroja",
    title: "Najpogostejše napake pri uporabi sušilnega stroja",
    metaTitle: "Najpogostejše napake pri uporabi sušilnega stroja",
    metaDescription:
      "Pogoste napake pri uporabi in vzdrževanju sušilnega stroja, ki zmanjšajo učinkovitost sušenja in po nepotrebnem obremenjujejo napravo.",
    excerpt:
      "Pogoste napake pri uporabi in vzdrževanju, ki lahko zmanjšajo učinkovitost sušenja in obremenjujejo napravo.",
    readingTime: "4 min branja",
    category: "Bela tehnika",
    image: "/images/nasveti/napake-pri-uporabi-susilnega-stroja.webp",
    imageAlt:
      "Sušilni stroj nad pralnim strojem v vgradni omari sodobne pralnice.",
    intro: [
      "Sušilni stroj je naprava, pri kateri se navade hitro poznajo. Perilo se suši dlje, program se konča z vlažnim perilom, poraba pa naraste.",
      "Večino teh težav povzroči nekaj ponavljajočih se napak.",
    ],
    sections: [
      {
        heading: "Prepolni boben in nesortirano perilo",
        body: [
          "Prenatrpan boben je najpogostejša napaka. Perilo se ne more prosto obračati, topel zrak ne pride povsod in program se konča z neenakomerno posušenim perilom.",
          "Prav tako se splača perilo ločiti po vrsti in debelini. Brisače in tanke majice se ne posušijo v istem času, zato bo ena skupina vedno prevlažna ali presušena.",
        ],
      },
      {
        heading: "Filter in pretok zraka",
        body: [
          "Filter za muke se polni pri vsakem sušenju. Če ga ne očistite redno, se pretok zraka zmanjša, sušenje traja dlje, naprava pa dela pod večjo obremenitvijo.",
          "Pri kondenzacijskih in toplotno črpalnih strojih je treba po navodilih proizvajalca skrbeti tudi za posodo za vodo in dodatne filtre.",
        ],
        list: [
          "Filter očistite po vsakem sušenju.",
          "Posodo za kondenz redno praznite.",
          "Prostor okoli naprave naj bo zračen in ne pretesen.",
          "Prezračevalne odprtine naj ne bodo zakrite.",
        ],
      },
      {
        heading: "Napačen program in premalo ožeto perilo",
        body: [
          "Program izberite glede na vrsto perila, ne le glede na čas. Občutljivi programi so namenjeni nižjim temperaturam in daljšemu, nežnejšemu sušenju.",
          "Če perilo iz pralnega stroja pride slabo ožeto, sušilni stroj opravi delo, ki bi ga moralo opraviti ožemanje. Sušenje se podaljša, poraba pa se poveča.",
        ],
      },
      {
        heading: "Kdaj poklicati servis",
        body: [
          "Če naprava kljub pravilni uporabi ne suši, se prekomerno segreva, javlja napako ali se program ne izvede do konca, notranjosti ne odpirajte sami.",
          "Opišite nam znake in morebitno kodo napake, napravo pa bomo pregledali in vam povedali, kaj je smiselno.",
        ],
      },
    ],
    conclusion:
      "Manjše naklade, čist filter, prost pretok zraka in pravi program naredijo največ. Ko to ne zaleže, gre navadno za napako, ki sodi v servis.",
    cta: "aparat",
    related: [
      "zakaj-pomivalni-stroj-ne-pomiva-dobro",
      "idealna-temperatura-klime-poleti",
      "ogrevanje-s-klimo-pozimi",
    ],
  },
];

export const ARTICLE_BY_SLUG = new Map(
  ARTICLES.map((article) => [article.slug, article]),
);

export function articleHref(slug: string) {
  return `/nasveti/${slug}`;
}

/** Related articles in the order the article declares, unknown slugs dropped. */
export function getRelatedArticles(article: Article) {
  return article.related
    .map((slug) => ARTICLE_BY_SLUG.get(slug))
    .filter((related): related is Article => Boolean(related))
    .filter((related) => related.slug !== article.slug);
}
