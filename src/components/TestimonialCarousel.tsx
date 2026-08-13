"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/content";
import { EASE_ENTRANCE } from "@/lib/motion";
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
      <div className="border border-beige/25 p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE_ENTRANCE }}
            className="text-left"
          >
            <p className="heading-display mb-10 min-h-[6.5rem] text-xl font-semibold leading-relaxed text-white md:min-h-[7rem] md:text-2xl">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="flex items-baseline justify-between gap-4 border-t border-beige/25 pt-5">
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

      <div className="mt-6 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.16em] text-beige/70">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center border border-beige/25 text-beige transition-colors duration-300 hover:border-purple-light/50 hover:text-purple-light"
            aria-label="Previous testimonial"
          >
            <BrandIcon name="caretLeft" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center border border-beige/25 text-beige transition-colors duration-300 hover:border-purple-light/50 hover:text-purple-light"
            aria-label="Next testimonial"
          >
            <BrandIcon name="caretRight" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}