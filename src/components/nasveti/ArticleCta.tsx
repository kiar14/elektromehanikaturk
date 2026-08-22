import { ActionLink } from "@/components/ui/actions";
import type { ArticleCtaKind } from "@/content/nasveti";
import { ROUTES } from "@/lib/navigation";
import { PRIMARY_PHONE } from "@/lib/site";

const COPY: Record<
  ArticleCtaKind,
  { title: string; body: string; label: string; href: string }
> = {
  klima: {
    title: "Potrebujete pomoč pri izbiri ali montaži klime?",
    body: "Pregledamo prostor, predlagamo primerno napravo in povemo, kaj je pri montaži smiselno.",
    label: "Svetovanje na daljavo",
    href: ROUTES.remoteAdvice,
  },
  aparat: {
    title: "Naprava ne deluje pravilno?",
    body: "Opišite znake in kodo napake, če jo naprava javi, in napravo bomo pregledali.",
    label: "Naroči servis",
    href: ROUTES.booking,
  },
};

/**
 * Compact conversion block placed inside the article column. Deliberately
 * lighter than the site-wide InnerCta band — it interrupts reading, so it
 * stays at the width of the text and keeps two actions at most.
 */
export function ArticleCta({ kind }: { kind: ArticleCtaKind }) {
  const copy = COPY[kind];

  return (
    <aside className="my-12 rounded-[12px] border border-line bg-base p-6 sm:p-7">
      <p className="text-[1.0625rem] leading-snug font-semibold text-ink">
        {copy.title}
      </p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-3">
        {copy.body}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ActionLink href={copy.href}>{copy.label}</ActionLink>
        <ActionLink
          href={`tel:${PRIMARY_PHONE.tel}`}
          variant="outline"
          className="nums"
        >
          {PRIMARY_PHONE.label}
        </ActionLink>
      </div>
    </aside>
  );
}
