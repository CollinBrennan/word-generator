/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        text: '#000000',
        background: '#ffffff',
        primary: '#78f2f2',
        secondary: '#fcc5c5',
        accent: '#895858',
      },
    },
  },
  plugins: [],
}
