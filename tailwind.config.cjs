/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2766c5",
      },
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
