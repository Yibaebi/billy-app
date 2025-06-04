/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // Map your loaded fonts to Tailwind classes
        nunito: ['NunitoRegular'],
        'nunito-light': ['NunitoLight'],
        'nunito-bold': ['NunitoBold'],
        'nunito-semibold': ['NunitoSemiBold'],
        'nunito-extrabold': ['NunitoExtraBold'],
        'nunito-black': ['NunitoBlack'],

        // Italic variants
        'nunito-light-italic': ['NunitoLightItalic'],
        'nunito-bold-italic': ['NunitoBoldItalic'],
        'nunito-semibold-italic': ['NunitoSemiBoldItalic'],
        'nunito-extrabold-italic': ['NunitoExtraBoldItalic'],
        'nunito-black-italic': ['NunitoBlackItalic'],
      },
      colors: {
        // Primary semantic colors using the green palette
        primary: {
          100: '#ECFCD1', // Light green
          200: '#CFF78C', // Medium light green
          300: '#BBF55F', // Medium green
          400: '#9EF01A', // Primary brand green
          500: '#7CBD14', // Medium dark green
          600: '#395709', // Dark green
        },

        // Neutral colors using the gray palette
        secondary: {
          base: '#1F2614',
          100: '#FBFCFA',
          200: '#F4F5F2',
          300: '#ECEDEA',
          400: '#D7D9D2',
          500: '#ACB3A3',
          600: '#7B8074',
          700: '#4A4D46',
          800: '#223306',
        },
      },
    },
  },
  plugins: [],
};
