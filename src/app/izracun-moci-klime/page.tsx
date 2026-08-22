import type { Metadata } from "next";

import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { AcPowerCalculator } from "@/components/tools/AcPowerCalculator";
import { ActionLink } from "@/components/ui/actions";
import { ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Izračun moči klimatske naprave",
  description:
    "Vnesite površino in izolacijo prostora ter preverite okvirno priporočeno moč klimatske naprave. Informativni izračun Elektromehanike Turk.",
  alternates: { canonical: "/izracun-moci-klime" },
};

export default function AcPowerCalculatorPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Izračun moči klime", path: "/izracun-moci-klime" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <PageHero
        eyebrow="IZRAČUN MOČI"
        title="Kakšno moč klimatske naprave potrebujete?"
        lead="Vnesite nekaj osnovnih podatkov o prostoru in preverite okvirno priporočeno moč klimatske naprave."
        breadcrumbs={[
          { label: "Domov", href: "/" },
          { label: "Izračun moči klime" },
        ]}
        actions={
          <p className="text-[0.875rem] text-ink-4">
            Izračun je informativen in ne nadomešča strokovnega svetovanja.
          </p>
        }
        className="pb-10 sm:pb-12 lg:pb-14"
      />

      <section className="pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pb-24">
        <div className="shell">
          <p className="max-w-[58rem] text-[1.0625rem] leading-relaxed text-ink-3">
            Velikost prostora je pomembna, vendar na izbiro vplivajo tudi
            izolacija, lega prostora, steklene površine in način uporabe.
          </p>

          <div className="mt-8 sm:mt-10">
            <AcPowerCalculator />
          </div>
        </div>
      </section>

      <InnerCta
        title="Želite natančnejše priporočilo?"
        body="Pri izbiri naprave upoštevamo tudi lego prostora, steklene površine, način uporabe in druge dejavnike."
        actions={
          <>
            <ActionLink href={ROUTES.remoteAdvice} size="lg">
              Svetovanje na daljavo
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
