/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        text: '#06082d',
        background: '#ffffff',
        primary: '#9ca0e7',
        secondary: '#ced0f3',
        accent: '#3037c5',
      },
    },
  },
  plugins: [],
}
