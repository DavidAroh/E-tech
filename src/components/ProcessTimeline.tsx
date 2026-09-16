import { processSteps } from "@/data/content";

/**
 * Six-phase journey as an airy numbered grid: generous whitespace,
 * oversized ghost numerals, one idea per cell. Premium calm over
 * dense-rail scanning.
 */
export function ProcessTimeline() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-card border border-beige/20 bg-beige/20 sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, index) => (
        <li
          key={step.title}
          className="group flex flex-col gap-4 bg-cocoa p-8 transition-colors duration-200 hover:bg-caramel md:p-10"
        >
          <span
            aria-hidden
            className="heading-display text-5xl font-bold leading-none text-beige/25 transition-colors duration-200 group-hover:text-brass md:text-6xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="heading-display text-xl font-bold text-white md:text-2xl">
            {step.title}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-white/85 md:text-base">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
