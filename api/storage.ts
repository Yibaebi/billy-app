import { User } from '@/types/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const TOKEN_KEY = 'auth_tokens';
const USER_KEY = 'auth_user';

export const getStoredTokens = async (): Promise<Tokens | null> => {
  try {
    const tokens = await AsyncStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error getting stored tokens:', error);
    return null;
  }
};

export const setStoredTokens = async (tokens: Tokens): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error setting stored tokens:', error);
  }
};

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

export const setStoredUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting stored user:', error);
  }
};

export const clearAuthStorage = async (): Promise<void> => {
  try {
    await Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(USER_KEY)]);
  } catch (error) {
    console.error('Error clearing auth storage:', error);
  }
};
