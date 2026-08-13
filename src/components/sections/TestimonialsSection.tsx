import { BrandIcon } from "../BrandIcon";
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
          {/* Left rail: heading + quiet quote mark + note */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
                <BrandIcon
                  name="handshake"
                  className="h-5 w-5 text-purple-light"
                />
              </div>
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
