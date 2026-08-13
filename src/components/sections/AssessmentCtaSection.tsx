import { BrandIcon } from "../BrandIcon";
import { SectionReveal } from "../SectionReveal";

/**
 * Marketing funnel highlight: the Client Assessment band acts as a
 * full-width interstitial between sections, not a numbered header block.
 */
export function AssessmentCtaSection() {
  return (
    <SectionReveal
      aria-labelledby="assessment-cta-heading"
      className="section-padding content-auto bg-cocoa-deep"
    >
      <div className="container-content">
        <div className="flex flex-col items-start gap-8 border-y border-beige/25 py-10 md:flex-row md:items-end md:justify-between md:py-14">
          <div className="max-w-2xl">
            <h2
              id="assessment-cta-heading"
              className="heading-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-6xl"
            >
              How prepared is your organization?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-beige-muted md:text-lg">
              Take the E-Tech Client Assessment for an initial view of your AI,
              cybersecurity, cloud, and governance risk areas. Get a risk
              profile, prioritized findings, and a 30/60/90-day roadmap.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a href="/assessment" className="btn-primary group">
              Start Client Assessment
              <span className="btn-icon" aria-hidden>
                <BrandIcon name="arrowUpRight" className="h-4 w-4" />
              </span>
            </a>
            <a href="/#consultation" className="btn-ghost">
              Request Professional Assessment
            </a>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
