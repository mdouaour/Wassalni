/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8eccff',
          400: '#59b0ff',
          500: '#3390ff',
          600: '#1a6ff5',
          700: '#1459e1',
          800: '#1748b6',
          900: '#193f8f',
          950: '#142857',
        },
      },
    },
  },
  plugins: [],
};
