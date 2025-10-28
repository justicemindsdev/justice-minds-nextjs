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
        'primary-blue': '#052962',
        'accent-red': '#c70000',
        'text-dark': '#121212',
        'text-grey': '#767676',
        'border-grey': '#dcdcdc',
        'bg-light': '#f6f6f6',
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
