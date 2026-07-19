import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import {
  LIMITS,
  clampText,
  isEmail,
  isPastDate,
  isPhone,
} from "@/lib/validation";

type Body = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  service_needed?: string;
  serviceNeeded?: string;
  message?: string;
  preferred_date?: string;
  preferredDate?: string;
  preferred_time?: string;
  preferredTime?: string;
  consultation_type?: string;
  consultationType?: string;
  submit_mode?: string;
};

// Simple in-memory rate limit (per process; fine for single-node / edge-lite)
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 12;

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_HITS) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`consultation:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = clampText(body.name || "", LIMITS.name);
  const company = clampText(body.company || "", LIMITS.company);
  const email = clampText(body.email || "", LIMITS.email).toLowerCase();
  const phone = clampText(body.phone || "", LIMITS.phone);
  const industry = clampText(
    body.industry || "",
    LIMITS.industry
  );
  const service_needed = clampText(
    body.service_needed || body.serviceNeeded || "",
    LIMITS.service
  );
  const message = clampText(body.message || "", LIMITS.message);
  const preferred_date = clampText(
    body.preferred_date || body.preferredDate || "",
    32
  );
  const preferred_time = clampText(
    body.preferred_time || body.preferredTime || "",
    16
  );
  const consultation_type = clampText(
    body.consultation_type || body.consultationType || "",
    32
  );
  const submit_mode = clampText(body.submit_mode || "book", 32);

  if (
    !name ||
    !company ||
    !email ||
    !phone ||
    !industry ||
    !service_needed ||
    !message ||
    !preferred_date ||
    !preferred_time ||
    !consultation_type
  ) {
    return NextResponse.json(
      { error: "All required fields must be provided." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (!isPhone(phone)) {
    return NextResponse.json(
      { error: "A valid phone number is required." },
      { status: 400 }
    );
  }

  if (isPastDate(preferred_date)) {
    return NextResponse.json(
      { error: "Preferred date must be today or in the future." },
      { status: 400 }
    );
  }

  if (!["virtual", "in-person"].includes(consultation_type)) {
    return NextResponse.json(
      { error: "Invalid consultation type." },
      { status: 400 }
    );
  }

  if (!["book", "schedule"].includes(submit_mode)) {
    return NextResponse.json(
      { error: "Invalid submit mode." },
      { status: 400 }
    );
  }

  const payload = {
    name,
    company,
    email,
    phone,
    industry,
    service_needed,
    message,
    preferred_date,
    preferred_time,
    consultation_type,
    submit_mode,
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabase();

  if (!supabase) {
    console.info("[consultation] Supabase not configured. Payload:", {
      ...payload,
      message: `[${payload.message.length} chars]`,
    });
    return NextResponse.json({
      ok: true,
      stored: false,
      message:
        "Received. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to persist submissions.",
    });
  }

  const { error } = await supabase.from("consultations").insert(payload);

  if (error) {
    console.error("[consultation] Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "Unable to save your request. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
