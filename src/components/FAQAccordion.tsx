"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/data/content";
import { EASE_ENTRANCE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { BrandIcon } from "./BrandIcon";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl divide-y divide-cocoa-light/40 border-y border-cocoa-light/40">
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
                className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-400 hover:text-white"
              >
                <span className="font-sans text-base font-medium text-beige md:text-lg">
                  {faq.question}
                </span>
                <BrandIcon
                  name="caretDown"
                  className={cn(
                    "h-5 w-5 shrink-0 text-purple-light transition-transform duration-400",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-6 pr-10 text-sm leading-relaxed text-beige-muted md:text-base">
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
