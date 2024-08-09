/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#31708E",
        secondary: "#5085A5",
        accent: "#8FC1E3",
        neutral: "#687864",
        background: "#F7F9FB",
      },
    },
  },
  plugins: [],
};

