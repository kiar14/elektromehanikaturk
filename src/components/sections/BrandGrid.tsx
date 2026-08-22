import Image from "next/image";

import { BRANDS } from "@/lib/content";

export function BrandGrid({
  names,
  title = "Znamke, ki jih servisiramo",
}: {
  names?: string[];
  title?: string;
}) {
  const brands = names
    ? names.flatMap((name) => BRANDS.filter((brand) => brand.name === name))
    : BRANDS;

  return (
    <section className="border-y border-line bg-base py-16 sm:py-20 lg:py-24">
      <div className="shell" data-reveal>
        <div className="grid gap-8 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">Znamke</p>
            <h2 className="mt-5 max-w-[22rem] text-[2rem] leading-[1.08] sm:text-[2.5rem]">
              {title}
            </h2>
          </div>

          <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <li
                key={brand.name}
                className="flex min-h-28 items-center justify-center border-r border-b border-line bg-paper px-5 py-6 sm:min-h-32"
              >
                <Image
                  src={brand.file}
                  alt={brand.name}
                  width={brand.w}
                  height={brand.h}
                  unoptimized
                  style={{ height: Math.min(brand.size, 40) }}
                  className="w-auto max-w-[9rem] object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
