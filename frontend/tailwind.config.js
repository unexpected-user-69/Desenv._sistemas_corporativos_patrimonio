/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // sky-500
          600: '#0284c7',
        },
        accent: {
          DEFAULT: '#7c3aed', // violet-600
        },
        muted: {
          DEFAULT: '#64748b', // slate-500
        },
        surface: {
          DEFAULT: '#ffffff',
        },
      },
      boxShadow: {
        'soft-lg': '0 10px 25px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.04)'
      },
      transitionProperty: {
        'height-opacity': 'height, opacity'
      }
    },
  },
  plugins: [],
};
