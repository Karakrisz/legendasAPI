/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue', './error.vue'],
  theme: {
    extend: {
      colors: {
        'digital-seed': '#1AC78D',
        Dark: '#0b0b0b',
        Primary: '#ffad32',
        Light: '#fcfcfc',
        'Grey-Inactive': '#cfcfcf',
        Sale: '#f12d2d',
        'Light-Grey': '#f3f3f3',
        Green: '#98c350',
      },
      fontFamily: {
        raleway: 'Raleway',
        'maiden-orange': 'Maiden Orange',
        rockwell: 'Grenze',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
