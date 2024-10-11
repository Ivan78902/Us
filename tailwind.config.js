/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blush': '#FFB6C1',
        'lavender': '#E6E6FA',
        'peach': '#FFDAB9',
        'rose-gold': '#B76E79',
        'burgundy': '#800020',
        'plum': '#8E4585',
      },
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};