/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58CC02',
          'green-dark': '#46A302',
          'green-light': '#89E219',
          blue: '#1CB0F6',
          red: '#FF4B4B',
          orange: '#FF9600',
          yellow: '#FFC800',
          gray: '#AFAFAF',
          'gray-light': '#E5E5E5',
          'gray-dark': '#777777',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pop-up': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'heart-pop': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)', opacity: '0.2' },
        },
        'xp-bump': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        'fire-toast': {
          '0%': { transform: 'scale(0.7) translateY(10px)', opacity: '0' },
          '30%': { transform: 'scale(1.1) translateY(0)', opacity: '1' },
          '70%': { transform: 'scale(1) translateY(0)', opacity: '1' },
          '100%': { transform: 'scale(0.9) translateY(-10px)', opacity: '0' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-8px)' },
          '80%': { transform: 'translateX(8px)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pop-up': 'pop-up 0.5s ease-out forwards',
        'heart-pop': 'heart-pop 0.45s ease-out forwards',
        'xp-bump': 'xp-bump 0.3s ease-out',
        'fire-toast': 'fire-toast 0.95s ease-in-out forwards',
        'bounce-in': 'bounce-in 0.4s ease-out',
        shake: 'shake 0.4s ease-in-out',
        'confetti-fall': 'confetti-fall linear forwards',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
