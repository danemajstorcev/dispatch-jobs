import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0fdf9",
          100: "#ccfbee",
          200: "#99f5dd",
          300: "#5ce8c5",
          400: "#2dd4aa",
          500: "#10b98a",
          600: "#059670",
          700: "#047858",
          800: "#065f47",
          900: "#064e3b",
        },
        slate: {
          950: "#0a0f1a",
        }
      },
    },
  },
  plugins: [],
};
export default config;
