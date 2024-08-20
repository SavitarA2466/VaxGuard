/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      height: {
        100: '30rem',
      },
      colors: {
        main: '#194bb4',
        subMain: '#3592fc',
        text: '#bde1ff',
        border: '#E8EBEE',
        textGray: '#A0A0A0',
        dry: '#F8F9FA',
        greyed: '#F3F5F7',
      },
    },
  },
  plugins: [],
};
