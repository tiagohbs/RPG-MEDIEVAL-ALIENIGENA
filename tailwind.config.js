/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-darkBlue': '#0B1120',
        'cosmic-purple': '#6B46C1',
        'cosmic-gold': '#F6E05E',
        'alien-glow': '#00FF9D',
        'alien-crystal': '#4FD1C5',
        'alien-energy': '#805AD5',
      },
      fontFamily: {
        'medieval': ['MedievalSharp', 'cursive'],
        'tech': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}