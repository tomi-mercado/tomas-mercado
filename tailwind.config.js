const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{tsx,jsx}', './components/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--lato-font)', ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
