import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'border-subtle': 'var(--color-border-subtle)'
      },
      boxShadow: {
        card: '0 20px 40px -24px rgba(15, 23, 42, 0.25)'
      },
      borderRadius: {
        xl: '1rem'
      },
      animation: {
        'pulse-rainbow': 'pulse-rainbow 2.5s ease-in-out infinite'
      },
      keyframes: {
        'pulse-rainbow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(59,130,246,0.45)'
          },
          '50%': {
            boxShadow: '0 0 0 12px rgba(59,130,246,0)'
          }
        }
      }
    }
  },
  plugins: []
};

export default config;
