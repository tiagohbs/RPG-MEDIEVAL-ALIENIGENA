/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-darkBlue': '#1a1b4b',
        'cosmic-purple': '#6b46c1',
        'cosmic-gold': '#f6e05e',
        'alien-glow': '#10B981',
        'alien-crystal': '#805ad5',
        'alien-energy': '#6b46c1',
      },
      fontFamily: {
        'medieval': ['MedievalSharp', 'cursive'],
        'tech': ['Share Tech Mono', 'monospace'],
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