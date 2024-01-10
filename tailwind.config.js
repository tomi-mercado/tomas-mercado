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
  daisyui: {
    themes: [
      'dark',
      {
        tomTheme: {
          primary: '#ffffff',
          'primary-focus': '#e6e6e6',
          'primary-content': '#000000',

          secondary: '#252530',
          'secondary-focus': '#091120',
          'secondary-content': '#ffffff',

          accent: '#412119',
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
  plugins: [require('daisyui')],
};
