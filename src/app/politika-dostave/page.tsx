import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/legal/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Politika dostave",
  description: "Politika dostave Elektromehanike Turk. Prototipna stran.",
  alternates: { canonical: "/politika-dostave" },
  robots: { index: false, follow: false },
};

export default function DeliveryPage() {
  return <LegalPlaceholder title="Politika dostave" />;
}
