import { supabase } from "@/integrations/supabase/client";

export type LeadSource =
  | "contact_form"
  | "resource_download"
  | "whatsapp"
  | "phone"
  | "referral"
  | "other";

export interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  requirement?: string;
  source: LeadSource;
  source_detail?: string;
  meta?: Record<string, unknown>;
}

/** Best-effort lead insert from public website forms. Never throws — failure
 *  must not block WhatsApp/download UX. */
export async function captureLead(payload: LeadPayload) {
  try {
    const { error } = await supabase.from("leads").insert({
      name: payload.name.slice(0, 200),
      phone: payload.phone?.slice(0, 20) || null,
      email: payload.email?.slice(0, 200) || null,
      company: payload.company?.slice(0, 200) || null,
      requirement: payload.requirement?.slice(0, 2000) || null,
      source: payload.source,
      source_detail: payload.source_detail?.slice(0, 200) || null,
      meta: (payload.meta ?? {}) as never,
    });
    if (error) console.warn("[leadCapture]", error.message);
  } catch (e) {
    console.warn("[leadCapture] failed", e);
  }
}