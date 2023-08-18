/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(40px);',
            transform: 'translateY(40px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0);',
            transform: 'translateY(0);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      }
    },
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    }
  },
  plugins: [
    "@tailwindcss/line-clamp"
  ],
}