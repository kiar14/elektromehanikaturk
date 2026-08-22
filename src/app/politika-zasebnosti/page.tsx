import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Politika zasebnosti",
  description: "Politika zasebnosti Elektromehanike Turk. Prototipna stran.",
  alternates: { canonical: "/politika-zasebnosti" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalPlaceholder title="Politika zasebnosti" />;
}
