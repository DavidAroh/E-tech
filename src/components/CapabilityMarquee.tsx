import { services } from "@/data/content";

/**
 * Full-bleed black strip listing additional capabilities in white.
 * Rendered standalone between sections so it reads as its own band,
 * visually separated from the light Services surface.
 */
export function CapabilityMarquee() {
  const items = services.map((s) => s.title);
  const row = [...items, ...items];

  return (
    <div className="border-y border-white/10 bg-ink py-10">
      <div className="container-content">
        <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Additional capabilities
        </p>
      </div>
      <div className="overflow-hidden" aria-hidden="true">
        <div className="capability-marquee-track pointer-events-none whitespace-nowrap">
          {row.map((title, i) => (
            <span
              key={`${title}-${i}`}
              className="flex items-center gap-12 pr-12 font-mono text-base tracking-[0.14em] text-white"
            >
              {title}
              <span className="text-peach-bright" aria-hidden>
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
