"use client";

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let initAttempted = false;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function getFirebaseApp(): FirebaseApp | null {
  if (initAttempted) return app;
  initAttempted = true;
  if (typeof window === "undefined") return null;
  app = initializeApp(firebaseConfig);
  return app;
}

export async function initAnalytics(): Promise<void> {
  if (analytics) return;
  const _app = getFirebaseApp();
  if (!_app) return;
  try {
    const ok = await isSupported();
    if (ok) analytics = getAnalytics(_app);
  } catch {
    /* analytics unavailable — no-op */
  }
}
