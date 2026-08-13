/**
 * E-Tech Client Assessment — scoring + recommendation engine.
 * Pure functions; isomorphic (runs in client + server). No React imports.
 *
 * PRD §11–§15: scoring, risk classification, key findings, top-3 priorities,
 * service recommendations, and the 30/60/90-day roadmap.
 */

import {
  ANSWER_SCORES,
  ASSESSMENT_DISCLAIMER,
  AssessmentDomain,
  DOMAINS,
  DOMAIN_MAX_SCORE,
  OVERALL_MAX_SCORE,
  QUESTIONS,
  QUESTIONS_BY_DOMAIN,
  Question,
  RECOMMENDATION_RULES,
  RISK_CLASSIFICATIONS,
  RiskLevel,
  ROADMAP,
  TOTAL_QUESTIONS,
} from "@/data/assessment";

export type ProfileInput = {
  organizationName?: string;
  industry?: string;
  orgSize?: "Small" | "Medium" | "Large" | string;
  employees?: string;
  aiUsage?: string;
  cloudUsage?: string;
  assessmentGoal?: string;
};

export type Answers = Record<number, import("@/data/assessment").AnswerValue>;

export type DomainResult = {
  domain: AssessmentDomain;
  questions: Question[];
  /** Total points in this domain (0–16). */
  points: number;
  /** Max possible points for this domain (always 16 currently). */
  maxPoints: number;
  /** Category percentage (lower = better). */
  percentage: number;
  riskLevel: RiskLevel;
  riskLabel: string;
  riskInterpretation: string;
  /** Counts of answers in this domain, used for tiebreaker + findings. */
  counts: {
    yes: number;
    partially: number;
    no: number;
    "not-sure": number;
  };
  /** Concise finding sentence for this domain. */
  finding: string;
  /** Recommended next step. */
  recommendation: string;
  /** E-Tech service slug this domain maps to (always set). */
  serviceSlug: string;
};

export type AssessmentResult = {
  profile: ProfileInput;
  answers: Answers;
  overallPoints: number;
  overallMax: number;
  overallPercentage: number;
  overallRiskLevel: RiskLevel;
  overallRiskLabel: string;
  overallRiskInterpretation: string;
  domains: DomainResult[];
  keyFindings: Array<{
    domainName: string;
    finding: string;
    recommendation: string;
    serviceSlug: string;
    serviceName: string;
  }>;
  topPriorities: DomainResult[];
  recommendedServices: Array<{
    slug: string;
    name: string;
    reason: string;
  }>;
  roadmap: typeof ROADMAP;
  disclaimer: string;
  totalQuestions: number;
  answeredCount: number;
  complete: boolean;
};

/** Get the risk classification for a percentage (0–100). */
export function classifyRisk(percentage: number): {
  level: RiskLevel;
  label: string;
  interpretation: string;
} {
  const match = RISK_CLASSIFICATIONS.find(
    (r) => percentage >= r.min && percentage <= r.max
  );
  if (!match) {
    return {
      level: "low",
      label: "Low Risk",
      interpretation:
        "Controls appear generally established; maintain and monitor.",
    };
  }
  return {
    level: match.level,
    label: match.label,
    interpretation: match.interpretation,
  };
}

/** Map an answer to its score. */
export function scoreAnswer(answer: import("@/data/assessment").AnswerValue): number {
  return ANSWER_SCORES[answer] ?? 0;
}

/** Score a single domain from its set of answers. */
function scoreDomain(
  domain: AssessmentDomain,
  answers: Answers
): DomainResult {
  const questions = QUESTIONS_BY_DOMAIN[domain.id] ?? [];
  const counts = { yes: 0, partially: 0, no: 0, "not-sure": 0 };
  let points = 0;

  for (const q of questions) {
    const a = answers[q.id];
    if (!a) continue;
    counts[a] += 1;
    points += scoreAnswer(a);
  }

  const maxPoints = questions.length * 4 || DOMAIN_MAX_SCORE;
  const percentage = maxPoints > 0 ? (points / maxPoints) * 100 : 0;
  const risk = classifyRisk(percentage);

  // Build a concise finding for this domain.
  // Prefer the PRD §13 trigger-style finding if any answer is `no`, else a generic statement.
  const rule = RECOMMENDATION_RULES.find((r) => r.domainId === domain.id);
  const hasNo = counts.no > 0;
  const hasNotSure = counts["not-sure"] > 0;

  let finding: string;
  let recommendation: string;
  if (hasNo && rule) {
    finding = rule.finding;
    recommendation = rule.recommendation;
  } else if (hasNotSure) {
    finding = `Your organization cannot confirm several ${domain.name.toLowerCase()} controls.`;
    recommendation = `Confirm and document the status of your ${domain.name.toLowerCase()} controls.`;
  } else if (points > 0) {
    finding = `Some ${domain.name.toLowerCase()} controls exist but are incomplete or inconsistent.`;
    recommendation = `Strengthen and formalize your ${domain.name.toLowerCase()} controls.`;
  } else {
    finding = `${domain.name} controls appear generally established.`;
    recommendation = `Maintain and monitor your ${domain.name.toLowerCase()} controls.`;
  }

  return {
    domain,
    questions,
    points,
    maxPoints,
    percentage: Math.round(percentage),
    riskLevel: risk.level,
    riskLabel: risk.label,
    riskInterpretation: risk.interpretation,
    counts,
    finding,
    recommendation,
    serviceSlug: domain.serviceSlug,
  };
}

