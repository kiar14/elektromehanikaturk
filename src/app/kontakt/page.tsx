import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { socialMetadata } from "@/lib/metadata";
import {
  ADDRESS,
  GOOGLE_URL,
  PHONES,
  SERVICE_AREA,
  SITE,
} from "@/lib/site";

export const metadata: Metadata = socialMetadata({
  title: "Kontakt",
  description:
    "Kontaktni podatki, odpiralni čas, lokacija in kontaktni obrazec Elektromehanike Turk na Otočcu.",
  path: "/kontakt",
});

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Domov", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
  ]);
  return (
    <>
      {/* LocalBusiness JSON-LD is emitted once by the root layout from
          the same verified business-data source. */}
      <JsonLd data={breadcrumb} />
      <PageHero
        eyebrow="Kontakt"
        title="Stopite v stik z nami"
        lead="Pokličite nas, pišite ali nas obiščite na Otočcu."
        breadcrumbs={[{ label: "Domov", href: "/" }, { label: "Kontakt" }]}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:gap-16 xl:gap-24">
            <div data-reveal>
              <ContactDetails />
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>

          <section className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16 lg:mt-28 lg:pt-20" data-reveal>
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">Kje smo</h2>
                <p className="mt-3 text-[0.9375rem] text-ink-3">{ADDRESS.full}</p>
              </div>
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-brand"
              >
                Odpri v Google Zemljevidih
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <div className="overflow-hidden rounded-[12px] border border-line-2 bg-mist">
              <iframe
                title="Lokacija Elektromehanike Turk"
                src="https://www.google.com/maps?q=Nad%20Krko%2018%2C%208222%20Oto%C4%8Dec&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 sm:h-[28rem]"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

function ContactDetails() {
  return (
    <div className="grid gap-9">
      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-ink-4 uppercase">Naslov</p>
        <address className="mt-3 flex items-start gap-3 text-[1.0625rem] leading-relaxed not-italic text-ink-2">
          <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
          <span>{ADDRESS.street}<br />{ADDRESS.postalCode} {ADDRESS.city}</span>
        </address>
      </div>

      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-ink-4 uppercase">Telefon</p>
        <ul className="mt-3 grid gap-2">
          {PHONES.map((phone, index) => (
            <li key={phone.tel}>
              <a
                href={`tel:${phone.tel}`}
                className={index === 0
                  ? "nums inline-flex items-center gap-3 text-[1.5rem] font-semibold text-ink transition-colors hover:text-brand"
                  : "nums inline-flex items-center gap-3 text-[1.0625rem] font-medium text-ink-2 transition-colors hover:text-brand"}
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-brand" />
                {phone.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-ink-4 uppercase">E-pošta</p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-3 inline-flex items-center gap-3 text-[1.0625rem] font-medium break-all text-ink-2 transition-colors hover:text-brand"
        >
          <Mail aria-hidden="true" className="size-4 shrink-0 text-brand" />
          {SITE.email}
        </a>
      </div>

      <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <h2 className="text-[1.125rem]">Odpiralni čas</h2>
          <dl className="mt-4 grid gap-2 text-[0.9375rem]">
            <div className="flex justify-between gap-4"><dt className="text-ink-3">Pon-Pet</dt><dd className="nums font-medium">8:00-16:00</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-3">Sob</dt><dd className="nums font-medium">8:00-12:00</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-3">Ned</dt><dd className="font-medium">zaprto</dd></div>
          </dl>
        </div>
        <div>
          <h2 className="text-[1.125rem]">Območje</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-3">
            {SERVICE_AREA.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
