// constants/colors.ts

export const Colors = {
  // Primary colors (Green palette from brand)
  primary: {
    50: '#ECFCD1',
    100: '#CFF78C',
    200: '#BBF55F',
    300: '#9EF01A',
    400: '#7CBD14',
    500: '#395709',
  },

  // Secondary colors (Gray palette from brand)
  secondary: {
    base: '#1F2614',
    50: '#FBFCFA',
    100: '#F4F5F2',
    200: '#ECDEA',
    300: '#D7D9D2',
    400: '#ACB3A3',
    500: '#7B8074',
    600: '#4A4D46',
    700: '#223306',
  },

  // Semantic color mappings
  brand: '#9EF01A', // Primary brand green
  brandDark: '#7CBD14', // Darker brand green
  background: '#FBFCFA', // Light background
  surface: '#F4F5F2', // Card/surface background
  text: '#1F2614', // Dark text
  textSecondary: '#7B8074', // Secondary text
  border: '#D7D9D2', // Border color
  accent: '#ACB3A3', // Accent color

  // Common color shortcuts
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Type for color keys (useful for TypeScript)
export type ColorKey = keyof typeof Colors;
export type PrimaryColorKey = keyof typeof Colors.primary;
export type SecondaryColorKey = keyof typeof Colors.secondary;

// Helper functions for accessing colors
export const getColor = {
  primary: (shade: PrimaryColorKey) => Colors.primary[shade],
  secondary: (shade: SecondaryColorKey) => Colors.secondary[shade],
};

export default Colors;
