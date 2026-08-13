import { ProcessTimeline } from "../ProcessTimeline";
import { SectionReveal } from "../SectionReveal";

export function ProcessSection() {
  return (
    <SectionReveal
      id="process"
      aria-labelledby="process-heading"
      className="section-padding content-auto bg-ink"
    >
      <div className="container-content">
        <div className="mb-12 max-w-3xl">
          <h2
            id="process-heading"
            className="heading-display mb-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
          >
            How we work
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-beige-muted md:text-xl">
            Six phases from first conversation to sustained support.
          </p>
        </div>
        <ProcessTimeline />
      </div>
    </SectionReveal>
  );
}
