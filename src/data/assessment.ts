/**
 * E-Tech Client Assessment — service-aligned data model.
 *
 * Keeps question / scoring / recommendation / service mappings separate from
 * the interface so the assessment can be edited without rebuilding the UI.
 * PRD: E-Tech Client Assessment v1.1 (36-question MVP, 9 domains).
 */

import type { IconName } from "./content";

export type AnswerValue = "yes" | "partially" | "no" | "not-sure";

export const ANSWER_VALUES: AnswerValue[] = [
  "yes",
  "partially",
  "no",
  "not-sure",
];

export const ANSWER_LABELS: Record<AnswerValue, string> = {
  yes: "Yes",
  partially: "Partially",
  no: "No",
  "not-sure": "Not sure",
};

/** PRD §11: 0 = control established, 4 = absent, 2 = incomplete, 3 = can't confirm. */
export const ANSWER_SCORES: Record<AnswerValue, number> = {
  yes: 0,
  partially: 2,
  no: 4,
  "not-sure": 3,
};

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export const RISK_CLASSIFICATIONS: Array<{
  level: RiskLevel;
  min: number;
  max: number;
  label: string;
  interpretation: string;
}> = [
  {
    level: "low",
    min: 0,
    max: 25,
    label: "Low Risk",
    interpretation: "Controls appear generally established; maintain and monitor.",
  },
  {
    level: "moderate",
    min: 26,
    max: 50,
    label: "Moderate Risk",
    interpretation:
      "Gaps exist and should be addressed through planned improvements.",
  },
  {
    level: "high",
    min: 51,
    max: 75,
    label: "High Risk",
    interpretation:
      "Significant weaknesses require prioritized remediation.",
  },
  {
    level: "critical",
    min: 76,
    max: 100,
    label: "Critical Risk",
    interpretation:
      "Major gaps require urgent attention and professional review.",
  },
];

export const QUESTIONS_PER_DOMAIN = 4;
export const DOMAIN_MAX_SCORE = QUESTIONS_PER_DOMAIN * 4; // 16
export const TOTAL_QUESTIONS = 36;
export const OVERALL_MAX_SCORE = TOTAL_QUESTIONS * 4; // 144

/** Map assessment domain → E-Tech professional service (PRD §5 + §13). */
export type AssessmentDomain = {
  /** Stable slug used as answer-map key and for linkages. */
  id: string;
  /** 1-based position in the nine-domain framework. */
  order: number;
  /** Display name of the assessment domain. */
  name: string;
  /** What the assessment measures (PRD §5 column 2). */
  measures: string;
  /** Primary E-Tech service the domain maps to (PRD §5 column 3). */
  service: string;
  /** Service slug aligned to the core services from content.ts. */
  serviceSlug: string;
  icon: IconName;
};

export const DOMAINS: AssessmentDomain[] = [
  {
    id: "ai-risk",
    order: 1,
    name: "AI Risk Assessment",
    measures:
      "AI inventory, use cases, AI risks, data exposure, risk identification and impact.",
    service: "AI Risk Assessments",
    serviceSlug: "ai-risk-assessments",
    icon: "brain",
  },
  {
    id: "ai-policy",
    order: 2,
    name: "AI Policy Development",
    measures:
      "Existence, coverage, communication and review of AI-use rules and procedures.",
    service: "AI Policy Development",
    serviceSlug: "ai-policy-development",
    icon: "book",
  },
  {
    id: "ai-governance",
    order: 3,
    name: "AI Governance",
    measures:
      "Ownership, accountability, human oversight, vendor review and governance processes.",
    service: "AI Governance",
    serviceSlug: "ai-governance",
    icon: "scales",
  },
  {
    id: "cloud-security",
    order: 4,
    name: "Cloud Security",
    measures:
      "Cloud usage, access controls, MFA, configuration, data protection, backups and visibility.",
    service: "Cloud Security",
    serviceSlug: "cloud-security-assessment",
    icon: "cloud",
  },
  {
    id: "incident-response",
    order: 5,
    name: "Incident Response",
    measures:
      "Incident procedures, reporting, roles, response readiness, testing and recovery.",
    service: "Incident Response",
    serviceSlug: "incident-response",
    icon: "eye",
  },
  {
    id: "security-monitoring",
    order: 6,
    name: "Security Monitoring",
    measures:
      "Logging, alerting, monitoring coverage, detection capability and ongoing review.",
    service: "Security Monitoring",
    serviceSlug: "security-monitoring",
    icon: "search",
  },
  {
    id: "deepfake-fraud",
    order: 7,
    name: "Deepfake/Fraud Protection",
    measures:
      "Phishing, impersonation, deepfake awareness, verification procedures and fraud controls.",
    service: "Deepfake/Fraud Protection",
    serviceSlug: "deepfake-fraud-protection",
    icon: "shieldCheck",
  },
  {
    id: "compliance",
    order: 8,
    name: "Compliance",
    measures:
      "Awareness of applicable requirements, evidence, policy alignment, reviews and compliance readiness.",
    service: "Compliance",
    serviceSlug: "compliance",
    icon: "clipboard",
  },
  {
    id: "training-awareness",
    order: 9,
    name: "Training & Awareness",
    measures:
      "Cybersecurity, AI safety, phishing, fraud, reporting and recurring employee training.",
    service: "Training & Awareness",
    serviceSlug: "training-awareness",
    icon: "grad",
  },
];

