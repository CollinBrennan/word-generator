/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      sm: '0.600rem',
      base: '0.8rem',
      xl: '1.066rem',
      '2xl': '1.421rem',
      '3xl': '1.894rem',
      '4xl': '2.525rem',
      '5xl': '3.366rem',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    colors: {
      text: '#06082d',
      background: '#ffffff',
      primary: '#9ca0e7',
      secondary: '#ced0f3',
      accent: '#3037c5',
    },

    extend: {},
  },
  plugins: [],
}
