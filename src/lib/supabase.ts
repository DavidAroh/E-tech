import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!client) {
    client = createClient(url, key);
  }

  return client;
}

export type ConsultationPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  service_needed: string;
  message: string;
  preferred_date: string;
  preferred_time: string;
  consultation_type: "virtual" | "in-person";
};

export type NewsletterPayload = {
  email: string;
};
