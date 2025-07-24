import { nextui } from "@nextui-org/react";
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "sans-serif"],
    },
    colors: {
      light: "#F3F3F3",
      background: "#F3F3F3",
      gray1: {
        100: "#FDF7FD",
        200: "#CCCCCC",
        300: "#E4E3E3",
        400: "#D1D1D1",
      },
      primary: "#1074FD",
      effect: "#E2C8C4",
      primaryColor: {
        100: "#000C2F",
        200: "#6ACB0F",
        300: "#69A34E",
        400: "#41A92B",
      },

      dark: "#231834",
      text_color: "#19191D",
      secondary: {
        200: "#333",
        300: "#777",
        400: "#242424",
        500: "#848484",
        600: "#BFBFBF",
        700: "#E4E4E4",
        800: "#BDBDBD",
      },
      orange: "#FB5646",
      btnColor: {
        100: "#1074FD",
        200: "#FFFFFF0D",
        300: "#21212133",
      },
    },
    animation: {
      "spin-slow": "spin 8s linear infinite",
    },
    backgroundImage: {
      "custom-gradient":
        "linear-gradient(86.93deg, #101828 0.18%, #233250 99.39%)",
    },
  },
  screens: {
    xs: "400px",
    slg: "999px", // @media (min-width: 999pxs
    xmd: "800px", // @media (min-width: 800px)
    ...require("tailwindcss/defaultTheme").screens,
  },
};
export const plugins = [nextui()];
