/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#41ff41"
      },
      fontFamily:{
        inter:"Inter"
      }
    },
  },
  plugins: [],
}
