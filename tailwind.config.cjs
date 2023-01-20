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

      borderRadius: {
        "4xl": "50px",
      },

      height: {
        910: "420px",
        911: "460px",
        912: "830px",
        913: "93%",
        914: "96%",
      },

      width: {
        909: "700px",
        910: "720px",
        911: "567px",
      },

      margin: {
        800: "800px",
      },

      spacing: {
        "29": "115px",
        "30": "103px",
      },

      gridTemplateColumns: {
        21: "repeat(auto-fit, minmax(75px, 1fr))",
      },

      screens: {
        mxl: { min: "1366px" },

        mxl2: { min: "1520px" },

        mxl3: { min: "1919px" },

        msl: { max: "800px" },

        tall: { raw: "(max-height: 720px)" },
      },
    },
  },
  plugins: [],
};
