import { BrandIcon } from "../BrandIcon";
import { SectionReveal } from "../SectionReveal";

/**
 * Full-bleed conversion band in solid Signal Blue — the loudest surface
 * on the site, reserved for the assessment. Ink type, ink primary action,
 * quiet spec line. Premium confidence, one decision.
 */
export function AssessmentCtaSection() {
  return (
    <SectionReveal
      aria-labelledby="assessment-cta-heading"
      className="section-padding content-auto bg-brass"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70">
              The E-Tech Client Assessment
            </p>
            <h2
              id="assessment-cta-heading"
              className="heading-display text-4xl font-bold leading-[1.08] text-ink md:text-5xl lg:text-6xl"
            >
              How prepared is your organization?
            </h2>
            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-ink/85 md:text-xl">
              An initial view of your AI, cybersecurity, cloud, and governance
              risk areas. Get a risk profile, prioritized findings, and a
              30/60/90-day roadmap.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-end">
              <a
                href="/assessment"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-ink px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-white transition-transform duration-200 hover:bg-charcoal active:scale-[0.97]"
              >
                Start Client Assessment
                <BrandIcon
                  name="arrowUpRight"
                  weight="regular"
                  className="h-4 w-4"
                />
              </a>
              <a
                href="/#consultation"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-ink/30 px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5 active:scale-[0.97]"
              >
                Request Professional Assessment
              </a>
            </div>
            <p className="mt-4 text-center font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70 lg:text-right">
              9 domains · 36 questions · about 5 minutes · results instantly
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
