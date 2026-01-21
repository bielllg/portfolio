/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neo: {
                    bg: '#FFFFFF',
                    text: '#000000',
                    yellow: '#FFD600',
                    pink: '#ff00d4c5',
                    blue: '#00A3FF',
                    green: '#00FF94',
                }
            },
            fontFamily: {
                display: ['"Archivo Black"', 'sans-serif'],
                body: ['"Public Sans"', 'sans-serif'],
            },
            boxShadow: {
                'neo': '5px 5px 0px 0px rgba(0,0,0,1)',
                'neo-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
                'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
            },
            borderWidth: {
                '3': '3px',
            }
        },
    },
    plugins: [],
}
