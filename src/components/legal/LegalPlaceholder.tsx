import { PageHero } from "@/components/layout/PageHero";

export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <PageHero
        title={title}
        lead="Pravna vsebina je v pripravi za končno različico spletnega mesta."
        breadcrumbs={[{ label: "Domov", href: "/" }, { label: title }]}
        className="pb-14 sm:pb-16 lg:pb-20"
      />
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="shell">
          <div className="max-w-[68ch]" data-reveal>
            <p className="text-sm font-medium text-ink-4">
              Zadnja posodobitev: 22. avgust 2026
            </p>
            {/* TODO: paste verified legal text from current Elektromehanika Turk website */}
            <p className="mt-8 text-base leading-relaxed text-ink-3">
              Ta stran je del prototipa. Preverjeno pravno besedilo bo dodano
              pred objavo končne različice spletnega mesta.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
