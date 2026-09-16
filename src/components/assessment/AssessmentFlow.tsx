"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ANSWER_LABELS,
  ANSWER_VALUES,
  AnswerValue,
  ASSESSMENT_GOAL_OPTIONS,
  DOMAINS,
  INDUSTRY_OPTIONS,
  ORG_SIZE_OPTIONS,
  PRIVACY_NOTICE,
  QUESTIONS_BY_DOMAIN,
  TRISTATE_OPTIONS,
  TOTAL_QUESTIONS,
} from "@/data/assessment";
import { ProfileInput as ProfileType } from "@/lib/assessment";
import { EASE_ENTRANCE, EASE_PREMIUM } from "@/lib/motion";
import { LIMITS } from "@/lib/validation";
import { BrandIcon } from "../BrandIcon";
import { cn } from "@/lib/cn";
import { lenisRef } from "@/lib/smoothScroll";

type Stage = "profile" | "questions" | "scoring";

type AssessmentFlowProps = {
  onComplete: (profile: ProfileType, answers: Record<number, AnswerValue>) => void;
  onRestart: () => void;
  initialProfile?: ProfileType;
  initialAnswers?: Record<number, AnswerValue>;
};

const STORAGE_KEY_PROFILE = "etech-assessment-profile";
const STORAGE_KEY_ANSWERS = "etech-assessment-answers";
const STORAGE_KEY_DOMAIN = "etech-assessment-domain";

/** Four named steps the user always sees in the stepper. */
const STEP_LABELS = [
  "Organisation Profile",
  "Current Capabilities",
  "Challenges & Needs",
  "Assessment Summary",
] as const;

