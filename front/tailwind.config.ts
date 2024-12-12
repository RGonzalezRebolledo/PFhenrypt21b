import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Cormorant Garamond", "serif"],
        secondary: ["Lora", "serif"],
      },
      colors: {
        grisOscuro: "#181818",
        grisClaro: "#acacac",
        mostaza: "#C19D68",
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
