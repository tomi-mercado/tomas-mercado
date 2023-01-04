const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{tsx,jsx}', './components/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--lato-font)', ...fontFamily.serif],
      },
      colors: {
        primary: '#e0d6cc',
        secondary: '#252629',
        overlay: 'rgba(0,0,0,0.75)',
      },
    },
  },
  mode: 'jit',
  plugins: [],
};
