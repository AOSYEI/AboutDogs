/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f2',
          100: '#ffeddc',
          200: '#ffd4ad',
          300: '#ffb97c',
          400: '#ff9853',
          500: '#f77a2f',
          600: '#df5d14',
          700: '#b84911',
          800: '#923c16',
          900: '#763416',
        },
        ink: '#24313f',
        sand: '#f6f1eb',
        sky: '#dff3f9',
      },
      boxShadow: {
        soft: '0 14px 40px rgba(36, 49, 63, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(255,185,124,0.45), transparent 35%), radial-gradient(circle at right, rgba(223,243,249,0.75), transparent 35%)',
      },
    },
  },
  plugins: [],
};
