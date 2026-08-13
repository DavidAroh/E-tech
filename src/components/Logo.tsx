import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  onClick?: () => void;
  compact?: boolean;
};

export function Logo({ className, onClick, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Etela Technologies home"
    >
      <span
        className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-beige/12 bg-purple-dim/50"
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
          <path
            d="M16 4 L24 8.5 V16.5 C24 21.5 20.5 25.5 16 27.5 C11.5 25.5 8 21.5 8 16.5 V8.5 Z"
            stroke="#DEBFA2"
            strokeWidth="1.25"
            fill="rgba(116,81,51,0.35)"
          />
          <circle cx="16" cy="16" r="1.75" fill="#CFB093" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-white">
          Etela
        </span>
        {!compact ? (
          <span className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-beige-muted">
            Technologies
          </span>
        ) : (
          <span className="mt-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-beige-muted">
            Technologies
          </span>
        )}
      </span>
    </Link>
  );
}
