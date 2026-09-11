"use client";

import { motion, useReducedMotion } from "framer-motion";
import { primaryServices } from "@/data/content";
import type { IconName } from "@/data/content";
import { BrandIcon } from "../BrandIcon";
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
      className="group grid cursor-default gap-3 border-t border-cocoa/20 py-8 transition-colors duration-300 hover:bg-white/60 sm:grid-cols-12 sm:gap-6 md:py-10"
      initial={reduce ? false : { y: 10 }}
      whileInView={reduce ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_ENTRANCE, delay: index * 0.04 }}
    >
      <div className="flex flex-col items-start gap-4 sm:col-span-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-media border-2 border-cocoa/25 bg-white shadow-sm transition-colors duration-300 group-hover:border-purple/60">
          <BrandIcon
            name={icon}
            weight="bold"
            className="h-7 w-7 text-cocoa transition-colors duration-300 group-hover:text-purple"
          />
        </span>
        <h3 className="heading-display text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-purple md:text-[1.7rem]">
          {title}
        </h3>
      </div>
      <p className="text-base leading-relaxed text-cocoa sm:col-span-7 md:text-lg">
        {description}
      </p>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <SectionReveal
      id="services"
      aria-labelledby="services-heading"
      className="section-padding content-auto bg-peach"
    >
      <div className="container-content">
        <div className="mb-12 max-w-3xl border-b border-cocoa/20 pb-8 md:pb-10">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">
            <span className="h-px w-8 bg-cocoa/40" aria-hidden />
            <span>Services</span>
          </p>
          <h2
            id="services-heading"
            className="heading-display mb-4 text-4xl font-bold text-ink md:text-5xl lg:text-6xl"
          >
            How we help
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-cocoa md:text-xl">
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
      </div>
    </SectionReveal>
  );
}
