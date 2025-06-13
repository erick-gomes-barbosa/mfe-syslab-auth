export default {
  files: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        aristotelica: ['"Aristotelica Demibold"', "sans-serif"],
        aristotelicaRegular: ['"Aristotelica Demibold Regular"', "sans-serif"],
        aristotelicaSmallCaps: [
          '"Aristotelica SmallCaps-Regular"',
          "sans-serif",
        ],
      },
      colors: {
        blueLight: "#EAE7F7",
        blueMedium: "#2C5B8C",
        grayLight: "#F0F4F8",
        grayPrimary: "#D1D1D1",
        grayMedium: "#555555",
        grayDark: "#333333",
      },
      width: {
        "80%": "80%",
        "90%": "90%",
      },
    },
  },
  plugins: [],
};
