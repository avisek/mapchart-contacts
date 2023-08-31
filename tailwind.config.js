/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        'dashboardSm': [
          'global',
          'charts',
          'map',
        ],
        'dashboard': [
          'global global global',
          'map    map    charts',
        ],
        'dashboardLg': [
          'global global charts',
          'map    map    charts',
        ],
      },
      gridTemplateColumns: {
        'dashboard': 'repeat(3, minmax(0, 1fr))',
        'dashboardLg': 'repeat(3, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        // 'dashboardSm': '6rem 3rem 1fr auto',
      },
    }
  },
  plugins: [
    require('daisyui'),
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
  daisyui: {
    themes: ["light", "dark"],
    base: true,
  },
}
