/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#41ff41",
        darkBlack:"#0E0E10"
      },
      fontFamily:{
        inter:"Inter"
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
