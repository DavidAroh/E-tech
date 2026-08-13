"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_ENTRANCE } from "@/lib/motion";
import { BrandIcon } from "./BrandIcon";
import { HeroIllustration } from "./HeroIllustration";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col bg-black"
    >
      <div className="container-content grid flex-1 items-center gap-12 px-4 pb-16 pt-32 sm:px-6 md:px-8 lg:grid-cols-12 lg:gap-12 lg:pt-36 xl:px-16">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTRANCE, delay: 0.08 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-beige/60"
          >
            <span aria-hidden>01</span>
            <span className="h-px w-8 bg-beige/25" aria-hidden />
            <span>AI Advisory &amp; Cybersecurity</span>
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="heading-display mb-6 max-w-xl text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-[4.75rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.14 }}
          >
            Adopt AI securely and responsibly.
          </motion.h1>

          <motion.p
            className="mb-10 max-w-md text-base leading-relaxed text-beige-muted md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ENTRANCE, delay: 0.22 }}
          >
            Boutique AI advisory and cybersecurity for organizations that need
            governance as much as innovation.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
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
          className="flex justify-center lg:col-span-6 lg:justify-end"
          initial={reduce ? false : { opacity: 0, scale: 0.99, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_ENTRANCE, delay: 0.2 }}
        >
          <div className="w-full max-w-lg">
            <div className="overflow-hidden rounded-media border border-beige/[0.08]">
              <HeroIllustration />
            </div>
            <p className="flex items-baseline justify-between gap-4 border-b border-beige/[0.08] py-3 font-mono text-[11px] tracking-[0.14em] text-beige/40">
              <span>FIG. 01 — SECURE AI POSTURE</span>
              <span aria-hidden>RISE · DEFEND · OVERCOME</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom index rail — static, no decoration */}
      <div className="container-content px-4 pb-8 sm:px-6 md:px-8 xl:px-16">
        <div className="flex items-baseline justify-between border-t border-beige/[0.08] pt-4 font-mono text-[11px] tracking-[0.16em] text-beige/40">
          <span>ETELA TECHNOLOGIES</span>
          <span className="hidden sm:inline">AI ADVISORY / CYBERSECURITY</span>
          <span aria-hidden>03 — SERVICES ↓</span>
        </div>
      </div>
    </section>
  );
}