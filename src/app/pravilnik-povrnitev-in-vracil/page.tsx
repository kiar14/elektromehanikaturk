import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Pravilnik povrnitev in vračil",
  description:
    "Pravilnik povrnitev in vračil Elektromehanike Turk. Prototipna stran.",
  alternates: { canonical: "/pravilnik-povrnitev-in-vracil" },
  robots: { index: false, follow: false },
};

export default function ReturnsPage() {
  return <LegalPlaceholder title="Pravilnik povrnitev in vračil" />;
}
