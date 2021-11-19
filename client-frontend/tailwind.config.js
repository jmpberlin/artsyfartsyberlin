module.exports = {
  purge: [
    './src/components/navbar/*.{js,jsx,ts,tsx}',
    './src/components/pages/*.{js,jsx,ts,tsx}',
    './src/components/UI/*.{js,jsx,ts,tsx}',
    './public/index.html',
    // new lines inserted afterwards:
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class' before false
  theme: {
    extend: {},
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
};

// purge: [
//   './pages/**/*.{js,ts,jsx,tsx}',
//   './components/**/*.{js,ts,jsx,tsx}',
//   './layout/**/*.{js,ts,jsx,tsx}',
//   './helpers/**/*.{js,ts,jsx,tsx}',
//   // Add more here
// ],
