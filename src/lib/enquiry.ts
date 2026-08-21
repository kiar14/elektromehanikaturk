import type { QuickBookingValues, ServiceEnquiryValues } from "@/lib/schemas";

export type EnquiryPayload =
  | ({ kind: "hitro-povprasevanje" } & QuickBookingValues)
  | ({ kind: "servisno-povprasevanje" } & ServiceEnquiryValues);

export type EnquiryResult = { ok: true } | { ok: false; message: string };

/**
 * TODO(backend): wire this to the real EMT endpoint.
 *
 * Both homepage forms funnel through here, so only this function needs
 * to change. The intended shape is a POST to a Route Handler or Server
 * Action that sends the enquiry to info@elektromehanikaturk.com (and/or
 * the CRM), with server-side re-validation against the same Zod schemas
 * and spam protection — never trust the client-side validation alone.
 *
 * Until then it resolves successfully after a short delay so the full
 * submitting → success interaction can be exercised end to end.
 */
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  if (process.env.NODE_ENV === "development") {
    console.info("[EMT] Povpraševanje (demo, brez zaledja):", payload);
  }

  await new Promise((resolve) => setTimeout(resolve, 650));

  return { ok: true };
}
