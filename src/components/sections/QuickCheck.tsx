"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FAQAccordion } from "../FAQAccordion";
import { SectionReveal } from "../SectionReveal";
import { BrandIcon } from "../BrandIcon";
import { EASE_ENTRANCE } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Questions section: a four-question self-check that acts as a lead-in to
 * the full Client Assessment. Each answer is scored, a preliminary risk
 * read-out is shown, and the user is handed a clear next step.
 */

type QuickValue = "yes" | "partially" | "no" | "not-sure";

const QUICK_QUESTIONS: {
  id: number;
  question: string;
  service: string;
}[] = [
  {
    id: 1,
    question: "Do you know which AI tools and AI-enabled systems your teams are using?",
    service: "AI Risk Assessment",
  },
  {
    id: 2,
    question: "Is there a written policy governing acceptable use of AI tools?",
    service: "AI Policy Development",
  },
  {
    id: 3,
    question: "Is multi-factor authentication enabled on your important cloud accounts?",
    service: "Cloud Security",
  },
  {
    id: 4,
    question: "Do employees receive regular cybersecurity and AI-awareness training?",
    service: "Training & Awareness",
  },
];

const QUICK_OPTIONS: { value: QuickValue; label: string; score: number }[] = [
  { value: "yes", label: "Yes", score: 0 },
  { value: "partially", label: "Partially", score: 1 },
  { value: "no", label: "No", score: 2 },
  { value: "not-sure", label: "Not sure", score: 2 },
];

const QUICK_MAX_SCORE = 8;

function riskBand(score: number) {
  if (score === 0)
    return { label: "Low Risk", tone: "emerald" as const };
  if (score <= 3)
    return { label: "Moderate Risk", tone: "amber" as const };
  if (score <= 6)
    return { label: "High Risk", tone: "orange" as const };
  return { label: "Critical Risk", tone: "red" as const };
}

const TONE_STYLES: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  amber: "bg-amber-500/15 text-amber-200 border-amber-500/40",
  orange: "bg-orange-500/15 text-orange-200 border-orange-500/40",
  red: "bg-red-500/15 text-red-200 border-red-500/40",
};

export function FAQSection() {
  return (
    <SectionReveal
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding content-auto bg-peach"
    >
      <div className="container-content">
        <div className="mb-12 max-w-3xl">
          <h2
            id="faq-heading"
            className="heading-display mb-4 text-4xl font-bold text-ink md:text-5xl lg:text-6xl"
          >
            Questions
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-cocoa md:text-xl">
            Start with four quick questions, then complete the full assessment
            for your detailed risk profile. Straight answers to common questions
            follow below.
          </p>
        </div>

        <QuickCheck />

        <div className="mt-16 max-w-3xl">
          <h3 className="heading-display mb-6 text-2xl font-bold text-ink md:text-3xl">
            Frequently asked
          </h3>
          <FAQAccordion />
        </div>
      </div>
    </SectionReveal>
  );
}

function QuickCheck() {
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<Record<number, QuickValue>>({});
  const [checked, setChecked] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === QUICK_QUESTIONS.length;

  const { score, band, flagged } = useMemo(() => {
    let s = 0;
    const f: string[] = [];
    for (const q of QUICK_QUESTIONS) {
      const a = answers[q.id];
      if (!a) continue;
      const opt = QUICK_OPTIONS.find((o) => o.value === a);
      s += opt?.score ?? 0;
      if (a === "no" || a === "not-sure") f.push(q.service);
    }
    return { score: s, band: riskBand(s), flagged: f };
  }, [answers]);

  return (
    <div className="border border-ink/15 bg-white/50 p-6 md:p-10">
      <h3 className="heading-display text-2xl font-bold text-ink md:text-3xl">
        How exposed is your organization today?
      </h3>

      <ol className="mt-8 space-y-6">
        {QUICK_QUESTIONS.map((q, qi) => (
          <li key={q.id}>
            <fieldset className="rounded-media border border-cocoa/15 bg-white p-4 md:p-5">
              <legend className="px-1">
                <p className="font-sans text-base font-semibold leading-relaxed text-ink md:text-lg">
                  {qi + 1}. {q.question}
                </p>
              </legend>
              <div
                role="radiogroup"
                aria-label={`Answer question ${qi + 1}`}
                className="mt-4 flex flex-wrap gap-2"
              >
                {QUICK_OPTIONS.map((opt) => {
                  const selected = answers[q.id] === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center rounded-media border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ease-premium active:scale-[0.97]",
                        selected
                          ? "border-brass-deep bg-cocoa text-white"
                          : "border-cocoa/25 bg-white text-ink hover:border-cocoa/50"
                      )}
                    >
                      <input
                        type="radio"
                        name={`quick-${q.id}`}
                        value={opt.value}
                        checked={selected}
                        onChange={() => {
                          setAnswers((prev) => ({ ...prev, [q.id]: opt.value }));
                          setChecked(false);
                        }}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={!complete}
          onClick={() => setChecked(true)}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          See preliminary result
          <span className="btn-icon" aria-hidden>
            <BrandIcon name="arrowUpRight" weight="regular" className="h-4 w-4" />
          </span>
        </button>
        <p className="text-sm font-medium text-cocoa">
          {complete
            ? "All four answered — view your read-out."
            : `Answer all ${QUICK_QUESTIONS.length} questions (${answeredCount}/${QUICK_QUESTIONS.length})`}
        </p>
      </div>

      {checked && complete ? (
        <motion.div
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
          className="mt-8 border-t border-ink/15 pt-8"
          role="status"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-media border px-4 py-2 text-sm font-bold tracking-wide",
                TONE_STYLES[band.tone]
              )}
            >
              <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
              Preliminary read: {band.label}
            </span>
            <span className="text-sm font-semibold text-cocoa">
              {score}/{QUICK_MAX_SCORE} risk points from quick answers
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink md:text-lg">
            {score === 0
              ? "Your fundamentals look established in these four areas. The full assessment checks the remaining five domains to confirm and find blind spots."
              : flagged.length > 0
                ? `Gaps flagged in ${flagged.join(", ")}. The full assessment scores all nine domains and builds a prioritized roadmap.`
                : "Partial controls were detected. The full assessment pinpoints exactly where exposure remains across all nine domains."}
          </p>

          <div className="mt-6">
            <a href="/assessment" className="btn-primary group">
              Complete Your Assessment
              <span className="btn-icon" aria-hidden>
                <BrandIcon name="arrowUpRight" weight="regular" className="h-4 w-4" />
              </span>
            </a>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
