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
      },

      textColor: {
        901: "#272A2F",
        902: "#28805E",
      },

      gridTemplateColumns: {
        21: "repeat(auto-fit, minmax(75px, 1fr))",
      },

      screens: {
        mxl: { max: "1366px" },
        // => @media (max-width: 1279px) { ... }
      },
    },
  },
  plugins: [],
};
