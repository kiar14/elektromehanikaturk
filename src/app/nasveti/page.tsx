import type { Metadata } from "next";

import { ArticleCard } from "@/components/nasveti/ArticleCard";
import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/actions";
import { ARTICLES, articleHref } from "@/content/nasveti";
import { ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE, SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Nasveti in koristne informacije",
  description:
    "Praktični nasveti za uporabo, izbiro in vzdrževanje klimatskih naprav ter gospodinjskih aparatov. Elektromehanika Turk, Otočec.",
  alternates: { canonical: "/nasveti" },
};

export default function AdvicePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Nasveti", path: "/nasveti" },
  ]);

  // ItemList rather than Blog: there are no publication dates to claim,
  // and a list of articles is exactly what the page is.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nasveti in koristne informacije",
    itemListElement: ARTICLES.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: new URL(articleHref(article.slug), SITE.url).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />

      <PageHero
        eyebrow="NASVETI"
        title="Nasveti in koristne informacije"
        lead="Praktični nasveti za uporabo, izbiro in vzdrževanje klimatskih naprav ter gospodinjskih aparatov."
        breadcrumbs={[{ label: "Domov", href: "/" }, { label: "Nasveti" }]}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {ARTICLES.map((article, index) => (
              <li key={article.slug} className="flex" data-reveal>
                {/* Only the first card is fetched eagerly. Preloading the
                    whole grid would cost six requests to save one. */}
                <ArticleCard article={article} priority={index === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InnerCta
        title="Potrebujete nasvet za svojo napravo?"
        body="Povejte nam, kaj urejate ali kaj ne deluje, in predlagali bomo naslednji korak."
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
