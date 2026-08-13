/**
 * RSC-safe content. No React / icon library imports —
 * keeps the data module out of the client icon bundle.
 */

export type IconName =
  | "shield"
  | "brain"
  | "lock"
  | "search"
  | "scales"
  | "users"
  | "cloud"
  | "crosshair"
  | "key"
  | "book"
  | "graph"
  | "clipboard"
  | "eye"
  | "drives"
  | "grad"
  | "fingerprint"
  | "bank"
  | "heart"
  | "bag"
  | "factory"
  | "buildings"
  | "plane"
  | "drop"
  | "phone"
  | "briefcase"
  | "sparkle"
  | "handshake"
  | "trophy"
  | "shieldCheck"
  | "refresh"
  | "target"
  | "leaf"
  | "check"
  | "clock"
  | "mail"
  | "map"
  | "arrowUpRight"
  | "arrowUp"
  | "caretDown"
  | "caretLeft"
  | "caretRight"
  | "spinner"
  | "checkCircle"
  | "x";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Assessment", href: "/assessment" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "#contact" },
] as const;

export const futureRoutes = [
  "/blog",
  "/resources",
  "/insights",
  "/news",
  "/careers",
  "/team",
  "/events",
  "/portal",
] as const;

export const aboutParagraphs = [
  "We help leadership teams move from AI experiments to governed, production-ready capability without compromising security, ethics, privacy, or trust.",
  "Work is measured and discreet, built for regulated and high-stakes environments across Africa and beyond.",
];

/** Homepage surface values only. Full set retained in coreValues for reference. */
export const homepageValues = [
  "Integrity",
  "Security",
  "Trust",
  "Responsible AI",
] as const;

export const mission =
  "To equip organizations with the clarity, controls, and confidence to adopt AI securely and responsibly.";

export const vision =
  "A business landscape where intelligent systems amplify human judgment, under governance that earns lasting trust.";

export type ValueItem = {
  name: string;
  descriptor: string;
  icon: IconName;
};

export const coreValues: ValueItem[] = [
  { name: "Integrity", descriptor: "Honest counsel even when the answer is inconvenient.", icon: "scales" },
  { name: "Innovation", descriptor: "Practical advancement without reckless experimentation.", icon: "sparkle" },
  { name: "Trust", descriptor: "Confidentiality and reliability as non-negotiables.", icon: "handshake" },
  { name: "Excellence", descriptor: "Rigorous standards in every engagement deliverable.", icon: "trophy" },
  { name: "Security", descriptor: "Defense-in-depth woven into strategy from day one.", icon: "shieldCheck" },
  { name: "Continuous Learning", descriptor: "Staying ahead of threat and technology curves.", icon: "refresh" },
  { name: "Client Success", descriptor: "Outcomes defined by the client's strategic goals.", icon: "target" },
  { name: "Responsible AI", descriptor: "Ethics, fairness, and accountability by design.", icon: "leaf" },
];

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  /** Shown as primary cards on the homepage */
  primary?: boolean;
};

