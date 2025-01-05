/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        appbg: '#fff8e0',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

