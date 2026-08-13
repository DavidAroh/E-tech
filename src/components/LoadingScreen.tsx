"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_ENTRANCE } from "@/lib/motion";

const SESSION_KEY = "etech-loaded";

/**
 * First-visit intro only. Never blocks content permanently:
 * - Skips entirely after first visit (sessionStorage)
 * - Hard-unmounts after max duration
 * - Always paints logo (no empty black frame)
 * - Mounts only after client hydration so SSR content is visible immediately
 */
export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
    } catch {
      // proceed with intro
    }

    // Prefer reduced-motion users: skip theatrical intro
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      return;
    }

    setShow(true);
    const duration = 900;
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }, duration);

    // Absolute safety: force clear even if timeout is cleared by remount churn
    const hard = window.setTimeout(() => setShow(false), 2000);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(hard);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-loader flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: reduce ? 0.15 : 0.55, ease: EASE_ENTRANCE },
          }}
          role="status"
          aria-label="Loading Etela Technologies"
        >
          <motion.div
            className="mb-8 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-media border border-beige/15 bg-purple-dim/50">
              <svg
                viewBox="0 0 32 32"
                className="h-7 w-7"
                fill="none"
                aria-hidden
              >
                <path
                  d="M16 4 L24 8.5 V16.5 C24 21.5 20.5 25.5 16 27.5 C11.5 25.5 8 21.5 8 16.5 V8.5 Z"
                  stroke="#DEBFA2"
                  strokeWidth="1.25"
                  fill="rgba(116,81,51,0.35)"
                />
                <circle cx="16" cy="16" r="1.75" fill="#CFB093" />
              </svg>
            </div>
            <p className="font-display text-xl font-bold tracking-tight text-white">
              Etela Technologies
            </p>
            <p className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-beige-muted">
              Rise. Defend. Overcome.
            </p>
          </motion.div>

          <div className="h-px w-44 overflow-hidden bg-cocoa-light/40">
            <motion.div
              className="h-full origin-left bg-purple-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.75,
                ease: EASE_ENTRANCE,
                delay: 0.08,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
