import Image from "next/image";
import Link from "next/link";

import { LEGAL_NAV } from "@/lib/navigation";
import {
  ADDRESS,
  OPENING_HOURS,
  PHONES,
  SERVICE_AREA,
  SITE,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink border-t border-line-dark bg-ink text-on-dark">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Company */}
          <div>
            <Link href="/" aria-label={`${SITE.name} — domov`}>
              <Image
                src="/images/emt-logo-white.webp"
                alt={SITE.name}
                width={800}
                height={183}
                className="h-9 w-auto lg:h-10"
              />
            </Link>
            <p className="mt-6 max-w-[26rem] text-[0.9375rem] leading-relaxed text-on-dark-2">
              Servis, montaža in prodaja klimatskih naprav, toplotnih črpalk,
              bele tehnike ter hladilne opreme.
            </p>
            <address className="mt-6 text-[0.9375rem] not-italic text-on-dark">
              {ADDRESS.street}
              <br />
              {ADDRESS.postalCode} {ADDRESS.city}
            </address>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[0.6875rem] font-medium tracking-[0.16em] text-on-dark-2 uppercase">
              Kontakt
            </h2>
            <ul className="mt-5 grid gap-2">
              {PHONES.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="nums text-[0.9375rem] text-on-dark transition-colors duration-150 hover:text-white"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[0.9375rem] break-words text-on-dark transition-colors duration-150 hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>

            <h2 className="mt-9 text-[0.6875rem] font-medium tracking-[0.16em] text-on-dark-2 uppercase">
              Odpiralni čas
            </h2>
            <dl className="mt-5 grid gap-1.5 text-[0.9375rem]">
              {OPENING_HOURS.map((entry) => (
                <div key={entry.days} className="flex gap-3">
                  <dt className="w-20 shrink-0 text-on-dark-2">{entry.days}</dt>
                  <dd className="nums text-on-dark">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Service area */}
          <div>
            <h2 className="text-[0.6875rem] font-medium tracking-[0.16em] text-on-dark-2 uppercase">
              Območje delovanja
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9375rem] text-on-dark lg:grid-cols-1 lg:gap-y-2">
              {SERVICE_AREA.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom row. Its padding also clears the fixed mobile action
          bar, so the last line of the page is never hidden behind it. */}
      <div className="border-t border-line-dark">
        <div className="shell flex flex-col gap-6 py-7 pb-[calc(1.75rem+4.25rem+env(safe-area-inset-bottom))] md:pb-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <div>
              <span className="sr-only">Možnosti plačila</span>
              <Image
                src="/images/nacini-placila.webp"
                alt="Sprejemamo plačilo s karticami, po predračunu in ob prevzemu."
                width={520}
                height={52}
                className="h-6 w-auto opacity-80"
              />
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-on-dark-2">
              {LEGAL_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="nums text-[0.8125rem] text-on-dark-2">
            © {year} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
