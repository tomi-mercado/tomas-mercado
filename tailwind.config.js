const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{tsx,jsx}', './components/**/*.{tsx,jsx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--lato-font)', ...fontFamily.serif],
      },
    },
  },
  daisyui: {
    themes: [
      'dark',
      {
        tomTheme: {
          primary: '#ffffff',
          'primary-focus': '#e6e6e6',
          'primary-content': '#000000',

          secondary: '#1a3056',
          'secondary-focus': '#091120',
          'secondary-content': '#ffffff',

          accent: '#503447',
          'accent-focus': '#32202c',
          'accent-content': '#ffffff',

          neutral: '#171618',
          'neutral-focus': '#2e2d2f',
          'neutral-content': '#ddc297',

          'base-100': '#141414',
          'base-200': '#171618',
          'base-300': '#2e2d2f',
          'base-content': '#b5a997',

          info: '#66c7ff',
          success: '#87cf3a',
          warning: '#e1d460',
          error: '#ff6b6b',

          '--rounded-box': '1rem',
          '--rounded-btn': '.2rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
  mode: 'jit',
};
