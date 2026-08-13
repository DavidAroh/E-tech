import type { Metadata } from "next";
import { AssessmentApp } from "@/components/assessment/AssessmentApp";

export const metadata: Metadata = {
  title: "Client Assessment",
  description:
    "Assess your organization's AI, cybersecurity, cloud and responsible-AI readiness with E-Tech's interactive client assessment. Assess. Identify. Protect.",
  keywords: [
    "AI risk assessment",
    "cybersecurity assessment",
    "AI governance",
    "cloud security assessment",
    "compliance readiness",
    "E-Tech assessment",
  ],
  openGraph: {
    title: "E-Tech Client Assessment",
    description:
      "Evaluate your AI, cybersecurity, cloud and responsible-AI readiness. Assess. Identify. Protect.",
  },
};

export default function AssessmentPage() {
  return (
    <>
      {/* The AssessmentApp orchestrates the landing → flow → results phases. */}
      <AssessmentApp />
    </>
  );
}
