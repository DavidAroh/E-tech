"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { primaryServices } from "@/data/content";
import { BrandIcon } from "../BrandIcon";
import { SectionReveal } from "../SectionReveal";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/cn";
import { EASE_ENTRANCE } from "@/lib/motion";

const AI_SLUGS = new Set([
  "ai-strategy-advisory",
  "ai-risk-governance",
  "secure-ai-implementation",
  "responsible-ai-audit",
]);

/**
 * How we help — tabbed disclosure. Six engagements read as one calm
 * tab row; selecting a tab reveals a single detail panel with its
 * evidence and next step. Depth on demand, never a wall.
 */
export function ServicesSection() {
  const [tab, setTab] = useState(primaryServices[0].slug);
  const reduce = useReducedMotion();
  const active =
    primaryServices.find((s) => s.slug === tab) ?? primaryServices[0];
  const activeIndex = primaryServices.findIndex((s) => s.slug === active.slug);

  return (
    <SectionReveal
      id="services"
      aria-labelledby="services-heading"
      className="section-padding content-auto bg-peach"
    >
      <div className="container-content">
        <div className="mb-10 max-w-3xl md:mb-12">
          <Badge
            variant="outline"
            className="mb-5 font-mono font-medium tracking-[0.14em]"
          >
            06 CORE ENGAGEMENTS
          </Badge>
          <h2
            id="services-heading"
            className="heading-display mb-4 text-4xl font-bold text-ink md:text-5xl lg:text-6xl"
          >
            How we help
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-inksoft md:text-xl">
            Six core engagements at the intersection of AI strategy and
            cybersecurity. Pick one to see what it covers.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Service engagements"
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {primaryServices.map((s, i) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={tab === s.slug}
              aria-controls="service-panel"
              id={`service-tab-${s.slug}`}
              onClick={() => setTab(s.slug)}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-2.5 rounded-media border px-4 py-2.5 font-sans text-sm font-medium transition-colors duration-200 ease-premium active:scale-[0.97]",
                tab === s.slug
                  ? "border-ink bg-ink text-white"
                  : "border-ink/20 bg-white/60 text-inksoft hover:border-ink/50 hover:text-ink"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[11px] font-medium tracking-[0.1em]",
                  tab === s.slug ? "text-brass-bright" : "text-inksoft/70"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </button>
          ))}
        </div>

        <motion.div
          key={active.slug}
          role="tabpanel"
          id="service-panel"
          aria-labelledby={`service-tab-${active.slug}`}
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
          className="mt-4 rounded-card border border-ink/15 bg-white p-6 md:mt-5 md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="font-mono font-medium tracking-[0.12em]"
                >
                  {String(activeIndex + 1).padStart(2, "0")} / 06
                </Badge>
                {AI_SLUGS.has(active.slug) ? (
                  <Badge variant="secondary">AI engagement</Badge>
                ) : null}
              </div>
              <h3 className="heading-display mt-4 text-2xl font-bold text-ink md:text-4xl">
                {active.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-inksoft md:text-lg">
                {active.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#consultation" className="btn-secondary-light">
                  Discuss this engagement
                  <BrandIcon
                    name="arrowUpRight"
                    weight="regular"
                    className="h-4 w-4"
                  />
                </a>
                <a
                  href="/assessment"
                  className="font-sans text-sm font-medium text-inksoft underline-offset-4 transition-colors duration-200 hover:text-brass-deep hover:underline"
                >
                  Or self-check first
                </a>
              </div>
            </div>
            <div className="flex items-start justify-start md:col-span-5 md:justify-end">
              <span className="flex size-20 items-center justify-center rounded-card border border-ink/15 bg-paper md:size-24">
                <BrandIcon
                  name={active.icon}
                  weight="bold"
                  className="h-10 w-10 text-brass-deep md:h-12 md:w-12"
                />
              </span>
            </div>
          </div>
        </motion.div>

        <Separator className="mb-6 mt-10 bg-ink/10 md:mb-8 md:mt-12" />

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a href="/assessment" className="btn-secondary-light">
            Start with the assessment
            <BrandIcon
              name="arrowUpRight"
              weight="regular"
              className="h-4 w-4"
            />
          </a>
          <p className="font-sans text-sm text-inksoft">
            Not sure where you stand? The 10-minute check maps your exposure first.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
