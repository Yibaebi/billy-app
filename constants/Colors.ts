// constants/colors.ts

const Colors = {
  // Primary colors (Green palette from brand)
  primary: {
    100: '#ECFCD1', // Light green
    200: '#CFF78C', // Medium light green
    300: '#BBF55F', // Medium green
    400: '#9EF01A', // Primary brand green
    500: '#7CBD14', // Medium dark green
    600: '#395709', // Dark green
  },

  // Secondary colors (Gray palette from brand)
  secondary: {
    base: '#1F2614',
    100: '#FBFCFA',
    200: '#F4F5F2',
    300: '#ECDEA',
    400: '#D7D9D2',
    500: '#ACB3A3',
    600: '#7B8074',
    700: '#4A4D46',
    800: '#223306',
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

  // Standard error
  error: '#B00020',

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
