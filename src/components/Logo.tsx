import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  onClick?: () => void;
  compact?: boolean;
};

/**
 * Shield + blade mark with "E-TECH" wordmark.
 * Compact mode drops the wordmark for tight nav spaces.
 */
export function Logo({ className, onClick, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-1.5", className)}
      aria-label="Etela Technologies home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center" aria-hidden>
        <svg viewBox="0 0 36 40" className="h-full w-full" fill="none">
          {/* Shield outline */}
          <path
            d="M18 2 L32 9 V22 C32 30 26 36 18 39 C10 36 4 30 4 22 V9 Z"
            stroke="#00B8FF"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner shield fill */}
          <path
            d="M18 5 L29 11 V22 C29 28.5 24 34 18 36.5 C12 34 7 28.5 7 22 V11 Z"
            fill="#0077B6"
            opacity="0.35"
          />
          {/* Central blade / sword */}
          <path
            d="M18 6 L20 14 L18 34 L16 14 Z"
            fill="#00B8FF"
            opacity="0.9"
          />
          {/* Blade tip highlight */}
          <path
            d="M18 6 L19 10 L18 14 L17 10 Z"
            fill="#F4F7FB"
            opacity="0.6"
          />
          {/* Horizontal guard */}
          <path
            d="M12 14 L24 14"
            stroke="#F4F7FB"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Guard diamond accents */}
          <path d="M11 14 L12 13 L13 14 L12 15 Z" fill="#00B8FF" opacity="0.9" />
          <path d="M23 14 L24 13 L25 14 L24 15 Z" fill="#00B8FF" opacity="0.9" />
        </svg>
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[16px] font-extrabold tracking-[0.06em] text-white">
            E-TECH
          </span>
          <span className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            Etela Technologies
          </span>
          <span className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-peach-bright">
            AI Advisory and Cybersecurity
          </span>
        </span>
      )}
    </Link>
  );
}
