import { contactInfo } from "@/data/content";
import { BrandIcon } from "../BrandIcon";
import { ConsultationForm } from "../ConsultationForm";
import { SectionReveal } from "../SectionReveal";

export function ConsultationSection() {
  return (
    <SectionReveal
      id="consultation"
      aria-labelledby="consultation-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: heading + reassurance rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60">
                <span aria-hidden>08</span>
                <span className="h-px w-8 bg-beige/25" aria-hidden />
                <span>Engage</span>
              </p>
              <h2
                id="consultation-heading"
                className="heading-display mb-4 text-3xl font-semibold text-white md:text-4xl"
              >
                Book a consultation
              </h2>
              <p className="mb-8 max-w-sm text-base leading-relaxed text-beige-muted">
                Share a few details. We respond within one business day, in
                confidence.
              </p>

              <ul className="space-y-4 border-t border-beige/25 pt-8">
                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-media border border-beige/25 bg-black/15">
                    <BrandIcon name="clock" className="h-4 w-4 text-purple-light" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-beige">
                      {contactInfo.hours}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-beige-muted">
                      WAT working hours, response within one business day.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-media border border-beige/25 bg-black/15">
                    <BrandIcon name="shieldCheck" className="h-4 w-4 text-purple-light" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-beige">
                      Confidential by default
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-beige-muted">
                      NDAs and engagement-specific data handling from first
                      conversation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-media border border-beige/25 bg-black/15">
                    <BrandIcon name="users" className="h-4 w-4 text-purple-light" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-beige">
                      {contactInfo.phone}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-beige-muted">
                      Prefer to talk? Call during business hours.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: flat paper form */}
          <div className="lg:col-span-7">
            <div className="border border-beige/15 bg-white p-6 md:p-10 lg:p-12">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}