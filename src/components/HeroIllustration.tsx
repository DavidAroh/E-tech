"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Abstract generative pattern: interlocking nodes + shield motif
 * in low-opacity purple/beige linework.
 */
export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-square w-full overflow-hidden bg-black/50"
      role="img"
      aria-label="Abstract network of interconnected nodes and a shield motif representing secure AI systems"
    >
      <svg
        viewBox="0 0 480 480"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#745133" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineBeige" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DEBFA2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#CFB093" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="linePurple" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFB093" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#DEBFA2" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <rect width="480" height="480" fill="url(#glow)" />

        <g stroke="url(#lineBeige)" strokeWidth="0.7" opacity="0.45">
          {[80, 140, 200, 260, 320, 380].map((v) => (
            <g key={v}>
              <line x1={v} y1="40" x2={v} y2="440" />
              <line x1="40" y1={v} x2="440" y2={v} />
            </g>
          ))}
        </g>

        <g stroke="url(#linePurple)" strokeWidth="1" opacity="0.75">
          <path d="M90 120 C160 80, 220 160, 280 110" />
          <path d="M120 320 C180 280, 240 360, 340 300" />
          <path d="M80 240 C160 200, 200 280, 360 220" />
          <path d="M200 80 C260 140, 300 100, 400 160" />
          <path d="M140 400 C220 340, 300 400, 400 360" />
        </g>

        <motion.path
          d="M240 100 L320 140 V230 C320 290 280 340 240 360 C200 340 160 290 160 230 V140 Z"
          stroke="#CFB093"
          strokeWidth="1.4"
          fill="rgba(61, 40, 25, 0.28)"
          opacity="0.9"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        />

        <path
          d="M240 150 L290 175 V230 C290 270 265 300 240 315 C215 300 190 270 190 230 V175 Z"
          stroke="#DEBFA2"
          strokeWidth="0.75"
          fill="none"
          opacity="0.32"
        />

        {[
          [90, 120],
          [280, 110],
          [400, 160],
          [360, 220],
          [340, 300],
          [400, 360],
          [140, 400],
          [80, 240],
          [120, 320],
          [200, 80],
          [240, 240],
          [180, 180],
          [300, 280],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={i === 10 ? 5 : 3.2}
            fill={i % 2 === 0 ? "#CFB093" : "#DEBFA2"}
            opacity={0.55}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.35 + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        <circle
          cx="240"
          cy="240"
          r="170"
          stroke="#DEBFA2"
          strokeWidth="0.5"
          opacity="0.1"
          strokeDasharray="4 8"
        />
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 38%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
