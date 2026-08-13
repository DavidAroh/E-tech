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
            stroke="url(#shieldGrad)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner shield fill */}
          <path
            d="M18 5 L29 11 V22 C29 28.5 24 34 18 36.5 C12 34 7 28.5 7 22 V11 Z"
            fill="url(#shieldFill)"
            opacity="0.35"
          />
          {/* Central blade / sword */}
          <path
            d="M18 6 L20 14 L18 34 L16 14 Z"
            fill="url(#bladeGrad)"
            opacity="0.9"
          />
          {/* Blade tip highlight */}
          <path
            d="M18 6 L19 10 L18 14 L17 10 Z"
            fill="#FAFAF8"
            opacity="0.6"
          />
          {/* Horizontal guard */}
          <path
            d="M12 14 L24 14"
            stroke="url(#guardGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Guard diamond accents */}
          <path d="M11 14 L12 13 L13 14 L12 15 Z" fill="#CFB093" opacity="0.7" />
          <path d="M23 14 L24 13 L25 14 L24 15 Z" fill="#CFB093" opacity="0.7" />
          <defs>
            <linearGradient id="shieldGrad" x1="4" y1="2" x2="32" y2="39">
              <stop offset="0%" stopColor="#CFB093" />
              <stop offset="100%" stopColor="#6E4B2D" />
            </linearGradient>
            <linearGradient id="shieldFill" x1="18" y1="5" x2="18" y2="36.5">
              <stop offset="0%" stopColor="#745133" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3D2819" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="bladeGrad" x1="18" y1="6" x2="18" y2="34">
              <stop offset="0%" stopColor="#DEBFA2" />
              <stop offset="40%" stopColor="#CFB093" />
              <stop offset="100%" stopColor="#6E4B2D" />
            </linearGradient>
            <linearGradient id="guardGrad" x1="12" y1="14" x2="24" y2="14">
              <stop offset="0%" stopColor="#6E4B2D" />
              <stop offset="50%" stopColor="#DEBFA2" />
              <stop offset="100%" stopColor="#6E4B2D" />
            </linearGradient>
          </defs>
        </svg>
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-[0.08em] text-white">
            E-TECH
          </span>
          <span className="mt-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-beige-muted/70">
            Etela Technologies
          </span>
        </span>
      )}
    </Link>
  );
}
