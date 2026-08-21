import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SERVICES, type Service } from "@/lib/content";

/**
 * Services sit directly under the hero on purpose: someone with a broken
 * appliance should see whether EMT solves their problem before anything
 * else. Four equal cards on a two-column grid — same width, same image
 * ratio, same text block — so the section scans as one set rather than a
 * hierarchy.
 */
export function Services() {
  return (
    <section
      id="storitve"
      data-services-sequence
      className="scroll-mt-24 bg-base py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        {/* The heading and the four cards are choreographed together by
            MotionProvider — see the `[data-services-sequence]` block —
            rather than by the page-wide reveal batch, so the cards can
            arrive from the side they occupy in the grid. */}
        <header className="max-w-2xl">
          <p className="eyebrow" data-service-head>
            Kaj delamo
          </p>
          <h2
            data-service-head
            className="mt-5 text-[2.5rem] leading-[1.03] sm:text-[3rem] lg:text-[3.75rem]"
          >
            Storitve
          </h2>
        </header>

        <div className="mt-12 grid gap-x-8 gap-y-14 lg:mt-16 lg:grid-cols-2 lg:gap-y-16">
          {SERVICES.map((service, index) => (
            <ServiceEntry
              key={service.href}
              service={service}
              // 2x2 on desktop: even indexes sit in the left column,
              // odd in the right, and each enters from its own side.
              enter={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceEntry({
  service,
  enter,
}: {
  service: Service;
  enter: "left" | "right";
}) {
  return (
    // `h-full` + a column layout let the grid stretch every card to the
    // tallest in its row, and `mt-auto` then lines the links up across
    // cards whose titles and blurbs wrap to different heights.
    // The whole article is the animated unit, so the photograph, title,
    // copy and link all arrive together as one composed object.
    <article data-service-card data-enter={enter} className="h-full">
      <Link href={service.href} className="group flex h-full flex-col">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[12px] bg-mist">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        </div>

        <div className="mt-6 flex flex-1 flex-col border-t border-line pt-5 transition-colors duration-300 group-hover:border-line-2">
          <h3 className="text-[1.5rem] leading-snug text-ink transition-colors duration-200 group-hover:text-brand lg:text-[1.75rem]">
            {service.title}
          </h3>
          <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-3">
            {service.blurb}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.9375rem] font-medium text-ink">
            Več o storitvi
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
