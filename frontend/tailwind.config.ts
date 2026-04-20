import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:       { DEFAULT: "#FBF6EF", 100: "#F5EDE2" },
        lavender:    { 100: "#E8DBFA", 200: "#D8C9F7", 300: "#C9B8F5",
                       400: "#B7A2F0", 500: "#8E76E0", 600: "#7B5FCF" },
        blush:       { 100: "#FCE6EE", 200: "#F7C8D9", 300: "#F4B0C7",
                       400: "#E48BAC", 500: "#C9577A" },
        nude:        { 100: "#F5E6D8", 200: "#ECD9C2", 300: "#D6BC9A" },
        plum:        { DEFAULT: "#2A1B3D", soft: "#4A3560", ink: "#1B0F2B" },
        magenta:     "#E8508D",
        mint:        "#C4E8D0",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft:  "0 18px 40px -18px rgba(123,95,207,0.4)",
        glow:  "0 30px 60px -25px rgba(232,80,141,0.35)",
        ink:   "0 10px 30px -12px rgba(27,15,43,0.5)",
      },
      backdropBlur: { xs: "4px" },
      keyframes: {
        drift:  {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%":      { transform: "translate(40px,-30px) scale(1.08)" },
        },
        float:  {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%":      { transform: "translateY(-10px) rotate(3deg)" },
        },
        scroll: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 8px rgba(232,80,141,0.15)" },
          "50%":      { boxShadow: "0 0 0 14px rgba(232,80,141,0.05)" },
        },
      },
      animation: {
        drift:     "drift 22s ease-in-out infinite",
        float:     "float 4s ease-in-out infinite",
        scroll:    "scroll 28s linear infinite",
        pulseRing: "pulseRing 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
