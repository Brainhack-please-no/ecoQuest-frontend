const colors = require("./src/ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        satoshiLight: ["Satoshi-Light"],
        satoshi: ["Satoshi-Regular"],
        satoshiMedium: ["Satoshi-Medium"],
        satoshiBold: ["Satoshi-Bold"],
        clashRegular: ["ClashDisplay-Regular"],
        clashMedium: ["ClashDisplay-Medium"],
        clashSemiBold: ["ClashDisplay-SemiBold"],
        clashBold: ["ClashDisplay-Bold"],
      },
      colors,
    },
  },
  plugins: [],
};
