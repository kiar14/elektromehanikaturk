import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { articleHref, type Article } from "@/content/nasveti";
import { cn } from "@/lib/utils";

/**
 * Editorial card for the Nasveti grid.
 *
 * The whole card is one target: the title link is stretched over the card
 * with a pseudo-element, so a screen reader announces a single link with
 * the article title rather than three links to the same place.
 */
export function ArticleCard({
  article,
  priority = false,
  className,
}: {
  article: Article;
  /** Only the first row is worth fetching eagerly. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-paper",
        "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_18px_40px_-30px_rgba(18,21,26,0.45)]",
        "focus-within:border-line-2",
        className,
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-mist">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          style={{ objectPosition: article.imagePosition }}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.6875rem] font-medium tracking-[0.12em] text-ink-4 uppercase">
          {article.category}
        </p>

        <h3 className="mt-3 text-[1.1875rem] leading-snug font-semibold text-ink">
          <Link
            href={articleHref(article.slug)}
            className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover:text-brand"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">
          {article.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="text-[0.8125rem] text-ink-4">
            {article.readingTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-2 transition-colors duration-200 group-hover:text-brand">
            Preberi več
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
