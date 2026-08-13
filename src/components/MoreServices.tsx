"use client";

import { useState } from "react";
import { secondaryServices, services } from "@/data/content";
import { BrandIcon } from "./BrandIcon";

/**
 * Progressive disclosure for the full service catalog.
 * Titles only: no card grid, no decorative icons wall.
 * Styled for the light "worksheet" Services surface.
 */
export function MoreServices() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 border-t border-cocoa/15 pt-10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex min-h-11 items-center gap-2 font-sans text-sm font-medium text-cocoa transition-colors duration-300 hover:text-purple"
        aria-expanded={open}
        aria-controls="more-services-list"
      >
        {open
          ? "Hide additional capabilities"
          : `View all ${services.length} capabilities (${secondaryServices.length} more)`}
        <BrandIcon
          name="caretDown"
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          id="more-services-list"
          className="mt-6 columns-1 gap-x-10 sm:columns-2 lg:columns-3"
        >
          {secondaryServices.map((service) => (
            <li
              key={service.slug}
              className="mb-3 break-inside-avoid border-b border-cocoa/10 pb-3 font-sans text-sm text-cocoa/75"
            >
              <span className="font-medium text-cocoa">{service.title}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}