export const services: ServiceItem[] = [
  {
    slug: "ai-strategy-advisory",
    title: "AI Strategy Advisory",
    description:
      "Roadmaps that align AI investment with outcomes, risk appetite, and operating constraints.",
    icon: "brain",
    primary: true,
  },
  {
    slug: "ai-risk-governance",
    title: "AI Risk & Governance",
    description:
      "Policies and control frameworks so AI programs stay accountable, auditable, and board-ready.",
    icon: "scales",
    primary: true,
  },
  {
    slug: "cybersecurity-assessment",
    title: "Cybersecurity Assessment",
    description:
      "Reviews of controls, architecture, and exposure against threats that matter in your sector.",
    icon: "shield",
    primary: true,
  },
  {
    slug: "secure-ai-implementation",
    title: "Secure AI Implementation",
    description:
      "Guidance for deploying models with access control, monitoring, and secure data pipelines.",
    icon: "drives",
    primary: true,
  },
  {
    slug: "board-briefings",
    title: "Board & Executive Briefings",
    description:
      "Clear briefings that equip directors to govern AI and cyber risk without jargon.",
    icon: "users",
    primary: true,
  },
  {
    slug: "responsible-ai-audit",
    title: "Responsible AI Review",
    description:
      "Independent reviews of fairness, transparency, documentation, and model lifecycle controls.",
    icon: "book",
    primary: true,
  },
  {
    slug: "data-privacy-compliance",
    title: "Data Privacy & Compliance",
    description:
      "NDPR and GDPR-aligned practices for AI and digital transformation initiatives.",
    icon: "lock",
  },
  {
    slug: "threat-intelligence",
    title: "Threat Intelligence",
    description:
      "Contextual intelligence so teams anticipate relevant threats, not generic alerts.",
    icon: "crosshair",
  },
  {
    slug: "identity-access",
    title: "Identity & Access Management",
    description:
      "Authentication, authorization, and privileged access across hybrid and cloud environments.",
    icon: "key",
  },
  {
    slug: "cloud-security",
    title: "Cloud Security Advisory",
    description:
      "Architecture reviews and hardening for multi-cloud estates hosting sensitive workloads.",
    icon: "cloud",
  },
  {
    slug: "security-architecture",
    title: "Security Architecture",
    description:
      "Resilient security architectures that scale without introducing blind spots.",
    icon: "graph",
  },
  {
    slug: "incident-readiness",
    title: "Incident Readiness",
    description:
      "Playbooks and tabletop exercises so teams act decisively when incidents occur.",
    icon: "eye",
  },
  {
    slug: "third-party-risk",
    title: "Third-Party Risk",
    description:
      "Due diligence for AI vendors, cloud providers, and critical suppliers.",
    icon: "clipboard",
  },
  {
    slug: "security-awareness",
    title: "Security Awareness Training",
    description:
      "Role-based programs that build a security-conscious culture.",
    icon: "grad",
  },
  {
    slug: "digital-forensics",
    title: "Digital Forensics Support",
    description:
      "Investigative support when security events require deeper analysis.",
    icon: "search",
  },
  {
    slug: "zero-trust",
    title: "Zero Trust Enablement",
    description:
      "Practical zero-trust roadmaps that prioritize high-impact controls.",
    icon: "fingerprint",
  },
  {
    slug: "ai-risk-assessments",
    title: "AI Risk Assessments",
    description:
      "AI inventory, use-case risk identification, and prioritized mitigation across your AI portfolio.",
    icon: "brain",
  },
  {
    slug: "ai-policy-development",
    title: "AI Policy Development",
    description:
      "Acceptable-use policies covering approved tools, prohibited uses, data handling, and human oversight.",
    icon: "book",
  },
  {
    slug: "ai-governance",
    title: "AI Governance",
    description:
      "Accountability, oversight, and leadership review processes for responsible AI adoption.",
    icon: "scales",
  },
  {
    slug: "cloud-security-assessment",
    title: "Cloud Security Assessment",
    description:
      "MFA, access reviews, configuration, backups, and visibility checks for multi-cloud estates.",
    icon: "cloud",
  },
  {
    slug: "incident-response",
    title: "Incident Response Readiness",
    description:
      "Written procedures, assigned roles, reporting paths, and tested response playbooks.",
    icon: "eye",
  },
  {
    slug: "security-monitoring",
    title: "Security Monitoring",
    description:
      "Logging, alert review, escalation paths, and detection coverage for important systems.",
    icon: "search",
  },
  {
    slug: "deepfake-fraud-protection",
    title: "Deepfake/Fraud Protection",
    description:
      "Verification procedures and targeted awareness for AI-enabled impersonation and fraud.",
    icon: "shieldCheck",
  },
  {
    slug: "compliance",
    title: "Compliance Readiness",
    description:
      "Identify applicable requirements, map controls, maintain evidence, and review readiness.",
    icon: "clipboard",
  },
  {
    slug: "training-awareness",
    title: "Training & Awareness",
    description:
      "Recurring cybersecurity, AI safety, phishing, deepfake/fraud, and secure data-handling training.",
    icon: "grad",
  },
];

export const primaryServices = services.filter((s) => s.primary);
export const secondaryServices = services.filter((s) => !s.primary);

