import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customblue: "#4BB4FF",
        custompink: "#FF30F8",
        customlightblue: "#E3F3FF",
        transparentblack: "rgba(0, 0, 0, 0.1)",
        transparentforeground: "rgba(255, 207, 253, 0.1)",
      },
      boxShadow: {
        "3xl": "0 0 50px 15px #FF30F844, 0 0 50px 30px #4BB4FF44",
      },
    },
  },
  plugins: [],
} satisfies Config;
