import { industries } from "@/data/content";
import { IndustryPill } from "../IndustryPill";
import { SectionReveal } from "../SectionReveal";

export function IndustriesSection() {
  return (
    <SectionReveal
      id="industries"
      aria-labelledby="industries-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        <div className="mb-8 max-w-2xl md:mb-10">
          <h2
            id="industries-heading"
            className="heading-display text-3xl font-semibold text-white md:text-4xl"
          >
            Industries
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <IndustryPill
              key={industry.name}
              name={industry.name}
              icon={industry.icon}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