/**
 * Compute the full assessment result from a profile + answers.
 * @param profile the organization profile collected before / during the assessment
 * @param answers full or partial answer map keyed by question id (1–36)
 */
export function computeResult(
  profile: ProfileInput,
  answers: Answers
): AssessmentResult {
  const domains = DOMAINS.map((d) => scoreDomain(d, answers));

  const overallPoints = domains.reduce((sum, d) => sum + d.points, 0);
  const overallMax = OVERALL_MAX_SCORE;
  const overallPercentage = overallMax > 0 ? (overallPoints / overallMax) * 100 : 0;
  const overallRisk = classifyRisk(overallPercentage);

  const answeredCount = Object.keys(answers).filter((k) =>
    answers[Number(k)] !== undefined
  ).length;

  // PRD §13 — key findings: triggered by any domain where an answer is "no".
  const keyFindings = domains
    .filter((d) => d.counts.no > 0)
    .map((d) => {
      const rule = RECOMMENDATION_RULES.find(
        (r) => r.domainId === d.domain.id
      );
      return {
        domainName: d.domain.name,
        finding: rule ? rule.finding : d.finding,
        recommendation: rule ? rule.recommendation : d.recommendation,
        serviceSlug: d.serviceSlug,
        serviceName: d.domain.service,
      };
    });

  // PRD §14 — top three priorities by domain percentage, descending.
  // Tiebreaker: more "No" answers, then more "Not sure" answers.
  const ranked = [...domains].sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.counts.no !== a.counts.no) return b.counts.no - a.counts.no;
    return b.counts["not-sure"] - a.counts["not-sure"];
  });
  const topPriorities = ranked.slice(0, 3);

  // PRD §17 — recommended services: the user's highest-risk domains.
  // Each priority maps to its E-Tech service. Dedupe by slug while keeping order.
  const seen = new Set<string>();
  const recommendedServices: AssessmentResult["recommendedServices"] = [];
  for (const d of ranked) {
    if (d.percentage === 0) continue;
    const slug = d.serviceSlug;
    if (seen.has(slug)) continue;
    seen.add(slug);
    recommendedServices.push({
      slug,
      name: d.domain.service,
      reason: `${d.domain.name} risk is ${d.riskLabel.toLowerCase()} (${d.percentage}%).`,
    });
    if (recommendedServices.length >= 5) break;
  }

  return {
    profile,
    answers,
    overallPoints,
    overallMax,
    overallPercentage: Math.round(overallPercentage),
    overallRiskLevel: overallRisk.level,
    overallRiskLabel: overallRisk.label,
    overallRiskInterpretation: overallRisk.interpretation,
    domains,
    keyFindings,
    topPriorities,
    recommendedServices,
    roadmap: ROADMAP,
    disclaimer: ASSESSMENT_DISCLAIMER,
    totalQuestions: TOTAL_QUESTIONS,
    answeredCount,
    complete: answeredCount === TOTAL_QUESTIONS,
  };
}

/** Whether all 36 questions have been answered. */
export function isComplete(answers: Answers): boolean {
  return Object.keys(answers).length >= TOTAL_QUESTIONS;
}

/* ----------------------------- Demo Mode ----------------------------- */

export type DemoProfile = "low-risk" | "moderate-risk" | "high-risk" | "critical-risk";

const DemoSeedProfile: ProfileInput = {
  organizationName: "Acme Demo Holdings",
  industry: "Technology",
  orgSize: "Medium",
  employees: "150",
  aiUsage: "Yes",
  cloudUsage: "Yes",
  assessmentGoal: "Understand current risk",
};

