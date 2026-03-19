import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'alfa-red': '#EF3124',
        'alfa-red-hover': '#D42B1F',
        'alfa-red-dark': '#C41E12',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm-custom': '12px',
        'md-custom': '16px',
        'lg-custom': '24px',
        'xl-custom': '32px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)',
        'card-md': '0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-lg': '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
