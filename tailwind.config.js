const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Chivo", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xl: "1800px",
      },
    },
  },
  plugins: [],
};
