"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandIcon } from "./BrandIcon";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          className="fixed bottom-6 right-6 z-toast flex h-12 w-12 items-center justify-center rounded-full border border-beige/10 bg-cocoa text-beige shadow-island transition-colors duration-400 ease-premium hover:border-purple-light/40 hover:text-purple-light md:bottom-8 md:right-8"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
        >
          <BrandIcon name="arrowUp" className="h-5 w-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
