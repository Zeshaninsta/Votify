/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins", "san-serif"],
        "teko": ["Teko", "san-serif"],
        "roboto": ["Roboto", "san-serif"],
        "rubik": ["Rubik", "san-serif"],
        "sedan": ["Sedan SC", "san-serif"],
        "pro": ["Protest Strike", "san-serif"]
      },
    },
  },
  plugins: [],
}