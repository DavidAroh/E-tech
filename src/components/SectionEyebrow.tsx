import { cn } from "@/lib/cn";

type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

/** Pill badge kicker — use sparingly (≤1 per ~3 sections) */
export function SectionEyebrow({
  children,
  className,
  tone = "dark",
}: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em]",
        tone === "dark"
          ? "border border-beige/10 bg-beige/[0.04] text-purple-light"
          : "border border-cocoa/10 bg-cocoa/[0.04] text-purple",
        className
      )}
    >
      {children}
    </span>
  );
}