export type Question = {
  /** 1-based question number across the full assessment (1–36). */
  id: number;
  domainId: string;
  question: string;
};

/** PRD §10 — Revised 36-question MVP, grouped by the nine domains. */
export const QUESTIONS: Question[] = [
  // 1. AI Risk Assessment
  {
    id: 1,
    domainId: "ai-risk",
    question:
      "Has your organization identified the AI tools and AI-enabled systems currently being used?",
  },
  {
    id: 2,
    domainId: "ai-risk",
    question:
      "Has the organization identified the main business, security, privacy or operational risks associated with its AI use?",
  },
  {
    id: 3,
    domainId: "ai-risk",
    question:
      "Is there a process for assessing AI-related risks before introducing AI into important business processes?",
  },
  {
    id: 4,
    domainId: "ai-risk",
    question:
      "Are important AI-related risks documented, assigned to owners, and reviewed periodically?",
  },
  // 2. AI Policy Development
  {
    id: 5,
    domainId: "ai-policy",
    question:
      "Does your organization have a written policy governing acceptable use of AI tools?",
  },
  {
    id: 6,
    domainId: "ai-policy",
    question:
      "Does the AI policy define what confidential, personal, sensitive or proprietary information employees must not enter into unauthorized AI tools?",
  },
  {
    id: 7,
    domainId: "ai-policy",
    question:
      "Does the AI policy define approved tools, prohibited uses, employee responsibilities and required human review?",
  },
  {
    id: 8,
    domainId: "ai-policy",
    question:
      "Is the AI policy communicated to employees and reviewed when AI usage or organizational requirements change?",
  },
  // 3. AI Governance
  {
    id: 9,
    domainId: "ai-governance",
    question:
      "Are specific people or teams accountable for AI governance and responsible AI decisions?",
  },
  {
    id: 10,
    domainId: "ai-governance",
    question:
      "Is human oversight required for important or high-impact AI-generated decisions or outputs?",
  },
  {
    id: 11,
    domainId: "ai-governance",
    question:
      "Does the organization review AI vendors or third-party AI services before approving them?",
  },
  {
    id: 12,
    domainId: "ai-governance",
    question:
      "Does leadership periodically review AI risks, incidents, policy compliance and governance effectiveness?",
  },
  // 4. Cloud Security
  {
    id: 13,
    domainId: "cloud-security",
    question:
      "Are cloud accounts and important cloud services protected with multi-factor authentication?",
  },
  {
    id: 14,
    domainId: "cloud-security",
    question:
      "Are cloud access privileges limited according to job responsibilities and reviewed regularly?",
  },
  {
    id: 15,
    domainId: "cloud-security",
    question:
      "Are important cloud systems, configurations and data protected through backups and recovery procedures?",
  },
  {
    id: 16,
    domainId: "cloud-security",
    question:
      "Does the organization monitor cloud activity and review security settings or configuration changes regularly?",
  },
  // 5. Incident Response
  {
    id: 17,
    domainId: "incident-response",
    question:
      "Does your organization have a written incident-response procedure?",
  },
  {
    id: 18,
    domainId: "incident-response",
    question:
      "Do employees know how and where to report suspected security, AI or fraud incidents?",
  },
  {
    id: 19,
    domainId: "incident-response",
    question:
      "Are incident-response responsibilities assigned to specific people or teams?",
  },
  {
    id: 20,
    domainId: "incident-response",
    question:
      "Is the incident-response plan periodically tested, reviewed or improved?",
  },
  // 6. Security Monitoring
  {
    id: 21,
    domainId: "security-monitoring",
    question:
      "Are important systems, accounts or security events logged?",
  },
  {
    id: 22,
    domainId: "security-monitoring",
    question:
      "Does someone or a service regularly review security alerts or suspicious activity?",
  },
  {
    id: 23,
    domainId: "security-monitoring",
    question:
      "Does the organization have a defined process for escalating significant security alerts?",
  },
  {
    id: 24,
    domainId: "security-monitoring",
    question:
      "Are monitoring results used to identify recurring weaknesses and improve security controls?",
  },
  // 7. Deepfake/Fraud Protection
  {
    id: 25,
    domainId: "deepfake-fraud",
    question:
      "Are employees trained to recognize AI-generated impersonation, deepfakes and other modern fraud techniques?",
  },
  {
    id: 26,
    domainId: "deepfake-fraud",
    question:
      "Are unusual payment, credential, access or executive requests verified through a trusted secondary channel?",
  },
  {
    id: 27,
    domainId: "deepfake-fraud",
    question:
      "Does the organization have procedures for handling suspected impersonation or AI-enabled fraud?",
  },
  {
    id: 28,
    domainId: "deepfake-fraud",
    question:
      "Are employees encouraged and able to report suspicious messages, calls, videos or requests quickly?",
  },
  // 8. Compliance
  {
    id: 29,
    domainId: "compliance",
    question:
      "Has the organization identified the privacy, cybersecurity, contractual or industry requirements relevant to its operations?",
  },
  {
    id: 30,
    domainId: "compliance",
    question:
      "Are policies and security controls mapped to applicable organizational or regulatory requirements where appropriate?",
  },
  {
    id: 31,
    domainId: "compliance",
    question:
      "Does the organization maintain evidence or records needed to demonstrate that important controls are being followed?",
  },
  {
    id: 32,
    domainId: "compliance",
    question:
      "Are compliance requirements and control effectiveness reviewed periodically or when obligations change?",
  },
  // 9. Training & Awareness
  {
    id: 33,
    domainId: "training-awareness",
    question:
      "Do employees receive regular cybersecurity awareness training?",
  },
  {
    id: 34,
    domainId: "training-awareness",
    question:
      "Do employees receive guidance on safe and responsible use of AI tools?",
  },
  {
    id: 35,
    domainId: "training-awareness",
    question:
      "Are phishing, social engineering, deepfake/fraud and secure data-handling practices included in awareness activities?",
  },
  {
    id: 36,
    domainId: "training-awareness",
    question:
      "Is training refreshed periodically and is participation or effectiveness tracked?",
  },
];

