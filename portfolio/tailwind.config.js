/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08080A',
        coal: '#0C0C0C',
        mist: '#D7E2EA',
        panel: '#E7EEF4',
        steel: '#646973',
        magenta: '#B600A8',
        violet: '#7621B0',
        ember: '#FF6B2C',
      },
      fontFamily: {
        display: ['Kanit', 'Impact', 'sans-serif'],
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: { xs: '420px' },
    },
  },
  plugins: [],
}
