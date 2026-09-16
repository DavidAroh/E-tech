"use client";

import { motion, useReducedMotion } from "framer-motion";

const NODES: { cx: number; cy: number; id: string }[] = [
  { cx: 96, cy: 128, id: "CTL-01" },
  { cx: 240, cy: 84, id: "CTL-02" },
  { cx: 384, cy: 128, id: "CTL-03" },
  { cx: 120, cy: 352, id: "CTL-04" },
  { cx: 240, cy: 396, id: "CTL-05" },
  { cx: 360, cy: 352, id: "CTL-06" },
];

/**
 * Assurance control-map: six engagement nodes traced to one seal,
 * drawn in flat hairline linework on the sheet. The trace draws in
 * once under grid constraint — the page's single authored moment.
 */
export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-square w-full overflow-hidden bg-charcoal"
      role="img"
      aria-label="Assurance drawing: six engagement control nodes traced to a single verified seal"
    >
      <svg
        viewBox="0 0 480 480"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Border frame + corner ticks */}
        <rect
          x="16.5"
          y="16.5"
          width="447"
          height="447"
          stroke="#D7E0EC"
          strokeOpacity="0.28"
        />
        {[
          [16, 16],
          [464, 16],
          [16, 464],
          [464, 464],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} stroke="#00B8FF" strokeWidth="2">
            <line x1={x} y1={y} x2={x + (x < 240 ? 18 : -18)} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + (y < 240 ? 18 : -18)} />
          </g>
        ))}

        {/* Traces: every node to the seal */}
        <g stroke="#9AA4B8" strokeOpacity="0.5" strokeWidth="1">
          <line x1="96" y1="128" x2="240" y2="240" />
          <line x1="240" y1="84" x2="240" y2="240" />
          <line x1="384" y1="128" x2="240" y2="240" />
          <line x1="120" y1="352" x2="240" y2="240" />
          <line x1="240" y1="396" x2="240" y2="240" />
          <line x1="360" y1="352" x2="240" y2="240" />
        </g>

        {/* Seal rings */}
        <circle
          cx="240"
          cy="240"
          r="86"
          stroke="#D7E0EC"
          strokeOpacity="0.35"
          strokeDasharray="3 7"
        />
        <motion.circle
          cx="240"
          cy="240"
          r="64"
          stroke="#00B8FF"
          strokeWidth="1.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />

        {/* Seal check */}
        <motion.path
          d="M218 240 L236 258 L264 224"
          stroke="#33CCFF"
          strokeWidth="3"
          strokeLinecap="square"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        />

        {/* Sonar — slow assurance pulse from the seal */}
        <motion.circle
          cx="240"
          cy="240"
          r="64"
          stroke="#00B8FF"
          strokeWidth="1"
          fill="none"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={reduce ? false : { scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 3, ease: "easeOut", repeat: Infinity, delay: 1.6 }}
        />

        {/* Traveler — a packet tracing the CTL-01 control line */}
        <motion.circle
          r="3.5"
          fill="#33CCFF"
          initial={reduce ? false : { attrX: 240, attrY: 240, opacity: 0 }}
          animate={{ attrX: [240, 96, 240], attrY: [240, 128, 240], opacity: 1 }}
          transition={{
            duration: 4.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1.4,
          }}
        />

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={n.id}>
            <motion.rect
              x={n.cx - 7}
              y={n.cy - 7}
              width="14"
              height="14"
              fill="#0B1220"
              stroke={i === 1 ? "#00B8FF" : "#9AA4B8"}
              strokeWidth="1.25"
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r="2"
              fill={i === 1 ? "#00B8FF" : "#D7E0EC"}
              opacity="0.9"
            />
          </g>
        ))}

        {/* Revision tag */}
        <g fontFamily="monospace" fontSize="11" letterSpacing="2">
          <text x="34" y="446" fill="#9AA4B8" opacity="0.85">
            ET—A101
          </text>
          <text x="372" y="446" fill="#00B8FF" opacity="0.95">
            REV C
          </text>
        </g>
      </svg>
    </div>
  );
}
