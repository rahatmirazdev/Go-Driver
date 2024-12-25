/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-green': '#4CAF50',
        'sky-blue': '#00BCD4',
        'warm-orange': '#FF9800',
        'light-beige': '#FFFDE7',
        'white': '#FFFFFF',
        'light-gray': '#F5F5F5',
        'dark-gray': '#212121',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}