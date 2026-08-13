import { BrandIcon } from "../BrandIcon";
import { FAQAccordion } from "../FAQAccordion";
import { MagneticButton } from "../MagneticButton";
import { SectionReveal } from "../SectionReveal";

export function FAQSection() {
  return (
    <SectionReveal
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: heading + support prompt */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2
                id="faq-heading"
                className="heading-display mb-4 text-3xl font-semibold text-white md:text-4xl"
              >
                Questions
              </h2>
              <p className="mb-8 max-w-sm text-base leading-relaxed text-beige-muted">
                Straight answers to the questions leaders ask before engaging.
              </p>

              <div className="hidden lg:block">
                <div className="border-t border-beige/10 pt-6">
                  <p className="mb-3 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
                    Still deciding?
                  </p>
                  <MagneticButton
                    as="a"
                    href="#consultation"
                    className="btn-ghost !px-5 !py-2.5 text-xs"
                  >
                    <BrandIcon name="mail" className="h-4 w-4" />
                    Ask us directly
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-8">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
