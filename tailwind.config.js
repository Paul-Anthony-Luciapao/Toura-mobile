/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#FBEDE8",
          100: "#F6D8CC",
          200: "#EDB29E",
          300: "#E48B70",
          400: "#E07856",
          500: "#C9613E",
          600: "#A14E32",
          700: "#7A3B26",
        },
        cream: {
          DEFAULT: "#F5EBD8",
          200: "#F0D9A8",
          300: "#E8CC8B",
        },
        ink: {
          DEFAULT: "#1B1F1E",
          soft: "#2A2F2E",
          600: "#4A4F4D",
          500: "#6B716E",
          400: "#9AA09C",
          100: "#E8E8E4",
        },
      },
    },
  },
  plugins: [],
};
