"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ASSESSMENT_DISCLAIMER,
  ASSESSMENT_LANDING,
  DOMAINS,
  PRIVACY_NOTICE,
} from "@/data/assessment";
import { EASE_ENTRANCE } from "@/lib/motion";
import { BrandIcon } from "../BrandIcon";
import { MagneticButton } from "../MagneticButton";
import { cn } from "@/lib/cn";

type AssessmentLandingProps = {
  onStart: () => void;
  onStartDemo: () => void;
};

/** Asymmetric tile spans for the domain Bento grid. */
const GRID_SPANS = [
  "sm:col-span-2 lg:col-span-7", // Featured — AI Risk
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
];

export function AssessmentLanding({
  onStart,
  onStartDemo,
}: AssessmentLandingProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="assessment"
      aria-labelledby="assessment-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        {/* Asymmetric hero: type left, key facts right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-purple-light">
                {ASSESSMENT_LANDING.subheading}
              </p>
              <h1
                id="assessment-heading"
                className="heading-display mb-5 mt-3 text-[2.25rem] font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.05rem]"
              >
                {ASSESSMENT_LANDING.heading}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-beige-muted md:text-lg">
                {ASSESSMENT_LANDING.body}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-beige-muted/80">
                The assessment evaluates AI risk, AI policy, AI governance,
                cloud security, incident response, security monitoring,
                deepfake/fraud protection, compliance readiness, employee
                awareness, and secure AI adoption.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <MagneticButton
                  as="button"
                  onClick={onStart}
                  className="btn-primary group"
                >
                  {ASSESSMENT_LANDING.primaryCta}
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" className="h-4 w-4" />
                  </span>
                </MagneticButton>
                <a href="/#services" className="btn-ghost">
                  {ASSESSMENT_LANDING.secondaryCta}
                </a>
                <button
                  type="button"
                  onClick={onStartDemo}
                  className="inline-flex items-center gap-2 rounded-full border border-beige/15 px-5 py-3 font-sans text-sm font-medium text-beige-muted transition-colors duration-400 ease-premium hover:border-purple-light/40 hover:text-beige"
                >
                  <BrandIcon name="sparkle" className="h-4 w-4 text-purple-light" />
                  Try Demo Assessment
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right rail: quick facts */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-4">
              <FactRow value={`${DOMAINS.length}`} label="Domains assessed" />
              <FactRow value="36" label="Questions, ~5 minutes" />
              <FactRow value="9" label="Risk frameworks mapped" />
              <FactRow value="1" label="Prioritized roadmap at the end" />
            </div>
          </div>
        </div>

        {/* Bento domain grid — asymmetric, not 3 equal columns */}
        <div
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
          aria-label="Assessment domains"
        >
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.id}
              className={cn(
                "group relative overflow-hidden rounded-[1.75rem] border border-beige/[0.06] bg-cocoa/60 p-5",
                "transition-[border-color,transform] duration-400 ease-premium hover:border-beige/[0.12]",
                GRID_SPANS[i]
              )}
              initial={reduce ? false : { opacity: 1, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px", amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: (i % 4) * 0.06,
                ease: EASE_ENTRANCE,
              }}
            >
              <div
                className={cn(
                  "flex h-full items-start gap-3",
                  i % 3 === 0 ? "flex-col sm:flex-row lg:flex-col" : "flex-row"
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
                  <BrandIcon
                    name={domain.icon}
                    className="h-4 w-4 text-purple-light"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-beige-muted/70">
                    Domain {domain.order}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-semibold text-white">
                    {domain.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-beige-muted">
                    {domain.measures}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy + scope — horizontal split, left aligned */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="border-t border-beige/10 pt-6">
            <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
              Privacy
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-beige-muted">
              {PRIVACY_NOTICE}
            </p>
          </div>
          <div className="border-t border-beige/10 pt-6 lg:pl-8">
            <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
              Scope
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-beige-muted">
              {ASSESSMENT_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="mt-10 text-xs text-beige-muted/70">
          Powered by E-Tech ·{" "}
          <span>{DOMAINS.length} domains · 36 questions · ~5 minutes</span>
        </div>
      </div>
    </section>
  );
}

function FactRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-beige/[0.08] pb-4">
      <span className="heading-display text-3xl font-bold tabular-nums text-beige">
        {value}
      </span>
      <span className="font-sans text-sm text-beige-muted">{label}</span>
    </div>
  );
}
