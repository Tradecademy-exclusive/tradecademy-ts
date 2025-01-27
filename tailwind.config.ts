import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 0.8s linear infinite',
        in: 'fade-in 0.15s ease-in-out',
        out: 'fade-out 0.15s ease-in-out',
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0.5', scale: '0.9' },
          '100%': { opacity: '1', scale: '1' },
        },
        'fade-out': {
          '0%': { opacity: '0.5', scale: '1' },
          '100%': { opacity: '0', scale: '0.7' },
        },
      },
      boxShadow: {
        even: '0 5px 7px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1)',
        evenblue:
          '0 5px 9px rgba(38, 108, 247, 0.1), 0 -4px 30px rgba(38, 108, 247, 0.1)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        tcblue: '#1336EA',
        lightblue: '#266CF7',
        charcoal: '#1D1D1D',
        creme: '#E6E2DC',
      },
    },
  },
  plugins: [],
} satisfies Config
