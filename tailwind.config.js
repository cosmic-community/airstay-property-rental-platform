/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF385C',
          dark: '#E31C5F',
          light: '#FF5A75'
        },
        secondary: {
          DEFAULT: '#00A699',
          dark: '#008B80',
          light: '#26C4B5'
        }
      }
    },
  },
  plugins: [],
}