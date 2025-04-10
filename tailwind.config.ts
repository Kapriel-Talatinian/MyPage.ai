import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1B1F',
        accent: '#4F46E5',
        cta: '#EC4899',
        light: '#FFFFFF',
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
      fontSize: {
        'lg': '1.125rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'focus': '0 0 0 2px rgba(79, 70, 229, 0.2)',
      },
    },
  },
  plugins: [],
  safelist: [
    'btn',
    'btn-primary',
    'btn-secondary',
    'bg-indigo-600',
    'hover:bg-indigo-700',
    'bg-white',
    'hover:bg-gray-50',
    'text-white',
    'text-gray-700',
    'border-2',
    'border-gray-300',
    'focus:ring-2',
    'focus:ring-indigo-500',
    'focus:ring-gray-500',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
}
export default config 