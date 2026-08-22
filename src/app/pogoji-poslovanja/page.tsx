import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Pogoji poslovanja",
  description: "Pogoji poslovanja Elektromehanike Turk. Prototipna stran.",
  alternates: { canonical: "/pogoji-poslovanja" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return <LegalPlaceholder title="Pogoji poslovanja" />;
}
