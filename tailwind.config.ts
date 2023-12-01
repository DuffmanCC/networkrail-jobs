import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "brand-red": "#ED553B",
        "brand-yellow": "#F6D55C",
        "brand-blue": "#20639B",
        "brand-dark-blue": "#173F5F",
        "brand-green": "#3CAEA3",
        "brand-purple": "#9E5B9A",
      },
      zIndex: {
        "60": "60",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
