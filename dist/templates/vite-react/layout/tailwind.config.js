/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          gray: {
            700: '#333333',
            800: '#222222',
            900: '#111111',
          },
        },
      },
    },
    plugins: [],
  };