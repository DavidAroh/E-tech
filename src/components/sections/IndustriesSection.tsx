import { industries } from "@/data/content";
import { SectionReveal } from "../SectionReveal";

export function IndustriesSection() {
  return (
    <SectionReveal
      id="industries"
      aria-labelledby="industries-heading"
      className="section-padding content-auto bg-charcoal"
    >
      <div className="container-content">
        <div className="mb-10 max-w-3xl">
          <h2
            id="industries-heading"
            className="heading-display mb-4 text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
          >
            Industries we serve
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-beige-muted md:text-xl">
            Sector-aware guidance for regulated and high-stakes environments
            across Africa and beyond.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-x-12 gap-y-6 border-y border-beige/25 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <li
              key={industry.name}
              className="group flex items-baseline gap-4 transition-colors duration-300"
            >
              <span className="font-mono text-[10px] text-beige/40 transition-colors duration-300 group-hover:text-beige/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-sans text-base font-medium text-beige underline-offset-8 transition-colors duration-300 group-hover:text-white group-hover:underline group-hover:decoration-beige/40">
                {industry.name}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-start lg:justify-end">
          <a href="#consultation" className="btn-ghost">
            Discuss your sector
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
