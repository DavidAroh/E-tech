"use client";

import { motion, useReducedMotion } from "framer-motion";
import { primaryServices } from "@/data/content";
import type { IconName } from "@/data/content";
import { BrandIcon } from "../BrandIcon";
import { CapabilityMarquee } from "../CapabilityMarquee";
import { SectionReveal } from "../SectionReveal";
import { EASE_ENTRANCE } from "@/lib/motion";

function ServiceRow({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: IconName;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group grid cursor-default gap-2 border-t border-cocoa/15 py-7 transition-colors duration-300 hover:bg-white/60 sm:grid-cols-12 sm:gap-6 md:py-9"
      initial={reduce ? false : { y: 10 }}
      whileInView={reduce ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_ENTRANCE, delay: index * 0.04 }}
    >
      <p className="font-mono text-xs tracking-[0.14em] text-cocoa/50 sm:col-span-2">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="flex items-start gap-4 sm:col-span-6">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-media border border-cocoa/15 bg-white/70">
          <BrandIcon
            name={icon}
            className="h-4 w-4 text-purple transition-colors duration-300 group-hover:text-cocoa"
          />
        </span>
        <h3 className="heading-display text-xl font-semibold text-cocoa transition-colors duration-300 group-hover:text-purple md:text-2xl">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-cocoa/75 sm:col-span-3 md:text-[15px]">
        {description}
      </p>
      <p className="hidden items-start justify-end font-mono text-xs text-cocoa/0 transition-colors duration-300 group-hover:text-cocoa/50 sm:col-span-1 sm:flex">
        →
      </p>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <SectionReveal
      id="services"
      aria-labelledby="services-heading"
      className="section-padding content-auto bg-paper"
    >
      <div className="container-content">
        <div className="mb-12 max-w-3xl border-b border-cocoa/15 pb-8 md:pb-10">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-cocoa/70">
            <span aria-hidden>03</span>
            <span className="h-px w-8 bg-cocoa/30" aria-hidden />
            <span>Services</span>
          </p>
          <h2
            id="services-heading"
            className="heading-display mb-4 text-4xl font-semibold text-cocoa md:text-5xl lg:text-6xl"
          >
            How we help
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-cocoa/75 md:text-xl">
            Six core engagements at the intersection of AI strategy and
            cybersecurity. Additional capabilities available on request.
          </p>
        </div>

        <div>
          {primaryServices.map((service, i) => (
            <ServiceRow
              key={service.slug}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={i}
            />
          ))}
        </div>

        <CapabilityMarquee />
      </div>
    </SectionReveal>
  );
}
