export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueLight: "#EAE7F7",
        blueMedium: "#2C5B8C",
        grayLight: "#F0F4F8",
        grayPrimary: "#D1D1D1",
        grayMedium: "#555555",
        grayDark: "#333333",
        sucessSecond: "#28A745",
        dangerPrimary: "#DC3545",
        attentionPrimary: "#FFC107",
        orangeLight: "#FFBE98",
      },
      screens: {
        sm320: "320px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
