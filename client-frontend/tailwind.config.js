module.exports = {
  purge: [
    './src/components/navbar/*.{js,jsx,ts,tsx}',
    './src/components/pages/*.{js,jsx,ts,tsx}',
    './src/components/UI/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
};
