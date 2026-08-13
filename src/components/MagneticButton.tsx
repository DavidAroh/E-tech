"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: React.ReactNode;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Max pull in pixels */
  strength?: number;
  type?: "button" | "submit";
  "aria-label"?: string;
};

/**
 * Magnetic micro-physics wrapper (MOTION_INTENSITY > 5).
 * Pulls its child toward the cursor using useMotionValue + useSpring —
 * never React state for continuous animation (perf + render-cycle safe).
 * Renders as an inline-flex span so it can wrap anchor/button CTAs.
 */
export function MagneticButton({
  children,
  as = "a",
  href,
  onClick,
  className,
  strength = 0.18,
  type = "button",
  ...rest
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.4 });
  const ty = useSpring(my, { stiffness: 180, damping: 14, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  }

  function handleLeave() {
    if (reduce) return;
    mx.set(0);
    my.set(0);
  }

  const inner =
    as === "button" ? (
      <motion.button
        type={type}
        onClick={onClick}
        style={{ x: tx, y: ty }}
        className={cn("inline-flex", className)}
        {...rest}
      >
        {children}
      </motion.button>
    ) : (
      <motion.a
        href={href}
        onClick={onClick}
        style={{ x: tx, y: ty }}
        className={cn("inline-flex", className)}
        {...rest}
      >
        {children}
      </motion.a>
    );

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex will-change-transform"
    >
      {inner}
    </div>
  );
}
