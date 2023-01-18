const { lerpColors } = require('tailwind-lerp-colors');


/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{html,js,svelte,ts}'],
//   theme: {
//     extend: {
//       colors: {
//         spaceCadet: '#25283D',
//         plum: '#8F3985',
//         seaGreen: '#00FFC5',
//         middleGreen: '#5B8C5A',
//         redSalsa: '#ED474A',
//         slateGrey: '#6689A1',
//         white: '#FDFDFD',
//         black: '#0E0E0E'
//       },
//       container: {
//         center: true
//       }
//     },
//   },
//   plugins: [],
// }

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: lerpColors({
        grizzly: {
          100: '#23282E',
          0: '#386C9C'
        },
        purple: {
          0: '#b021b2',
          50: '#651366',
          100: '#190419'
        },
        white: '#FCFCFC',
        green: '#005B1D',
        lightBlue: '#389c9c',
        red: {
          100: '#630000',
          0: '#FB0000',
        }


      }, {
        interval: 5,
      }),
      // colors: {
      //   bgColor: '#23282E',
      //   grizzly: {
      //     100: '#23282E',
      //     0: '#389C9C'
      //   },
      //   sidebargcolor: '#484848',
      //   headerbgcolor: '#646464',
      //   topbarbgcolor: '#373737',
      //   bannerbgcolor: '#344951',
      //   glowcolor: '#115068',
      //   highlightcolor: '#707070',
      //   red: '#630000',
      //   redhighlight: '#880000',
      //   lightblue: '#389c9c',
      //   lightred: '#e24848',
      // }
      gridTemplateRows: {
        layout: 'auto 1fr'
      },
      height: {
        main: 'calc(100vh - (6rem + 140px))'
      },
      container: {
        center: true
      }
    },
  },
  plugins: [],
}
