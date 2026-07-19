import type { Variants, Transition } from "framer-motion";

export const EASE_ENTRANCE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_PREMIUM: [number, number, number, number] = [0.32, 0.72, 0, 1];
export const EASE_INTERACTIVE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const entranceTransition: Transition = {
  duration: 0.7,
  ease: EASE_ENTRANCE,
};

/**
 * Visible-first reveals: content is fully visible by default in CSS.
 * Motion only enhances (slight rise). No opacity gate, no filter blur
 * (blur can leave content unreadable if animation never runs).
 */
export const sectionReveal: Variants = {
  hidden: { opacity: 1, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 1, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: entranceTransition,
  },
};

export const viewportOnce = {
  once: true,
  margin: "-60px" as const,
  amount: 0.15 as const,
};
