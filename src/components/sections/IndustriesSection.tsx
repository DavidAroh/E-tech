import { industries } from "@/data/content";
import { SectionReveal } from "../SectionReveal";

/**
 * Industries on the caramel panel of the section rhythm
 * (dark brown → caramel → peach). Names read white at rest and warm
 * to peach on hover; hierarchy needs no numbering.
 */
export function IndustriesSection() {
  return (
    <SectionReveal
      id="industries"
      aria-labelledby="industries-heading"
      className="section-padding content-auto bg-caramel"
    >
      <div className="container-content">
        <div className="mb-10 max-w-3xl">
          <h2
            id="industries-heading"
            className="heading-display mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Industries we serve
          </h2>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-white md:text-xl">
            Sector-aware guidance for regulated and high-stakes environments
            across Africa and beyond.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-12 gap-y-6 border-y-2 border-white/25 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li
              key={industry.name}
              className="group flex items-center gap-4 transition-colors duration-300"
            >
              <span className="font-sans text-lg font-bold text-white underline-offset-8 transition-colors duration-300 group-hover:text-peach-bright group-hover:underline group-hover:decoration-white/50 md:text-xl">
                {industry.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-start lg:justify-end">
          <a href="#consultation" className="btn-white group">
            Discuss your sector
            <span className="btn-icon" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
