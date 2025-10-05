// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ebedfe",
          100: "#d6d9fd",
          200: "#adb3fb",
          300: "#848cfa",
          400: "#6b76f8",
          500: "#5661f6",
          600: "#4c57dd",
          700: "#414ac3",
          800: "#373e9a",
          900: "#2c3170",
        },
      },
    },
  },
};
