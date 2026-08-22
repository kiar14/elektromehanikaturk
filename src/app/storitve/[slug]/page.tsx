import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { SERVICE_PAGE_BY_SLUG, SERVICE_PAGES } from "@/content/storitve";
import { getMeaningfulFaqItems } from "@/lib/faq";
import { socialMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGE_BY_SLUG.get(slug);

  if (!service) notFound();

  const canonical = `/storitve/${service.slug}`;

  return socialMetadata({
    title: service.title,
    description: service.metaDescription,
    path: canonical,
    image: { url: service.image, alt: service.alt },
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_PAGE_BY_SLUG.get(slug);

  if (!service) notFound();

  const path = `/storitve/${service.slug}`;
  const faqs = getMeaningfulFaqItems(service.faqs);
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: service.title, path },
  ]);
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: new URL(path, SITE.url).toString(),
    provider: { "@id": `${SITE.url}/#organizacija` },
    areaServed: ["Dolenjska", "Bela krajina", "Posavje"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, faq, serviceSchema]} />
      <ServicePageTemplate service={{ ...service, faqs }} />
    </>
  );
}
