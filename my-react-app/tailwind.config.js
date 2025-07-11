/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {

        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#38bdf8",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
