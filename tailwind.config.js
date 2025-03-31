/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#4f46e5",  
          light: "#f7f9fc",
          softgray: "#e5e7eb",
        },
        borderRadius: {
          xl: "1rem",
          '2xl': "1.25rem",
        },
        fontFamily: {
          sans: ["'Segoe UI'", "sans-serif"],
        },
      },
    },
    plugins: [],
  }
  