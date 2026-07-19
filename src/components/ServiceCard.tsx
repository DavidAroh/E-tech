"use client";

import type { IconName } from "@/data/content";
import { BrandIcon } from "./BrandIcon";
import { GlassCard } from "./GlassCard";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: IconName;
};

/** Distilled card: icon, title, short description. No Learn More clutter. */
export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <GlassCard as="article">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-beige/[0.08] bg-black/30">
          <BrandIcon
            name={icon}
            className="h-5 w-5 text-beige transition-colors duration-400 group-hover:text-purple-light"
          />
        </div>
        <h3 className="heading-display mb-2 text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-beige-muted">{description}</p>
      </div>
    </GlassCard>
  );
}
