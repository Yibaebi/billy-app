import { Dimensions, Platform, StatusBar } from 'react-native';

/**
 * Returns true if the platform is Android, false otherwise.
 * @returns {boolean} True if the platform is Android, false otherwise.
 */
export const getIsAndroid = (): boolean => Platform.OS === 'android';

/**
 * Returns true if the platform is iOS, false otherwise.
 * @returns {boolean} True if the platform is iOS, false otherwise.
 */
export const getIsIOS = (): boolean => Platform.OS === 'ios';

/**
 * Returns the status bar height for the current platform.
 * @returns {number} The status bar height for the current platform.
 */
export const getStatusBarHeight = (): number => StatusBar.currentHeight ?? 0;

/**
 * Returns the screen height for the current platform.
 * @returns {number} The screen height for the current platform.
 */
export const getScreenHeight = (): number => Dimensions.get('window').height;
