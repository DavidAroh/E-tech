import { processSteps } from "@/data/content";

/**
 * Six-phase rail: oversized index numerals with generous spacing.
 * A single hairline frames the whole block; no per-row rules.
 */
export function ProcessTimeline() {
  return (
    <ol className="border-y border-beige/20">
      {processSteps.map((step, index) => (
        <li
          key={step.title}
          className="group grid gap-3 py-10 transition-colors duration-300 hover:bg-white/5 sm:grid-cols-12 sm:gap-6 md:py-14"
        >
          <p className="font-mono text-5xl font-medium leading-none text-beige/25 transition-colors duration-300 group-hover:text-beige/50 sm:col-span-3 md:text-7xl">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="sm:col-span-4">
            <h3 className="heading-display text-2xl font-semibold text-white md:text-3xl">
              {step.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-beige-muted sm:col-span-5 md:text-base">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
