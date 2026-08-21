"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/store/ProductCard";
import { ActionLink } from "@/components/ui/actions";
import {
  PRODUCT_BRANDS,
  PRODUCT_CATEGORIES,
  PRODUCTS,
  type ProductCategory,
} from "@/lib/products";
import { PRIMARY_PHONE } from "@/lib/site";
import { ROUTES } from "@/lib/navigation";

type SortKey = "recommended" | "price-asc" | "price-desc";
type PriceKey = "all" | "under-1000" | "1000-2000" | "over-2000";

const PRICE_OPTIONS: { value: PriceKey; label: string }[] = [
  { value: "all", label: "Vse cene" },
  { value: "under-1000", label: "Do 1.000 €" },
  { value: "1000-2000", label: "1.000-2.000 €" },
  { value: "over-2000", label: "Nad 2.000 €" },
];

export function ShopCatalogFromQuery() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategorija");
  const initialBrand = searchParams.get("znamka");
  const initialSubcategory = searchParams.get("podkategorija");
  const initialSaleOnly = searchParams.get("akcija") === "1";

  return (
    <ShopCatalog
      key={searchParams.toString()}
      initialCategory={
        PRODUCT_CATEGORIES.includes(initialCategory as ProductCategory)
          ? (initialCategory as ProductCategory)
          : undefined
      }
      initialBrand={
        initialBrand && PRODUCT_BRANDS.includes(initialBrand)
          ? initialBrand
          : undefined
      }
      initialSubcategory={initialSubcategory ?? undefined}
      initialSaleOnly={initialSaleOnly}
    />
  );
}

function ShopCatalog({
  initialCategory,
  initialBrand,
  initialSubcategory,
  initialSaleOnly,
}: {
  initialCategory?: ProductCategory;
  initialBrand?: string;
  initialSubcategory?: string;
  initialSaleOnly: boolean;
}) {
  const [categories, setCategories] = useState<ProductCategory[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [brands, setBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : [],
  );
  const [subcategory, setSubcategory] = useState(initialSubcategory);
  const [price, setPrice] = useState<PriceKey>("all");
  const [saleOnly, setSaleOnly] = useState(initialSaleOnly);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      if (categories.length > 0 && !categories.includes(product.category)) {
        return false;
      }
      if (brands.length > 0 && !brands.includes(product.brand)) return false;
      if (subcategory && product.subcategory !== subcategory) return false;
      if (saleOnly && !product.oldPrice) return false;
      if (price === "under-1000" && product.price >= 1000) return false;
      if (
        price === "1000-2000" &&
        (product.price < 1000 || product.price > 2000)
      ) {
        return false;
      }
      if (price === "over-2000" && product.price <= 2000) return false;
      return true;
    });

    if (sort === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [brands, categories, price, saleOnly, sort, subcategory]);

  const clearAll = () => {
    setCategories([]);
    setBrands([]);
    setSubcategory(undefined);
    setPrice("all");
    setSaleOnly(false);
  };

  const activeFilters = [
    ...categories.map((value) => ({
      label: value,
      remove: () => setCategories((current) => current.filter((item) => item !== value)),
    })),
    ...brands.map((value) => ({
      label: value,
      remove: () => setBrands((current) => current.filter((item) => item !== value)),
    })),
    ...(subcategory
      ? [{ label: subcategory, remove: () => setSubcategory(undefined) }]
      : []),
    ...(price !== "all"
      ? [
          {
            label: PRICE_OPTIONS.find((option) => option.value === price)?.label ?? price,
            remove: () => setPrice("all"),
          },
        ]
      : []),
    ...(saleOnly
      ? [{ label: "Samo akcija", remove: () => setSaleOnly(false) }]
      : []),
  ];

  return (
    <>
      <section
        id="vsi-izdelki"
        className="scroll-mt-24 pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
      >
        <div className="shell">
          <div className="max-w-2xl">
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-[3rem]">
              Vsi izdelki
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-3">
              Izbran demo katalog z resničnimi izdelki iz ponudbe EMT.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 lg:mt-12">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-line-2 bg-paper px-4 text-sm font-semibold text-ink lg:hidden"
              >
                <SlidersHorizontal aria-hidden="true" className="size-4" />
                Filtri
                {activeFilters.length > 0 ? (
                  <span className="nums rounded-full bg-brand px-1.5 text-[0.6875rem] leading-5 text-white">
                    {activeFilters.length}
                  </span>
                ) : null}
              </button>
              <p className="text-sm text-ink-3">
                <span className="nums font-semibold text-ink">
                  {filteredProducts.length}
                </span>{" "}
                {productCountLabel(filteredProducts.length)}
              </p>
            </div>
            <label className="flex items-center gap-3 text-sm text-ink-3">
              <span className="hidden sm:inline">Razvrsti po</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-11 rounded-[8px] border border-line-2 bg-paper px-3 text-sm font-medium text-ink outline-none focus:border-brand"
              >
                <option value="recommended">Priporočeno</option>
                <option value="price-asc">Cena: od najnižje</option>
                <option value="price-desc">Cena: od najvišje</option>
              </select>
            </label>
          </div>

          {activeFilters.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Aktivni filtri">
              {activeFilters.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  onClick={filter.remove}
                  className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-line-2 bg-paper px-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  {filter.label}
                  <X aria-hidden="true" className="size-3.5" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="h-9 px-2 text-sm font-semibold text-brand hover:text-brand-2"
              >
                Počisti vse
              </button>
            </div>
          ) : null}

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-10">
            <aside className="sticky top-24 hidden lg:block">
              <FilterPanel
                categories={categories}
                brands={brands}
                price={price}
                saleOnly={saleOnly}
                onCategoryToggle={(category) =>
                  setCategories((current) => toggleValue(current, category))
                }
                onBrandToggle={(brand) =>
                  setBrands((current) => toggleValue(current, brand))
                }
                onPriceChange={setPrice}
                onSaleChange={setSaleOnly}
              />
            </aside>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 min-[540px]:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-[12px] border border-line bg-paper px-6 text-center">
                <p className="text-xl font-semibold text-ink">
                  Za izbrane filtre ni izdelkov.
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-3">
                  Odstranite enega ali več filtrov in ponovno preverite ponudbo.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 h-11 rounded-[10px] bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-2"
                >
                  Počisti filtre
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <div className="shell">
          <div className="rounded-[12px] bg-ink px-6 py-10 text-on-dark sm:px-10 sm:py-12 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-14">
            <div className="max-w-2xl">
              <h2 className="text-[2rem] leading-tight sm:text-[2.5rem]">
                Niste prepričani, katera naprava je prava?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-on-dark-2">
                Pokličite nas ali uporabite svetovanje na daljavo. Pomagamo vam pri izbiri ustrezne naprave.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <a
                href={`tel:${PRIMARY_PHONE.tel}`}
                className="nums inline-flex h-12 items-center justify-center rounded-[10px] bg-brand px-5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-2"
              >
                {PRIMARY_PHONE.label}
              </a>
              <ActionLink href={ROUTES.remoteAdvice} variant="onInk" className="h-12">
                Svetovanje na daljavo
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      <MobileFilters
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        resultCount={filteredProducts.length}
      >
        <FilterPanel
          categories={categories}
          brands={brands}
          price={price}
          saleOnly={saleOnly}
          onCategoryToggle={(category) =>
            setCategories((current) => toggleValue(current, category))
          }
          onBrandToggle={(brand) =>
            setBrands((current) => toggleValue(current, brand))
          }
          onPriceChange={setPrice}
          onSaleChange={setSaleOnly}
        />
      </MobileFilters>
    </>
  );
}

