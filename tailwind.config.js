/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA',
        primary: '#0057FF',
        accent: '#FF7A00',
        text: '#212529',
        'subtle-gray': '#6C757D',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans], 
        heading: ['var(--font-poppins)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}