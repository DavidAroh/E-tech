"use client";

import { BrandIcon } from "../BrandIcon";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfzoG1jL6yYZOLQKLbAGASKmLQ_rmYang_505dUL9UogpgU2g/viewform?embedded=true";

type AssessmentFormProps = {
  onBack: () => void;
};

export function AssessmentForm({ onBack }: AssessmentFormProps) {
  return (
    <section
      id="assessment-form"
      aria-labelledby="assessment-form-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content mx-auto max-w-4xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs tracking-[0.18em] text-purple-light">
              Step 1 of 1 · Assessment
            </p>
            <h1
              id="assessment-form-heading"
              className="heading-display text-2xl font-semibold text-white md:text-3xl"
            >
              Client Assessment
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-beige-muted">
              Complete the form below. Your responses go directly to the E-Tech
              team — no account needed.
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex shrink-0 items-center gap-2 rounded-control border border-beige/15 px-4 py-2.5 font-sans text-sm font-medium text-beige-muted transition-colors duration-300 hover:border-beige/40 hover:text-beige"
          >
            <BrandIcon name="caretLeft" className="h-4 w-4" />
            Back
          </button>
        </div>

        <div className="bezel-shell">
          <div className="bezel-core p-3 md:p-5">
            <iframe
              src={FORM_EMBED_URL}
              title="E-Tech Client Assessment"
              width="100%"
              height={2400}
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full bg-white"
            >
              Loading form…
            </iframe>
          </div>
        </div>

        <p className="mt-6 border-t border-beige/10 pt-5 font-mono text-xs text-beige-muted/70">
          Powered by Google Forms · Responses are confidential and reviewed by
          the E-Tech team.
        </p>
      </div>
    </section>
  );
}