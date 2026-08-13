import { FAQAccordion } from "../FAQAccordion";
import { SectionReveal } from "../SectionReveal";

export function FAQSection() {
  return (
    <SectionReveal
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding content-auto bg-ink"
    >
      <div className="container-content">
        <div className="mb-12 max-w-3xl">
          <h2
            id="faq-heading"
            className="heading-display mb-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
          >
            Questions
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-beige-muted md:text-xl">
            Straight answers to the questions leaders ask before engaging.
          </p>
        </div>

        <div className="max-w-3xl">
          <FAQAccordion />
        </div>
      </div>
    </SectionReveal>
  );
}
