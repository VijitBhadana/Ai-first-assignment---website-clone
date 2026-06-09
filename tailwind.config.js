/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Barlow Condensed', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'vectr': {
          'bg': '#dce8f0',
          'dark': '#0d1117',
          'navy': '#0a0e1a',
          'blue': '#3b5bdb',
          'light': '#f0f4f8',
          'muted': '#6b7280',
        }
      }
    },
  },
  plugins: [],
}
