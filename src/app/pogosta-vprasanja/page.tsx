import type { Metadata } from "next";

import { FaqAccordion, type FaqItem } from "@/components/faq/FaqAccordion";
import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/actions";
import { breadcrumbSchema } from "@/lib/structured-data";
import { PRIMARY_PHONE } from "@/lib/site";
import { getMeaningfulFaqItems } from "@/lib/faq";
import { socialMetadata } from "@/lib/metadata";

export const metadata: Metadata = socialMetadata({
  title: "Pogosta vprašanja",
  description:
    "Odgovori na pogosta vprašanja o servisu, nakupu, plačilu, dostavi, montaži in svetovanju Elektromehanike Turk.",
  path: "/pogosta-vprasanja",
});

const FAQS: FaqItem[] = [
  {
    question: "Kako vas lahko dosežemo?",
    answer:
      "V delovnem času nas lahko obiščete v poslovalnici ali pokličete na katero koli telefonsko številko, objavljeno na spletni strani. Izven delovnega časa smo dosegljivi po elektronski pošti, prek spletnega obrazca za povpraševanje ali pa si rezervirate termin za svetovanje na daljavo.",
  },
  {
    question: "Ali nas ogled ali svetovanje na daljavo obvezuje k nakupu?",
    answer:
      "Ne. Ogled ali svetovanje nam omogoča, da pripravimo ponudbo za pravo napravo, nikakor pa vas ne obvezuje k nakupu.",
  },
  {
    question:
      "Obrazec za rezervacijo svetovanja zahteva veliko podatkov. Lahko rezerviramo termin brez njih?",
    answer:
      "Seveda. Vsi podatki v obrazcu so informativni. Če odgovorov ne poznate, si termin še vedno lahko rezervirate.",
  },
  {
    question: "Kakšne načine plačila sprejemate?",
    answer:
      "Sprejemamo gotovino, kartice, nakazilo na transakcijski račun in obročno plačilo prek partnerja LeanPay.",
  },
  {
    question: "Ali nudite tudi dostavo in montažo naprav, kupljenih pri vas?",
    answer:
      "Da. Vse naprave, ki jih kupite pri nas, vam lahko tudi dostavimo in montiramo.",
  },
  {
    question: "Katera območja pokrivate?",
    answer:
      "Dolenjsko, Belo krajino in Posavje. Novo mesto, Otočec, Šentjernej, Trebnje, Krško, Brežice, Sevnica in okolico.",
  },
];

export default function FaqPage() {
  const faqs = getMeaningfulFaqItems(FAQS);
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Pogosta vprašanja", path: "/pogosta-vprasanja" },
  ]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, faqSchema]} />
      <PageHero
        title="Pogosta vprašanja"
        lead="Odgovori na najpogostejša vprašanja o servisu, nakupu, dostavi in svetovanju."
        breadcrumbs={[
          { label: "Domov", href: "/" },
          { label: "Pogosta vprašanja" },
        ]}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="shell">
          <div className="mx-auto max-w-[62rem]" data-reveal>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <InnerCta
        title="Niste našli odgovora?"
        actions={
          <>
            <ActionLink href="/kontakt" size="lg">
              Kontaktirajte nas
            </ActionLink>
            <ActionLink
              href={`tel:${PRIMARY_PHONE.tel}`}
              variant="onInk"
              size="lg"
              className="nums"
            >
              {PRIMARY_PHONE.label}
            </ActionLink>
          </>
        }
      />
    </>
  );
}
