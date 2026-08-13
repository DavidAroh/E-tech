import { NextResponse } from "next/server";
import { COLLECTIONS, getFirestore } from "@/lib/firebase";
import {
  LIMITS,
  clampText,
  isEmail,
  isPhone,
} from "@/lib/validation";
import { SERVICE_OPTION_TO_SLUG } from "@/data/assessment";

type Body = {
  assessment_id?: string;
  name?: string;
  organization?: string;
  email?: string;
  phone?: string;
  org_size?: string;
  service_required?: string;
  message?: string;
  overall_percentage?: number | string;
  risk_level?: string;
};

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

const VALID_ORG_SIZES = new Set(["Small", "Medium", "Large"]);
const VALID_SERVICES = new Set(Object.keys(SERVICE_OPTION_TO_SLUG));

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`assessment-lead:${ip}`)) {
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

  const assessment_id = clampText(body.assessment_id || "", 128);
  const name = clampText(body.name || "", LIMITS.name);
  const organization = clampText(body.organization || "", LIMITS.company);
  const email = clampText(body.email || "", LIMITS.email).toLowerCase();
  const phone = clampText(body.phone || "", LIMITS.phone);
  const org_size = clampText(body.org_size || "", 32);
  const service_required = clampText(body.service_required || "", LIMITS.service);
  const message = clampText(body.message || "", LIMITS.message);
  const overall_percentage =
    body.overall_percentage === undefined
      ? null
      : Number(body.overall_percentage);
  const risk_level = clampText(body.risk_level || "", 32);

  if (!name || !organization || !email || !phone || !org_size || !service_required) {
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

  if (!VALID_ORG_SIZES.has(org_size)) {
    return NextResponse.json(
      { error: "Invalid organization size." },
      { status: 400 }
    );
  }

  if (!VALID_SERVICES.has(service_required)) {
    return NextResponse.json(
      { error: "Invalid service requested." },
      { status: 400 }
    );
  }

  const payload = {
    assessment_id: assessment_id || null,
    name,
    organization,
    email,
    phone,
    org_size,
    service_required,
    message,
    overall_percentage:
      overall_percentage !== null && !Number.isNaN(overall_percentage)
        ? Math.round(overall_percentage)
        : null,
    risk_level: risk_level || null,
    created_at: new Date().toISOString(),
  };

  const db = getFirestore();

  if (!db) {
    console.info("[assessment-lead] Firebase not configured. Lead:", {
      ...payload,
      message: `[${payload.message?.length ?? 0} chars]`,
    });
    return NextResponse.json({
      ok: true,
      stored: false,
      message:
        "Received. Configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to persist leads.",
    });
  }

  try {
    await db.collection(COLLECTIONS.assessmentLeads).add(payload);
  } catch (err) {
    console.error(
      "[assessment-lead] Firestore write error:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
