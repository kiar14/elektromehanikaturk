import Link from "next/link";
import { Phone } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { ActionLink } from "@/components/ui/actions";
import { PRIMARY_PHONE } from "@/lib/site";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="Strani ni mogoče najti"
      lead="Stran, ki jo iščete, ne obstaja ali pa je bila premaknjena."
      className="min-h-[calc(100dvh-18rem)]"
      actions={
        <>
          <ActionLink href="/">Na domačo stran</ActionLink>
          <ActionLink href="/trgovina" variant="outline">
            V trgovino
          </ActionLink>
          <Link
            href={`tel:${PRIMARY_PHONE.tel}`}
            className="nums ml-1 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-brand"
          >
            <Phone aria-hidden="true" className="size-4 text-brand" />
            {PRIMARY_PHONE.label}
          </Link>
        </>
      }
    />
  );
}
