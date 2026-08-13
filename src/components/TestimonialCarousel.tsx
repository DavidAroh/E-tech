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
      <div className="border-t border-beige/25">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: -8 }}
            transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
            className="pt-10"
          >
            <p className="heading-display max-w-4xl text-3xl font-semibold leading-[1.25] text-white md:text-4xl lg:text-5xl lg:leading-[1.2]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <cite className="mt-8 flex items-baseline gap-3 not-italic">
              <span className="font-sans text-sm font-semibold text-beige">
                {item.name}
              </span>
              <span className="font-sans text-sm text-beige-muted">
                {item.role}, {item.company}
              </span>
            </cite>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-beige/25 pt-5">
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
