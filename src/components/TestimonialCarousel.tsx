"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/content";
import { EASE_ENTRANCE, EASE_PREMIUM } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { BrandIcon } from "./BrandIcon";

export function TestimonialCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => go(1), 6000);
    return () => window.clearInterval(id);
  }, [go, paused, reduce]);

  const item = testimonials[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="bezel-shell">
        <div className="bezel-core relative min-h-[240px] overflow-hidden p-8 md:min-h-[260px] md:p-10">
          {/* Ghost quote mark */}
          <span
            aria-hidden
            className="heading-display pointer-events-none absolute right-6 top-4 select-none font-bold leading-none text-beige/[0.08]"
            style={{ fontSize: "5.5rem" }}
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduce ? false : { opacity: 1, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 1, y: -8 }}
              transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
              className="text-left"
            >
              <p className="heading-display mb-8 text-xl font-semibold leading-relaxed text-white md:text-2xl">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
                  <span className="block h-2.5 w-2.5 rounded-sm bg-purple-light/70" />
                </span>
                <cite className="not-italic">
                  <span className="block font-sans text-sm font-semibold text-beige">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block font-sans text-sm text-beige-muted">
                    {item.role}, {item.company}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-beige/15 text-beige transition-colors duration-400 ease-premium hover:border-purple-light/40 hover:text-purple-light"
          aria-label="Previous testimonial"
        >
          <BrandIcon name="caretLeft" className="h-5 w-5" />
        </button>

        <div className="flex gap-1.5" role="tablist" aria-label="Testimonial pages">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-400",
                  i === index
                    ? "h-2 w-6 bg-purple-light"
                    : "h-2 w-2 bg-beige/25 hover:bg-beige/45"
                )}
                style={{
                  transitionTimingFunction: `cubic-bezier(${EASE_PREMIUM.join(",")})`,
                }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-beige/15 text-beige transition-colors duration-400 ease-premium hover:border-purple-light/40 hover:text-purple-light"
          aria-label="Next testimonial"
        >
          <BrandIcon name="caretRight" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
