import { NextResponse } from "next/server";
import { COLLECTIONS, getFirestore } from "@/lib/firebase";
import { clampText } from "@/lib/validation";
import type { StoredAssessment } from "@/lib/assessment";
import type { Answers } from "@/lib/assessment";

// Rate limit — generous window since a completed assessment is one POST.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 8;

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

const MAX_PAYLOAD_BYTES = 256 * 1024;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(`assessment:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: StoredAssessment & { answers?: Answers };
  try {
    body = (await request.json()) as StoredAssessment & { answers?: Answers };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.assessment_id || typeof body.assessment_id !== "string") {
    return NextResponse.json(
      { error: "Assessment id is required." },
      { status: 400 }
    );
  }

  if (!body.answers || typeof body.answers !== "object") {
    return NextResponse.json(
      { error: "Assessment answers are required." },
      { status: 400 }
    );
  }

  if (!body.risk_level || !body.risk_label) {
    return NextResponse.json(
      { error: "Risk level is required." },
      { status: 400 }
    );
  }

  // Clamp all text fields defensively; the client already clamps.
  const payload = {
    assessment_id: clampText(body.assessment_id, 128),
    organization_name: clampText(body.organization_name || "", 160),
    industry: clampText(body.industry || "", 80),
    org_size: clampText(body.org_size || "", 32),
    ai_usage: clampText(body.ai_usage || "", 32),
    cloud_usage: clampText(body.cloud_usage || "", 32),
    assessment_goal: clampText(body.assessment_goal || "", 120),
    answers: body.answers,
    category_scores: body.category_scores ?? [],
    overall_score: Number(body.overall_score) || 0,
    overall_percentage: Number(body.overall_percentage) || 0,
    risk_level: clampText(body.risk_level, 32),
    risk_label: clampText(body.risk_label, 64),
    key_findings: body.key_findings ?? [],
    recommendations: body.recommendations ?? [],
    recommended_services: body.recommended_services ?? [],
    roadmap: body.roadmap ?? [],
    is_demo: Boolean(body.is_demo),
  };

  // Sanity bounds to avoid huge payloads.
  const serialized = JSON.stringify(payload).length;
  if (serialized > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { error: "Assessment payload too large." },
      { status: 413 }
    );
  }

  const db = getFirestore();

  if (!db) {
    console.info("[assessment] Firebase not configured. Stored (preview):", {
      assessment_id: payload.assessment_id,
      risk_level: payload.risk_level,
      is_demo: payload.is_demo,
    });
    return NextResponse.json({
      ok: true,
      stored: false,
      assessment_id: payload.assessment_id,
      message:
        "Received. Configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to persist assessments.",
    });
  }

  try {
    await db.collection(COLLECTIONS.assessmentResults).add(payload);
  } catch (err) {
    console.error(
      "[assessment] Firestore write error:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { error: "Unable to save assessment. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    stored: true,
    assessment_id: payload.assessment_id,
  });
}
