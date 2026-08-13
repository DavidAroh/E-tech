import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0C0A08",
        ink: "#0C0A08",
        charcoal: "#1A1614",
        cocoa: {
          DEFAULT: "#6E4B2D",
          light: "#745133",
          deep: "#5A3D25",
        },
        beige: {
          DEFAULT: "#DEBFA2",
          muted: "#E0C1A4",
        },
        white: "#FAFAF8",
        paper: "#F1E9DA",
        purple: {
          DEFAULT: "#745133",
          light: "#CFB093",
          mid: "#6E4B2D",
          dim: "#3D2819",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        shell: "1.5rem",
        core: "1.25rem",
        card: "0.75rem",
        media: "0.5rem",
        control: "0.375rem",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
        premium: "cubic-bezier(0.32, 0.72, 0, 1)",
        interactive: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        700: "700ms",
      },
      boxShadow: {
        bezel:
          "inset 0 1px 1px rgba(255,255,255,0.08), 0 24px 48px -24px rgba(0,0,0,0.55)",
        "bezel-light":
          "inset 0 1px 1px rgba(255,255,255,0.55), 0 20px 40px -20px rgba(46,31,26,0.18)",
        island:
          "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      zIndex: {
        grain: "40",
        sticky: "50",
        overlay: "60",
        modal: "70",
        toast: "80",
        loader: "90",
      },
    },
  },
  plugins: [],
};

export default config;
