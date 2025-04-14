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
          DEFAULT: '#FF4D00',
          dark: '#E64500',
        },
        dark: {
          DEFAULT: '#000000',
          100: '#111111',
          200: '#1A1A1A',
          300: '#222222',
          400: '#333333',
        },
        light: {
          DEFAULT: '#FFFFFF',
          100: '#B3B3B3',
          200: '#777777',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFFFFF',
            h1: {
              color: '#FFFFFF',
            },
            h2: {
              color: '#FFFFFF',
            },
            h3: {
              color: '#FFFFFF',
            },
            h4: {
              color: '#FFFFFF',
            },
            p: {
              color: '#B3B3B3',
            },
            a: {
              color: '#FF4D00',
              '&:hover': {
                color: '#E64500',
              },
            },
            code: {
              color: '#FFFFFF',
              backgroundColor: '#1A1A1A',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              borderColor: '#333333',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