const EMPTY_PROFILE: ProfileType = {
  organizationName: "",
  industry: "",
  orgSize: "",
  employees: "",
  aiUsage: "",
  cloudUsage: "",
  assessmentGoal: "",
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function AssessmentFlow({
  onComplete,
  onRestart,
  initialProfile,
  initialAnswers,
}: AssessmentFlowProps) {
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<Stage>("profile");
  const [profile, setProfile] = useState<ProfileType>(
    initialProfile ??
      (typeof window !== "undefined"
        ? safeParse(
            sessionStorage.getItem(STORAGE_KEY_PROFILE),
            EMPTY_PROFILE
          )
        : EMPTY_PROFILE)
  );
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>(
    initialAnswers ??
      (typeof window !== "undefined"
        ? safeParse<Record<number, AnswerValue>>(
            sessionStorage.getItem(STORAGE_KEY_ANSWERS),
            {}
          )
        : {})
  );
  const [domainIndex, setDomainIndex] = useState<number>(0);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Persist profile + answers for in-session progress preservation (PRD §24).
  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  }, [answers]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(STORAGE_KEY_DOMAIN, String(domainIndex));
  }, [domainIndex]);

  // Restore last domain index on mount so a refresh keeps the user's place.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem(STORAGE_KEY_DOMAIN);
    if (saved != null) {
      const n = Number(saved);
      if (!Number.isNaN(n) && n >= 0 && n < DOMAINS.length) {
        setDomainIndex(n);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToTop() {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(topRef.current ?? 0, { duration: 0.9 });
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ----------------------------- Profile ----------------------------- */

  function updateProfile<K extends keyof ProfileType>(
    key: K,
    value: ProfileType[K]
  ) {
    setProfile((prev) => ({ ...prev, [key]: value }));
    if (profileErrors[key]) {
      setProfileErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validateProfile(): boolean {
    const errors: Record<string, string> = {};
    if (!profile.organizationName?.trim())
      errors.organizationName = "Organization name is required.";
    else if (profile.organizationName.trim().length > LIMITS.company)
      errors.organizationName = `Keep under ${LIMITS.company} characters.`;
    if (!profile.industry) errors.industry = "Select an industry.";
    if (!profile.orgSize) errors.orgSize = "Select an organization size.";
    if (!profile.aiUsage) errors.aiUsage = "Select an AI usage level.";
    if (!profile.cloudUsage) errors.cloudUsage = "Select a cloud usage level.";
    if (!profile.assessmentGoal)
      errors.assessmentGoal = "Select your primary assessment goal.";

    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0];
      const container = document.getElementById(`profile-${first}`);
      const target = container?.querySelector(
        "input, select, textarea"
      ) as HTMLElement | null;
      (target ?? container)?.focus?.();
      return false;
    }
    return true;
  }

  function handleProfileSubmit() {
    if (!validateProfile()) return;
    setStage("questions");
    setDomainIndex(0);
    scrollToTop();
  }

  /* ----------------------------- Questions ----------------------------- */

  const totalAnswered = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const currentDomain = DOMAINS[domainIndex];
  const domainQuestions = QUESTIONS_BY_DOMAIN[currentDomain.id] ?? [];

  const answeredInDomain = domainQuestions.filter((q) =>
    Boolean(answers[q.id])
  ).length;
  const domainComplete = answeredInDomain === domainQuestions.length;

  const questionStartIndex = useMemo(() => {
    let start = 0;
    for (let i = 0; i < domainIndex; i++) {
      start += (QUESTIONS_BY_DOMAIN[DOMAINS[i].id] ?? []).length;
    }
    return start;
  }, [domainIndex]);

  function setAnswer(qid: number, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function handleNextDomain() {
    if (!domainComplete) {
      const missingId = `q-${domainQuestions.find((q) => !answers[q.id])?.id}`;
      const container = document.getElementById(missingId);
      const target = container?.querySelector(
        "input, select, textarea, button"
      ) as HTMLElement | null;
      (target ?? container)?.focus?.();
      return;
    }
    if (domainIndex < DOMAINS.length - 1) {
      setDomainIndex((i) => i + 1);
      scrollToTop();
    } else {
      setStage("scoring");
      scrollToTop();
      // Compute and bubble up on next tick so the scoring screen can paint.
      window.setTimeout(() => onComplete(profile, answers), 650);
    }
  }

  function handlePreviousDomain() {
    if (domainIndex === 0) {
      setStage("profile");
      return;
    }
    setDomainIndex((i) => i - 1);
    scrollToTop();
  }

  /* ----------------------------- Render ----------------------------- */

  if (stage === "profile") {
    return (
      <section
        ref={topRef}
        id="start"
        aria-labelledby="profile-heading"
        className="section-padding content-auto scroll-mt-32 bg-ink"
      >
        <div className="container-content mx-auto max-w-3xl">
          <AssessmentStepper
            stepIndex={0}
            currentLabel={STEP_LABELS[0]}
          />
          <div className="mt-8 border border-beige/25 bg-black/60 p-6 md:p-10">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-peach-bright">
              Step 1 of 4 — Organisation Profile
            </p>
            <h2
              id="profile-heading"
              className="heading-display mb-3 text-3xl font-bold text-white md:text-4xl"
            >
              Organization Profile
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white md:text-lg">
              Tell us a little about your organization so we can tailor your
              risk profile. Fields marked * are required.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <ProfileField
                id="profile-organizationName"
                label="Organization Name"
                error={profileErrors.organizationName}
                required
              >
                <input
                  id="profile-organizationName"
                  type="text"
                  autoComplete="organization"
                  maxLength={LIMITS.company}
                  value={profile.organizationName ?? ""}
                  onChange={(e) =>
                    updateProfile("organizationName", e.target.value)
                  }
                  className={cn(fieldControlDark, profileErrors.organizationName && "border-red-400")}
                  placeholder="Your organization"
                  aria-invalid={!!profileErrors.organizationName}
                />
              </ProfileField>

              <ProfileField
                id="profile-industry"
                label="Industry"
                error={profileErrors.industry}
                required
              >
                <ChoiceSelect
                  id="profile-industry"
                  value={profile.industry ?? ""}
                  onChange={(v) => updateProfile("industry", v)}
                  options={INDUSTRY_OPTIONS as readonly string[]}
                  placeholder="Select industry"
                  aria-invalid={!!profileErrors.industry}
                />
              </ProfileField>

              <ProfileField
                id="profile-orgSize"
                label="Organization Size"
                error={profileErrors.orgSize}
                required
              >
                <RadioGroup
                  id="profile-orgSize"
                  value={profile.orgSize ?? ""}
                  onChange={(v) => updateProfile("orgSize", v)}
                  options={ORG_SIZE_OPTIONS as readonly string[]}
                  aria-label="Organization size"
                  aria-invalid={!!profileErrors.orgSize}
                />
              </ProfileField>

              <ProfileField
                id="profile-employees"
                label="Number of Employees"
                hint="Optional"
              >
                <input
                  id="profile-employees"
                  type="text"
                  inputMode="numeric"
                  maxLength={32}
                  value={profile.employees ?? ""}
                  onChange={(e) => updateProfile("employees", e.target.value)}
                  className={fieldControlDark}
                  placeholder="e.g. 50–200"
                />
              </ProfileField>

              <ProfileField
                id="profile-aiUsage"
                label="Current AI Usage"
                error={profileErrors.aiUsage}
                required
              >
                <RadioGroup
                  id="profile-aiUsage"
                  value={profile.aiUsage ?? ""}
                  onChange={(v) => updateProfile("aiUsage", v)}
                  options={TRISTATE_OPTIONS as readonly string[]}
                  aria-label="Current AI usage"
                  aria-invalid={!!profileErrors.aiUsage}
                />
              </ProfileField>

              <ProfileField
                id="profile-cloudUsage"
                label="Cloud Usage"
                error={profileErrors.cloudUsage}
                required
              >
                <RadioGroup
                  id="profile-cloudUsage"
                  value={profile.cloudUsage ?? ""}
                  onChange={(v) => updateProfile("cloudUsage", v)}
                  options={TRISTATE_OPTIONS as readonly string[]}
                  aria-label="Cloud usage"
                  aria-invalid={!!profileErrors.cloudUsage}
                />
              </ProfileField>

              <div className="md:col-span-2">
                <ProfileField
                  id="profile-assessmentGoal"
                  label="Primary Assessment Goal"
                  error={profileErrors.assessmentGoal}
                  required
                >
                  <ChoiceSelect
                    id="profile-assessmentGoal"
                    value={profile.assessmentGoal ?? ""}
                    onChange={(v) => updateProfile("assessmentGoal", v)}
                    options={ASSESSMENT_GOAL_OPTIONS as readonly string[]}
                    placeholder="Select your primary goal"
                    aria-invalid={!!profileErrors.assessmentGoal}
                  />
                </ProfileField>
              </div>
            </div>

            <p className="mt-7 rounded-media border border-beige/20 bg-black/50 px-4 py-3 text-sm leading-relaxed text-white/85">
              {PRIVACY_NOTICE}
            </p>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onRestart}
                className="text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProfileSubmit}
                className="btn-white"
              >
                Continue to Step 2
                <span className="btn-icon" aria-hidden>
                  <BrandIcon name="arrowUpRight" weight="regular" className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (stage === "scoring") {
    return (
      <section
        ref={topRef}
        aria-labelledby="scoring-heading"
        className="section-padding content-auto scroll-mt-32 bg-ink"
      >
        <div className="container-content mx-auto flex max-w-xl flex-col items-center py-20 text-center">
          <BrandIcon
            name="spinner"
            className="mb-6 h-10 w-10 animate-spin text-peach-bright"
            aria-hidden
          />
          <h2
            id="scoring-heading"
            className="heading-display text-3xl font-bold text-white md:text-4xl"
          >
            Analyzing your risk profile
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white">
            Scoring nine domains, identifying key findings, and building your
            30/60/90-day roadmap.
          </p>
        </div>
      </section>
    );
  }

  // Questions stage
  return (
    <section
      ref={topRef}
      aria-labelledby="questions-heading"
      className="section-padding content-auto bg-ink"
    >
      <div className="container-content mx-auto max-w-3xl">
        <p className="sr-only" id="questions-heading">
          Assessment questions
        </p>

        <AssessmentStepper
          stepIndex={domainIndex < 5 ? 1 : 2}
          currentLabel={
            domainIndex < 5 ? STEP_LABELS[1] : STEP_LABELS[2]
          }
          domainHint={`Domain ${currentDomain.order} of ${DOMAINS.length} · ${currentDomain.name}`}
          answered={totalAnswered}
          total={TOTAL_QUESTIONS}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDomain.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
            className="mt-8 border border-beige/25 bg-black/60 p-6 md:p-10"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-media border border-brass/50 bg-black/50">
                <BrandIcon
                  name={currentDomain.icon}
                  className="h-6 w-6 text-peach-bright"
                />
              </span>
              <div>
                <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-peach-bright">
                  Domain {currentDomain.order} of {DOMAINS.length}
                </p>
                <h3 className="heading-display text-2xl font-bold text-white">
                  {currentDomain.name}
                </h3>
              </div>
            </div>
            <p className="mb-8 border-l border-brass/60 pl-4 text-base leading-relaxed text-white md:text-lg">
              {currentDomain.measures}
            </p>

            <ol className="space-y-6">
              {domainQuestions.map((q, i) => (
                <li key={q.id}>
                  <QuestionRow
                    q={q}
                    index={questionStartIndex + i + 1}
                    overallFirst={questionStartIndex + i + 1}
                    value={answers[q.id]}
                    onChange={(v) => setAnswer(q.id, v)}
                  />
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePreviousDomain}
                className="btn-outline-white justify-center"
              >
                <BrandIcon name="caretLeft" className="h-4 w-4" />
                {domainIndex === 0 ? "Back to Profile" : "Previous"}
              </button>
              <div className="flex flex-col items-stretch gap-2 sm:items-end">
                {!domainComplete ? (
                  <p className="text-sm font-semibold text-peach">
                    Answer all {domainQuestions.length} questions in this domain
                    to continue ({answeredInDomain}/{domainQuestions.length})
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-emerald-300">
                    Domain complete — {domainQuestions.length}/
                    {domainQuestions.length} answered
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleNextDomain}
                  disabled={!domainComplete}
                  className="btn-white justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {domainIndex === DOMAINS.length - 1
                    ? "Complete Assessment"
                    : `Continue to Domain ${currentDomain.order + 1}`}
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" weight="regular" className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ----------------------------- Subcomponents ----------------------------- */

const fieldControlDark =
  "w-full min-w-0 rounded-media border border-beige/30 bg-black/50 px-4 py-3.5 font-sans text-base text-white placeholder:text-beige-muted/70 transition-colors duration-200 ease-premium focus:border-peach-bright focus:outline-none focus:ring-2 focus:ring-purple/30";

function ProfileField({
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
      <label htmlFor={id} className="mb-2 block font-sans text-base font-bold text-white">
        {label}
        {required ? <span className="text-peach-bright" aria-hidden> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="mt-1.5 text-sm text-white/70">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChoiceSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  "aria-invalid": invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
  "aria-invalid"?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={invalid}
      className={cn(fieldControlDark, invalid && "border-red-400")}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-white text-base font-medium text-ink">
          {opt}
        </option>
      ))}
    </select>
  );
}

function RadioGroup({
  id,
  value,
  onChange,
  options,
  "aria-label": ariaLabel,
  "aria-invalid": invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  "aria-label": string;
  "aria-invalid"?: boolean;
}) {
  return (
    <div
      id={id}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-invalid={invalid}
      tabIndex={-1}
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-2 rounded-media border-2 px-4 py-2.5 text-sm font-bold transition-colors duration-200 ease-premium focus-within:border-peach-bright focus-within:outline-none focus-within:ring-2 focus-within:ring-peach-bright/50 active:scale-[0.97]",
              selected
                ? "border-peach-bright bg-purple/40 text-white"
                : "border-white/30 bg-black/40 text-white hover:border-white/60"
            )}
          >
            <input
              type="radio"
              name={id}
              value={opt}
              checked={selected}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

function QuestionRow({
  q,
  index,
  overallFirst,
  value,
  onChange,
}: {
  q: { id: number; question: string };
  index: number;
  overallFirst: number;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
}) {
  return (
    <fieldset
      id={`q-${q.id}`}
      tabIndex={-1}
      className={cn(
        "scroll-mt-32 rounded-media border p-4 transition-colors duration-200 ease-premium md:p-5",
        value
          ? "border-brass/60 bg-black/50"
          : "border-white/25 bg-black/40"
      )}
    >
      <legend className="px-1">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-peach-bright">
          Question {overallFirst} of {TOTAL_QUESTIONS}
        </span>
        <p className="mt-1 font-sans text-base font-semibold leading-relaxed text-white md:text-lg">
          {q.question}
        </p>
      </legend>
      <div
        role="radiogroup"
        aria-label={`Answer question ${index}`}
        className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
      >
        {ANSWER_VALUES.map((v) => {
          const selected = value === v;
          return (
            <label
              key={v}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-media border-2 px-3 py-3 text-center text-sm font-bold transition-colors duration-200 ease-premium focus-within:border-peach-bright focus-within:outline-none focus-within:ring-2 focus-within:ring-peach-bright/50 active:scale-[0.97]",
                selected
                  ? "border-peach-bright bg-purple/40 text-white"
                  : "border-white/30 bg-black/40 text-white hover:border-white/60"
              )}
            >
              <input
                type="radio"
                name={`answer-${q.id}`}
                value={v}
                checked={selected}
                onChange={() => onChange(v)}
                className="sr-only"
              />
              {ANSWER_LABELS[v]}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Always-visible step indicator. Shows the four named steps with a
 * "Step N of 4" banner, an answered counter, and per-step states
 * (done / current / upcoming) so the user always knows where they are.
 */
function AssessmentStepper({
  stepIndex,
  currentLabel,
  domainHint,
  answered,
  total,
}: {
  stepIndex: number;
  currentLabel: string;
  domainHint?: string;
  answered?: number;
  total?: number;
}) {
  const pct =
    answered != null && total ? Math.min(100, Math.round((answered / total) * 100)) : 0;

  return (
    <div className="sticky top-20 z-10" aria-hidden={false}>
      <div className="border border-beige/25 bg-black/85 px-5 py-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-sans text-base font-extrabold tracking-wide text-white sm:text-lg">
            Step {stepIndex + 1} of 4 — {currentLabel}
          </p>
          {answered != null && total ? (
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-peach-bright">
              {answered}/{total} answered · {pct}%
            </p>
          ) : null}
        </div>
        {domainHint ? (
          <p className="mt-0.5 text-sm font-medium text-white/80">{domainHint}</p>
        ) : (
          <p className="mt-0.5 text-sm font-medium text-white/70">
            You can move back and forth between steps at any time.
          </p>
        )}

        <ol className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Assessment steps">
          {STEP_LABELS.map((label, i) => {
            const done = i < stepIndex;
            const current = i === stepIndex;
            return (
              <li
                key={label}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 border-2 px-2.5 py-2 text-xs font-bold transition-colors duration-200",
                  done && "border-emerald-400/60 bg-emerald-500/10 text-emerald-200",
                  current && "border-peach-bright bg-purple/30 text-white",
                  !done && !current && "border-white/20 bg-black/40 text-white/60"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] leading-none",
                    done && "border-emerald-300 bg-emerald-400 text-black",
                    current && "border-peach-bright bg-peach-bright text-black",
                    !done && !current && "border-white/40 text-white/60"
                  )}
                  aria-hidden
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className="min-w-0 truncate">{label}</span>
              </li>
            );
          })}
        </ol>

        {answered != null && total ? (
          <div
            className="mt-3.5 h-1.5 w-full overflow-hidden bg-white/15"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% of questions answered`}
          >
            <motion.div
              className="h-full bg-peach-bright"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
