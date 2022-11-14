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
        907: "#E35B5B",
      },

      textColor: {
        901: "#272A2F",
        902: "#28805E",
        903: "#2C2F3E",
        904: "#44A580",
      },

      width: {
        909: "700px",
      },

      margin: {
        800: "800px",
      },

      gridTemplateColumns: {
        21: "repeat(auto-fit, minmax(75px, 1fr))",
      },

      screens: {
        mxl: { min: "1366px" },

        mxl2: { min: "1520px" },

        mxl3: { min: "2133px" },

        msl: { max: "800px" },
      },
    },
  },
  plugins: [],
};
