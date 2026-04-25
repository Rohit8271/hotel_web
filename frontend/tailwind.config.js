/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ec',
          100: '#f9edcc',
          200: '#f3d98a',
          300: '#ecc44d',
          400: '#e5b129',
          500: '#C9A84C',  // Primary brand gold
          600: '#a8832a',
          700: '#836219',
          800: '#5e4514',
          900: '#3d2d0c',
        },
        navy: {
          50:  '#e8e8f0',
          100: '#c5c5db',
          200: '#9f9fc4',
          300: '#7779ac',
          400: '#595b99',
          500: '#3b3d87',
          600: '#2d2f6a',
          700: '#1A1A2E',  // Primary brand navy (deep)
          800: '#13132a',
          900: '#0c0c1c',
        },
        cream: '#F5F0E8',   // Background / accent
        charcoal: '#2D2D2D', // Primary text
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
