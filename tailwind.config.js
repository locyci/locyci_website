/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#00041a',
        card: 'rgba(0, 8, 54, 0.6)',
        'card-hover': 'rgba(2, 16, 80, 0.8)',
        primary: '#38bdf8',
        'primary-hover': '#0284c7',
        accent1: '#818cf8',
        accent2: '#2dd4bf',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
      }
    },
  },
  plugins: [],
}
