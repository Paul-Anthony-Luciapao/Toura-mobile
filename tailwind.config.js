/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
=======
>>>>>>> 5b3a312 (updated itinerary page)
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: "#ffffff",
        surfaceSoft: "#eaf5f2",
        surfaceMuted: "#e2e8f0",
        primary: {
          DEFAULT: "#0f766e",
          dark: "#115e59",
        },
        textSecondary: "#a0a0b0",
        textMain: "#0f172a",
        textSoft: "#334155",
        textMuted: "#64748b",
        border: "#e2e8f0",
        warning: {
          DEFAULT: "#f59e0b",
          soft: "#fff7ed",
        },
        accent: "#c2410c",
        heroOverlayTop: "rgba(15, 94, 140, 0.55)",
        heroOverlayBottom: "rgba(11, 46, 74, 0.75)",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
