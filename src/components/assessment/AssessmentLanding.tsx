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

type AssessmentLandingProps = {
  onStart: () => void;
  onStartDemo: () => void;
};

export function AssessmentLanding({
  onStart,
  onStartDemo,
}: AssessmentLandingProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id="assessment"
      aria-labelledby="assessment-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        {/* Asymmetric hero: type left, key facts right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { y: 14 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
            >
              <p className="mb-6 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-peach-bright">
                <span className="h-px w-8 bg-peach-bright/60" aria-hidden />
                <span>{ASSESSMENT_LANDING.subheading}</span>
              </p>
              <h1
                id="assessment-heading"
                className="heading-display mb-6 max-w-2xl text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.5rem]"
              >
                {ASSESSMENT_LANDING.heading}
              </h1>
              <p className="max-w-2xl text-base font-medium leading-relaxed text-white md:text-lg">
                {ASSESSMENT_LANDING.body}
              </p>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/85">
                The assessment evaluates AI risk, AI policy, AI governance,
                cloud security, incident response, security monitoring,
                deepfake/fraud protection, compliance readiness, employee
                awareness, and secure AI adoption.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <button type="button" onClick={onStart} className="btn-white group">
                  {ASSESSMENT_LANDING.primaryCta}
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" className="h-4 w-4" />
                  </span>
                </button>
                <a href="/#services" className="btn-outline-white">
                  {ASSESSMENT_LANDING.secondaryCta}
                </a>
                <button
                  type="button"
                  onClick={onStartDemo}
                  className="inline-flex items-center gap-2 rounded-control border-2 border-white/60 px-5 py-3 font-sans text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
                >
                  <BrandIcon
                    name="sparkle"
                    className="h-4 w-4 text-peach-bright"
                  />
                  Try Demo Assessment
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right rail: quick facts — ledger */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-0 border-y-2 border-white/30">
              <FactRow value={`${DOMAINS.length}`} label="Domains assessed" />
              <FactRow value="36" label="Questions, ~5 minutes" />
              <FactRow value="9" label="Risk frameworks mapped" />
              <FactRow value="1" label="Prioritized roadmap at the end" />
            </div>
          </div>
        </div>

        {/* Domain index — flat grid, sharp tiles */}
        <div
          className="mt-16 grid grid-cols-1 gap-px border-2 border-white/25 bg-white/25 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Assessment domains"
        >
          {DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className="group bg-cocoa p-5 transition-colors duration-300 hover:bg-white/10 md:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-media border-2 border-white/30 bg-black/25">
                  <BrandIcon
                    name={domain.icon}
                    className="h-5 w-5 text-peach-bright"
                  />
                </span>
                <div className="min-w-0">
                  <p className="mt-0.5 font-display text-base font-bold text-white">
                    {domain.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/90">
                    {domain.measures}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy + scope — horizontal split, left aligned */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="border-t-2 border-white/25 pt-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-peach-bright">
              Privacy
            </p>
            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-white">
              {PRIVACY_NOTICE}
            </p>
          </div>
          <div className="border-t-2 border-white/25 pt-6 lg:pl-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-peach-bright">
              Scope
            </p>
            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-white">
              {ASSESSMENT_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-white/25 pt-5 font-mono text-xs font-semibold text-white">
          Powered by E-Tech · <span>{DOMAINS.length} domains · 36 questions · ~5 minutes</span>
        </div>
      </div>
    </section>
  );
}

function FactRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b-2 border-white/25 py-4 last:border-b-0">
      <span className="heading-display text-3xl font-bold tabular-nums text-white">
        {value}
      </span>
      <span className="font-sans text-sm font-semibold text-white">{label}</span>
    </div>
  );
}