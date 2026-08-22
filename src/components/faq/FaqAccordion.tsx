"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { getMeaningfulFaqItems, type FaqItem } from "@/lib/faq";
import { cn } from "@/lib/utils";

export type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const meaningfulItems = getMeaningfulFaqItems(items);

  return (
    <div className="border-t border-line-2">
      {meaningfulItems.map((item, index) => {
        const open = openIndex === index;
        const triggerId = `faq-vprasanje-${index}`;
        const panelId = `faq-odgovor-${index}`;

        return (
          <section key={item.question} className="border-b border-line-2">
            <h2>
              <button
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span className="max-w-[52rem] text-[1.125rem] leading-snug font-semibold text-ink transition-colors group-hover:text-brand sm:text-[1.25rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-line-2 bg-paper text-ink-3"
                >
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open && "rotate-180",
                    )}
                  />
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[48rem] pb-7 text-[0.9375rem] leading-relaxed text-ink-3 sm:pb-8 sm:text-[1rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
