/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0b0c1c',      // nền tối (navy/black)
        secondary: '#1a1f3b',    // panel, card
        accent: '#4b2323ff',       // highlight, viền
        text: '#e0e0e0',         // text chính sáng trên nền tối
        textAccent: '#4a90e2',   // text nhấn
      },
    },
  },
  plugins: [],
};
