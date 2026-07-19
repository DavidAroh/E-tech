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
        <div className="mb-12 max-w-2xl md:mb-14">
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
