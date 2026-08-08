import type { Config } from "tailwindcss";

// Brand tokens per CLAUDE.md §11. Confirm final brand with Christopher before public launch.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#F2F5F9",
          100: "#E1E8F1",
          700: "#16375F",
          800: "#0F2A4A",
          900: "#0B1F3A",
        },
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E3CFA5",
          dark: "#A88849",
        },
        emerald: {
          DEFAULT: "#0F7B5F",
        },
        surface: {
          DEFAULT: "#FBFAF7",
          alt: "#F4F1EA",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
