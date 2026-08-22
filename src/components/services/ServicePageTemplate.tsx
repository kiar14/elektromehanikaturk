import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { InnerCta } from "@/components/layout/InnerCta";
import { PageHero } from "@/components/layout/PageHero";
import { BrandGrid } from "@/components/sections/BrandGrid";
import { Process } from "@/components/sections/Process";
import { ProductCard } from "@/components/store/ProductCard";
import { ActionLink, ArrowLink } from "@/components/ui/actions";
import {
  GENERIC_SERVICE_STEPS,
  type ServiceAction,
  type ServicePageData,
  type ServicePricing,
  type ServiceProducts,
} from "@/content/storitve";
import { getMeaningfulFaqItems } from "@/lib/faq";
import { cn } from "@/lib/utils";
import {
  PRODUCT_BY_ID,
  formatPrice,
  getProductsByIds,
  productHref,
} from "@/lib/products";

export function ServicePageTemplate({ service }: { service: ServicePageData }) {
  const includedGroups = service.included
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.trim().length > 0),
    }))
    .filter((group) => group.items.length > 0);
  const brands = service.brands?.filter((brand) => brand.trim().length > 0) ?? [];
  const faqs = getMeaningfulFaqItems(service.faqs);

  // A `shop` pricing block already features one product in full above,
  // so it is dropped from the shortlist rather than shown twice on the
  // same page.
  const featuredProductId =
    service.pricing.mode === "shop" ? service.pricing.productId : null;
  const products = service.products
    ? getProductsByIds(
        service.products.productIds.filter((id) => id !== featuredProductId),
      )
    : [];

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lead={service.lead}
        breadcrumbs={[
          { label: "Domov", href: "/" },
          { label: service.title },
        ]}
        actions={
          <>
            <ServiceActionLink action={service.primaryAction} />
            {service.pricing.mode === "remote" && service.finalCta.secondaryAction ? (
              <ServiceActionLink
                action={service.finalCta.secondaryAction}
                variant="outline"
              />
            ) : null}
          </>
        }
        image={{
          src: service.image,
          alt: service.alt,
          objectPosition: service.imagePosition,
        }}
      />

      {includedGroups.length > 0 ? <IncludedSection groups={includedGroups} /> : null}
      {hasMeaningfulPricing(service.pricing) ? (
        <PricingSection pricing={service.pricing} primaryAction={service.primaryAction} />
      ) : null}

      {products.length > 0 && service.products ? (
        <ProductsSection
          heading={service.products.heading}
          products={products}
        />
      ) : null}

      {brands.length > 0 ? <BrandGrid names={brands} /> : null}

      {service.pricing.mode !== "remote" ? (
        <Process title="Kako poteka" steps={GENERIC_SERVICE_STEPS} />
      ) : null}

      {faqs.length > 0 ? (
        <section className="bg-paper py-16 sm:py-20 lg:py-28">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
              <header data-reveal>
                <p className="eyebrow">Vprašanja</p>
                <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
                  Pogosta vprašanja
                </h2>
              </header>
              <div data-reveal>
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <InnerCta
        title={service.finalCta.title}
        body={service.finalCta.body}
        actions={
          <>
            <ServiceActionLink action={service.primaryAction} size="lg" />
            {service.finalCta.secondaryAction ? (
              <ServiceActionLink
                action={service.finalCta.secondaryAction}
                variant="onInk"
                size="lg"
              />
            ) : null}
          </>
        }
      />
    </>
  );
}

/**
 * A short shelf of store products next to the service, not a category
 * page: at most four cards in a single row, the same `ProductCard` the
 * shop grid uses so price, badge and Add-to-cart behave identically, and
 * one link out to the full catalogue.
 */
