import type { Metadata } from "next";

import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/actions";
import { ROUTES } from "@/lib/navigation";
import { breadcrumbSchema } from "@/lib/structured-data";
import { PRIMARY_PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cenik osnovnih storitev",
  description:
    "Cenik osnovnih storitev servisa in vzdrževanja klimatskih naprav ter bele tehnike Elektromehanike Turk.",
  alternates: { canonical: "/cenik" },
};

const SERVICE_PRICES: {
  title: string;
  price: string;
  oldPrice?: string;
}[] = [
  {
    title: "Osnovni servis klimatske naprave",
    price: "55,00 €",
    oldPrice: "65,00 €",
  },
  {
    title: "Temeljiti servis klimatske naprave",
    price: "85,00 €",
    oldPrice: "100,00 €",
  },
  {
    title: "Servis dodatne notranje enote",
    price: "30,00 €",
  },
];

type PriceRow = {
  service: string;
  net: string;
  tax: string;
  gross: string;
};

const PRICE_GROUPS: { title: string; rows: PriceRow[] }[] = [
  {
    title: "Diagnostika",
    rows: [
      {
        service:
          "Pregled delovanja aparata, diagnosticiranje okvare, mali aparati (bela tehnika)",
        net: "14,00 €",
        tax: "3,08 €",
        gross: "17,08 €",
      },
      {
        service:
          "Pregled delovanja aparata, diagnosticiranje okvare, veliki aparati (bela tehnika)",
        net: "25,00 €",
        tax: "5,50 €",
        gross: "30,50 €",
      },
    ],
  },
  {
    title: "Bela tehnika, veliki gospodinjski aparati",
    rows: [
      {
        service: "Veliko popravilo (zamenjava kompresorja, bobna, ležajev)",
        net: "75,00 €",
        tax: "16,50 €",
        gross: "91,50 €",
      },
      {
        service: "Srednje zahtevno popravilo",
        net: "65,00 €",
        tax: "14,30 €",
        gross: "79,30 €",
      },
      {
        service: "Malo popravilo",
        net: "45,00 €",
        tax: "9,90 €",
        gross: "54,90 €",
      },
      {
        service: "Nezahtevno popravilo",
        net: "35,00 €",
        tax: "7,70 €",
        gross: "42,70 €",
      },
    ],
  },
  {
    title: "Bela tehnika, mali gospodinjski aparati",
    rows: [
      { service: "Popravilo, malo", net: "25,00 €", tax: "5,50 €", gross: "30,50 €" },
      { service: "Popravilo, veliko", net: "35,00 €", tax: "7,70 €", gross: "42,70 €" },
    ],
  },
];

export default function PricingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Cenik", path: "/cenik" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHero
        title="Cenik osnovnih storitev"
        lead="Cene osnovnih storitev servisa in vzdrževanja. Za nakup naprave z montažo veljajo cene iz trgovine."
        breadcrumbs={[{ label: "Domov", href: "/" }, { label: "Cenik" }]}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-3" data-reveal>
            {SERVICE_PRICES.map((item) => (
              <article
                key={item.title}
                className="flex min-h-52 flex-col rounded-[12px] border border-line-2 bg-paper p-6 sm:p-7"
              >
                <h2 className="text-[1.25rem] leading-snug">{item.title}</h2>
                <div className="mt-auto pt-8">
                  <p className="nums text-[2rem] leading-none font-semibold text-ink">
                    {item.price}
                  </p>
                  {item.oldPrice ? (
                    <p className="nums mt-2 text-sm text-ink-4 line-through">
                      {item.oldPrice}
                    </p>
                  ) : (
                    <span className="mt-2 block h-5" aria-hidden="true" />
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-14 sm:mt-20 lg:mt-24 lg:gap-20">
            {PRICE_GROUPS.map((group) => (
              <PriceTable key={group.title} title={group.title} rows={group.rows} />
            ))}
          </div>

          <p className="mt-14 max-w-[52rem] border-l-2 border-brand pl-5 text-[0.9375rem] leading-relaxed text-ink-3 sm:mt-16">
            Cene ne vključujejo nadomestnih delov in prihoda na lokacijo. Za
            ponudbo pokličite{" "}
            <a
              href={`tel:${PRIMARY_PHONE.tel}`}
              className="nums font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-brand"
            >
              {PRIMARY_PHONE.label}
            </a>
            .
          </p>
        </div>
      </section>

      <InnerCta
        title="Potrebujete servis?"
        body="Povejte nam, kaj ne dela."
        actions={
          <>
            <ActionLink href={ROUTES.booking} size="lg">
              Naroči servis
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

function PriceTable({ title, rows }: { title: string; rows: PriceRow[] }) {
  return (
    <section className="min-w-0" data-reveal>
      <h2 className="text-[1.75rem] leading-tight sm:text-[2.125rem]">{title}</h2>
      <div className="mt-7 w-full max-w-full overflow-x-auto rounded-[12px] border border-line-2 bg-paper">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <thead className="bg-mist/70 text-[0.75rem] font-semibold tracking-[0.08em] text-ink-3 uppercase">
            <tr>
              <th scope="col" className="w-[52%] px-5 py-4 sm:px-6">
                Storitev
              </th>
              <th scope="col" className="px-4 py-4 text-right whitespace-nowrap">
                Cena brez DDV
              </th>
              <th scope="col" className="px-4 py-4 text-right whitespace-nowrap">
                DDV 22%
              </th>
              <th scope="col" className="px-5 py-4 text-right whitespace-nowrap sm:px-6">
                Cena z DDV
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.service} className={index > 0 ? "border-t border-line" : undefined}>
                <th
                  scope="row"
                  className="px-5 py-5 text-[0.9375rem] leading-relaxed font-medium text-ink-2 sm:px-6"
                >
                  {row.service}
                </th>
                <td className="nums px-4 py-5 text-right text-[0.9375rem] whitespace-nowrap text-ink-3">
                  {row.net}
                </td>
                <td className="nums px-4 py-5 text-right text-[0.9375rem] whitespace-nowrap text-ink-3">
                  {row.tax}
                </td>
                <td className="nums px-5 py-5 text-right text-[0.9375rem] font-semibold whitespace-nowrap text-ink sm:px-6">
                  {row.gross}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
