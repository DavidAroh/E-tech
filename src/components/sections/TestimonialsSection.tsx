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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left rail: index + heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60">
                <span aria-hidden>06</span>
                <span className="h-px w-8 bg-beige/25" aria-hidden />
                <span>References</span>
              </p>
              <h2
                id="testimonials-heading"
                className="heading-display mb-4 text-3xl font-semibold text-white md:text-4xl"
              >
                Client perspective
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-beige-muted">
                Measured accounts from leadership teams who needed governance
                as much as innovation.
              </p>
              {/* PLACEHOLDER: Swap for approved testimonials. */}
            </div>
          </div>

          {/* Right: the carousel */}
          <div className="lg:col-span-7">
            <TestimonialCarousel />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}