"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_PREMIUM } from "@/lib/motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  hover?: boolean;
  /** featured = stronger cocoa core */
  featured?: boolean;
};

/**
 * Double-bezel card — solid surfaces only (no backdrop-blur on scroll content).
 */
export function GlassCard({
  children,
  className,
  as = "div",
  hover = true,
  featured = false,
}: GlassCardProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const canHover = hover && !reduce;

  return (
    <Component
      className={cn(
        "group bezel-shell h-full transition-[border-color,transform] duration-400 ease-premium",
        canHover && "hover:scale-[1.012]",
        className
      )}
      whileHover={canHover ? { scale: 1.012 } : undefined}
      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
    >
      <div
        className={cn(
          "h-full border border-transparent p-6 transition-colors duration-400 ease-premium md:p-7",
          featured ? "bezel-core" : "bezel-core-soft",
          canHover && "group-hover:border-purple-light/25"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
