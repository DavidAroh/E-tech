"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ASSESSMENT_DISCLAIMER,
  ASSESSMENT_SERVICE_OPTIONS,
  ORG_SIZE_OPTIONS,
  PROFESSIONAL_CTA,
  RISK_CLASSIFICATIONS,
} from "@/data/assessment";
import type { AssessmentResult } from "@/lib/assessment";
import { EASE_ENTRANCE } from "@/lib/motion";
import { LIMITS, isEmail, isOffline, isPhone } from "@/lib/validation";
import { BrandIcon } from "../BrandIcon";
import { cn } from "@/lib/cn";

type AssessmentResultsProps = {
  result: AssessmentResult;
  isDemo: boolean;
  /** Server-side assessment id assigned when results were persisted. */
  assessmentId?: string;
  /** Bubbles up after the dashboard paints, so the parent can persist server-side. */
  onPersist?: (leadRef: {
    name: string;
    organization: string;
    email: string;
    phone: string;
    org_size: string;
    service_required: string;
    message: string;
  }) => void;
  onRestart: () => void;
};

const RISK_STYLES: Record<string, string> = {
  low: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  moderate: "bg-amber-500/15 text-amber-200 border-amber-500/30",
  high: "bg-orange-500/15 text-orange-200 border-orange-500/30",
  critical: "bg-red-500/15 text-red-200 border-red-500/30",
};

