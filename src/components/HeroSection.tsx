"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_ENTRANCE } from "@/lib/motion";
import { BrandIcon } from "./BrandIcon";
import { HeroIllustration } from "./HeroIllustration";

/**
 * Visible-first hero: content is always readable. Motion only adds a
 * slight rise — never gates text behind opacity 0.
 */
export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col bg-black"
    >
      <div className="container-content grid flex-1 items-center gap-8 px-4 pb-20 pt-28 sm:px-6 md:px-8 md:gap-12 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-32 xl:px-16">
        <div className="lg:col-span-7 xl:col-span-6">
          <motion.p
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTRANCE, delay: 0.08 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60"
          >
            <span aria-hidden>01</span>
            <span className="h-px w-8 bg-beige/25" aria-hidden />
            <span>AI Advisory &amp; Cybersecurity</span>
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="heading-display mb-6 max-w-2xl text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[4.25rem] lg:leading-[1.04]"
            initial={reduce ? false : { y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.14 }}
          >
            Adopt AI securely and responsibly.
          </motion.h1>

          <motion.p
            className="mb-10 max-w-lg text-lg leading-relaxed text-beige-muted md:text-xl"
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ENTRANCE, delay: 0.22 }}
          >
            Boutique AI advisory and cybersecurity for organizations that need
            governance as much as innovation.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: EASE_ENTRANCE, delay: 0.3 }}
          >
            <a href="#consultation" className="btn-primary group">
              Book a Consultation
              <span className="btn-icon">
                <BrandIcon name="arrowUpRight" className="h-4 w-4" />
              </span>
            </a>
            <a href="#services" className="btn-ghost">
              View services
            </a>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:col-span-5 lg:justify-end xl:col-span-6"
          initial={reduce ? false : { scale: 0.99, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_ENTRANCE, delay: 0.2 }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-media border border-beige/[0.08] lg:max-w-lg">
            <HeroIllustration />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
