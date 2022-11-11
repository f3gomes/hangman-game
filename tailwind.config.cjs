/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        901: "#272A2F",
        902: "#C5D9E5",
        903: "#D9D9D9",
        904: "#C5D9E5",
        905: "#445FA5",
        906: "#2C2F3E",
      },

      textColor: {
        901: "#272A2F",
        902: "#28805E",
        903: "#2C2F3E",
      },

      gridTemplateColumns: {
        21: "repeat(auto-fit, minmax(75px, 1fr))",
      },

      screens: {
        mxl: { min: "1366px" },
        // => @media (max-width: 1279px) { ... }

        mxl2: { min: "1520px" },

        mxl3: { min: "2133px" },
      },
    },
  },
  plugins: [],
};