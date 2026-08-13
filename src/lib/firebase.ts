/**
 * Firebase Admin SDK — server-only singleton.
 *
 * Used by Next.js API routes (route handlers) to write form + assessment
 * data to Cloud Firestore. All initialization is server-side; this module
 * must never be imported into a client component.
 *
 * Modeled after the previous getSupabase() helper: returns null when not
 * configured so routes can degrade gracefully to a "received but not stored"
 * response instead of erroring.
 *
 * Required env vars:
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY  (full PEM, usually multi-line — keep the quotes)
 */

import { cert, getApps, initializeApp } from "firebase-admin/app";
import {
  getFirestore as getAdminFirestore,
  type Firestore,
} from "firebase-admin/firestore";

let firestore: Firestore | null = null;
let initAttempted = false;

/**
 * Returns a Firestore instance, or null if Firebase isn't configured.
 * Safe to call repeatedly; the instance is cached for the process.
 */
export function getFirestore(): Firestore | null {
  if (initAttempted) return firestore;
  initAttempted = true;

  // Hard guard: never initialize the Admin SDK in the browser. Next.js API
  // route handlers always run on the server, so this is belt-and-braces.
  if (typeof window !== "undefined") return null;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawPrivateKey) {
    return null;
  }

  // Env vars often escape literal "\n" sequences; normalize to real newlines.
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  try {
    const app =
      getApps()[0] ??
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });

    const db = getAdminFirestore(app);
    // Skip undefined fields instead of throwing (payloads use optional keys).
    db.settings({ ignoreUndefinedProperties: true });

    firestore = db;
    return firestore;
  } catch (err) {
    // Reset so a later call (e.g. after fixing env vars in dev) can retry.
    initAttempted = false;
    firestore = null;
    console.error("[firebase] Failed to initialize Admin SDK:", err);
    return null;
  }
}

/** Collection names used across the app. Centralized for consistency. */
export const COLLECTIONS = {
  consultations: "consultations",
  newsletterSubscribers: "newsletter_subscribers",
  assessmentResults: "assessment_results",
  assessmentLeads: "assessment_leads",
} as const;
