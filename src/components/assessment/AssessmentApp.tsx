"use client";

import { useCallback, useState } from "react";
import { AnswerValue } from "@/data/assessment";
import {
  AssessmentResult,
  DemoProfile,
  ProfileInput as ProfileType,
  computeResult,
  getDemoProfile,
  toStored,
} from "@/lib/assessment";
import { AssessmentLanding } from "./AssessmentLanding";
import { AssessmentFlow } from "./AssessmentFlow";
import { AssessmentResults } from "./AssessmentResults";

type Phase = "landing" | "flow" | "results";

const SESSION_KEYS = [
  "etech-assessment-profile",
  "etech-assessment-answers",
  "etech-assessment-domain",
  "etech-assessment-result",
  "etech-assessment-is-demo",
  "etech-assessment-assessment-id",
] as const;

function clearSessionAssessment() {
  if (typeof window === "undefined") return;
  SESSION_KEYS.forEach((k) => sessionStorage.removeItem(k));
}

export function AssessmentApp() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | undefined>();

  const handleStart = useCallback(() => {
    clearSessionAssessment();
    setIsDemo(false);
    setAssessmentId(undefined);
    setPhase("flow");
  }, []);

  const handleStartDemo = useCallback(() => {
    // Demo flow: pick a varied profile, jump straight to results so an
    // investor can see a full risk profile without re-answering 36 questions.
    const demoTypes: DemoProfile[] = ["moderate-risk", "high-risk"];
    const type =
      demoTypes[Math.floor(Math.random() * demoTypes.length)] ??
      "moderate-risk";
    const seed = getDemoProfile(type);
    sessionStorage.setItem("etech-assessment-demo-type", type);
    setIsDemo(true);
    const computed = computeResult(seed.profile, seed.answers);
    setResult(computed);
    setPhase("results");
    void persistResult(computed, true, setAssessmentId);
  }, []);

  const handleComplete = useCallback(
    (profile: ProfileType, answers: Record<number, AnswerValue>) => {
      const computed = computeResult(profile, answers);
      setResult(computed);
      setIsDemo(false);
      setPhase("results");
      void persistResult(computed, false, setAssessmentId);
    },
    []
  );

  const handleRestart = useCallback(() => {
    clearSessionAssessment();
    setResult(null);
    setIsDemo(false);
    setAssessmentId(undefined);
    setPhase("landing");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (phase === "flow") {
    return (
      <AssessmentFlow onComplete={handleComplete} onRestart={handleRestart} />
    );
  }

  if (phase === "results" && result) {
    return (
      <AssessmentResults
        result={result}
        isDemo={isDemo}
        assessmentId={assessmentId}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <AssessmentLanding onStart={handleStart} onStartDemo={handleStartDemo} />
  );
}

/* ----------------------------- persistence ----------------------------- */

async function persistResult(
  result: AssessmentResult,
  isDemo: boolean,
  onId: (id: string) => void
) {
  if (typeof window === "undefined") return;
  try {
    const stored = toStored(result, isDemo);
    sessionStorage.setItem("etech-assessment-result", JSON.stringify(result));
    sessionStorage.setItem("etech-assessment-is-demo", String(isDemo));
    sessionStorage.setItem(
      "etech-assessment-assessment-id",
      stored.assessment_id
    );
    onId(stored.assessment_id);
    // Best-effort server-side capture; ignore network failures so results
    // always paint for the user.
    await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stored),
    });
  } catch {
    /* no-op: keep results usable offline */
  }
}
