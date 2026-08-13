import { services } from "@/data/content";

/**
 * Single kinetic ticker of the full capability catalog, styled for the
 * light "worksheet" Services surface. Decorative on screen; the full
 * list remains available to assistive technology via the sr-only list.
 */
export function CapabilityMarquee() {
  const items = services.map((s) => s.title);
  const row = [...items, ...items];

  return (
    <div className="mt-16 border-t border-cocoa/15 pt-8">
      <p className="mb-6 font-mono text-xs tracking-[0.18em] text-cocoa/50">
        Additional capabilities
      </p>
      <div
        className="overflow-hidden"
        aria-hidden="true"
      >
        <div className="capability-marquee-track pointer-events-none whitespace-nowrap">
          {row.map((title, i) => (
            <span
              key={`${title}-${i}`}
              className="flex items-center gap-12 pr-12 font-mono text-base tracking-[0.14em] text-cocoa/60"
            >
              {title}
              <span className="text-cocoa/30" aria-hidden>
                /
              </span>
            </span>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {services.map((s) => (
          <li key={s.slug}>{s.title}</li>
        ))}
      </ul>
    </div>
  );
}
