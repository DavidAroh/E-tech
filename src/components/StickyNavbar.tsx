"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { navLinks } from "@/data/content";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { EASE_ENTRANCE, EASE_PREMIUM } from "@/lib/motion";
import { BrandIcon } from "./BrandIcon";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

const SearchModal = dynamic(
  () => import("./SearchModal").then((m) => m.SearchModal),
  { ssr: false }
);

export function StickyNavbar() {
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuTitleId = useId();
  const { scrollY } = useScroll();
  const shellOpacity = useTransform(scrollY, [0, 48, 140], [0.55, 0.82, 0.92]);
  const shellBg = useTransform(
    shellOpacity,
    (v) => `rgba(46, 31, 26, ${v})`
  );

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 50);
  }, []);

  useFocusTrap(mobileOpen, menuRef, closeMobile);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mobile menu on large screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-sticky flex justify-center px-3 pt-4 sm:px-4 sm:pt-5 md:pt-6">
        <motion.header className="pointer-events-auto w-full max-w-content">
          <motion.div
            className={cn(
              "mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 rounded-full px-3 pl-4 sm:h-16 sm:px-4 sm:pl-5",
              reduce ? "glass-chrome" : "border border-beige/10 shadow-island"
            )}
            style={
              reduce
                ? undefined
                : {
                    background: shellBg,
                    backdropFilter: "blur(20px) saturate(140%)",
                    WebkitBackdropFilter: "blur(20px) saturate(140%)",
                  }
            }
          >
            <Logo compact />

            <nav
              className="hidden min-w-0 items-center gap-0.5 lg:flex"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 font-sans text-[13px] font-medium text-beige-muted transition-colors duration-400 ease-premium hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-beige transition-colors duration-400 hover:bg-beige/5 hover:text-purple-light"
                aria-label="Open search"
              >
                <BrandIcon name="search" className="h-5 w-5" />
              </button>

              <a
                href="#consultation"
                className="btn-primary !gap-2 !px-4 !py-2.5 text-xs sm:!px-5 sm:text-sm"
              >
                <span className="hidden sm:inline">Book a Consultation</span>
                <span className="sm:hidden">Book</span>
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-beige lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span className="sr-only">Menu</span>
                <span className="relative block h-3.5 w-5" aria-hidden>
                  <span
                    className={cn(
                      "absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-400 ease-premium",
                      mobileOpen && "top-1.5 rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-300",
                      mobileOpen && "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-3 block h-px w-full bg-current transition-transform duration-400 ease-premium",
                      mobileOpen && "top-1.5 -rotate-45"
                    )}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </motion.header>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-overlay lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/75 backdrop-blur-3xl"
              aria-label="Close menu overlay"
              tabIndex={-1}
              onClick={closeMobile}
            />
            <motion.div
              ref={menuRef}
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={menuTitleId}
              className="absolute inset-x-3 top-24 max-h-[min(80dvh,32rem)] overflow-y-auto rounded-shell border border-beige/10 bg-cocoa/95 p-2 shadow-island sm:inset-x-6"
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: 12, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_ENTRANCE }}
            >
              <p id={menuTitleId} className="sr-only">
                Site navigation
              </p>
              <ul className="flex flex-col gap-1 p-3">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.05,
                      duration: 0.45,
                      ease: EASE_ENTRANCE,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold tracking-tight text-white transition-colors hover:bg-black/25"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="p-3 pt-1">
                <a
                  href="#consultation"
                  onClick={closeMobile}
                  className="btn-primary w-full"
                >
                  Book a Consultation
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
