import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/nasveti/ArticleCard";
import { ArticleCta } from "@/components/nasveti/ArticleCta";
import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/actions";
import {
  ARTICLES,
  ARTICLE_BY_SLUG,
  articleHref,
  getRelatedArticles,
} from "@/content/nasveti";
import { ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE, SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLE_BY_SLUG.get(slug);

  if (!article) notFound();

  const canonical = articleHref(article.slug);

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonical,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLE_BY_SLUG.get(slug);

  if (!article) notFound();

  const path = articleHref(article.slug);
  const related = getRelatedArticles(article);
  const isClimate = article.category === "Klimatske naprave";

  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Nasveti", path: "/nasveti" },
    { name: article.title, path },
  ]);

  // No author person, no publication date, no rating — none of those are
  // verified for this content, and Article does not require them.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    articleSection: article.category,
    inLanguage: "sl-SI",
    url: new URL(path, SITE.url).toString(),
    mainEntityOfPage: new URL(path, SITE.url).toString(),
    image: new URL(article.image, SITE.url).toString(),
    author: { "@id": `${SITE.url}/#organizacija` },
    publisher: { "@id": `${SITE.url}/#organizacija` },
  };

  return (
    <>
      <JsonLd data={[breadcrumb, articleSchema]} />

      <PageHero
        eyebrow="NASVETI"
        title={article.title}
        lead={article.excerpt}
        breadcrumbs={[
          { label: "Domov", href: "/" },
          { label: "Nasveti", href: "/nasveti" },
          { label: article.title },
        ]}
        actions={
          <p className="text-[0.875rem] text-ink-4">{article.readingTime}</p>
        }
        className="pb-10 sm:pb-12 lg:pb-14"
      />

      <article className="pb-4">
        <div className="shell">
          <div className="mx-auto mt-12 max-w-[68rem] sm:mt-14">
            {/* 3:2 everywhere — the same ratio the assets are built at.
                A wider hero crop would clip the appliance out of the top
                of several of these photographs. */}
            <div className="page-hero-enter relative aspect-[3/2] overflow-hidden rounded-[12px] bg-mist shadow-[0_22px_60px_-42px_rgba(18,21,26,0.55)]">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                quality={82}
                sizes="(min-width: 1088px) 68rem, 92vw"
                className="object-cover"
                style={{ objectPosition: article.imagePosition }}
              />
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[68ch] sm:mt-14">
            {article.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-2 first:mt-0"
              >
                {paragraph}
              </p>
            ))}

            {article.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-[1.625rem] leading-[1.15] sm:text-[1.875rem]">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-2"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-6 grid gap-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-6 text-[1.0625rem] leading-[1.7] text-ink-2 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-brand before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <ArticleCta kind={article.cta} />

            <p className="text-[1.0625rem] leading-[1.75] text-ink-2">
              {article.conclusion}
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="shell">
            <h2 className="text-[1.75rem] leading-[1.1] sm:text-[2.125rem]" data-reveal>
              Preberite tudi
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {related.map((item) => (
                <li key={item.slug} className="flex" data-reveal>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {isClimate ? (
        <InnerCta
          title="Kakšno moč klimatske naprave potrebujete?"
          body="Vnesite podatke o prostoru in preverite okvirno priporočeno moč, nato pa se dogovorimo za natančnejše priporočilo."
          actions={
            <>
              <ActionLink href={ROUTES.acCalculator} size="lg">
                Izračun moči klime
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
      ) : (
        <InnerCta
          title="Naprava potrebuje servis?"
          body="Opišite težavo prek obrazca ali nas pokličite in dogovorili se bomo za pregled."
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
      )}
    </>
  );
}
