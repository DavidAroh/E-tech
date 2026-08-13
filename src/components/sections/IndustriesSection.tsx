import { industries } from "@/data/content";
import { IndustryPill } from "../IndustryPill";
import { MagneticButton } from "../MagneticButton";
import { SectionReveal } from "../SectionReveal";

export function IndustriesSection() {
  return (
    <SectionReveal
      id="industries"
      aria-labelledby="industries-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: sticky heading + stat */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2
                id="industries-heading"
                className="heading-display mb-4 text-3xl font-semibold text-white md:text-4xl"
              >
                Industries we serve
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-beige-muted">
                Sector-aware guidance for regulated and high-stakes
                environments across Africa and beyond.
              </p>

              <div className="mt-10 border-t border-beige/10 pt-6">
                <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-purple-light">
                  The Boardroom Standard
                </p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug text-beige">
                  One discipline: AI and cyber risk, governed the way
                  executives need it.
                </p>
              </div>
            </div>
          </div>

          {/* Right: asymmetric pill wall — two offset columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {industries.map((industry, i) => (
                <div
                  key={industry.name}
                  className={
                    i % 2 === 1
                      ? "sm:translate-y-6 lg:translate-y-8"
                      : undefined
                  }
                >
                  <IndustryPill
                    name={industry.name}
                    icon={industry.icon}
                  />
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-start lg:justify-end">
              <MagneticButton as="a" href="#consultation" className="btn-ghost">
                Discuss your sector
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
