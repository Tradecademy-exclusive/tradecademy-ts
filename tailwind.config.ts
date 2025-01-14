import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