/** Build a full set of answers for a given demo profile type. */
export function buildDemoAnswers(profile: DemoProfile): Answers {
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    answers[q.id] = pickDemoAnswer(profile, q);
  }
  return answers;
}

/** Deterministic-ish demo seeding so a profile produces visibly different results. */
function pickDemoAnswer(
  profile: DemoProfile,
  q: Question
): import("@/data/assessment").AnswerValue {
  // Use question id to vary answers within a profile.
  const r = (q.id % 4) / 4;
  switch (profile) {
    case "low-risk":
      // Mostly yes; a few partially.
      return r < 0.75 ? "yes" : "partially";
    case "moderate-risk":
      // Mix of yes / partially.
      return r < 0.4 ? "yes" : r < 0.85 ? "partially" : "no";
    case "high-risk":
      // Many no / partially, few yes.
      return r < 0.2 ? "yes" : r < 0.55 ? "partially" : "no";
    case "critical-risk":
      // Mostly no / not-sure.
      return r < 0.1 ? "partially" : r < 0.2 ? "not-sure" : "no";
    default:
      return "partially";
  }
}

export function getDemoProfile(type: DemoProfile): {
  profile: ProfileInput;
  answers: Answers;
} {
  return {
    profile: { ...DemoSeedProfile },
    answers: buildDemoAnswers(type),
  };
}

export const DEMO_PROFILES: Array<{
  type: DemoProfile;
  label: string;
  description: string;
}> = [
  {
    type: "low-risk",
    label: "Low-Risk Organization",
    description: "Controls are largely established across all nine domains.",
  },
  {
    type: "moderate-risk",
    label: "Moderate-Risk Organization",
    description: "Some gaps appear across AI, cloud, and governance areas.",
  },
  {
    type: "high-risk",
    label: "High-Risk Organization",
    description: "Significant weaknesses require prioritized remediation.",
  },
  {
    type: "critical-risk",
    label: "Critical-Risk Organization",
    description: "Major gaps require urgent attention and professional review.",
  },
];

/* ----------------------------- Persistence ----------------------------- */

/**
 * Serialize an assessment result for storage / API submission.
 * Mirrors PRD §18 — Assessment Data & Privacy.
 */
export type StoredAssessment = {
  assessment_id: string;
  date: string;
  organization_name: string;
  industry: string;
  org_size: string;
  ai_usage: string;
  cloud_usage: string;
  assessment_goal: string;
  answers: Answers;
  category_scores: Array<{
    domain_id: string;
    domain_name: string;
    points: number;
    percentage: number;
    risk_level: RiskLevel;
    risk_label: string;
  }>;
  overall_score: number;
  overall_percentage: number;
  risk_level: RiskLevel;
  risk_label: string;
  key_findings: AssessmentResult["keyFindings"];
  recommendations: string[];
  roadmap: typeof ROADMAP;
  recommended_services: AssessmentResult["recommendedServices"];
  is_demo: boolean;
};

export function toStored(
  result: AssessmentResult,
  isDemo: boolean
): StoredAssessment {
  return {
    assessment_id: generateAssessmentId(),
    date: new Date().toISOString(),
    organization_name: result.profile.organizationName ?? "",
    industry: result.profile.industry ?? "",
    org_size: (result.profile.orgSize as string) ?? "",
    ai_usage: (result.profile.aiUsage as string) ?? "",
    cloud_usage: (result.profile.cloudUsage as string) ?? "",
    assessment_goal: (result.profile.assessmentGoal as string) ?? "",
    answers: result.answers,
    category_scores: result.domains.map((d) => ({
      domain_id: d.domain.id,
      domain_name: d.domain.name,
      points: d.points,
      percentage: d.percentage,
      risk_level: d.riskLevel,
      risk_label: d.riskLabel,
    })),
    overall_score: result.overallPoints,
    overall_percentage: result.overallPercentage,
    risk_level: result.overallRiskLevel,
    risk_label: result.overallRiskLabel,
    key_findings: result.keyFindings,
    recommendations: result.recommendedServices.map((s) => s.name),
    roadmap: result.roadmap,
    recommended_services: result.recommendedServices,
    is_demo: isDemo,
  };
}

function generateAssessmentId(): string {
  // Simple, no-dependency id suitable for client-side row identification.
  const rand = () => Math.random().toString(16).slice(2, 8);
  const time = Date.now().toString(36);
  return `ast_${time}_${rand()}${rand()}`;
}
