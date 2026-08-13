"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_PREMIUM } from "@/lib/motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  hover?: boolean;
};

/**
 * Double-bezel card with liquid glass refraction.
 * Solid surfaces only (no backdrop-blur on scroll content).
 * Adds inner border + inner shadow for physical edge refraction.
 */
export function GlassCard({
  children,
  className,
  as = "div",
  hover = true,
}: GlassCardProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const canHover = hover && !reduce;

  return (
    <Component
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-beige/[0.06] bg-cocoa/60",
        "transition-[border-color,transform] duration-400 ease-premium",
        canHover && "hover:scale-[1.012]",
        className
      )}
      whileHover={canHover ? { y: -2 } : undefined}
      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
    >
      {/* Liquid glass refraction: inner border + inner shadow */}
      <div
        className={cn(
          "absolute inset-0 rounded-[1.75rem] pointer-events-none",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.15)]",
          "border border-white/[0.04]"
        )}
      />

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-beige/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className={cn(
          "relative h-full p-6 transition-colors duration-400 ease-premium md:p-7",
          canHover && "group-hover:border-beige/[0.12]"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
