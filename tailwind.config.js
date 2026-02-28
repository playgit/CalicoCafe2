/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float-up': 'floatUp 1.4s ease-out forwards',
      },
      keyframes: {
        floatUp: {
          '0%':   { opacity: '1', transform: 'translateY(0) translateX(-50%) scale(1)' },
          '40%':  { opacity: '1', transform: 'translateY(-28px) translateX(-50%) scale(1.15)' },
          '100%': { opacity: '0', transform: 'translateY(-70px) translateX(-50%) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};