/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        base: '#FAF7F2',      // very light cream
        primary: '#2E3D30',   // deep forest green
        accent: '#C3A370',    // muted gold / earth
      },
    },
  },
  plugins: [],
};
