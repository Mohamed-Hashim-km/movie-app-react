/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors:{
        "goldencolor":"#ffd700",
        "red":"#ff0033",
        "gray":"#13151b",
        "wt":"#d9d9d9"
      }
      
    },
  },
  plugins: [],
}

