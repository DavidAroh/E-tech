"use client";

import type { IconName } from "@/data/content";
import { BrandIcon } from "./BrandIcon";

type IndustryPillProps = {
  name: string;
  icon?: IconName;
};

export function IndustryPill({ name, icon }: IndustryPillProps) {
  return (
    <div className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-cocoa-light/50 bg-cocoa/40 px-5 py-2.5 text-sm font-medium text-beige transition-all duration-400 ease-premium hover:border-purple-light/35 hover:text-white">
      {icon ? (
        <BrandIcon
          name={icon}
          className="h-5 w-5 shrink-0 text-purple-light"
        />
      ) : null}
      <span>{name}</span>
    </div>
  );
}