/** Kept for form/copy reference; not rendered as a homepage section after distill. */
export const whyChooseFeatures = [
  "Dual expertise in AI advisory and cybersecurity",
  "Governance-first approach to technology adoption",
  "Sector-aware guidance for regulated environments",
  "Clear deliverables with executive-ready reporting",
];

export type IndustryItem = {
  name: string;
  icon: IconName;
};

export const industries: IndustryItem[] = [
  { name: "Financial Services", icon: "bank" },
  { name: "Healthcare", icon: "heart" },
  { name: "Retail & E-commerce", icon: "bag" },
  { name: "Manufacturing", icon: "factory" },
  { name: "Professional Services", icon: "briefcase" },
  { name: "Aviation & Logistics", icon: "plane" },
  { name: "Energy & Oil", icon: "drop" },
  { name: "Education", icon: "grad" },
  { name: "Telecommunications", icon: "phone" },
  { name: "Government & Public Sector", icon: "buildings" },
  { name: "Technology & SaaS", icon: "buildings" },
];

export const processSteps = [
  {
    title: "Consultation",
    description: "Clarify objectives, constraints, and success criteria with leadership stakeholders.",
  },
  {
    title: "Risk Assessment",
    description: "Map AI and security exposure across people, process, data, and technology.",
  },
  {
    title: "Strategy Development",
    description: "Define prioritized initiatives, control baselines, and an executable roadmap.",
  },
  {
    title: "Implementation Guidance",
    description: "Support secure design decisions and operationalize recommended controls.",
  },
  {
    title: "Training",
    description: "Equip teams and executives with the skills to sustain responsible adoption.",
  },
  {
    title: "Continuous Support",
    description: "Ongoing advisory, reviews, and refinement as threats and capabilities evolve.",
  },
];

// PLACEHOLDER: Replace with real client testimonials when available.
export const testimonials = [
  {
    quote:
      "E-Tech helped us introduce AI tools without creating blind spots our regulators would later question.",
    name: "Adaeze Okonkwo",
    role: "Chief Risk Officer",
    company: "Lagos commercial bank",
  },
  {
    quote:
      "Their assessments were rigorous and practical. We left with a roadmap the board could actually fund.",
    name: "Chinedu Adebayo",
    role: "CTO",
    company: "Regional logistics group",
  },
  {
    quote:
      "Few advisors understand both model governance and cyber controls. That dual lens changed our program.",
    name: "Fatima Bello",
    role: "Head of Digital Transformation",
    company: "Healthcare network",
  },
];

export const faqs = [
  {
    question: "Who do you typically work with?",
    answer:
      "Mid-market and enterprise organizations in financial services, healthcare, energy, government, and technology that are adopting AI or strengthening cybersecurity.",
  },
  {
    question: "Do you only advise, or do you support implementation?",
    answer:
      "Both strategy and implementation guidance. We equip your teams with architecture, controls, and decisions; we do not replace engineering or security operations.",
  },
  {
    question: "How do engagements begin?",
    answer:
      "A consultation to define scope, then a focused risk or readiness assessment, then a prioritized roadmap with optional implementation support.",
  },
  {
    question: "How is confidential information handled?",
    answer:
      "NDAs, least-privilege access, and engagement-specific data handling matched to the sensitivity of the work.",
  },
];

export const industryOptions = industries.map((i) => i.name);
export const serviceOptions = services.map((s) => s.title);

export const consultationTypes = [
  { value: "virtual" as const, label: "Virtual" },
  { value: "in-person" as const, label: "In-Person" },
];

export const contactInfo = {
  phone: "091-20-63-99-64",
  phoneHref: "tel:+2349120639964",
  // REPLACEABLE: update when production inbox is confirmed
  email: "info@etelatechnologies.com",
  emailHref: "mailto:info@etelatechnologies.com",
  hours: "Monday - Friday, 9:00 AM - 5:00 PM",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
};

export const footerLinks = {
  quick: [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Assessment", href: "/assessment" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
    { label: "Book a Consultation", href: "#consultation" },
  ],
  services: primaryServices.map((s) => ({
    label: s.title,
    href: "#services",
  })),
  company: [
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Team", href: "/team" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