/** Questions grouped by domain (helper for UI section indicators). */
export const QUESTIONS_BY_DOMAIN: Record<string, Question[]> = DOMAINS.reduce(
  (acc, domain) => {
    acc[domain.id] = QUESTIONS.filter((q) => q.domainId === domain.id);
    return acc;
  },
  {} as Record<string, Question[]>
);

/** PRD §13 — recommendation engine trigger mappings. */
export type RecommendationRule = {
  /** Domain that triggers this recommendation. */
  domainId: string;
  /** Trigger condition — fired when any answer in the domain equals `no`. */
  triggerAnswer: "no";
  /** Weakness finding text. */
  finding: string;
  /** Practical action / recommendation. */
  recommendation: string;
  /** E-Tech service slug this maps to. */
  serviceSlug: string;
};

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    domainId: "ai-policy",
    triggerAnswer: "no",
    finding:
      "No written AI-use policy is in place.",
    recommendation:
      "Establish an AI-use policy covering approved tools, prohibited uses, data handling, responsibilities and human oversight.",
    serviceSlug: "ai-policy-development",
  },
  {
    domainId: "cloud-security",
    triggerAnswer: "no",
    finding:
      "Cloud identity and access controls are not established.",
    recommendation:
      "Strengthen cloud identity and access controls, including MFA and privilege reviews.",
    serviceSlug: "cloud-security-assessment",
  },
  {
    domainId: "incident-response",
    triggerAnswer: "no",
    finding:
      "No incident-response procedure exists.",
    recommendation:
      "Develop an incident-response procedure, assign responsibilities and establish reporting/escalation paths.",
    serviceSlug: "incident-response",
  },
  {
    domainId: "security-monitoring",
    triggerAnswer: "no",
    finding:
      "Security monitoring is absent.",
    recommendation:
      "Establish appropriate logging, alert review and escalation processes for important systems.",
    serviceSlug: "security-monitoring",
  },
  {
    domainId: "deepfake-fraud",
    triggerAnswer: "no",
    finding:
      "Deepfake / fraud controls are missing.",
    recommendation:
      "Implement verification procedures and targeted awareness for AI-enabled impersonation and fraud.",
    serviceSlug: "deepfake-fraud-protection",
  },
  {
    domainId: "compliance",
    triggerAnswer: "no",
    finding:
      "Applicable compliance requirements have not been identified.",
    recommendation:
      "Identify applicable requirements and establish a compliance-readiness review process.",
    serviceSlug: "compliance",
  },
  {
    domainId: "training-awareness",
    triggerAnswer: "no",
    finding:
      "Employee awareness training is not in place.",
    recommendation:
      "Introduce recurring cybersecurity, AI safety, phishing and fraud awareness training.",
    serviceSlug: "training-awareness",
  },
  {
    domainId: "ai-governance",
    triggerAnswer: "no",
    finding:
      "AI accountability and oversight are not established.",
    recommendation:
      "Assign AI accountability, establish oversight and implement AI risk review.",
    serviceSlug: "ai-governance",
  },
  {
    domainId: "ai-risk",
    triggerAnswer: "no",
    finding:
      "AI risks have not been identified.",
    recommendation:
      "Create an AI inventory and risk-assessment process for AI use cases.",
    serviceSlug: "ai-risk-assessments",
  },
];

