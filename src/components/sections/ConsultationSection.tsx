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
        <div className="bezel-shell mx-auto max-w-3xl !border-beige/15 !bg-white/[0.06] p-2">
          <div className="rounded-core border border-cocoa/5 bg-white p-6 shadow-bezel-light md:p-10 lg:p-12">
            <h2
              id="consultation-heading"
              className="mb-3 font-display text-3xl font-semibold tracking-tight text-cocoa md:text-4xl"
            >
              Book a consultation
            </h2>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-cocoa/70 md:text-base">
              Share a few details. We respond within one business day.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
