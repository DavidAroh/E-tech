"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { lenisRef } from "@/lib/smoothScroll";

/** Offset under the fixed header when scrolling to anchored sections. */
const HEADER_OFFSET = -96;

/**
 * Buttery inertia scrolling via Lenis.
 * - Respects `prefers-reduced-motion`: skipped entirely (native jump).
 * - Intercepts same-page hash links and eases to the target with a header offset.
 * - Exposes the instance through `lenisRef` so focus calls (back-to-top,
 *   assessment next-step) can share the same smooth engine.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    // Keep CSS smooth-scroll from double-handling while Lenis is active.
    document.documentElement.style.scrollBehavior = "auto";

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      if (anchor.classList.contains("skip-link")) return;
      if (anchor.closest("[data-lenis-no-smooth]")) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.1 });
        return;
      }

      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