/** PRD §15 — revised 30/60/90-day roadmap. */
export type RoadmapPhase = {
  key: "first-30" | "days-31-60" | "days-61-90";
  period: string;
  title: string;
  actions: string[];
};

export const ROADMAP: RoadmapPhase[] = [
  {
    key: "first-30",
    period: "First 30 Days",
    title: "Immediate Priorities",
    actions: [
      "Address critical findings.",
      "Strengthen authentication.",
      "Identify important AI tools and sensitive data.",
      "Establish basic AI-use rules.",
      "Establish incident reporting.",
      "Verify key cloud access controls.",
      "Begin targeted awareness for phishing/deepfake/fraud.",
    ],
  },
  {
    key: "days-31-60",
    period: "Days 31–60",
    title: "Strengthening Controls",
    actions: [
      "Formalize AI governance and policies.",
      "Improve employee training.",
      "Review AI/cloud vendors.",
      "Strengthen data protection.",
      "Establish or improve logging and alert review.",
      "Identify compliance requirements.",
      "Test core incident procedures.",
    ],
  },
  {
    key: "days-61-90",
    period: "Days 61–90",
    title: "Optimization",
    actions: [
      "Conduct follow-up assessment.",
      "Test incident response.",
      "Review AI systems and cloud configurations.",
      "Measure training effectiveness.",
      "Review monitoring coverage.",
      "Assess compliance readiness.",
      "Establish ongoing risk monitoring.",
    ],
  },
];

/* ----------------------------- Organization Profile ----------------------------- */

export const INDUSTRY_OPTIONS = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Professional Services",
  "Government",
  "Other",
] as const;

export const ORG_SIZE_OPTIONS = [
  "Small",
  "Medium",
  "Large",
] as const;

export const TRISTATE_OPTIONS = ["Yes", "No", "Not sure"] as const;

export const ASSESSMENT_GOAL_OPTIONS = [
  "Understand current risk",
  "Improve cybersecurity",
  "Improve AI governance",
  "Improve cloud security",
  "Prepare for secure AI adoption",
  "Strengthen compliance readiness",
  "Train employees",
  "Improve incident response",
  "General assessment",
] as const;

/** Services a lead can request after results (PRD §17). */
export const ASSESSMENT_SERVICE_OPTIONS = [
  "AI Risk Assessment",
  "AI Policy Development",
  "AI Governance",
  "Cloud Security",
  "Incident Response",
  "Security Monitoring",
  "Deepfake/Fraud Protection",
  "Compliance",
  "Training & Awareness",
] as const;

/** Service option → assessment service-slug link. */
export const SERVICE_OPTION_TO_SLUG: Record<string, string> = {
  "AI Risk Assessment": "ai-risk-assessments",
  "AI Policy Development": "ai-policy-development",
  "AI Governance": "ai-governance",
  "Cloud Security": "cloud-security-assessment",
  "Incident Response": "incident-response",
  "Security Monitoring": "security-monitoring",
  "Deepfake/Fraud Protection": "deepfake-fraud-protection",
  "Compliance": "compliance",
  "Training & Awareness": "training-awareness",
};

/** PRD §16 — copy for the professional assessment CTA. */
export const PROFESSIONAL_CTA = {
  title: "Need a Deeper Assessment?",
  body:
    "The website assessment provides an initial indication of risk posture. E-Tech can conduct a more detailed professional assessment tailored to your systems, processes, people, cloud environment, AI usage, governance and applicable requirements.",
  primary: "Request Professional Assessment",
  secondary: "Explore E-Tech Services",
};

/** PRD §7 — landing-page copy. */
export const ASSESSMENT_LANDING = {
  heading: "Client Assessment",
  subheading: "Assess. Identify. Protect.",
  body:
    "Evaluate your organization’s AI, cybersecurity, cloud and responsible-AI readiness with E-Tech’s interactive client assessment.",
  primaryCta: "Start Assessment",
  secondaryCta: "Learn About E-Tech Services",
  primaryHref: "#start",
  secondaryHref: "#services",
};

export const ASSESSMENT_DISCLAIMER =
  "The online assessment is a screening and prioritization tool, not a certification, audit, penetration test, legal opinion, or guarantee of security or compliance.";

export const PRIVACY_NOTICE =
  "Do not enter passwords, confidential business information, financial credentials, or other sensitive information into the assessment. We collect only information needed to score your risk profile.";
