import type { ReactNode } from "react";

export function InnerCta({
  title,
  body,
  actions,
}: {
  title: string;
  body?: string;
  actions: ReactNode;
}) {
  return (
    <section className="on-ink bg-ink py-16 text-on-dark sm:py-20 lg:py-24">
      <div className="shell">
        <div
          className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14"
          data-reveal
        >
          <div>
            <h2 className="max-w-[44rem] text-[2.125rem] leading-[1.05] text-white sm:text-[2.75rem]">
              {title}
            </h2>
            {body ? (
              <p className="mt-4 max-w-[38rem] text-[1.0625rem] leading-relaxed text-on-dark-2">
                {body}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
      </div>
    </section>
  );
}
