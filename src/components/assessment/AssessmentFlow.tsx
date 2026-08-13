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
      document.getElementById(`profile-${first}`)?.focus();
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
      document
        .getElementById(`q-${domainQuestions.find((q) => !answers[q.id])?.id}`)
        ?.focus();
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
        className="section-padding content-auto bg-cocoa"
      >
        <div className="container-content mx-auto max-w-3xl">
          <ProgressRail
            domainIndex={-1}
            totalAnswered={0}
            stage="profile"
          />
          <div className="bezel-shell mt-6">
            <div className="bezel-core p-6 md:p-8">
              <h2
                id="profile-heading"
                className="heading-display mb-2 text-2xl font-semibold text-white md:text-3xl"
              >
                Organization Profile
              </h2>
              <p className="mb-7 text-sm leading-relaxed text-beige-muted">
                Tell us a little about your organization so we can tailor your
                risk profile.
              </p>

              <div className="grid gap-5 md:grid-cols-2">
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
                    className={cn(profileInputClass, profileErrors.organizationName && "border-red-500/60")}
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
                    className={profileInputClass}
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

              <p className="mt-6 rounded-2xl border border-beige/[0.06] bg-black/30 px-4 py-3 text-xs leading-relaxed text-beige-muted/80">
                {PRIVACY_NOTICE}
              </p>

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onRestart}
                  className="text-sm font-medium text-beige-muted/70 underline-offset-4 transition-colors hover:text-beige hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleProfileSubmit}
                  className="btn-primary"
                >
                  Start Assessment
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" className="h-4 w-4" />
                  </span>
                </button>
              </div>
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
        className="section-padding content-auto bg-cocoa"
      >
        <div className="container-content mx-auto flex max-w-xl flex-col items-center py-20 text-center">
          <BrandIcon
            name="spinner"
            className="mb-6 h-10 w-10 animate-spin text-purple-light"
            aria-hidden
          />
          <h2
            id="scoring-heading"
            className="heading-display text-2xl font-semibold text-white md:text-3xl"
          >
            Analyzing your risk profile
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-beige-muted">
            Scoring nine domains, identifying key findings, and building your
            30/60/90-day roadmap.
          </p>
        </div>
      </section>
    );
  }

  // Questions stage
  const overallQuestion = questionStartIndex + answeredInDomain + (domainComplete ? 0 : 0);
  return (
    <section
      ref={topRef}
      aria-labelledby="questions-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content mx-auto max-w-3xl">
        <p className="sr-only" id="questions-heading">
          Assessment questions
        </p>
        <ProgressRail
          domainIndex={domainIndex}
          totalAnswered={totalAnswered}
          stage="questions"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDomain.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
            className="bezel-shell mt-6"
          >
            <div className="bezel-core p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
                  <BrandIcon
                    name={currentDomain.icon}
                    className="h-5 w-5 text-purple-light"
                  />
                </span>
                <div>
                  <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
                    Domain {currentDomain.order} of {DOMAINS.length}
                  </p>
                  <h3 className="heading-display text-lg font-semibold text-white">
                    {currentDomain.name}
                  </h3>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-beige-muted">
                {currentDomain.measures}
              </p>

              <ol className="space-y-5">
                {domainQuestions.map((q, i) => (
                  <li key={q.id}>
                    <QuestionRow
                      q={q}
                      index={questionStartIndex + i + 1}
                      overallFirst={overallQuestion + 1}
                      value={answers[q.id]}
                      onChange={(v) => setAnswer(q.id, v)}
                    />
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePreviousDomain}
                  className="inline-flex items-center gap-2 rounded-full border border-beige/15 px-5 py-3 font-sans text-sm font-medium text-beige-muted transition-colors duration-400 ease-premium hover:border-beige/40 hover:text-beige"
                >
                  <BrandIcon name="caretLeft" className="h-4 w-4" />
                  {domainIndex === 0 ? "Profile" : "Previous"}
                </button>
                <button
                  type="button"
                  onClick={handleNextDomain}
                  disabled={!domainComplete}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {domainIndex === DOMAINS.length - 1
                    ? "Get Results"
                    : "Continue"}
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" className="h-4 w-4" />
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

const profileInputClass =
  "w-full min-w-0 rounded-2xl border border-beige/[0.08] bg-black/30 px-4 py-3.5 font-sans text-sm text-beige placeholder:text-beige-muted/50 transition-all duration-400 ease-premium focus:border-purple-light focus:outline-none focus:ring-2 focus:ring-purple/25";

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
      <label htmlFor={id} className="mb-1.5 block font-sans text-sm font-semibold text-beige">
        {label}
        {required ? <span className="text-purple-light" aria-hidden> *</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="mt-1.5 text-xs text-beige-muted/60">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
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
      className={cn(profileInputClass, invalid && "border-red-500/60")}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
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
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-400 ease-premium",
              selected
                ? "border-purple-light/60 bg-purple/15 text-white"
                : "border-beige/15 text-beige-muted hover:border-beige/35 hover:text-beige"
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
      className={cn(
        "rounded-2xl border p-4 transition-colors duration-400 ease-premium md:p-5",
        value
          ? "border-purple-light/25 bg-black/25"
          : "border-beige/[0.06] bg-black/20"
      )}
    >
      <legend className="px-1">
        <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/70">
          Question {overallFirst} of {TOTAL_QUESTIONS}
        </span>
        <p className="mt-1 font-sans text-sm font-medium leading-relaxed text-beige md:text-base">
          {q.question}
        </p>
      </legend>
      <div
        role="radiogroup"
        aria-label={`Answer question ${index}`}
        className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {ANSWER_VALUES.map((v) => {
          const selected = value === v;
          return (
            <label
              key={v}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-center text-xs font-medium tracking-wide transition-all duration-400 ease-premium sm:text-sm",
                selected
                  ? "border-purple-light/60 bg-purple/15 text-white"
                  : "border-beige/15 text-beige-muted hover:border-beige/35 hover:text-beige"
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

/** Sticky progress rail at the top of profile + question stages. */
function ProgressRail({
  domainIndex,
  totalAnswered,
  stage,
}: {
  domainIndex: number;
  totalAnswered: number;
  stage: Stage;
}) {
  const pct =
    stage === "profile"
      ? 0
      : Math.min(100, Math.round((totalAnswered / TOTAL_QUESTIONS) * 100));
  return (
    <div className="sticky top-20 z-10" aria-hidden={false}>
      <div className="bezel-shell !p-1">
        <div className="flex items-center gap-3 rounded-core border border-beige/[0.06] bg-cocoa px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/70">
                {stage === "profile"
                  ? "Step 1 · Profile"
                  : `Step 2 · Domain ${domainIndex + 1} of ${DOMAINS.length}`}
              </p>
              <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
                {pct}% complete
              </p>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-black/40"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple to-purple-mid"
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: EASE_PREMIUM }}
              />
            </div>
          </div>
          <ol className="hidden gap-1.5 sm:flex">
            {DOMAINS.map((d, i) => (
              <li
                key={d.id}
                className={cn(
                  "h-2 w-6 rounded-full transition-colors duration-400",
                  i < domainIndex
                    ? "bg-purple-light/70"
                    : i === domainIndex
                    ? "bg-purple"
                    : "bg-beige/10"
                )}
                title={d.name}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
