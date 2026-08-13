"use client";

import { motion, useReducedMotion } from "framer-motion";
import { primaryServices } from "@/data/content";
import type { IconName } from "@/data/content";
import { BrandIcon } from "../BrandIcon";
import { MoreServices } from "../MoreServices";
import { SectionReveal } from "../SectionReveal";
import { cn } from "@/lib/cn";
import { EASE_ENTRANCE } from "@/lib/motion";

/**
 * Bento grid layout: asymmetric tiles with perpetual micro-animations.
 * No 3-column equal card wall. Featured card spans 2 cols on desktop.
 */

const BENTO_LAYOUT = [
  "md:col-span-2 lg:col-span-7",  // Featured - wide
  "md:col-span-1 lg:col-span-5",  // Standard
  "md:col-span-1 lg:col-span-5",  // Standard
  "md:col-span-2 lg:col-span-7",  // Featured - wide
  "md:col-span-1 lg:col-span-6",  // Standard
  "md:col-span-1 lg:col-span-6",  // Standard
];

function BentoServiceCard({
  title,
  description,
  icon,
  index,
  featured = false,
}: {
  title: string;
  description: string;
  icon: IconName;
  index: number;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-beige/[0.06] bg-cocoa/60 p-6 md:p-7",
        "transition-[border-color] duration-400 ease-premium",
        "hover:border-beige/[0.12]",
        BENTO_LAYOUT[index]
      )}
      initial={reduce ? false : { opacity: 1, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: EASE_ENTRANCE,
      }}
      whileHover={reduce ? undefined : { y: -2 }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-beige/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        {/* Icon well with perpetual pulse on featured */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
          <BrandIcon
            name={icon}
            className="h-5 w-5 text-beige transition-colors duration-400 group-hover:text-purple-light"
          />
          {featured && !reduce && (
            <motion.div
              className="absolute inset-0 rounded-2xl border border-beige/[0.15]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <h3 className="heading-display mb-2 text-lg font-semibold text-white md:text-xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-beige-muted/80 md:text-base">
          {description}
        </p>

        {/* Featured card: extra decorative element */}
        {featured && (
          <div className="mt-auto pt-5">
            <div className="h-px w-full bg-gradient-to-r from-beige/10 via-beige/5 to-transparent" />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <SectionReveal
      id="services"
      aria-labelledby="services-heading"
      className="section-padding content-auto bg-black"
    >
      <div className="container-content">
        <div className="mb-12 max-w-2xl md:mb-14">
          <h2
            id="services-heading"
            className="heading-display mb-4 text-3xl font-semibold text-white md:text-4xl"
          >
            How we help
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-beige-muted">
            Six core engagements at the intersection of AI strategy and
            cybersecurity. Additional capabilities available on request.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {primaryServices.map((service, i) => (
            <BentoServiceCard
              key={service.slug}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={i}
              featured={i === 0 || i === 3}
            />
          ))}
        </div>

        <MoreServices />
      </div>
    </SectionReveal>
  );
}
