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
        disabled: '#737373',
        primary: {
          DEFAULT: '#e0d6cc',
          onHover: '#e0d9d3',
          onActive: '#d9d0ca',
        },
        secondary: {
          DEFAULT: '#252629',
          onHover: '#3a3b3d',
          onActive: '#1f2022',
        },
        tertiary: {
          DEFAULT: '#f4f2f1',
          onHover: '#e0d6cc',
          onActive: '#e1dedd',
        },
        overlay: 'rgba(0,0,0,0.75)',
      },
    },
    keyframes: {
      rot: {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '25%': {
          transform: 'rotate(90deg)',
        },
        '50%': {
          transform: 'rotate(180deg)',
        },
        '75%': {
          transform: 'rotate(270deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      unrot: {
        '0%': {
          transform: 'rotate(360deg)',
        },
        '25%': {
          transform: 'rotate(270deg)',
        },
        '50%': {
          transform: 'rotate(180deg)',
        },
        '75%': {
          transform: 'rotate(90deg)',
        },
        '100%': {
          transform: 'rotate(0deg)',
        },
      },
    },
    animation: {
      rot: 'rot 4s linear infinite',
      unrot: 'unrot 4s linear infinite',
    },
  },
  mode: 'jit',
  plugins: [],
};
