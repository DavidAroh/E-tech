import { processSteps } from "@/data/content";

export function ProcessTimeline() {
  return (
    <ol className="divide-y divide-beige/25 border-y border-beige/25">
      {processSteps.map((step, index) => (
        <li
          key={step.title}
          className="grid gap-2 py-7 transition-colors duration-300 hover:bg-white/5 sm:grid-cols-12 sm:gap-6 md:py-8"
        >
          <p className="font-mono text-2xl font-medium leading-none text-beige/30 sm:col-span-2">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div className="sm:col-span-4">
            <h3 className="heading-display text-xl font-semibold text-white md:text-2xl">
              {step.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-beige-muted sm:col-span-6 md:text-[15px]">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}