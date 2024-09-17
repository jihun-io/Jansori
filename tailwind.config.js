/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        supernova: {
          50: "#fffee7",
          100: "#fffdc1",
          200: "#fff686",
          300: "#ffe941",
          400: "#ffd80d",
          500: "#ffc800",
          600: "#d19200",
          700: "#a66802",
          800: "#89510a",
          900: "#74420f",
          950: "#442204",
        },
        armadillo: {
          50: "#f5f4f0",
          100: "#e8e5df",
          200: "#d3cec3",
          300: "#b8b19e",
          400: "#9e957d",
          500: "#817961",
          600: "#66604a",
          700: "#4f4b3c",
          800: "#3f3c31",
          900: "#39372e",
          950: "#1d1b16",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
