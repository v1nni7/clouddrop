/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-60px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
      columns: {
        count: {
          'column-count': '5',
        },
      },
      aspectRatio: {
        'w-1': {
          '--tw-aspect-w': '1',
        },
        'w-16': {
          '--tw-aspect-w': '16',
        },
        'h-1': {
          'aspect-h-1': '1',
        },
        'h-9': {
          '--tw-aspect-h': '9',
        },
      },
      fontFamily: {
        sans: 'var(--font-poppins)',
        alt: 'var(--font-lexend-deca)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
