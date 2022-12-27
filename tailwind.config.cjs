/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        spaceCadet: '#25283D',
        plum: '#8F3985',
        seaGreen: '#00FFC5',
        middleGreen: '#5B8C5A',
        redSalsa: '#ED474A',
        slateGrey: '#6689A1',
        white: '#FDFDFD',
        black: '#0E0E0E'
      },
      container: {
        center: true
      }
    },
  },
  plugins: [],
}
