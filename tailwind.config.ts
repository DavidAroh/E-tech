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
        black: "#0B0B0D",
        cocoa: {
          DEFAULT: "#2E1F1A",
          light: "#4A362C",
        },
        beige: {
          DEFAULT: "#EFE6D3",
          muted: "#C9BFA9",
        },
        white: "#FAFAF8",
        purple: {
          DEFAULT: "#4B2E83",
          light: "#9B7AE8", // AA-safe on black for small labels (~4.7:1)
          mid: "#7C4FD1",
          dim: "#2E1B52",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        shell: "2rem",
        core: "calc(2rem - 0.375rem)",
        card: "1.25rem",
        control: "9999px",
        media: "1.75rem",
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
