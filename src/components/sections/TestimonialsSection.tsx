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
        <div className="mb-12 max-w-3xl">
          <h2
            id="testimonials-heading"
            className="heading-display mb-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
          >
            Client perspective
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-beige-muted md:text-xl">
            Measured accounts from leadership teams who needed governance as
            much as innovation.
          </p>
          {/* PLACEHOLDER: Swap for approved testimonials. */}
        </div>

        <TestimonialCarousel />
      </div>
    </SectionReveal>
  );
}
