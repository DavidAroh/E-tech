import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { LIMITS, clampText, isEmail } from "@/lib/validation";

const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 20;

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

  if (!rateLimit(`newsletter:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = clampText(body.email || "", LIMITS.newsletter).toLowerCase();

  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const payload = {
    email,
    created_at: new Date().toISOString(),
  };

  const supabase = getSupabase();

  if (!supabase) {
    console.info("[newsletter] Supabase not configured. Payload:", payload);
    return NextResponse.json({
      ok: true,
      stored: false,
      message:
        "Received. Configure Supabase env vars to persist newsletter signups.",
    });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert(payload);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, stored: true, duplicate: true });
    }
    console.error("[newsletter] Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
