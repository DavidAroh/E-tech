"use client";

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let initAttempted = false;

const firebaseConfig = {
  apiKey: "AIzaSyAat-goUaEcXm3LnXZhrgMWiBi3KX9MM9c",
  authDomain: "e-tech-192e5.firebaseapp.com",
  projectId: "e-tech-192e5",
  storageBucket: "e-tech-192e5.firebasestorage.app",
  messagingSenderId: "506648253517",
  appId: "1:506648253517:web:82da21f7a484a46535f804",
  measurementId: "G-493XGNFRLZ",
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