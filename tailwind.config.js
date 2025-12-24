/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主題色系 - 現代科技感配色
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        // 背景色系
        bg: {
          sidebar: 'var(--color-bg-sidebar)',
          main: 'var(--color-bg-main)',
          header: 'var(--color-bg-header)',
          card: 'var(--color-bg-card)',
        },
        // 文字色系
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        // 邊框色系
        border: {
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'sidebar': '4px 0 24px -8px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px -4px rgba(0, 0, 0, 0.1)',
        'tag': '0 2px 8px -2px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      // Typography 插件自訂樣式
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text-secondary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-lead': 'var(--color-text-secondary)',
            '--tw-prose-links': 'var(--color-primary)',
            '--tw-prose-bold': 'var(--color-text-primary)',
            '--tw-prose-counters': 'var(--color-text-muted)',
            '--tw-prose-bullets': 'var(--color-text-muted)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-text-primary)',
            '--tw-prose-quote-borders': 'var(--color-primary)',
            '--tw-prose-captions': 'var(--color-text-muted)',
            '--tw-prose-code': 'var(--color-text-primary)',
            '--tw-prose-pre-code': '#e2e8f0',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            maxWidth: 'none',
            // 客製化標題樣式
            h2: {
              scrollMarginTop: '6rem',
              paddingBottom: '0.5rem',
              borderBottomWidth: '2px',
              borderBottomColor: 'var(--color-border)',
            },
            h3: {
              scrollMarginTop: '6rem',
            },
            // 客製化連結樣式
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            // 客製化程式碼區塊
            code: {
              backgroundColor: 'var(--color-bg-main)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        // Indigo 主題變體
        indigo: {
          css: {
            '--tw-prose-links': '#6366f1',
            '--tw-prose-quote-borders': '#6366f1',
            h2: {
              borderBottomColor: '#c7d2fe',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
