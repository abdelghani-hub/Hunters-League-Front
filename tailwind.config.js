/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        appbg: {
          light: '#fff8e0',
          dark: '#1a202c',
          default: '#fff8e0',
        },
      }
    },
  },
  darkMode: 'media',
  plugins: [
    require('flowbite/plugin')
  ],
}

