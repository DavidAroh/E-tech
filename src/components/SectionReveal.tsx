"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectionReveal, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "header" | "footer";
  id?: string;
  "aria-labelledby"?: string;
};

export function SectionReveal({
  children,
  className,
  as = "section",
  id,
  "aria-labelledby": ariaLabelledby,
}: SectionRevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  // Reduced motion / SSR-safe: always fully visible
  if (reduce) {
    const Tag = as;
    return (
      <Tag id={id} aria-labelledby={ariaLabelledby} className={cn(className)}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionReveal}
    >
      {children}
    </Component>
  );
}
