"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lineScaleX = useTransform(progress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-cocoa-light/40 lg:block">
        <motion.div
          className="h-full origin-left bg-purple-light/80"
          style={{ scaleX: reduce ? 1 : lineScaleX }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-4 left-[19px] top-4 w-px bg-cocoa-light/40 lg:hidden">
        <motion.div
          className="w-full origin-top bg-purple-light/80"
          style={{ scaleY: reduce ? 1 : lineScaleY }}
        />
      </div>

      <motion.ol
        className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-5"
        variants={staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
      >
        {processSteps.map((step, index) => (
          <motion.li
            key={step.title}
            variants={staggerItem}
            className="relative flex gap-5 lg:flex-col lg:gap-5"
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-light/35 bg-black text-xs font-semibold tabular-nums text-purple-light">
              {index + 1}
            </div>
            <div className="min-w-0 pt-1 lg:pt-0">
              <h3 className="heading-display mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-beige-muted">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
