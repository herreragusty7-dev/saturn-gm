import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        gm: {
          bg:     '#0A0A0A',
          fg:     '#F5F4F2',
          muted:  '#C8C0B8',
          accent: '#8B5E3C',
          card:   '#111111',
        },
      },
      animation: {
        kenburns: 'kenburns 20s ease-out forwards',
      },
      keyframes: {
        kenburns: {
          from: { transform: 'scale(1.05) translateY(0)' },
          to:   { transform: 'scale(1.0) translateY(-2%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
