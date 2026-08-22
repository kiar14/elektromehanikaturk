import { PROCESS_STEPS } from "@/lib/content";

type ProcessStep = { title: string; body: string };

/**
 * One continuous rule with four nodes sitting on it.
 *
 * The rule is absolutely positioned at the node's vertical centre
 * (`top: 26px` for a 52px node) and the nodes paint over it, so the line
 * genuinely passes through them rather than stopping at either side.
 * Below `lg` the same markup becomes a vertical timeline: the rule turns
 * into a per-step segment that runs from under one node into the gap
 * above the next, which avoids a stray tail hanging off the last step.
 *
 * Animation reuses the site-wide batches — `data-reveal-line` draws the
 * rule (it triggers slightly earlier, at `top 80%`) and `data-reveal`
 * fades the nodes and copy in document order, so the sequence reads
 * line → 01 → 02 → 03 → 04. One owner, no extra client component.
 */
export function Process({
  eyebrow = "Postopek",
  title = "Kako poteka servis",
  steps = PROCESS_STEPS,
}: {
  eyebrow?: string;
  title?: string;
  steps?: readonly ProcessStep[];
} = {}) {
  return (
    <section className="bg-base py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <header className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow eyebrow-center">{eyebrow}</p>
          <h2 className="mt-5 text-[2.75rem] leading-[1.03] sm:text-[3.25rem] lg:text-[3.75rem]">
            {title}
          </h2>
        </header>

        <div className="relative mt-14 lg:mt-20">
          {/* Desktop rule — inset by half a column so it starts and ends
              at the first and last node rather than at the container. */}
          <span
            aria-hidden="true"
            data-reveal-line
            className="absolute top-[1.875rem] right-[12.5%] left-[12.5%] hidden h-px bg-line-2 lg:block"
          />

          <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Mobile segment: from below this node into the gap
                    above the next one. Omitted on the last step. */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-[3.75rem] bottom-[-2.5rem] left-[1.875rem] w-px -translate-x-1/2 bg-line-2 lg:hidden"
                  />
                ) : null}

                <span
                  data-reveal
                  className="relative z-10 flex size-15 shrink-0 items-center justify-center rounded-[13px] bg-brand text-[1.0625rem] font-semibold text-white shadow-[0_7px_18px_-8px_rgba(192,82,42,0.55)]"
                >
                  <span className="nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <div data-reveal className="pb-1 lg:mt-8 lg:pb-0">
                  <h3 className="text-[1.25rem] leading-snug font-semibold text-ink lg:text-[1.3125rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[28rem] text-[1rem] leading-relaxed text-ink-3 lg:mx-auto lg:max-w-[19rem]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
