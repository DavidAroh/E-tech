"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_ENTRANCE } from "@/lib/motion";
import { BrandIcon } from "./BrandIcon";
import { HeroIllustration } from "./HeroIllustration";
import { SectionEyebrow } from "./SectionEyebrow";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] overflow-hidden bg-black"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 25%, rgba(116,81,51,0.18), transparent 70%), radial-gradient(ellipse 40% 35% at 15% 85%, rgba(110,75,45,0.55), transparent 65%)",
        }}
      />

      {/* Editorial split: type left, asset right */}
      <div className="container-content relative grid min-h-[100dvh] items-center gap-12 px-4 pb-20 pt-32 sm:px-6 md:px-8 lg:grid-cols-12 lg:gap-12 lg:pt-28 xl:px-16">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.08 }}
            className="mb-5"
          >
            <SectionEyebrow>AI Advisory &amp; Cybersecurity</SectionEyebrow>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="heading-display mb-5 max-w-xl text-[2.25rem] font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.05rem]"
            initial={reduce ? false : { opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ENTRANCE, delay: 0.12 }}
          >
            Adopt AI securely and responsibly.
          </motion.h1>

          <motion.p
            className="mb-9 max-w-md text-base leading-relaxed text-beige-muted md:text-lg"
            initial={reduce ? false : { opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.2 }}
          >
            Boutique AI advisory and cybersecurity for organizations that need
            governance as much as innovation.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={reduce ? false : { opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_ENTRANCE, delay: 0.28 }}
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
          initial={reduce ? false : { opacity: 1, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE_ENTRANCE, delay: 0.18 }}
        >
          <div className="bezel-shell w-full max-w-lg">
            <div className="bezel-core overflow-hidden !p-0">
              <HeroIllustration />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
