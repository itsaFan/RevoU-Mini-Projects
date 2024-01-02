/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-navy": "#006CBE",
        "custom-gray": "#3C4245",
        "dark-navy": "#0C2B64",
        "main-dark": "#16161a",
        "sub-dark": "#242629",
      },
      height: {
        "19/20": "95%",
        "120vh": "120vh",
        "80vh" : "80vh",
        "200vh": "200vh"
      },
      width: {
        86: "21.5rem",
        92: "23rem",
        128: "32rem",
        150: "37.5rem",
        175: "43.75rem",
        200: "50rem",
        232: "58rem",
        248: "62rem",
      },
      backgroundColor: {
        "dark-navy": "#0C2B64",
        "secondary-navy": "#274375",
        "light-navy": "#006CBE",
        "light-theme": "#F1F8FE",
        "main-dark": "#16161a",
        "sub-dark": "#242629",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")({ nocompatible: true })],
  variants: {
    scrollbar: ["rounded"],
  },
};
