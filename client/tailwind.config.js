/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],
    theme: {
        listStyleType: {
            square: 'square',
        },
        extend: {
            width: {
                main: '1220px',
            },
            backgroundColor: {
                main: '#ee3131',
                overlay: 'rgba(0, 0, 0, 0.3)',
            },
            colors: {
                main: '#ee3131',
            },
            keyframes: {
                'slide-top': {
                    '0%': {
                        '-webkit-transform': 'translateY(40px);',
                        transform: 'translateY(40px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateY(0);',
                        transform: 'translateY(0);',
                    },
                },
                'slide-top-sm': {
                    '0%': {
                        '-webkit-transform': 'translateY(4px);',
                        transform: 'translateY(4px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateY(0);',
                        transform: 'translateY(0);',
                    },
                },
                'slide-right': {
                    '0%': {
                        '-webkit-transform': 'translateX(-1000px);',
                        transform: 'translateX(-1000px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-right-back': {
                    '0%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(-1000px);',
                        transform: 'translateX(-1000px);',
                    },
                },
            },
            animation: {
                'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-top-sm': 'slide-top-sm 0.2s linear both;',
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'slide-right-back': 'slide-right-back 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            },
            flex: {
                2: '2 2 0%',
                3: '3 3 0%',
                4: '4 4 0%',
                5: '5 5 0%',
                6: '6 6 0%',
                7: '7 7 0%',
                8: '8 8 0%',
            },
        },
        fontFamily: {
            main: ['Poppins', 'sans-serif'],
        },
    },
    plugins: ['@tailwindcss/line-clamp'],
};
