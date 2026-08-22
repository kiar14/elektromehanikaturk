import type { Metadata } from "next";
import { Phone } from "lucide-react";

import { ServiceOrderForm } from "@/components/forms/ServiceOrderForm";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { PRIMARY_PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Naročilo servisa",
  description:
    "Oddajte povpraševanje za servis klimatske naprave, bele tehnike, toplotne črpalke ali gostinske opreme.",
  alternates: { canonical: "/narocilo-servisa" },
};

export default function ServiceOrderPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Naročilo servisa", path: "/narocilo-servisa" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        title="Naročilo servisa"
        lead="Povejte nam, kaj ne dela. Oglasimo se vam glede termina."
        breadcrumbs={[
          { label: "Domov", href: "/" },
          { label: "Naročilo servisa" },
        ]}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="shell">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.85fr)] lg:gap-14 xl:gap-20">
            <div data-reveal>
              <ServiceOrderForm />
            </div>
            <aside className="grid gap-8 lg:sticky lg:top-24" data-reveal>
              <section className="rounded-[12px] border border-line-2 bg-ink p-6 text-on-dark sm:p-7">
                <p className="text-[0.6875rem] font-medium tracking-[0.15em] text-on-dark-2 uppercase">
                  Najhitreje po telefonu
                </p>
                <h2 className="mt-4 text-[1.5rem] leading-snug text-white">
                  Za nujne primere je klic najhitrejši
                </h2>
                <a
                  href={`tel:${PRIMARY_PHONE.tel}`}
                  className="nums mt-6 inline-flex items-center gap-3 text-[1.375rem] font-semibold text-white transition-colors hover:text-brand"
                >
                  <Phone aria-hidden="true" className="size-5 text-brand" />
                  {PRIMARY_PHONE.label}
                </a>
              </section>

              <section className="border-t border-line-2 pt-7">
                <h2 className="text-[1.25rem]">Odpiralni čas</h2>
                <dl className="mt-4 grid gap-2 text-[0.9375rem]">
                  <div className="flex justify-between gap-5"><dt className="text-ink-3">Pon-Pet</dt><dd className="nums font-medium">8:00-16:00</dd></div>
                  <div className="flex justify-between gap-5"><dt className="text-ink-3">Sob</dt><dd className="nums font-medium">8:00-12:00</dd></div>
                  <div className="flex justify-between gap-5"><dt className="text-ink-3">Ned</dt><dd className="font-medium">zaprto</dd></div>
                </dl>
              </section>

              <section className="border-t border-line-2 pt-7">
                <h2 className="text-[1.25rem]">Kako poteka</h2>
                <ol className="mt-5 grid gap-4 text-[0.9375rem] font-medium text-ink-2">
                  <li><span className="nums mr-3 text-brand">1.</span>Oddate povpraševanje</li>
                  <li><span className="nums mr-3 text-brand">2.</span>Uskladimo termin</li>
                  <li><span className="nums mr-3 text-brand">3.</span>Opravimo servis</li>
                </ol>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
