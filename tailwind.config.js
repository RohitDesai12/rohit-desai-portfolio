/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F7F7F2', // Warm Ivory
          subtle: '#F0F2EB',
          elevated: '#E8EEE8', // Secondary Background / Sage tint
        },
        ink: {
          DEFAULT: '#202522', // Primary Text / Charcoal
          muted: '#777D78',   // Muted Slate
          subtle: '#9CA39E',
        },
        forest: {
          DEFAULT: '#285943', // Primary Accent
          dark: '#1E4332',
          light: '#357256',
          surface: '#E2EBE5',
        },
        border: {
          DEFAULT: '#DDDFD8', // Warm Grey Border
          subtle: '#EAECE6',
          strong: '#C2C6BC',
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [],
}
