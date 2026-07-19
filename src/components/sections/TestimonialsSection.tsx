import { SectionReveal } from "../SectionReveal";
import { TestimonialCarousel } from "../TestimonialCarousel";

export function TestimonialsSection() {
  return (
    <SectionReveal
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <div className="mb-12 text-center">
          <h2
            id="testimonials-heading"
            className="heading-display text-3xl font-semibold text-white md:text-4xl"
          >
            Client perspective
          </h2>
          {/* PLACEHOLDER: Swap for approved testimonials. */}
        </div>
        <TestimonialCarousel />
      </div>
    </SectionReveal>
  );
}
