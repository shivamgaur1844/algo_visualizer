/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'array-element': 'arrayElement 0.5s ease-out',
        'array-swap': 'arraySwap 0.8s ease-out',
        'array-compare': 'arrayCompare 0.6s ease-out',
        'array-sorted': 'arraySorted 0.4s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        arrayElement: {
          '0%': { transform: 'translateY(0)', backgroundColor: '#3b82f6' },
          '50%': { transform: 'translateY(-20px)', backgroundColor: '#f59e0b' },
          '100%': { transform: 'translateY(0)', backgroundColor: '#3b82f6' }
        },
        arraySwap: {
          '0%': { transform: 'translateX(0)', backgroundColor: '#3b82f6' },
          '25%': { transform: 'translateY(-30px)', backgroundColor: '#ef4444' },
          '50%': { transform: 'translateX(100px)', backgroundColor: '#ef4444' },
          '75%': { transform: 'translateY(-30px)', backgroundColor: '#ef4444' },
          '100%': { transform: 'translateX(0)', backgroundColor: '#10b981' }
        },
        arrayCompare: {
          '0%': { backgroundColor: '#3b82f6' },
          '50%': { backgroundColor: '#f59e0b' },
          '100%': { backgroundColor: '#3b82f6' }
        },
        arraySorted: {
          '0%': { backgroundColor: '#3b82f6' },
          '100%': { backgroundColor: '#10b981' }
        }
      }
    },
  },
  plugins: [],
} 