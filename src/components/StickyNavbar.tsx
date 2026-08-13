"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import dynamic from "next/dynamic";
import { navLinks } from "@/data/content";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { EASE_PREMIUM } from "@/lib/motion";
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
      <motion.header className="glass-chrome fixed inset-x-0 top-0 z-sticky">
        <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-3 px-4 sm:px-6 md:px-8 lg:h-[4.5rem] xl:px-16">
          <Logo />

          <nav
            className="hidden min-w-0 items-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-[13px] font-medium text-beige-muted transition-colors duration-300 ease-premium hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-beige transition-colors duration-300 hover:text-purple-light"
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
              className="relative flex h-10 w-10 items-center justify-center text-beige lg:hidden"
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
        </div>
      </motion.header>

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
              className="absolute inset-0 bg-black/85"
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
              className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-beige/10 bg-black p-6 sm:inset-x-0"
              initial={reduce ? false : { y: -12 }}
              animate={{ y: 0 }}
              exit={reduce ? undefined : { y: -8 }}
              transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            >
              <p id={menuTitleId} className="sr-only">
                Site navigation
              </p>
              <ul className="flex flex-col divide-y divide-beige/[0.08]">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { x: -8 }}
                    animate={{ x: 0 }}
                    transition={{
                      delay: 0.04 + i * 0.04,
                      duration: 0.35,
                      ease: EASE_PREMIUM,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-baseline justify-between py-5 font-display text-2xl font-semibold tracking-tight text-white transition-colors hover:text-purple-light"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-beige/40">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-6">
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
