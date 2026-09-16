import * as React from "react";
import { cn } from "@/lib/cn";

const badgeVariants = {
  default: "bg-brass text-ink",
  secondary: "border border-purple/40 bg-purple/10 text-ink",
  outline: "border border-ink/20 bg-transparent text-ink",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-control px-2.5 py-1 font-sans text-xs font-semibold tracking-wide transition-colors duration-200",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
