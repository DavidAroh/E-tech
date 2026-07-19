import { FAQAccordion } from "../FAQAccordion";
import { SectionReveal } from "../SectionReveal";

export function FAQSection() {
  return (
    <SectionReveal
      id="faq"
      aria-labelledby="faq-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        <div className="mb-10 max-w-2xl">
          <h2
            id="faq-heading"
            className="heading-display text-3xl font-semibold text-white md:text-4xl"
          >
            Questions
          </h2>
        </div>
        <FAQAccordion />
      </div>
    </SectionReveal>
  );
}
