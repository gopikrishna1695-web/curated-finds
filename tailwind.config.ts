import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ui-ux-pro-max "E-commerce Luxury" — premium black + gold,
        // tuned for a dark cinematic base.
        ink: {
          950: "#0C0A09", // foreground/base black (stone-950)
          900: "#1C1917", // primary surface (stone-900)
          800: "#292524", // raised surface
          700: "#44403C", // secondary (stone-700)
        },
        accent: {
          DEFAULT: "#E7C87A", // gold, brightened for dark-mode contrast
          deep: "#A16207", // WCAG-safe gold (skill's --color-accent)
          soft: "#F3E2B3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        product: "0 40px 80px -20px rgba(0,0,0,0.7)",
      },
      backdropBlur: { xs: "2px" },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glass-morph": {
          "0%, 100%": { borderRadius: "1.5rem" },
          "50%": { borderRadius: "2rem 1.25rem 2rem 1.25rem" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glass-morph": "glass-morph 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
