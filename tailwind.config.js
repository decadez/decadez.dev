module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ['"Jost"', "sans-serif"],
    },
    extend: {
      colors: {
        bglight: "#F9FAFB",
        marrslight: "#BFC8F8",
        marrsgreen: "#8F79D9",
        marrsdark: "#4A416A",
        bloglavender: "#E3C9FA",
        blogperiwinkle: "#BFC8F8",
        blogmist: "#DCEBFA",
        blogice: "#F4F8FC",
        blogink: "#4A416A",
        blogviolet: "#8F79D9",
        blogdark: "#1C1930",
        blogcarddark: "#26233B",
        cardlight: "#EFF3F3",

        // bgdark: "#2D2D2D",
        bgdark: "#1D2A35",
        carrilight: "#DCEBFA",
        carrigreen: "#E3C9FA",
        carridark: "#BFC8F8",
        // carddark: "#383838",
        carddark: "#22323F",
        textlight: "#F9FAFB",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
