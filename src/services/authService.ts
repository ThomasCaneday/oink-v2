import { Magic } from 'magic-sdk';
import type { MagicUserMetadata } from '../types/magic';

const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

export const authService = {
  async login(email: string): Promise<MagicUserMetadata> {
    try {
      await magic.auth.loginWithMagicLink({ email });
      const userData = await magic.user.getMetadata();
      return userData;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await magic.user.logout();
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  async getUser(): Promise<MagicUserMetadata | null> {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const userData = await magic.user.getMetadata();
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
};
