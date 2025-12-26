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
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#0066CC',
          hover: '#0052A3',
          light: '#E6F0FF',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#666666',
        },
        border: '#E0E0E0',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '896px',
        'container-lg': '1200px',
      },
      borderRadius: {
        'colb': '0.375rem',
      },
      transitionDuration: {
        'colb': '1200ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