function ProductsSection({
  heading,
  products,
}: {
  heading: ServiceProducts["heading"];
  products: ReturnType<typeof getProductsByIds>;
}) {
  const shown = products.slice(0, 4);
  // The catalogue is filtered to the category these products came from,
  // which is the shelf's own subject.
  const shopHref = `/trgovina?kategorija=${encodeURIComponent(
    shown[0].category,
  )}#vsi-izdelki`;

  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4" data-reveal>
          <div>
            <p className="eyebrow">Iz trgovine</p>
            <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
              {heading}
            </h2>
          </div>
          <ArrowLink href={shopHref}>Vsi izdelki v kategoriji</ArrowLink>
        </div>

        <div
          // Column count follows the shortlist so two products do not
          // stretch across a four-column track; the width cap keeps a
          // pair the same size as a full row rather than ballooning.
          className={cn(
            "mt-10 grid gap-5 sm:grid-cols-2",
            shown.length >= 4 && "lg:grid-cols-4",
            shown.length === 3 && "lg:grid-cols-3",
            shown.length === 2 && "max-w-[38rem]",
          )}
          data-reveal
        >
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IncludedSection({ groups }: { groups: ServicePageData["included"] }) {
  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
          <header data-reveal>
            <p className="eyebrow">Obseg storitve</p>
            <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
              Kaj vključuje
            </h2>
          </header>

          <div
            className={groups.length > 1 ? "grid gap-10 md:grid-cols-2 md:gap-12" : undefined}
          >
            {groups.map((group, groupIndex) => (
              <section key={group.label ?? groupIndex} data-reveal>
                {group.label ? (
                  <h3 className="border-b border-line-2 pb-4 text-[1.25rem] leading-snug">
                    {group.label}
                  </h3>
                ) : null}
                <ul className={group.label ? "mt-5 grid gap-4" : "grid gap-4 sm:grid-cols-2 sm:gap-x-10"}>
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2 sm:text-[1rem]">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[5px] bg-brand-soft text-brand">
                        <Check aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function hasMeaningfulPricing(pricing: ServicePricing) {
  if (!pricing.heading.trim()) return false;

  if (pricing.mode === "fixed" || pricing.mode === "range") {
    return pricing.items.some(
      (item) => item.title.trim().length > 0 && item.price.trim().length > 0,
    );
  }

  if (pricing.mode === "remote") {
    return (
      pricing.body.trim().length > 0 &&
      pricing.steps.some((step) => step.title.trim().length > 0)
    );
  }

  return pricing.body.trim().length > 0;
}

function PricingSection({
  pricing,
  primaryAction,
}: {
  pricing: ServicePricing;
  primaryAction: ServiceAction;
}) {
  return (
    <section className="bg-mist/60 py-16 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
          <header data-reveal>
            <p className="eyebrow">
              {pricing.mode === "remote" ? "Brezplačno" : "Cena"}
            </p>
            <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
              {pricing.heading}
            </h2>
          </header>

          <div data-reveal>
            {pricing.mode === "fixed" ? (
              <FixedPricing pricing={pricing} action={primaryAction} />
            ) : null}
            {pricing.mode === "shop" ? <ShopPricing pricing={pricing} /> : null}
            {pricing.mode === "range" ? <RangePricing pricing={pricing} /> : null}
            {pricing.mode === "quote" ? (
              <QuotePricing pricing={pricing} action={primaryAction} />
            ) : null}
            {pricing.mode === "remote" ? (
              <RemotePricing pricing={pricing} action={primaryAction} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function FixedPricing({
  pricing,
  action,
}: {
  pricing: Extract<ServicePricing, { mode: "fixed" }>;
  action: ServiceAction;
}) {
  const items = pricing.items.filter(
    (item) => item.title.trim().length > 0 && item.price.trim().length > 0,
  );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="flex min-h-44 flex-col rounded-[12px] border border-line-2 bg-paper p-5 sm:p-6">
            <h3 className="text-[1.0625rem] leading-snug">{item.title}</h3>
            <div className="mt-auto pt-7">
              <p className="nums text-[1.75rem] leading-none font-semibold text-ink">{item.price}</p>
              {item.oldPrice ? (
                <p className="nums mt-2 text-sm text-ink-4 line-through">{item.oldPrice}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-7 max-w-[50rem] border-l-2 border-brand pl-5 text-[0.9375rem] leading-relaxed text-ink-3">
        {pricing.note}
      </p>
      <div className="mt-7">
        <ServiceActionLink action={action} />
      </div>
    </>
  );
}

function ShopPricing({ pricing }: { pricing: Extract<ServicePricing, { mode: "shop" }> }) {
  const product = PRODUCT_BY_ID.get(pricing.productId);

  return (
    <>
      <p className="max-w-[48rem] text-[1.0625rem] leading-relaxed text-ink-3">{pricing.body}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <ActionLink href="/trgovina">Poglejte trgovino</ActionLink>
      </div>
      {product ? (
        <article className="mt-8 grid overflow-hidden rounded-[12px] border border-line-2 bg-paper sm:grid-cols-[11rem_minmax(0,1fr)]">
          <Link href={productHref(product)} className="relative aspect-[4/3] bg-base sm:aspect-auto">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 640px) 176px, 100vw"
              className="object-contain p-5"
            />
          </Link>
          <div className="flex flex-col justify-center border-t border-line p-5 sm:border-t-0 sm:border-l sm:p-6">
            <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-ink-4 uppercase">{product.brand}</p>
            <h3 className="mt-2 text-[1.125rem] leading-snug">{product.title}</h3>
            <p className="nums mt-3 flex flex-wrap items-baseline gap-2 text-[1.25rem] font-semibold text-ink">
              {formatPrice(product.price)}
              {product.oldPrice ? (
                <span className="text-sm font-normal text-ink-4 line-through">{formatPrice(product.oldPrice)}</span>
              ) : null}
            </p>
            <ArrowLink href={productHref(product)} className="mt-5">
              Poglejte izdelek
            </ArrowLink>
          </div>
        </article>
      ) : null}
    </>
  );
}

function RangePricing({ pricing }: { pricing: Extract<ServicePricing, { mode: "range" }> }) {
  const items = pricing.items.filter(
    (item) => item.title.trim().length > 0 && item.price.trim().length > 0,
  );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-[12px] border border-line-2 bg-paper p-5 sm:p-6">
            <h3 className="text-[1.0625rem] leading-snug">{item.title}</h3>
            <p className="nums mt-6 text-[1.375rem] leading-tight font-semibold text-ink">{item.price}</p>
            {item.detail ? <p className="mt-2 text-sm leading-relaxed text-ink-4">{item.detail}</p> : null}
          </article>
        ))}
      </div>
      <ArrowLink href="/cenik" className="mt-7">Celoten cenik</ArrowLink>
    </>
  );
}

function QuotePricing({
  pricing,
  action,
}: {
  pricing: Extract<ServicePricing, { mode: "quote" }>;
  action: ServiceAction;
}) {
  return (
    <div className="rounded-[12px] border border-line-2 bg-paper p-6 sm:p-8">
      <p className="max-w-[46rem] text-[1.125rem] leading-relaxed text-ink-2">{pricing.body}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <ServiceActionLink action={action} />
        {pricing.secondaryAction ? (
          <ServiceActionLink action={pricing.secondaryAction} variant="outline" />
        ) : null}
      </div>
    </div>
  );
}

function RemotePricing({
  pricing,
  action,
}: {
  pricing: Extract<ServicePricing, { mode: "remote" }>;
  action: ServiceAction;
}) {
  const steps = pricing.steps.filter((step) => step.title.trim().length > 0);

  return (
    <>
      <p className="max-w-[50rem] text-[1.0625rem] leading-relaxed text-ink-3">{pricing.body}</p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-line-2 pt-5">
            <span className="nums text-sm font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-[1.125rem] leading-snug">{step.title}</h3>
          </li>
        ))}
      </ol>
      <p className="mt-8 border-l-2 border-brand pl-5 font-medium text-ink-2">{pricing.note}</p>
      <div className="mt-7">
        <ServiceActionLink action={action} />
      </div>
    </>
  );
}

function ServiceActionLink({
  action,
  variant = "brand",
  size = "md",
}: {
  action: ServiceAction;
  variant?: "brand" | "outline" | "onInk";
  size?: "md" | "lg";
}) {
  return (
    <ActionLink
      href={action.href}
      variant={variant}
      size={size}
      {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
      className={action.href.startsWith("tel:") ? "nums" : undefined}
    >
      {action.label}
      {action.external ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
    </ActionLink>
  );
}
