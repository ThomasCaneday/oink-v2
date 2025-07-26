import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Magic } from 'magic-sdk';
import { AuthContext } from './auth';
import type { AppUser, MagicUserMetadata } from '../types/magic';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

  const checkUser = useCallback(async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const metadata = await magic.user.getMetadata() as MagicUserMetadata;
        setUser({ isLoggedIn: true, metadata });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [magic.user]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const login = async (email: string) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      await checkUser();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await magic.user.logout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    magic,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}