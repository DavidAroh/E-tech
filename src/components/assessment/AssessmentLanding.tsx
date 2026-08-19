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
              <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60">
                <span aria-hidden>01</span>
                <span className="h-px w-8 bg-beige/25" aria-hidden />
                <span>{ASSESSMENT_LANDING.subheading}</span>
              </p>
              <h1
                id="assessment-heading"
                className="heading-display mb-6 max-w-2xl text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.5rem]"
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
                <button type="button" onClick={onStart} className="btn-primary group">
                  {ASSESSMENT_LANDING.primaryCta}
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" className="h-4 w-4" />
                  </span>
                </button>
                <a href="/#services" className="btn-ghost">
                  {ASSESSMENT_LANDING.secondaryCta}
                </a>
                <button
                  type="button"
                  onClick={onStartDemo}
                  className="inline-flex items-center gap-2 rounded-control border border-beige/25 px-5 py-3 font-sans text-sm font-medium text-beige-muted transition-colors duration-300 hover:border-purple-light/40 hover:text-beige"
                >
                  <BrandIcon
                    name="sparkle"
                    className="h-4 w-4 text-purple-light"
                  />
                  Try Demo Assessment
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right rail: quick facts — ledger */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-center gap-0 border-y border-beige/25">
              <FactRow value={`${DOMAINS.length}`} label="Domains assessed" />
              <FactRow value="36" label="Questions, ~5 minutes" />
              <FactRow value="9" label="Risk frameworks mapped" />
              <FactRow value="1" label="Prioritized roadmap at the end" />
            </div>
          </div>
        </div>

        {/* Domain index — flat grid, sharp tiles, no Bento */}
        <div
          className="mt-16 grid grid-cols-1 gap-px border border-beige/25 bg-beige/25 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Assessment domains"
        >
          {DOMAINS.map((domain, i) => (
            <div
              key={domain.id}
              className="group bg-cocoa p-5 transition-colors duration-300 hover:bg-white/5 md:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-media border border-beige/25 bg-black/15">
                  <BrandIcon
                    name={domain.icon}
                    className="h-4 w-4 text-purple-light"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[0.625rem] tracking-[0.18em] text-beige-muted/70">
                    Domain {String(domain.order).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-semibold text-white">
                    {domain.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-beige-muted">
                    {domain.measures}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-right font-mono text-xs text-beige/0 transition-colors duration-300 group-hover:text-beige/50">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy + scope — horizontal split, left aligned */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="border-t border-beige/25 pt-6">
            <p className="font-mono text-[0.625rem] tracking-[0.18em] text-purple-light">
              Privacy
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-beige-muted">
              {PRIVACY_NOTICE}
            </p>
          </div>
          <div className="border-t border-beige/10 pt-6 lg:pl-8">
            <p className="font-mono text-[0.625rem] tracking-[0.18em] text-purple-light">
              Scope
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-beige-muted">
              {ASSESSMENT_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-beige/25 pt-5 font-mono text-xs text-beige-muted/70">
          Powered by E-Tech · <span>{DOMAINS.length} domains · 36 questions · ~5 minutes</span>
        </div>
      </div>
    </section>
  );
}

function FactRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-beige/25 py-4 last:border-b-0">
      <span className="heading-display text-3xl font-bold tabular-nums text-beige">
        {value}
      </span>
      <span className="font-sans text-sm text-beige-muted">{label}</span>
    </div>
  );
}