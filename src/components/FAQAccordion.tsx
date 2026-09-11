"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/data/content";
import { EASE_ENTRANCE } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y-2 divide-ink/10 border-y-2 border-ink/15">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-300 hover:text-purple"
              >
                <span className="font-sans text-base font-semibold text-ink md:text-lg">
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-cocoa/40 font-mono text-base font-bold leading-none text-cocoa transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0 }}
                  animate={{ height: "auto" }}
                  exit={reduce ? undefined : { height: 0 }}
                  transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 pr-12 text-base font-medium leading-relaxed text-cocoa md:text-lg">
                    {faq.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
