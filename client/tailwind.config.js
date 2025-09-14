/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.filter-none': {
          '-webkit-filter': 'none',
          filter: 'none',
        },
        '.backdrop-filter-blur-sm': {
          '-webkit-backdrop-filter': 'blur(4px)',
          'backdrop-filter': 'blur(4px)',
        },
        '.user-select-none': {
          '-webkit-user-select': 'none',
          'user-select': 'none',
        },
        '.text-size-adjust': {
          '-webkit-text-size-adjust': '100%',
          'text-size-adjust': '100%',
        },
        '.forced-color-adjust-auto': {
          'forced-color-adjust': 'auto',
          color: 'inherit',
        },
      });
    },
  ],
};