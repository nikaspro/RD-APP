/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  /* Базовый слой отключён: разметка перенесена из статичной версии вместе
     со своим CSS, и preflight переопределял бы его (img, button, h1). */
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
}
