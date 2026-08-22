import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Piškotki",
  description: "Informacije o piškotkih Elektromehanike Turk. Prototipna stran.",
  alternates: { canonical: "/piskotki" },
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return <LegalPlaceholder title="Piškotki" />;
}
