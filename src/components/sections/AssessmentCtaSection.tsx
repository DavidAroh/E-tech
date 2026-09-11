import { BrandIcon } from "../BrandIcon";
import { SectionReveal } from "../SectionReveal";

/**
 * Full-width conversion band on chamber black. The assessment is a primary
 * engagement point, so it gets a strong frame, large type and white CTAs.
 */
export function AssessmentCtaSection() {
  return (
    <SectionReveal
      aria-labelledby="assessment-cta-heading"
      className="section-padding content-auto bg-ink"
    >
      <div className="container-content">
        <div className="border-y-2 border-peach-bright/40 py-12 md:py-16">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="mb-5 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-peach-bright">
                <span className="h-px w-8 bg-peach-bright/60" aria-hidden />
                Free Client Assessment
              </p>
              <h2
                id="assessment-cta-heading"
                className="heading-display text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl"
              >
                How prepared is your organization?
              </h2>
              <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white md:text-xl">
                Take the E-Tech Client Assessment for an initial view of your
                AI, cybersecurity, cloud, and governance risk areas. Get a risk
                profile, prioritized findings, and a 30/60/90-day roadmap.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-end">
                <a href="/assessment" className="btn-white justify-center">
                  Start Client Assessment
                  <span className="btn-icon" aria-hidden>
                    <BrandIcon name="arrowUpRight" className="h-4 w-4" />
                  </span>
                </a>
                <a href="/#consultation" className="btn-outline-white justify-center">
                  Request Professional Assessment
                </a>
              </div>
              <p className="mt-4 text-center text-sm font-medium text-peach lg:text-right">
                9 domains · 36 questions · about 5 minutes · results instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
