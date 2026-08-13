import { BrandIcon } from "../BrandIcon";
import { SectionReveal } from "../SectionReveal";

/**
 * Marketing funnel highlight (Report Templates & Marketing Materials PRD §20):
 * promote the Client Assessment as the website's primary entry point.
 */
export function AssessmentCtaSection() {
  return (
    <SectionReveal
      aria-labelledby="assessment-cta-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <div className="bezel-shell !border-purple-light/15 !bg-purple/[0.05] p-2">
          <div className="bezel-core flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-purple-light">
                Client Assessment
              </p>
              <h2
                id="assessment-cta-heading"
                className="heading-display mt-2 text-2xl font-semibold text-white md:text-3xl"
              >
                How prepared is your organization?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-beige-muted md:text-base">
                Take the E-Tech Client Assessment to receive an initial view of
                your AI, cybersecurity, cloud, and governance risk areas. Get a
                risk profile, prioritized findings, and a 30/60/90-day roadmap.
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
      </div>
    </SectionReveal>
  );
}
