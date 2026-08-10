import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  /* Базовый слой отключён: разметка перенесена из статичной версии вместе
     со своим CSS, и preflight переопределял бы его (img, button, h1). */
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        /* фирменные цвета, которых у shadcn нет */
        brand: {
          lime: 'hsl(var(--brand-lime))',
          mint: 'hsl(var(--brand-mint))',
          ok: 'hsl(var(--brand-ok))',
          'ok-bg': 'hsl(var(--brand-ok-bg))',
          hair: 'hsl(var(--brand-hair))',
        },
      },
      /* радиусы у каждого компонента свои, одного --radius проекту мало */
      borderRadius: {
        media: 'var(--radius-media)',
        chip: 'var(--radius-chip)',
        pill: 'var(--radius-pill)',
        'pill-lg': 'var(--radius-pill-lg)',
        agent: 'var(--radius-agent)',
        'book-chip': 'var(--radius-book-chip)',
      },
      transitionTimingFunction: {
        open: 'var(--ease-open)',
        soft: 'var(--ease-soft)',
        base: 'var(--ease-base)',
      },
      fontFamily: {
        display: ['"SF Pro Display"', '"SF Pro"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        text: ['"SF Pro Text"', '"SF Pro"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
}
