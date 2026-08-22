import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { PowerCalculator } from "@/components/tools/PowerCalculator";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Izračun moči klime in toplotne črpalke",
  description:
    "Okvirno izračunajte potrebno moč klimatske naprave ali toplotne črpalke ter velikost zalogovnika za sanitarno vodo.",
  alternates: { canonical: "/izracun-moci" },
};

export default function PowerCalculatorPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Izračun moči", path: "/izracun-moci" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageHero
        eyebrow="IZRAČUN"
        title="Izračun potrebne moči"
        lead="Preverite okvirno potrebno moč klimatske naprave ali toplotne črpalke ter velikost zalogovnika za sanitarno vodo."
        breadcrumbs={[
          { label: "Domov", href: "/" },
          { label: "Izračun moči" },
        ]}
        actions={
          <p className="max-w-[44rem] text-[0.875rem] leading-relaxed text-ink-4">
            Izračun je informativen in ne nadomešča strokovnega dimenzioniranja.
          </p>
        }
        className="pb-11 sm:pb-14 lg:pb-16"
      />

      <section className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
        <div className="shell">
          <div className="mx-auto max-w-[64rem]">
            <PowerCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
