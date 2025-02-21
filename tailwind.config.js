/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zk-primary': '#4F46E5',
        'zk-secondary': '#1E293B',
        'zk-background': '#F8FAFC',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 2s ease-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { backgroundColor: 'var(--tw-colors-blue-100)' },
          '100%': { backgroundColor: 'var(--tw-colors-white)' }
        }
      }
    },
  },
  plugins: [],
} 
