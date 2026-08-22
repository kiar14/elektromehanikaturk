import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { BrandGrid } from "@/components/sections/BrandGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/actions";
import { ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";
import { socialMetadata } from "@/lib/metadata";

export const metadata: Metadata = socialMetadata({
  title: "O nas",
  description:
    "Elektromehanika Turk z Otočca že več kot 20 let skrbi za servis, montažo in prodajo naprav za dom ter profesionalno uporabo.",
  path: "/o-nas",
});

const WORK_LINKS = [
  {
    title: "Klimatske naprave",
    body: "Servis, čiščenje, svetovanje, dobava in montaža.",
    links: [
      { label: "Servis klimatskih naprav", href: "/storitve/servis-klimatskih-naprav" },
      { label: "Montaža klimatskih naprav", href: "/storitve/montaza-klimatskih-naprav" },
    ],
  },
  {
    title: "Bela tehnika",
    body: "Diagnostika in popravila gospodinjskih aparatov.",
    links: [{ label: "Servis bele tehnike", href: "/storitve/servis-bele-tehnike" }],
  },
  {
    title: "Toplotne črpalke",
    body: "Svetovanje, prodaja, montaža in servis sistemov za ogrevanje.",
    links: [{ label: "Toplotne črpalke", href: "/storitve/toplotne-crpalke" }],
  },
  {
    title: "Gostinska in hladilna oprema",
    body: "Oprema in servis za lokale, trgovine ter profesionalne kuhinje.",
    links: [
      { label: "Gostinska in hladilna oprema", href: "/storitve/gostinska-in-hladilna-oprema" },
    ],
  },
];

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "O nas", path: "/o-nas" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        eyebrow="O NAS"
        title="Elektromehanika Turk"
        lead="Servis, montaža in prodaja iz Otočca. Že več kot 20 let."
        breadcrumbs={[{ label: "Domov", href: "/" }, { label: "O nas" }]}
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
            <header data-reveal>
              <p className="eyebrow">Naša zgodba</p>
              <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
                Več kot servis
              </h2>
            </header>
            <div className="max-w-[52rem] space-y-5 text-[1.0625rem] leading-[1.8] text-ink-3" data-reveal>
              <p>
                Elektromehanika Turk ima sedež na naslovu Nad Krko 18 v Otočcu. Že več kot 20 let se ukvarjamo s servisom, montažo in prodajo naprav za udobnejši dom.
              </p>
              <p>
                Pomagamo gospodinjstvom ter uporabnikom gostinske in profesionalne opreme na Dolenjskem, v Beli krajini in Posavju. Na enem mestu povezujemo izbiro naprave, montažo, redno vzdrževanje in servis.
              </p>
            </div>
          </div>

          <dl className="mt-14 grid border-t border-l border-line-2 sm:mt-18 sm:grid-cols-3" data-reveal>
            <div className="border-r border-b border-line-2 p-6 sm:p-7 lg:p-9">
              <dt className="text-[0.75rem] font-medium tracking-[0.12em] text-ink-4 uppercase">let izkušenj</dt>
              <dd className="nums mt-4 text-[2.5rem] leading-none font-semibold text-ink">20+</dd>
            </div>
            <div className="border-r border-b border-line-2 p-6 sm:p-7 lg:p-9">
              <dt className="text-[0.75rem] font-medium tracking-[0.12em] text-ink-4 uppercase">lokalna servisna ekipa</dt>
              <dd className="mt-4 text-[1.75rem] leading-none font-semibold text-ink">Otočec</dd>
            </div>
            <div className="border-r border-b border-line-2 p-6 sm:p-7 lg:p-9">
              <dt className="text-[0.75rem] font-medium tracking-[0.12em] text-ink-4 uppercase">območje storitev</dt>
              <dd className="mt-4 max-w-[18rem] text-[1.25rem] leading-snug font-semibold text-ink">Dolenjska, Bela krajina in Posavje</dd>
            </div>
          </dl>
        </div>
      </section>

      <BrandGrid title="Uradni serviser in prodajalec" />

      <section className="bg-paper py-16 sm:py-20 lg:py-28">
        <div className="shell">
          <header className="max-w-[42rem]" data-reveal>
            <p className="eyebrow">Storitve</p>
            <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">Kaj delamo</h2>
          </header>

          <div className="mt-10 grid border-t border-line-2 lg:grid-cols-2" data-reveal>
            {WORK_LINKS.map((item, index) => (
              <article
                key={item.title}
                className={`border-b border-line-2 py-7 lg:min-h-52 lg:p-8 ${index % 2 === 0 ? "lg:border-r" : ""}`}
              >
                <h3 className="text-[1.375rem] leading-snug">{item.title}</h3>
                <p className="mt-3 max-w-[31rem] text-[0.9375rem] leading-relaxed text-ink-3">{item.body}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-brand"
                    >
                      {link.label}
                      <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InnerCta
        title="Potrebujete servis ali novo napravo?"
        actions={
          <>
            <ActionLink href={ROUTES.booking} size="lg">Naroči servis</ActionLink>
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
