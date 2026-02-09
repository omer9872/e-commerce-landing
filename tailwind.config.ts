import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E86D00",
        secondary: "#6b7280",

        "light-bg": "#ffffff",
        "light-card-bg": "#F5F5F5",
        "dark-bg": "#000000",
        "dark-card-bg": "#0A0A0A",

        "light-text": "#1f1f1f",
        "dark-text": "#f5f5f5",
        "light-border": "#e0e0e0",
        "dark-border": "#3f3f3f",
        "light-primary": "#FDB813",
        "dark-primary": "#F7931E",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // This disables Tailwind's reset styles which can interfere with Ant Design
  },
} satisfies Config;

export default config;
