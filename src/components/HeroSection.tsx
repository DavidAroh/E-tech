"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE_ENTRANCE } from "@/lib/motion";
import { BrandIcon } from "./BrandIcon";
import { HeroIllustration } from "./HeroIllustration";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/cn";

const CONTROL_INDEX = [
  { id: "CTL-01", item: "AI inventory & exposure map", state: "Mapped" },
  { id: "CTL-02", item: "Policy, ownership & oversight", state: "Governed" },
  { id: "CTL-03", item: "Roadmap the board can fund", state: "Assured" },
] as const;

const SPOT_INTERVAL = 4000;

/**
 * Living statement hero: the underline draws itself in, the seal breathes
 * with a slow sonar pulse and a packet tracing one control line, the plate
 * tilts toward fine pointers, and the control strip spotlights one
 * engagement at a time (pausing when touched). Everything rests
 * complete under reduced motion.
 */
export function HeroSection() {
  const reduce = useReducedMotion();
  const tilt = useFinePointerTilt(reduce ?? false);
  const [spot, setSpot] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduce || hold) return;
    const id = window.setInterval(
      () => setSpot((s) => (s + 1) % CONTROL_INDEX.length),
      SPOT_INTERVAL
    );
    return () => window.clearInterval(id);
  }, [reduce, hold]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col bg-ink"
    >
      <div className="container-content grid flex-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-6 md:px-8 md:gap-12 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-36 xl:px-16">
        <div className="lg:col-span-7 xl:col-span-6">
          <motion.h1
            id="hero-heading"
            className="heading-display mb-6 max-w-2xl text-5xl font-bold leading-[1.04] text-white sm:text-6xl md:text-7xl lg:text-[4.25rem]"
            initial={reduce ? false : { y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTRANCE, delay: 0.1 }}
          >
            Adopt AI{" "}
            <span className="relative inline-block">
              securely
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.04em] h-[0.055em] bg-brass"
                style={{ transformOrigin: "left center" }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: EASE_ENTRANCE,
                  delay: 0.55,
                }}
              />
            </span>{" "}
            and responsibly.
          </motion.h1>

          <motion.p
            className="mb-10 max-w-lg text-lg leading-relaxed text-beige-muted md:text-xl"
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ENTRANCE, delay: 0.18 }}
          >
            Boutique AI advisory and cybersecurity for organizations that need
            governance as much as innovation.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: EASE_ENTRANCE, delay: 0.26 }}
          >
            <a href="#consultation" className="btn-primary group">
              Book a Consultation
              <span className="btn-icon">
                <BrandIcon
                  name="arrowUpRight"
                  weight="regular"
                  className="h-4 w-4"
                />
              </span>
            </a>
            <a href="#services" className="btn-ghost">
              View services
            </a>
            <a
              href="/assessment"
              className="font-sans text-sm font-medium text-beige-muted underline-offset-4 transition-colors duration-200 hover:text-brass-bright hover:underline active:scale-[0.97]"
            >
              Take the 10-minute check
            </a>
          </motion.div>

          <motion.div
            className="mt-12 w-full max-w-xl"
            initial={reduce ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: EASE_ENTRANCE, delay: 0.34 }}
          >
            <ul
              aria-label="Engagement control index"
              onMouseEnter={() => setHold(true)}
              onMouseLeave={() => setHold(false)}
              onFocus={() => setHold(true)}
              onBlur={() => setHold(false)}
              className="flex flex-col rounded-card border border-beige/[0.14] bg-charcoal/60 sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr]"
            >
              {CONTROL_INDEX.map((row, i) => (
                <HeroIndexCell
                  key={row.id}
                  id={row.id}
                  item={row.item}
                  state={row.state}
                  last={i === CONTROL_INDEX.length - 1}
                  spotlight={!reduce && !hold && spot === i}
                />
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:col-span-5 lg:justify-end xl:col-span-6"
          initial={reduce ? false : { scale: 0.99, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_ENTRANCE, delay: 0.2 }}
        >
          {tilt ? (
            <Tilt className="w-full max-w-md lg:max-w-lg">
              <HeroPlate />
            </Tilt>
          ) : (
            <div className="w-full max-w-md lg:max-w-lg">
              <HeroPlate />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function HeroPlate() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-card rounded-b-none border border-beige/[0.14] bg-charcoal">
        <HeroIllustration />
      </div>
      <figcaption className="grid grid-cols-3 divide-x divide-beige/[0.12] rounded-b-card border border-t-0 border-beige/[0.14] bg-charcoal font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-beige-muted">
        <span className="px-3 py-2.5">ET—A101 · Site plan</span>
        <span className="tnum px-3 py-2.5">Scale — · Rev C</span>
        <span className="px-3 py-2.5 text-brass">Assured ✓</span>
      </figcaption>
    </figure>
  );
}

function HeroIndexCell({
  id,
  item,
  state,
  last,
  spotlight,
}: {
  id: string;
  item: string;
  state: string;
  last: boolean;
  spotlight: boolean;
}) {
  return (
    <>
      <li
        className={cn(
          "rounded-media transition-colors duration-500",
          spotlight && "bg-brass/[0.08]"
        )}
      >
        <a
          href="#services"
          aria-label={`${item} — see services`}
          className="flex min-w-0 flex-col gap-2 p-4 transition-transform duration-200 active:scale-[0.98] md:p-5"
        >
          <span className="tnum font-mono text-[11px] font-medium tracking-[0.12em] text-brass">
            {id}
          </span>
          <span className="font-sans text-sm font-medium leading-snug text-white">
            {item}
          </span>
          <Badge
            variant="outline"
            className={cn(
              "mt-1 w-fit border-beige/20 font-sans text-[11px] font-semibold text-beige-muted transition-colors duration-500",
              spotlight && "border-brass/60 text-brass-bright"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full bg-brass transition-colors duration-500",
                spotlight && "bg-brass-bright"
              )}
              aria-hidden
            />
            {state}
          </Badge>
        </a>
      </li>
      {last ? null : (
        <li aria-hidden className="contents">
          <Separator
            orientation="vertical"
            className="hidden bg-beige/[0.12] sm:block"
          />
          <Separator className="bg-beige/[0.12] sm:hidden" />
        </li>
      )}
    </>
  );
}

/** Tilt toward fine pointers with spring momentum; off otherwise. */
function useFinePointerTilt(reduce: boolean) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);
  return on;
}

function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [3.5, -3.5]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-3.5, 3.5]), {
    stiffness: 140,
    damping: 18,
  });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
