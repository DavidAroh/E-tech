"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, services } from "@/data/content";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { EASE_ENTRANCE } from "@/lib/motion";
import { BrandIcon } from "./BrandIcon";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

const searchable = [
  ...navLinks.map((l) => ({ label: l.label, href: l.href, group: "Pages" })),
  ...services.slice(0, 8).map((s) => ({
    label: s.title,
    href: "#services",
    group: "Services",
  })),
  { label: "Book a Consultation", href: "#consultation", group: "Actions" },
  { label: "FAQ", href: "#faq", group: "Pages" },
];

export function SearchModal({ open, onClose }: SearchModalProps) {
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const listId = useId();
  const titleId = useId();

  const handleClose = useCallback(() => onClose(), [onClose]);
  useFocusTrap(open, panelRef, handleClose);

  const normalized = query.toLowerCase().trim();
  const results = searchable.filter((item) =>
    item.label.toLowerCase().includes(normalized)
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-modal flex items-start justify-center px-4 pt-[12vh]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label="Close search"
            tabIndex={-1}
            onClick={handleClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg overflow-hidden rounded-card border border-beige/15 bg-black"
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: 6 }}
            transition={{ duration: 0.3, ease: EASE_ENTRANCE }}
          >
            <p id={titleId} className="sr-only">
              Site search
            </p>
            <div className="flex items-center gap-3 border-b border-beige/10 px-4 py-3.5">
              <BrandIcon name="search" className="h-5 w-5 shrink-0 text-beige-muted" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value.slice(0, 80))}
                placeholder="Search pages and services…"
                className="min-w-0 flex-1 bg-transparent font-sans text-sm text-white placeholder:text-beige-muted/90 focus:outline-none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-controls={listId}
                aria-autocomplete="list"
              />
              <button
                type="button"
                onClick={handleClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-media border border-beige/10 text-beige-muted transition-colors hover:text-white"
                aria-label="Close search"
              >
                <BrandIcon name="x" className="h-4 w-4" />
              </button>
            </div>
            <ul
              id={listId}
              className="max-h-72 overflow-y-auto py-2"
              role="listbox"
              aria-label="Search results"
            >
              {results.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-beige-muted" role="option" aria-selected={false}>
                  No matches for &ldquo;
                  <span className="break-all">{query.slice(0, 40)}</span>
                  &rdquo;.
                </li>
              ) : (
                results.map((item) => (
                  <li
                    key={`${item.group}-${item.label}`}
                    role="option"
                    aria-selected={false}
                  >
                    <a
                      href={item.href}
                      onClick={handleClose}
                      className="flex min-h-11 items-center justify-between gap-3 px-4 py-3 text-sm text-beige transition-colors hover:bg-beige/[0.04] hover:text-white"
                    >
                      <span className="min-w-0 break-words">{item.label}</span>
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-beige-muted">
                        {item.group}
                      </span>
                    </a>
                  </li>
                ))
              )}
            </ul>
            <p className="border-t border-beige/10 px-4 py-2.5 text-[11px] text-beige-muted">
              Esc to close · Ctrl/Cmd+K to open
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
