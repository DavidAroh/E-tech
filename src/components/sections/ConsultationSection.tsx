import { contactInfo } from "@/data/content";
import { BrandIcon } from "../BrandIcon";
import { ConsultationForm } from "../ConsultationForm";
import { SectionReveal } from "../SectionReveal";

/**
 * Book a Consultation — chamber-black panel so the paper-white form pops
 * with maximum contrast. Left rail reassurance items read white; only the
 * icon accents carry the peach seal.
 */
export function ConsultationSection() {
  return (
    <SectionReveal
      id="consultation"
      aria-labelledby="consultation-heading"
      className="section-padding content-auto bg-ink"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: heading + reassurance rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-peach-bright">
                <span className="h-px w-8 bg-peach-bright/60" aria-hidden />
                Engage
              </p>
              <h2
                id="consultation-heading"
                className="heading-display mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              >
                Book a consultation
              </h2>
              <p className="mb-8 max-w-sm text-lg font-medium leading-relaxed text-white">
                Share a few details. We respond within one business day, in
                confidence.
              </p>

              <ul className="space-y-5 border-t-2 border-white/20 pt-8">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-media border border-white/25 bg-white/5">
                    <BrandIcon name="clock" className="h-5 w-5 text-peach-bright" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-base font-bold text-white">
                      {contactInfo.hours}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/80">
                      WAT working hours, response within one business day.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-media border border-white/25 bg-white/5">
                    <BrandIcon name="shieldCheck" className="h-5 w-5 text-peach-bright" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-base font-bold text-white">
                      Confidential by default
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/80">
                      NDAs and engagement-specific data handling from first
                      conversation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-media border border-white/25 bg-white/5">
                    <BrandIcon name="users" className="h-5 w-5 text-peach-bright" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-base font-bold text-white">
                      {contactInfo.phone}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/80">
                      Prefer to talk? Call during business hours.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: paper form on black — single light surface on the site */}
          <div className="lg:col-span-7">
            <div className="border border-white/15 bg-white p-6 shadow-2xl md:p-10 lg:p-12">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
