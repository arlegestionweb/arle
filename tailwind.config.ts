import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '450px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        mx: "1280px",
      },
      width: {
        mx: "1280px",
      },
      colors: {
        background: "var(--background)",
        "color-bg-surface-1-default": "#ffffff",
        "color-bg-surface-0-default": "#f5f5f5",
        beige: "#EDE7DE",
        "arle-blue": "#101432",
        "arle-beige": "#CBBBA0",
      },
      fontFamily: {
        crimson: "var(--crimson-pro)",
        tajawal: "var(--font-tajawal)",
        inter: "var(--font-inter)",
        kanit: "var(--font-kanit)",
        raleway: "var(--font-raleway)",
        jomolhari: "var(--font-jomolhari)",
        play: "var(--font-play)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        // slide in from right
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // slide out from right
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        // fade in
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.4" },
        },
        // fade out
        "fade-out": {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.2s ease-out",
        "slide-out": "slide-out 0.2s ease-out",
        "slide-out-right": "slide-out-right 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
