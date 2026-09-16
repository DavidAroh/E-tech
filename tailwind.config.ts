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
        black: "#070B14",
        ink: "#070B14",
        inksoft: "#3D4A61",
        charcoal: "#0B1220",
        cocoa: {
          DEFAULT: "#0B1220",
          light: "#334155",
          deep: "#070B14",
        },
        /* Deep-navy rhythm: navy → slate → light */
        caramel: {
          DEFAULT: "#101D33",
          deep: "#1A2B4A",
        },
        peach: {
          DEFAULT: "#DDF2FF",
          bright: "#00B8FF",
        },
        beige: {
          DEFAULT: "#D7E0EC",
          muted: "#9AA4B8",
        },
        white: "#F4F7FB",
        paper: "#F7FAFC",
        brass: {
          DEFAULT: "#00B8FF",
          bright: "#33CCFF",
          deep: "#0077B6",
        },
        purple: {
          DEFAULT: "#6C63FF",
          light: "#8B85FF",
          mid: "#5A52D6",
          dim: "#23224F",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        shell: "0.75rem",
        core: "0.5rem",
        card: "0.375rem",
        media: "0.25rem",
        control: "0.125rem",
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
          "inset 0 1px 1px rgba(255,255,255,0.55), 0 20px 40px -20px rgba(7,11,20,0.18)",
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
