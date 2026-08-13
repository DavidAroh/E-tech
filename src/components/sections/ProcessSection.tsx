import { ProcessTimeline } from "../ProcessTimeline";
import { SectionReveal } from "../SectionReveal";

export function ProcessSection() {
  return (
    <SectionReveal
      id="process"
      aria-labelledby="process-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <div className="mb-10 max-w-2xl border-b border-beige/25 pb-10">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60">
            <span aria-hidden>04</span>
            <span className="h-px w-8 bg-beige/25" aria-hidden />
            <span>Method</span>
          </p>
          <h2
            id="process-heading"
            className="heading-display mb-3 text-3xl font-semibold text-white md:text-4xl"
          >
            How we work
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-beige-muted">
            Six steps from first conversation to sustained support.
          </p>
        </div>
        <ProcessTimeline />
      </div>
    </SectionReveal>
  );
}