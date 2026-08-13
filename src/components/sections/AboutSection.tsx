"use client";

import { motion, useReducedMotion } from "framer-motion";
import { aboutParagraphs, homepageValues, mission } from "@/data/content";
import { SectionReveal } from "../SectionReveal";
import { EASE_ENTRANCE } from "@/lib/motion";

/**
 * Editorial statement spread: the mission leads as a display headline,
 * supporting paragraphs run below, values sit in a hairline index row.
 * No eyebrow, no numbered chrome.
 */
export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <SectionReveal
      id="about"
      aria-labelledby="about-heading"
      className="section-padding content-auto bg-cocoa"
    >
      <div className="container-content">
        <motion.h2
          id="about-heading"
          className="heading-display mb-10 max-w-4xl text-4xl font-semibold leading-[1.12] text-white md:text-5xl lg:text-6xl md:leading-[1.1]"
          initial={reduce ? false : { y: 20 }}
          whileInView={reduce ? undefined : { y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
        >
          {mission}
        </motion.h2>

        <div className="grid grid-cols-1 gap-10 border-t border-beige/25 pt-10 md:grid-cols-2 md:gap-14">
          {aboutParagraphs.map((p, i) => (
            <motion.p
              key={p.slice(0, 40)}
              className="max-w-prose text-base leading-relaxed text-beige-muted md:text-lg"
              initial={reduce ? false : { y: 16 }}
              whileInView={reduce ? undefined : { y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                ease: EASE_ENTRANCE,
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.ul
          className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-4 border-t border-beige/25 pt-8"
          initial={reduce ? false : {}}
          whileInView={reduce ? undefined : {}}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {homepageValues.map((value, i) => (
            <motion.li
              key={value}
              className="flex items-baseline gap-3 border-l border-beige/25 pl-5 font-sans text-base font-medium tracking-wide text-beige"
              initial={reduce ? false : { x: -10 }}
              whileInView={reduce ? undefined : { x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.3 + i * 0.06,
                ease: EASE_ENTRANCE,
              }}
            >
              <span className="font-mono text-[10px] text-beige/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              {value}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SectionReveal>
  );
}
