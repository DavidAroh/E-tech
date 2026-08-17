"use client";

import { useCallback, useState } from "react";
import { AssessmentForm } from "./AssessmentForm";
import { AssessmentLanding } from "./AssessmentLanding";

type Phase = "landing" | "form";

export function AssessmentApp() {
  const [phase, setPhase] = useState<Phase>("landing");

  const handleStart = useCallback(() => {
    setPhase("form");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleBack = useCallback(() => {
    setPhase("landing");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (phase === "form") {
    return <AssessmentForm onBack={handleBack} />;
  }

  return <AssessmentLanding onStart={handleStart} />;
}