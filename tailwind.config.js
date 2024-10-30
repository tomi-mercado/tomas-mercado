const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--lato-font)', ...fontFamily.serif],
      },
      animation: {
        'left-to-right-and-right-to-left':
          'left-to-right-and-right-to-left 10s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