function RiskBadge({ level, label }: { level: string; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        RISK_STYLES[level]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}

export function AssessmentResults({
  result,
  isDemo,
  assessmentId,
  onPersist,
  onRestart,
}: AssessmentResultsProps) {
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={topRef}
      id="results"
      aria-labelledby="results-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content mx-auto max-w-5xl">
        {isDemo ? (
          <div
            className="mb-6 rounded-card border border-purple-light/30 bg-purple/10 px-4 py-3 text-sm text-purple-light"
            role="status"
          >
            <span className="font-semibold">Demo mode.</span> These results use
            sample data. {ASSESSMENT_DISCLAIMER}
          </div>
        ) : null}

        <motion.div
          initial={reduce ? false : { opacity: 1, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-purple-light">
            Your E-Tech Assessment Results
          </p>
          <h2
            id="results-heading"
            className="heading-display mt-2 text-3xl font-bold text-white md:text-4xl"
          >
            Overall risk profile
          </h2>
        </motion.div>

        <OverallGauge result={result} />

        <CategoryGrid result={result} />

        <TopPriorities result={result} />

        <KeyFindings result={result} />

        <RecommendedServices result={result} />

        <Roadmap result={result} />

        <ProfessionalCTA
          result={result}
          isDemo={isDemo}
          assessmentId={assessmentId}
          onPersist={onPersist}
        />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-xs leading-relaxed text-beige-muted/70">
            {ASSESSMENT_DISCLAIMER}
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-beige/15 px-5 py-3 font-sans text-sm font-medium text-beige-muted transition-colors duration-400 ease-premium hover:border-beige/40 hover:text-beige"
          >
            <BrandIcon name="refresh" className="h-4 w-4" />
            Start new assessment
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Overall gauge ----------------------------- */

function OverallGauge({ result }: { result: AssessmentResult }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const reduce = useReducedMotion();
  const dash = useMemo(
    () =>
      circumference -
      Math.min(circumference, Math.max(0, (result.overallPercentage / 100) * circumference)),
    [circumference, result.overallPercentage]
  );

  return (
    <div className="bezel-shell mt-7">
      <div className="bezel-core grid items-center gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
        <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
          <svg viewBox="0 0 176 176" className="h-full w-full -rotate-90" role="img" aria-label={`Overall risk ${result.overallPercentage}%`}>
            <circle
              cx="88"
              cy="88"
              r={radius}
              fill="none"
              stroke="rgba(222,191,162,0.08)"
              strokeWidth="14"
            />
            <motion.circle
              cx="88"
              cy="88"
              r={radius}
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={reduce ? false : { strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dash }}
              transition={{ duration: 0.9, ease: EASE_ENTRANCE }}
            />
            <defs>
              <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#CFB093" />
                <stop offset="100%" stopColor="#6E4B2D" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="heading-display text-3xl font-bold text-white">
              {result.overallPercentage}%
            </span>
            <span className="mt-1 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/70">
              overall risk
            </span>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <RiskBadge
              level={result.overallRiskLevel}
              label={result.overallRiskLabel}
            />
            <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/60">
              {result.answeredCount}/{result.totalQuestions} questions answered
            </span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-beige-muted">
            {result.overallRiskInterpretation}
          </p>
          {result.profile.organizationName ? (
            <p className="mt-4 text-xs text-beige-muted/70">
              Prepared for{" "}
              <span className="text-beige">
                {result.profile.organizationName}
              </span>
              {result.profile.industry ? ` · ${result.profile.industry}` : ""}
              {result.profile.orgSize ? ` · ${result.profile.orgSize}` : ""}
            </p>
          ) : null}

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {RISK_CLASSIFICATIONS.map((r) => (
              <div
                key={r.level}
                className={cn(
                  "rounded-2xl border px-3 py-2 text-[0.625rem] font-medium",
                  result.overallRiskLevel === r.level
                    ? RISK_STYLES[r.level]
                    : "border-beige/10 text-beige-muted/60"
                )}
              >
                <p className="font-semibold">{r.label}</p>
                <p className="mt-0.5 text-beige-muted/50">
                  {r.min}–{r.max}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Category grid ----------------------------- */

function CategoryGrid({ result }: { result: AssessmentResult }) {
  return (
    <div className="mt-12">
      <h3 className="heading-display mb-4 text-xl font-semibold text-white md:text-2xl">
        Nine-domain breakdown
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {result.domains.map((d) => (
          <article
            key={d.domain.id}
            className="bezel-shell !p-1"
          >
            <div className="flex h-full flex-col rounded-core border border-beige/[0.06] bg-cocoa/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
                    <BrandIcon
                      name={d.domain.icon}
                      className="h-4 w-4 text-purple-light"
                    />
                  </span>
                  <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/70">
                    Domain {d.domain.order}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold tracking-wide",
                    RISK_STYLES[d.riskLevel]
                  )}
                >
                  {d.riskLabel}
                </span>
              </div>
              <h4 className="heading-display mt-2 text-base font-semibold text-white">
                {d.domain.name}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-beige-muted">
                {d.finding}
              </p>

              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-light to-purple-mid"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/60">
                    {d.points}/{d.maxPoints} pts
                  </span>
                  <span className="font-sans text-sm font-semibold text-white">
                    {d.percentage}%
                  </span>
                </div>
              </div>

              <p className="mt-4 rounded-2xl border border-beige/[0.06] bg-black/25 px-3 py-2.5 text-xs leading-relaxed text-beige-muted">
                <span className="font-semibold text-beige">Next step: </span>
                {d.recommendation}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Top priorities ----------------------------- */

function TopPriorities({ result }: { result: AssessmentResult }) {
  if (result.topPriorities.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="heading-display mb-4 text-xl font-semibold text-white md:text-2xl">
        Your top three priorities
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        {result.topPriorities.map((d, i) => (
          <article
            key={d.domain.id}
            className="bezel-shell !p-1.5"
          >
            <div className="flex h-full flex-col rounded-core border border-beige/[0.06] bg-cocoa p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-light/40 bg-purple/15 font-sans text-sm font-bold text-purple-light">
                  {i + 1}
                </span>
                <RiskBadge level={d.riskLevel} label={d.riskLabel} />
              </div>
              <h4 className="heading-display mt-3 text-base font-semibold text-white">
                {d.domain.name}
              </h4>
              <p className="mt-1 text-xs text-beige-muted">
                {d.percentage}% risk
              </p>
              <p className="mt-3 text-xs leading-relaxed text-beige-muted">
                <span className="font-semibold text-beige">Why it matters: </span>
                {d.domain.measures}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-beige-muted">
                <span className="font-semibold text-beige">Action: </span>
                {d.recommendation}
              </p>
              <p className="mt-3 rounded-2xl border border-beige/[0.06] bg-black/25 px-3 py-2 text-xs text-beige-muted">
                <span className="font-semibold text-beige">E-Tech service: </span>
                {d.domain.service}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Key findings ----------------------------- */

function KeyFindings({ result }: { result: AssessmentResult }) {
  if (result.keyFindings.length === 0) {
    return (
      <div className="mt-12">
        <h3 className="heading-display mb-3 text-xl font-semibold text-white md:text-2xl">
          Key findings
        </h3>
        <div className="rounded-card border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-beige-muted">
          No high-priority findings triggered by full “No” answers. Continue
          monitoring and formalize partial controls.
        </div>
      </div>
    );
  }
  return (
    <div className="mt-12">
      <h3 className="heading-display mb-4 text-xl font-semibold text-white md:text-2xl">
        Key findings
      </h3>
      <div className="grid gap-2.5">
        {result.keyFindings.map((f) => (
          <div
            key={f.domainName}
            className="rounded-card border border-beige/[0.06] bg-cocoa/50 px-4 py-3.5"
          >
            <p className="font-sans text-sm font-semibold text-white">
              {f.domainName}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-beige-muted">
              {f.finding}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-beige-muted">
              <span className="font-semibold text-beige">Recommendation: </span>
              {f.recommendation}
            </p>
            <p className="mt-2 text-xs text-purple-light">
              <span className="font-semibold">E-Tech service: </span>
              {f.serviceName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Recommended services ----------------------------- */

function RecommendedServices({ result }: { result: AssessmentResult }) {
  if (result.recommendedServices.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="heading-display mb-4 text-xl font-semibold text-white md:text-2xl">
        Recommended E-Tech services
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {result.recommendedServices.map((s) => (
          <div
            key={s.slug}
            className="flex items-start gap-3 rounded-card border border-beige/[0.06] bg-cocoa/50 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
              <BrandIcon name="shieldCheck" className="h-4 w-4 text-purple-light" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-white">
                {s.name}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-beige-muted">
                {s.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Roadmap ----------------------------- */

function Roadmap({ result }: { result: AssessmentResult }) {
  return (
    <div className="mt-12">
      <h3 className="heading-display mb-4 text-xl font-semibold text-white md:text-2xl">
        30 / 60 / 90-day roadmap
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        {result.roadmap.map((phase) => (
          <div
            key={phase.key}
            className="bezel-shell !p-1.5"
          >
            <div className="flex h-full flex-col rounded-core border border-beige/[0.06] bg-cocoa p-5">
              <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
                {phase.period}
              </p>
              <h4 className="heading-display mt-1 text-lg font-semibold text-white">
                {phase.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {phase.actions.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-xs leading-relaxed text-beige-muted">
                    <BrandIcon
                      name="check"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-light"
                    />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Professional CTA + lead form ----------------------------- */

type LeadState = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  org_size: string;
  service_required: string;
  message: string;
};

const emptyLead: LeadState = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  org_size: "",
  service_required: "",
  message: "",
};

function ProfessionalCTA({
  result,
  isDemo,
  assessmentId,
  onPersist,
}: {
  result: AssessmentResult;
  isDemo: boolean;
  assessmentId?: string;
  onPersist?: AssessmentResultsProps["onPersist"];
}) {
  const [expanded, setExpanded] = useState(false);
  const [lead, setLead] = useState<LeadState>(() => ({
    ...emptyLead,
    service_required:
      result.recommendedServices[0]?.name ?? emptyLead.service_required,
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof LeadState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  // Prefill organization from the assessment profile.
  useEffect(() => {
    if (result.profile.organizationName && !lead.organization) {
      setLead((l) => ({ ...l, organization: result.profile.organizationName ?? "" }));
    }
    if (result.profile.orgSize && !lead.org_size) {
      setLead((l) => ({ ...l, org_size: (result.profile.orgSize as string) ?? "" }));
    }
    if (result.recommendedServices[0]?.name && !lead.service_required) {
      setLead((l) => ({
        ...l,
        service_required: result.recommendedServices[0].name,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function update(key: keyof LeadState, value: string) {
    setLead((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validate(): boolean {
    const e: Partial<Record<keyof LeadState, string>> = {};
    if (!lead.name.trim()) e.name = "Name is required.";
    else if (lead.name.trim().length > LIMITS.name)
      e.name = `Keep under ${LIMITS.name} characters.`;
    if (!lead.organization.trim()) e.organization = "Organization is required.";
    if (!lead.email.trim()) e.email = "Email is required.";
    else if (!isEmail(lead.email.trim())) e.email = "Enter a valid email.";
    if (!lead.phone.trim()) e.phone = "Phone is required.";
    else if (!isPhone(lead.phone)) e.phone = "Enter a valid phone (7–15 digits).";
    if (!lead.org_size) e.org_size = "Select a size.";
    if (!lead.service_required) e.service_required = "Select a service.";
    if (lead.message.trim().length > LIMITS.message)
      e.message = `Keep under ${LIMITS.message} characters.`;
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0] as keyof LeadState;
      document.getElementById(`lead-${first}`)?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;
    if (isOffline()) {
      setStatus("error");
      setServerError("You appear to be offline. Check your connection.");
      return;
    }

    setStatus("loading");
    setServerError("");
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("/api/assessment-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          assessment_id: assessmentId ?? null,
          name: lead.name.trim(),
          organization: lead.organization.trim(),
          email: lead.email.trim(),
          phone: lead.phone.trim(),
          org_size: lead.org_size,
          service_required: lead.service_required,
          message: lead.message.trim(),
          overall_percentage: result.overallPercentage,
          risk_level: result.overallRiskLevel,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed. Please try again.");
      }
      setStatus("success");
      onPersist?.(lead);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <div className="mt-14">
      <div className="bezel-shell !border-purple-light/15 !bg-purple/[0.06] p-2">
        <div className="rounded-core border border-cocoa/5 bg-white p-6 shadow-bezel-light md:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-cocoa md:text-3xl">
            {PROFESSIONAL_CTA.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cocoa/70">
            {PROFESSIONAL_CTA.body}
          </p>

          {status === "success" ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-5 text-sm text-emerald-800" role="status" aria-live="polite">
              <BrandIcon
                name="checkCircle"
                className="mb-2 h-8 w-8 text-emerald-600"
                aria-hidden
              />
              <p className="font-semibold">
                Thank you. Your request has been received.
              </p>
              <p className="mt-1 text-cocoa/70">
                An E-Tech representative will review your request and contact you
                regarding the next steps.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setLead({ ...emptyLead });
                }}
                className="mt-3 underline underline-offset-2 font-medium"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              {!expanded ? (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="btn-secondary-light"
                  >
                    {PROFESSIONAL_CTA.primary}
                  </button>
                  <a
                    href="/#services"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 font-sans text-sm font-medium text-cocoa/70 underline-offset-4 transition-colors hover:text-purple hover:underline"
                  >
                    {PROFESSIONAL_CTA.secondary}
                  </a>
                </div>
              ) : (
                <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <LeadField id="lead-name" label="Name" error={errors.name} required>
                      <input
                        id="lead-name"
                        type="text"
                        autoComplete="name"
                        maxLength={LIMITS.name}
                        value={lead.name}
                        onChange={(e) => update("name", e.target.value)}
                        className={cn(leadInputClass, errors.name && "border-red-500/60")}
                        placeholder="Your full name"
                      />
                    </LeadField>
                    <LeadField id="lead-organization" label="Organization" error={errors.organization} required>
                      <input
                        id="lead-organization"
                        type="text"
                        autoComplete="organization"
                        maxLength={LIMITS.company}
                        value={lead.organization}
                        onChange={(e) => update("organization", e.target.value)}
                        className={cn(leadInputClass, errors.organization && "border-red-500/60")}
                        placeholder="Organization name"
                      />
                    </LeadField>
                    <LeadField id="lead-email" label="Work Email" error={errors.email} required>
                      <input
                        id="lead-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={LIMITS.email}
                        value={lead.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={cn(leadInputClass, errors.email && "border-red-500/60")}
                        placeholder="you@company.com"
                      />
                    </LeadField>
                    <LeadField id="lead-phone" label="Phone" error={errors.phone} required>
                      <input
                        id="lead-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={LIMITS.phone}
                        value={lead.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={cn(leadInputClass, errors.phone && "border-red-500/60")}
                        placeholder="+234 …"
                      />
                    </LeadField>
                    <LeadField id="lead-org_size" label="Organization Size" error={errors.org_size} required>
                      <select
                        id="lead-org_size"
                        value={lead.org_size}
                        onChange={(e) => update("org_size", e.target.value)}
                        className={cn(leadInputClass, errors.org_size && "border-red-500/60")}
                      >
                        <option value="">Select size</option>
                        {ORG_SIZE_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </LeadField>
                    <LeadField id="lead-service_required" label="Service Required" error={errors.service_required} required>
                      <select
                        id="lead-service_required"
                        value={lead.service_required}
                        onChange={(e) => update("service_required", e.target.value)}
                        className={cn(leadInputClass, errors.service_required && "border-red-500/60")}
                      >
                        {ASSESSMENT_SERVICE_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </LeadField>
                  </div>
                  <LeadField
                    id="lead-message"
                    label="Message (optional)"
                    error={errors.message}
                    hint={`${lead.message.length}/${LIMITS.message}`}
                  >
                    <textarea
                      id="lead-message"
                      rows={4}
                      maxLength={LIMITS.message}
                      value={lead.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={cn(leadInputClass, "min-h-[7rem] resize-y break-words", errors.message && "border-red-500/60")}
                      placeholder="Anything else we should know?"
                    />
                  </LeadField>

                  {isDemo ? (
                    <p className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      You are in demo mode. Real lead capture is still enabled so the
                      flow can be tested end-to-end.
                    </p>
                  ) : null}

                  {serverError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                      <p className="break-words">{serverError}</p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                      aria-busy={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <BrandIcon name="spinner" className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Request Professional Assessment
                          <span className="btn-icon" aria-hidden>
                            <BrandIcon name="arrowUpRight" className="h-4 w-4" />
                          </span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="text-sm font-medium text-cocoa/70 underline-offset-4 transition-colors hover:text-purple hover:underline"
                    >
                      Collapse
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const leadInputClass =
  "w-full min-w-0 rounded-2xl border border-cocoa/12 bg-white px-4 py-3.5 font-sans text-sm text-cocoa placeholder:text-cocoa/70 transition-all duration-400 ease-premium focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20";

function LeadField({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block font-sans text-sm font-semibold text-cocoa">
        {label}
        {required ? <span className="text-purple" aria-hidden> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-cocoa/50">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