function FilterPanel({
  categories,
  brands,
  price,
  saleOnly,
  onCategoryToggle,
  onBrandToggle,
  onPriceChange,
  onSaleChange,
}: {
  categories: ProductCategory[];
  brands: string[];
  price: PriceKey;
  saleOnly: boolean;
  onCategoryToggle: (category: ProductCategory) => void;
  onBrandToggle: (brand: string) => void;
  onPriceChange: (price: PriceKey) => void;
  onSaleChange: (value: boolean) => void;
}) {
  return (
    <div className="grid gap-7">
      <FilterGroup title="Kategorija">
        {PRODUCT_CATEGORIES.map((category) => (
          <FilterCheckbox
            key={category}
            label={category}
            checked={categories.includes(category)}
            onChange={() => onCategoryToggle(category)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Znamka">
        {PRODUCT_BRANDS.map((brand) => (
          <FilterCheckbox
            key={brand}
            label={brand}
            checked={brands.includes(brand)}
            onChange={() => onBrandToggle(brand)}
          />
        ))}
      </FilterGroup>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Cena</legend>
        <div className="mt-3 grid gap-2.5">
          {PRICE_OPTIONS.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-3">
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={price === option.value}
                onChange={() => onPriceChange(option.value)}
                className="size-4 accent-brand"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <FilterGroup title="Akcija">
        <FilterCheckbox
          label="Samo izdelki v akciji"
          checked={saleOnly}
          onChange={() => onSaleChange(!saleOnly)}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{title}</legend>
      <div className="mt-3 grid gap-2.5">{children}</div>
    </fieldset>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-ink-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 shrink-0 rounded accent-brand"
      />
      {label}
    </label>
  );
}

function MobileFilters({
  open,
  onOpenChange,
  resultCount,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resultCount: number;
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[min(92vw,26rem)] max-w-none gap-0 border-l border-line bg-paper p-0"
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
          <SheetTitle className="text-xl font-semibold text-ink">Filtri</SheetTitle>
          <SheetClose
            aria-label="Zapri filtre"
            className="flex size-10 items-center justify-center rounded-[10px] text-ink-3 hover:bg-mist hover:text-ink"
          >
            <X aria-hidden="true" className="size-5" />
          </SheetClose>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-5">{children}</div>
        <div className="border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <SheetClose className="h-12 w-full rounded-[10px] bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-2">
            Prikaži {resultCount} {productCountLabel(resultCount)}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function toggleValue<T>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function productCountLabel(count: number) {
  if (count === 1) return "izdelek";
  if (count === 2) return "izdelka";
  if (count === 3 || count === 4) return "izdelki";
  return "izdelkov";
}
