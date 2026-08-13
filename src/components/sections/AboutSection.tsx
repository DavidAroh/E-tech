"use client";

import { motion, useReducedMotion } from "framer-motion";
import { aboutParagraphs, homepageValues, mission } from "@/data/content";
import { SectionReveal } from "../SectionReveal";
import { EASE_ENTRANCE } from "@/lib/motion";

/**
 * Asymmetric about section: left-aligned content with staggered reveals.
 * No centered text block.
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column: heading + mission */}
          <div className="lg:col-span-5">
            <motion.h2
              id="about-heading"
              className="heading-display mb-6 text-3xl font-semibold text-white md:text-4xl"
              initial={reduce ? false : { opacity: 1, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE_ENTRANCE }}
            >
              Secure, responsible AI adoption
            </motion.h2>
            <motion.p
              className="heading-display text-xl font-semibold leading-snug text-beige md:text-2xl md:leading-snug"
              initial={reduce ? false : { opacity: 1, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_ENTRANCE }}
            >
              {mission}
            </motion.p>

            {/* Value words - left-aligned, stacked */}
            <motion.ul
              className="mt-10 space-y-3 border-t border-beige/10 pt-8"
              initial={reduce ? false : { opacity: 1 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {homepageValues.map((value, i) => (
                <motion.li
                  key={value}
                  className="font-sans text-sm font-medium tracking-wide text-beige"
                  initial={reduce ? false : { opacity: 1, x: -12 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.06,
                    ease: EASE_ENTRANCE,
                  }}
                >
                  {value}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right column: paragraphs with staggered entry */}
          <div className="space-y-5 lg:col-span-7">
            {aboutParagraphs.map((p, i) => (
              <motion.p
                key={p.slice(0, 40)}
                className="max-w-prose text-base leading-relaxed text-beige-muted md:text-lg"
                initial={reduce ? false : { opacity: 1, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.1,
                  ease: EASE_ENTRANCE,
                }}
              >
                {p}
              </motion.p>
            ))}

            {/* Decorative line */}
            <motion.div
              className="h-px bg-gradient-to-r from-beige/10 via-beige/5 to-transparent pt-6"
              initial={reduce ? false : { scaleX: 0, originX: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_ENTRANCE }}
            />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
